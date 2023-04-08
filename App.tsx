import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from './styles';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';
import Chat from './Screens/Chat';
import Image from './Screens/Image';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
interface IApiResponse {
  result: string;
}

SplashScreen.preventAutoHideAsync();
export default function App(): JSX.Element {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function onColdBoot() {
      try {
        const gptResponse = await axios.post<IApiResponse>(
          'https://gpt-back.onrender.com/api/generate',
          // 'http://127.0.0.1:3005/api/generate',
          {
            requestMobile: '', // fix for cold boot, if removed wait for response up to 8s
          }
        );
        const data = gptResponse.data.result;
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    onColdBoot();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <></>;
  }
  const routing = useRoute();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={styles.container}
        onLayout={onLayoutRootView}
        accessibilityHint="Splash screen while loading sends http request for improving performance. It takes up to 20 seconds."
      >
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}
