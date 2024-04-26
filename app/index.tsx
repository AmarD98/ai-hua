import React, { useState } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../supabase/supabaseClient";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Determine the correct client ID based on the platform
  const clientId = Platform.select({
    android:
      "963568773459-0nccace4vnf3ugh8qo1kdeaiuse86v0c.apps.googleusercontent.com",
    ios: "963568773459-r4rrdvfnts88bfvau69mgjg0pluqmnsb.apps.googleusercontent.com",
  });

  // Configure the Google Signin module with the determined client ID
  GoogleSignin.configure({
    scopes: ["email"], // Adjust the scopes according to your need; 'email' is typically required
    webClientId: clientId, // Use the platform-specific client ID
    offlineAccess: true, // If you need to access Google API when the user is offline
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        // Sign in with the Google ID token to Supabase
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });

        if (error) {
          throw error;
        }
        console.log("User data:", data);
      } else {
        throw new Error("Google login failed: No ID token returned");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert(
          "Login Cancelled",
          "User cancelled the Google sign-in process."
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign In", "Google sign-in is in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play Services", "Google Play Services not available.");
      } else {
        console.error("Google sign-in error:", error);
        Alert.alert("Login Error", "An error occurred during Google sign-in.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
