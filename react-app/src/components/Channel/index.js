import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVideos } from '../../store/video';
import { getUsers } from '../../store/users';
import Navbar from "../Navbar";
import "./Channel.css";
function Channel() {
  const videos = useSelector((state) => state?.videos?.entries);
  const user = useSelector((state) => state?.session?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos());
}, [])

  const convertDatetoDateWithoutTime = (video) => {
    if (video.created_at_date) {
      if (video.created_at_date.length > 15) {
        let date = video.created_at_date.split(" ");
        date.pop();
        date.pop();
        date.shift();
        date[0] = date[0] + ",";
        [date[0], date[1]] = [date[1], date[0]];
        date = date.join(" ");
        video.created_at_date = date;
        return video;
      }
    }
    return video;
  };

  return (
    <>
      <Navbar />
      <div className='channel-user-info'>
        <div className='channel-user-icon'>
            <div className='channel-user-icon-text'>
                {user && user.username[0].toUpperCase()}
            </div>
        </div>
            <div className='channel-user-text'>
                <div className='channel-username'>
                    {user && user.username}
                </div>
                <div className='channel-user-subscribers'>
                    {/* {user && user.subscriber_count} subscribers */}
                </div>
            </div>
            <NavLink
            className='manage-videos-button-wrapper'
            to="/user/channel/videos">
            <button className='manage-videos-button'>
            MANAGE VIDEOS</button>
            </NavLink>
      </div>
      <div className='channel-nav'>

      </div>
      <div className="videos-container-channel">
        <div className='uploads-text'>
                Uploads
        </div>
        {videos &&
          videos
            .filter((element) => element.user_id == user.id)
            .map((video) => (
              <div key={video.id} className="single-video-container">
                <NavLink className="a-link" to={`/videos/${video.id}`}>
                  <video className="video" src={video.video_url}></video>
                </NavLink>
                <div className="video-details">
                  <div className="video-details-text">
                    <div className="title">{video.title}</div>
                    <div className="views-created-at-date-container">
                      <div className="video-views">
                        {videos && video.views} views
                      </div>
                      <div className="bullet-point">•</div>
                      <div className="video-created-at-date">
                        {videos &&
                          convertDatetoDateWithoutTime(video).created_at_date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Channel;
