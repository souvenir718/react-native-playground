import AppLoading from "expo-app-loading/build";
import React, { useState } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./sing.png"),
      // "https://d33wubrfki0l68.cloudfront.net/4245a6b338cc1b008aa1265c213c1e75be207801/2eaf7/img/oss_logo.svg",
    ]);
    await Promise.all([...fonts, ...images]);
  };
  // when I want to use thems in NavigationContainer, use this
  // const isDark = useColorScheme() === "dark";

  if (!ready)
    return (
      <AppLoading
        onFinish={onFinish}
        onError={console.error}
        startAsync={startLoading}
      />
    );

  return (
    // <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}

/**
 * 단순히 preloading만 할경우에는 아래를 이용
 * 위의 경우에서는 loading 과정에서 내가 원하는 행동을 할 수 있다.
 */
/*
export default function App() {
  const [assets] = useAssets(require("./sing.png"));
  const [loaded] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded)
    return (
      <AppLoading
      />
    );

  return <Text>Success!!</Text>;
}*/
