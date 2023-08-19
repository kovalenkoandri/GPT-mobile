import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  AppState,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as ada from '../utils/textAda001onAppLoad';
// import {
//   writeFileCacheDirectory,
//   saveStringPermissions,
// } from '../utils/saveString';
import { writeStringToStorage } from '../utils/saveStringToStorage';
import Constants from 'expo-constants';
import YoutubePlayer from 'react-native-youtube-iframe';

const PasteKey = ({ setIsTestKeyPassed, playing, setPlaying, playStatus }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const timerRef = useRef(null);
  const keyRef = useRef('');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      AppState.currentState = nextAppState;
      console.log(AppState.currentState);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const onStateChange = useCallback(state => {
    // console.log('onStateChange ' + state);
    // setPlayStatus(state);
    playStatus.current = state;
    if (state === 'ended') {
      setPlaying(false);
    }
    if (state === 'paused') {
      setPlaying(false);
    }
    // if (state === 'buffering') {
    //   setPlaying(false);
    // } // if uncomment endless cycle happens on rewind
    if (state === 'playing') {
      timerRef.current = setTimeout(() => {
        setPlaying(true);
      }, 50);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
        keyRef.current
      );
      if (gptResponse) {
        alert('Key is accepted. You can continue with chat or image requests.');
        setIsTestKeyPassed(true);
        writeStringToStorage(value);
        // writeFileCacheDirectory(value);
        // saveStringPermissions(value);
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
        <View style={styles.youtubePlayerContainer}>
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={'VPKlkgT7hSY'}
            onChangeState={onStateChange}
          />
        </View>
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
