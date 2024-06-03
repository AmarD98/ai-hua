import React, { useState } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { supabase } from "../supabase/supabaseClient";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.idToken,
              });
              console.log(error, data);
              if (data.session)
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
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
