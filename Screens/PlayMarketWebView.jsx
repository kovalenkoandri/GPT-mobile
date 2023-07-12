import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useStopPlay from '../hooks/useStopPlay';
import useUserAgent from '../hooks/useUserAgent';
import { useNavigation } from '@react-navigation/native';

const PlayMarketWebView = ({
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
      userAgent={userAgentRef.current ?? ''}
      originWhitelist={['*']}
      source={{
        uri: 'https://play.google.com/store/apps/details?id=com.kovalenkoandrii.GPTmobile',
      }}
    />
  );
};

export default PlayMarketWebView;
