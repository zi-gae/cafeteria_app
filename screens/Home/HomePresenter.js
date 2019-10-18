import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const HomePresenter = ({ navigate }) => (
  <View>
    <Text onPress={() => navigate("Posts")}>Feed</Text>
  </View>
);

HomePresenter.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default HomePresenter;
