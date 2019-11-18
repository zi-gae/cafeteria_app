import React, { Component } from "react";
import SignUpPresenter from "./SignUpPresenter";
import { Alert } from "react-native";
import PropTypes from "prop-types";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password1: "",
      password2: "",
      nickname: "",
      isSubmitting: false,
      signUpStatusCode: this.props.signUpStatusCode
    };
  }

  static propTypes = {
    dispatchCreateUser: PropTypes.func.isRequired
  };

  handleSignupStatusCode = code => {
    const { handleAccountAction } = this.props;
    this.setState({
      email: "",
      username: "",
      password1: "",
      password2: "",
      nickname: "",
      isSubmitting: false
    });
    if (code === true) {
      Alert.alert("알림💡", "가입 축하드립니다.", [
        { text: "OK", onPress: () => handleAccountAction() }
      ]);
    } else {
      Alert.alert("알림💡", "서버에 문제가 생겼어요. 다시 시도 해주세요ㅠ", [
        { text: "OK", onPress: () => {} }
      ]);
    }
  };

  handleSubmit = async () => {
    const {
      username,
      password1,
      password2,
      email,
      nickname,
      isSubmitting
    } = this.state;
    const { handleSignupStatusCode, checkPassword, checkId } = this;
    const { dispatchCreateUser } = this.props;

    if (!isSubmitting) {
      if (username && password1 && password2 && email && nickname) {
        if (password1 !== password2) {
          Alert.alert("알림💡", "비밀번호가 일치하지 않습니다!");
        } else {
          if (checkPassword(password1) && checkId(username)) {
            // 아이디 중복 검사 해줘야함
            this.setState({
              isSubmitting: true
            });
            const result = await dispatchCreateUser(
              username,
              password1,
              nickname,
              email
            );
            handleSignupStatusCode(result);
          }
        }
      } else {
        Alert.alert("알림💡", "모두 입력 해주세요!");
      }
    }
  };

  checkId = id => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(id)) {
      Alert.alert(
        "알림💡",
        "아이디는 숫자와 영문만 조합으로 5~20 사용 가능합니다"
      );
      return false;
    }
  };

  checkPassword = password => {
    if (!/^[a-zA-Z0-9]{8,16}$/.test(password)) {
      Alert.alert(
        "알림💡",
        "비밀번호는 숫자와 영문자 조합으로 8~16 자리를 사용해야 합니다."
      );
      return false;
    }
    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/gi);
    if (checkNumber < 0 || checkEnglish < 0) {
      Alert.alert("숫자와 영문자를 혼용하여야 합니다.");
      return false;
    }
    if (/(\w)\1\1\1/.test(password)) {
      Alert.alert("444같은 문자를 4번 이상 사용하실 수 없습니다.");
      return false;
    }

    return true;
  };

  changeUsername = text => {
    this.setState({
      username: text
    });
  };
  changePasswordOne = text => {
    this.setState({
      password1: text
    });
  };
  changePasswordTwo = text => {
    this.setState({
      password2: text
    });
  };
  changeNickname = text => {
    this.setState({
      nickname: text
    });
  };
  changeEmail = text => {
    this.setState({
      email: text
    });
  };

  render() {
    const {
      changeUsername,
      changePasswordOne,
      changePasswordTwo,
      changeNickname,
      changeEmail,
      handleSubmit
    } = this;
    const { handleAccountAction } = this.props;
    const { email, username, password1, password2, nickname } = this.state;

    return (
      <SignUpPresenter
        email={email}
        username={username}
        password1={password1}
        password2={password2}
        nickname={nickname}
        handleAccountAction={handleAccountAction}
        changeUsername={changeUsername}
        changePasswordOne={changePasswordOne}
        changePasswordTwo={changePasswordTwo}
        changeNickname={changeNickname}
        changeEmail={changeEmail}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default SignUpContainer;
