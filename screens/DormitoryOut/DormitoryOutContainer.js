import React, { Component } from "react";
import { View, Text } from "react-native";
import DormitoryOutPresenter from "./DormitoryOutPresenter";

class DormitoryOutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <DormitoryOutPresenter />;
  }
}

export default DormitoryOutContainer;
