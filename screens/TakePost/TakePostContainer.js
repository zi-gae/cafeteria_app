import React, { Component } from "react";
import { Alert } from "react-native";
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

  handleNavigatePostDetail = navigation => {
    const {
      id,
      anonymous,
      comment_count,
      comments,
      content,
      creator,
      file,
      kinds,
      natural_time,
      title
    } = this.props;
    const { handleTakePress } = this;
    const { likeCount, isLiked } = this.state;

    navigation.navigate("PostDetail", {
      id,
      anonymous,
      comment_count,
      comments,
      content,
      creator,
      file,
      kinds,
      likeCount,
      natural_time,
      title,
      isLiked,
      handleTakePress
    });
  };

  alertAccessAuthentication = navigation => {
    Alert.alert("알림💡", "재학생 인증 후에 시도 해주세오", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Profile");
        }
      }
    ]);
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
      navigation,
      univAuthentication
    } = this.props;
    const { isLiked, likeCount } = this.state;
    const {
      alertAccessAuthentication,
      handleNavigatePostDetail,
      handleTakePress
    } = this;

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
        handleTakePress={handleTakePress}
        isLiked={isLiked}
        likeCount={likeCount}
        alertAccessAuthentication={alertAccessAuthentication}
        univAuthentication={univAuthentication}
        handleNavigatePostDetail={handleNavigatePostDetail}
      />
    );
  }
}

export default TakePostContainer;
