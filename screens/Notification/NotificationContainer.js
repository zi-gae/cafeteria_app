import React, { PureComponent } from "react";
import NotificationPresenter from "./NotificationPresenter";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";
class NotificationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }
  static navigationOptions = props => ({
    headerTitle: "알림",
    headerTitleStyle: {
      fontSize: RFValue(20)
    },
    headerLeft: null
  });
  static propTypes = {
    notifications: PropTypes.array,
    getNotifications: PropTypes.func.isRequired
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.post) {
      this.setState({
        isFetching: false
      });
    }
  };

  refresh = () => {
    const { getNotifications } = this.props;
    this.setState({
      isFetching: true
    });
    getNotifications();
  };

  render() {
    const { notification } = this.props;
    const { isFetching } = this.state;
    return (
      <NotificationPresenter
        isFetching={isFetching}
        OnRefresh={this.refresh}
        notification={notification}
      />
    );
  }
}

export default NotificationContainer;
