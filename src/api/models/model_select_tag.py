from api.database.db import db
from sqlalchemy import String, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List




class Tag_select(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id = mapped_column(ForeignKey("user.id"), nullable=True)
    user = relationship('User')
    foro_id = mapped_column(ForeignKey("foro.id"), nullable=True)
    foro = relationship('Foro')
    tag_id = mapped_column(ForeignKey("tag.id"), nullable=False)
    tag = relationship('Tag')

    def serialize_tag_user(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "tag": self.tag.serialize_tag()
        }
    
    def serialize_tag_foro(self):
        return{
            "id": self.id,
            "foro_id": self.foro_id,
            "tag": self.tag.serialize_tag()
        }