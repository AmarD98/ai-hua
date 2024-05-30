import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import { router } from "expo-router";

export default function Tab() {
  // Placeholder function for onPress event
  const handlePress = (topic: string) => {
    console.log(`Navigate to ${topic}`);
    // Here you would navigate to the respective component based on the topic
    // For example, using React Navigation: navigation.navigate('TopicScreen', { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Progress</Text>
      <Pressable
        style={styles.progressContainer}
        onPress={() => handlePress("Speaking")}
      >
        <Text style={styles.label}>Speaking</Text>
        <Progress.Circle
          style={styles.progressCircle}
          size={60}
          progress={0.75}
        />
      </Pressable>
      <Pressable
        style={styles.progressContainer}
        onPress={() => handlePress("Vocabulary")}
      >
        <Text style={styles.label}>Vocabulary</Text>
        <Progress.Circle
          style={styles.progressCircle}
          size={60}
          progress={0.5}
        />
      </Pressable>
      <Pressable
        style={styles.progressContainer}
        onPress={() => handlePress("Listening")}
      >
        <Text style={styles.label}>Listening</Text>
        <Progress.Circle
          style={styles.progressCircle}
          size={60}
          progress={0.2}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start", // Align items to the start (left)
    justifyContent: "flex-start", // Justify content to the start (top)
    paddingTop: 20, // Add padding at the top
    paddingLeft: 20, // Add padding on the left
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%", // Ensure the Pressable takes the full width for easier pressing
  },
  label: {
    marginRight: 10,
  },
  progressCircle: {
    alignSelf: "auto",
  },
});
