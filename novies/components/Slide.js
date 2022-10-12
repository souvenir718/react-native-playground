import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Votes from "./Votes";

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
  margin-left: 15px;
`;
const BgImg = styled.Image``;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const OverView = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Slide = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView intensity={95} style={StyleSheet.absoluteFill}>
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            <Votes votes={voteAverage}/>
            <OverView>{overview.slice(0, 100)}...</OverView>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
