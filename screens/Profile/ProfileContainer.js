import React, { Component } from "react";
import ProfilePresenter from "./ProfilePresenter";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      openNicknameInput: false,
      isProfileImageSubmitting: false
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
    modifyMyProfile: PropTypes.func.isRequired,
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

  handleNavigateOwnPosts = () => {
    const {
      navigation: { navigate },
      posts: { posts },
      user: { profile }
    } = this.props;
    const ownPost = posts.filter(post => {
      if (post.creator.username === profile.username) {
        return post;
      }
    });

    navigate("OwnPost", {
      ownPost,
      headerTitle: "내가 작성한 글",
      headerRight: null
    });
  };

  handleNavigateStudentAuth = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("StudentAuthentication");
  };

  changeProfile = () => {
    const { modifyMyProfile } = this.props;
    const { nickname } = this.state;
    if (nickname.length < 2) {
      Alert.alert("알림💡", "두 글자 이상 입력해주세요!", [
        { text: "OK", onPress: () => {} }
      ]);
    } else if (nickname.length > 11) {
      Alert.alert("알림💡", "열 글자 이하로 입력해주세요!", [
        { text: "OK", onPress: () => {} }
      ]);
    } else {
      modifyMyProfile(null, nickname);
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.profile.profile_image) {
      this.setState({
        isProfileImageSubmitting: false
      });
    }
  }
  handleChoicePhoto = async pickedPhoto => {
    const { modifyMyProfile } = this.props;
    this.setState({
      isProfileImageSubmitting: true
    });
    await modifyMyProfile(pickedPhoto, null);
  };

  clickedAppVersion = () => {
    Alert.alert("💡Beta💡", "0.8.1", [{ text: "OK", onPress: () => {} }]);
  };

  handleNavigatePrivacy = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("PrivacyPolicy");
  };

  handleSheetPress = async index => {
    const {
      navigation: { navigate },
      modifyMyProfile
    } = this.props;
    const { handleChoicePhoto } = this;
    const defaultProfileImageUrl = null;

    if (index === 1) {
      navigate("Library", {
        handleChoicePhoto
      });
    } else if (index === 2) {
      this.setState({
        isProfileImageSubmitting: true
      });
      await modifyMyProfile(defaultProfileImageUrl, null);
      this.setState({
        isProfileImageSubmitting: false
      });
    }
  };

  render() {
    const {
      openNicknameInput,
      nickname,
      isProfileImageSubmitting
    } = this.state;
    const {
      handleNicknameInput,
      changeProfile,
      changeNickname,
      submitLogout,
      handleNavigateOwnPosts,
      handleSheetPress,
      clickedAppVersion,
      handleNavigatePrivacy,
      handleNavigateStudentAuth
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
        handleNavigateOwnPosts={handleNavigateOwnPosts}
        handleSheetPress={handleSheetPress}
        isProfileImageSubmitting={isProfileImageSubmitting}
        clickedAppVersion={clickedAppVersion}
        handleNavigatePrivacy={handleNavigatePrivacy}
        handleNavigateStudentAuth={handleNavigateStudentAuth}
      />
    );
  }
}

export default ProfileContainer;
