import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import YouTubeHomeLogo from '../../images/yt_logo.png'
import '../Navbar/Navbar.css'
import HamburgerMenuIcon from '../../images/yt-hamburger-menu-icon.png'

function Navbar(){
    const user = useSelector(state=> state?.session?.user)

    return (

        <div className='navbar-container'>
            <button className='navbar-menu-button'>
                <img src={HamburgerMenuIcon}></img>
            </button>
            <Link exact to='/'>
                <img id='image-yt-logo' src={YouTubeHomeLogo}></img>
            </Link>
            <div className='search-container'>
                    <input
                    className='search-bar'
                    type='text'
                    placeholder='Search'>
                    </input>
            </div>
            <button className='navbar-menu-button' id='user-menu-button'>
                <div className='user-menu-icon'>
                    <p className='user-menu-text'>{user.username[0]}</p>
                </div>
            </button>
        </div>
    )
}

export default Navbar;
