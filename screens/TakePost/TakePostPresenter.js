import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FadeIn from "react-native-fade-in-image";
import Layout from "../../constants/Layout";
import TimeStamp from "../../components/TimeStamp";
import { withNavigation } from "react-navigation";
import PostActions from "../../components/PostActions";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import {
  LIGTH_GREEN,
  DARK_BLUE,
  LIGHT_GREY,
  BODER_COLOR
} from "../../constants/Color";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${BODER_COLOR};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
`;
const InnerContainer = styled.TouchableOpacity`
  flex: 1;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 5px;
`;

const ContentContainer = styled.View``;
const AuthorBox = styled.View`
  border-left-color: #dedede;
  border-left-width: 1px;
  margin-left: 9px;
`;
const Author = styled.Text`
  color: ${LIGHT_GREY};
  padding-left: 4.5px;
`;
const Content = styled.Text`
  color: #696969;
  font-size: 15px;
`;
const ContentImg = styled.Image`
  height: 70px;
  width: 100px;
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
  like_count,
  natural_time,
  title,
  is_liked,
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
              : `${title.substring(0, 20)}...`
            : title}
        </Title>
        <Content>
          {content.length > 25
            ? file
              ? `${content.substring(0, 25)}...`
              : `${content.substring(0, 45)}...`
            : content}
        </Content>
      </ContentContainer>
      <PostInfo>
        <CreatorContainer>
          <TimeStamp time={natural_time} />
          <AuthorBox>
            <Author>{anonymous ? "익명" : creator.name}</Author>
          </AuthorBox>
        </CreatorContainer>
        <ActionContainer>
          <PostActions
            isLiked={isLiked}
            size={16}
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
