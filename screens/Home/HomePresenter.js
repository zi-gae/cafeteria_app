import React from "react";
import { Text, View } from "react-native";

const HomePresenter = props => (
  <View>
    <Text onPress={() => props.navigation.navigate("Posts")}>Feed</Text>
  </View>
);

export default HomePresenter;
