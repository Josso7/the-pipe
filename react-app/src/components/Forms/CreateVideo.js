import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { postVideo } from '../../store/video';

function CreateVideo({ setIsOpen }) {
  const dispatch = useDispatch();
  const [videoFile, setVideoFile] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state?.session?.user)

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
  return (
    <form onSubmit={e=> uploadFile(e)}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
          <input
          type='file'
          onChange={e => setVideoFile(e.target.files[0])}
          ></input>
            <button
            type='submit'
            >
            Upload Video
            </button>
      </label>
    </form>
  );
}

export default CreateVideo;
