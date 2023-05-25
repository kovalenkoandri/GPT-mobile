import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import useStopPlay from '../utils/useStopPlay';

const BrowseKey = ({ playStatus, setPlaying }) => {
  const scrollViewRef = useRef(null);
  const userAgentRef = useRef('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserAgent = async () => {
      userAgentRef.current = await Constants.getWebViewUserAgentAsync();
    };
    fetchUserAgent();
    if (scrollViewRef.current) {
      scrollViewRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   const handleTabPress = () => {
  //     if (
  //       playStatus === 'playing' 
  //     ) {
  //       setPlaying(prev => !prev);
  //     }
  //   };

  //   const unsubscribePlay = navigation.addListener('tabPress', handleTabPress);

  //   handleTabPress();

  //   return unsubscribePlay;
  // }, [navigation]); // moved to useStopPlay hook
  
  useStopPlay({playStatus, setPlaying, navigation});
  return (
    <WebView
      userAgent={userAgentRef.current ?? ''}
      source={{ uri: 'https://platform.openai.com/account/api-keys' }}
    />
  );
};

export default BrowseKey;
