import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import NotificationPresenter from "./NotificationPresenter";

class NotificationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = props => ({
    headerTitle: "Notification"
  });
  render() {
    return (
      <View>
        <NotificationPresenter />
      </View>
    );
  }
}

export default NotificationContainer;
