import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FadeIn from "react-native-fade-in-image";
import Layout from "../../constants/Layout";

const Author = styled.Text``;
const Time = styled.Text``;
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const InnerContainer = styled.View``;

const Title = styled.Text``;

const ContentContainer = styled.View``;
const Content = styled.Text``;
const ContentImg = styled.Image`
  height: 50px;
  width: 50px;
`;

const PostInfo = styled.View`
  width: ${Layout.width / 1.2};
  flex-direction: row;
  background-color: yellow;
  justify-content: space-between;
`;

const CreatorContainer = styled.View`
  flex-direction: row;
`;

const PostAction = styled.View`
  flex-direction: row;
`;
const ActionCount = styled.Text`
  margin: 5px;
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
  is_vertical
}) => (
  <Container>
    <InnerContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Content>{content} </Content>
      </ContentContainer>
      <PostInfo>
        <CreatorContainer>
          <Time>{natural_time}</Time>
          <Author>{anonymous ? "익명" : creator.name}</Author>
        </CreatorContainer>
        <PostAction>
          <ActionCount>{like_count} like</ActionCount>
          <ActionCount>{comment_count} comments</ActionCount>
        </PostAction>
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
  is_vertical: PropTypes.string.isRequired
};

export default TakePostPresenter;
