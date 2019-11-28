import PostDetailContainer from "./PostDetailContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const {
    navigation: {
      state: {
        params: { id }
      }
    }
  } = ownProps;
  const {
    user: { push_token }
  } = state;

  const { user } = state;
  let postInfo = {
    anonymous: false,
    comment_count: 0,
    comments: [],
    content: "",
    creator: {},
    file: "",
    like_count: 0,
    natural_time: "",
    title: "",
    is_liked: false
  };
  state.posts.posts.map(post => {
    if (post.id === id) {
      postInfo = post;
    }
  });

  return { postInfo, user, push_token };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    navigation: {
      state: {
        params: { id }
      }
    }
  } = ownProps;

  return {
    dispatchLike: (push_token, isLiked) => {
      if (isLiked) {
        return dispatch(postActions.unLikePost(id));
      } else {
        return dispatch(postActions.likePost(push_token, id));
      }
    },
    dispatchCommentPost: (message, isChecked, push_token) => {
      return dispatch(
        postActions.commentPost(id, message, isChecked, push_token)
      );
    },
    dispatchOnCommentPost: (
      commentId,
      message,
      isChecked,
      referComment,
      push_token
    ) => {
      dispatch(
        postActions.onCommentPost(
          id,
          commentId,
          message,
          isChecked,
          referComment,
          push_token
        )
      );
    },
    dispatchCommentDelete: commentId => {
      dispatch(postActions.commentDelete(id, commentId));
    },
    dispatchPutPost: (title, content, file, anonymous) => {
      dispatch(postActions.putPost(id, title, content, file, anonymous));
    },
    dispatchDeletePost: () => {
      dispatch(postActions.deletePost(id));
    },
    dispatchCrimeReport: () => {
      return dispatch(postActions.postCrimeReport(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);
