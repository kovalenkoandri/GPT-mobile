import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { onFetchUpdateAsync } from '../utils/checkUpdates';
import { useSelector } from 'react-redux';

const ChatWebView = () => {
  const { userAgentRef } = useSelector(state => state.gpt);

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
