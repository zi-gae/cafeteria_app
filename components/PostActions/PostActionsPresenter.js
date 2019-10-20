import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { LIGTH_GREEN, DARK_BLUE } from "../../constants/Color";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
const Container = styled.View`
  flex-direction: row;
`;

const Action = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;
const Count = styled.Text`
  justify-content: space-between;
  color: ${props => (props.like ? LIGTH_GREEN : DARK_BLUE)};
  /* font-size: ${RFValue(11) * 1}; */
`;

const PostActionsPresenter = ({
  isLiked,
  size,
  likeCount,
  commentCount,
  dispatchLike
}) => (
  <Container>
    <TouchableOpacity onPressOut={dispatchLike}>
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
        <EvilIcons name={"comment"} size={size} color={DARK_BLUE} />
        <Count like={false}>{commentCount}</Count>
      </Action>
    </TouchableOpacity>
  </Container>
);

PostActionsPresenter.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  dispatchLike: PropTypes.func
};

export default withNavigation(PostActionsPresenter);
