import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarStyle: { backgroundColor: "tomato" },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "purple",
        headerTitleStyle: { color: "tomato" },
        headerRight: () => (
          <View>
            <Text>Right</Text>
          </View>
        ),
      }}
      //   screenOptions={{ tabBarLabelStyle: { fontWeight: "bold" } }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        // options={{ tabBarLabelStyle: { backgroundColor: "blue" } }}
      />
      <Tab.Screen name="TV" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
