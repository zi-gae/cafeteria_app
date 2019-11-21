import React, { Component } from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import { Platform } from "@unimodules/core";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import StudentAuthenticationPresenter from "./StudentAuthenticationPresenter";

class StudentAuthenticationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentNumber: "",
      uploadStudentNumberPhoto: false,
      image: "",
      editAvailability: true
    };
  }

  static propTypes = {
    dispatchAuthentication: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    this.getPermissionAsync();
  };

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("사진 권한을 허용 해주세요!");
      }
    }
  };

  handleAuthenticationSubmit = async () => {
    const { dispatchAuthentication, navigation } = this.props;
    const { studentNumber, image } = this.state;
    const { checkStudentNumber } = this;

    if (checkStudentNumber(studentNumber)) {
      this.setState({
        uploadStudentNumberPhoto: true,
        editAvailability: true
      });
      const result = await dispatchAuthentication(studentNumber, image);
      if (result) {
        this.setState({
          uploadStudentNumberPhoto: false,
          studentNumber: "",
          image: "",
          editAvailability: false
        });
        Alert.alert(
          "알림💡",
          "인증 요청 완료하였습니다. 최대 2~3일까지 걸릴 수 있어요ㅠ",
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        this.setState({
          uploadStudentNumberPhoto: false,
          editAvailability: false
        });
        Alert.alert("알림💡", "서버에 문제가 발생했어요. 다시 시도해주세요", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack(null);
            }
          }
        ]);
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  checkStudentNumber = studentNumber => {
    if (!/^[0-9]{8}$/.test(studentNumber)) {
      Alert.alert("알림💡", "학번 8자리와 숫자만 입력 가능합니다", [
        {
          text: "OK",
          onPress: () => {
            this.setState({
              studentNumber: ""
            });
          }
        }
      ]);
      return false;
    }
    return true;
  };

  onChangeStudentNumber = text => {
    this.setState({
      studentNumber: text
    });
  };

  render() {
    const {
      pickImage,
      handleAuthenticationSubmit,
      onChangeStudentNumber
    } = this;
    const {
      image,
      uploadStudentNumberPhoto,
      studentNumber,
      editAvailability
    } = this.state;
    return (
      <StudentAuthenticationPresenter
        handleAuthenticationSubmit={handleAuthenticationSubmit}
        pickImage={pickImage}
        image={image}
        uploadStudentNumberPhoto={uploadStudentNumberPhoto}
        studentNumber={studentNumber}
        onChangeStudentNumber={onChangeStudentNumber}
        editAvailability={editAvailability}
      />
    );
  }
}

export default StudentAuthenticationContainer;
