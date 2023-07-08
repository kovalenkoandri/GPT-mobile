import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import useStopPlay from '../utils/useStopPlay';
import useUserAgent from '../utils/useUserAgent';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles';
import { View, Text, Switch } from 'react-native';

const SettingsWebView = ({
  playStatus,
  setPlaying,
  scrollViewRef,
  userAgentRef,
  isAuth,
  toggleAuthKey
}) => {
  const navigation = useNavigation();
  // useUserAgent({ scrollViewRef, userAgentRef }); // ?
  useStopPlay({ playStatus, setPlaying, navigation });
  
  return (
    <View style={styles.toggleSmartFastView}>
      <Text style={styles.toggleSmartFastText}>
        Acces by {isAuth ? 'Google Auth' : 'Key'}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isAuth ? '#7d7da1' : '#cdc5ff'}
        onValueChange={toggleAuthKey}
        value={isAuth}
        style={styles.toggleSwitch}
      />
    </View>
  );
};

export default SettingsWebView;
