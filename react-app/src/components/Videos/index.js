import './Videos.css';
import Navbar from '../Navbar';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideos } from '../../store/video';
import { getComments, postComment, editUserComment, deleteUserComment } from '../../store/comment';
import { getUsers } from '../../store/users';

function Videos(){
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    let videoSrc;
    let testUser;
    const videos = useSelector(state => state?.videos?.entries)
    const user = useSelector(state => state?.session?.user)
    const users = useSelector(state => state?.users?.entries)
    const comments = useSelector(state => state?.comments?.entries)
    const [userComment, setUserComment] = useState('');
    const [editComment, setEditComment] = useState(0);
    const [addVideoComment, setAddVideoComment] = useState('');

    let textarea;
    let heightLimit;

    useEffect(() => {
        dispatch(getVideos());
        dispatch(getComments(id));
        dispatch(getUsers());
    }, [])

    if (videos && !videoSrc) {
        videoSrc = videos.find(video => video.id == id)
    }

    if (users && testUser && !testUser) {
        testUser = users.find(element => element.id == videoSrc.user_id)
        console.log(testUser)
    }

    const convertDatetoDateWithoutTime = (video) => {
        if (video.created_at_date){
            if (video.created_at_date.length > 15) {
                let date = video.created_at_date.split(' ');
                date.pop();
                date.pop();
                date.shift();
                date[0] = date[0] + ',';
                [date[0], date[1]] = [date[1], date[0]];
                date = date.join(' ');
                video.created_at_date = date;
                return video;
            }
        }
        return video
    }

    const addComment = () => {
        dispatch(postComment(addVideoComment, videoSrc.id, user.id));
        setTimeout(() => {
            window.scrollTo(0,document.body.scrollHeight);
        }, 250 )
    }

    const handleEdit = () => {
        dispatch(editUserComment(userComment, videoSrc.id, user.id, editComment));
        history.push(`/videos/${videoSrc.id}`)
    }

    const handleDelete = (commentId) => {
        dispatch(deleteUserComment(videoSrc.id, commentId))
    }

    const editCommentInput = (commentId) => {
        setEditComment(commentId);
    }


    if(videoSrc) {
        videoSrc = convertDatetoDateWithoutTime(videoSrc);
    }

    if(editComment !== 0){
        textarea = document.getElementById("textarea");
        heightLimit = 200; /* Maximum height: 200px */
    }

    if(textarea){
        textarea.oninput = function() {
            textarea.style.height = ""; /* Reset the height*/
            textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
        };
    }

    return (
        <>
        <Navbar/>
        <div className='video-container'>
            {videoSrc && <video
            autoplay
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
            {videoSrc && <p>{videoSrc.created_at_date}</p>}
        </div>
        <div className='video-user-info-container'>
            <div className='user-icon'>
                {users && videoSrc && <div className='user-icon-text'>{users?.find(element => element.id == videoSrc.user_id).username[0].toUpperCase()}</div>}
            </div>
            <div className='user-info'>
                {users && videoSrc && <p className='username'>{users?.find(element => element.id == videoSrc.user_id).username}</p>}
                {users && videoSrc && <p className='subscriber-count'>{users?.find(element => element.id === videoSrc.user_id).subscriber_count} subscribers</p>}
            </div>
            <div className='subscribe-button'>
                <div className='subscribe-text'>SUBSCRIBE</div>
            </div>
        </div>
        {user && <div className='add-comment'>
            <input
            className='comment-input'
            type='text'
            placeholder='Add a comment...'
            value={addVideoComment}
            onChange={(e) => setAddVideoComment(e.target.value)}>
            </input>
            <button
            onClick={addComment}
            >Comment
            </button>
        </div>}
        {comments && <div className='comments-container'>
            {comments && comments.map(comment => (
            <div className='single-comment' key={comment.id}>
                <div className='user-icon'
                id='comment'
                >
                    {users && <p className='user-comment-text'>{users?.find(element => element.id === comment.user_id).username[0].toUpperCase()
                    }</p>}
                </div>
                <div className='comment-info'>
                    <div className='user-name-date'>
                        {users && <div className='user-name'>{users?.find(element => element?.id == comment?.user_id).username}
                            {<span className='date'>{convertDatetoDateWithoutTime(comment)?.created_at_date}</span>}
                        </div>}

                    </div>
                    <div>
                        {editComment === comment.id &&
                        <textarea
                        autoFocus
                        onBlur={(e) => {
                            setEditComment(0);
                            handleEdit();
                        }}
                        id='textarea'
                        cols='100'
                        // defaultValue={comment.content}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}>
                        </textarea>
                        }
                    </div>
                    {editComment !== comment.id && <div className='comment'>
                        {comment.content}
                    </div>}
                </div>
                {user && comment.user_id === user.id && <div className='edit-comment-button-container'>
                    <button className='edit-button' key={comment.id}
                    onClick={() => {
                        editCommentInput(comment.id)
                        setUserComment(comment.content)
                    }}
                    >Edit</button>
                </div>}
                {user && comment.user_id === user.id && <div className='delete-comment-button-container'>
                    <button className='delete-button'
                    onClick={() => handleDelete(comment.id)}>Delete</button>
                </div>}
            </div>
            ))}
        </div>}
        </>
    )
}

export default Videos;
