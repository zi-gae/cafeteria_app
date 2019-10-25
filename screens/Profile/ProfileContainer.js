import React, { PureComponent } from "react";
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
    return <ProfilePresenter />;
  }
}

export default ProfileContainer;
