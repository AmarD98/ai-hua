// SupabaseProvider.tsx
import { createClient } from "@supabase/supabase-js";
import { SupabaseContext } from "./SupabaseContext";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL; // Your Supabase project URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY; // Your Supabase project anon key

// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavigationReady, setNavigationReady] = useState(false);

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoggedIn(true);
  };

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("/sign-in");
    if (error) throw error;
    setLoggedIn(false);
  };

  const checkIfUserIsLoggedIn = async () => {
    const result = await supabase.auth.getSession();
    setLoggedIn(result.data.session !== null);
    setNavigationReady(true);
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const handleGoogleSignIn = async () => {
    console.log("Signing in with Google");
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.configure({
        webClientId:
          "963568773459-8bvhf5guu6lok2dqvguo1629pmelgp9d.apps.googleusercontent.com",
      });

      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
        setLoggedIn(true);
        console.log(error, data);
      } else {
        throw new Error("No id token!");
      }
    } catch (error) {
      // Handle error here
      console.log(error);
    }
  };

  const setOAuthSession = async (tokens: {
    access_token: string;
    refresh_token: string;
  }) => {
    const { data, error } = await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    if (error) {
      throw error;
    }

    setLoggedIn(data.session !== null);
  };

  return (
    <SupabaseContext.Provider
      value={{
        isLoggedIn,
        login,
        register,
        forgotPassword,
        logout,
        handleGoogleSignIn,
        setOAuthSession,
      }}
    >
      {isNavigationReady ? props.children : null}
    </SupabaseContext.Provider>
  );
};
