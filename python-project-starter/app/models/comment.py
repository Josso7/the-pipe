from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    video_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(10000), nullable=False)
    created_at_date = db.Column(db.String(100), nullable=False)
    created_at_time = db.Column(db.TIME(), nullable=False)

    # user = db.relationship(
    #     'User', back_populates='comment')
    # video = db.relationship(
    #     'Video', back_populates='comment')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'content': self.content,
            'created_at_date': self.created_at_date,
            'created_at_time': str(self.created_at_time),
        }
