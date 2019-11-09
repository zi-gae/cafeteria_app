import React, { Component } from "react";
import WebView from "react-native-webview";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

class index extends Component {
  constructor(props) {
    super(props);
  }
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
