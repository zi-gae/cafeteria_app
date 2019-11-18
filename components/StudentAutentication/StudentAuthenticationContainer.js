import React, { Component } from "react";
import StudentAuthenticationPresenter from "./StudentAuthenticationPresenter";
import { Platform } from "@unimodules/core";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

class StudentAuthenticationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStudentNumberPhoto: false,
      photoUrl: ""
    };
  }

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

  handleNaviate = () => {
    const { handleChoicePhoto } = this;
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Library", {
      handleChoicePhoto
    });
  };

  handleChoicePhoto = () => {
    this.setState({
      uploadStudentNumberPhoto: true
    });
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

  render() {
    const { handleNaviate, pickImage } = this;
    const { uploadStudentNumberPhoto, image } = this.state;
    return (
      <StudentAuthenticationPresenter
        handleNaviate={handleNaviate}
        uploadStudentNumberPhoto={uploadStudentNumberPhoto}
        pickImage={pickImage}
        image={image}
      />
    );
  }
}

export default StudentAuthenticationContainer;
