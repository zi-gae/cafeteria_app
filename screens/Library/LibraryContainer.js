import React, { PureComponent } from "react";
import LibraryPresenter from "./LibraryPresenter";
import { CameraRoll, Platform } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { LIGTH_GREEN } from "../../constants/Color";
import * as Permissions from "expo-permissions";

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-right: ${RFValue(15)};
`;
const ButtonBox = styled.View`
  background-color: ${LIGTH_GREEN};
  justify-content: center;
  align-items: center;
  width: ${RFValue(60)};
  height: ${RFValue(25)};
  border-radius: ${RFValue(15)};
`;
const ButtonText = styled.Text`
  font-size: ${RFValue(12)};
  color: white;
  font-weight: 600;
`;

class LibraryContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      pickedPhoto: null,
      hasCameraPermission: false
    };
    this.permissionCheck();
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Title>최근 사진</Title>,
    headerRight: (
      <Button
        onPress={() => {
          navigation.state.params.handleChoicePhoto(
            navigation.state.params.pickedPhoto
          );
          navigation.goBack(null);
        }}
      >
        <ButtonBox>
          <ButtonText>선택</ButtonText>
        </ButtonBox>
      </Button>
    )
  });

  componentWillMount = async () => {
    const { navigation } = this.props;
    const photoOptions = {
      first: 2000,
      groupTypes: "All",
      assetType: "Photos"
    };
    if (Platform.OS === "android") {
      delete photoOptions.groupTypes;
    }
    const { edges } = await CameraRoll.getPhotos(photoOptions);

    navigation.setParams({
      pickedPhoto: edges[0]
    });
    this.setState({
      photos: edges,
      pickedPhoto: edges[0]
    });
  };

  permissionCheck = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  pickPhoto = photo => {
    const { navigation } = this.props;
    navigation.setParams({
      pickedPhoto: photo
    });

    this.setState({
      pickedPhoto: photo
    });
  };

  render() {
    const { photos, pickedPhoto } = this.state;
    const { pickPhoto, approvePhoto } = this;
    return (
      <LibraryPresenter
        photos={photos}
        pickedPhoto={pickedPhoto}
        pickPhoto={pickPhoto}
        approvePhoto={approvePhoto}
      />
    );
  }
}

export default LibraryContainer;
