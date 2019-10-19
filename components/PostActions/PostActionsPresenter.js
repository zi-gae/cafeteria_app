import React from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { LIGTH_GREEN, DARK_BLUE } from "../../constants/Color";
import { withNavigation } from "react-navigation";
import styled from "styled-components";

const Container = styled.View`
  flex-direction: row;
`;

const Action = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px;
`;
const Count = styled.Text`
  justify-content: space-between;
  margin: 3px;
  color: ${props => (props.like ? LIGTH_GREEN : DARK_BLUE)};
`;

const PostActionsPresenter = ({ isLiked, size, likeCount, commentCount }) => (
  <Container>
    <TouchableOpacity>
      <Action>
        {isLiked ? (
          <Ionicons name={"ios-heart"} size={size} color={LIGTH_GREEN} />
        ) : (
          <Ionicons name={"ios-heart-empty"} size={size} color={LIGTH_GREEN} />
        )}
        <Count like={true}>{likeCount}</Count>
      </Action>
    </TouchableOpacity>
    <TouchableOpacity>
      <Action>
        <EvilIcons name={"comment"} size={size + 2} color={DARK_BLUE} />
        <Count like={false}>{commentCount}</Count>
      </Action>
    </TouchableOpacity>
  </Container>
);

PostActionsPresenter.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired
};

export default withNavigation(PostActionsPresenter);
