import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import Voice from "@react-native-voice/voice";

const SpeakingPractice = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      console.log(event);
      setTranscript(event.value ? event.value[0] : "");
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      stopPlayback(); // Ensure audio is stopped when component unmounts
    };
  }, []);

  async function startRecording() {
    try {
      await stopPlayback(); // Stop any current playback
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
        await Voice.start("en-US");
      } else {
        setTranscript("Permission to use microphone is denied.");
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }

  async function stopRecording() {
    if (recording) {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
      await Voice.stop();
    }
  }

  async function playRecording() {
    if (audioUri && !isPlaying) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(playbackStatusUpdate);
    }
  }

  const playbackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      // Handle error state or unloaded state
      if (status.error) {
        console.log(`Playback error: ${status.error}`);
      }
    } else if (!status.isPlaying) {
      setIsPlaying(false);
      stopPlayback();
    }
  };

  async function stopPlayback() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sentence}>
        {transcript || "Press record to start speaking"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>
      {audioUri && !isRecording && (
        <TouchableOpacity style={styles.button} onPress={playRecording}>
          <Text style={styles.buttonText}>
            {isPlaying ? "Playing..." : "Play Recording"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  sentence: {
    fontSize: 18,
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
});

export default SpeakingPractice;
