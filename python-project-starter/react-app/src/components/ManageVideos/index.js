import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postVideo } from '../../store/video'
import Modal from '../Modal'
import CreateVideo from '../Forms/CreateVideo';
import Navbar from '../Navbar';

function ManageVideos(){
    const dispatch = useDispatch();

    const [videoFile, setVideoFile] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    const BUTTON_WRAPPER_STYLES = {
      position: 'relative',
      zIndex: 1
    }

    const OTHER_CONTENT_STYLES = {
      position: 'relative',
      zIndex: 2,
      backgroundColor: 'red',
      padding: '10px'
    }

    const uploadFile = async () => {
        const files = videoFile;
        const data = new FormData();
        data.append('file', files);
        data.append('upload_preset', 'vc4ugcc1');
        const res = await fetch('https://api.cloudinary.com/v1_1/dbxywjkcf/video/upload', {
          method: 'POST',
          body: data
        });
        const file = await res.json();
        console.log('----------- RESPONSE FROM CLOUDINARY ', file);
        console.log('----------- FILE.SECURE_URL ', file.secure_url);
        dispatch(postVideo(file.secure_url, title, description));

      }

    console.log('---------- REACT STATE videoFile', videoFile);

    return (
        <div id='portal'>
          <Navbar />
            {/* <div>Hello from Manage Videos</div>
            <input type='file'
            onChange={e => setVideoFile(e.target.files[0])}
            ></input>
                <button
                type='submit'
                onClick={uploadFile}
                >
                Upload Video
                </button> */}
          <div style={BUTTON_WRAPPER_STYLES}>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <CreateVideo setIsOpen={setIsOpen}/>
            </Modal>
          </div>
        </div>
    );
};

export default ManageVideos;
