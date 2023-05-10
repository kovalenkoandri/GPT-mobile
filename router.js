import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Screens/Chat';
import ImageDalle from './Screens/Image';
import GetKey from './Screens/GetKey';
import ImageUpload from './Screens/ImageUpload';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { isTestKey } from './utils/keyLocalRequest';
import { keyLocalRequest } from './utils/keyLocalRequest';

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  const [isTestKeyPassed, setIsTestKeyPassed] = useState(false);
  const keyRef = useRef('');
  useEffect(() => {
    const checkLocalKey = async () => {
      const isTestKey = await keyLocalRequest();
      console.log(isTestKey);
      isTestKey && setIsTestKeyPassed(true);
    };
    checkLocalKey();
  }, []);
  {
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
              children={() => <Chat {...{ keyRef }} />}
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
              children={() => <ImageDalle {...{ keyRef }} />}
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
          name="GetKey"
          children={() => <GetKey {...{ setIsTestKeyPassed, keyRef }} />}
          options={{
            tabBarLabel: 'Get key',
            tabBarIcon: ({ color = '000' }) => (
              <MaterialCommunityIcons name="key" color={color} size={26} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="ImageUpload"
          component={ImageUpload}
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
  }
};
