import React, { useState, useEffect, useRef } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { Button, Text } from 'react-native';
import { styles } from '../styles';
import * as WebBrowser from 'expo-web-browser';
import useUserAgent from '../utils/useUserAgent';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();
// const supabaseUrl = 'https://ztcowxckjwprilhggkat.supabase.co';
// const googleSignIn = async () => {
//   // This will create a redirectUri
//   // This should be the URL you added to "Redirect URLs" in Supabase URL Configuration
//   // If they are different add the value of redirectUrl to your Supabase Redirect URLs
//   const redirectUri = makeRedirectUri({
//     path: '/auth/callback',
//   });

//   // authUrl: https://{YOUR_PROJECT_REFERENCE_ID}.supabase.co
//   // returnURL: the redirectUrl you created above.
//   const authResponse = await startAsync({
//     authUrl: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUri}`,
//     returnUrl: redirectUri,
//   });

//   // If the user successfully signs in
//   // we will have access to an accessToken and an refreshToken
//   // and then we'll use setSession (https://supabase.com/docs/reference/javascript/auth-setsession)
//   // to create a Supabase-session using these token
//   if (authResponse.type === 'success') {
//     supabase.auth.setSession({
//       access_token: authResponse.params.access_token,
//       refresh_token: authResponse.params.refresh_token,
//     });
//   }
// };

const GoogleLoginView = ({
  userInfo,
  setUserInfo,
  scrollViewRef,
  userAgentRef,
}) => {
  const ExpoSecureStoreAdapter = {
    getItem: (key) => {
      return SecureStore.getItemAsync(key);
    },
    setItem: (key, value) => {
      SecureStore.setItemAsync(key, value);
    },
    removeItem: (key) => {
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
      let url = 'https://exp.host/@kovalenkoandrii/GPT-mobile';
      // process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      // process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      // 'http://localhost:3000/';
      // Make sure to include `https://` when not localhost.
      url = url.includes('http') ? url : `https://${url}`;
      // Make sure to including trailing `/`.
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
      return url;
    };
    console.log(supabase.auth);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL(),
        // queryParams: {
        //   access_type: 'offline',
        //   prompt: 'consent',
        //   // hd: 'domain.com',
        // },
      },
    });
    console.log(data);
    console.log(error);
    //  Linking.openURL(data.url);
    // googleSignIn();
    //  WebBrowser.openBrowserAsync(data.url);
    if (data.url) {
      const { hostname, path, queryParams } = Linking.parse(data.url);

      console.log(
        `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
          queryParams
        )}`
      );
      setUserInfo(data.url);
    }
  }
  // console.log(authResponse);
  async function signout() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }
  

  useUserAgent({ scrollViewRef, userAgentRef });

  return (
    <>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          // disabled={!request}
          onPress={signInWithGoogle}
          // onPress={signout}
        />
      ) : (
        <Text style={styles.text}>{userInfo.name}</Text>
      )}
    </>
  );
};

export default GoogleLoginView;
