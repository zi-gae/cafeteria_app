import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

const View = styled.View``;
const MenuBox = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
  padding-bottom: ${RFValue(8)};
`;
const Title = styled.Text`
  padding-top: ${RFValue(15)};
  padding-bottom: ${RFValue(15)};
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
  font-size: ${RFValue(17)};
  font-weight: bold;
`;
const MenuTitle = styled.Text`
  font-weight: 500;
  margin-right: ${RFValue(10)};
  font-size: ${RFValue(15)};
`;
const Menu = styled.Text`
  font-size: ${RFValue(13)};
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Today = styled.Text`
  padding-top: ${RFValue(15)};
  padding-bottom: ${RFValue(15)};
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
  font-size: ${RFValue(11)};
  font-weight: 500;
`;

const RicePresenter = ({ rices, title, today }) => (
  <View>
    <Header>
      <Title>{title}</Title>
      <Today>{today}</Today>
    </Header>
    {rices ? (
      rices.map((rice, i) => {
        return (
          <MenuBox key={i}>
            {rice.map((menu, index) => {
              if (index === 0 && title !== "교직원 식당") {
                return <MenuTitle key={index}>{menu}</MenuTitle>;
              } else {
                return <Menu key={index}>{menu} </Menu>;
              }
            })}
          </MenuBox>
        );
      })
    ) : (
      <Today>금일 식단 없거나 업로드 예정</Today>
    )}
  </View>
);

RicePresenter.propTypes = {
  rices: PropTypes.array,
  title: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired
};

export default RicePresenter;
