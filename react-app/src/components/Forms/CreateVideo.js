import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import { postVideo } from '../../store/video';
import { getVideos } from "../../store/video";
import './CreateVideo.css'

function CreateVideo({ setUploadIsOpen }) {
  const dispatch = useDispatch();
  const [videoFile, setVideoFile] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const user = useSelector(state => state?.session?.user)
  let uploadDescriptionContainer;
  let uploadTitleContainer;
  let textareaDescriptionInput;
  let textareaTitleInput

  const uploadFile = async (e) => {
    setDisplayErrors(true);
    e.preventDefault();
    if(errors.length === 0){
      e.preventDefault();
      setIsUploading(true);
      const files = videoFile;
      const data = new FormData();
      data.append('file', files);
      data.append('upload_preset', 'vc4ugcc1');
      const res = await fetch('https://api.cloudinary.com/v1_1/dbxywjkcf/video/upload', {
        method: 'POST',
        body: data
      });
      const file = await res.json();
      await dispatch(postVideo(file.secure_url, title, description, user.id));
      setUploadIsOpen(false);
      setIsUploading(false);
      dispatch(getVideos());
    }
  }

  useEffect(() => {


    dispatch(getUsers());
    return () => {

    }
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
    if(videoFile){
      let videoPlayer = document.getElementById('upload-video-player');
      let url = URL.createObjectURL(videoFile);
      videoPlayer.src = url;
    }
  }, [videoFile])

  useEffect(() => {
    const errors = [];

    if(title.length <= 0) errors.push('Title must contain at least one character');
    if(description.length <= 0) errors.push('Description must contain at least one character');
    if(videoFile)console.log(videoFile.type);
    if(videoFile) {
      if(videoFile.type !== 'video/mp4') errors.push('Please select a mp4 file')
    }
    setErrors(errors);
  }, [title, description, videoFile])

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

    <form id='upload-form-div' className='form-container' onSubmit={e=> uploadFile(e)}>
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
          <label className='upload-files-button' htmlFor='upload-files-input'>SELECT FILE</label>
              <input
                id='upload-files-input'
                type='file'
                onChange={e => setVideoFile(e.target.files[0])}
              ></input>
        {videoFile && <div
          className='selected-file-details'>
          {videoFile && <video
            id='upload-video-player'
            >
          </video>}
          {videoFile && <div
          className='filename-text'>
            Filename
            </div>}
          {videoFile && <div
          className='video-file-name'>
            {videoFile.name}
          </div>
          }
        </div>}
        {videoFile && <button
          id='upload-choose-file-input-id'
          className='upload-choose-file-input'
          type='submit'
          >
          {isUploading ? 'UPLOADING...': 'UPLOAD VIDEO'}
        </button>}
      </div>
      </div>

    </form>
  );
}

export default CreateVideo;
