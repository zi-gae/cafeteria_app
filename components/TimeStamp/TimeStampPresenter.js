import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LIGHT_GREY } from "../../constants/Color";
import { RFValue } from "react-native-responsive-fontsize";

const TimeStamp = styled.Text`
  color: ${LIGHT_GREY};
  font-size: ${props => (props.list ? `${RFValue(11)}` : "13px")};
`;

const TimeStampPresenter = ({ list, time }) => (
  <TimeStamp list={list}>{time}</TimeStamp>
);

TimeStampPresenter.propTypes = {
  list: PropTypes.bool,
  time: PropTypes.string.isRequired
};

export default TimeStampPresenter;
