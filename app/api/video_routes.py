from locale import currency
from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Video, Comment, db
from datetime import datetime, date
from sqlalchemy import desc

video_routes = Blueprint('videos', __name__)

@video_routes.route('/', methods=['POST'])
@login_required
def post_video():
    url = request.json
    video = Video(
        user_id = url['userId'],
        video_url = url['videoUrl'],
        title = url['title'],
        description = url['description'],
        created_at_date = date.today(),
        created_at_time = datetime.utcnow(),
        views = 0
    )
    db.session.add(video)
    db.session.commit()
    return {1:1}

@video_routes.route('/', methods=['GET'])
def get_videos():
    videos = Video.query.order_by(Video.id).all()
    return {'videos' : [video.to_dict() for video in videos]}

@video_routes.route('/<int:video_id>/video-comments', methods=['POST'])
@login_required
def post_comment(video_id):
    data = request.json
    comment = Comment(
        user_id = data['userId'],
        video_id = data['videoId'],
        content = data['comment'],
        created_at_date = date.today(),
        created_at_time = datetime.utcnow()
    )
    db.session.add(comment)
    db.session.commit()
    return{'comment': comment.to_dict()}

@video_routes.route('/<int:video_id>/video-comments', methods=['GET'])
def get_comments(video_id):
    comments = db.session.query(Comment).filter(video_id == Comment.video_id).order_by(Comment.id.desc()).all()
    return {'comments': [comment.to_dict() for comment in comments]}

@video_routes.route('/video-comments', methods=['GET'])
def get_all_comments():
    comments = db.session.query(Comment).all()
    return {'comments': [comment.to_dict() for comment in comments]}

@video_routes.route('/<int:video_id>/video-comments/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(video_id, comment_id):
    data = request.json

    currentComment = Comment.query.get(comment_id)

    if (currentComment):
        currentComment.content = data['comment']
        db.session.commit()
        return {'comment' : currentComment.to_dict()}

    return {'didnt work'}

@video_routes.route('/<int:video_id>/video-comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(video_id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return 'Delete successful'

@video_routes.route('/<int:video_id>/views', methods=['PUT'])
@login_required
def add_view(video_id):
    currentVideo = Video.query.get(video_id)

    if(currentVideo):
        currentVideo.views += 1
        db.session.commit()
        return {1:1}

@video_routes.route('/<int:video_id>', methods=['PUT'])
@login_required
def edit_video(video_id):
    data = request.json
    print(data)
    currentVideo = Video.query.get(video_id)

    currentVideo.title = data['title']
    currentVideo.description = data['description']
    db.session.commit()
    return {'video': currentVideo.to_dict()}

@video_routes.route('/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    db.session.query(Video).filter(Video.id == video_id).delete()
    db.session.commit()
    return {1:1}
