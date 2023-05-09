import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Screens/Chat';
import ImageDalle from './Screens/Image';
import GetKey from './Screens/GetKey';
import ImageUpload from './Screens/ImageUpload';
import React, { useState, useEffect, useRef } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { isTestKeyPassed } from './Screens/GetKey';

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  const [isTestKeyPassed, setIsTestKeyPassed] = useState(false);
  const keyRef = useRef('');
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
              <MaterialCommunityIcons
                name="key"
                color={color}
                size={26}
              />
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
