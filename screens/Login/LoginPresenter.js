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
const KaKaoContainer = styled.TouchableOpacity`
  margin-top: 30px;
`;
const KaKaoView = styled.View`
  flex-direction: row;
  align-items: center;
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
  justify-content: center;
  align-items: center;
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
  font-weight: 600px;
  text-align: center;
  font-size: 14px;
`;
const StatusBar = styled.StatusBar``;
const ActivityIndicator = styled.ActivityIndicator``;
const Image = styled.Image``;
const Footer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
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

const LoginPresenter = ({
  handleAccountAction,
  username,
  password,
  isSubmitting,
  changeUsername,
  changePassword,
  handleSubmit
}) => {
  return (
    <Container>
      <StatusBar barStyle={"light-content"} />
      <Header>
        <Logo source={require("../../assets/images/logo.png")} />
      </Header>
      <Content>
        <TextInput
          placeholder="아이디"
          autoCompleteType="username"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="ascii-capable"
          value={username}
          onChangeText={changeUsername}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordRef.focus()}
        />
        <TextInput
          ref={passwordRef => (this.passwordRef = passwordRef)}
          placeholder="비밀번호"
          secureTextEntry={true}
          autoCompleteType="password"
          autoCorrect={false}
          value={password}
          onChangeText={changePassword}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        <Button onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <BtnContainer>
              <BtnText>로그인</BtnText>
            </BtnContainer>
          )}
        </Button>
        <KaKaoContainer>
          <KaKaoView>
            <Image
              source={require("../../assets/images/kakao_account.png")}
              resizeMode="stretch"
            />
          </KaKaoView>
        </KaKaoContainer>
      </Content>
      <Footer>
        <FooterBox>
          <FooterText>계정이 없으신가요?</FooterText>
          <BtnSignUp onPress={handleAccountAction}>
            <SignUpText>가입</SignUpText>
          </BtnSignUp>
        </FooterBox>
      </Footer>
    </Container>
  );
};

LoginPresenter.propTypes = {
  handleAccountAction: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default LoginPresenter;
