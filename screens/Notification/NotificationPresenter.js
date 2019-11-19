import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
import { LIGHT_GREY } from "../../constants/Color";
import Layout from "../../constants/Layout";
import Notification from "../../components/Notification";

const ScrollContainer = styled.ScrollView`
  margin-top: 10px;
`;
const ActivityIndicator = styled.ActivityIndicator`
  align-self: center;
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

const NotificationPresenter = ({
  notification,
  isFetching,
  refresh,
  handleNotificationLength,
  notificationLength,
  fetchNotification,
  isCloseToBottom
}) => (
  <ScrollContainer
    showsVerticalScrollIndicator={false}
    onScroll={({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) {
        handleNotificationLength();
      }
    }}
    scrollEventThrottle={16}
    refreshControl={
      <RefreshControl
        refreshing={isFetching}
        onRefresh={refresh}
        tintColor={"black"}
      />
    }
  >
    <PostContainer>
      {notification === undefined ? (
        <GuideBox>
          <FontAwesome name={"bell-o"} size={RFValue(50)} color={LIGHT_GREY} />
          <GuideText>알림이 없네요..</GuideText>
        </GuideBox>
      ) : notification.length < 1 ? (
        <GuideBox>
          <FontAwesome name={"bell-o"} size={RFValue(50)} color={LIGHT_GREY} />
          <GuideText>알림이 없네요..</GuideText>
        </GuideBox>
      ) : (
        notification.map((notification, index) => {
          if (index < notificationLength) {
            return <Notification {...notification} key={index} />;
          } else {
            return null;
          }
        })
      )}
    </PostContainer>
    {fetchNotification ? (
      <ActivityIndicator size="small" color="black" />
    ) : null}
  </ScrollContainer>
);

NotificationPresenter.propTypes = {
  notification: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  handleNotificationLength: PropTypes.func.isRequired,
  notificationLength: PropTypes.number.isRequired,
  fetchNotification: PropTypes.bool.isRequired,
  isCloseToBottom: PropTypes.func.isRequired
};

export default NotificationPresenter;
