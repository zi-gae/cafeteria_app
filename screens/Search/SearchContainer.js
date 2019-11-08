import React, { Component } from "react";
import SearchPresenter from "./SearchPresenter";
import SearchBar from "../../components/SearchBar";
import PropTypes from "prop-types";
import NavButton from "../../components/NavButton";
import { Platform } from "react-native";
import { LIGTH_GREEN } from "../../constants/Color";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingBy: "",
      isFetching: false
    };
  }

  static propTypes = {
    searchByTerm: PropTypes.func.isRequired,
    search: PropTypes.array,
    emptySearch: PropTypes.func.isRequired
  };
  static defaultProps = {
    search: []
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const iconName = Platform.OS === "android" ? "ios-close" : "ios-arrow-back";
    return {
      headerTitle: <SearchBar submit={text => params.submitSearch(text)} />,
      headerLeft: (
        <NavButton
          iconName={iconName}
          color={LIGTH_GREEN}
          onPress={() => navigation.goBack(null)}
        />
      )
    };
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.search) {
      this.setState({
        isFetching: false
      });
    }
  };

  refresh = () => {
    const { searchingBy } = this.state;
    const { searchByTerm, emptySearch } = this.props;
    if (searchingBy === "") {
      emptySearch();
    } else {
      searchByTerm(searchingBy);
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      submitSearch: this.submitSearch
    });
  }

  submitSearch = text => {
    const { searchByTerm, emptySearch } = this.props;
    this.setState(
      {
        searchingBy: text,
        isFetching: true
      },
      () => {
        if (this.state.searchingBy === "") {
          emptySearch();
        } else {
          searchByTerm(text);
        }
      }
    );
  };

  render() {
    const { searchingBy, isFetching } = this.state;
    const { search } = this.props;

    return (
      <SearchPresenter
        isFetching={isFetching}
        searchingBy={searchingBy}
        post={search}
        onRefresh={this.refresh}
      />
    );
  }
}

export default SearchContainer;
