from app.models import db, Video
from datetime import datetime


def seed_videos():
    video1 = Video(
        user_id = 1, title='1 Second Video', description='This is a 1 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152403/db_seeders/1_Second_Video-_480p_yht7uh.mp4', created_at=datetime.utcnow(), updated_at=datetime.utcnow()
    )
    video2 = Video(
        user_id = 1, title='2 Second Video', description='This is a 2 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152403/db_seeders/2_Second_Video-_480p_wczq17.mp4', created_at=datetime.utcnow(), updated_at=datetime.utcnow()
    )
    video3 = Video(
        user_id = 2, title='3 Second Video', description='This is a 3 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152403/db_seeders/3_Second_Video-_480p_iieljz.mp4', created_at=datetime.utcnow(), updated_at=datetime.utcnow()
    )
    video4 = Video(
        user_id = 2, title='Nyan Cat Song', description='This is a Nyan Cat Video' ,video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152403/db_seeders/nyan_cat_song_for_10_seconds_360p_ng1gcf.mp4', created_at=datetime.utcnow(), updated_at=datetime.utcnow()
    )
    video5 = Video(
        user_id = 3, title='Upload Videos to Cloudinary in 5 Minutes or Less', description='This is a video about how to upload to cloudinary.', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152417/db_seeders/Upload_Videos_to_Cloudinary_In_5_Minutes_or_Less_1_hjcqcr.mp4', created_at=datetime.utcnow(), updated_at=datetime.utcnow()
    )

    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
