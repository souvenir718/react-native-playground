import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0px 20px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 70%;
`;
const Title = styled.Text`
  color: white;
  width: 95%;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 95%;
`;

const HMedia = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle}</Title>
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}

          <Overview>
            {overview !== "" && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableWithoutFeedback>
  );
};

export default HMedia;
