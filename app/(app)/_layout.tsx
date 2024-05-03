import { View, Text, SafeAreaView } from "react-native";
import { useSupabase } from "../../context/useSupabase";

export default function Index() {
  const { logout } = useSupabase();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text
        onPress={() => {
          console.log("Sign out button pressed!");
          logout();
        }}
      >
        You're in!
      </Text>
    </SafeAreaView>
  );
}
