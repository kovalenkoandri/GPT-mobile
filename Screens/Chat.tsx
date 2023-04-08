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
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
interface ChatMessage {
  requestMobile: string;
  data: string;
}
interface IApiResponse {
  result: string;
}
const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // The interface is then used as a type annotation for the generic type parameter of the useState hook. Specifically, the useState hook is declared with an initial state value of an empty array ([]) of objects that conform to the ChatMessage interface.
  const [value, setValue] = useState<string>(''); // The type annotation :string after the variable name response specifies that the state variable should be of type
  const [loading, setLoading] = useState<boolean>(false);

  const inputHandler = (requestMobile: string) => {
    requestMobile.trim();
    if (requestMobile.length > 64) {
      return setValue(requestMobile.slice(0, 64));
    }
    return setValue(requestMobile);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      // The axios.post method returns a Promise that resolves with the response data. The await keyword is used to wait for the Promise to resolve before continuing execution.

      // The <IApiResponse> syntax specifies the expected response type of the API call. It is a type parameter for the post method that tells TypeScript what shape the response data should have.
      const gptResponse = await axios.post<IApiResponse>(
        'https://gpt-back.onrender.com/api/generate',
        // 'http://127.0.0.1:3005/api/generate',
        {
          requestMobile: value,
        }
      );
      const data = gptResponse.data.result;
      // setResponse(data);
      setChatHistory([...chatHistory, { requestMobile: value, data }]);
      setValue('');
      console.log(data);
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
              <Text style={styles.chatRequest}>{chatItem.requestMobile}</Text>
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

export default Chat;
// TouchableWithoutFeedback onPress={Keyboard.dismiss}