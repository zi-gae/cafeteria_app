import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Layout from "../../constants/Layout";

const Container = styled.View`
  width: ${Layout.width / 1.5};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-left: ${RFValue(10)};
`;
const Search = styled.TextInput`
  flex: 1;
  padding-top: ${RFValue(10)};
  padding-bottom: ${RFValue(10)};
  font-size: ${RFValue(15)};
  color: #424242;
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  changeText = text => {
    this.setState({
      term: text
    });
  };

  handleSubmit = () => {
    const { submit } = this.props;
    const { term } = this.state;
    submit(term);
  };

  render() {
    const { term } = this.setState;
    const { changeText, handleSubmit } = this;
    return (
      <Container>
        <Ionicons
          style={{ margin: 10 }}
          name="ios-search"
          size={20}
          color="#000"
        />
        <Search
          placeholder="글 제목, 내용"
          underlineColorAndroid="transparent"
          returnKeyType={"search"}
          value={term}
          onChangeText={changeText}
          onEndEditing={handleSubmit}
        />
      </Container>
    );
  }
}

SearchBar.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SearchBar;
