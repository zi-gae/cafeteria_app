import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FadeIn from "react-native-fade-in-image";
import Layout from "../../constants/Layout";
import TimeStamp from "../../components/TimeStamp";
import { withNavigation } from "react-navigation";
import PostActions from "../../components/PostActions";
import { RFValue } from "react-native-responsive-fontsize";
import { LIGHT_GREY, BODER_COLOR } from "../../constants/Color";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${BODER_COLOR};
  border-bottom-width: 1px;
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
  margin-bottom: ${RFValue(11)};
  padding-bottom: ${RFValue(5.5)};
`;
const InnerContainer = styled.TouchableOpacity`
  flex: 1;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: ${RFValue(16)};
  margin-bottom: ${RFValue(4)};
`;

const ContentContainer = styled.View``;
const AuthorBox = styled.View`
  border-left-color: #dedede;
  border-left-width: 1px;
  margin-left: 9px;
`;
const Author = styled.Text`
  font-size: ${RFValue(11)};
  color: ${LIGHT_GREY};
  padding-left: 4.5px;
`;
const Content = styled.Text`
  color: #696969;
  font-size: ${RFValue(13)};
`;
const ContentImg = styled.Image`
  height: ${RFValue(56)};
  width: ${RFValue(80)};
  border-radius: 5px;
`;

const PostInfo = styled.View`
  width: auto;
  flex-direction: row;
  justify-content: space-between;
`;

const CreatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  margin-right: 5px;
`;

const TakePostPresenter = ({
  id,
  anonymous,
  comment_count,
  comments,
  content,
  creator,
  file,
  kinds,
  natural_time,
  title,
  navigation,
  handleTakePress,
  isLiked,
  likeCount
}) => (
  <Container>
    <InnerContainer
      onPressOut={() =>
        navigation.navigate("PostDetail", {
          id,
          anonymous,
          comment_count,
          comments,
          content,
          creator,
          file,
          kinds,
          likeCount,
          natural_time,
          title,
          isLiked,
          handleTakePress
        })
      }
    >
      <ContentContainer>
        <Title>
          {title.length > 20
            ? file
              ? `${title.substring(0, 18)}...`
              : `${title.substring(0, 18)}...`
            : title}
        </Title>
        <Content>
          {content.length > 25
            ? file
              ? `${content.substring(0, 20)}...`
              : `${content.substring(0, 20)}...`
            : content}
        </Content>
      </ContentContainer>
      <PostInfo>
        <CreatorContainer>
          <TimeStamp list={true} time={natural_time} />
          <AuthorBox>
            <Author>{anonymous ? "익명" : creator.name}</Author>
          </AuthorBox>
        </CreatorContainer>
        <ActionContainer>
          <PostActions
            isLiked={isLiked}
            size={RFValue(11)}
            likeCount={likeCount}
            commentCount={comment_count}
          />
        </ActionContainer>
      </PostInfo>
    </InnerContainer>
    {file ? (
      <FadeIn>
        <ContentImg source={{ uri: file }} />
      </FadeIn>
    ) : null}
  </Container>
);

TakePostPresenter.propTypes = {
  id: PropTypes.number.isRequired,
  anonymous: PropTypes.bool.isRequired,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  file: PropTypes.string,
  like_count: PropTypes.number.isRequired,
  comment_count: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }),
      anonymous: PropTypes.bool.isRequired
    })
  ),
  natural_time: PropTypes.string.isRequired,
  kinds: PropTypes.string.isRequired,
  is_liked: PropTypes.bool,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  handleTakePress: PropTypes.func.isRequired
};

export default withNavigation(TakePostPresenter);
