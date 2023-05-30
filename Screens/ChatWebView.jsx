import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const ChatWebView = () => {
  const scrollViewRef = useRef(null);
  const userAgentRef = useRef('');

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
    <WebView
      userAgent={userAgentRef.current ?? ''}
      source={{ uri: 'https://chat.openai.com' }}
    />
  );
};

export default ChatWebView;

// https://chat.openai.com/?model=text-davinci-002-render-sha