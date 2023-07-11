import React, { useState, useEffect, useRef } from 'react';
import { Button, Text } from 'react-native';
import { styles } from '../styles';
import * as WebBrowser from 'expo-web-browser';
import useUserAgent from '../hooks/useUserAgent';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();
// const supabaseUrl = 'https://ztcowxckjwprilhggkat.supabase.co';

const GoogleLoginView = ({
  userInfo,
  setUserInfo,
  scrollViewRef,
  userAgentRef,
}) => {
  // const [session, setSession] = useState();
  const ExpoSecureStoreAdapter = {
    getItem: key => {
      return SecureStore.getItemAsync(key);
    },
    setItem: (key, value) => {
      SecureStore.setItemAsync(key, value);
    },
    removeItem: key => {
      SecureStore.deleteItemAsync(key);
    },
  };
  useUserAgent({ scrollViewRef, userAgentRef });
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    'https://ztcowxckjwprilhggkat.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Y293eGNrandwcmlsaGdna2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1OTA2NDYsImV4cCI6MjAwMjE2NjY0Nn0.HHH5z4dbhl4fr4tjnRpzW1OwP6GMU72hreeMTCMAv8s',
    {
      // localStorage: AsyncStorage,
      localStorage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    }
  );

  async function signInWithGoogle() {
    const getURL = () => {
      // let url = 'https://20dc-178-133-41-71.eu.ngrok.io/';
      let url = 'https://exp.host/@kovalenkoandrii/GPT-mobile/';
      // 'http://localhost:3000/';
      // Make sure to include `https://` when not localhost.
      url = url.includes('http') ? url : `https://${url}`;
      // Make sure to including trailing `/`.
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
      return url;
    };
    // console.log(supabase.auth);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL(),
      },
    });
    error && console.log(error);
    if (data.url) {
      // const { hostname, path, queryParams } = Linking.parse(data.url);

      // console.log(
      //   `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
      //     queryParams
      //   )}`
      // );
      setUserInfo(data.url);
      ExpoSecureStoreAdapter.setItem('dataUrl', data.url);
    }
  }
  useEffect(() => {
    !userInfo && signInWithGoogle();
    (async () => {
      const dataUrl = await ExpoSecureStoreAdapter.getItem('dataUrl');
      dataUrl && setUserInfo(dataUrl);
    })();
  }, []);
  useUserAgent({ scrollViewRef, userAgentRef });

  return (
    <>
      {userInfo === null ? (
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
      ) : (
        <Text style={styles.userInfoName}>{userInfo.name}</Text>
      )}
    </>
  );
};

export default GoogleLoginView;
