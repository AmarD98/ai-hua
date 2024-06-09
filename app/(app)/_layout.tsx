import "react-native-url-polyfill/auto";
import { SafeAreaView } from "react-native";
import { Redirect, Stack } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import AuthScreen from "../sign-in";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Acquired session!");
      console.log("Session data: ", session?.user);
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
      <AuthScreen />
    </SafeAreaView>
  );
}
