import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import { LIGTH_GREEN } from "../../constants/Color";
import styled from "styled-components";
import NavButton from "../../components/NavButton";

const Image = styled.Image`
  height: 70px;
  width: 70px;
`;

class HomeContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode={"contain"}
      />
    ),
    headerRight: (
      <NavButton
        iconName={"ios-search"}
        color={LIGTH_GREEN}
        onPress={() => navigation.navigate("Search")}
      />
    )
  });
  render() {
    return <HomePresenter />;
  }
}

export default HomeContainer;
