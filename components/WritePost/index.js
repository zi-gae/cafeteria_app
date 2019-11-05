import WritePostContainer from "./WritePostContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";
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

export default connect(
  null,
  mapDispatchToProps
)(WritePostContainer);
