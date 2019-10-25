import React from "react";
import styled from "styled-components";
import { BODER_COLOR, LIGHT_BLUE } from "../../constants/Color";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";
import HomeIconBox from "../../components/HomeIconBox";
import RicePost from "../../components/RicePost";

const Container = styled.ScrollView`
  margin-top: 10px;
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
  flex-grow: 1;
`;
const SquareContainer = styled.View`
  border-radius: 15px;
  border-style: solid;
  border-width: 1px;
  border-color: ${BODER_COLOR};
  margin-bottom: ${RFValue(20)};
  padding-bottom: ${RFValue(7)};
`;

const Title = styled.Text`
  padding-top: ${RFValue(15)};
  padding-bottom: ${RFValue(15)};
  padding-left: ${RFValue(15)};
  padding-right: ${RFValue(15)};
  font-size: ${RFValue(17)};
  font-weight: bold;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${RFValue(20)};
`;

const HomePresenter = () => (
  <Container showsVerticalScrollIndicator={false}>
    <SquareContainer>
      <RicePost type="student" title="학생 식당" />
    </SquareContainer>
    <SquareContainer>
      <RicePost type="student" title="학생 식당" />
    </SquareContainer>
    <SquareContainer>
      <RicePost type="dormitory" title="기숙사 식당" />
    </SquareContainer>
    <SquareContainer>
      <RicePost type="professor" title="교직원 식당" />
    </SquareContainer>

    <IconContainer>
      <HomeIconBox
        name={"home"}
        size={25}
        color={LIGHT_BLUE}
        type="Fa"
        kind="TU 홈"
        url="http://www.m.tu.ac.kr/tu/index.jsp"
      />
      <HomeIconBox
        name={"ios-calendar"}
        size={25}
        color={LIGHT_BLUE}
        type="Ii"
        kind="학사 일정"
        url="http://m.tu.ac.kr/tu/html/04_life/life_02.jsp"
      />
      <HomeIconBox
        name={"ios-book"}
        size={25}
        color={LIGHT_BLUE}
        type="Ii"
        kind="열람실"
        url="http://libebook.tu.ac.kr:8081/EZ5500/SEAT/RoomStatus.aspx"
      />
      <HomeIconBox
        name={"stack-overflow"}
        size={25}
        color={LIGHT_BLUE}
        type="Fa"
        kind="마일리지"
        url="https://up.tu.ac.kr"
      />
      <HomeIconBox
        name={"book"}
        size={25}
        color={LIGHT_BLUE}
        type="Fa"
        kind="도서관"
        url="http://lib.tu.ac.kr"
      />
    </IconContainer>
    <SquareContainer>
      <Title>현재 인기글</Title>
    </SquareContainer>
  </Container>
);
// Home 디자인

export default HomePresenter;
