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
    comment4 = Comment(
        user_id = 1, video_id = 5, content='First comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment5 = Comment(
        user_id = 1, video_id = 5, content='Second comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment6 = Comment(
        user_id = 1, video_id = 5, content='really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping',
        created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment7 = Comment(
        user_id = 1, video_id = 5, content='First comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment8 = Comment(
        user_id = 1, video_id = 5, content='Second comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment9 = Comment(
        user_id = 1, video_id = 5, content='really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping',
        created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment10 = Comment(
        user_id = 1, video_id = 5, content='First comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment11 = Comment(
        user_id = 1, video_id = 5, content='Second comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment12 = Comment(
        user_id = 1, video_id = 5, content='really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping',
        created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment13 = Comment(
        user_id = 1, video_id = 5, content='First comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment14 = Comment(
        user_id = 1, video_id = 5, content='Second comment', created_at_date=date.today(), created_at_time=datetime.utcnow()
    )
    comment15 = Comment(
        user_id = 1, video_id = 5, content='really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping really long content to test wrapping',
        created_at_date=date.today(), created_at_time=datetime.utcnow()
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
