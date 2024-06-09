import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  console.log("Tab layout rendered");
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="speaking"
        options={{
          title: "Speaking",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="spatial-audio-off" size={24} color={color} />
          ),
          href: "/speaking",
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: "Vocabulary",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="language" size={24} color={color} />
          ),
          href: "/vocabulary",
        }}
      />
      <Tabs.Screen
        name="listening"
        options={{
          title: "Listening",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="assistive-listening-systems"
              size={24}
              color={color}
            />
          ),
          href: "/listening",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cogs" size={24} color={color} />
          ),
          href: "/settings",
        }}
      />
    </Tabs>
  );
}
