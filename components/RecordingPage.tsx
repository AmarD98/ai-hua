import React, { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { Audio } from "expo-av";

export default function RecordingPage() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [lastRecordingUri, setLastRecordingUri] = useState<string | null>(null);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync();
      await newRecording.startAsync();
      setRecording(newRecording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (recording) {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      setRecording(null);
      setLastRecordingUri(uri); // Save the last recording's URI
    } else {
      console.log("No recording to stop");
    }
  }

  async function playRecording() {
    if (lastRecordingUri) {
      console.log("Playing back recording from", lastRecordingUri);
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync({ uri: lastRecordingUri });
        await sound.playAsync();
      } catch (error) {
        console.error("Failed to play the recording", error);
      }
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Play Recording"
          onPress={playRecording}
          disabled={!lastRecordingUri} // Disable the button if there's no recording to play
        />
      </View>
    </SafeAreaView>
  );
}
