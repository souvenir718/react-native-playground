import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const PosterImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Poster = ({ path }) => {
  return <PosterImage source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
