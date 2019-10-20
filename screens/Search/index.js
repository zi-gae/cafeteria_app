import SearchContainer from "./SearchContainer";
import { connect } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const {
    posts: { search }
  } = state;

  return {
    search
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchByTerm: term => {
      dispatch(postActions.getSearch(term));
    },
    emptySearch: () => {
      dispatch(postActions.emptySearch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
