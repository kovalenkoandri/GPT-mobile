import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import BrowseKey from './Screens/BrowseKey';
import ChatWebView from './Screens/ChatWebView';
import ImageGenerateWebView from './Screens/ImageGenerateWebView';
import PlayMarketWebView from './Screens/PlayMarketWebView';
// import GoogleLoginView from './Screens/GoogleLoginView';
import GoogleLoginView from './Screens/GoogleLoginViewSupabase';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { keyLocalRequest } from './utils/keyLocalRequest'; // load data from FileSystem.cacheDirectory

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  const [userInfo, setUserInfo] = useState(null);
  const userAgentRef = useRef('');
  const scrollViewRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const playStatus = useRef('');

  return (
    <Tab.Navigator
      initialRouteName="Navigator"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#2f2f3d' }}
    >
      {userInfo ? (
        <>
          <Tab.Screen
            name="ChatWebView"
            children={() => (
              <ChatWebView
                {...{ scrollViewRef, userAgentRef, playStatus, setPlaying }}
              />
            )}
            options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ImageGenerateWebView"
            children={() => (
              <ImageGenerateWebView
                {...{ scrollViewRef, userAgentRef, playStatus, setPlaying }}
              />
            )}
            options={{
              tabBarLabel: 'Image generate',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons
                  name="white-balance-sunny"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="PlayMarketWebView"
            children={() => (
              <PlayMarketWebView
                {...{ scrollViewRef, userAgentRef, playStatus, setPlaying }}
              />
            )}
            options={{
              tabBarLabel: 'Home page',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons
                  name="google-play"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="GoogleLoginView"
          children={() => (
            <GoogleLoginView
              {...{ userInfo, setUserInfo, scrollViewRef, userAgentRef }}
            />
          )}
          options={{
            tabBarLabel: 'Google login',
            tabBarIcon: ({ color = '000' }) => (
              <MaterialCommunityIcons name="login" color={color} size={26} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
