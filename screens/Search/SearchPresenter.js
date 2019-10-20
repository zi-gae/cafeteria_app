import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TakePost from "../TakePost";
import { LIGHT_GREY } from "../../constants/Color";
import { RFValue } from "react-native-responsive-fontsize";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";

const ScrollContainer = styled.ScrollView`
  margin-top: 10px;
`;

const PostContainer = styled.View`
  align-items: center;
`;
const NotFount = styled.Text`
  color: ${LIGHT_GREY};
  align-items: center;
  font-weight: 500;
  font-size: ${RFValue(17)};
  margin-top: ${Layout.height / 3};
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
const RefreshControl = styled.RefreshControl``;

const SearchPresenter = ({ post, isFetching, searchingBy, onRefresh }) => {
  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={onRefresh}
          tintColor={"black"}
        />
      }
    >
      <PostContainer>
        {post.length === 0 && searchingBy.length > 1 ? (
          <NotFount>게시글을 찾을 수 없습니다.</NotFount>
        ) : post.length === 0 ? (
          <GuideBox>
            <Ionicons
              name={"ios-search"}
              size={RFValue(50)}
              color={LIGHT_GREY}
            ></Ionicons>
            <GuideText>게시판의 글을 검색해보세요</GuideText>
          </GuideBox>
        ) : (
          post.map(getPost => <TakePost {...getPost} key={getPost.id} />)
        )}
      </PostContainer>
    </ScrollContainer>
  );
};

SearchPresenter.propTypes = {
  post: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  searchingBy: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default SearchPresenter;
