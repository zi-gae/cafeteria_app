import React, { Component } from "react";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import HomePresenter from "./HomePresenter";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../../components/NavButton";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

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

  componentDidMount = async () => {
    const { initApp } = this.props;
    await initApp();
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    return <HomePresenter navigate={navigate} />;
  }
}

export default HomeContainer;
