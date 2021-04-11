import * as React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";
import { StyleSheet, TextInput, View } from "react-native";
import { clamp } from "../utils/clamp";
import { COLOR } from "../consts";

/**
 * Make Circle and TextInput animatable.
 */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

type CircularProgressProps = {
  progress: Animated.SharedValue<number>;
  sliderWidth: Animated.SharedValue<number>;
  radius?: number;
  strokeWidth?: number;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  sliderWidth,
  radius = 100,
  strokeWidth = 10,
}) => {
  // Derived values
  const CIRCUMFERENCE = 2 * Math.PI * radius;
  const HALF_WIDTH = radius + strokeWidth;

  /**
   * Animated input props
   */
  const animatedInputProps = useAnimatedProps(() => {
    const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);

    return {
      text: `${Math.round(100 * percentComplete)}`,
      color: interpolateColor(
        percentComplete,
        [0, 0.5, 1],
        [COLOR, COLOR, "white"],
      ),
    };
  });

  /**
   * Animated progress props. Animate strokeDashOffset to handle animation
   */
  const animatedProgressProps = useAnimatedProps(() => {
    const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
    return {
      strokeDashoffset: (1 - percentComplete) * CIRCUMFERENCE,
    };
  });

  /**
   * Animated BG props. Animate color/opacity.
   */
  const animatedBgProps = useAnimatedProps(() => {
    const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
    return {
      fillOpacity: interpolate(percentComplete, [0, 1], [0.2, 0.75]),
    };
  });

  return (
    <View>
      <View style={{ width: radius * 2, height: radius * 2 }}>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`${-HALF_WIDTH} ${-HALF_WIDTH} ${2 * HALF_WIDTH} ${
            2 * HALF_WIDTH
          }`}
        >
          <G rotation="-90">
            {/* Progress */}
            <AnimatedCircle
              cx={0}
              cy={0}
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProgressProps}
              stroke={COLOR}
            />
            {/* Background */}
            <AnimatedCircle
              cx={0}
              cy={0}
              r={radius}
              stroke="rgb(180,180,180)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeOpacity="0.1"
              animatedProps={animatedBgProps}
              fill={COLOR}
            />
          </G>
        </Svg>
        <AnimatedInput
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFill,
            {
              fontSize: radius / 2,
              fontWeight: "500",
              textAlign: "center",
              textShadowColor: "black",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            },
          ]}
          // @ts-ignore
          animatedProps={animatedInputProps}
        />
      </View>
    </View>
  );
};
