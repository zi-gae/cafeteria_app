import React, { Component } from "react";
import DormitoryOutPresenter from "./DormitoryOutPresenter";
import { Alert } from "react-native";
import PropTypes from "prop-types";

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

  changeDormitoryOutStartDay = text => {
    this.setState({
      dormitoryOutStartDay: text
    });
  };

  changeDormitoryOutEndDay = text => {
    this.setState({
      dormitoryOutEndDay: text
    });
  };

  changeDormitoryOutReason = text => {
    this.setState({
      dormitoryOutReason: text
    });
  };

  handleErrorAlert = logedMsg => {
    this.setState({
      isSubmitting: false
    });
    if (logedMsg === "pwdwrong") {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    } else if (logedMsg === "idlock") {
      alert("비밀번호 5회로 계정이 잠겼습니다.");
    } else if (logedMsg === "overlap") {
      alert("이미 신청 되어 있습니다.");
    } else if (logedMsg === "notaccess") {
      alert("기숙사생이 아닙니다.");
    } else if (logedMsg === "success") {
      alert("신청 되었습니다.");
      this.props.history.push("/");
    }
  };
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
  handleSubmit = async () => {
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
        let result;
        this.setState(
          {
            isSubmitting: true
          },
          async () => {
            result = await dormitoryOut(
              collegeStudentId,
              collegeStudentPwd,
              dormitoryOutStartDay.substring(dormitoryOutStartDay.length - 2),
              dormitoryOutEndDay.substring(dormitoryOutEndDay.length - 2),
              dormitoryOutReason
            );
          }
        );
        console.log(result);
        this.handleErrorAlert(result);
      } else {
        Alert.alert("모두 입력 해주세요!");
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
      maxDate
    } = this.state;

    const {
      changeCollegeStudentId,
      changeCollegeStudentPwd,
      changeDormitoryOutStartDay,
      changeDormitoryOutEndDay,
      changeDormitoryOutReason,
      handleSubmit
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
      />
    );
  }
}

export default DormitoryOutContainer;
