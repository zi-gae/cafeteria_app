import React, { Component } from "react";
import PostDetailPresenter from "./PostDetailPresenter";
import PropTypes from "prop-types";

class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.navigation.state.params.isLiked,
      likeCount: props.navigation.state.params.likeCount
    };
  }
  static propTypes = {
    dispatchLike: PropTypes.func.isRequired
  };

  handlePress = async () => {
    const {
      dispatchLike,
      navigation: {
        state: {
          params: { handleTakePress }
        }
      }
    } = this.props;
    const { isLiked } = this.state;
    const result = dispatchLike(isLiked);
    handleTakePress(result);
    if (result) {
      if (isLiked) {
        this.setState(prevState => {
          return {
            isLiked: false,
            likeCount: prevState.likeCount - 1
          };
        });
      } else {
        this.setState(prevState => {
          return {
            isLiked: true,
            likeCount: prevState.likeCount + 1
          };
        });
      }
    } else {
    }
  };
  render() {
    const { navigation, dispatchLike } = this.props;
    const { isLiked, likeCount } = this.state;
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
        dispatchLike={dispatchLike}
        isLiked={isLiked}
        likeCount={likeCount}
        handlePress={this.handlePress}
      />
    );
  }
}

export default PostDetailContainer;
