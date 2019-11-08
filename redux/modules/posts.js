//import

import { URL } from "../../constants";
import { actionCreators as userActions } from "./user";

//action

const SET_POST = "SET_POST";
const SET_SEARCH = "SET_SEARCH";
const POST_COMMENT = "POST_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
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

const commentPost = (postId, message, anonymousIsChecked, referComment) => {
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
        referComment
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
    formData.append("file", file);
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
          return res.json();
        }
      })
      .then(json => {
        dispatch(reqPutPost(postId, json));
      });
  };
};

const deletePost = postId => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${URL}/posts/${postId}/`, {
      method: "delete",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(res => {
      if (res.status === 401) {
        dispatch(userActions.logOut());
      } else if (res.status === 204) {
        dispatch(reqDeletePost(postId));
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
    case UPDATE_POST:
      return applyPutPostComment(state, action);
    case DELETE_POST:
      return applyDeletePost(state, action);
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

const applyPutPostComment = (state, action) => {
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

const applyDeletePost = (state, action) => {
  const { posts } = state;
  const { postId } = action;
  const updatePost = posts.filter(post => post.id !== postId);

  return {
    ...state,
    posts: updatePost
  };
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
  deletePost
};

export { actionCreators };

//default reducer action

export default reducer;
