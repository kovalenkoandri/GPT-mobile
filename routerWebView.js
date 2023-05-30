import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import BrowseKey from './Screens/BrowseKey';
import ChatWebView from './Screens/ChatWebView';
import ImageGenerateWebView from './Screens/ImageGenerateWebView';
import PlayMarketWebView from './Screens/PlayMarketWebView';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { keyLocalRequest } from './utils/keyLocalRequest'; // load data from FileSystem.cacheDirectory

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  return (
    <Tab.Navigator
      initialRouteName="Navigator"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#2f2f3d' }}
    >
      <Tab.Screen
        name="ChatWebView"
        children={() => <ChatWebView />}
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
        children={() => <ImageGenerateWebView />}
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
        children={() => <PlayMarketWebView />}
        options={{
          tabBarLabel: 'Home page',
          tabBarIcon: ({ color = '000' }) => (
            <MaterialCommunityIcons name="apps" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
