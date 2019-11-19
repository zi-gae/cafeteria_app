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
      signUpStatusCode: this.props.signUpStatusCode,
      isFetchIdCheck: false,
      isFetchNicknameCheck: false,
      isFetchEmailCheck: false,
      isAlreadyId: false,
      isAlreadyNickname: false,
      isAlreadyEmail: false,
      isSamePassword: false,
      showIdCheckStatus: false,
      showPwdCheckStatus: false,
      showNicknameCheckStatus: false,
      showEmailCheckStatus: false
    };
  }

  static propTypes = {
    dispatchCreateUser: PropTypes.func.isRequired,
    dispatchIsAlreadyId: PropTypes.func.isRequired,
    dispatchIsAlreadyNickname: PropTypes.func.isRequired,
    dispatchIsAlreadyEmail: PropTypes.func.isRequired
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

  handleCheckedEmail = async () => {
    const { checkEmail } = this;
    const { email } = this.state;
    const { dispatchIsAlreadyEmail } = this.props;
    if (email === "") {
      this.setState({
        isFetchEmailCheck: false
      });
    } else {
      this.setState({
        showEmailCheckStatus: true
      });
      if (checkEmail(email)) {
        this.setState({
          isFetchEmailCheck: true
        });
        const result = await dispatchIsAlreadyEmail(email);
        this.setState({
          isFetchEmailCheck: false
        });
        if (result) {
          this.setState({
            isAlreadyEmail: true
          });
        } else if (!result) {
          Alert.alert("알림💡", "이미 사용된 이메일입니다", [
            {
              text: "OK",
              onPress: () => {
                this.setState({
                  email: "",
                  isAlreadyEmail: false
                });
              }
            }
          ]);
        } else {
          this.setState({
            isAlreadyEmail: false
          });
        }
      } else {
        this.setState({
          isAlreadyEmail: false
        });
      }
    }
  };

  handleCheckedNickname = async () => {
    const { checkNickname } = this;
    const { nickname } = this.state;
    const { dispatchIsAlreadyNickname } = this.props;
    if (nickname === "") {
      this.setState({
        isFetchNicknameCheck: false
      });
    } else {
      this.setState({
        showNicknameCheckStatus: true
      });
      if (checkNickname(nickname)) {
        this.setState({
          isFetchNicknameCheck: true
        });
        const result = await dispatchIsAlreadyNickname(nickname);
        this.setState({
          isFetchNicknameCheck: false
        });
        if (result) {
          this.setState({
            isAlreadyNickname: true
          });
        } else if (!result) {
          Alert.alert("알림💡", "이미 존재하는 별명입니다", [
            {
              text: "OK",
              onPress: () => {
                this.setState({
                  nickname: "",
                  isAlreadyNickname: false
                });
              }
            }
          ]);
        } else {
          this.setState({
            isAlreadyNickname: false
          });
        }
      } else {
        this.setState({
          isAlreadyNickname: false
        });
      }
    }
  };

  handleCheckedPassword = () => {
    const { checkPassword } = this;
    const { password1, password2 } = this.state;

    if (password1 === "" && password2 === "") {
      this.setState({
        showPwdCheckStatus: false
      });
    } else {
      this.setState({
        showPwdCheckStatus: true
      });
      if (password1 === password2) {
        if (checkPassword(password1)) {
          this.setState({
            isSamePassword: true
          });
        } else {
          this.setState({
            isSamePassword: false
          });
        }
      } else {
        Alert.alert("알림💡", "비밀번호가 일치하지 않습니다", [
          {
            text: "OK",
            onPress: () => {
              this.setState({
                password1: "",
                password2: ""
              });
            }
          }
        ]);
        this.setState({
          isSamePassword: false
        });
      }
    }
  };

  handleCheckedUsername = async () => {
    const { checkId } = this;
    const { username } = this.state;
    const { dispatchIsAlreadyId } = this.props;
    this.setState({
      isFetchIdCheck: true
    });
    const result = await dispatchIsAlreadyId(username);
    this.setState({
      isFetchIdCheck: false,
      showIdCheckStatus: true
    });
    if (checkId(username)) {
      if (result) {
        this.setState({
          isAlreadyId: true
        });
      } else if (!result) {
        Alert.alert("알림💡", "이미 존재하는 아이디입니다", [
          {
            text: "OK",
            onPress: () => {
              this.setState({
                username: "",
                isAlreadyId: false
              });
            }
          }
        ]);
      } else {
        this.setState({
          isAlreadyId: false
        });
      }
    } else {
      this.setState({
        isAlreadyId: false
      });
    }
  };

  checkEmail = email => {
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!emailRule.test(email)) {
      Alert.alert("알림💡", "이메일 규격이 맞지 않습니다.", [
        {
          text: "OK",
          onPress: () => {
            this.setState({
              email: ""
            });
          }
        }
      ]);
      return false;
    }
    return true;
  };

  checkNickname = id => {
    if (!/^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/.test(id)) {
      Alert.alert(
        "알림💡",
        "별명은 2~10 자리, 그리고 특수문자를 사용 할 수 없습니다.",
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({
                username: ""
              });
            }
          }
        ]
      );
      return false;
    }
    return true;
  };

  checkId = id => {
    if (!/^[A-Za-z0-9]{5,20}$/.test(id)) {
      Alert.alert("알림💡", "아이디는 5~16 자리를 사용해야 합니다", [
        {
          text: "OK",
          onPress: () => {
            this.setState({
              username: ""
            });
          }
        }
      ]);
      return false;
    }
    return true;
  };

  checkPassword = password => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(password)) {
      Alert.alert(
        "알림💡",
        "비밀번호는 숫자와 영문자 조합으로 8~20 자리를 사용해야 합니다.",
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({
                password1: "",
                password2: ""
              });
            }
          }
        ]
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
      handleSubmit,
      handleCheckedUsername,
      handleCheckedPassword,
      handleCheckedNickname,
      handleCheckedEmail
    } = this;
    const { handleAccountAction } = this.props;
    const {
      email,
      username,
      password1,
      password2,
      nickname,
      isAlreadyId,
      isFetchIdCheck,
      showIdCheckStatus,
      showPwdCheckStatus,
      isSamePassword,
      isFetchNicknameCheck,
      isAlreadyNickname,
      showNicknameCheckStatus,
      isFetchEmailCheck,
      isAlreadyEmail,
      showEmailCheckStatus
    } = this.state;

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
        handleCheckedUsername={handleCheckedUsername}
        handleCheckedPassword={handleCheckedPassword}
        handleCheckedNickname={handleCheckedNickname}
        handleCheckedEmail={handleCheckedEmail}
        isAlreadyId={isAlreadyId}
        isAlreadyNickname={isAlreadyNickname}
        isAlreadyEmail={isAlreadyEmail}
        isFetchIdCheck={isFetchIdCheck}
        isFetchNicknameCheck={isFetchNicknameCheck}
        isFetchEmailCheck={isFetchEmailCheck}
        showIdCheckStatus={showIdCheckStatus}
        showPwdCheckStatus={showPwdCheckStatus}
        showNicknameCheckStatus={showNicknameCheckStatus}
        showEmailCheckStatus={showEmailCheckStatus}
        isSamePassword={isSamePassword}
      />
    );
  }
}

export default SignUpContainer;
