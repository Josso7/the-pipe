import { NavLink, Link } from 'react-router-dom'
import YouTubeHomeLogo from '../../images/yt_logo.png'
import '../Navbar/Navbar.css'

function Navbar(){
    return (

        <div className='navbar-container'>
            <Link exact to='/'>
                <img id='image-yt-logo' src={YouTubeHomeLogo}></img>
            </Link>
            <button className='user-menu-button'>
                <div className='user-menu-icon'></div>
            </button>
        </div>
    )
}

export default Navbar;
