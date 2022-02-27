import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { postVideo } from '../../store/video';
import './CreateVideo.css'

function CreateVideo({ setIsOpen }) {
  const dispatch = useDispatch();
  const [videoFile, setVideoFile] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const user = useSelector(state => state?.session?.user)
  let uploadDescriptionContainer;
  let uploadTitleContainer;
  let textareaDescriptionInput;
  let textareaTitleInput

  const uploadFile = async (e) => {
    e.preventDefault();
    const files = videoFile;
    const data = new FormData();
    data.append('file', files);
    data.append('upload_preset', 'vc4ugcc1');
    const res = await fetch('https://api.cloudinary.com/v1_1/dbxywjkcf/video/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    dispatch(postVideo(file.secure_url, title, description, user.id));
    setIsOpen(false);
  }

  useEffect(() => {
    uploadDescriptionContainer = document.getElementById('upload-description-div');
    textareaDescriptionInput = document.getElementById('textarea-description-input');
    textareaDescriptionInput.addEventListener('click', handleActiveDescriptionInput)
    let upLoadFormDiv = document.getElementById('upload-form-div');
    upLoadFormDiv.addEventListener('click', (e) => handleInactiveDescriptionInput(e))
    upLoadFormDiv.addEventListener('click', (e) => handleInactiveTitleInput(e))

    uploadTitleContainer = document.getElementById('upload-title-div');
    textareaTitleInput = document.getElementById('textarea-title-input');
    textareaTitleInput.addEventListener('click', handleActiveTitleInput)

    return () => {
      upLoadFormDiv.removeEventListener('click', {});
      textareaDescriptionInput.removeEventListener('click', {});
      textareaTitleInput.removeEventListener('click', {});
    }
  },[])

  useEffect(() => {
    if(videoFile){
      let videoPlayer = document.getElementById('upload-video-player');
      let url = URL.createObjectURL(videoFile);
      videoPlayer.src = url;
    }
  }, [videoFile])

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

  // let uploadDescriptionContainer = document.getElementById('upload-description-div');
  // let textareaInput = document.getElementById('textarea-description-input');
  // console.log(textareaInput);
  // textareaInput.addEventListener('click', handleActiveInput)
  // let upLoadFormDiv = document.getElementById('upload-form-div');
  // upLoadFormDiv.addEventListener('click', (e) => handleInactiveInput(e))

  return (

    <form id='upload-form-div' className='form-container' onSubmit={e=> uploadFile(e)}>
      {/* {errors && <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>} */}
      <div className='upload-form-container'>
      <div className='upload-form-title-header-wrapper'>
        <div className='upload-form-title-header'>
          {`${title ? title : 'Title...' }`}
        </div>
      </div>
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
        <label className='upload-choose-file-label'>
          <label className='upload-files-button'for='upload-files-input'>SELECT FILE</label>
              <input
                id='upload-files-input'
                type='file'
                onChange={e => setVideoFile(e.target.files[0])}
              ></input>
        </label>
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
          className='upload-choose-file-input'
          type='submit'
          >
          UPLOAD VIDEO
        </button>}
      </div>
      </div>

    </form>
  );
}

export default CreateVideo;
