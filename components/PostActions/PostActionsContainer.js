import React, { Component } from "react";
import PostActionsPresenter from "./PostActionsPresenter";
import PropTypes from "prop-types";

class PostActionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { size, isLiked, likeCount, commentCount, dispatchLike } = this.props;
    return (
      <PostActionsPresenter
        size={size}
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={commentCount}
        dispatchLike={dispatchLike}
      />
    );
  }
}

PostActionsContainer.propTypes = {
  size: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  dispatchLike: PropTypes.func
};

export default PostActionsContainer;
