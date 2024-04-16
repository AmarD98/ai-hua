import React, { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "../supabase/supabaseClient"; // Adjust the path as necessary
import { useStorageState } from "./useStorageState";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Configure Google Signin
GoogleSignin.configure({
  scopes: ["email"], // Adjust scopes according to your needs
  webClientId: "YOUR_WEB_CLIENT_ID", // Use the appropriate client ID for the platform
  offlineAccess: true,
});

export function useSession() {
  const context = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!context) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return context;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  useEffect(() => {
    // Check session on mount
    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setSession(session);
        } else {
          setSession(null);
        }
      }
    );

    return () => {
      listener.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    const currentSession = supabase.auth.session();
    setSession(currentSession);
    setLoading(false);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data: supabaseSession, error } =
          await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.idToken,
          });
        if (error) throw error;
        setSession(supabaseSession);
      }
    } catch (error) {
      console.error("SignIn error:", error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      await GoogleSignin.signOut();
      setSession(null);
    } catch (error) {
      console.error("SignOut error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
