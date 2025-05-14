from sqlalchemy import Column, Integer, String, Date, DateTime, Enum as SqlEnum
from app.database.database import Base
from enum import Enum
from datetime import date


class PermissionType(str, Enum):
    admin = "Admin"
    user = "User"
    read = "Read"


class User(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    last_name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, unique=True, index=True, nullable=False)
    telephone = Column(String, unique=True, index=True, nullable=True)
    permission = Column(SqlEnum(PermissionType), default=PermissionType.user)
    date_created = Column(Date, index=True, default=date.today)
    reset_password_token = Column(String, index=True, nullable=True)
    reset_token_expires_at = Column(DateTime, index=True, nullable=True)
