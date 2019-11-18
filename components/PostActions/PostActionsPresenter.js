import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LIGTH_GREEN, DARK_BLUE } from "../../constants/Color";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
  flex-direction: row;
`;
const Action = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;
const Count = styled.Text`
  justify-content: space-between;
  color: ${props => (props.like ? LIGTH_GREEN : DARK_BLUE)};
  margin-left: ${props => (props.like ? "2px" : "0px")};
  margin-right: ${props => (props.like ? "5px" : "0px")};
  font-size: ${props => (props.post ? `${RFValue(15)}` : `${RFValue(11)}`)};
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
          <Ionicons
            style={{ marginTop: 1 }}
            name={"ios-heart"}
            size={size}
            color={LIGTH_GREEN}
          />
        ) : (
          <Ionicons name={"ios-heart-empty"} size={size} color={LIGTH_GREEN} />
        )}
        <Count post={dispatchLike} like={true}>
          {likeCount}
        </Count>
      </Action>
    </TouchableOpacity>
    <TouchableOpacity>
      <Action>
        <EvilIcons
          style={{ marginTop: 2 }}
          name={"comment"}
          size={size + 2}
          color={DARK_BLUE}
        />
        <Count post={dispatchLike} like={false}>
          {commentCount}
        </Count>
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
