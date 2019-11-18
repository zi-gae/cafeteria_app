import RicePostContainer from "./RicePostContainer";
import { connect } from "react-redux";
import { actionCreators as crawlerActions } from "../../redux/modules/crawlers";

const mapStateToProps = (state, ownProps) => {
  const {
    crawlers: { rice }
  } = state;
  return {
    rice
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRice: () => {
      dispatch(crawlerActions.getRice());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RicePostContainer);
