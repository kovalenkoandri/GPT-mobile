import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, Text } from 'react-native';
import { styles } from '../styles';
WebBrowser.maybeCompleteAuthSession();

const ChatWebView = () => {
  const scrollViewRef = useRef(null);
  const userAgentRef = useRef('');
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId:
        '731236659578-dj8shkp0aj0tkmsnb70ro7f0t60iact1.apps.googleusercontent.com',
      webClientId:
        '731236659578-f9167hqeram9g6tqg82nqjrldjf8008s.apps.googleusercontent.com',
      expoClientId:
        '731236659578-f9167hqeram9g6tqg82nqjrldjf8008s.apps.googleusercontent.com',
    },
    {
      projectNameForProxy: '@kovalenkoandrii/GPT-mobile',
    }
  );
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication !== null) {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      console.log('getUserInfo ' + error);
    }
  };
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
    <>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync({
              projectNameForProxy: '@kovalenkoandrii/GPT-mobile',
            });
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo.name}</Text>
      )}
      <WebView
        userAgent={userAgentRef.current ?? ''}
        source={{ uri: 'https://chat.openai.com' }}
        // source={{ uri: 'https://auth.expo.io' }}
      />
    </>
  );
};

export default ChatWebView;

// https://chat.openai.com/?model=text-davinci-002-render-sha
