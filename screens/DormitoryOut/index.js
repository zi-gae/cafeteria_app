import DormitoryOutContainer from "./DormitoryOutContainer";
import { connect } from "react-redux";
import { actionCreators as crawlerActions } from "../../redux/modules/crawlers";

const mapStateToProps = (state, ownProps) => {
  const {
    crawlers: { dormitoryOutState },
    user
  } = state;
  return {
    dormitoryOutState,
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dormitoryOut: (
      collegeStudentId,
      collegeStudentPwd,
      dormitoryOutStartDay,
      dormitoryOutEndtDay,
      dormitoryOutReason
    ) => {
      dispatch(
        crawlerActions.postDormitoryOut(
          collegeStudentId,
          collegeStudentPwd,
          dormitoryOutStartDay,
          dormitoryOutEndtDay,
          dormitoryOutReason,
          ownProps.location
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DormitoryOutContainer);
