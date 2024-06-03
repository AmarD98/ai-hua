import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const InitialLayout = async () => {
  const segments = useSegments();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false); // Define how this should be set
  const { data } = await supabase.auth.getUser();

  useEffect(() => {
    // Initialization logic here, set 'initialized' appropriately
    setInitialized(true); // Example, should be based on actual initialization logic

    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (true) {
      console.log("Logged in, redirecting to /app...");
      router.replace("/app");
    } else {
      console.log("Not logged in redirecting back to /");
      router.replace("/");
    }
  }, [initialized, segments]);

  return <Slot />;
};

const RootLayout = () => {
  return <Slot />;
};

export default RootLayout;
