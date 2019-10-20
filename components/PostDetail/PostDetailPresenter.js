import React from "react";
import styled from "styled-components";
import TimeStamp from "../TimeStamp";
import PostActions from "../PostActions";
import { BODER_COLOR, LIGTH_GREEN } from "../../constants/Color";
import Layout from "../../constants/Layout";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";

const Container = styled.ScrollView`
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
  margin-top: 10px;
`;

const PostContainer = styled.View`
  border-bottom-color: ${BODER_COLOR};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const CreatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CreatorBox = styled.View`
  justify-content: flex-start;
`;
const Creator = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(15)};
  margin-bottom: ${RFValue(2)};
`;
const ProfileImg = styled.Image`
  width: ${RFValue(45)};
  height: ${RFValue(45)};
  border-radius: 22px;
`;
const Title = styled.Text`
  font-size: ${RFValue(18)};
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Content = styled.Text`
  font-size: ${RFValue(15)};
  font-weight: 200;
  margin-bottom: 10px;
`;
const ContentImg = styled.Image`
  height: ${Layout.height / 3};
  width: 100%;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const CommentContianer = styled.View`
  border-bottom-color: ${BODER_COLOR};
  border-bottom-width: 1px;
`;
const CommentBox = styled.View`
  background-color: ${props => (props.onComment ? "#f9f8f9" : "white")};
  margin-left: ${props => (props.onComment ? `${Layout.width / 20}` : "0px")};
  border-radius: ${props => (props.onComment ? "10px" : "0px")};
  padding: ${props => (props.onComment ? "7px" : "0px")};
  margin-bottom: ${props => (props.onComment ? "7px" : "0px")};
`;
const CommentCreatorBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CommentCreator = styled.Text`
  font-size: ${RFValue(13)};
  font-weight: bold;
  color: ${props => (props.isCreator ? `${LIGTH_GREEN}` : "black")};
`;
const CommentProfileImg = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 17.5px;
`;
const CommentMessage = styled.Text`
  font-size: ${RFValue(13)};
  font-weight: 200;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  padding: 5px;
`;

const PostDetailPresenter = ({
  anonymous,
  comment_count,
  comments,
  content,
  creator,
  file,
  natural_time,
  title,
  isLiked,
  likeCount,
  handlePress
}) => (
  <Container>
    <PostContainer>
      <CreatorContainer>
        <ProfileImg
          source={
            creator.profile_image && !anonymous
              ? { uri: creator.profile_image }
              : require("../../assets/images/noProfile.png")
          }
        />
        <CreatorBox>
          <Creator>{anonymous ? "익명이" : creator.name}</Creator>
          <TimeStamp time={natural_time} />
        </CreatorBox>
      </CreatorContainer>
      <Title>{title}</Title>
      <Content>{content}</Content>
      {file ? <ContentImg resizeMode="contain" source={{ uri: file }} /> : null}
      <PostActions
        dispatchLike={handlePress}
        isLiked={isLiked}
        size={20}
        likeCount={likeCount}
        commentCount={comment_count}
      />
    </PostContainer>
    {comments
      ? comments
          .filter(comment => comment.referComment === null)
          .map((comment, i) => (
            <Comment
              key={i}
              comment={comment}
              comments={comments}
              creator={creator.username}
            />
          ))
      : null}
  </Container>
);

const Comment = ({ comment, comments, creator }) => {
  return (
    <CommentContianer>
      <CommentBox onComment={false}>
        <CommentCreatorBox>
          <CommentProfileImg
            source={
              comment.creator.profile_image && !comment.anonymous
                ? { uri: comment.profile_image }
                : require("../../assets/images/noProfile.png")
            }
          />
          <CreatorBox>
            {creator === comment.creator.username ? (
              <CommentCreator isCreator={true}>
                {comment.anonymous ? "익명이(글쓴이)" : comment.creator.name}
              </CommentCreator>
            ) : (
              <CommentCreator isCreator={false}>
                {comment.anonymous ? "익명이" : comment.creator.name}
              </CommentCreator>
            )}

            <TimeStamp time={comment.natural_time} />
          </CreatorBox>
        </CommentCreatorBox>
        <CommentMessage>{comment.message}</CommentMessage>
        <CommentOnComment comments={comments} parentId={comment.id} />
      </CommentBox>
    </CommentContianer>
  );
};

const CommentOnComment = ({ comments, parentId }) => {
  return comments
    .filter(comment => comment.referComment !== null)
    .map((comment, i) => {
      if (comment.referComment === parentId) {
        return (
          <CommentBox key={i} onComment={true}>
            <CommentCreatorBox>
              <CommentProfileImg
                source={
                  comment.creator.profile_image && !comment.anonymous
                    ? { uri: comment.creator.profile_image }
                    : require("../../assets/images/noProfile.png")
                }
              />
              <CreatorBox>
                <CommentCreator>{comment.creator.name}</CommentCreator>
                <TimeStamp time={comment.natural_time} />
              </CreatorBox>
            </CommentCreatorBox>
            <CommentMessage>{comment.message}</CommentMessage>
          </CommentBox>
        );
      } else {
        return null;
      }
    });
};

PostDetailPresenter.propTypes = {
  anonymous: PropTypes.bool.isRequired,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  file: PropTypes.string,
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
  is_liked: PropTypes.bool,
  dispatchLike: PropTypes.func.isRequired,
  handlePress: PropTypes.func.isRequired
};

export default PostDetailPresenter;
