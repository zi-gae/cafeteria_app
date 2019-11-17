import SignUpContainer from "./SignUpContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchCreateUser: (username, password, nickname, email) => {
      return dispatch(
        userActions.createAccount(username, password, nickname, email)
      );
    }
  };
};

export default connect(null, mapDispatchToProps)(SignUpContainer);
