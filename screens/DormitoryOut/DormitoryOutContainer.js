import React, { Component } from "react";
import DormitoryOutPresenter from "./DormitoryOutPresenter";
import PropTypes from "prop-types";
import { Alert } from "react-native";

class DormitoryOutContainer extends Component {
  constructor() {
    super();
    this.state = {
      collegeStudentId: "15110074",
      collegeStudentPwd: "my3265tutm",
      dormitoryOutStartDay: "",
      dormitoryOutEndDay: "",
      dormitoryOutReason: "귀가",
      isSubmitting: false,
      startDay: false,
      endDay: false,
      TextInputDisable: true,
      minDate: "",
      maxDate: ""
    };
  }

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
      startDay: false
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
      startDay: true
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
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const minDate = yyyy + "-" + mm + "-" + dd;
    const maxDate = yyyy + "-" + (mm * 1 + 1) + "-" + (dd * 1 + 1);
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
      dormitoryOutReason: "",
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
          dormitoryOutStartDay.substring(dormitoryOutStartDay.length - 2),
          dormitoryOutEndDay.substring(dormitoryOutEndDay.length - 2),
          dormitoryOutReason
        );
      } else {
        Alert.alert("알림💡", "모두 입력해주세요!", [
          { text: "OK", onPress: () => {} }
        ]);
      }
    }
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
      startDay,
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
      handleEndDay
    } = this;

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
        startDay={startDay}
        endDay={endDay}
        handleStartDay={handleStartDay}
        handleEndDay={handleEndDay}
        TextInputDisable={TextInputDisable}
      />
    );
  }
}

export default DormitoryOutContainer;
