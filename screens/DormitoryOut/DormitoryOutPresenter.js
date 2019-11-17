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
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardAware = styled(KeyboardAwareScrollView)``;
const Container = styled.View`
  margin-top: ${RFValue(20)};
  flex: 1;
`;
const Header = styled.View`
  align-items: center;
`;
const HeaderText = styled.Text`
  color: ${LIGHT_GREY};
  margin-bottom: ${RFValue(5)};
  font-weight: 500;
`;
const LogoText = styled.Text`
  font-size: ${RFValue(20)};
  color: ${LIGTH_GREEN};
  font-weight: bold;
  margin-bottom: ${RFValue(25)};
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
  height: ${RFValue(35)};
  border-color: ${BODER_COLOR};
  border-width: 1;
  width: ${Layout.width / 1.6};
  border-radius: 5px;
  margin-bottom: ${RFValue(7)};
  padding-left: ${RFValue(12)};
  padding-right: ${RFValue(12)};
  font-size: ${RFValue(12)};
`;
const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${LIGTH_GREEN};
  width: ${Layout.width / 1.6};
  height: ${RFValue(28)};
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
const ActivityIndicator = styled.ActivityIndicator``;
const DateChoice = styled.TouchableOpacity`
  height: ${RFValue(33)};
  width: ${Layout.width / 1.6};
  justify-content: center;
  padding-left: ${RFValue(10)};
  border-style: solid;
  border-width: 1px;
  border-color: ${BODER_COLOR};
  border-radius: 3px;
  margin-bottom: 5px;
`;
const DateText = styled.Text`
  color: ${props => (props.date ? "black" : `${LIGHT_GREY}`)};
  font-size: ${RFValue(12)};
`;

const DormitoryOutPresenter = ({
  changeCollegeStudentId,
  changeCollegeStudentPwd,
  changeDormitoryOutStartDay,
  changeDormitoryOutEndDay,
  changeDormitoryOutReason,
  collegeStudentId,
  collegeStudentPwd,
  dormitoryOutStartDay,
  dormitoryOutEndDay,
  dormitoryOutReason,
  handleSubmit,
  isSubmitting,
  minDate,
  maxDate,
  isChoicedStartDay,
  endDay,
  handleStartDay,
  handleEndDay,
  TextInputDisable
}) => {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <KeyboardAware
        enableOnAndroid={true}
        extraHeight={100}
        extraScrollHeight={100}
      >
        <Header>
          <Logo source={require("../../assets/images/logo.png")} />
          <HeaderText>외박 신청을 더 편하고 빠르게</HeaderText>
          <HeaderText>기숙사생 취향저격</HeaderText>
          <LogoText>동명대학식이</LogoText>
        </Header>

        <Content>
          <TextInput
            editable={TextInputDisable}
            placeholder="학번"
            keyboardType="number-pad"
            autoCompleteType="username"
            autoCorrect={false}
            returnKeyType="next"
            value={collegeStudentId}
            onChangeText={changeCollegeStudentId}
            onSubmitEditing={() => this.passwordRefOne.focus()}
          />

          <TextInput
            editable={TextInputDisable}
            ref={passwordRefOne => (this.passwordRefOne = passwordRefOne)}
            placeholder="비밀번호"
            secureTextEntry={true}
            autoCompleteType="password"
            autoCorrect={false}
            returnKeyType="next"
            value={collegeStudentPwd}
            onChangeText={changeCollegeStudentPwd}
            onSubmitEditing={() => this.dormitoryOutStartDayRef.onPressDate()}
          />

          {isChoicedStartDay ? (
            <Calendar
              onDayPress={day => {
                changeDormitoryOutStartDay(day);
              }}
              minDate={minDate}
              maxDate={maxDate}
              markedDates={{
                [dormitoryOutStartDay]: {
                  selected: true,
                  selectedColor: "blue"
                }
              }}
            />
          ) : (
            <DateChoice onPress={TextInputDisable ? handleStartDay : null}>
              {dormitoryOutStartDay ? (
                <DateText date={true}>{dormitoryOutStartDay}</DateText>
              ) : (
                <DateText date={false}>외박 시작일</DateText>
              )}
            </DateChoice>
          )}

          {endDay ? (
            <Calendar
              onDayPress={day => {
                changeDormitoryOutEndDay(day);
              }}
              current={dormitoryOutStartDay}
              minDate={dormitoryOutStartDay}
              maxDate={maxDate}
              markedDates={{
                [dormitoryOutEndDay]: {
                  selected: true,
                  selectedColor: "blue"
                }
              }}
            />
          ) : (
            <DateChoice onPress={TextInputDisable ? handleEndDay : null}>
              {dormitoryOutEndDay ? (
                <DateText date={true}>{dormitoryOutEndDay}</DateText>
              ) : (
                <DateText date={false}>기숙사 복귀일</DateText>
              )}
            </DateChoice>
          )}

          <TextInput
            editable={TextInputDisable}
            ref={dormitoryOutReasonRef =>
              (this.dormitoryOutReasonRef = dormitoryOutReasonRef)
            }
            placeholder="외박 사유"
            keyboardType="default"
            returnKeyType="done"
            value={dormitoryOutReason}
            autoCorrect={false}
            onChangeText={changeDormitoryOutReason}
            onSubmitEditing={handleSubmit}
          />
          <Button onPress={handleSubmit}>
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <BtnContainer>
                <BtnText>외박신청</BtnText>
              </BtnContainer>
            )}
          </Button>
        </Content>
      </KeyboardAware>
    </Container>
  );
};

DormitoryOutPresenter.propTypes = {
  changeCollegeStudentId: PropTypes.func.isRequired,
  changeCollegeStudentPwd: PropTypes.func.isRequired,
  changeDormitoryOutStartDay: PropTypes.func.isRequired,
  changeDormitoryOutEndDay: PropTypes.func.isRequired,
  changeDormitoryOutReason: PropTypes.func.isRequired,
  collegeStudentId: PropTypes.string.isRequired,
  collegeStudentPwd: PropTypes.string.isRequired,
  dormitoryOutStartDay: PropTypes.string.isRequired,
  dormitoryOutEndDay: PropTypes.string.isRequired,
  dormitoryOutReason: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  isChoicedStartDay: PropTypes.bool.isRequired,
  endDay: PropTypes.bool.isRequired,
  handleStartDay: PropTypes.func.isRequired,
  handleEndDay: PropTypes.func.isRequired,
  TextInputDisable: PropTypes.bool.isRequired
};

export default DormitoryOutPresenter;
