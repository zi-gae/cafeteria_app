import React from "react";
import styled from "styled-components";
import Layout from "../../constants/Layout";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.Image`
  height: ${Layout.height / 1.3};
  width: ${Layout.width / 1.3};
`;

const index = () => (
  <Container>
    <Logo
      resizeMode="contain"
      source={require("../../assets/images/logo.png")}
    ></Logo>
  </Container>
);

export default index;
