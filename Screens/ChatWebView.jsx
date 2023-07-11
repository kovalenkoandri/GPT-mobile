import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useStopPlay from '../hooks/useStopPlay';
import useUserAgent from '../hooks/useUserAgent';
import { useNavigation } from '@react-navigation/native';
import { onFetchUpdateAsync } from '../utils/checkUpdates';

const ChatWebView = ({
  scrollViewRef,
  userAgentRef,
  playStatus,
  setPlaying,
}) => {
  const navigation = useNavigation();
  useUserAgent({ scrollViewRef, userAgentRef });
  useStopPlay({ playStatus, setPlaying, navigation });

  useEffect(() => {
    onFetchUpdateAsync();
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
