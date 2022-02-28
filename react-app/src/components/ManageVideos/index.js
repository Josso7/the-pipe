import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteVideo, getVideos } from '../../store/video'
import Modal from '../Modal'
import EditModal from '../Modal/EditModal';
import CreateVideo from '../Forms/CreateVideo';
import EditVideo from '../Forms/EditVideo';
import Navbar from '../Navbar';
import './ManageVideos.css';
import { getAllComments } from '../../store/comment';

function ManageVideos(){
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    const videos = useSelector(state => state?.videos?.entries);
    const comments = useSelector(state => state?.comments?.entries);

    const [uploadIsOpen, setUploadIsOpen] = useState(false)
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [editVideo, setEditVideo] = useState(0)
    const [deleteVideoId, setDeleteVideoId] = useState('');

    useEffect(() => {
      dispatch(getVideos())
      dispatch(getAllComments());
    }, [dispatch])

    const handleEditButton = (e) => {
      setEditIsOpen(true)
      setEditVideo(e.target.id)
    }

    const handleDelete = (e) => {
      dispatch(deleteVideo(e.target.id));
      dispatch(getVideos());
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
              onClick={() => setUploadIsOpen(true)}>
              UPLOAD</button>
              {<Modal
              portalClassName="modal"
              open={uploadIsOpen} onClose={() => setUploadIsOpen(false)}>
                <CreateVideo setUploadIsOpen={setUploadIsOpen}/>
              </Modal>}
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
              .filter((element) => element.user_id === user.id)
                .map((video) => (
                  <div key={video.id} className='video-wrapper'>
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
                    <div className='edit-button-modal-container'>
                    <button id={video.id} className='edit-button-modal'
                    onClick={(e) => handleEditButton(e)}>
                    EDIT</button>
                    <EditModal
                    portalClassName="modal"
                    open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                      <EditVideo setEditIsOpen={setEditIsOpen} videoId={editVideo}/>
                    </EditModal>
                    </div>
                    <button
                    id={video.id}
                    onClick={(e) => handleDelete(e)}
                    className='manage-video-delete-button'>
                      DELETE
                    </button>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default ManageVideos;
