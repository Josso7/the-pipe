import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import { editVideo, getVideos } from "../../store/video";
import './EditVideo.css';

function EditVideo({ setEditIsOpen, videoId }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);
    const user = useSelector(state => state?.session?.user)

    let uploadDescriptionContainer;
    let uploadTitleContainer;
    let textareaDescriptionInput;
    let textareaTitleInput

    useEffect(() => {
      dispatch(getUsers());
    },[dispatch])

    useEffect(() => {
      uploadDescriptionContainer = document.getElementById('upload-description-div');
      textareaDescriptionInput = document.getElementById('textarea-description-input');
      uploadTitleContainer = document.getElementById('upload-title-div');
      textareaTitleInput = document.getElementById('textarea-title-input');
      textareaDescriptionInput.addEventListener('click', handleActiveDescriptionInput)
      textareaTitleInput.addEventListener('click', handleActiveTitleInput)
      let upLoadFormDiv = document.getElementById('upload-form-div');
      upLoadFormDiv.addEventListener('click', (e) => handleInactiveDescriptionInput(e))
      upLoadFormDiv.addEventListener('click', (e) => handleInactiveTitleInput(e))
    },[user])

    useEffect(() => {
      const errors = [];

      if(title.length <= 0) errors.push('Title must contain at least one character');
      if(description.length <= 0) errors.push('Description must contain at least one character');

      setErrors(errors);
    }, [title, description])

    const handleSubmit = (e) => {
        if(errors.length === 0){
            e.preventDefault()
            dispatch(editVideo(videoId, title, description));
            dispatch(getVideos());
            setEditIsOpen(false);
        }
        if(errors.length > 0){
            setDisplayErrors(true);
        }
    }

    let textarea = document.getElementById('textarea');
    let heightLimit = 200;

    if(textarea){
      textarea.oninput = function() {
          textarea.style.height = ""; /* Reset the height*/
          textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
      };
    }

    const handleActiveDescriptionInput = () => {
      uploadDescriptionContainer.classList.add('active')
    }

    const handleActiveTitleInput = () => {
      uploadTitleContainer.classList.add('active')
    }

    const handleInactiveDescriptionInput = (e) => {
      if(e.target.className !== 'upload-description-label' && e.target.className !== 'upload-description-container' && e.target.className !== 'upload-description-input'){
          uploadDescriptionContainer.classList.remove('active');
      }
    }

    const handleInactiveTitleInput = (e) => {
      if(e.target.className !== 'upload-title-label' && e.target.className !== 'upload-title-container' && e.target.className !== 'upload-title-input'){
          uploadTitleContainer.classList.remove('active');
      }
    }
    console.log(errors);
    return (
<form id='upload-form-div' className='form-container' onSubmit={(e)=> handleSubmit(e)}>
      <div className='upload-form-container'>
      <div className='upload-form-title-header-wrapper'>
        <div className='upload-form-title-header'>
          {`${title ? title : 'Title...' }`}
        </div>
      </div>
      {errors && displayErrors && <ul className='errors-list'>
        {errors.map((error, idx) => (
          <li className='upload-form-errors-container' key={idx}>{error}</li>
        ))}
      </ul>}
      <div className='upload-form-inputs-wrapper'>
        <div className='upload-form-details-text'>
            Video Details
        </div>
        <div id='upload-title-div' className='upload-title-container'>
        <label className='upload-title-label'>
          Title (required)
          <textarea
            placeholder='Add a title that describes your video'
            id='textarea-title-input'
            cols='80'
            rows='2'
            className='upload-title-input'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        </div>
        <div id='upload-description-div' className="upload-description-container">
        <label className='upload-description-label'>
          Description
          <textarea
            placeholder='Tell your viewers about your video'
            id='textarea-description-input'
            className='upload-description-input'
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        </div>
      </div>
      </div>
        <button
          id='edit-video-submit-button-id'
          className='edit-video-submit-button'
          type='submit'
          >
          SUBMIT CHANGES
        </button>
    </form>
    )
}

export default EditVideo;
