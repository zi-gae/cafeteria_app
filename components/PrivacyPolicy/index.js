import React from "react";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";
import { LIGHT_GREY } from "../../constants/Color";

const Container = styled.ScrollView`
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
`;

const Paragraph = styled.View`
  margin-bottom: ${RFValue(20)};
`;
const Sentence = styled.Text`
  color: #808080;
`;

const PrivacyPolicy = () => (
  <Container showsVerticalScrollIndicator={false}>
    <Paragraph>
      <Sentence>
        '동명대학식이'은 (이하 '회사'는) 고객님의 개인정보를 중요시하며,
        "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
        회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한
        용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가
        취해지고 있는지 알려드립니다. 회사는 개인정보취급방침을 개정하는 경우
        웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
      </Sentence>
    </Paragraph>
    <Paragraph>
      <Sentence>
        ■ 수집하는 개인정보 항목 회사는 회원가입, 상담, 서비스 신청 등등을 위해
        아래와 같은 개인정보를 수집하고 있습니다.
      </Sentence>
      <Sentence>ο 수집항목 : 로그인ID , 비밀번호 , 학번</Sentence>
    </Paragraph>
    <Paragraph>
      <Sentence>
        ■ 개인정보의 수집 및 이용목적 회사는 수집한 개인정보를 다음의 목적을
        위해 활용합니다.
      </Sentence>
      <Sentence>ο 외박신청을 위한 콘텐츠 및 서비스 제공</Sentence>
      <Sentence> ο 회원 관리 회원제 서비스 이용에 따른 본인확인 </Sentence>
      <Sentence>
        ο 마케팅 및 광고에 활용 접속 빈도 파악 또는 회원의 서비스 이용에 대한
        통계
      </Sentence>
    </Paragraph>
    <Paragraph>
      <Sentence>
        ■ 개인정보의 보유 및 이용기간 회사는 개인정보 수집 및 이용목적이 달성된
        후에는 예외 없이 해당 정보를 지체 없이 파기합니다.
      </Sentence>
      <Sentence>
        ■ 개인정보의 파기절차 및 방법 회사는 원칙적으로 개인정보 수집 및
        이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및
        방법은 다음과 같습니다.
      </Sentence>
      <Sentence>
        ο 파기절차 회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후
        별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에
        따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다. 별도
        DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의
        다른 목적으로 이용되지 않습니다.
      </Sentence>
    </Paragraph>
    <Paragraph>
      <Sentence>
        ■ 개인정보에 관한 민원서비스 회사는 고객의 개인정보를 보호하고
        개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및
        개인정보관리책임자를 지정하고 있습니다. 부서 개발자 이메일 :
        doscm164@naver.com 개인정보관리책임자 성명 :정건우 귀하께서는 회사의
        서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을
        개인정보관리책임자 혹은 개발자에게 신고하실 수 있습니다. 회사는
        이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다. 기타
        개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
        문의하시기 바랍니다. 1.개인분쟁조정위원회 (www.1336.or.kr/1336)
        2.정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4) 3.대검찰청
        인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600) 4.경찰청
        사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)
      </Sentence>
    </Paragraph>
  </Container>
);

export default PrivacyPolicy;
