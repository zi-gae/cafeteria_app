import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FitImage from "react-native-fit-image";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-navigation";
import { RFValue } from "react-native-responsive-fontsize";

const Container = styled.View`
  flex: 1;
`;
const ImageContainer = styled.View`
  flex: 2;
  justify-content: center;
`;
const ScrollView = styled.ScrollView``;
const PhotoContainer = styled.View`
  flex: 1;
`;
const Touch = styled.TouchableOpacity``;
const FitImg = styled(FitImage)`
  border-radius: 20;
`;
const Action = styled.View`
  background-color: transparent;
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-self: flex-end;
  position: absolute;
  bottom: 10;
`;
const SmallPhoto = styled(FitImage)`
  width: ${Layout.width / 4};
  height: ${Layout.width / 4};
`;
const PhotoBox = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LibraryPresenter = ({ photos, pickedPhoto, pickPhoto }) => {
  return (
    <Container>
      {photos && (
        <ImageContainer>
          <FitImg
            resizeMode="contain"
            source={{ uri: pickedPhoto.node.image.uri }}
          />
        </ImageContainer>
      )}
      {photos && (
        <PhotoContainer>
          <ScrollView showsVerticalScrollIndicator={true}>
            <PhotoBox>
              {photos.map((photo, index) => (
                <Touch
                  key={index}
                  onPress={() => {
                    pickPhoto(photo);
                  }}
                >
                  <SmallPhoto source={{ uri: photo.node.image.uri }} />
                </Touch>
              ))}
            </PhotoBox>
          </ScrollView>
        </PhotoContainer>
      )}
      <SafeAreaView />
    </Container>
  );
};

LibraryPresenter.propTypes = {
  pickedPhoto: PropTypes.object,
  photos: PropTypes.array,
  pickPhoto: PropTypes.func.isRequired
};

export default LibraryPresenter;
