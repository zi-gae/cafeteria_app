import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LIGHT_GREY } from "../../constants/Color";

const TimeStamp = styled.Text`
  color: ${LIGHT_GREY};
`;

const TimeStampPresenter = ({ time }) => <TimeStamp>{time}</TimeStamp>;
TimeStampPresenter.propTypes = {
  time: PropTypes.string.isRequired
};

export default TimeStampPresenter;
