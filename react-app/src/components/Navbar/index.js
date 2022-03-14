import { NavLink, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import YouTubeHomeLogo from '../../images/yt_logo.png'
import '../Navbar/Navbar.css'
import { logout } from '../../store/session'
import SearchbarIcon from '../../images/yt-search-icon.png'
import { searchResults } from '../../store/video';

function Navbar(){
    const history = useHistory();
    const user = useSelector(state=> state?.session?.user)
    const searchResult = useSelector(state => state?.videos?.searchResults);
    const dispatch = useDispatch()
    const [userMenu, setUserMenu] = useState(false);
    const [searchInput, setSearchInput] = useState('');


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

    useEffect(() => {
        if(searchResult) localStorage.setItem('searchResults', JSON.stringify(searchResult))
    }, [searchResult])

    const handleClick = () => {
        if (userMenu) setUserMenu(false)
        else setUserMenu(true)
    }

    const handleSearch = async () => {
        await dispatch(searchResults(searchInput));
        history.push('/');
        history.push('/search-results');
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
                <Link to='/home'>
                    <img alt='ThePipe logo' title='ThePipe Home' id='image-yt-logo' src={YouTubeHomeLogo}></img>
                </Link>
            </div>
            <div className='search-container'>
                    <input
                    className='search-bar'
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search'>
                    </input>
                    <button
                    onClick={handleSearch}
                    title='Search'
                    className='searchbar-icon-container'>
                        <img
                        className='searchbar-icon'
                        src={SearchbarIcon}>
                        </img>
                    </button>
            </div>
            <a className='github-button' href='https://github.com/Josso7/the-pipe'>GITHUB</a>
            <a className='linkedin-button' href='https://www.linkedin.com/in/jesse-brooks-8a6718229/'>LINKEDIN</a>
            {!user && <NavLink className='login-button-wrapper' to='/login'><button className='sign-in-button'>SIGN IN</button></NavLink>}
            {!user && <NavLink className='signup-button-wrapper' to='/sign-up'><button className='signup-button'>SIGNUP</button></NavLink>}
            {user && <button
            title='Open User Menu'
            className='navbar-menu-button'
            id='user-menu-button'
            onClick={handleClick}>
                {user && <div className='user-menu-icon'>
                        {user && <p className='user-menu-text'>{user.username[0].toUpperCase()}</p>}
                    </div>}
            </button>}
            {userMenu &&
            <div className='user-menu-popup'>
                <div className='user-info-container'>
                    <div className='user-icon-popup'>
                        <div className='user-icon-popup-text'>{user.username[0].toUpperCase()}</div>
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
