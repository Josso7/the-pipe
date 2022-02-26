import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getVideos, postVideo } from '../../store/video'
import Modal from '../Modal'
import CreateVideo from '../Forms/CreateVideo';
import Navbar from '../Navbar';
import './ManageVideos.css';

function ManageVideos(){
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const videos = useSelector(state => state?.videos?.entries);

    const [videoFile, setVideoFile] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      dispatch(getVideos())
    }, [])

    const BUTTON_WRAPPER_STYLES = {
      // position: 'relative',
      // zIndex: 1
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
        dispatch(postVideo(file.secure_url, title, description));

      }

    return (
        <div id='portal'>
          <Navbar />
          <div className='top-bar'>
            <div className='channel-content-text'>
              Channel content
            </div>
            <div className='upload-button-modal-container' style={BUTTON_WRAPPER_STYLES}>
              <button className='upload-button-modal'
              onClick={() => setIsOpen(true)}>
              UPLOAD</button>
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <CreateVideo setIsOpen={setIsOpen}/>
              </Modal>
            </div>
          </div>
          <div className='channel-content-header'>
            <div className='video-text-header'>
              Video
            </div>
            <div className='date-uploaded-header'>
              Date
            </div>
            <div className='views-header'>
              Views
            </div>
            <div className='comment-total-header'>
              Comments
            </div>
          </div>
            <div className='manage-videos-container'>
            {videos &&
              videos
              .filter((element) => element.user_id == user.id)
                .map((video) => (
                  <div className='video-wrapper'>
                    <div className='single-manage-video'>
                        <NavLink to=''>
                          <video
                          className='manage-video'
                          src={video.video_url}>
                          </video>
                        </NavLink>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default ManageVideos;
