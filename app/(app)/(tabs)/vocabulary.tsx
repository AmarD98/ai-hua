import { View, Text, StyleSheet } from "react-native";
import Flashcard from "../../../components/Flashcard";
import React from "react";

export default function Tab() {
  const wordData = {
    Chinese: "爱",
    Pinyin: "ài",
    English: "love",
    ExampleSentence: "我爱你。",
    ExampleSentencePinyin: "Wǒ ài nǐ.",
    ExampleSentenceEnglish: "I love you.",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vocabulary Practice!</Text>
      <Flashcard wordData={wordData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});
