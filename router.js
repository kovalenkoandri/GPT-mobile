import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Screens/Chat';
import ImageDalle from './Screens/Image';
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
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ImageDalle"
          component={ImageDalle}
          options={{
            tabBarLabel: 'Image',
            tabBarIcon: ({ color = '000' }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
};
