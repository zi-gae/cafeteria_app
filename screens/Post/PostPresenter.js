import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_COLOR_WHITE } from "../../constants/Color";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${BG_COLOR_WHITE};
`;
const RefreshControl = styled.RefreshControl``;

const PostContainer = styled.View``;

const PostPresenter = ({ isFetching, refresh }) => (
  <Container
    refreshControl={
      <RefreshControl
        refreshing={isFetching}
        onRefresh={refresh}
        tintColor="black"
      />
    }
  >
    <PostContainer></PostContainer>
  </Container>
);

PostPresenter.propTypes = {
  navigate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  post: PropTypes.array.isRequired
};

export default PostPresenter;
