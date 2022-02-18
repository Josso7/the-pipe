import { NavLink } from 'react-router-dom';

function Channel() {
    return (
        <div>
            <div>Hello from Channel</div>
            <button><NavLink to='/user/channel/videos'>Manage Videos</NavLink></button>
        </div>
    )
}

export default Channel;
