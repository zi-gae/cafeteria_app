import React from "react";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";
import { BODER_COLOR, LIGHT_GREY, LIGTH_GREEN } from "../../constants/Color";

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

const NicknameBox = styled.View`
  width: ${Layout.width / 2};
  height: ${Layout.width / 13};
  margin-bottom: ${RFValue(10)};
  flex-direction: row;
`;

const NicknameInput = styled.TextInput`
  background-color: ${BODER_COLOR};
  border-radius: 5px;
  width: ${Layout.width / 2};
`;
const Button = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: ${Layout.width / 13};
  border-radius: 5px;
  background-color: ${LIGTH_GREEN};
`;
const ButtonBox = styled.View`
  justify-content: center;
  padding-left: ${RFValue(10)};
  padding-right: ${RFValue(10)};
  border-radius: 5px;
`;
const ButtonText = styled.Text`
  font-size: ${RFValue(10)};
  color: white;
`;
// Profile 디자인
const ProfilePresenter = ({
  changeProfile,
  handleNicknameInput,
  openNicknameInput,
  changeNickname,
  nickname,
  submitLogout,
  user
}) => (
  <Container showsVerticalScrollIndicator={false}>
    <BorderBox>
      <ProfileBox>
        <ProfileImage
          resizeMode="contain"
          source={require("../../assets/images/noProfile.png")}
        />
        <ProfileTextBox>
          <ProfileText nickname={true}>{user.profile.name}</ProfileText>
          <ProfileText nickname={false}>{user.profile.username}</ProfileText>
          <ProfileText nickname={false}>{user.profile.stdntnum}</ProfileText>
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
      <Touch onPress={handleNicknameInput}>
        {openNicknameInput ? (
          <NicknameBox>
            <NicknameInput
              returnKeyType="done"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              autoFocus={true}
              value={nickname}
              onChangeText={changeNickname}
              onSubmitEditing={changeProfile}
            />
            <Button onPress={changeProfile}>
              <ButtonBox>
                <ButtonText>변경</ButtonText>
              </ButtonBox>
            </Button>
          </NicknameBox>
        ) : (
          <Text header={false}>닉네임 변경</Text>
        )}
      </Touch>
      <Touch onPress={submitLogout}>
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
