import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const IconBox = styled.View`
  align-items: center;
  justify-content: center;
`;
const Touch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${RFValue(40)};
  height: ${RFValue(40)};
`;
const Text = styled.Text`
  font-size: ${RFValue(9)};
`;
const View = styled.View`
  background-color: #f2f2f2;
  border-radius: 20px;
`;

const index = ({ name, size, color, type, kind, url, navigate }) => (
  <IconBox>
    <View>
      <Touch
        onPress={() =>
          navigate("WebView", {
            url
          })
        }
      >
        {type === "Ii" ? (
          <Ionicons name={name} size={RFValue(size)} color={color} />
        ) : (
          <FontAwesome name={name} size={RFValue(size)} color={color} />
        )}
      </Touch>
    </View>
    <Text>{kind}</Text>
  </IconBox>
);

index.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default index;
