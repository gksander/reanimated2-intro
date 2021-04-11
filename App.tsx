import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { CircularProgress } from "./components/CircularProgress";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "./components/Slider";

const App: React.FC = () => {
  /**
   * Keep track of slider width (we'll measure that),
   * and progress (which we'll manage with gestures)
   */
  const sliderWidth = useSharedValue(0);
  const progress = useSharedValue(0);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress {...{ progress, sliderWidth }} />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 40,
            paddingVertical: 20,
            height: 80,
            marginBottom: 20,
          }}
        >
          <Slider {...{ sliderWidth, progress }} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;
