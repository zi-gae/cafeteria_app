import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FitImage from "react-native-fit-image";
import { SafeAreaView } from "react-navigation";
import CameraRollPicker from "react-native-camera-roll-picker";

const Container = styled.View`
  flex: 1;
`;
const ImageContainer = styled.View`
  flex: 1.5;
  justify-content: center;
`;
const ScrollView = styled.ScrollView``;
const PhotoContainer = styled.View`
  flex: 1;
`;
const FitImg = styled(FitImage)`
  border-radius: 20;
`;
const NotFountImage = styled.Text``;

const LibraryPresenter = ({ pickedPhoto, setChoicedPhoto }) => {
  return (
    <Container>
      {pickedPhoto.length > 1 && (
        <ImageContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            {pickedPhoto ? (
              <FitImg resizeMode="contain" source={{ uri: pickedPhoto }} />
            ) : (
              <NotFountImage>이미지가 없어요.</NotFountImage>
            )}
          </ScrollView>
        </ImageContainer>
      )}
      <PhotoContainer>
        <CameraRollPicker
          groupTypes="All"
          emptyText="사진이 없어요 ㅠ"
          imagesPerRow={4}
          selectSingleItem={true}
          imageMargin={2}
          callback={(arrPhoto, objPhoto) => setChoicedPhoto(objPhoto)}
        />
      </PhotoContainer>
      <SafeAreaView />
    </Container>
  );
};

LibraryPresenter.propTypes = {};

export default LibraryPresenter;
