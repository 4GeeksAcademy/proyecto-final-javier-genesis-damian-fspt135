from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]= mapped_column(String(120), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255),nullable=False)
    img: Mapped[str] = mapped_column(String(255),nullable=True)
    first_name: Mapped[str] = mapped_column(String(255),nullable=True)
    last_name: Mapped[str] = mapped_column(String(255),nullable=True)
    date_birth: Mapped[str] = mapped_column(String(255),nullable=True)
    description: Mapped[str] = mapped_column(String(255),nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)


    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
    def serialize_all(self):
        return{
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "img": self.img,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date_birth": self.date_birth,
            "description": self.description
        }