import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { CircularProgress } from "./components/CircularProgress";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "./components/Slider";

const App: React.FC = () => {
  const barWidth = useSharedValue(0);
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
            <CircularProgress {...{ progress, barWidth }} />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            height: 100,
            marginBottom: 20,
          }}
        >
          <Slider {...{ barWidth, progress }} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;
