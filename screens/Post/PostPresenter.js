import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TakePost from "../TakePost";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";
import { BODER_COLOR, LIGTH_GREEN, LIGHT_GREY } from "../../constants/Color";
import { EvilIcons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
const ScrollContainer = styled.ScrollView`
  margin-top: 10px;
  width: ${Layout.width};
`;
const ActivityIndicator = styled.ActivityIndicator`
  align-self: center;
`;
const RefreshControl = styled.RefreshControl``;

const PostContainer = styled.View`
  flex: 1;
`;
const Touch = styled.TouchableOpacity`
  position: absolute;
`;
const WriteButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${RFValue(90)};
  height: ${RFValue(35)};
  margin-bottom: ${RFValue(10)};
  background-color: #f8f9fa;
  border-style: solid;
  border-width: 1px;
  border-color: ${BODER_COLOR};
  border-radius: ${RFValue(18)};
`;
const WriteText = styled.Text`
  font-size: ${RFValue(13)};
  margin-left: ${RFValue(6)};
`;
const GuideBox = styled.View`
  margin-top: ${Layout.height / 3};
  align-items: center;
  justify-content: center;
`;
const GuideText = styled.Text`
  color: ${LIGHT_GREY};
  font-size: ${RFValue(17)};
  font-weight: 500;
`;

const PostPresenter = ({
  isFetching,
  refresh,
  posts,
  navigateWritePost,
  isPostSubmitting,
  navigation,
  isCloseToBottom,
  handlePostLength,
  postLength,
  fetchPost,
  univAuthentication
}) => (
  <Container>
    <ScrollContainer
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          handlePostLength();
        }
      }}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={isFetching && isPostSubmitting}
          onRefresh={refresh}
          tintColor="black"
        />
      }
    >
      {fetchPost ? <ActivityIndicator size="small" color="black" /> : null}
      <PostContainer>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => {
            if (index < postLength) {
              return (
                <TakePost
                  {...post}
                  key={post.id}
                  univAuthentication={univAuthentication}
                />
              );
            }
          })
        ) : (
          <GuideBox>
            <MaterialCommunityIcons
              name={"pencil-off"}
              size={RFValue(50)}
              color={LIGHT_GREY}
            />
            <GuideText>작성된 게시글이 없어요</GuideText>
            <GuideText>게시글을 첫 게시글을 작성해 주세요</GuideText>
          </GuideBox>
        )}
      </PostContainer>
    </ScrollContainer>
    {navigation.state.params ? null : (
      <Touch onPress={navigateWritePost}>
        <WriteButton>
          <EvilIcons name="pencil" color={LIGTH_GREEN} size={RFValue(25)} />
          <WriteText>글 쓰기</WriteText>
        </WriteButton>
      </Touch>
    )}
  </Container>
);

PostPresenter.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  posts: PropTypes.array,
  navigateWritePost: PropTypes.func.isRequired,
  isPostSubmitting: PropTypes.bool.isRequired,
  handlePostLength: PropTypes.func.isRequired,
  postLength: PropTypes.number.isRequired,
  fetchPost: PropTypes.bool.isRequired,
  univAuthentication: PropTypes.bool.isRequired
};

export default PostPresenter;
