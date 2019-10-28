import React from "react";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { BODER_COLOR, LIGTH_GREEN } from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import Layout from "../../constants/Layout";

const Container = styled.View`
  flex: 1;
  padding-left: ${Layout.width / 20};
  padding-right: ${Layout.width / 20};
`;
const ScrollView = styled.ScrollView``;

const TitleInput = styled.TextInput`
  font-size: ${RFValue(20)};
  margin-top: ${RFValue(10)};
  margin-bottom: ${RFValue(10)};
  padding-bottom: ${RFValue(10)};
  border-bottom-width: 1px;
  border-bottom-color: ${BODER_COLOR};
  font-weight: bold;
`;
const ContentInput = styled.TextInput`
  font-size: ${RFValue(15)};
  font-weight: 500;
`;

const ButtonLabel = styled.View`
  height: ${RFValue(40)};
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;
const AnonymousBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Anonymous = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(13)};
  color: ${LIGTH_GREEN};
`;
const Touch = styled.TouchableOpacity``;

const WritePostPresenter = ({ isChecked, handleCheckBox }) => {
  return (
    <Container>
      <ScrollView>
        <TitleInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          placeholder="제목"
        />
        <ContentInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          numberOfLines={10}
          placeholder="제목"
          placeholder="이곳에 글을 작성해 주세요"
          multiline={true}
        />
      </ScrollView>
      <KeyboardAccessoryView alwaysVisible={true}>
        <ButtonLabel>
          <Touch>
            <Ionicons name="ios-camera" size={30} color={LIGTH_GREEN} />
          </Touch>
          <AnonymousBox>
            <CheckBox
              isChecked={isChecked}
              onClick={handleCheckBox}
              checkBoxColor={LIGTH_GREEN}
            />
            <Anonymous>익명</Anonymous>
          </AnonymousBox>
        </ButtonLabel>
      </KeyboardAccessoryView>
    </Container>
  );
};

export default WritePostPresenter;