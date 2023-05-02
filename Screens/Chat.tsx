import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Env } from '../Env';
import * as Speech from 'expo-speech';

const apiUrl = Env.API_ENDPOINTS;

interface ChatMessage {
  prompt: string;
  data: string;
}

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messageToDelete, setMessageToDelete] = useState<number>(-1);
  const scrollViewRef = useRef<TextInput>(null);

  const inputHandler = (prompt: string) => {
    prompt.trim();
    if (prompt.length > 256) {
      return setValue(prompt.slice(0, 256));
    }
    return setValue(prompt);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const gptResponse = await axios.post(
        apiUrl.API_URL,
        {
          prompt: value,
        },
        { timeout: 1000 }
      );
      const data = gptResponse.data.toString();
      setChatHistory([...chatHistory, { prompt: value, data }]);
      setValue('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.focus();
    }
  }, [chatHistory]);

  const speak = async (thingToSay: any) => {
    Speech.speak(thingToSay);
  };
  const stopSpeak = async (thingToSay: any) => {
    Speech.stop(thingToSay);
  };

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {chatHistory.map((chatItem, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
            <Text style={styles.chatResponse}>{chatItem.data}</Text>
            <View style={styles.talkView}>
              <TouchableOpacity
                onPress={() => speak(chatItem.data)}
                style={styles.showSpeechButton}
              >
                <Text style={styles.showSpeechButtonText}>Start talking</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => stopSpeak(chatItem.data)}
                style={styles.showStopTalkButton}
              >
                <Text style={styles.showStopTalkButtonText}>Stop talking</Text>
              </TouchableOpacity>
            </View>
            {messageToDelete !== index && (
              <>
                <TouchableOpacity
                  style={styles.showDeleteButton}
                  onPress={() => {
                    setMessageToDelete(index);
                    const newChatHistory = [...chatHistory];
                    newChatHistory.splice(index, 1);
                    setChatHistory(newChatHistory);
                    setMessageToDelete(-1);
                  }}
                >
                  <Text style={styles.showDeleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}

        <View style={styles.inputContainer}>
          <TextInput
            ref={scrollViewRef}
            placeholder="Type from 5 symbols"
            placeholderTextColor="#f1f6ff"
            value={value}
            onChangeText={inputHandler}
            style={styles.input}
            multiline={true}
            onBlur={() => {
              if (value.length >= 5) {
                Keyboard.dismiss();
                onSubmit();
              }
            }}
          />
          <TouchableOpacity
            disabled={loading || value.length < 5}
            activeOpacity={0.6}
            accessibilityLabel="Send button"
            style={styles.buttonSend}
          >
            {value.length >= 5 && <SendIcon />}
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </ScrollView>
    </>
  );
};
export default Chat;
