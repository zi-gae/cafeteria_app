import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
`;
const Text = styled.Text``;

const NavButton = ({ iconName, onPress }) => {
  console.log(onPress);

  return (
    <TouchableWithoutFeedback onPressOut={onPress}>
      <Container>
        <Ionicons name={iconName} color={"black"} size={30} />
      </Container>
    </TouchableWithoutFeedback>
  );
};

NavButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default NavButton;
