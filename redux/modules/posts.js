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

const reqSetSearch = post => {
  return {
    type: SET_SEARCH,
    post
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

const getSearch = () => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/posts/total_search/?total=15`, {
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
  getSearch
};

export { actionCreators };

//default reducer action

export default reducer;
