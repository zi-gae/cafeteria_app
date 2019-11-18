import React from "react";
import styled from "styled-components";
import { BODER_COLOR, LIGTH_GREEN, DARK_GREEN } from "../../constants/Color";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.View`
  flex: 1;
`;
const StudentNumberInput = styled.TextInput`
  height: ${RFValue(30)};
  border-color: ${BODER_COLOR};
  border-width: 1;
  width: ${Layout.width / 1.6};
  border-radius: ${RFValue(5)};
  margin-bottom: ${RFValue(5)};
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
  text-align: center;
`;
const Manual = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ManualText = styled.Text`
  margin-bottom: ${RFValue(20)};
  font-size: ${RFValue(15)};
  font-weight: 500;
  color: #4a4949;
`;
const NicknameBox = styled.View`
  width: ${Layout.width / 1.6};
  height: ${Layout.width / 13};
  margin-bottom: ${RFValue(10)};
  flex-direction: row;
`;

const NicknameInput = styled.TextInput`
  border-radius: 5px;
  border-color: ${BODER_COLOR};
  border-width: 1;
  width: ${Layout.width / 1.6};
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
  text-align: center;
  font-weight: bold;
  color: ${DARK_GREEN};
`;
const Button = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: ${Layout.width / 13};
  border-radius: 5px;
  background-color: ${DARK_GREEN};
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
const Touch = styled.TouchableOpacity``;
const PushButton = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding-top: ${RFValue(5)};
  padding-bottom: ${RFValue(5)};
  background-color: ${LIGTH_GREEN};
`;
const PushText = styled.Text`
  font-weight: bold;
  color: white;
`;

const StudentAuthenticationPresenter = ({ pickImage, image }) => (
  <Container>
    <Manual>
      <ManualText>인증 소요기간 최대 3일</ManualText>
      <ManualText>학생증 및 모바일 학생증 첨부</ManualText>
      <ManualText>⭐️사진의 학번과 입력한 학번이 동일⭐️</ManualText>
    </Manual>
    <InputBox>
      <StudentNumberInput placeholder="학번" />
      <NicknameBox>
        <NicknameInput editable={false}>
          {image ? "첨부완료" : ""}
        </NicknameInput>
        <Button onPress={pickImage}>
          <ButtonBox>
            <ButtonText>첨부하기</ButtonText>
          </ButtonBox>
        </Button>
      </NicknameBox>

      <PushButton>
        <Touch>
          <PushText>인 증</PushText>
        </Touch>
      </PushButton>
    </InputBox>
  </Container>
);

export default StudentAuthenticationPresenter;
