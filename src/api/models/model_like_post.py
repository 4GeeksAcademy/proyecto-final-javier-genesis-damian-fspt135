from api.database.db import db
from sqlalchemy import String, Boolean, Text,  ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

class LikePost (db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id = mapped_column(ForeignKey ("user.id"), nullable=False)
    post_id = mapped_column(ForeignKey ("post.id"), nullable=False)
    user = relationship("User", overlaps="likedPost")
    post = relationship("Post", overlaps="likedPost")


    def serialize_like_post(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id
        }