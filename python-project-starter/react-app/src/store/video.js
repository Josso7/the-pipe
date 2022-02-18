const UPLOAD_VIDEO = 'video/UPLOAD_VIDEO';
const GET_VIDEOS = '/video/GET_VIDEOS';

const load = (videos) => ({
    type: GET_VIDEOS,
    videos
});

export const postVideo = (videoUrl, title, description, userId) => async () => {
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
        return 'video_url saved to database';
    }
}

export const getVideos = () => async dispatch => {
    const response = await fetch('/api/videos/');

    if(response.ok){
        const videos = await response.json();
        console.log(videos);
        dispatch(load(videos))
    }
}

const initialState = {
    videos: []
}

const reducer = (state = initialState, action) => {
    let newState;

    switch(action.type){
      case GET_VIDEOS: {
          console.log(action.videos)
        return {
            ...state,
            videos: [action.videos.videos]
        }
      }
      default: return state;
    }
  }

export default reducer;
