import React, { Component } from "react";
import { View, Text } from "react-native";
import TakePostPresenter from "./TakePostPresenter";

class TakePostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <TakePostPresenter />
      </View>
    );
  }
}

export default TakePostContainer;
