import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LIGHT_GREY } from "../../constants/Color";
import { RFValue } from "react-native-responsive-fontsize";
import Layout from "../../constants/Layout";
import { FontAwesome } from "@expo/vector-icons";
import Notification from "../../components/Notification";

const ScrollContainer = styled.ScrollView`
  margin-top: 10px;
`;

const PostContainer = styled.View`
  align-items: center;
`;
const NotFount = styled.Text`
  color: ${LIGHT_GREY};
  align-items: center;
  font-weight: 500;
  font-size: ${RFValue(17)};
  margin-top: ${Layout.height / 3};
`;
const GuideBox = styled.View`
  margin-top: ${Layout.height / 3};
  align-items: center;
  justify-content: center;
`;
const GuideText = styled.Text`
  margin-top: ${RFValue(10)};
  color: ${LIGHT_GREY};
  font-size: ${RFValue(17)};
  font-weight: 500;
`;
const RefreshControl = styled.RefreshControl``;

const NotificationPresenter = ({ notification, isFetching, OnRefresh }) => {
  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          OnRefresh={OnRefresh}
          tintColor={"black"}
        />
      }
    >
      <PostContainer>
        {notification.length === 0 && notification.length > 1 ? (
          <NotFount>알림이 없습니다.</NotFount>
        ) : notification.length === 0 ? (
          <GuideBox>
            <FontAwesome
              name={"bell-o"}
              size={RFValue(50)}
              color={LIGHT_GREY}
            />
            <GuideText>알림이 없네요..</GuideText>
          </GuideBox>
        ) : (
          notification.map((notification, i) => (
            <Notification {...notification} key={i} />
          ))
        )}
      </PostContainer>
    </ScrollContainer>
  );
};

NotificationPresenter.propTypes = {
  notification: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  OnRefresh: PropTypes.func.isRequired
};

export default NotificationPresenter;
