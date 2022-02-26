from app.models import db, Video
from datetime import date, datetime


def seed_videos():
    video1 = Video(
        user_id = 2, title='All over in 10 seconds', views=34, description='This is a 1 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823030/db_seeders/All_over_in_10_seconds_720p_ip2rc9.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video2 = Video(
        user_id = 1, title='Funny cat and mirror video', views=102, description='This is a 2 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823029/db_seeders/Funny_Cat_And_mirror_Video_Funny_video_What_s_App_Videos_30_Seconds_Status_Video__ejytm5.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video3 = Video(
        user_id = 1, title='Himalayan mountain sunset time lapse', views=1039, description='This is a 3 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823027/db_seeders/Himalayan_mountain_sunset_Time_Lapse_4K_720p_ptr1gr.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video4 = Video(
        user_id = 1, title='Above the clouds sunrise timelapse', views=145, description='This is a Nyan Cat Video' ,video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823027/db_seeders/Above_the_clouds_sunrise_timelapse_jxt6yh.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video5 = Video(
        user_id = 1, title='10 seconds of cat', views=134, description='This is a video about how to upload to cloudinary.', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823027/db_seeders/10_Seconds_of__Cat_khnizx.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video6 = Video(
        user_id = 1, title='Clouds in cgi', views=123, description='This is a 1 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823025/db_seeders/Clouds_in_CGI-_480p_rartnm.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video7 = Video(
        user_id = 1, title='Nature in 10 seconds', views=19, description='This is a 1 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823024/db_seeders/Nature_in_10_seconds_1_360p_kqsxbd.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video8 = Video(
        user_id = 1, title='Upload videos to cloudinary in 5 minutes, extra title content to test out title overflow!!!!!!!!!!!', views=0, description='This is a 1 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152417/db_seeders/Upload_Videos_to_Cloudinary_In_5_Minutes_or_Less_1_hjcqcr.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )

    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.add(video6)
    db.session.add(video7)
    db.session.add(video8)
    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
