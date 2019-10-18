import React, { Component } from "react";
import { View, Text } from "react-native";
import PostsPresenter from "./PostsPresenter";
import NavButton from "../../components/NavButton";

class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <NavButton
        onPress={() => navigation.navigate("Home")}
        iconName={"ios-arrow-back"}
      />
    )
  });

  render() {
    return (
      <View>
        <PostsPresenter />
      </View>
    );
  }
}

export default PostsContainer;
