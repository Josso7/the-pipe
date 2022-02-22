import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getVideos } from '../../store/video';
import './HomePage.css'
import Navbar
 from '../Navbar';
function HomePage(){
    const dispatch = useDispatch();

    const videos = useSelector(state => state?.videos?.videos[0]);

    useEffect(() => {
        dispatch(getVideos());
    }, [])

    console.log(videos);

    return (
        <>
        <Navbar />
        <div className='videos-container'>
            {videos && videos.map(video => {
                return (
                <>
                <div key={video.id} className='single-video-container'>
                    <NavLink to={`/videos/${video.id}`}>
                    <video className='video'
                    src={video.video_url}
                    ></video>
                    </NavLink>
                    <div className='video-details'>
                        <div className='title'>
                            {video.title}
                        </div>
                        <div className='description'>
                            {video.description}
                        </div>
                    </div>
                </div>
                </>
                )
            }
            )}
        </div>
        </>
    )
}

export default HomePage;
