import './Videos.css';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
function Vidoes(){
    const { id } = useParams();
    let video;
    const videos = useSelector(state => state?.videos?.videos[0])
    if (videos) {
        video = videos.find(video => video.id === id)
    }
    console.log(video);
    return (
        <>
        <Navbar/>
        <div className='video-container'>
            <video
            controls
            src={video && video.video_url}>
            </video>
        </div>
        </>
    )
}

export default Vidoes;
