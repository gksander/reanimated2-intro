import * as React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { COLOR } from "../consts";
import { View } from "react-native";

type SliderProps = {
  barWidth: Animated.SharedValue<number>;
  progress: Animated.SharedValue<number>;
};

export const Slider: React.FC<SliderProps> = ({ barWidth, progress }) => {
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = progress.value;
    },
    onActive: (event, ctx) => {
      progress.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      progress.value = withSpring(0);
    },
  });

  const barHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value }],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(234,234,234)",
        justifyContent: "flex-end",
        borderRadius: 10,
      }}
      onLayout={(e) => {
        barWidth.value = e.nativeEvent.layout.width;
      }}
    >
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              width: 20,
              backgroundColor: COLOR,
              borderRadius: 10,
              position: "absolute",
              bottom: -20,
              top: -20,
            },
            barHandleStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};
