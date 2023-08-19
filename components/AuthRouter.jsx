import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import PlayMarketWebView from '../Screens/PlayMarketWebView';
import SettingsWebView from '../Screens/SettingsWebView';
import GoogleLoginView from '../Screens/GoogleLoginViewSupabase';
import ChatWebView from '../Screens/ChatWebView';
import ImageGenerateWebView from '../Screens/ImageGenerateWebView';

const Tab = createMaterialBottomTabNavigator();
const AuthRouter = ({ userInfo, setUserInfo, isAuth, toggleAuthKey }) => {
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
            name="SettingsWebViewUserInfo"
            children={() => (
              <SettingsWebView
                {...{
                  isAuth,
                  toggleAuthKey,
                }}
              />
            )}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons
                  name="cog-transfer-outline" // cog-transfer cogs cog cog-box
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="PlayMarketWebViewUserInfo"
            children={() => <PlayMarketWebView />}
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
        <>
          <Tab.Screen
            name="GoogleLoginView"
            children={() => <GoogleLoginView {...{ userInfo, setUserInfo }} />}
            options={{
              tabBarLabel: 'Google login',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons name="login" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="SettingsWebView"
            children={() => (
              <SettingsWebView
                {...{
                  isAuth,
                  toggleAuthKey,
                }}
              />
            )}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons
                  name="cog-transfer-outline" // cog-transfer cogs cog cog-box
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
                <MaterialCommunityIcons
                  name="google-play"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default AuthRouter;
