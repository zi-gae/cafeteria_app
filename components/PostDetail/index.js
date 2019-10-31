import PostDetailContainer from "./PostDetailContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  return state;
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
    dispatchLike: isLiked => {
      if (isLiked) {
        return dispatch(postActions.unLikePost(id));
      } else {
        return dispatch(postActions.likePost(id));
      }
    },
    disaptchCommentPost: message => {
      return dispatch(postActions.commentPost(id, message));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);
