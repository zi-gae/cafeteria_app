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
const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${RFValue(20)};
`;

const HomePresenter = ({ navigate }) => (
  <Container showsVerticalScrollIndicator={false}>
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
        navigate={navigate}
        name={"home"}
        size={25}
        color={LIGHT_BLUE}
        type="Fa"
        kind="TU 홈"
        url="http://m.tu.ac.kr"
      />
      <HomeIconBox
        navigate={navigate}
        name={"ios-calendar"}
        size={25}
        color={LIGHT_BLUE}
        type="Ii"
        kind="학사 일정"
        url="http://m.tu.ac.kr/tu/html/04_life/life_02.jsp"
      />
      <HomeIconBox
        navigate={navigate}
        name={"ios-book"}
        size={25}
        color={LIGHT_BLUE}
        type="Ii"
        kind="열람실"
        url="http://libebook.tu.ac.kr:8081/EZ5500/SEAT/RoomStatus.aspx"
      />
      <HomeIconBox
        navigate={navigate}
        name={"stack-overflow"}
        size={25}
        color={LIGHT_BLUE}
        type="Fa"
        kind="장학정보"
        url="http://m.tu.ac.kr/tu/html/04_life/life_04.jsp"
      />
      <HomeIconBox
        navigate={navigate}
        name={"book"}
        size={25}
        color={LIGHT_BLUE}
        type="Fa"
        kind="도서관"
        url="http://lib.tu.ac.kr"
      />
    </IconContainer>
  </Container>
);
// Home 디자인

export default HomePresenter;
