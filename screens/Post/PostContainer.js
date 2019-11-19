import React, { Component } from "react";
import PostPresenter from "./PostPresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../../components/NavButton";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";
import { Alert } from "react-native";

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

  static propTyeps = {
    posts: PropTypes.array.isRequired,
    getPost: PropTypes.func.isRequired
  };

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

  componentWillReceiveProps = nextProps => {
    if (nextProps.posts) {
      this.setState({
        isFetching: false
      });
    }
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

  navigateWritePost = () => {
    const { alertAccessAuthentication } = this;
    const {
      navigation: { navigate },
      user: {
        profile: { univ_authentication }
      }
    } = this.props;

    univ_authentication
      ? navigate("WritePost", {
          title: "",
          content: "",
          image: null,
          writeType: "글 쓰기",
          handleSuccessButton: this.handleSuccessButton
        })
      : alertAccessAuthentication();
  };

  alertAccessAuthentication = () => {
    const { navigation } = this.props;
    Alert.alert("알림💡", "재학생 인증 후에 시도 해주세오", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Profile");
        }
      }
    ]);
  };

  handleSuccessButton = async (title, content, image, anonymous) => {
    if (anonymous === undefined) {
      anonymous = false;
    }
    const { dispatchCreatePost } = this.props;
    this.setState({
      fetchPost: true
    });
    const result = await dispatchCreatePost(title, content, image, anonymous);
    if (result) {
      this.setState({
        fetchPost: false
      });
    } else {
      Alert.alert("알림💡", "서버 에러 발생. 다시 시도 해주세요", [
        {
          text: "OK"
        }
      ]);
    }
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
    const {
      navigateWritePost,
      refresh,
      isCloseToBottom,
      handlePostLength
    } = this;
    const { isFetching, isPostSubmitting, postLength, fetchPost } = this.state;
    const {
      getPost,
      posts,
      navigation,
      user: {
        profile: { univ_authentication }
      }
    } = this.props;

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
        univAuthentication={univ_authentication}
      />
    );
  }
}

export default PostContainer;
