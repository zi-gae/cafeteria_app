import { connect } from "react-redux";
import HomeContainer from "./HomeContainer";
import { actionCreators as postActions } from "../../redux/modules/posts";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as crawlerActions } from "../../redux/modules/crawlers";

const mapStateToProps = (state, ownProps) => {
  const {
    posts: { post },
    crawlers
  } = state;
  return {
    post,
    crawlers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initApp: () => {
      dispatch(crawlerActions.getRice());
      dispatch(postActions.emptySearch());
      dispatch(userActions.getNotification());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
