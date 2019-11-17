import React, { Component } from "react";
import StudentAuthenticationPresenter from "./StudentAuthenticationPresenter";

class StudentAuthenticationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStudentNumberPhoto: false
    };
  }

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
    this.setState({
      uploadStudentNumberPhoto: true
    });
  };

  render() {
    const { handleNaviate } = this;
    const { uploadStudentNumberPhoto } = this.state;
    return (
      <StudentAuthenticationPresenter
        handleNaviate={handleNaviate}
        uploadStudentNumberPhoto={uploadStudentNumberPhoto}
      />
    );
  }
}

export default StudentAuthenticationContainer;
