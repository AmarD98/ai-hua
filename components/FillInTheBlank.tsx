import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FillInTheBlankProps {
  sentence: string;
  options: string[];
  correctAnswer: string;
  onCompletion: (isCorrect: boolean) => void;
}

export default function FillInTheBlank({
  sentence,
  options,
  correctAnswer,
  onCompletion,
}: FillInTheBlankProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string>("");

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    // Check answer immediately upon selection
    checkAnswer(option);
  };

  const checkAnswer = (option: string) => {
    if (option === correctAnswer) {
      setAnswerFeedback("Correct!");
      onCompletion(true);
    } else {
      setAnswerFeedback("Incorrect, try again!");
      onCompletion(false);
    }
  };

  const renderSentence = () => {
    if (selectedOption) {
      return sentence.replace("_", selectedOption);
    }
    return sentence.replace("_", "________");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sentence}>{renderSentence()}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionPress(option)}
            // Remove disabled property to allow re-selection
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.feedbackText}>{answerFeedback}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  sentence: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: "#dddddd",
    padding: 10,
    marginHorizontal: 5,
  },
  optionText: {
    fontSize: 16,
  },
  feedbackText: {
    fontSize: 16,
    color: "green",
    margin: 10,
  },
});
