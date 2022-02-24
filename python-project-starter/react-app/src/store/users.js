const GET_USERS = '/users/GET_USERS';

const load = (users) => ({
    type: GET_USERS,
    users
});

export const getUsers = () => async dispatch => {
    const response = await fetch(`/api/users/`);

    if(response.ok){
        const users = await response.json();
        dispatch(load(users))
    }
}

const initialState = {
}

const reducer = (state = initialState, action) => {
    switch(action.type){
      case GET_USERS: {
        return {
            ...state,
            entries: [...action.users.users]
        }
      }
      default: return state;
    }
  }

export default reducer;
