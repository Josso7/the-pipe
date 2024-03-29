import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getVideos } from '../../store/video';
import './HomePage.css'
import Navbar from '../Navbar';
import { getUsers } from '../../store/users';
function HomePage(){
    const dispatch = useDispatch();

    const videos = useSelector(state => state?.videos?.entries);
    const users = useSelector(state => state?.users?.entries)

    useEffect(() => {
        dispatch(getVideos());
        dispatch(getUsers());
    }, [dispatch])

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
        <>
        <Navbar />
        <div className='videos-container'>
            {videos && videos.map(video => {
                return (
                <div key={video.id} className='single-video-container'>
                    <NavLink key={video}className='a-link' to={`/videos/${video.id}`}> {}
                    <video key={video.id}className='video'
                    src={video.video_url}
                    ></video>
                    </NavLink>
                    <div key={video.id} className='video-details'>
                        <div key={video.id} className='user-icon'
                        id='user-icon-homepage'>
                            <div key={video.id} className='user-icon-text'>
                                {users && users.find(element => element.id === video.user_id).username[0].toUpperCase()}
                            </div>
                        </div>
                        <div key={video}className='video-details-text'> {}
                        <div key={video.id}className='title'>
                            {video.title}
                        </div>
                        <div key={video}className='video-username'> {}
                            {users && users.find(element => element.id === video.user_id).username}
                        </div>
                        <div className='views-created-at-date-container'> {}
                            <div key={video.id}className='video-views'>
                                {videos && video.views} views
                            </div>
                            <div key={video.image_url}className='bullet-point'> {}
                                •
                            </div>
                            <div key={video}className='video-created-at-date'>
                                {videos && convertDatetoDateWithoutTime(video).created_at_date}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                )
            }
            )}
        </div>
        </>
    )
}

export default HomePage;
