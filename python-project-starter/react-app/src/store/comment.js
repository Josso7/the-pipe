const GET_COMMENTS = '/comment/GET_COMMENT';

const load = (comments) => ({
    type: GET_COMMENTS,
    comments
});

export const postComment = (comment, videoId, userId) => async () => {
    const response = await fetch(`/api/videos/${videoId}/video-comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment,
            videoId,
            userId
        })
    });

    if(response.ok) {
        return 'conmment saved to database';
    }
}

export const getComments = (videoId) => async dispatch => {
    const response = await fetch(`/api/videos/${videoId}/video-comments`);

    if(response.ok){
        const comments = await response.json();
        console.log(comments);
        dispatch(load(comments))
    }
}

const initialState = {
}

const reducer = (state = initialState, action) => {
    let newState;

    switch(action.type){
      case GET_COMMENTS: {
          console.log(action.comments)
        return {
            ...state,
            entries: [...action.comments.comments]
        }
      }
      default: return state;
    }
  }

export default reducer;
