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
    const [addCommentErrors, setAddCommentErrors] = useState([]);
    const [editCommentErrors, setEditCommentErrors] = useState([]);

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
        document.body.addEventListener('keydown', (e) => submitCommentOnEnter(e));

    }, [])

    useEffect(() => {
        heightLimit = 200;
        if (userComment) editCommentTextArea = document.getElementById('edit-comment-textarea-id');
        if (editCommentTextArea) editCommentTextArea.style.height = Math.min(editCommentTextArea.scrollHeight, heightLimit) + "px";

        // let saveButton = document.getElementById(`edit-button-${editComment}`);
        // if(saveButton){
        //     if(editCommentErrors.length > 0) {
        //         console.log(editCommentErrors);
        //         saveButton.classList.add('inactive')
        //     } else {
        //         saveButton.classList.remove('inactive')
        //     }
        // }

    }, [userComment])

    useEffect(() => {
        const errors = [];

        if(addVideoComment.length <= 0) errors.push('Please enter at least one character')
        if(addVideoComment.length > 10000) errors.push('Comment too long, maximum length is 10,000 characters')

        setAddCommentErrors(errors);
    }, [addVideoComment])

    useEffect(() => {
        if(editComment !== 0){
            const errors = [];

            if(userComment.length <= 0) errors.push('Please enter at least one character')
            if(userComment.length > 10000) errors.push('Comment too long, maximum length is 10,000 characters')

            setEditCommentErrors(errors);
            console.log(editCommentErrors);
        }
    },[userComment])

    useEffect(() => {

        if(user) {
            textareaAddComment = document.getElementById('textarea-add-comment-input');
        };
        if(user) textareaAddComment.addEventListener('click', setTextareaCommentActive);
        if(user) rootDiv = document.getElementById('root');
        if(user) rootDiv.addEventListener('click', (e) => setTextareaCommentInactive(e));
        if(comments) document.getElementsByClassName('comment');

        return () => {
            if(user) document.body.removeEventListener('keydown', {});
            if(user) rootDiv.removeEventListener('click', {});
            if(user) textareaAddComment.removeEventListener('click', {});
        }
    }, [user, openAddComment, comments])

    useEffect(() => {
        let saveCommentButtonClasses = document.getElementsByClassName('save');
        if (saveCommentButtonClasses) {
            while (saveCommentButtonClasses.length){
                saveCommentButtonClasses[0].className = saveCommentButtonClasses[0].className.replace('save', '');
            }
        }
        let editCommentButton = document.getElementById(`edit-button-${editComment}`)
        if(editCommentButton) editCommentButton.classList.add('save');
    },[editComment]);

    // useEffect(() => {
    //     editCommentTextArea = document.getElementById('edit-comment-textarea-id');
    //     console.log(editCommentTextArea);
    //     // if(editCommentTextArea) editCommentTextArea.addEventListener('click', setTextareaEditCommentActive);
    //     return () => {
    //         // editCommentTextArea.removeEventListener('click', {});
    //     }
    // }, [editComment])

    if (videos && !videoSrc) {
        videoSrc = videos.find(video => video.id == id)
    }

    if (users && testUser && !testUser) {
        testUser = users.find(element => element.id == videoSrc.user_id)
    }


    const submitCommentOnEnter = (e) => {
        let addCommentButtonId = document.getElementById('add-comment-button-id');
        if(e.code === 'Enter'){
            e.preventDefault();
            if(addCommentButtonId) {
                addCommentButtonId.click();
            }
        }
    }

    const setTextareaCommentActive = () => {
       textareaAddComment.classList.add('active');
       setOpenAddComment(true);
    }

    // const setTextareaEditCommentActive = () => {
    //     // editCommentTextArea = document.getElementById('edit-comment-textarea-id');
    //     editCommentTextArea.classList.add('active');
    //     console.log(editCommentTextArea.classList)

    // }

    // const setTextareaEditCommentInactive = (e) => {
    //     if(e.target.className !== 'comment-input active')
    //     editCommentTextArea.classList.remove('active');

    // }

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

    const handleEditCommentButtonClick = (e) => {
        console.log(e.target.id);
        if (editCommentErrors.length === 0 && editComment !== 0 && e.target.id == `edit-button-${editComment}`) {
            console.log('test');
            handleEdit();
            setEditComment(1);
            dispatch(getComments(id));
        }
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
    let saveButton = document.getElementById(`edit-button-${editComment}`);
    if (saveButton) {
        if (editCommentErrors.length > 0) {
            console.log(editCommentErrors);
            saveButton.classList.add("inactive");
        } else {
            saveButton.classList.remove("inactive");
        }
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
                {/* {users && videoSrc && <p className='subscriber-count'>{users?.find(element => element.id === videoSrc.user_id).subscriber_count} subscribers</p>} */}
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
                    {user && addCommentErrors.length === 0 && <button
                    id='add-comment-button-id'
                    className='add-comment-button'
                    onClick={addComment}
                    >COMMENT
                    </button>}
                    {user && addCommentErrors.length > 0 && <button
                    id='add-comment-button-id-disabled'
                    className='add-comment-button-disabled'
                    >COMMENT
                    </button>}
                </div>}
        </div>}
        {comments && <div className='comments-container'>
            {comments && comments.map(comment => (
            <div
            key={comment.id}
            className='comments-container-wrapper'>
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
                        placeholder='Add a comment...'
                        autoFocus
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}>
                        </textarea>
                        }
                    </div>
                    {editComment !== comment.id && <div className='comment'>
                        {comment.content}
                    </div>}
                </div>
                {user && comment.user_id === user.id && <div
                id={`edit-comment-button-${comment.id}`}
                className='edit-comment-button-container'>
                    {<button className='edit-button'
                    id={`edit-button-${comment.id}`}
                    onClick={(e) => {
                        editCommentInput(comment.id)
                        handleEditCommentButtonClick(e)
                        setUserComment(comment.content)
                    }}
                    ></button>}
                {/* {editCommentErrors.length > 0 && editComment !== 0 && <button
                className='edit-button-inactive'
                    ></button>} */}
                {/* {editCommentErrors.length == 0  && editComment !== 0 && <button
                key={comment.id}
                id={comment.id}
                onClick={() => {
                    setEditComment(0);
                    handleEdit();
                }}
                className='edit-button'
                    >SAVE</button>} */}
                </div>}
                {user && comment.user_id === user.id && <div className='delete-comment-button-container'>
                    <button className='delete-button'
                    onClick={() => handleDelete(comment.id)}>DELETE</button>
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
