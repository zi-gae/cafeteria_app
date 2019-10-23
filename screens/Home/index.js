import { connect } from "react-redux";
import HomeContainer from "./HomeContainer";

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

export default connect(mapStateToProps)(HomeContainer);
