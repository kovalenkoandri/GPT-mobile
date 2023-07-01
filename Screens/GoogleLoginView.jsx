import React, { useState, useEffect, useRef } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { Button, Text } from 'react-native';
import { styles } from '../styles';
import * as WebBrowser from 'expo-web-browser';
import useUserAgent from '../utils/useUserAgent';
import Constants, { ExecutionEnvironment } from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const GoogleLoginView = ({
  userInfo,
  setUserInfo,
  scrollViewRef,
  userAgentRef,
}) => {

  // const redirectUri = AuthSession.makeRedirectUri({
  //   // native: 'https://auth.expo.io/@kovalenkoandrii/GPT-mobile',
  //   native: 'com.kovalenkoandrii.GPTmobile://',
  // });
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId:
        '731236659578-dj8shkp0aj0tkmsnb70ro7f0t60iact1.apps.googleusercontent.com',
      webClientId:
        '731236659578-f9167hqeram9g6tqg82nqjrldjf8008s.apps.googleusercontent.com',
      expoClientId:
        '731236659578-f9167hqeram9g6tqg82nqjrldjf8008s.apps.googleusercontent.com',
      selectAccount: true,
      // redirectUri,
    },
    {
      projectNameForProxy: '@kovalenkoandrii/GPT-mobile',
    }
  );
  const [token, setToken] = useState('');

  useEffect(() => {
    if (response?.type === 'success' && response.authentication !== null) {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
    // console.log(request, response, promptAsync);
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
  useUserAgent({ scrollViewRef, userAgentRef });

  return (
    <>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync({
              projectNameForProxy: '@kovalenkoandrii/GPT-mobile',
              useProxy: false,
            });
          }}
        />
      ) : (
        <Text style={styles.userInfoName}>{userInfo.name}</Text>
      )}
    </>
  );
};

export default GoogleLoginView;
