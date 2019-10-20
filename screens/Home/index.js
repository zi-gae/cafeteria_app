import { connect } from "react-redux";
import HomeContainer from "./HomeContainer";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const {
    posts: { post }
  } = state;

  return {
    post
  };
};

export default connect(mapStateToProps)(HomeContainer);
