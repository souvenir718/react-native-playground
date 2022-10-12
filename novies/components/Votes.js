import React from "react";
import styled from "styled-components/native";

const VoteText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes = ({ votes }) => {
  return (
    <VoteText>
      {votes > 0 ? `⭐️ ${votes.toFixed(1)} / 10` : `Coming soon`}
    </VoteText>
  );
};

export default Votes;
