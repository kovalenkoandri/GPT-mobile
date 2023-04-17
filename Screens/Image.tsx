import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Env } from '../Env';
const apiUrl = Env.API_ENDPOINTS;
interface ChatMessage {
  prompt: string;
  encodedBase64: string;
}

const ImageDalle = () => {
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
  let encodedBase64 = '';
  const onSubmit = async () => {
    try {
      setLoading(true);
      const gptResponse = await axios.post(apiUrl.API_IMAGE_URL, {
        prompt: value,
      });
      encodedBase64 = gptResponse.data.data[0].b64_json;
      setChatHistory([...chatHistory, { prompt: value, encodedBase64 }]);
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
  
  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {chatHistory.map((chatItem, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
            <Image
              style={styles.image}
              source={{
                uri: `data:image/png;base64,${chatItem.encodedBase64}`,
              }}
            />
            {messageToDelete !== index && (
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
            onPress={onSubmit}
            disabled={loading || value.length < 5}
            activeOpacity={0.6}
            accessibilityLabel="Send button"
          >
            {value.length >= 5 && <SendIcon />}
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </ScrollView>
    </>
  );
};

export default ImageDalle;
