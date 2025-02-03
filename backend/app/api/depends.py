from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from dotenv import load_dotenv
import os
import logging

from app.database.database import SessionLocal
from app.database.models.models_token import TokenData
from app.database.models.models_user import User, PermissionType
from app.core.security import oauth2_scheme

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

if not SECRET_KEY or not ALGORITHM:
    raise ValueError(
        "SECRET_KEY and ALGORITHM must be defined in environment variables"
    )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid access token",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        permission: str = payload.get("permission", "user")
        if email is None:
            logger.warning("Token missing 'sub' (email).")
            raise credentials_exception
        token_data = TokenData(email=email, permission=permission)
        logger.info(f"Token decoded successfully for {email}.")
    except JWTError as e:
        logger.error(f"JWTError: {e}")
        raise credentials_exception

    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        logger.warning(f"User {token_data.email} not found.")
        raise credentials_exception
    return user


def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    if current_user.permission != PermissionType.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions"
        )
    return current_user


def get_user_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.permission not in [PermissionType.admin, PermissionType.user]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions"
        )
    return current_user


def get_read_user_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.permission not in [
        PermissionType.admin,
        PermissionType.user,
        PermissionType.read,
    ]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions"
        )
    return current_user
