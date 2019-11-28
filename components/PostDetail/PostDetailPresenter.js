import React from "react";
import styled from "styled-components";
import TimeStamp from "../TimeStamp";
import PostActions from "../PostActions";
import {
  BODER_COLOR,
  LIGTH_GREEN,
  LIGHT_GREY,
  LIGHT_RED
} from "../../constants/Color";
import Layout from "../../constants/Layout";
import PropTypes from "prop-types";
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import CheckBox from "react-native-check-box";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import ActionSheet from "react-native-actionsheet";
import SafeAreaBottom from "../SafeAreaBottom";

const Container = styled.View`
  margin-top: 10px;
  flex: 1;
`;
const ActivityIndicator = styled.ActivityIndicator`
  height: ${Layout.height / 3};
  width: 100%;
`;
const PostContainer = styled.View`
  border-bottom-color: ${BODER_COLOR};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`;
const ScrollView = styled.ScrollView`
  margin-left: ${Layout.width / 20};
  margin-right: ${Layout.width / 20};
`;
const CreatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CreatorBox = styled.View`
  justify-content: flex-start;
`;
const Creator = styled.Text`
  color: ${props => (props.isAdmin ? `${LIGHT_RED}` : "black")};
  font-weight: bold;
  font-size: ${RFValue(15)};
  margin-bottom: ${RFValue(2)};
`;
const ProfileImg = styled.Image`
  width: ${RFValue(44)};
  height: ${RFValue(44)};
  border-radius: ${RFValue(22)};
  margin-right: ${RFValue(5)};
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
  margin-top: ${RFValue(10)};
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
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  border-radius: ${RFValue(15)};
  margin-right: ${RFValue(5)};
`;
const CommentMessage = styled.Text`
  font-size: ${RFValue(13)};
  font-weight: 200;
  margin-top: ${RFValue(2)};
  margin-bottom: ${RFValue(2)};
  padding-top: ${RFValue(3)};
  padding-bottom: ${RFValue(2)};
`;
const InputBox = styled.View`
  height: ${RFValue(40)};
  flex-direction: row;
`;
const CommentAnonymous = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${RFValue(5)};
  margin-top: ${RFValue(3)};
  margin-bottom: ${RFValue(3)};
  padding-right: ${RFValue(10)};
  padding-left: ${RFValue(10)};
  background-color: #f3f3f3;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const TextInput = styled.TextInput`
  flex: 5;
  background-color: #f3f3f3;
  margin-top: ${RFValue(3)};
  margin-bottom: ${RFValue(3)};
  font-size: ${RFValue(13)};
`;
const CommentAddButton = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  margin-top: ${RFValue(3)};
  margin-bottom: ${RFValue(3)};
  margin-right: ${RFValue(5)};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Touch = styled.TouchableOpacity``;
const Anonymous = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(11)};
  color: ${LIGTH_GREEN};
`;
const CommentActionsBox = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;

  margin-bottom: ${RFValue(7)};
`;
const ActionBox = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${BODER_COLOR};
  padding-right: ${RFValue(5)};
  padding-left: ${RFValue(5)};
  border-radius: 5px;
`;
const OnCommentIcon = styled.TouchableOpacity`
  padding-right: ${props => (props.isOwnComment ? `${RFValue(2)}` : "0px")};
  padding-top: ${props => (props.isComment ? `${RFValue(4)}` : "0px")};
  padding-bottom: ${props => (props.isComment ? `${RFValue(4)}` : "0px")};
  align-items: center;
  justify-content: center;
`;
const CommentDeleteIcon = styled.TouchableOpacity`
  border-left-width: ${props => (props.isOnComment ? "0px" : "1px")};
  border-color: ${props => (props.isOnComment ? "white" : `${BODER_COLOR}`)};
  padding-left: ${props =>
    props.isOnComment ? `${RFValue(2)}` : `${RFValue(5)}`};
  padding-right: ${RFValue(1)};
  align-items: center;
  justify-content: center;
`;

const PostActionBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const options = ["취소", "수정", "삭제"];
const crimeReport = ["취소", "신고"];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;

const PostDetailPresenter = ({
  anonymous,
  comment_count,
  comments,
  content,
  creator,
  image,
  natural_time,
  title,
  isLiked,
  likeCount,
  handlePress,
  anonymousIsChecked,
  handleCheckBox,
  Keyboard,
  keyboardView,
  message,
  onChangeComment,
  submitComment,
  placeholder,
  handlePlaceholderChange,
  onChangeCommentId,
  removeComment,
  isSubmitting,
  handleSheetPress,
  profile,
  isPhotoSubmitting,
  handleSheetCrimeReport
}) => (
  <Container>
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <Creator isAdmin={creator.username === "admin" ? true : false}>
              {anonymous ? "익명이" : creator.name}
            </Creator>
            <TimeStamp time={natural_time} />
          </CreatorBox>
          <PostActionBox>
            <Touch
              onPress={() => {
                this.actionSheet.show();
              }}
            >
              <Ionicons name="md-settings" size={RFValue(15)} color="black" />
            </Touch>
          </PostActionBox>
        </CreatorContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
        {image ? (
          isPhotoSubmitting ? (
            <ActivityIndicator color="black" size="large" />
          ) : (
            <ContentImg resizeMode="cover" source={{ uri: image }} />
          )
        ) : null}
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
                handlePlaceholderChange={handlePlaceholderChange}
                onChangeCommentId={onChangeCommentId}
                removeComment={removeComment}
                profile={profile}
              />
            ))
        : null}
    </ScrollView>
    <KeyboardAccessoryView
      alwaysVisible={true}
      avoidKeyboard
      hideBorder={true}
      bumperHeight={15}
      style={{
        backgroundColor: "white"
      }}
    >
      <InputBox>
        <CommentAnonymous>
          <CheckBox
            isChecked={anonymousIsChecked}
            onClick={handleCheckBox}
            checkBoxColor={LIGTH_GREEN}
          />
          <Anonymous>익명</Anonymous>
        </CommentAnonymous>
        <TextInput
          ref={commentInputRef => (this.commentInputRef = commentInputRef)}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          placeholder={placeholder}
          onSubmitEditing={() => {
            Keyboard.dismiss;
            submitComment();
          }}
          value={message}
          onChangeText={onChangeComment}
          returnKeyType="done"
        />
        <CommentAddButton>
          <Touch
            onPress={() => {
              Keyboard.dismiss();
              submitComment();
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color="black" />
            ) : (
              <Ionicons name="md-paper-plane" size={25} color={LIGTH_GREEN} />
            )}
          </Touch>
        </CommentAddButton>
      </InputBox>
    </KeyboardAccessoryView>
    <ActionSheet
      ref={actionSheet => (this.actionSheet = actionSheet)}
      options={profile.username === creator.username ? options : crimeReport}
      cancelButtonIndex={CANCEL_INDEX}
      destructiveButtonIndex={DESTRUCTIVE_INDEX}
      onPress={
        profile.username === creator.username
          ? handleSheetPress
          : handleSheetCrimeReport
      }
    />
    <SafeAreaBottom keyboardView={keyboardView} />
  </Container>
);

const Comment = ({
  comment,
  comments,
  creator,
  handlePlaceholderChange,
  onChangeCommentId,
  removeComment,
  profile
}) => (
  <CommentContianer>
    <CommentBox onComment={false}>
      <CommentCreatorBox>
        <CommentProfileImg
          source={
            comment.creator.profile_image && !comment.anonymous
              ? { uri: comment.creator.profile_image }
              : require("../../assets/images/noProfile.png")
          }
        />
        <CreatorBox>
          {creator === comment.creator.username ? (
            <CommentCreator isCreator={true}>
              {comment.anonymous
                ? "익명이(글쓴이)"
                : `${comment.creator.name}(글쓴이)`}
            </CommentCreator>
          ) : (
            <CommentCreator isCreator={false}>
              {comment.anonymous ? "익명이" : comment.creator.name}
            </CommentCreator>
          )}
          <TimeStamp time={comment.natural_time} />
        </CreatorBox>
        <CommentActionsBox>
          <ActionBox>
            <OnCommentIcon
              isOwnComment={profile.username === comment.creator.username}
              isComment={true}
              onPress={() => {
                this.commentInputRef.focus();
                handlePlaceholderChange();
                onChangeCommentId(comment.id);
              }}
            >
              <EvilIcons name="comment" size={18} color={LIGHT_GREY} />
            </OnCommentIcon>
            {profile.username === comment.creator.username ? (
              <CommentDeleteIcon
                onPress={() => {
                  removeComment(comment.id);
                }}
              >
                <Ionicons
                  name="ios-close"
                  size={24}
                  color={BODER_COLOR}
                  style={{ marginTop: 2 }}
                />
              </CommentDeleteIcon>
            ) : null}
          </ActionBox>
        </CommentActionsBox>
      </CommentCreatorBox>
      <CommentMessage>{comment.message}</CommentMessage>
      <CommentOnComment
        comments={comments}
        parentId={comment.id}
        creator={creator}
        removeComment={removeComment}
      />
    </CommentBox>
  </CommentContianer>
);

const CommentOnComment = ({ comments, parentId, creator, removeComment }) =>
  comments
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
                {creator === comment.creator.username ? (
                  <CommentCreator isCreator={true}>
                    {comment.anonymous
                      ? "익명이(글쓴이)"
                      : `${comment.creator.name}(글쓴이)`}
                  </CommentCreator>
                ) : (
                  <CommentCreator isCreator={false}>
                    {comment.anonymous ? "익명이" : comment.creator.name}
                  </CommentCreator>
                )}
                <TimeStamp time={comment.natural_time} />
              </CreatorBox>
              <CommentActionsBox>
                <ActionBox>
                  <CommentDeleteIcon
                    isOnComment={true}
                    onPress={() => {
                      removeComment(comment.id);
                    }}
                  >
                    <Ionicons
                      name="ios-close"
                      size={24}
                      color={BODER_COLOR}
                      style={{ marginTop: 2 }}
                    />
                  </CommentDeleteIcon>
                </ActionBox>
              </CommentActionsBox>
            </CommentCreatorBox>
            <CommentMessage>{comment.message}</CommentMessage>
          </CommentBox>
        );
      } else {
        return null;
      }
    });

PostDetailPresenter.propTypes = {
  anonymous: PropTypes.bool.isRequired,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string
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
  handlePress: PropTypes.func.isRequired,
  anonymousIsChecked: PropTypes.bool.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  keyboardView: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onChangeComment: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  isPhotoSubmitting: PropTypes.bool.isRequired,
  handleSheetCrimeReport: PropTypes.func.isRequired
};

export default PostDetailPresenter;
