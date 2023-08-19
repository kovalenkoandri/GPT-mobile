import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useStopPlay from '../hooks/useStopPlay';
import { useNavigation } from '@react-navigation/native';
import { onFetchUpdateAsync } from '../utils/checkUpdates';
import { useSelector } from 'react-redux';

const ChatWebView = ({ playStatus, setPlaying }) => {
  const navigation = useNavigation();
  const { userAgentRef } = useSelector(state => state.gpt);
  useStopPlay({ playStatus, setPlaying, navigation });

  useEffect(() => {
    !__DEV__ && onFetchUpdateAsync();
  }, []);

  return (
    <WebView
      originWhitelist={['*']}
      userAgent={userAgentRef ?? ''}
      source={{ uri: 'https://chat.openai.com' }}
    />
  );
};

export default ChatWebView;

// https://chat.openai.com/?model=text-davinci-002-render-sha
