import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

// Define a type for the wordData prop
type WordData = {
  Chinese: string;
  Pinyin: string;
  English: string;
  ExampleSentence: string;
  ExampleSentencePinyin: string;
  ExampleSentenceEnglish: string;
};

// Define a type for the props that the Flashcard component expects
interface FlashcardProps {
  wordData: WordData;
}

const Flashcard = ({ wordData }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const handleFlip = () => {
    if (isFlipped) {
      // Flip to front
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      // Flip to back
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"], // Flip by 180 degrees
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"], // Start from 180 and flip to 360 degrees
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <Text style={styles.text}>
          {wordData.Chinese} ({wordData.Pinyin})
        </Text>
        <Text style={styles.text}>Sentence: {wordData.ExampleSentence}</Text>
        <Text style={styles.text}>
          Sentence (Pinyin): {wordData.ExampleSentencePinyin}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.text}>{wordData.English}</Text>
        <Text style={styles.text}>
          Sentence: {wordData.ExampleSentenceEnglish}
        </Text>
      </Animated.View>
      <TouchableOpacity onPress={handleFlip} style={styles.button}>
        <Text>{isFlipped ? "Show Chinese" : "Show English"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  card: {
    width: 300,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    backfaceVisibility: "hidden", // Hide the back of the view
  },
  cardBack: {
    position: "absolute", // Position it over the front card
    top: 0,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
});
export default Flashcard;
