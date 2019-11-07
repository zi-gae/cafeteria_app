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
    const { edges } = await CameraRoll.getPhotos({
      first: 2000,
      groupTypes: "All",
      assetType: "Photos"
    });

    this.setState({
      photos: edges,
      pickedPhoto: edges[0]
    });
  };

  render() {
    const { photos, pickedPhoto } = this.state;
    return <LibraryPresenter photos={photos} pickedPhoto={pickedPhoto} />;
  }
}

export default LibraryContainer;
