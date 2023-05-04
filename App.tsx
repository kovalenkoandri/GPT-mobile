import { View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from './styles';
import { useRoute } from './router';
import { NavigationContainer } from '@react-navigation/native';
import { keyRequest } from './utils/keyRequest';

SplashScreen.preventAutoHideAsync();
export default function App(): JSX.Element {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const routing = useRoute();
  const MyTheme = {
    dark: false,
    light: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#2f2f3d',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  useEffect(() => {
    keyRequest();
    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <></>;
  }

  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}
      accessibilityHint="Splash screen while loading sends http request for improving performance. It takes up to 20 seconds."
    >
      <NavigationContainer theme={MyTheme}>{routing}</NavigationContainer>
    </View>
  );
}
