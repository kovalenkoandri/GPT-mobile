import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Screens/Chat';
import ImageDalle from './Screens/Image';
import PasteKey from './Screens/PasteKey';
import BrowseKey from './Screens/BrowseKey';
import ImageUpload from './Screens/ImageUpload';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { keyLocalRequest } from './utils/keyLocalRequest'; // load data from FileSystem.cacheDirectory
import { readStringFromStorage } from './utils/saveStringToStorage';

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  const [isTestKeyPassed, setIsTestKeyPassed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playStatus = useRef('');
  const isTestKey = useRef(false);
  // console.log('router ' + playStatus.current);
  const keyRef = useRef('');
  useEffect(() => {
    const checkLocalKey = async () => {
      // const isTestKey = await keyLocalRequest();
      isTestKey.current = await readStringFromStorage();
      // console.log(isTestKey);
      isTestKey.current && setIsTestKeyPassed(true);
    };
    checkLocalKey();
  }, []);
  // console.log(playStatus);
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#2f2f3d' }}
    >
      {isTestKeyPassed && (
        <>
          <Tab.Screen
            name="Chat"
            children={() => <Chat {...{ keyRef, setPlaying, playStatus }} />}
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
            name="ImageDalle"
            children={() => (
              <ImageDalle {...{ keyRef, setPlaying, playStatus }} />
            )}
            options={{
              tabBarLabel: 'Image create',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons
                  name="white-balance-sunny"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      )}

      <Tab.Screen
        name="PasteKey"
        children={() => (
          <PasteKey
            {...{
              setIsTestKeyPassed,
              keyRef,
              playing,
              setPlaying,
              playStatus,
              // setPlayStatus,
            }}
          />
        )}
        options={{
          tabBarLabel: 'Paste key',
          tabBarIcon: ({ color = '000' }) => (
            <MaterialCommunityIcons name="key" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="BrowseKey"
        children={() => <BrowseKey {...{ playStatus, setPlaying }} />}
        options={{
          tabBarLabel: 'Browse key',
          tabBarIcon: ({ color = '000' }) => (
            <MaterialCommunityIcons name="dog" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
          name="ImageUpload"
          children={() => <ImageUpload {...{ playStatus, setPlaying }} />}
          // component={ImageUpload}
          options={{
            tabBarLabel: 'Image upload',
            tabBarIcon: ({ color = '000' }) => (
              <MaterialCommunityIcons
                name="arrow-up-circle"
                color={color}
                size={26}
              />
            ),
          }}
        /> */}
    </Tab.Navigator>
  );
};
