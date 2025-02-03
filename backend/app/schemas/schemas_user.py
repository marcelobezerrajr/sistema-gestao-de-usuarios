from pydantic import BaseModel, EmailStr, validator
from typing import Optional
import re

from app.database.models.models_user import PermissionType
from app.utils.hashing import get_password_hash
from app.utils.validate_password import validate_password


class UserForm(BaseModel):
    username: str
    name: str
    last_name: str
    email: EmailStr
    hashed_password: str
    telephone: str
    permission: PermissionType

    class Config:
        from_attributes = True

    @validator("username")
    def validate_user(cls, value):
        if not re.match(r"^[a-zA-Z0-9]+$", value):
            raise ValueError("Username format invalid")
        return value

    @validator("name")
    def validate_name(cls, value):
        if not re.match(r"^[a-zA-ZáéíóúãõçÁÉÍÓÚÃÕÇ\s]+$", value):
            raise ValueError("Name format invalid")
        return value

    @validator("last_name")
    def validate_last_name(cls, value):
        if not re.match(r"^[a-zA-ZáéíóúãõçÁÉÍÓÚÃÕÇ\s]+$", value):
            raise ValueError("Last name format invalid")
        return value

    @validator("hashed_password", pre=True)
    def validate_and_hash_password(cls, value):
        validate_password(value)
        return get_password_hash(value)

    @validator("telephone")
    def validate_telephone(cls, value):
        pattern = re.compile(r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$")
        if not pattern.match(value):
            raise ValueError("Telephone format invalid")
        return value


class UserUpdateForm(BaseModel):
    username: Optional[str] = None
    name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    hashed_password: Optional[str] = None
    telephone: Optional[str] = None
    permission: Optional[PermissionType] = None

    class Config:
        from_attributes = True

    @validator("username")
    def validate_user(cls, value):
        if value and not re.match(r"^[a-zA-Z0-9]+$", value):
            raise ValueError("User format invalid")
        return value

    @validator("name")
    def validate_name(cls, value):
        if value and not re.match(r"^[a-zA-ZáéíóúãõçÁÉÍÓÚÃÕÇ\s]+$", value):
            raise ValueError("Name format invalid")
        return value

    @validator("last_name")
    def validate_last_name(cls, value):
        if value and not re.match(r"^[a-zA-ZáéíóúãõçÁÉÍÓÚÃÕÇ\s]+$", value):
            raise ValueError("Last name format invalid")
        return value

    @validator("telephone")
    def validate_telephone(cls, value):
        if value and not re.match(r"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$", value):
            raise ValueError("Telephone format invalid")
        return value


class UserOut(BaseModel):
    id_user: int
    username: Optional[str] = None
    name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    telephone: Optional[str] = None
    permission: PermissionType

    class Config:
        from_attributes = True
