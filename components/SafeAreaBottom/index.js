import React from "react";
import styled from "styled-components";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";

const SafeArea = styled.View`
  margin-bottom: ${props => (props.isIphoneX ? getBottomSpace() : "10px")};
`;

const SafeAreaBottom = ({ keyboardView }) => (
  <SafeArea isIphoneX={isIphoneX() && !keyboardView} />
);

export default SafeAreaBottom;
