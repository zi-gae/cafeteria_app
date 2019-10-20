import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import { LIGTH_GREEN } from "../../constants/Color";
import styled from "styled-components";
import NavButton from "../../components/NavButton";
import PropTypes from "prop-types";

const Image = styled.Image`
  height: 70px;
  width: 70px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${LIGTH_GREEN};
`;

class HomeContainer extends Component {
  render() {
    return <HomePresenter />;
  }
}

export default HomeContainer;
