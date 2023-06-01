import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useStopPlay from '../utils/useStopPlay';
import useUserAgent from '../utils/useUserAgent';
import { useNavigation } from '@react-navigation/native';

const ChatWebView = ({
  scrollViewRef,
  userAgentRef,
  playStatus,
  setPlaying,
}) => {
  const navigation = useNavigation();
  useUserAgent({ scrollViewRef, userAgentRef });
  useStopPlay({ playStatus, setPlaying, navigation });

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
