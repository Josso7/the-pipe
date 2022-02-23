import './Videos.css';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideos } from '../../store/video';
import { getComments, postComment } from '../../store/comment';
import { getUsers } from '../../store/users';
function Videos(){

    const dispatch = useDispatch();
    const { id } = useParams();
    let videoSrc;
    let videoDate;
    const videos = useSelector(state => state?.videos?.entries)
    const user = useSelector(state => state?.session?.user)
    const users = useSelector(state => state?.users.entries)
    const comments = useSelector(state => state?.videos?.entries)
    const [userComment, setUserComment] = useState('');


    useEffect(() => {
        dispatch(getVideos());
        dispatch(getComments(id));
        dispatch(getUsers());
    }, [])

    if (videos) {
        videoSrc = videos.find(video => video.id == id)
    }
    if (videoSrc){
    }
    const convertDatetoDateWithoutTime = () => {
        videoDate = videoSrc.created_at_date.split(' ');
        videoDate.pop();
        videoDate.pop();
        videoDate.shift();
        videoDate[0] = videoDate[0] + ',';
        [videoDate[0], videoDate[1]] = [videoDate[1], videoDate[0]];
        videoDate = videoDate.join(' ');
    }

    const addComment = () => {
        dispatch(postComment(userComment, videoSrc.id, user.id));
    }

    if(videoSrc) {
        convertDatetoDateWithoutTime();
    }

    return (
        <>
        <Navbar/>
        <div className='video-container'>
            {videoSrc && <video
            controls
            src={videoSrc.video_url}>
            </video>}
        </div>
        <div className='video-title-container'>
            {videoSrc && <p>{videoSrc.title}</p>}
        </div>
        <div className='video-details-container'>
            {videoSrc && <p>{videoSrc.views} views</p>}
            <p className='bullet-point'>•</p>
            {<p>{videoDate}</p>}
        </div>
        <div className='video-user-info-container'>
            <div className='user-icon'>
            </div>
            <div className='user-info'>
                {user && <p className='username'>{user.username}</p>}
                {user && <p className='subscriber-count'>{user.subscriber_count} subscribers</p>}
            </div>
            <div className='subscribe-button'>
                <div className='subscribe-text'>SUBSCRIBE</div>
            </div>
        </div>
        <div className='add-comment'>
            <input
            className='comment-input'
             type='text'
             placeholder='Add a comment...'
             value={userComment}
             onChange={(e) => setUserComment(e.target.value)}>
            </input>
            <button
            onClick={addComment}
            >Comment
            </button>
        </div>
        <div className='comments-container'>
            {comments && comments.map(comment => (
            <div className='single-comment'>
                <div className='user-icon'
                id='comment'>
                    {/* {users && console.log('-------------------', users.find(user => user.id === comment.user_id))} */}
                    {users && <p className='user-comment-text'>{users.find(user => user.id === comment.user_id).username[0].toUpperCase()}</p>}
                </div>
                <div className='comment-info'>
                    <div className='user-name'>
                        {users && <div>{users.find(user => user.id === comment.user_id).username}
                            <span className='date'>Date created</span>
                        </div>}

                    </div>
                    <div className='comment'>
                        This is a comment
                    </div>
                </div>
            </div>
            ))}
        </div>
        </>
    )
}

export default Videos;
