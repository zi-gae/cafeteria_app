import React, { PureComponent } from "react";
import PostActionsPresenter from "./PostActionsPresenter";

class PostActionsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { size, isLiked, likeCount, commentCount } = this.props;
    return (
      <PostActionsPresenter
        size={size}
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    );
  }
}

export default PostActionsContainer;
