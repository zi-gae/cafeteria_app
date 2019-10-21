import RicePostContainer from "./RicePostContainer";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const {
    crawlers: { rice }
  } = state;

  return {
    rice
  };
};

export default connect(mapStateToProps)(RicePostContainer);
