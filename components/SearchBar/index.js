import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-left: 10px;
`;
const Search = styled.TextInput`
  flex: 1;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
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
