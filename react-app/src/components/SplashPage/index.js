import './SplashPage.css';
import { NavLink } from 'react-router-dom';

function SplashPage() {
    return (
        <div className='splash-container'>
            <div className='the-pipe-header-text'>ThePipe</div>
            <div className='slogan-text'>
                Create an account to start uploading today
            </div>
            <NavLink className='sign-in-button-splash-wrapper' to='/login'><button className='sign-in-button-splash'>SIGN IN</button></NavLink>
            <NavLink className='signup-button-splash-wrapper' to='/sign-up'><button className='signup-button-splash'>SIGNUP</button></NavLink>
        </div>
    )
}

export default SplashPage;
