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
import DatePicker from "react-native-datepicker";

const Container = styled.ScrollView`
  margin-top: ${RFValue(20)};
`;
const Header = styled.View`
  align-items: center;
  justify-content: flex-end;
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
const ActivityIndicator = styled.ActivityIndicator``;
const DateBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(1)};
  margin-bottom: ${RFValue(7)};
  margin-right: ${RFValue(30)};
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
  maxDate
}) => (
  <Container keyboardShouldPersistTaps="handled">
    <StatusBar barStyle={"light-content"} />
    <Header>
      <Logo source={require("../../assets/images/logo.png")} />
    </Header>
    <Content>
      <TextInput
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
      <DateBox>
        <DatePicker
          ref={dormitoryOutStartDayRef =>
            (this.dormitoryOutStartDayRef = dormitoryOutStartDayRef)
          }
          locale={"ko"}
          style={{ width: RFValue(148), marginRight: RFValue(10) }}
          date={dormitoryOutStartDay}
          mode="date"
          placeholder="외박 시작일"
          format="YYYY-MM-DD"
          minDate={minDate}
          maxDate={maxDate}
          confirmBtnText="확인"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: RFValue(35),
              height: RFValue(35),
              borderRadius: 3,
              borderColor: LIGHT_GREY,
              borderWidth: 0.5
            }
          }}
          onDateChange={changeDormitoryOutStartDay}
        />
        <DatePicker
          ref={dormitoryOutEndDayRef =>
            (this.dormitoryOutEndDayRef = dormitoryOutEndDayRef)
          }
          locale={"ko"}
          style={{ width: RFValue(113) }}
          date={dormitoryOutEndDay}
          mode="date"
          placeholder="긱사 복귀일"
          format="YYYY-MM-DD"
          minDate={minDate}
          maxDate={maxDate}
          confirmBtnText="확인"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              right: 0,
              top: 4,
              marginLeft: 0,
              opacity: 0
            },
            dateInput: {
              height: RFValue(35),
              borderRadius: 3,
              borderColor: LIGHT_GREY,
              borderWidth: 0.5
            }
          }}
          onDateChange={changeDormitoryOutEndDay}
        />
      </DateBox>
      <TextInput
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
  </Container>
);

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
  maxDate: PropTypes.string.isRequired
};

export default DormitoryOutPresenter;
