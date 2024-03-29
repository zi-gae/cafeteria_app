import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import TimeStamp from "../TimeStamp";
import { BODER_COLOR, DARK_BLUE } from "../../constants/Color";
import { EvilIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const Container = styled.ScrollView`
  width: ${Layout.width / 1.2};
`;
const Touch = styled.TouchableOpacity``;
const NotifiContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
const NotifiIcon = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: ${RFValue(10)};
  height: ${RFValue(44)};
  width: ${RFValue(44)};
  border-radius: ${RFValue(22)};
  border-style: solid;
  border-width: 1px;
  border-color: ${BODER_COLOR};
`;
const NotifiPreview = styled.View``;
const PreviewTitle = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(15)};
`;
const PreviewContent = styled.Text`
  font-weight: 200;
  font-size: ${RFValue(13)};
  margin-top: ${RFValue(3)};
  margin-bottom: ${RFValue(3)};
`;

const NotificationPresenter = ({
  comment,
  natural_time,
  notification_type,
  id,
  anonymous,
  comment_count,
  comments,
  content,
  creator,
  file,
  kinds,
  likeCount,
  time,
  title,
  isLiked,
  navigation,
  handleTakePress
}) => (
  <Container>
    <Touch
      onPress={() =>
        navigation.navigate("PostDetail", {
          id,
          handleTakePress,
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
          isLiked
        })
      }
    >
      <NotifiContainer>
        <NotifiIcon>
          <EvilIcons name="comment" size={RFValue(28)} color={DARK_BLUE} />
        </NotifiIcon>
        <NotifiPreview>
          <PreviewTitle>자유게시판</PreviewTitle>
          {notification_type === "comment" && (
            <PreviewContent>
              새로운 댓글이 달렸어요:{" "}
              {comment.length > 7
                ? `${comment.substring(0, 7)}...`
                : `${comment}`}
            </PreviewContent>
          )}
          {notification_type === "like" && (
            <PreviewContent>
              내가 작성한 게시글이 좋아요를 받았어요
            </PreviewContent>
          )}
          {notification_type === "on_comment" && (
            <PreviewContent>
              새로운 대댓글이 달렸어요:{" "}
              {comment.length > 7
                ? `${comment.substring(0, 7)}...`
                : `${comment}`}
            </PreviewContent>
          )}
          <TimeStamp time={time} />
          <PreviewContent></PreviewContent>
        </NotifiPreview>
      </NotifiContainer>
    </Touch>
  </Container>
);

NotificationPresenter.propTypes = {
  comment: PropTypes.string,
  creator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  image: PropTypes.shape({
    file: PropTypes.string
  }),
  notification_type: PropTypes.string.isRequired,
  natural_time: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  anonymous: PropTypes.bool.isRequired,
  comment_count: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  kinds: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  handleTakePress: PropTypes.func.isRequired
};

export default NotificationPresenter;
