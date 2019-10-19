import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_COLOR_WHITE, MINT } from "../../constants/Color";
import TakePost from "../TakePost";
import Layout from "../../constants/Layout";

const ScrollContainer = styled.ScrollView`
  margin-top: 10px;
`;
const RefreshControl = styled.RefreshControl``;

const PostContainer = styled.View``;

const PostPresenter = ({ isFetching, refresh, post }) => (
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
      {post && post.map(getPost => <TakePost {...getPost} key={getPost.id} />)}
    </PostContainer>
  </ScrollContainer>
);

PostPresenter.propTypes = {
  navigate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  post: PropTypes.array.isRequired
};

export default PostPresenter;
