import React, { Component } from "react";
import PostActionsPresenter from "./PostActionsPresenter";

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

export default PostActionsContainer;
