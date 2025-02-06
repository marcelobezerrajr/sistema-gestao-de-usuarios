from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import timedelta, datetime
from dotenv import load_dotenv
import logging
import uuid
import os

from app.database.models.models_user import User
from app.schemas.schemas_response import (
    EmailRequest,
    ResetPasswordRequest,
    TokenRequest,
)
from app.utils.email import (
    send_reset_password_email,
    send_password_reset_confirmation_email,
)
from app.utils.hashing import get_password_hash
from app.utils.validate_password import validate_password
from app.api.depends import get_db

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
RESET_TOKEN_EXPIRY_HOURS = int(os.getenv("RESET_TOKEN_EXPIRY_HOURS"))

if not SECRET_KEY or not ALGORITHM or not RESET_TOKEN_EXPIRY_HOURS:
    raise ValueError(
        "SECRET_KEY, ALGORITHM and RESET_TOKEN_EXPIRY_HOURS must be defined in environment variables"
    )

reset_password_router = APIRouter(prefix="/reset-password")


def create_reset_token(user_id: str):
    token_expires = timedelta(hours=RESET_TOKEN_EXPIRY_HOURS)
    return jwt.encode(
        {
            "sub": user_id,
            "jti": str(uuid.uuid4()),
            "exp": datetime.utcnow() + token_expires,
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


@reset_password_router.post("/request-password")
def forgot_password(request: EmailRequest, db: Session = Depends(get_db)):
    email = request.email
    if "@" not in email or "." not in email:
        raise HTTPException(status_code=400, detail="Invalid email format.")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        logger.warning(f"Password reset requested for non-existent email: {email}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found",
        )

    token = create_reset_token(str(user.id_user))
    user.reset_password_token = token
    user.reset_token_expires_at = datetime.utcnow() + timedelta(
        hours=RESET_TOKEN_EXPIRY_HOURS
    )
    db.commit()

    try:
        send_reset_password_email(email, token)
        logger.info(f"Password reset token sent to {email}")
    except Exception as e:
        logger.error(f"Failed to send password reset email: {e}")
        raise HTTPException(
            status_code=500, detail="Failed to send password reset email."
        )

    return {"message": "Password reset email sent successfully"}


@reset_password_router.post("/verify")
def verify_reset_token(request: TokenRequest, db: Session = Depends(get_db)):
    token = request.token
    if not token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Token is required"
        )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        jti: str = payload.get("jti")
        if not user_id or not jti:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token structure",
            )
    except JWTError as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user = db.query(User).filter(User.id_user == user_id).first()
    if (
        not user
        or user.reset_password_token != token
        or user.reset_token_expires_at < datetime.utcnow()
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    return {"message": "Token is valid"}


@reset_password_router.post("/reset")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(request.token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        jti: str = payload.get("jti")
        if not user_id or not jti:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token structure",
            )
    except JWTError as e:
        logger.error(f"Token verification failed during reset: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user = db.query(User).filter(User.id_user == user_id).first()
    if (
        not user
        or user.reset_password_token != request.token
        or user.reset_token_expires_at < datetime.utcnow()
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    if not validate_password(request.new_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password does not meet complexity requirements",
        )

    user.hashed_password = get_password_hash(request.new_password)
    user.reset_password_token = None
    user.reset_token_expires_at = None
    db.commit()

    try:
        send_password_reset_confirmation_email(user.email)
        logger.info(f"Password reset successfully for user ID: {user_id}")
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {e}")

    return {"message": "Password reset successfully"}
