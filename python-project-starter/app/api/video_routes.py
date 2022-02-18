from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Video, db
from datetime import datetime

video_routes = Blueprint('videos', __name__)

@video_routes.route('/', methods=['POST'])
@login_required
def post_video():
    url = request.json
    print('``````````````````', url)
    video = Video(
        user_id = url['userId'],
        video_url = url['videoUrl'],
        title = url['title'],
        description = url['description'],
        created_at = datetime.utcnow(),
        updated_at = datetime.utcnow()
    )
    db.session.add(video)
    db.session.commit()
    return {1:1}

@video_routes.route('/', methods=['GET'])
def get_videos():
    videos = Video.query.all()
    print('---------------------- VIDEOS', videos[0].to_dict())
    return {'videos' : [video.to_dict() for video in videos]}
