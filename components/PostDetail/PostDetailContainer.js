import React, { Component } from "react";
import { View, Text } from "react-native";
import PostDetailPresenter from "./PostDetailPresenter";

class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PostDetailPresenter />;
  }
}

export default PostDetailContainer;
