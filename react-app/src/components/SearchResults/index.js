import './SearchResults.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from react;
import { useSelector } from 'react-redux';


function SearchResults() {
    return (
        <>
        <div className='search-results-container'>
            <NavLink to={`/videos/${video.id}`}>
            <div className='single-search-result'>
                <div className='search-result-video-container'>

                </div>
                <div className='search-result-details-container'>
                    <div className='search-result-title'>

                    </div>
                    <div className='search-result-views-date'>
                        <div className='search-result-views'>

                        </div>
                        <div className='search-result-date'>

                        </div>
                    </div>
                    <div className='search-result-user-icon-username'>
                        <div className='search-result-user-icon'>

                        </div>
                        <div className='search-result-username'>

                        </div>
                    </div>
                    <div className='search-result-description'>
                        
                    </div>
                </div>
            </div>
            </NavLink>
        </div>
        </>
    )
}

export default SearchResults;
