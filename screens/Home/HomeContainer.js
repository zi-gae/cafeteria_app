import React, { Component } from "react";
import { View, Text } from "react-native";
import HomePresenter from "./HomePresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../../components/NavButton";

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
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode={"contain"}
        />
        <Title>학식이</Title>
      </>
    ),
    headerRight: (
      <>
        <NavButton
          iconName={"ios-search"}
          color={LIGTH_GREEN}
          onPress={() => navigation.navigate("Search")}
        />
        <NavButton
          iconName={"ios-person"}
          color={LIGTH_GREEN}
          onPress={() => navigation.navigate("Profile")}
        />
      </>
    )
  });

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <View>
        <HomePresenter navigate={navigate} />
      </View>
    );
  }
}

export default HomeContainer;
