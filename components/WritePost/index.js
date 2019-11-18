import WritePostContainer from "./WritePostContainer";
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

  let sample;
  state.posts.posts.map(post => {
    if (post.id === id) {
      sample = post;
    }
  });

  return { sample };
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
    dispatchPutPost: (title, content, file, anonymous) => {
      dispatch(postActions.putPost(id, title, content, file, anonymous));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WritePostContainer);
