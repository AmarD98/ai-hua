import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSupabase } from "../../../context/useSupabase";

export default function TabLayout() {
  const { isLoggedIn } = useSupabase();
  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="speaking"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="speaking"
        options={{
          title: "Speaking",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="spatial-audio-off" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: "Vocabulary",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="language" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listening"
        options={{
          title: "Listen",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="assistive-listening-systems"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cogs" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
