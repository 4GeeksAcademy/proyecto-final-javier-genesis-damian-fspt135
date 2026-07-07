from api.database.db import db
from sqlalchemy import String, Boolean, Text,  ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from datetime import datetime


class Comment (db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(255),nullable=False)
    user_id = mapped_column(ForeignKey("user.id"), nullable=False)
    post_id: Mapped[int] = mapped_column(ForeignKey("post.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())
    user = db.relationship('User', back_populates="comment", overlaps="comment")
    post = db.relationship('Post', overlaps="comment")


    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "content": self.content,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "user": {"name":self.user.username, "img_user": self.user.img}
        }
    
    def serialize_comment(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "user": {"name":self.user.username, "img_user": self.user.img}
        }