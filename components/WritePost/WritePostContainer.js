import React, { Component } from "react";
import WritePostPresenter from "./WritePostPresenter";
import styled from "styled-components";
import { LIGTH_GREEN } from "../../constants/Color";
import NavButton from "../NavButton";
import { RFValue } from "react-native-responsive-fontsize";

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
    this.state = {
      isChecked: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: <Title>글 쓰기</Title>,
    headerLeft: (
      <NavButton
        iconName="ios-close"
        color={LIGTH_GREEN}
        onPress={() => navigation.goBack(null)}
      />
    ),
    headerRight: (
      <Button>
        <ButtonBox>
          <ButtonText>완료</ButtonText>
        </ButtonBox>
      </Button>
    )
  });

  handleCheckBox = () => {
    const { isChecked } = this.state;
    isChecked
      ? this.setState({
          isChecked: false
        })
      : this.setState({
          isChecked: true
        });
  };

  render() {
    const { handleCheckBox } = this;
    const { isChecked } = this.state;
    return (
      <WritePostPresenter
        handleCheckBox={handleCheckBox}
        isChecked={isChecked}
      />
    );
  }
}

export default WritePostContainer;
