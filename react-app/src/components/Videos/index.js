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
    const [openAddComment, setOpenAddComment] = useState(false);
    const [errors, setErrors] = useState('');

    let addCommentTextArea;
    let heightLimit;
    let textareaAddComment;
    let rootDiv;
    let editCommentTextArea;
    const allComments= [];

    useEffect(() => {
        dispatch(getVideos());
        dispatch(getComments(id));
        dispatch(getUsers());
        document.body.addEventListener('keyup', (e) => submitCommentOnEnter(e));

    }, [])

    useEffect(() => {

        if(user) {
            textareaAddComment = document.getElementById('textarea-add-comment-input');
            console.log(textareaAddComment);
        };
        if(user) textareaAddComment.addEventListener('click', setTextareaCommentActive);
        if(user) rootDiv = document.getElementById('root');
        if(user) rootDiv.addEventListener('click', (e) => setTextareaCommentInactive(e));
        if(comments) document.getElementsByClassName('comment');

        return () => {
            document.body.removeEventListener('keyup', {});
            rootDiv.removeEventListener('click', {});
            textareaAddComment.removeEventListener('click', {});
        }
    }, [user, openAddComment, comments])

    if (videos && !videoSrc) {
        videoSrc = videos.find(video => video.id == id)
    }

    if (users && testUser && !testUser) {
        testUser = users.find(element => element.id == videoSrc.user_id)
    }


    const submitCommentOnEnter = (e) => {
        let addCommentButtonId = document.getElementById('add-comment-button-id');
        // let textareaAddCommentInput = document.getElementById('textarea-add-comment-input');
        if(e.code === 'Enter'){
            e.preventDefault();
            if(addCommentButtonId) {
                addCommentButtonId.click();
                // textareaAddCommentInput.style.height = 21 + 'px';
            }
        }
    }

    const setTextareaCommentActive = () => {
       textareaAddComment.classList.add('active');
       setOpenAddComment(true);
    }

    const setTextareaCommentInactive = (e) => {
        if(e.target.className !== 'comment-input active')
        textareaAddComment.classList.remove('active');
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
        setAddVideoComment('');
        let textareaAddCommentInput = document.getElementById('textarea-add-comment-input');
        textareaAddCommentInput.style.height = 21 + 'px';
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

    const cancelOnClick = () => {
        setOpenAddComment(false);
        setAddVideoComment('');
    }

    if(videoSrc) {
        videoSrc = convertDatetoDateWithoutTime(videoSrc);
    }

    editCommentTextArea = document.getElementById('edit-comment-textarea-id');
    addCommentTextArea = document.getElementById('textarea-add-comment-input');
    heightLimit = 200; /* Maximum height: 200px */

    if(addCommentTextArea){
        addCommentTextArea.oninput = function() {
            addCommentTextArea.style.height = ""; /* Reset the height*/
            addCommentTextArea.style.height = Math.min(addCommentTextArea.scrollHeight, heightLimit) + "px";
        };
    }

    if(editCommentTextArea){
        editCommentTextArea.oninput = function() {
            editCommentTextArea.style.height = ""; /* Reset the height*/
            editCommentTextArea.style.height = Math.min(editCommentTextArea.scrollHeight, heightLimit) + "px";
        };
    }

    function isEllipsisActive(e) {
        return (e.offsetWidth < e.scrollWidth);
   }

    return (
        <>
        <Navbar/>
        <div className='video-container'>
            {videoSrc && <video
            autoPlay
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
        {videoSrc && <div
            className='comments-counter'>
                {comments && comments.length} {comments && comments.length === 1 ? 'Comment' : 'Comments'}
            </div>}
        {user && <div className='add-comment-wrapper'>
            <div className='add-comment'>
                <div
                className='user-icon'
                id='user-icon-videos'>
                    <div className='user-icon-videos-text'>
                        {user.username[0].toUpperCase()}
                    </div>
                </div>
                <textarea
                id='textarea-add-comment-input'
                className='comment-input'
                placeholder='Add a comment...'
                value={addVideoComment}
                onChange={(e) => setAddVideoComment(e.target.value)}>
                </textarea>
            </div>
            {user && openAddComment && <div
            className='add-comment-actions-container'>
                    {user && <button
                    className='cancel-comment-button'
                    onClick={cancelOnClick}
                    >CANCEL
                    </button>}
                    {user && <button
                    id='add-comment-button-id'
                    className='add-comment-button'
                    onClick={addComment}
                    >COMMENT
                    </button>}
                </div>}
        </div>}
        {comments && <div className='comments-container'>
            {comments && comments.map(comment => (
            <div className='comments-container-wrapper'>
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
                        id='edit-comment-textarea-id'
                        className='edit-comment-textarea'
                        autoFocus
                        onBlur={(e) => {
                            setEditComment(0);
                            handleEdit();
                        }}
                        placeholder='Add a comment...'
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
                <button
                className='view-more-text'>
                    Read more
                </button>
            </div>
            ))}
        </div>}
        <div className='bottom-margin-div'></div>
        </>
    )
}

export default Videos;
