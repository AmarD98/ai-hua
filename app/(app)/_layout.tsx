import { View, Text, SafeAreaView } from "react-native";
import { useSupabase } from "../../context/useSupabase";
import { Stack } from "expo-router";

export default function Index() {
  const { logout } = useSupabase();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
