import React, { Component } from "react";
import TakePostPresenter from "./TakePostPresenter";

class TakePostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.is_liked,
      likeCount: props.like_count
    };
  }
  handleTakePress = result => {
    const { isLiked, likeCount } = this.state;
    if (result) {
      if (isLiked) {
        this.setState({
          isLiked: false,
          likeCount: likeCount - 1
        });
      } else {
        this.setState({
          isLiked: true,
          likeCount: likeCount + 1
        });
      }
    }
  };
  render() {
    const {
      id,
      anonymous,
      comment_count,
      comments,
      content,
      creator,
      file,
      kinds,
      like_count,
      natural_time,
      title,
      is_liked,
      navigation
    } = this.props;
    const { isLiked, likeCount } = this.state;

    return (
      <TakePostPresenter
        id={id}
        anonymous={anonymous}
        comment_count={comment_count}
        comments={comments}
        content={content}
        creator={creator}
        file={file}
        kinds={kinds}
        like_count={like_count}
        natural_time={natural_time}
        title={title}
        is_liked={is_liked}
        navigation={navigation}
        handleTakePress={this.handleTakePress}
        isLiked={isLiked}
        likeCount={likeCount}
      />
    );
  }
}

export default TakePostContainer;
