import React from "react";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import {
  BG_COLOR_WHITE,
  BODER_COLOR,
  LIGTH_GREEN,
  LIGHT_GREY
} from "../../constants/Color";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
const TextInput = styled.TextInput`
  height: 50px;
  border-color: ${BODER_COLOR};
  border-width: 1;
  width: ${Layout.width / 1.6};
  border-radius: 5px;
  margin-bottom: 5px;
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
const StatusBar = styled.StatusBar``;
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

const SignUpPresenter = ({
  stdntnum,
  username,
  password1,
  password2,
  nickname,
  handleAccountAction,
  changeUsername,
  changePasswordOne,
  changePasswordTwo,
  changeNickname,
  changeStdntNumber,
  handleSubmit
}) => {
  return (
    <Container>
      <KeyboardAware>
        <StatusBar barStyle={"light-content"} />
        <Header>
          <Logo source={require("../../assets/images/logo.png")} />
        </Header>
        <Content>
          <TextInput
            placeholder="아이디"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            value={username}
            onChangeText={changeUsername}
            onSubmitEditing={() => this.passwordRefOne.focus()}
          />

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
          <TextInput
            ref={passwordRefTwo => (this.passwordRefTwo = passwordRefTwo)}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="next"
            value={password2}
            onChangeText={changePasswordTwo}
            onSubmitEditing={() => this.nicknameRef.focus()}
          />
          <TextInput
            ref={nicknameRef => (this.nicknameRef = nicknameRef)}
            placeholder="닉네임"
            keyboardType="default"
            autoCorrect={false}
            returnKeyType="next"
            value={nickname}
            onChangeText={changeNickname}
            onSubmitEditing={() => this.stdntnumRef.focus()}
          />
          <TextInput
            ref={stdntnumRef => (this.stdntnumRef = stdntnumRef)}
            placeholder="학번"
            keyboardType="number-pad"
            autoCorrect={false}
            returnKeyType="done"
            value={stdntnum}
            onChangeText={changeStdntNumber}
            onSubmitEditing={handleSubmit}
          />
          <Button onPress={handleSubmit}>
            <BtnContainer>
              <BtnText>로그인</BtnText>
            </BtnContainer>
          </Button>
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
};

SignUpPresenter.propTypes = {
  stdntnum: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password1: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  handleAccountAction: PropTypes.func.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePasswordOne: PropTypes.func.isRequired,
  changePasswordTwo: PropTypes.func.isRequired,
  changeNickname: PropTypes.func.isRequired,
  changeStdntNumber: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SignUpPresenter;
