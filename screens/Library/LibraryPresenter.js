import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FitImage from "react-native-fit-image";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-navigation";

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
const SmallPhoto = styled.Image`
  width: ${Layout.width / 3};
  height: ${Layout.height / 3};
`;
const PhotoBox = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LibraryPresenter = ({ photos, pickedPhoto }) => {
  return (
    <Container>
      {photos && (
        <ImageContainer>
          <FitImage source={{ uri: pickedPhoto.node.image.uri }}></FitImage>
        </ImageContainer>
      )}
      {photos && (
        <PhotoContainer>
          <ScrollView>
            <PhotoBox>
              {photos.map(photo => (
                <Touch>
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

export default LibraryPresenter;
