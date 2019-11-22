import React, { Component } from "react";
import { Alert, Platform } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { RFValue } from "react-native-responsive-fontsize";
import ProfilePresenter from "./ProfilePresenter";
import { LIGTH_GREEN } from "../../constants/Color";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;
const Title = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(18)};
  color: ${LIGTH_GREEN};
`;

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      isOpenNicknameInput: false,
      isProfileImageSubmitting: false,
      image: ""
    };
  }

  static navigationOptions = ({ screenProps }) => ({
    headerTitle: <Title>내 정보</Title>,
    headerLeft: (
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode={"contain"}
      />
    )
  });

  static propTypes = {
    modifyMyProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    dispatchIsAlreadyNickname: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.getPermissionAsync();
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

  changeProfile = async () => {
    const { modifyMyProfile, dispatchIsAlreadyNickname } = this.props;
    const { nickname } = this.state;
    if (nickname.length < 2 && nickname.length > 11) {
      Alert.alert("알림💡", "닉네임은 2~10 글자로 사용 해주세요!", [
        { text: "OK", onPress: () => {} }
      ]);
    } else {
      this.setState({
        isProfileImageSubmitting: true
      });
      const result = await dispatchIsAlreadyNickname(nickname);
      if (result) {
        await modifyMyProfile(null, nickname);
        this.setState(
          {
            nickname: "",
            isOpenNicknameInput: false,
            isProfileImageSubmitting: false
          },
          () => {
            Alert.alert("알림💡", "변경되었어요!", [
              { text: "OK", onPress: () => {} }
            ]);
          }
        );
      } else {
        this.setState(
          {
            nickname: "",
            isOpenNicknameInput: true,
            isProfileImageSubmitting: false
          },
          () => {
            Alert.alert("알림💡", "이미 사용중인 별명이에요", [
              { text: "OK", onPress: () => {} }
            ]);
          }
        );
      }
    }
  };

  handleNavigatePrivacy = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("PrivacyPolicy");
  };

  clickedAppVersion = () => {
    Alert.alert("💡Beta💡", "0.8.1", [{ text: "OK", onPress: () => {} }]);
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
      const modifyResult = await modifyMyProfile(result.uri, null);
      if (modifyResult) {
        this.setState({ isProfileImageSubmitting: false, image: result.uri });
      } else {
        Alert.alert("알림💡", "서버에 문제가 생겼어요. 다시 시도 해주세요", [
          { text: "OK" }
        ]);
      }
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

  onChangeNickname = text => {
    this.setState({
      nickname: text
    });
  };

  handleNicknameInput = () => {
    this.setState({
      isOpenNicknameInput: true
    });
  };

  render() {
    const {
      isOpenNicknameInput,
      nickname,
      isProfileImageSubmitting
    } = this.state;
    const {
      handleNicknameInput,
      changeProfile,
      onChangeNickname,
      submitLogout,
      handleNavigateOwnPosts,
      handleSheetPress,
      clickedAppVersion,
      handleNavigatePrivacy,
      handleNavigateStudentAuth
    } = this;
    const {
      user,
      user: {
        profile: { univ_authentication }
      }
    } = this.props;

    return (
      <ProfilePresenter
        handleNicknameInput={handleNicknameInput}
        isOpenNicknameInput={isOpenNicknameInput}
        changeProfile={changeProfile}
        onChangeNickname={onChangeNickname}
        nickname={nickname}
        user={user}
        submitLogout={submitLogout}
        handleNavigateOwnPosts={handleNavigateOwnPosts}
        handleSheetPress={handleSheetPress}
        isProfileImageSubmitting={isProfileImageSubmitting}
        clickedAppVersion={clickedAppVersion}
        handleNavigatePrivacy={handleNavigatePrivacy}
        handleNavigateStudentAuth={handleNavigateStudentAuth}
        univAuthentication={univ_authentication}
      />
    );
  }
}

export default ProfileContainer;
