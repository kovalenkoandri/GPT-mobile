import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const PlayMarketWebView = () => {
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
      source={{
        uri: 'https://play.google.com/store/apps/details?id=com.kovalenkoandrii.GPTmobile',
      }}
    />
  );
};

export default PlayMarketWebView;
