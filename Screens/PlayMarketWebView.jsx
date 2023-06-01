import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import useStopPlay from '../utils/useStopPlay';
import { useNavigation } from '@react-navigation/native';

const PlayMarketWebView = ({ playStatus, setPlaying }) => {
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

  useStopPlay({ playStatus, setPlaying, navigation });

  return (
    <WebView
      userAgent={userAgentRef.current ?? ''}
      source={{
        uri: 'https://play.google.com/store/apps/details?id=com.kovalenkoandrii.GPTmobile',
      }}
    />
  );
};

export default PlayMarketWebView;
