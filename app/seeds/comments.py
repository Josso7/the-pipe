from app.models import db, Comment
from datetime import datetime, date

def seed_comments():
    comment1 = Comment(
        user_id = 1, video_id = 5, content='First comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment2 = Comment(
        user_id = 1, video_id = 5, content='Second comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment3 = Comment(
        user_id = 1, video_id = 5, content='really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping',
        created_at_date=date.today(), created_at_time=datetime.utcnow()
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()