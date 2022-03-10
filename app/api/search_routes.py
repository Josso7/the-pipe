from flask import Blueprint
from app.models import User, Video, Comment, db
from sqlalchemy import func

search_routes = Blueprint('search', __name__)

@search_routes.route('<search_query>', methods=['GET'])
def search(search_query):
    videos = Video.query().filter(func.lower(Video.title).like(search_query.lower()))
    return {'videos': video.to_dict() for video in videos}
