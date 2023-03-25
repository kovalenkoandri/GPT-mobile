import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

interface IApiResponse {
  result: string;
}
interface ChatMessage {
  animal: string;
  data: string;
}
export default function App(): JSX.Element {
  const [value, setValue] = useState<string>(''); // The type annotation :string after the variable name response specifies that the state variable should be of type
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // The interface is then used as a type annotation for the generic type parameter of the useState hook. Specifically, the useState hook is declared with an initial state value of an empty array ([]) of objects that conform to the ChatMessage interface.
  const inputHandler = (animal: string) => {
    animal.trim();
    if (animal.length > 128) {
     return setValue(animal.slice(0, 128));
    }
    return setValue(animal);
  };
  const loadingStyle =
    value.length === 0 || value.length > 128
      ? { backgroundColor: '#f8634b' }
      : {};

  const onSubmit = async () => {
    try {
      setLoading(true);
      // The axios.post method returns a Promise that resolves with the response data. The await keyword is used to wait for the Promise to resolve before continuing execution.

      // The <IApiResponse> syntax specifies the expected response type of the API call. It is a type parameter for the post method that tells TypeScript what shape the response data should have.
      const gptResponse = await axios.post<IApiResponse>(
        'https://gpt-back.onrender.com/api/generate',
        {
          animal: value,
        }
      );
      const data = gptResponse.data.result;
      setResponse(data);
      setChatHistory([...chatHistory, { animal: value, data }]);
      setValue('');
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          // behavior='position'
          behavior="padding"
          // behavior="height"
        >
          <ScrollView style={styles.scrollView}>
            {chatHistory.map((chatItem, index) => (
              <View key={index} style={styles.chatItem}>
                <Text style={styles.chatRequest}>{chatItem.animal}</Text>
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
                style={[styles.sendButton, loadingStyle]}
                activeOpacity={0.6}
              >
                <Text style={styles.sendButtonText}>
                  {loading
                    ? 'Loading...'
                    : value.length === 0
                    ? 'too short'
                    : value.length > 128
                    ? 'TOO LONG'
                    : 'Send'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
