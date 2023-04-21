import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Screens/Chat';
import ImageDalle from './Screens/Image';
import ImageUpload from './Screens/ImageUpload';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  {
    return (
      <Tab.Navigator
        initialRouteName="Chat"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: '#2f2f3d' }}
      >
        <Tab.Screen
          name="Chat"
          component={Chat}
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
          component={ImageDalle}
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
        <Tab.Screen
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
        />
      </Tab.Navigator>
    );
  }
};
