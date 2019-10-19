import React from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { LIGTH_GREEN, DARK_BLUE } from "../../constants/Color";
import { withNavigation } from "react-navigation";

const PostActionsPresenter = ({ isLiked, size }) => (
  <View>
    <View>
      <TouchableOpacity>
        <View>
          {isLiked ? (
            <Ionicons name={"ios-heart"} size={15} color={LIGTH_GREEN} />
          ) : (
            <Ionicons name={"ios-heart-empty"} size={15} color={LIGTH_GREEN} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <EvilIcons name={"comment"} size={15} color={DARK_BLUE} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

PostsActionsPresenter.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired
};

export default withNavigation(PostActionsPresenter);
