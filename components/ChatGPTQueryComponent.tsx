import React, { useState } from "react";
import { Button, Text } from "react-native";
import { useMutation } from "@tanstack/react-query";
import * as Speech from "expo-speech";
import { supabase } from "../supabase/supabaseClient";

async function fetchChatGPTResponse(promptText: string) {
  console.log(
    "Sending the following prompt to ChatGPT via Supabase Edge Function:",
    promptText
  );

  // Assuming you're authenticated and the Edge Function automatically handles Authorization
  const { data, error } = await supabase.functions.invoke(
    "fetchChatGPTResponse",
    {
      body: JSON.stringify({ prompt: promptText }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (error) {
    console.error("Error invoking Supabase Function:", error);
    throw new Error("Failed to fetch data from Supabase Function");
  }

  return data;
}

export default function ChatGPTQueryComponent() {
  const [textResponse, setTextResponse] = useState("");

  const { mutate: fetchResponse } = useMutation(fetchChatGPTResponse, {
    onSuccess: (data: { text: string }) => {
      // Parse the response according to your Edge Function's response structure
      // This example assumes a simple structure. Adjust based on your actual response.
      const reply = data?.text || "No response"; // Adjust 'text' based on your Edge Function's response
      setTextResponse(reply);
      Speech.speak(reply, { language: "zh-CN" });
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      setTextResponse("An error occurred while fetching the response.");
    },
  });

  const handlePress = () => {
    fetchResponse();
  };

  return (
    <>
      <Button title="Ask ChatGPT" onPress={handlePress} />
      {textResponse && <Text>{textResponse}</Text>}
    </>
  );
}
