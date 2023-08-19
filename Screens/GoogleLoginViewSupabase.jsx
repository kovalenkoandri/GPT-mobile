import { useEffect } from 'react';
import { Button, Text } from 'react-native';
import { styles } from '../styles';
import * as WebBrowser from 'expo-web-browser';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { userAgent, userInfoFetch } from '../redux/gpt/gptOperations';

WebBrowser.maybeCompleteAuthSession();
// const supabaseUrl = 'https://ztcowxckjwprilhggkat.supabase.co';

const GoogleLoginView = () => {
  // const [session, setSession] = useState();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.gpt);
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
    // let url = 'https://20dc-178-133-41-71.eu.ngrok.io/';
    // 'http://localhost:3000/';
    // console.log(supabase.auth);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://exp.host/@kovalenkoandrii/GPT-mobile/',
      },
    });
    error && console.log(error);
    if (data.url) {
      dispatch(userInfoFetch(data.url));
      ExpoSecureStoreAdapter.setItem('dataUrl', data.url);
    }
  }
  useEffect(() => {
    (async () => {
      dispatch(userAgent());
      const dataUrl = await ExpoSecureStoreAdapter.getItem('dataUrl');
      dataUrl && dispatch(userInfoFetch(dataUrl));
    })();
  }, []);

  return (
    <>
      {!userInfo && (
        <Button title="Sign in with Google" onPress={signInWithGoogle} />
      )}
    </>
  );
};

export default GoogleLoginView;
