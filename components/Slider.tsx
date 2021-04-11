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
  sliderWidth: Animated.SharedValue<number>;
  progress: Animated.SharedValue<number>;
};

/**
 * Custom slider control that uses gesture handlers
 */
export const Slider: React.FC<SliderProps> = ({ sliderWidth, progress }) => {
  /**
   * Create animated handler for pan gesture.
   */
  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startProgress: number }
  >({
    // On start, keep track of starting progress value.
    onStart: (_, ctx) => {
      ctx.startProgress = progress.value;
    },
    // On pan, new progress is the starting progress plus (change in position)
    onActive: (event, ctx) => {
      progress.value = ctx.startProgress + event.translationX;
    },
    // On pan-end, snap back to 0 or barWidth if out of bounds.
    onEnd: () => {
      if (progress.value > sliderWidth.value) {
        progress.value = withSpring(sliderWidth.value);
      } else if (progress.value < 0) {
        progress.value = withSpring(0);
      }
    },
  });

  /**
   * Animated style for handle, translated based on progress.
   */
  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value - HANDLE_WIDTH / 2 }],
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
        sliderWidth.value = e.nativeEvent.layout.width;
      }}
    >
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
          style={[
            {
              width: HANDLE_WIDTH,
              backgroundColor: COLOR,
              borderRadius: 10,
              position: "absolute",
              bottom: -20,
              top: -20,
            },
            animatedHandleStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const HANDLE_WIDTH = 20;
