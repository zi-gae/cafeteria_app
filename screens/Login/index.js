import { connect } from "react-redux";
import LoginContainer from "./LoginContainer";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => {
      return dispatch(userActions.login(username, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
