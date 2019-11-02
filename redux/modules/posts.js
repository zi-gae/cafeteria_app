//import

import { URL } from "../../constants";
import { actionCreators as userActions } from "./user";

//action

const SET_POST = "SET_POST";
const SET_SEARCH = "SET_SEARCH";
const POST_COMMENT = "POST_COMMENT";
//action creator

const reqSetPost = posts => {
  return {
    type: SET_POST,
    posts
  };
};

const reqSetSearch = search => {
  return {
    type: SET_SEARCH,
    search
  };
};

const reqPostComment = (postId, comment) => {
  return {
    type: POST_COMMENT,
    postId,
    comment
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

const commentPost = (postId, message, anonymousIsChecked) => {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const res = await fetch(`${URL}/posts/${postId}/comments/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        anonymous: anonymousIsChecked
      })
    });
    const comment = await res.json();
    if (res.status === 401) {
      await dispatch(userActions.logOut());
    }
    if (comment.message) {
      await dispatch(reqPostComment(postId, comment));
    }
  };
};

//inital state

const initalState = {};

// reducer

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_POST:
      return applySetPost(state, action);
    case SET_SEARCH:
      return applySetSearch(state, action);
    case POST_COMMENT:
      return applyPostComment(state, action);
    default:
      return state;
  }
};

// reducer action

const applySetPost = (state, action) => {
  const { posts } = action;
  return {
    ...state,
    posts
  };
};

const applySetSearch = (state, action) => {
  const { search } = action;
  return {
    ...state,
    search
  };
};
const applyPostComment = (state, action) => {
  const { postId, comment } = action;
  const { posts } = state;

  const updatePost = posts.map(post => {
    if (post.id === postId) {
      return {
        ...post,
        comments: [...post.comments, comment]
      };
    } else {
      return post;
    }
  });
  return { ...state, posts: updatePost };
};

// export

const actionCreators = {
  getPost,
  getSearch,
  likePost,
  unLikePost,
  emptySearch,
  commentPost
};

export { actionCreators };

//default reducer action

export default reducer;
