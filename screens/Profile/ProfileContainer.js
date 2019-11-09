import React, { PureComponent } from "react";
import ProfilePresenter from "./ProfilePresenter";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;

class ProfileContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      openNicknameInput: false
    };
  }

  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.username,
    headerLeft: (
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode={"contain"}
      />
    )
  });

  static propTypes = {
    modifyNickname: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  changeNickname = text => {
    this.setState({
      nickname: text
    });
  };

  handleNicknameInput = () => {
    this.setState({
      openNicknameInput: true
    });
  };

  submitLogout = () => {
    const { logout } = this.props;
    Alert.alert("알림💡", "정말 로그아웃 하시겠어요?!", [
      {
        text: "아니요",
        onPress: () => {},
        style: "cancel"
      },
      { text: "네", onPress: () => logout() }
    ]);
  };

  handleNavigate = () => {
    const {
      navigation: { navigate },
      posts: { posts },
      user: { profile }
    } = this.props;

    const ownPost = posts.filter(post => {
      if (post.creator.username === profile.name) {
        return post;
      }
    });
    navigate("OwnPost", {
      ownPost,
      headerTitle: "내가 작성한 글",
      headerRight: null
    });
  };

  changeProfile = () => {
    const { modifyNickname } = this.props;
    const { nickname } = this.state;
    if (nickname.length < 2) {
      Alert.alert("알림💡", "두 글자 이상 입력해주세요!", [
        { text: "OK", onPress: () => {} }
      ]);
    } else {
      modifyNickname(nickname);
      this.setState(
        {
          nickname: "",
          openNicknameInput: false
        },
        () => {
          Alert.alert("알림💡", "변경되었어요!", [
            { text: "OK", onPress: () => {} }
          ]);
        }
      );
    }
  };

  render() {
    const { openNicknameInput, nickname } = this.state;
    const {
      handleNicknameInput,
      changeProfile,
      changeNickname,
      submitLogout,
      handleNavigate
    } = this;
    const { user } = this.props;

    return (
      <ProfilePresenter
        handleNicknameInput={handleNicknameInput}
        openNicknameInput={openNicknameInput}
        changeProfile={changeProfile}
        changeNickname={changeNickname}
        nickname={nickname}
        user={user}
        submitLogout={submitLogout}
        handleNavigate={handleNavigate}
      />
    );
  }
}

export default ProfileContainer;
