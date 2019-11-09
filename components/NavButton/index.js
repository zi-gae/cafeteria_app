import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

const Container = styled.View`
  padding-left: 10px;
  padding-right: 10px;
`;
const Empty = styled.View``;

const NavButton = ({ iconName, onPress, color }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    {iconName ? (
      <Container>
        <Ionicons name={iconName} color={color} size={30} />
      </Container>
    ) : (
      <Empty />
    )}
  </TouchableWithoutFeedback>
);

NavButton.propTypes = {
  iconName: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

export default NavButton;
