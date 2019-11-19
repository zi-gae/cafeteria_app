import StudentAuthenticationContainer from "./StudentAuthenticationContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchAuthentication: (studentNubmer, studentNubmerImage) => {
      return dispatch(
        userActions.userAuthentication(studentNubmer, studentNubmerImage)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StudentAuthenticationContainer);
