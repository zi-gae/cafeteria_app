import React, { Component } from "react";
import NotificationPresenter from "./NotificationPresenter";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";
import { LIGTH_GREEN } from "../../constants/Color";
import styled from "styled-components";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      notificationLength: 20,
      fetchNotification: false
    };
  }
  static navigationOptions = props => ({
    headerTitle: "알림",
    headerTitleStyle: {
      fontSize: RFValue(18),
      color: LIGTH_GREEN
    },
    headerLeft: (
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode={"contain"}
      />
    )
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

  handleNotificationLength = () => {
    const { notification } = this.props;
    const { notificationLength } = this.state;
    const lenght = notification.length;

    if (lenght > notificationLength) {
      this.setState({
        fetchNotification: true
      });
      setTimeout(() => {
        this.setState({
          notificationLength: notificationLength + 10,
          fetchNotification: false
        });
      }, 700);
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  refresh = () => {
    const { getNotifications } = this.props;
    this.setState(
      {
        isFetching: true
      },
      () => {
        getNotifications();
      }
    );
  };

  render() {
    const { notification } = this.props;
    const { isFetching, notificationLength, fetchNotification } = this.state;
    const { isCloseToBottom, handleNotificationLength } = this;

    return (
      <NotificationPresenter
        isFetching={isFetching}
        OnRefresh={this.refresh}
        notification={notification}
        isCloseToBottom={isCloseToBottom}
        handleNotificationLength={handleNotificationLength}
        notificationLength={notificationLength}
        fetchNotification={fetchNotification}
      />
    );
  }
}

export default NotificationContainer;
