import { View, Text, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {session && session.user && <Text>{session.user.id}</Text>}

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
