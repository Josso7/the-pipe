import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getVideos, postVideo } from '../../store/video'
import Modal from '../Modal'
import CreateVideo from '../Forms/CreateVideo';
import Navbar from '../Navbar';
import './ManageVideos.css';
import { getAllComments } from '../../store/comment';

function ManageVideos(){
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const videos = useSelector(state => state?.videos?.entries);
    const comments = useSelector(state => state?.comments?.entries);

    const [videoFile, setVideoFile] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
      dispatch(getVideos())
      dispatch(getAllComments());
    }, [])

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

    return (
        <div id='portal'>
          <Navbar />
          <div className='top-bar'>
            <div className='channel-content-text'>
              Channel content
            </div>
            <div className='upload-button-modal-container'>
              <button className='upload-button-modal'
              onClick={() => setIsOpen(true)}>
              UPLOAD</button>
              <Modal
              portalClassName="modal"
              open={isOpen} onClose={() => setIsOpen(false)}>
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
                        <NavLink to={`/videos/${video.id}`}>
                          <video
                          className='manage-video'
                          src={video.video_url}>
                          </video>
                        </NavLink>
                    </div>
                    <div className='single-video-title'>
                        {video.title}
                    </div>
                    <div className='single-video-date'>
                        {convertDatetoDateWithoutTime(video).created_at_date}
                    </div>
                    <div className='single-video-views'>
                        {video.views}
                    </div>
                    <div className='single-video-comments'>
                        {comments && comments.filter(element => element.video_id === video.id).length}
                    </div>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default ManageVideos;
