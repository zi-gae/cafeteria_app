import React, { Component } from "react";
import { View, Text } from "react-native";
import PostDetailPresenter from "./PostDetailPresenter";

class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const {
      anonymous,
      comment_count,
      comments,
      content,
      creator,
      file,
      like_count,
      natural_time,
      title,
      is_liked
    } = navigation.state.params;

    return (
      <PostDetailPresenter
        anonymous={anonymous}
        comment_count={comment_count}
        comments={comments}
        content={content}
        creator={creator}
        file={file}
        like_count={like_count}
        natural_time={natural_time}
        title={title}
        is_liked={is_liked}
      />
    );
  }
}

export default PostDetailContainer;
