const GET_COMMENTS = '/comment/GET_COMMENT';
const ADD_COMMENT = '/comment/ADD_COMMENT';

const load = (allComments) => ({
    type: GET_COMMENTS,
    allComments
});

export const postComment = (comment, videoId, userId) => async dispatch => {
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
        const updatedComment = await response.json()
        dispatch(getComments(videoId));
        return updatedComment;
    }
}

export const editUserComment = (comment, videoId, userId, commentId) => async dispatch => {
    const response = await fetch(`/api/videos/${videoId}/video-comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            comment,
            videoId,
            userId,
            commentId
        })

    });

    if(response.ok) {
        dispatch(getComments(videoId));
        return 'conmment saved to database';
    }

}

export const getComments = (videoId) => async dispatch => {
    const response = await fetch(`/api/videos/${videoId}/video-comments`);

    if(response.ok){
        const allComments = await response.json();
        dispatch(load(allComments))
    }
}

export const getAllComments = () => async dispatch => {
    const response = await fetch(`/api/videos/video-comments`);

    if(response.ok){
        const allComments = await response.json();
        dispatch(load(allComments))
    }
}

export const deleteUserComment = (videoId, commentId) => async dispatch => {
    const response = await fetch(`/api/videos/${videoId}/video-comments/${commentId}`, {
        method: 'DELETE',
    });
    if(response.ok){
        dispatch(getComments(videoId))
    }
}

const initialState = {
}

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_COMMENTS: {
        return {
            ...state,
            entries: [...action.allComments.comments]
        }
      }
      case ADD_COMMENT: {
          return {
              ...state,
              entries: [...state.entries, action.comment]
          }
      }
      default: return state;
    }
  }

export default reducer;
