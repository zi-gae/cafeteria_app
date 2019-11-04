import WritePostContainer from "./WritePostContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    putPost: () => {
      dispatch(postActions.putPost(ownProps.id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WritePostContainer);
