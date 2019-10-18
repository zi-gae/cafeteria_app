import React, { Component } from "react";
import { View, Text } from "react-native";
import HomePresenter from "./HomePresenter";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <HomePresenter {...this.props} />
      </View>
    );
  }
}

export default HomeContainer;
