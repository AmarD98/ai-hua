import React, { useState } from "react";
import { Button, Text } from "react-native";
import { useMutation } from "@tanstack/react-query";
import * as Speech from "expo-speech";

interface ChatResponse {
  choices: [
    {
      message: {
        content: string;
      };
    }
  ];
}

async function fetchChatGPTResponse(promptText: string): Promise<ChatResponse> {
  console.log("Sending the following prompt to ChatGPT: ", promptText);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"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"}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptText }],
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export default function ChatGPTQueryComponent() {
  const [textResponse, setTextResponse] = useState("");

  const { mutate: fetchResponse } = useMutation({
    mutationFn: fetchChatGPTResponse,
    onSuccess: (data: ChatResponse) => {
      const reply = data.choices[0].message.content;
      setTextResponse(reply);
      Speech.speak(reply, { language: "zh-CN" });
    },
  });

  const handlePress = () => {
    fetchResponse("Help me learn Chinese please!");
  };

  return (
    <>
      <Button title="Ask ChatGPT" onPress={handlePress} />
      {textResponse && <Text>{textResponse}</Text>}
    </>
  );
}
