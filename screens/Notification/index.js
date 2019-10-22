import { connect } from "react-redux";
import NotificationContainer from "./NotificationContainer";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { notification }
  } = state;

  return {
    notification
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNotifications: () => {
      dispatch(userActions.getNotification());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
