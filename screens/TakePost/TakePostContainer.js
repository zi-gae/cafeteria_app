import React, { Component } from "react";
import TakePostPresenter from "./TakePostPresenter";
import PropTypes from "prop-types";

class TakePostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      />
    );
  }
}

export default TakePostContainer;
