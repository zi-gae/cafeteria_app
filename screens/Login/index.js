import { connect } from "react-redux";
import LoginContainer from "./LoginContainer";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as crawlerActions } from "../../redux/modules/crawlers";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchLogin: (username, password) => {
      return dispatch(userActions.login(username, password));
    },
    dispatchGetRice: () => {
      dispatch(crawlerActions.getRice());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
