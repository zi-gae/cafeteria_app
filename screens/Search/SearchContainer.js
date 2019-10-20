import React, { Component } from "react";
import SearchPresenter from "./SearchPresenter";
import SearchBar from "../../components/SearchBar";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <SearchBar />
    };
  };

  render() {
    return <SearchPresenter />;
  }
}

export default SearchContainer;
