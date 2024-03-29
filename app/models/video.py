from .db import db
from sqlalchemy.dialects.mysql import TIME
from datetime import datetime
class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    video_url = db.Column(db.String(1000), nullable=False)
    views = db.Column(db.Integer, nullable=False)
    created_at_date = db.Column(db.String(100), nullable=False)
    created_at_time = db.Column(db.TIME(), nullable=False)

    # user = db.relationship(
    #     'User', back_populates='video')
    # comment = db.relationship(
    #     'Comment', back_populates='video', cascade='delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'video_url': self.video_url,
            'views': self.views,
            'created_at_date': self.created_at_date,
            'created_at_time': str(self.created_at_time),
        }
