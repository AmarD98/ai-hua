import { View, Text, SafeAreaView } from "react-native";
import FillInTheBlank from "../../../components/FillInTheBlank";

export default function Tab() {
  const sentence = "我_去商店"; // Example sentence with a blank
  const options = ["是", "不", "要"]; // Options for the blank
  const correctAnswer = "要"; // Correct option

  const handleCompletion = (isCorrect: boolean) => {
    console.log(
      isCorrect ? "User answered correctly!" : "User answered incorrectly."
    );
  };

  return (
    <div>
      <Text>Show some lessons here!</Text>
    </div>
  );
}
