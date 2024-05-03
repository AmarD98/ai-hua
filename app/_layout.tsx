import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { SupabaseProvider } from "../context/SupabaseProvider";
import { useSupabase } from "../context/useSupabase";

const InitialLayout = () => {
  const { isLoggedIn } = useSupabase();
  const segments = useSegments();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false); // Define how this should be set

  useEffect(() => {
    // Initialization logic here, set 'initialized' appropriately
    setInitialized(true); // Example, should be based on actual initialization logic

    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isLoggedIn) {
      console.log("Logged in, redirecting to /app...");
      router.replace("/app");
    } else {
      console.log("Not logged in redirecting back to /");
      router.replace("/");
    }
  }, [isLoggedIn, initialized, segments]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <SupabaseProvider>
      <Slot />
    </SupabaseProvider>
  );
};

export default RootLayout;
