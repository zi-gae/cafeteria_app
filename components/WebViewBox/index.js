import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WebView from "react-native-webview";
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

index.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    })
  })
};

export default index;
