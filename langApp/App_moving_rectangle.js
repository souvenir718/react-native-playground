import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// const Box = styled(Animated.createAnimatedComponent(TouchableOpacity))`
const Box = styled.View`
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  // const [up, setUp] = useState(false);
  const position = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  // const toggleUp = () => setUp((prev) => !prev);

  // const moveUp = () => {
  //   Animated.timing(position, {
  //     toValue: up ? 300 : -300,
  //     useNativeDriver: false,
  //     duration: 1000,
  //   }).start(toggleUp);
  // };

  //Interpolations
  // const opacity = Y_POSITION.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0.5, 1],
  // });
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // don't start 0, remember previous value
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
        // Animated.spring(position, {
        //   toValue: {
        //     x: 0,
        //     y: 0
        //   },
        //   bounciness: 10,
        //   useNativeDriver: false,
        // }).start()
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          backgroundColor: bgColor,
          borderRadius,
          // opacity,
          transform: [
            // { rotateY: rotation },
            // { rotateX: rotation },
            ...position.getTranslateTransform(),
          ],
        }}
      />
    </Container>
  );
}
