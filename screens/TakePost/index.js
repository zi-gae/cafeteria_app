import TakePostContainer from "./TakePostContainer";
import { connect } from "react-redux";

mapDispatchToProps = (state, ownProps) => {
  const {
    user: {
      profile: { univ_authentication }
    }
  } = state;

  return {
    univ_authentication
  };
};

export default connect(mapDispatchToProps)(TakePostContainer);
