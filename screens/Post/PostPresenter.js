import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TakePost from "../TakePost";
import Layout from "../../constants/Layout";
import { RFValue } from "react-native-responsive-fontsize";
import { BODER_COLOR, LIGTH_GREEN } from "../../constants/Color";
import { EvilIcons } from "@expo/vector-icons";
const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const ScrollContainer = styled.ScrollView`
  margin-top: 10px;
  width: ${Layout.width};
`;
const RefreshControl = styled.RefreshControl``;

const PostContainer = styled.View`
  flex: 1;
`;
const Touch = styled.TouchableOpacity``;
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

const PostPresenter = ({ isFetching, refresh, post }) => (
  <Container>
    <ScrollContainer
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refresh}
          tintColor="black"
        />
      }
    >
      <PostContainer>
        {post &&
          post.map(getPost => <TakePost {...getPost} key={getPost.id} />)}
      </PostContainer>
    </ScrollContainer>
    <Touch>
      <WriteButton>
        <EvilIcons name="pencil" color={LIGTH_GREEN} size={RFValue(25)} />
        <WriteText>글 쓰기</WriteText>
      </WriteButton>
    </Touch>
  </Container>
);

PostPresenter.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  post: PropTypes.array.isRequired
};

export default PostPresenter;
