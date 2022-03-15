import './SearchResults.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import { getUsers } from '../../store/users';

function SearchResults({searchResults}) {
    const dispatch = useDispatch();
    const recommendedVideos = JSON.parse(localStorage.getItem('searchResults'));
    const users = useSelector(state => state?.users.entries)
    console.log(recommendedVideos)
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <>
        <Navbar/>
        {recommendedVideos.length !== 0 && <div className='search-results-container'>
        {recommendedVideos.map(video => (
            <NavLink to={`/videos/${video.id}`}>
            <div className='single-search-result'>
                <div className='search-result-video-container'>
                    <video
                    className='search-results-video'
                    src={video.video_url}>
                    </video>
                </div>
                <div className='search-result-details-container'>
                    <div className='search-result-title'>
                        {video.title}
                    </div>
                    <div className='search-result-views-date'>
                        <div className='search-result-views'>
                            {video.views} views
                        </div>
                        <div className='search-result-bullet'>
                            •
                        </div>
                        <div className='search-result-date'>
                            {video.created_at_date}
                        </div>
                    </div>
                    <div className='search-result-user-icon-username'>
                        <div className='search-result-user-icon'>
                            <div className='search-results-user-initial'>
                                {users && users.find(user => user.id === video.user_id).username[0].toUpperCase()}
                            </div>
                        </div>
                        <div className='search-result-username'>
                        {users && users.find(user => user.id === video.user_id).username}
                        </div>
                    </div>
                    <div className='search-result-description'>
                        {video.description}
                    </div>
                </div>
            </div>
            </NavLink>
        ))}
        </div>}
        {recommendedVideos.length === 0 &&
        <div className='no-results-container'>
            <div className='no-results-text'>
                No results found
            </div>
            <div className='try-different-keywords-text'>
                Try different keywords
            </div>
        </div>}
        </>
    )
}

export default SearchResults;
