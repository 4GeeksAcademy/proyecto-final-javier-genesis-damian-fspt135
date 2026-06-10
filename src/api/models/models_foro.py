from api.database.db import db
from sqlalchemy import String, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from datetime import datetime



class Foro(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    img: Mapped[str] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    user_id = mapped_column(ForeignKey("user.id"), nullable=False)
    tag = relationship('Tag')
    post = relationship('Post')
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())


