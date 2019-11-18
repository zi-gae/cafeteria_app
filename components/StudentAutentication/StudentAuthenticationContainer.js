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

  handleNaviate = () => {
    const { handleChoicePhoto } = this;
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Library", {
      handleChoicePhoto
    });
  };

  handleChoicePhoto = pickedPhoto => {
    // 학번 인증 리듀서 구현 해야함
    // console.log(user.profile.univ_authentication); 으로 인증

    this.setState({
      uploadStudentNumberPhoto: true
    });
  };

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
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
