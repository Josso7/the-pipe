from app.models import db, Video
from datetime import date, datetime


def seed_videos():
    video1 = Video(
        user_id = 1, title='All over in 10 seconds', views=34, description='10 seconds', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823030/db_seeders/All_over_in_10_seconds_720p_ip2rc9.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video2 = Video(
        user_id = 1, title='Funny cat and mirror video', views=102, description='this cat looks like mine', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823029/db_seeders/Funny_Cat_And_mirror_Video_Funny_video_What_s_App_Videos_30_Seconds_Status_Video__ejytm5.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video3 = Video(
        user_id = 1, title='Himalayan mountain sunset time lapse', views=1039, description='timelapse', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823027/db_seeders/Himalayan_mountain_sunset_Time_Lapse_4K_720p_ptr1gr.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video4 = Video(
        user_id = 1, title='Above the clouds sunrise timelapse', views=145, description='super pretty cloudy timelapse' ,video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823027/db_seeders/Above_the_clouds_sunrise_timelapse_jxt6yh.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video5 = Video(
        user_id = 1, title='10 seconds of cat', views=134, description='short cat vid', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823027/db_seeders/10_Seconds_of__Cat_khnizx.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video6 = Video(
        user_id = 1, title='Clouds in cgi', views=123, description='cool clouds', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823025/db_seeders/Clouds_in_CGI-_480p_rartnm.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video7 = Video(
        user_id = 1, title='Nature in 10 seconds', views=19, description='10 second video', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645823024/db_seeders/Nature_in_10_seconds_1_360p_kqsxbd.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video8 = Video(
        user_id = 1, title='Upload videos to cloudinary in 5 minutes,!', views=0, description='This video literally did not help AT ALL', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1645152417/db_seeders/Upload_Videos_to_Cloudinary_In_5_Minutes_or_Less_1_hjcqcr.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video9 = Video(
        user_id = 2, title='Turkey person does turkey things', views=341, description='bawk bawk', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048514/db_seeders/yt5s.com-_acnh_Turkey_day_rrnvje.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video10 = Video(
        user_id = 2, title='All doggos are good doggos', views=302, description='this doggo is good boy breed', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048517/db_seeders/yt5s.com-Dog.wmv-_480p_ayjipd.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video11 = Video(
        user_id = 2, title='What even is this?', views=19, description='no clue', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048517/db_seeders/yt5s.com-Video_Game_Haiku_-_Mike_Tyson_s_Punch-Out_v8ht5e.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video12 = Video(
        user_id = 2, title='Lots of crying on the scene of this drugbust', views=15, description='people get caught doing stuff' ,video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048521/db_seeders/yt5s.com-Meth_disguised_as_onions_in_California_drug_bust_ucdhl4.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video13 = Video(
        user_id = 2, title='English lesson time', views=24, description='boring video about english', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048521/db_seeders/yt5s.com-This_That_These_and_Those_-_Minute_english_lessons_ccdqvv.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video14 = Video(
        user_id = 2, title='I have no idea what this video is about', views=129, description='no clue at all', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048522/db_seeders/yt5s.com-The_LG_Method_Vlog_fdzec7.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video15 = Video(
        user_id = 2, title='Weird spiderman guy', views=1912, description='spider man, spiderman', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048524/db_seeders/yt5s.com-It_Is_Wednesday_My_Dudes_Vine_uaxvut.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video16 = Video(
        user_id = 2, title='1 minute short film, spoiler he dead.', views=122, description='short film', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048524/db_seeders/yt5s.com-Saudade___1_Minute_Short_Film___Award-Winning_rvcy3e.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video17 = Video(
        user_id = 3, title='Funny animation skit', views=0, description='comedy skit', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048525/db_seeders/yt5s.com-HERE_I_AM_yfgtx5.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video18 = Video(
        user_id = 3, title='Paper aviator short film', views=341, description='short film', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048527/db_seeders/yt5s.com-The_PAPER_AVIATOR___Film_Riot_Stay_at_Home_Short_Film_Challenge_2.0_ussvwg.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video19 = Video(
        user_id = 3, title='Kermit meme', views=302, description='meme', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048528/db_seeders/yt5s.com-Kermit_sings_Usher_Full_Original_Video_GOODBYE_VINE_oirvgj.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video20 = Video(
        user_id = 3, title='30 second timer', views=19, description='timer', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048528/db_seeders/yt5s.com-30_Second_Timer_BOMB_With_Giant_Bomb_Explosion_uyqyee.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video21 = Video(
        user_id = 3, title='The BEST waffles recipe', views=15, description='waffle recipe' ,video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048531/db_seeders/yt5s.com-The_BEST_Waffles_Recipe_mbtjo1.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video22 = Video(
        user_id = 3, title='Miss universe Thailand', views=24, description='miss universe', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048532/db_seeders/yt5s.com-Miss_Universe_Thailand_runway_coaching_by_Pangina_Heals_and_team_P_khsphe.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video23 = Video(
        user_id = 3, title='Minecraft minecraft minecraft', views=129, description='minecraft', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048532/db_seeders/yt5s.com-vine_vs_sculk_vein_isymjn.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video24 = Video(
        user_id = 3, title='A comedy about making toast(what?)', views=1912, description='comedy film', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048534/db_seeders/yt5s.com-_Toast_-_One_Minute_Comedy_Film___Award_Winning_xc7ucl.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )
    video25 = Video(
        user_id = 3, title='Short 1 minute film about waiting or something', views=122, description='short film', video_url='https://res.cloudinary.com/dbxywjkcf/video/upload/v1646048538/db_seeders/yt5s.com-The_Wait_-_1_Minute_Short_Film_l_Award_Winning_720p_qfku3u.mp4', created_at_date=date.today(), created_at_time=datetime.utcnow().time()
    )

    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.add(video6)
    db.session.add(video7)
    db.session.add(video8)
    db.session.add(video9)
    db.session.add(video10)
    db.session.add(video11)
    db.session.add(video12)
    db.session.add(video13)
    db.session.add(video14)
    db.session.add(video15)
    db.session.add(video16)
    db.session.add(video17)
    db.session.add(video18)
    db.session.add(video19)
    db.session.add(video20)
    db.session.add(video21)
    db.session.add(video22)
    db.session.add(video23)
    db.session.add(video24)
    db.session.add(video25)
    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()
