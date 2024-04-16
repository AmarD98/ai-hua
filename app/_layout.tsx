import React, { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import { supabase } from "../supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";

export default function AppLayout() {
  // Initialize user as null for clarity and controlled behavior
  const [user, setUser] = useState<Session["user"] | undefined>();

  useEffect(() => {
    // Define an async function to fetch the current user
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting current session:", error);
        return;
      }
      console.log(data);
      console.log("Session: ", data.session?.user);
      setUser(data.session?.user);
    };

    // Call the fetchUser function
    fetchUser();

    // Set up the auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user);
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Stack>
      {user ? (
        // If the user is logged in, render the tabs
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        // If not logged in, show the authentication screen
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
