import { actionCreators as userActions } from "./user";
import { URL } from "../../constants";
import { Alert } from "react-native";

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
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    return fetch(`${URL}/crawler/dormitory/`, {
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        tu_id: collegeStudentId,
        tu_password: collegeStudentPwd,
        first_day: dormitoryOutStartDay,
        second_day: dormitoryOutEndtDay,
        apply_text: dormitoryOutReason
      })
    })
      .then(res => {
        if (res.status === 401) {
          Alert.alert("알림💡", "권힌이 없어요! 로그인 후 실행해 주세요ㅠ", [
            { text: "OK", onPress: () => {} }
          ]);
        } else if (res.status === 500) {
          dispatch(dormitoryOut("error"));
        } else {
          return res.json();
        }
      })
      .then(json => {
        const { message } = json;
        if (message.includes("비밀번호 입력")) {
          return "pwdwrong";
        } else if (message.includes("비밀번호 5회")) {
          return "idlock";
        } else if (message.includes("같은 기간에")) {
          return "overlap";
        } else if (message.includes("생활관생만")) {
          return "notaccess";
        } else if (message.includes("날짜")) {
          return "error";
        } else if (message.includes("이내로")) {
          return "applyOver";
        } else {
          return "success";
        }
      });
  };
};

const getRice = () => {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${URL}/crawler/rice/`, {
      method: "get",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          dispatch(userActions.logOut());
        }
      })
      .then(json => {
        return dispatch(reqeustGetRice(json));
      });
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
