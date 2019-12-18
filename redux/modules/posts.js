//import

import { URL } from "../../constants";
import { actionCreators as userActions } from "./user";
import uuidv1 from "uuid/v1";
//action

const SET_POST = "SET_POST";
const SET_SEARCH = "SET_SEARCH";
const POST_COMMENT = "POST_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const CREATE_POST = "CREATE_POST";

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

const reqDeleteComment = (postId, commentId) => {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  };
};

const reqPutPost = (postId, resPost) => {
  return {
    type: UPDATE_POST,
    postId,
    resPost
  };
};

const reqDeletePost = postId => {
  return {
    type: DELETE_POST,
    postId
  };
};

const reqCreatePost = () => {
  return {
    type: CREATE_POST
  };
};

//api action

const getPost = () => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/`, {
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
      .then(json => {
        dispatch(reqSetPost(json));
        return true;
      });
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

const likePost = (push_token, postId) => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/${postId}/like/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: push_token
      })
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

const commentPost = (postId, message, anonymousIsChecked, push_token) => {
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
        anonymous: anonymousIsChecked,
        token: push_token
      })
    });
    if (res.status === 401) {
      await dispatch(userActions.logOut());
    }
    const comment = await res.json();
    if (comment.message) {
      await dispatch(reqPostComment(postId, comment));
    }
  };
};

const onCommentPost = (
  postId,
  commentId,
  message,
  anonymousIsChecked,
  referComment,
  push_token
) => {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const res = await fetch(`${URL}/posts/${postId}/${commentId}/comments/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        anonymous: anonymousIsChecked,
        referComment,
        token: push_token
      })
    });
    if (res.status === 401) {
      await dispatch(userActions.logOut());
    }
    const comment = await res.json();
    if (comment.message) {
      await dispatch(reqPostComment(postId, comment));
    }
  };
};

const commentDelete = (postId, commentId) => {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const res = await fetch(`${URL}/posts/comments/${commentId}/`, {
      method: "delete",
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    if (res.status === 204) {
      await dispatch(reqDeleteComment(postId, commentId));
    } else if (res.status === 401) {
      userActions.logOut();
    } else {
    }
  };
};

const putPost = (postId, title, content, file, anonymous) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("anonymous", anonymous);
  if (file) {
    formData.append("file", {
      uri: file,
      type: "image/jpeg",
      name: `${uuidv1()}.jpg`
    });
  }

  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/posts/${postId}/`, {
      method: "put",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "multipart/form-data"
      },
      body: formData
    })
      .then(res => {
        if (res.status === 401) {
          dispatch(userActions.logOut());
        } else {
          dispatch(getPost());
          return res.json();
        }
      })
      .then(json => {
        dispatch(reqPutPost(postId, json));
      })
      .catch(err => console.log(err));
  };
};

const deletePost = postId => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/${postId}/`, {
      method: "delete",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(res => {
      if (res.status === 401) {
        dispatch(userActions.logOut());
      } else if (res.status === 204) {
        dispatch(reqDeletePost(postId));
        return true;
      } else {
        return false;
      }
    });
  };
};

const createPost = (title, content, file, anonymous) => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("anonymous", anonymous);
  if (file) {
    formData.append("file", {
      uri: file,
      type: "image/jpeg",
      name: `${uuidv1()}.jpg`
    });
  }
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "multipart/form-data"
      },
      body: formData
    })
      .then(res => {
        if (res.status === 401) {
          dispatch(userActions.logOut());
          return false;
        } else if (res.status === 201) {
          dispatch(getPost());
          dispatch(reqCreatePost());
          return true;
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };
};

const postCrimeReport = id => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/posts/${id}/report/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 201) {
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

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_POST:
      return applySetPost(state, action);
    case SET_SEARCH:
      return applySetSearch(state, action);
    case POST_COMMENT:
      return applyPostComment(state, action);
    case DELETE_COMMENT:
      return applyDeleteComment(state, action);
    case DELETE_POST:
      return applyDeletePost(state, action);
    case UPDATE_POST:
      return applyUpdatePost(state, action);
    case CREATE_POST:
      return applyCreatePost(state, action);
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

const applyDeleteComment = (state, action) => {
  const { postId, commentId } = action;
  const { posts } = state;

  const updatePost = posts.map(post => {
    if (post.id === postId) {
      return {
        ...post,
        comments: post.comments.filter(comment => commentId !== comment.id)
      };
    } else {
      return post;
    }
  });

  return { ...state, posts: updatePost };
};

const applyDeletePost = (state, action) => {
  const { posts } = state;
  const { postId } = action;
  const updatePost = posts.filter(post => post.id !== postId);

  return {
    ...state,
    posts: updatePost
  };
};

const applyUpdatePost = (state, action) => {
  const { posts } = state;
  const { postId, resPost } = action;

  const updatePost = posts.map(post => {
    if (post.id === postId) {
      return {
        ...post,
        ...resPost
      };
    } else {
      return post;
    }
  });

  return { ...state, posts: updatePost };
};

const applyCreatePost = (state, action) => {
  const { posts } = state;
  const { postId, resPost } = action;

  const updatePost = posts.map(post => {
    if (post.id === postId) {
      return {
        ...post,
        ...resPost
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
  commentPost,
  commentDelete,
  putPost,
  deletePost,
  createPost,
  onCommentPost,
  postCrimeReport
};

export { actionCreators };

//default reducer action

export default reducer;

fetch("https://api.themoviedb.org/3/movie/now_playing/", {
  method: "get",
  headers: {
    api_key: "cb2d5c76ad119ebd27b5a9859c5a4995"
  }
}).then(res => console.log("hello"));
