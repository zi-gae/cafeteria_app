import React, { Component } from "react";
import DormitoryOutPresenter from "./DormitoryOutPresenter";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LIGTH_GREEN } from "../../constants/Color";
import styled from "styled-components";

const Image = styled.Image`
  height: ${RFValue(58)};
  width: ${RFValue(58)};
`;

class DormitoryOutContainer extends Component {
  constructor() {
    super();
    this.state = {
      collegeStudentId: "",
      collegeStudentPwd: "",
      dormitoryOutStartDay: "",
      dormitoryOutEndDay: "",
      dormitoryOutReason: "귀가",
      isSubmitting: false,
      isChoicedStartDay: false,
      endDay: false,
      TextInputDisable: true,
      minDate: "",
      maxDate: ""
    };
  }
  static navigationOptions = props => ({
    headerTitle: "외박신청",
    headerLeft: (
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode={"contain"}
      />
    ),
    headerTitleStyle: {
      fontSize: RFValue(18),
      color: LIGTH_GREEN
    }
  });
  static propTypes = {
    dormitoryOut: PropTypes.func.isRequired,
    dormitoryOutState: PropTypes.string,
    location: PropTypes.object
  };

  changeCollegeStudentId = text => {
    this.setState({
      collegeStudentId: text
    });
  };

  changeCollegeStudentPwd = text => {
    this.setState({
      collegeStudentPwd: text
    });
  };

  changeDormitoryOutStartDay = date => {
    const { dateString } = date;
    this.setState({
      dormitoryOutStartDay: dateString,
      isChoicedStartDay: false
    });
  };

  changeDormitoryOutEndDay = date => {
    const { dateString } = date;
    this.setState({
      dormitoryOutEndDay: dateString,
      endDay: false
    });
  };

  changeDormitoryOutReason = text => {
    this.setState({
      dormitoryOutReason: text
    });
  };

  chageSelectDay = day => {
    this.setState({
      selectedDate: day.dateString
    });
  };

  handleStartDay = () => {
    this.setState({
      isChoicedStartDay: true
    });
  };

  handleEndDay = () => {
    if (this.state.dormitoryOutStartDay.length > 1) {
      this.setState({
        endDay: true
      });
    } else {
      alert("외박 시작일을 선택 해주세요");
    }
  };

  componentWillReceiveProps(nextProps) {
    this.handleErrorAlert(nextProps.dormitoryOutState);
  }

  componentDidMount() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const minDate = yyyy + "-" + mm + "-" + dd;
    const maxDate =
      yyyy +
      "-" +
      String(mm * 1 + 1 > 12 ? (mm * 1 + 1) % 12 : mm * 1 + 1).padStart(2, 0) +
      "-" +
      String(dd * 1 + 1).padStart(2, 0);

    this.setState({
      minDate,
      maxDate
    });
  }

  resetState = () => {
    this.setState({
      isSubmitting: false,
      collegeStudentId: "",
      collegeStudentPwd: "",
      dormitoryOutStartDay: "",
      dormitoryOutEndDay: "",
      dormitoryOutReason: "귀가",
      TextInputDisable: true
    });
  };

  handleErrorAlert = logedMsg => {
    if (logedMsg === "pwdwrong") {
      Alert.alert("알림💡", "아이디 또는 비밀번호가 틀려요!", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    } else if (logedMsg === "idlock") {
      alert("비밀번호 5회를 틀려 계정이 잠겼어요!");
      Alert.alert("알림💡", "비밀번호 5회 오류로 계정이 잠겼어요!", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    } else if (logedMsg === "overlap") {
      Alert.alert("알림💡", "이미 신청 되어 있어요!", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    } else if (logedMsg === "notaccess") {
      Alert.alert("알림💡", "기숙사생이 아닌것만 같은데...", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    } else if (logedMsg === "applyOver") {
      Alert.alert("알림💡", "월 4회 이상 신청 불가능해요ㅠ", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    } else if (logedMsg === "error") {
      Alert.alert("알림💡", "신청 중 에러가 발생 했어요. 다시 시도해주세요ㅠ", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    } else if (logedMsg === "success") {
      Alert.alert("알림💡", "외박신청 완료!", [
        { text: "OK", onPress: () => {} }
      ]);
      this.resetState();
    }
  };

  handleSubmit = () => {
    const {
      collegeStudentId,
      collegeStudentPwd,
      dormitoryOutStartDay,
      dormitoryOutEndDay,
      dormitoryOutReason
    } = this.state;
    const { isSubmitting } = this.state;
    const { dormitoryOut } = this.props;

    if (!isSubmitting) {
      if (
        collegeStudentId &&
        collegeStudentPwd &&
        dormitoryOutStartDay &&
        dormitoryOutEndDay &&
        dormitoryOutReason
      ) {
        this.setState({
          isSubmitting: true,
          TextInputDisable: false
        });
        dormitoryOut(
          collegeStudentId,
          collegeStudentPwd,
          dormitoryOutStartDay,
          dormitoryOutEndDay,
          dormitoryOutReason
        );
      } else {
        Alert.alert("알림💡", "모두 입력해주세요!", [
          { text: "OK", onPress: () => {} }
        ]);
      }
    }
  };

  alertAccessAuthentication = () => {
    const { navigation } = this.props;
    Alert.alert("알림💡", "재학생 인증 후에 시도 해주세오", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Profile");
        }
      }
    ]);
  };

  render() {
    const {
      collegeStudentId,
      collegeStudentPwd,
      dormitoryOutStartDay,
      dormitoryOutEndDay,
      dormitoryOutReason,
      isSubmitting,
      minDate,
      maxDate,
      isChoicedStartDay,
      endDay,
      TextInputDisable
    } = this.state;

    const {
      changeCollegeStudentId,
      changeCollegeStudentPwd,
      changeDormitoryOutStartDay,
      changeDormitoryOutEndDay,
      changeDormitoryOutReason,
      handleSubmit,
      handleStartDay,
      handleEndDay,
      alertAccessAuthentication
    } = this;

    const {
      user: {
        profile: { univAuthentication }
      }
    } = this.props;

    return (
      <DormitoryOutPresenter
        changeCollegeStudentId={changeCollegeStudentId}
        changeCollegeStudentPwd={changeCollegeStudentPwd}
        changeDormitoryOutStartDay={changeDormitoryOutStartDay}
        changeDormitoryOutEndDay={changeDormitoryOutEndDay}
        changeDormitoryOutReason={changeDormitoryOutReason}
        collegeStudentId={collegeStudentId}
        collegeStudentPwd={collegeStudentPwd}
        dormitoryOutStartDay={dormitoryOutStartDay}
        dormitoryOutEndDay={dormitoryOutEndDay}
        dormitoryOutReason={dormitoryOutReason}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        minDate={minDate}
        maxDate={maxDate}
        isChoicedStartDay={isChoicedStartDay}
        endDay={endDay}
        handleStartDay={handleStartDay}
        handleEndDay={handleEndDay}
        TextInputDisable={TextInputDisable}
        alertAccessAuthentication={alertAccessAuthentication}
        alertAccessAuthentication={alertAccessAuthentication}
        univAuthentication={univAuthentication}
      />
    );
  }
}

export default DormitoryOutContainer;
