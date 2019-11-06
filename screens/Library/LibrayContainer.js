import React, { PureComponent } from "react";
import LibraryPresenter from "./LibraryPresenter";
import { CameraRoll } from "react-native";

class LibraryContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      pickedPhoto: null
    };
  }
  componentWillMount = async () => {
    const cameraPhotos = await CameraRoll.getPhotos({
      first: 2000,
      groupTypes: "SavedPhotos",
      assetType: "Photos"
    });
    console.log(cameraPhotos);
  };

  render() {
    return <LibraryPresenter />;
  }
}

export default LibraryContainer;
