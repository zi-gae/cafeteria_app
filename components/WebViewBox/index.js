import React, { Component } from "react";
import WebView from "react-native-webview";
import styled from "styled-components";
import NavButton from "../NavButton";
import { LIGTH_GREEN } from "../../constants/Color";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

class index extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: (
      <NavButton
        iconName="ios-arrow-back"
        color={LIGTH_GREEN}
        onPress={() => navigation.goBack(null)}
      />
    )
  });
  render() {
    const {
      navigation: {
        state: {
          params: { url }
        }
      }
    } = this.props;

    return (
      <Container>
        <WebView
          source={{
            uri: `${url}`
          }}
        />
      </Container>
    );
  }
}

export default index;
