import React, { Component } from "react";
import PostPresenter from "./PostPresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../../components/NavButton";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;
const Title = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(18)};
  color: ${LIGTH_GREEN};
`;

class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isPostSubmitting: false,
      postLength: 20,
      fetchPost: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const {
      state: { params }
    } = navigation;
    const headerLeft = params ? (
      <NavButton
        onPress={() => navigation.goBack(null)}
        iconName={"ios-arrow-back"}
        color={LIGTH_GREEN}
      />
    ) : (
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode={"contain"}
      />
    );
    return {
      headerTitle: <Title>{params ? params.headerTitle : "자유게시판"}</Title>,
      headerLeft: headerLeft,
      headerRight: (
        <NavButton
          iconName={params ? params.headerRight : "ios-search"}
          color={LIGTH_GREEN}
          onPress={() => navigation.navigate("Search")}
        />
      )
    };
  };

  handlePostLength = () => {
    const { posts } = this.props;
    const { navigation } = this.props;
    const { postLength } = this.state;
    const lenght = navigation.state.params
      ? navigation.state.params.ownPost.length
      : posts.length;

    if (lenght > postLength) {
      this.setState({
        fetchPost: true
      });
      setTimeout(() => {
        this.setState({
          postLength: postLength + 10,
          fetchPost: false
        });
      }, 700);
    }
  };

  static propTyeps = {
    posts: PropTypes.array.isRequired,
    getPost: PropTypes.func.isRequired
  };

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
      image: null,
      writeType: "글 쓰기",
      handleSuccessButton: this.handleSuccessButton
    });
  };

  handleSuccessButton = async (title, content, image, anonymous) => {
    if (anonymous === undefined) {
      anonymous = false;
    }
    const { dispatchCreatePost } = this.props;
    await dispatchCreatePost(title, content, image, anonymous);
  };

  refresh = () => {
    const { getPost } = this.props;
    this.setState({
      isFetching: true
    });
    getPost();
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    const { getPost, posts, navigation } = this.props;
    const {
      navigateWritePost,
      refresh,
      isCloseToBottom,
      handlePostLength
    } = this;
    const { isFetching, isPostSubmitting, postLength, fetchPost } = this.state;

    return (
      <PostPresenter
        getPost={getPost}
        posts={
          navigation.state.params ? navigation.state.params.ownPost : posts
        }
        refresh={refresh}
        navigateWritePost={navigateWritePost}
        isFetching={isFetching}
        navigation={navigation}
        isPostSubmitting={isPostSubmitting}
        isCloseToBottom={isCloseToBottom}
        handlePostLength={handlePostLength}
        postLength={postLength}
        fetchPost={fetchPost}
      />
    );
  }
}

export default PostContainer;
