from api.database.db import db
from sqlalchemy import String, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List



class Tag(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    user_id = mapped_column(ForeignKey("user.id"), nullable=False)
    foro_id = mapped_column(ForeignKey("foro.id"), nullable=False)