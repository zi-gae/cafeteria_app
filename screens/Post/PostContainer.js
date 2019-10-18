import React, { Component } from "react";
import PostPresenter from "./PostPresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../../components/NavButton";
import PropTypes from "prop-types";

const Image = styled.Image`
  height: 70px;
  width: 70px;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${LIGTH_GREEN};
`;
class PostContainer extends Component {
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
      </>
    )
  });

  static propTyeps = {
    post: PropTypes.array.isRequired,
    getPost: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.post) {
      this.setState({
        isFetching: false
      });
    }
  };

  refresh = () => {
    const { getPost } = this.props;
    this.setState({
      isFetching: true
    });
    getPost();
  };

  render() {
    const {
      navigation: { navigate },
      getPost,
      post
    } = this.props;
    const { isFetching } = this.state;
    return (
      <PostPresenter
        navigate={navigate}
        getPost={getPost}
        post={post}
        refresh={this.refresh}
        isFetching={isFetching}
      />
    );
  }
}

export default PostContainer;
