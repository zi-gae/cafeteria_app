import PostDetailContainer from "./PostDetailContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    navigation: {
      state: {
        params: { id, is_liked }
      }
    }
  } = ownProps;
  return {
    dispatchLike: isLiked => {
      if (is_liked) {
        return dispatch(postActions.unLikePost(id));
      } else {
        return dispatch(postActions.likePost(id));
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostDetailContainer);
