import React from "react";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";
import { BODER_COLOR, DARK_GREEN, LIGHT_GREY } from "../../constants/Color";

const Container = styled.ScrollView`
  margin-top: 10px;
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
  flex-grow: 1;
`;
const BorderBox = styled.View`
  border-radius: 15px;
  border-style: solid;
  border-width: 1px;
  border-color: ${BODER_COLOR};
  margin-bottom: ${RFValue(20)};
  padding-top: ${RFValue(7)};
  padding-bottom: ${RFValue(7)};
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
`;
const ProfileBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ProfileImage = styled.Image`
  height: ${RFValue(70)};
  width: ${RFValue(70)};
  border-radius: ${RFValue(38)};
`;
const ProfileTextBox = styled.View`
  padding-left: ${RFValue(10)};
  padding-right: ${RFValue(10)};
`;
const ProfileText = styled.Text`
  font-size: ${props => (props.nickname ? `${RFValue(14)}` : `${RFValue(13)}`)};
  font-weight: ${props => (props.nickname ? "bold" : 400)};
  color: ${props => (props.nickname ? "black" : `${LIGHT_GREY}`)};
`;
const Text = styled.Text`
  margin-top: ${props => (props.header ? `${RFValue(20)}` : "0px")};
  margin-bottom: ${RFValue(20)};
  font-size: ${props => (props.header ? `${RFValue(18)}` : `${RFValue(16)}`)};
  font-weight: ${props => (props.header ? "bold" : 300)};
`;
const Touch = styled.TouchableOpacity``;

// Profile 디자인
const ProfilePresenter = () => (
  <Container>
    <BorderBox>
      <ProfileBox>
        <ProfileImage
          resizeMode="contain"
          source={require("../../assets/images/noProfile.png")}
        />
        <ProfileTextBox>
          <ProfileText nickname={true}>tu학식이</ProfileText>
          <ProfileText nickname={false}>admin</ProfileText>
          <ProfileText nickname={false}>14110088</ProfileText>
        </ProfileTextBox>
      </ProfileBox>
    </BorderBox>
    <BorderBox>
      <Text header={true}>계정</Text>
      <Touch>
        <Text header={false}>내가 쓴 글</Text>
      </Touch>
      <Touch>
        <Text header={false}>프로필 변경</Text>
      </Touch>
      <Touch>
        <Text header={false}>닉네임 변경</Text>
      </Touch>
      <Touch>
        <Text header={false}>로그아웃</Text>
      </Touch>
    </BorderBox>
    <BorderBox>
      <Text header={true}>앱 정보</Text>
      <Touch>
        <Text header={false}>앱 버전</Text>
      </Touch>
      <Touch>
        <Text header={false}>문의하기</Text>
      </Touch>
      <Touch>
        <Text header={false}>공지사항</Text>
      </Touch>
      <Touch>
        <Text header={false}>개인정보 처리 방침</Text>
      </Touch>
    </BorderBox>
  </Container>
);

export default ProfilePresenter;
