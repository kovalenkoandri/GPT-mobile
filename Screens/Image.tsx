import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState } from 'react';
import axios from 'axios';
import { Env } from '../Env';
const apiUrl = Env.API_ENDPOINTS;
interface ChatMessage {
  prompt: string;
  data: string;
}
interface gptResponse {

}
const Image = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);  
  const [value, setValue] = useState<string>('');  
  const [loading, setLoading] = useState<boolean>(false);

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
       
      const gptResponse = await axios.post(apiUrl.API_IMAGE_URL, {
        prompt: value,
      });
      const data = gptResponse.data.data[0].url;
      console.log(data);
      setChatHistory([...chatHistory, { prompt: value, data }]);
      setValue('');
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior="height"
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          {chatHistory.map((chatItem, index) => (
            <View key={index} style={styles.chatItem}>
              <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
              <Text style={styles.chatResponse}>{chatItem.data}</Text>
            </View>
          ))}

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type your question"
              placeholderTextColor="#f1f6ff"
              value={value}
              onChangeText={inputHandler}
              style={styles.input}
              multiline={true}
            />
            <TouchableOpacity
              onPress={onSubmit}
              disabled={loading || value.length === 0}
              style={styles.sendButton}
              activeOpacity={0.6}
              accessibilityLabel="Send button"
            >
              {value.length > 0 && <SendIcon />}
            </TouchableOpacity>
            <View style={styles.sendButtonText}>
              {loading && <ActivityIndicator size="large" color="#fff" />}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Image;
