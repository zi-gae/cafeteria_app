import React, { Component } from "react";
import WritePostPresenter from "./WritePostPresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../NavButton";
import { RFValue } from "react-native-responsive-fontsize";
import PropTypes from "prop-types";

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
      anonymousIsChecked: true,
      title: params.title,
      content: params.content,
      file: params.file
    };
  }
  static propTypes = {
    dispatchPutPost: PropTypes.func.isRequired
  };
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
          navigation.state.params.handleSuccessButton();
        }}
      >
        <ButtonBox>
          <ButtonText>완료</ButtonText>
        </ButtonBox>
      </Button>
    )
  });

  componentDidMount() {
    const { title, content, file, anonymousIsChecked } = this.state;
    this.props.navigation.setParams({
      title,
      content,
      file,
      anonymousIsChecked
    });
  }

  handleCheckBox = () => {
    const { anonymousIsChecked } = this.state;
    anonymousIsChecked
      ? this.setState({
          anonymousIsChecked: false
        })
      : this.setState({
          anonymousIsChecked: true
        });
  };

  changeTitle = text => {
    this.setState({
      title: text
    });
  };
  changeContent = text => {
    this.setState({
      content: text
    });
  };

  render() {
    const { handleCheckBox, changeTitle, changeContent } = this;
    const { anonymousIsChecked, title, content, file } = this.state;
    return (
      <WritePostPresenter
        handleCheckBox={handleCheckBox}
        anonymousIsChecked={anonymousIsChecked}
        title={title}
        content={content}
        file={file}
        changeTitle={changeTitle}
        changeContent={changeContent}
      />
    );
  }
}

export default WritePostContainer;
