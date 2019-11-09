import React, { PureComponent } from "react";
import NotificationPresenter from "./NotificationPresenter";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";
import { LIGTH_GREEN } from "../../constants/Color";
import styled from "styled-components";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;

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
