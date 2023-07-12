import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useStopPlay from '../hooks/useStopPlay';
import useUserAgent from '../hooks/useUserAgent';
import { useNavigation } from '@react-navigation/native';

const ImageGenerateWebView = ({
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
      source={{ uri: 'https://labs.openai.com/' }}
    />
  );
};

export default ImageGenerateWebView;
