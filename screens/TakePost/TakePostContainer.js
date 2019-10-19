import React, { Component } from "react";
import { View, Text } from "react-native";
import TakePostPresenter from "./TakePostPresenter";

class TakePostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);

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
      is_vertical
    } = this.props;
    return (
      <View>
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
          is_vertical={is_vertical}
        />
      </View>
    );
  }
}

export default TakePostContainer;
