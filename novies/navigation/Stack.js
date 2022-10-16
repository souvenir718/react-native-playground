import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BLACK_COLOR } from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        headerTitleStyle: { color: isDark ? "white" : BLACK_COLOR },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontWeight:'700', color: isDark ? "white" : BLACK_COLOR}}>뒤로</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
