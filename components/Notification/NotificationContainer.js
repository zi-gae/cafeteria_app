import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import NotificationPresenter from "./NotificationPresenter";

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.image.is_liked,
      likeCount: props.image.like_count
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
    const { handleTakePress } = this;
    const { isLiked, likeCount } = this.state;
    const {
      comment,
      natural_time,
      notification_type,
      navigation,
      image: {
        id,
        anonymous,
        comment_count,
        comments,
        content,
        creator,
        file,
        kinds,
        natural_time: time,
        title
      }
    } = this.props;

    return (
      <NotificationPresenter
        comment={comment}
        notification_type={notification_type}
        id={id}
        anonymous={anonymous}
        comment_count={comment_count}
        comments={comments}
        content={content}
        creator={creator}
        file={file}
        kinds={kinds}
        likeCount={likeCount}
        time={natural_time}
        natural_time={time}
        title={title}
        isLiked={isLiked}
        navigation={navigation}
        handleTakePress={handleTakePress}
      />
    );
  }
}

export default withNavigation(NotificationContainer);
