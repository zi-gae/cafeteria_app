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
      postDetail: this.props.postInfo,
      referComment: 0,
      placeholder: "댓글 입력",
      isCommentSubmitting: false,
      isPhotoSubmitting: false
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
    dispatchCommentPost: PropTypes.func.isRequired,
    dispatchCommentDelete: PropTypes.func.isRequired,
    dispatchOnCommentPost: PropTypes.func.isRequired,
    dispatchPutPost: PropTypes.func.isRequired,
    dispatchDeletePost: PropTypes.func.isRequired,
    push_token: PropTypes.string.isRequired
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
      },
      push_token
    } = this.props;
    const { isLiked } = this.state;
    const result = dispatchLike(push_token, isLiked);
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

  removeComment = async commentId => {
    const { dispatchCommentDelete } = this.props;

    Alert.alert("삭제 확인", "삭제하시겠어요?", [
      {
        text: "취소",
        onPress: () => {}
      },
      {
        text: "확인",
        onPress: async () => {
          this.setState({
            isSubmitting: true
          });
          await dispatchCommentDelete(commentId);
          this.setState({
            isSubmitting: false
          });
        }
      }
    ]);
  };

  submitComment = async () => {
    const {
      dispatchCommentPost,
      dispatchOnCommentPost,
      push_token
    } = this.props;
    const { message, anonymousIsChecked, referComment } = this.state;
    this.setState({
      isSubmitting: true
    });
    if (message.length < 1) {
      Alert.alert("알림💡", "댓글을 입력해주세요!", [
        { text: "확인", onPress: () => {} }
      ]);
    } else {
      if (referComment === 0) {
        await dispatchCommentPost(message, anonymousIsChecked, push_token);
      } else {
        await dispatchOnCommentPost(
          referComment,
          message,
          anonymousIsChecked,
          referComment,
          push_token
        );
      }
      this.setState({
        message: "",
        referComment: 0,
        isSubmitting: false
      });
    }
  };

  handleSheetPress = index => {
    const {
      navigation: { navigate, goBack },
      dispatchDeletePost,
      postInfo: { content, file, title, anonymous, id }
    } = this.props;

    if (index === 1) {
      navigate("WritePost", {
        id,
        content,
        image: file,
        title,
        writeType: "글 수정",
        anonymous,
        handleSuccessButton: this.handleSuccessButton
      });
    } else if (index === 2) {
      Alert.alert("삭제 확인", "삭제하시겠어요?", [
        {
          text: "취소",
          onPress: () => {}
        },
        {
          text: "확인",
          onPress: () => {
            goBack(null);
            dispatchDeletePost();
          }
        }
      ]);
    }
  };

  handleSuccessButton = async (title, content, image, anonymous) => {
    const { dispatchPutPost } = this.props;
    this.setState({
      isPhotoSubmitting: true
    });
    await dispatchPutPost(title, content, image, anonymous);
    this.setState({
      isPhotoSubmitting: false
    });
  };

  render() {
    const { dispatchLike } = this.props;
    const {
      isLiked,
      likeCount,
      anonymousIsChecked,
      keyboardView,
      message,
      referComment,
      placeholder,
      isSubmitting,
      isPhotoSubmitting
    } = this.state;
    const {
      handlePress,
      handleCheckBox,
      onChangeComment,
      submitComment,
      handlePlaceholderChange,
      setCommentId,
      handleSheetPress,
      removeComment
    } = this;
    const {
      postInfo: {
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
      },
      user: { profile }
    } = this.props;

    return (
      <PostDetailPresenter
        anonymous={anonymous}
        comment_count={comment_count}
        comments={comments}
        content={content}
        creator={creator}
        image={file}
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
        removeComment={removeComment}
        isSubmitting={isSubmitting}
        handleSheetPress={handleSheetPress}
        profile={profile}
        isPhotoSubmitting={isPhotoSubmitting}
      />
    );
  }
}

export default PostDetailContainer;
