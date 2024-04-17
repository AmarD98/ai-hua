import { View, Text } from "react-native";
import SpeakingPractice from "../../../components/SpeakingPractice";

export default function Tab() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <SpeakingPractice />
    </View>
  );
}
