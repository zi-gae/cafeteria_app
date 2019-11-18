import React, { Component } from "react";
import { Platform, Alert } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { RFValue } from "react-native-responsive-fontsize";
import WritePostPresenter from "./WritePostPresenter";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../NavButton";

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

class WritePostContainer extends Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    this.state = {
      anonymousIsChecked: params.anonymous,
      title: params.title ? params.title : "",
      content: params.content ? params.content : "",
      image: params.image
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: <Title>{navigation.state.params.writeType}</Title>,
    headerLeft: (
      <NavButton
        iconName="ios-close"
        color={LIGTH_GREEN}
        onPress={() => navigation.goBack(null)}
      />
    ),
    headerRight: (
      <Button
        onPress={() => {
          const {
            state: { params }
          } = navigation;
          if (
            params.title.trim().length < 2 &&
            params.content.trim().length < 2
          ) {
            Alert.alert("알림💡", "제목과 본문을 3글자 이상 입력 해주세요", [
              {
                text: "OK"
              }
            ]);
          } else if (params.title.trim().length < 2) {
            Alert.alert("알림💡", "제목을 3글자 이상 입력 해주세요", [
              {
                text: "OK"
              }
            ]);
          } else if (params.content.trim().length < 2) {
            Alert.alert("알림💡", "본문을 3글자 이상 입력 해주세요", [
              {
                text: "OK"
              }
            ]);
          } else {
            params.handleSuccessButton(
              params.title,
              params.content,
              params.image,
              params.anonymous
            );
            navigation.goBack(null);
          }
        }}
      >
        <ButtonBox>
          <ButtonText>완료</ButtonText>
        </ButtonBox>
      </Button>
    )
  });

  static propTypes = {
    dispatchPutPost: PropTypes.func.isRequired,
    sample: PropTypes.shape({
      anonymous: PropTypes.bool.isRequired,
      comment_count: PropTypes.number.isRequired,
      comments: PropTypes.array.isRequired,
      content: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile_image: PropTypes.string.isRequired,
        stdntnum: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired
      }),
      file: PropTypes.string,
      id: PropTypes.number.isRequired,
      is_liked: PropTypes.bool.isRequired,
      kinds: PropTypes.string.isRequired,
      like_count: PropTypes.number.isRequired,
      natural_time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired
    })
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      this.props.navigation.setParams({
        image: result.uri
      });
      this.setState({ image: result.uri });
    }
  };

  handleCheckBox = () => {
    const { anonymousIsChecked } = this.state;
    const { navigation } = this.props;
    if (anonymousIsChecked) {
      navigation.setParams({
        anonymous: false
      });
      this.setState({
        anonymousIsChecked: false
      });
    } else {
      navigation.setParams({
        anonymous: true
      });
      this.setState({
        anonymousIsChecked: true
      });
    }
  };

  onChangeTitle = text => {
    this.props.navigation.setParams({
      title: text
    });
    this.setState({
      title: text
    });
  };

  onChangeContent = text => {
    this.props.navigation.setParams({
      content: text
    });
    this.setState({
      content: text
    });
  };

  render() {
    const { handleCheckBox, onChangeTitle, onChangeContent, pickImage } = this;
    const { anonymousIsChecked, title, content, image } = this.state;
    return (
      <WritePostPresenter
        title={title}
        content={content}
        anonymousIsChecked={anonymousIsChecked}
        image={image}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        handleCheckBox={handleCheckBox}
        pickImage={pickImage}
      />
    );
  }
}

export default WritePostContainer;
