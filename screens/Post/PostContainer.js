import React, { Component } from "react";
import PostPresenter from "./PostPresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../../components/NavButton";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";

const Image = styled.Image`
  height: 70px;
  width: 70px;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(18)};
  color: ${LIGTH_GREEN};
`;

class PostContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Title>자유게시판</Title>,
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

  static propTyeps = {
    posts: PropTypes.array.isRequired,
    getPost: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.posts) {
      this.setState({
        isFetching: false
      });
    }
  };

  navigateWritePost = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("WritePost", {
      title: null,
      content: null,
      file: null,
      writeType: "글 쓰기"
    });
  };

  refresh = () => {
    const { getPost } = this.props;
    this.setState({
      isFetching: true
    });
    getPost();
  };

  render() {
    const { getPost, posts, navigation } = this.props;
    const { navigateWritePost, refresh } = this;
    const { isFetching } = this.state;
    return (
      <PostPresenter
        getPost={getPost}
        posts={posts}
        refresh={refresh}
        navigateWritePost={navigateWritePost}
        isFetching={isFetching}
        navigation={navigation}
      />
    );
  }
}

export default PostContainer;
