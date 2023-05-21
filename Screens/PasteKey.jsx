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

const PasteKey = ({ setIsTestKeyPassed, keyRef }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const insideImage = require('../assets/images/button.webp');
  const scrollViewRef = useRef(null);
  const userAgentRef = useRef('');
  const navigation = useNavigation();
  const inputHandler = prompt => {
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

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        <ImageBackground source={insideImage} style={styles.imageBackground}>
          <TouchableOpacity onPress={() => navigation.navigate('BrowseKey')}>
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
    </>
  );
};
export default PasteKey;
