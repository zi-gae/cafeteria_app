import React, { PureComponent } from "react";
import ProfilePresenter from "./ProfilePresenter";
import PropTypes from "prop-types";
import { Alert } from "react-native";

class ProfileContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      openNicknameInput: false
    };
  }

  static navigationOptions = ({ screenProps }) => ({
    headerTitle: screenProps.username
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
          openNicknameInput: true
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
      submitLogout
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
      />
    );
  }
}

export default ProfileContainer;
