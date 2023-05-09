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
import * as ada from '../utils/textAda001';
import { saveString } from '../utils/saveString';
import { A } from '@expo/html-elements';

interface ChatMessage {
  prompt: string;
  data: string;
}
const GetKey = ({ setIsTestKeyPassed, keyRef }: any) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const scrollViewRef = useRef<TextInput>(null);
  const inputHandler = (prompt: string) => {
    prompt.trim();
    if (prompt.length > 51) {
      return setValue(prompt.slice(0, 51));
    }
    return setValue(prompt);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      keyRef.current = value;
      const gptResponse = await ada.default.fetch(
        'what is good for human',
        keyRef
      );
      if (gptResponse.length > 0) {
        alert('Key is accepted. You can continue with chat or image requests.');
        setIsTestKeyPassed(true);
        saveString(value);
      } else {
        setIsTestKeyPassed(false);
        alert('Invalid key passed. Try another key or payed plan.');
      }
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
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {chatHistory.map((chatItem, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
            <Text style={styles.chatResponse}>{chatItem.data}</Text>
            <View style={styles.talkView}></View>
          </View>
        ))}

        <A
          style={styles.input}
          href="https://platform.openai.com/account/api-keys"
        >
          Tap here to create new secret key
        </A>
        <A style={styles.input} href="https://youtu.be/VPKlkgT7hSY">
          Video tutorial
        </A>
        <Text style={styles.input}>
          Key example sk-OzGWpQSQqyqKh6GNKqpdT3BlbkFJg2Essrq3qP3k******q
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={scrollViewRef}
            placeholder="Paste here 51 symbols"
            placeholderTextColor="#f1f6ff"
            value={value}
            onChangeText={inputHandler}
            style={styles.input}
            multiline={true}
            onBlur={() => {
              if (value.length === 51) {
                Keyboard.dismiss();
                onSubmit();
              }
            }}
          />
          <TouchableOpacity
            disabled={loading || value.length !== 51}
            activeOpacity={0.6}
            accessibilityLabel="Send button"
            style={styles.buttonSend}
            onPress={onSubmit}
          >
            {value.length === 51 && <SendIcon />}
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </ScrollView>
    </>
  );
};
export default GetKey;
