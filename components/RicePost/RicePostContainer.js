import React, { PureComponent } from "react";
import RicePresenter from "./RicePresenter";
import PropTypes from "prop-types";

class RicePostContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rice, type, title } = this.props;
    let formattingRice = [];
    if (rice) {
      const keys = Object.keys(rice);
      for (let i in keys) {
        if (rice[keys[i]].length > 0) {
          formattingRice.push([keys[i], ...rice[keys[i]]]);
        }
      }
    }
    const studentFoodStore = formattingRice.filter(
      rice =>
        rice[0] !== "교직원식단" && rice[0] !== "조식" && rice[0] !== "석식"
    );
    const professorFoodStore = formattingRice.filter(
      rice => rice[0] === "교직원식단"
    );

    const dormitoryFoodStore = formattingRice.filter(
      rice => rice[0] === "조식" || rice[0] === "석식"
    );

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // const yyyy = today.getFullYear();
    today = mm + "월 " + dd + "일";

    let rices;
    if (type === "student") {
      rices = studentFoodStore;
    } else if (type === "professor") {
      rices = [dormitoryFoodStore[0].filter((rice, index) => index !== 0)];
    } else if (type === "dormitory") {
      rices = dormitoryFoodStore;
    }

    return <RicePresenter rices={rices} today={today} title={title} />;
  }
}

RicePostContainer.propTypes = {
  rice: PropTypes.object.isRequired
};

export default RicePostContainer;
