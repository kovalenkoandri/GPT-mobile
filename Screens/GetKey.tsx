import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Image,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState, useEffect, useRef } from 'react';
import * as ada from '../utils/textAda001';
import { saveString } from '../utils/saveString';
import { writeFile } from '../utils/saveString';
import { A } from '@expo/html-elements';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const GetKey = ({ setIsTestKeyPassed, keyRef }: any) => {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const insideImage = require('../assets/images/button.webp');
  const scrollViewRef = useRef<TextInput>(null);
  const userAgentRef = useRef<string | null>('');
  const navigation = useNavigation();
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
      if (gptResponse) {
        alert('Key is accepted. You can continue with chat or image requests.');
        setIsTestKeyPassed(true);
        saveString(value);
        writeFile(value);
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
    const fetchUserAgent = async () => {
      userAgentRef.current = await Constants.getWebViewUserAgentAsync();
    };
    fetchUserAgent();
    if (scrollViewRef.current) {
      scrollViewRef.current.focus();
    }
  }, []);
  console.log(navigation);

  return (
    <>
      <StatusBar style="auto" />

      {prompt ? (
        <WebView
          userAgent={userAgentRef.current ?? ''}
          source={{ uri: 'https://platform.openai.com/account/api-keys' }}
        />
      ) : (
        <ScrollView style={styles.scrollView}>
          <ImageBackground source={insideImage} style={styles.imageBackground}>
            <TouchableOpacity
              // onPress={() => setPrompt(true)}
              onPress={() => 
                navigation.navigate('BrowseKey')
              }
              // href="https://platform.openai.com/account/api-keys"
            >
              <Text style={styles.imageBackgroundText}>
                Tap here to create new secret key
              </Text>
            </TouchableOpacity>
          </ImageBackground>
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
      )}
    </>
  );
};
export default GetKey;
