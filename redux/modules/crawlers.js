import axios from "axios";
import { actionCreators as userActions } from "./user";
import { URL } from "../../constants";

const OUT_DORMITORY = "OUT_DORMITORY";
const GET_RICE = "GET_RICE";

const dormitoryOut = dormitoryOutState => {
  return {
    type: OUT_DORMITORY,
    dormitoryOutState
  };
};

const reqeustGetRice = rice => {
  return {
    type: GET_RICE,
    rice
  };
};

const postDormitoryOut = (
  collegeStudentId,
  collegeStudentPwd,
  dormitoryOutStartDay,
  dormitoryOutEndtDay,
  dormitoryOutReason
) => {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    const res = await axios({
      url: "/crawler/dormitory/",
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "application/json"
      },
      data: {
        tu_id: collegeStudentId,
        tu_password: collegeStudentPwd,
        first_day: dormitoryOutStartDay,
        second_day: dormitoryOutEndtDay,
        apply_text: dormitoryOutReason
      }
    });
    const {
      data: { message }
    } = res;
    if (message.includes("비밀번호 입력")) {
      dispatch(dormitoryOut("pwdwrong"));
      return "pwdwrong";
    } else if (message.includes("비밀번호 5회")) {
      dispatch(dormitoryOut("idlock"));
    } else if (message.includes("같은 기간에")) {
      dispatch(dormitoryOut("overlap"));
    } else if (message.includes("생활관생만")) {
      dispatch(dormitoryOut("notaccess"));
    } else {
      dispatch(dormitoryOut("success"));
    }
  };
};

const getRice = () => {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const res = await axios({
      url: `${URL}/crawler/rice/`,
      method: "get",
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    if (res.status === 200) {
      dispatch(reqeustGetRice(res.data));
    } else {
      dispatch(userActions.logout());
    }
  };
};

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OUT_DORMITORY:
      return applyDormitoryOut(state, action);
    case GET_RICE:
      return applyGetRice(state, action);
    default:
      return state;
  }
};

const applyDormitoryOut = (state, action) => {
  const { dormitoryOutState } = action;
  return {
    ...state,
    dormitoryOutState: dormitoryOutState
  };
};

const applyGetRice = (state, action) => {
  const { rice } = action;
  return {
    ...state,
    rice
  };
};

const actionCreators = {
  postDormitoryOut,
  getRice
};

export { actionCreators };

// default reducer export

export default reducer;
