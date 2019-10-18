import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import ProfilePresenter from "./ProfilePresenter";

class ProfileContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.username
  });

  render() {
    return (
      <View>
        <ProfilePresenter />
      </View>
    );
  }
}

export default ProfileContainer;
