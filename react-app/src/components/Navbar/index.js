import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import YouTubeHomeLogo from '../../images/yt_logo.png'
import '../Navbar/Navbar.css'
import HamburgerMenuIcon from '../../images/yt-hamburger-menu-icon.png'
import SearchbarIcon from '../../images/yt-search-icon.png'
import { logout } from '../../store/session'

function Navbar(){
    const user = useSelector(state=> state?.session?.user)
    const dispatch = useDispatch()
    const [userMenu, setUserMenu] = useState(false);

    // const handleSearch = async () => {

    // }

    useEffect(() => {
        if (!user) setUserMenu(false);
        if (!userMenu) return;
    const closeMenu = (e) => {
        if (e.target.className === 'user-menu-popup') return
        setUserMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [userMenu, user]);

    const handleClick = () => {
        if (userMenu) setUserMenu(false)
        else setUserMenu(true)
    }
        const onLogout = async (e) => {
            await dispatch(logout());
        };
    if(window.location.pathname === '/login') return (
        <>
        </>
    )

    return (

        <div id='navbar-container'>
            <div className='navbar-container-start'>
                {/* <button className='navbar-menu-button'>
                    <img src={HamburgerMenuIcon}></img>
                </button> */}
                <Link to='/'>
                    <img title='ThePipe Home' id='image-yt-logo' src={YouTubeHomeLogo}></img>
                </Link>
            </div>
            <div className='search-container'>
                    <input
                    className='search-bar'
                    type='text'
                    placeholder='Search'>
                    </input>
                    <button
                    // onClick={handleSearch}
                    title='Search'
                    className='searchbar-icon-container'>
                        <img
                        className='searchbar-icon'
                        src={SearchbarIcon}>
                        </img>
                    </button>
            </div>
            {!user && <NavLink className='login-button-wrapper' to='/login'><button className='sign-in-button'>SIGN IN</button></NavLink>}
            {user && <button
            title='Open User Menu'
            className='navbar-menu-button'
            id='user-menu-button'
            onClick={handleClick}>
                {user && <div className='user-menu-icon'>
                        {user && <p className='user-menu-text'>{user.username[0]}</p>}
                    </div>}
            </button>}
            {userMenu &&
            <div className='user-menu-popup'>
                <div className='user-info-container'>
                    <div className='user-icon-popup'>
                        <div className='user-icon-popup-text'>{user.username[0]}</div>
                    </div>
                    <div className='username-popup-text'>{user.username}</div>
                </div>
                <NavLink to='/user/channel'><button className='user-menu-option' id='navbar-channel-button'>Your channel</button></NavLink>
                <button
                className='user-menu-option'
                id='logout-button'
                onClick={onLogout}>Logout</button>
            </div>}
        </div>

    )
}

export default Navbar;
