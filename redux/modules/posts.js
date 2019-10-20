//import

import { URL } from "../../constants";
import { actionCreators as userActions } from "./user";

//action

const SET_POST = "SET_POST";
const SET_SEARCH = "SET_SEARCH";
//action creator

const reqSetPost = post => {
  return {
    type: SET_POST,
    post
  };
};

const reqSetSearch = search => {
  return {
    type: SET_SEARCH,
    search
  };
};

//api action

const getPost = () => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/posts/`, {
      method: "get",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          dispatch(userActions.logOut());
        } else {
          return res.json();
        }
      })
      .then(json => dispatch(reqSetPost(json)));
  };
};

const getSearch = term => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/posts/total_search/?total=${term}`, {
      method: "get",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          dispatch(userActions.logOut());
        } else {
          return res.json();
        }
      })
      .then(json => dispatch(reqSetSearch(json)));
  };
};

const emptySearch = term => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/posts/total_search/`, {
      method: "get",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(res => {
      if (res.status === 401) {
        dispatch(userActions.logOut());
      } else {
        const empty = [];
        return dispatch(reqSetSearch(empty));
      }
    });
  };
};

const likePost = postId => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/${postId}/like/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(res => {
      if (res.status === 401) {
        dispatch(userActions.logOut());
      } else if (res.status === 201) {
        return true;
      } else {
        return false;
      }
    });
  };
};

const unLikePost = postId => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/${postId}/unlike/`, {
      method: "delete",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(res => {
      if (res.status === 401) {
        dispatch(userActions.logOut());
      } else if (res.status === 201) {
        return true;
      } else {
        return false;
      }
    });
  };
};

//inital state

const initalState = {};

// reducer

const reducer = (state = { initalState }, action) => {
  switch (action.type) {
    case SET_POST:
      return applySetPost(state, action);
    case SET_SEARCH:
      return applySetSearch(state, action);
    default:
      return state;
  }
};

// reducer action

const applySetPost = (state, action) => {
  const { post } = action;
  return {
    ...state,
    post
  };
};

const applySetSearch = (state, action) => {
  const { search } = action;
  return {
    ...state,
    search
  };
};

// export

const actionCreators = {
  getPost,
  getSearch,
  likePost,
  unLikePost,
  emptySearch
};

export { actionCreators };

//default reducer action

export default reducer;
