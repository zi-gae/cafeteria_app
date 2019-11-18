import React, { Component } from "react";
import ProfilePresenter from "./ProfilePresenter";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

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
      isProfileImageSubmitting: false,
      image: ""
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

  componentDidMount() {
    this.getPermissionAsync();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.profile.profile_image) {
      this.setState({
        isProfileImageSubmitting: false
      });
    }
  }

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
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

  clickedAppVersion = () => {
    Alert.alert("💡Beta💡", "0.8.1", [{ text: "OK", onPress: () => {} }]);
  };

  handleNavigatePrivacy = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("PrivacyPolicy");
  };

  pickImage = async () => {
    const { modifyMyProfile } = this.props;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });
    if (!result.cancelled) {
      this.setState({
        isProfileImageSubmitting: true
      });
      modifyMyProfile(result.uri, null);
      this.setState({ image: result.uri });
    }
  };

  handleSheetPress = async index => {
    const { modifyMyProfile } = this.props;
    const { pickImage } = this;
    const defaultProfileImageUrl = null;

    if (index === 1) {
      pickImage();
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
