const GET_VIDEOS = '/video/GET_VIDEOS';
const GET_RECOMMENDED_VIDEOS = '/video/GET_RECOMMENDED_VIDEOS';

const load = (videos) => ({
    type: GET_VIDEOS,
    videos
});

const loadRecommended = (recommended) => ({
    type: GET_RECOMMENDED_VIDEOS,
    recommended
})

export const getRecommendedVideos = () => async dispatch => {
    const response = await fetch('/api/videos/recommended', {
        method: 'GET'
    })

    if(response.ok){
        const videos = await response.json();
        dispatch(loadRecommended(videos))
        console.log(videos);
    }
}

export const updateViews = (videoId) => async dispatch => {
    const response = await fetch(`/api/videos/${videoId}/views`, {
        method: 'PUT'
    });

    if(response.ok){
        dispatch(getVideos());
        return 'view added';
    }
}

export const deleteVideo = (videoId) => async dispatch => {
    await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE'
    });
    dispatch(getVideos());
}

export const editVideo = (videoId, title, description) => async dispatch => {
    console.log(videoId);
    const response = await fetch(`/api/videos/${videoId}`, {
        method: 'PUT',
        headers : {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description
        })
    })

    if(response.ok){
        dispatch(getVideos());
        return 'Video updated'
    }
}

export const postVideo = (videoUrl, title, description, userId) => async dispatch => {
    const response = await fetch('/api/videos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            videoUrl,
            title,
            description,
            userId
        })
    });

    if(response.ok) {
        dispatch(getVideos());
        return 'video_url saved to database';
    }
}

export const getVideos = () => async dispatch => {
    const response = await fetch('/api/videos/');

    if(response.ok){
        const videos = await response.json();
        dispatch(load(videos))
    }
}

const initialState = {
}

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_VIDEOS: {
        return {
            ...state,
            entries: [...action.videos.videos]
        }
      }
      case GET_RECOMMENDED_VIDEOS: {
          return {
              ...state,
              recommended: [...action.recommended.videos]
          }
      }
      default: return state;
    }
  }

export default reducer;
