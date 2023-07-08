import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import useStopPlay from '../hooks/useStopPlay';
import useUserAgent from '../hooks/useUserAgent';

const BrowseKeyWebView = ({
  playStatus,
  setPlaying,
  scrollViewRef,
  userAgentRef,
}) => {
  const navigation = useNavigation();

  useUserAgent({ scrollViewRef, userAgentRef });
  useStopPlay({ playStatus, setPlaying, navigation });

  return (
    <WebView
      originWhitelist={['*']}
      userAgent={userAgentRef.current ?? ''}
      source={{ uri: 'https://platform.openai.com/account/api-keys' }}
    />
  );
};

export default BrowseKeyWebView;
