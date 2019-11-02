import React, { Component } from "react";
import PostDetailPresenter from "./PostDetailPresenter";
import PropTypes from "prop-types";
import styled from "styled-components";
import NavButton from "../NavButton";
import { LIGTH_GREEN } from "../../constants/Color";
import { Keyboard } from "react-native";
import { Alert } from "react-native";

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.navigation.state.params.isLiked,
      likeCount: props.navigation.state.params.likeCount,
      anonymousIsChecked: true,
      keyboardView: false,
      message: "",
      postDetail: this.choicePost(),
      referComment: 0,
      placeholder: "댓글 입력"
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerTitle: <Title>자유게시판</Title>,
    headerLeft: (
      <NavButton
        iconName="ios-close"
        color={LIGTH_GREEN}
        onPress={() => navigation.goBack(null)}
      />
    )
  });

  static propTypes = {
    dispatchLike: PropTypes.func.isRequired,
    disaptchCommentPost: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (this._keyboardDidShow = this._keyboardDidShow.bind(this))
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (this._keyboardDidHide = this._keyboardDidHide.bind(this))
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({
      keyboardView: true
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboardView: false,
      placeholder: "댓글 입력"
    });
  }

  onChangeComment = text => {
    this.setState({
      message: text
    });
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
      return false;
    }
  };

  handlePlaceholderChange = () => {
    this.setState({
      placeholder: "대댓글 입력"
    });
  };

  handleCheckBox = () => {
    const { anonymousIsChecked } = this.state;
    anonymousIsChecked
      ? this.setState({
          anonymousIsChecked: false
        })
      : this.setState({
          anonymousIsChecked: true
        });
  };

  setCommentId = id => {
    this.setState({
      referComment: id
    });
  };

  submitComment = async () => {
    const { disaptchCommentPost } = this.props;
    const { message, anonymousIsChecked, referComment } = this.state;
    if (message.length < 1) {
      Alert.alert("알림💡", "댓글을 입력해주세요!", [
        { text: "OK", onPress: () => {} }
      ]);
    } else {
      if (referComment === 0) {
        await disaptchCommentPost(message, anonymousIsChecked);
      } else {
        await disaptchCommentPost(message, anonymousIsChecked, referComment);
      }
      this.setState({
        postDetail: this.choicePost(),
        message: "",
        referComment: 0
      });
    }
  };

  choicePost = () => {
    let sample = this.props.posts.posts.filter(
      info => info.id === this.props.navigation.state.params.id
    );
    sample = sample[0];
    return sample;
  };

  render() {
    const { dispatchLike } = this.props;
    const {
      isLiked,
      likeCount,
      anonymousIsChecked,
      keyboardView,
      message,
      postDetail,
      referComment,
      placeholder
    } = this.state;
    const {
      handlePress,
      handleCheckBox,
      onChangeComment,
      submitComment,
      handlePlaceholderChange,
      setCommentId
    } = this;
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
    } = postDetail;
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
        handlePress={handlePress}
        anonymousIsChecked={anonymousIsChecked}
        handleCheckBox={handleCheckBox}
        Keyboard={Keyboard}
        message={message}
        keyboardView={keyboardView}
        onChangeComment={onChangeComment}
        submitComment={submitComment}
        referComment={referComment}
        placeholder={placeholder}
        handlePlaceholderChange={handlePlaceholderChange}
        setCommentId={setCommentId}
      />
    );
  }
}

export default PostDetailContainer;
