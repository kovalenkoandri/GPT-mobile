import { View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from './styles';
// import { useRoute } from './router';
import { useRoute } from './routerWebView';
import { NavigationContainer } from '@react-navigation/native';
import { onFetchUpdateAsync } from './utils/checkUpdates';
import Reactotron from 'reactotron-react-native';
import * as Location from 'expo-location';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

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
    onFetchUpdateAsync();
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
  // const _getLocationAsync = async () => {
  //   // check status of location permissions
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     Reactotron.log!('Permission to access location was denied');
  //   }
  //   // get user's position
  //   let location = await Location.getCurrentPositionAsync({});
  //   const lat = location.coords.latitude; // pull out latitude
  //   const lon = location.coords.longitude; // pull out longitude

  //   // display location data with Reactotron.display()
  //   Reactotron.display!({
  //     name: 'coordinates',
  //     preview: `lat: ${lat}, lon: ${lon}`, // preview just the lat/lon
  //     value: location,
  //   });
  // };
  // _getLocationAsync();
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
