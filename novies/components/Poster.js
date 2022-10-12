import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const PosterImage = styled.Image`
  width: 110px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Poster = ({ path }) => {
  return <PosterImage source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
