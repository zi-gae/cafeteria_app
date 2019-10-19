import React from "react";
import TimeStampPresenter from "./TimeStampPresenter";

const TimeStampContainer = ({ time }) => {
  time = time.replace("ago", "전");
  time = time.replace("minutes", "분");
  time = time.replace("a minute", "1분");
  time = time.replace("now", "지금");
  time = time.replace("hours", "시간");
  time = time.replace("hour", "시간");
  time = time.replace("an", "한");
  time = time.replace("seconds", "초");
  time = time.replace("a seconds", "1초");
  time = time.replace("a day", "1일");
  time = time.replace("days", "일");
  time = time.replace("a week", "1주");
  time = time.replace("weeks", "주");
  time = time.replace("month", "달");

  return <TimeStampPresenter time={time} />;
};

export default TimeStampContainer;
