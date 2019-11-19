import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import {
  BG_COLOR_WHITE,
  BODER_COLOR,
  LIGTH_GREEN,
  LIGHT_GREY,
  DARK_GREEN,
  LIGHT_RED
} from "../../constants/Color";
import Layout from "../../constants/Layout";

const KeyboardAware = styled(KeyboardAwareScrollView)``;
const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  align-items: center;
  justify-content: flex-end;
  height: ${Layout.height / 3};
`;
const Logo = styled.Image`
  width: 180px;
  height: 150px;
`;
const Content = styled.View`
  background-color: ${BG_COLOR_WHITE};
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const TextBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${RFValue(25)};
`;
const TextInput = styled.TextInput`
  height: 50px;
  border-color: ${BODER_COLOR};
  border-width: 1;
  width: ${Layout.width / 1.6};
  border-radius: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Button = styled.TouchableOpacity`
  border-radius: 3px;
  background-color: ${LIGTH_GREEN};
  width: ${Layout.width / 1.6};
  height: 30px;
`;
const BtnContainer = styled.View`
  padding: 7px 20px 7px 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;
const Footer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${RFValue(15)};
`;
const FooterBox = styled.View`
  flex-direction: row;
  width: ${Layout.width / 2.7};
  justify-content: space-between;
  margin-bottom: 10px;
`;
const FooterText = styled.Text`
  color: ${LIGHT_GREY};
`;
const BtnSignUp = styled.TouchableOpacity``;
const SignUpText = styled.Text`
  font-weight: bold;
  color: ${LIGTH_GREEN};
`;
const EmptyIcon = styled.View`
  width: ${RFValue(20)};
`;
const ActivityIndicator = styled.ActivityIndicator``;

const SignUpPresenter = ({
  email,
  username,
  password1,
  password2,
  nickname,
  handleAccountAction,
  changeUsername,
  changePasswordOne,
  changePasswordTwo,
  changeNickname,
  changeEmail,
  handleSubmit,
  handleCheckedUsername,
  isAlreadyId,
  showIdCheckStatus,
  isFetchIdCheck,
  handleCheckedPassword,
  showPwdCheckStatus,
  isSamePassword,
  handleCheckedNickname,
  isFetchNicknameCheck,
  isAlreadyNickname,
  showNicknameCheckStatus,
  handleCheckedEmail,
  isAlreadyEmail,
  isFetchEmailCheck,
  showEmailCheckStatus
}) => (
  <Container>
    <KeyboardAware
      enableOnAndroid={true}
      extraHeight={100}
      extraScrollHeight={100}
    >
      <Header>
        <Logo source={require("../../assets/images/logo.png")} />
      </Header>
      <Content>
        <TextBox>
          {isFetchIdCheck ? (
            // 아이디 체크 중이면 indicator 띄우고 사용 가능 여부에 따라 o 또는 x 표시
            <ActivityIndicator color="black" />
          ) : showIdCheckStatus ? (
            isAlreadyId ? (
              <FontAwesome name="check" color={DARK_GREEN} size={RFValue(20)} />
            ) : (
              <FontAwesome name="close" color={LIGHT_RED} size={RFValue(20)} />
            )
          ) : (
            <EmptyIcon />
          )}
          <TextInput
            placeholder="아이디"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            value={username}
            onChangeText={changeUsername}
            onSubmitEditing={() => {
              if (isAlreadyId) {
                this.passwordRefOne.focus();
              }
            }}
            onBlur={handleCheckedUsername}
          />
        </TextBox>
        <TextBox>
          <EmptyIcon />
          <TextInput
            ref={passwordRefOne => (this.passwordRefOne = passwordRefOne)}
            placeholder="비밀번호"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="next"
            value={password1}
            onChangeText={changePasswordOne}
            onSubmitEditing={() => this.passwordRefTwo.focus()}
          />
        </TextBox>
        <TextBox>
          {showPwdCheckStatus ? (
            isSamePassword ? (
              <FontAwesome name="check" color={DARK_GREEN} size={RFValue(20)} />
            ) : (
              <FontAwesome name="close" color={LIGHT_RED} size={RFValue(20)} />
            )
          ) : (
            <EmptyIcon />
          )}
          <TextInput
            ref={passwordRefTwo => (this.passwordRefTwo = passwordRefTwo)}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="next"
            value={password2}
            onChangeText={changePasswordTwo}
            onSubmitEditing={() => this.nicknameRef.focus()}
            onBlur={handleCheckedPassword}
          />
        </TextBox>
        <TextBox>
          {isFetchNicknameCheck ? (
            // 아이디 체크 중이면 indicator 띄우고 사용 가능 여부에 따라 o 또는 x 표시
            <ActivityIndicator color="black" />
          ) : showNicknameCheckStatus ? (
            isAlreadyNickname ? (
              <FontAwesome name="check" color={DARK_GREEN} size={RFValue(20)} />
            ) : (
              <FontAwesome name="close" color={LIGHT_RED} size={RFValue(20)} />
            )
          ) : (
            <EmptyIcon />
          )}
          <TextInput
            ref={nicknameRef => (this.nicknameRef = nicknameRef)}
            placeholder="닉네임"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            value={nickname}
            onChangeText={changeNickname}
            onSubmitEditing={() => this.emailRef.focus()}
            onBlur={handleCheckedNickname}
          />
        </TextBox>
        <TextBox>
          {isFetchEmailCheck ? (
            // 아이디 체크 중이면 indicator 띄우고 사용 가능 여부에 따라 o 또는 x 표시
            <ActivityIndicator color="black" />
          ) : showEmailCheckStatus ? (
            isAlreadyEmail ? (
              <FontAwesome name="check" color={DARK_GREEN} size={RFValue(20)} />
            ) : (
              <FontAwesome name="close" color={LIGHT_RED} size={RFValue(20)} />
            )
          ) : (
            <EmptyIcon />
          )}
          <TextInput
            ref={emailRef => (this.emailRef = emailRef)}
            placeholder="이메일 *비밀번호 분실시 필요*"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            value={email}
            onChangeText={changeEmail}
            onSubmitEditing={handleSubmit}
            onBlur={handleCheckedEmail}
          />
        </TextBox>
        <TextBox>
          <EmptyIcon />
          <Button onPress={handleSubmit}>
            <BtnContainer>
              <BtnText>회원가입</BtnText>
            </BtnContainer>
          </Button>
        </TextBox>
      </Content>
    </KeyboardAware>
    <Footer>
      <FooterBox>
        <FooterText>계정이 있으신가요?</FooterText>
        <BtnSignUp onPress={handleAccountAction}>
          <SignUpText>로그인</SignUpText>
        </BtnSignUp>
      </FooterBox>
    </Footer>
  </Container>
);

SignUpPresenter.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password1: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  handleAccountAction: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePasswordOne: PropTypes.func.isRequired,
  changePasswordTwo: PropTypes.func.isRequired,
  changeNickname: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SignUpPresenter;
