import React from "react";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { BODER_COLOR, LIGTH_GREEN } from "../../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import Layout from "../../constants/Layout";
import SafeAreaBottom from "../SafeAreaBottom";

const Container = styled.View`
  flex: 1;
  padding-left: ${Layout.width / 20};
  padding-right: ${Layout.width / 20};
`;
const ScrollView = styled.ScrollView``;
const ContentImg = styled.Image`
  height: ${Layout.height / 3};
  width: 100%;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TitleInput = styled.TextInput`
  font-size: ${RFValue(18)};
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

const WritePostPresenter = ({
  anonymousIsChecked,
  handleCheckBox,
  title,
  content,
  file,
  changeTitle,
  changeContent,
  handleNavigate,
  photo
}) => {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          placeholder="제목"
          value={title}
          onChangeText={changeTitle}
        />
        <ContentInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          numberOfLines={10}
          placeholder="제목"
          placeholder="이곳에 글을 작성해 주세요"
          multiline={true}
          value={content}
          onChangeText={changeContent}
        />
      </ScrollView>
      {file ? <ContentImg resizeMode="contain" source={{ uri: file }} /> : null}
      <KeyboardAccessoryView
        hideBorder={true}
        alwaysVisible={true}
        style={{
          backgroundColor: "white"
        }}
      >
        <ButtonLabel>
          <Touch onPress={handleNavigate}>
            <Ionicons name="ios-camera" size={30} color={LIGTH_GREEN} />
          </Touch>
          <AnonymousBox>
            <CheckBox
              isChecked={anonymousIsChecked}
              onClick={handleCheckBox}
              checkBoxColor={LIGTH_GREEN}
            />
            <Anonymous>익명</Anonymous>
          </AnonymousBox>
        </ButtonLabel>
      </KeyboardAccessoryView>
      <SafeAreaBottom keyboardView={true} />
    </Container>
  );
};

export default WritePostPresenter;
