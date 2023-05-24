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
// import {getUserAgent} from 'react-native-device-info';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const BrowseKey = ({ setPlaying }) => {
  const scrollViewRef = useRef(null);
  const userAgentRef = useRef('');
  const navigation = useNavigation();
 
  useEffect(() => {
    const fetchUserAgent = async () => {
      userAgentRef.current = await Constants.getWebViewUserAgentAsync();
      // console.log(await Constants.getWebViewUserAgentAsync());
    };
    fetchUserAgent();
    if (scrollViewRef.current) {
      scrollViewRef.current.focus();
    }
  }, []);
  return (
    <WebView
      userAgent={userAgentRef.current ?? ''}
      source={{ uri: 'https://platform.openai.com/account/api-keys' }}
    />
  );
};
export default BrowseKey;
