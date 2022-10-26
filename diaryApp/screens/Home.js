import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import {Ionicons} from "@expo/vector-icons"

const View = styled.View`
    flex: 1;
    padding: 0px 50px;
    padding-top: 100px;
    background-color: ${colors.bgColor};
`;
const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 36px;
    margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    right: 50px;
    background-color: ${colors.btnColor};
    width: 80px;
    height: 80px;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    elevation: 5;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
`;

const Home = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Title>My journal</Title>
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color='white' size={40}/>
      </Btn>
    </View>
  );
};

export default Home;
