//import

import { URL } from "../../constants";
import { actionCreators as userActions } from "./user";

//action

const SET_POST = "SET_POST";

//action creator

const reqSetPost = post => {
  return {
    type: SET_POST,
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
        Authorizations: `JWT ${token}`
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

//inital state

const initalState = {};

// reducer

const reducer = (state = { initalState }, action) => {
  switch (action.type) {
    case SET_POST:
      return applySetPost(state, action);

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

// export

const actionCreators = {
  getPost
};

export { actionCreators };

//default reducer action

export default reducer;
