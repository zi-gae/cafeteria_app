//import

import { URL } from "../../constants";
import { AsyncStorage } from "react-native";

//actions

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SIGN_UP = "SIGN_UP";
const SET_NOTIFICATION = "SET_NOTIFICATION";

// action creators

const setLogIn = token => {
  return {
    type: LOG_IN,
    token
  };
};

const logOut = () => {
  return {
    type: LOG_OUT
  };
};

const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

const reqSetNotification = notification => {
  return {
    type: SET_NOTIFICATION,
    notification
  };
};

// api actions

const login = (username, password) => {
  return dispatch => {
    return fetch(`${URL}/rest-auth/login/`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.token && json.user) {
          dispatch(setLogIn(json.token));
          dispatch(setUser(json.user));
          return true;
        } else {
          return false;
        }
      });
  };
};

const getNotification = () => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/notification/`, {
      method: "get",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          dispatch(logOut());
        } else {
          return res.json();
        }
      })
      .then(json => dispatch(reqSetNotification(json)));
  };
};

const createAccount = (username, password, nickname, stdntnum) => {
  return disaptch => {
    return fetch(`${URL}/rest-auth/registration/`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        nickname,
        stdntnum
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.token) {
        }
      });
  };
};

// instial state

const initialState = {
  isLoggedIn: false
};

// reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return applyLogIn(state, action);
    case LOG_OUT:
      return applyLogOut(state, action);
    case SET_USER:
      return applySetUser(state, action);
    case SET_NOTIFICATION:
      return applySetNotification(state, action);
    default:
      return state;
  }
};

//reducer func

const applyLogIn = (state, action) => {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token
  };
};

const applyLogOut = (state, action) => {
  AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: ""
  };
};

const applySetUser = (state, action) => {
  const { user } = action;
  return {
    ...state,
    profile: user
  };
};

const applySetNotification = (state, action) => {
  const { notification } = action;
  return {
    ...state,
    notification
  };
};

// exports

const actionCreators = {
  login,
  logOut
};

export { actionCreators };

// default reducer export

export default reducer;
