//import

import { URL } from "../../constants";
import { AsyncStorage } from "react-native";
import axios from "axios";
import uuidv1 from "uuid/v1";

//actions

const LOG_IN = "LOG_IN";
const SIGN_UP = "SIGN_UP";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_NOTIFICATION = "SET_NOTIFICATION";
const MODIFY_NICKNAME = "MODIFY_NICKNAME";

// action creators

const setLogIn = (token, push_token) => {
  return {
    type: LOG_IN,
    token,
    push_token
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

const reqModifyNickname = profile => {
  return {
    type: MODIFY_NICKNAME,
    profile
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
          dispatch(setLogIn(json.token, json.user.push_token));
          dispatch(setUser(json.user));
          return true;
        } else {
          return false;
        }
      });
  };
};

const createAccount = (username, password, nickname, email) => {
  AsyncStorage.removeItem("signUpStatusCode");
  return dispatch => {
    return fetch(`${URL}/rest-auth/registration/`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        nickname,
        email
      })
    }).then(res => {
      if (res.status === 201) {
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
    fetch(`${URL}/notifications/`, {
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
      .then(json => {
        dispatch(reqSetNotification(json));
      })
      .catch(err => console.log(err));
  };
};

const getOwnProfile = () => {
  return (dispatch, getState) => {
    const {
      user: {
        token,
        profile: { username }
      }
    } = getState();
    fetch(`${URL}/users/${username}/`, {
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
      .then(json => dispatch(setUser(json)));
  };
};

const putProfile = (profileImage, nickname) => {
  return (dispatch, getState) => {
    const {
      user: {
        token,
        profile: { username }
      }
    } = getState();
    let formData = new FormData();
    if (nickname) {
      formData.append("name", nickname);
    }
    if (profileImage) {
      formData.append("profile_image", {
        uri: profileImage,
        type: "image/jpeg",
        name: `${uuidv1()}.jpg`
      });
    } else {
      if (!nickname) {
        formData.append("profile_image", null);
      }
    }
    axios(`${URL}/users/${username}/`, {
      method: "put",
      headers: {
        Authorization: `JWT ${token}`
      },
      data: formData
    }).then(res => {
      if (res.status === 401) {
        return dispatch(logOut());
      } else {
        return dispatch(reqModifyNickname(res.data));
      }
    });
  };
};

const postToken = notificationToken => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/users/push-token/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        push_token: notificationToken
      })
    })
      .then(res => {
        if (res.status === 401) {
          dispatch(logOut());
        }
      })
      .catch(err => console.log(err));
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
    case MODIFY_NICKNAME:
      return applyModifyProfile(state, action);
    case SIGN_UP:
      return applySignUp(state, action);
    default:
      return state;
  }
};

//reducer func

const applyLogIn = (state, action) => {
  const { token, push_token } = action;

  return {
    ...state,
    isLoggedIn: true,
    token,
    push_token
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

const applyModifyProfile = (state, action) => {
  const { profile } = action;
  return {
    ...state,
    profile
  };
};

// exports

const actionCreators = {
  login,
  logOut,
  getNotification,
  getOwnProfile,
  putProfile,
  postToken,
  createAccount
};

export { actionCreators };

// default reducer export

export default reducer;
