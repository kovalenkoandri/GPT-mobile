import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Screens/Chat';
import Image from './Screens/Image';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export const useRoute = () => {
  {
    return (
      <Tab.Navigator
        initialRouteName="Chat"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Image"
          component={Image}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
};
