import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

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
      originWhitelist={['*']}
      userAgent={userAgentRef.current ?? ''}
      source={{ uri: 'https://chat.openai.com' }}
    />
  );
};

export default ChatWebView;

// https://chat.openai.com/?model=text-davinci-002-render-sha
