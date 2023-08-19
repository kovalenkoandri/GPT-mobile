import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from '../Screens/Chat';
import ImageDalle from '../Screens/Image';
import PasteKey from '../Screens/PasteKey';
import BrowseKeyWebView from '../Screens/BrowseKeyWebView';
// import ImageUpload from '../Screens/ImageUpload';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import PlayMarketWebView from '../Screens/PlayMarketWebView';
import SettingsWebView from '../Screens/SettingsWebView';

const Tab = createMaterialBottomTabNavigator();
const KeyRouter = ({
  isTestKeyPassed,
  setIsTestKeyPassed,
  playing,
  setPlaying,
  playStatus,
  isAuth,
  toggleAuthKey,
  timerRef,
}) => {
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#2f2f3d' }}
      screenListeners={({ navigation }) => ({
        state: e => {
          // Do something with the state
          // console.log('state changed', e.data);

          const handleTabPress = () => {
            if (playStatus.current === 'playing') {
              timerRef.current = setTimeout(() => {
                setPlaying(false);
              }, 50);
              // console.log('handleTabPress ' + playStatus.current);
              // console.log('playing ' + playing);
            }
          };

          const unsubscribePlay = navigation.addListener(
            'tabPress',
            handleTabPress
          );

          handleTabPress();

          return () => {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            unsubscribePlay();
          };
        },
      })}
    >
      {isTestKeyPassed ? (
        <>
          <Tab.Screen
            name="Chat"
            children={() => <Chat />}
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
            children={() => <ImageDalle />}
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
            name="SettingsWebViewKeyPassed"
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
            name="PlayMarketWebViewKeyPassed"
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
            name="PasteKey"
            children={() => (
              <PasteKey
                {...{
                  setIsTestKeyPassed,
                  playing,
                  setPlaying,
                  playStatus,
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
            name="BrowseKeyWebView"
            children={() => <BrowseKeyWebView />}
            options={{
              tabBarLabel: 'Browse key',
              tabBarIcon: ({ color = '000' }) => (
                <MaterialCommunityIcons name="dog" color={color} size={26} />
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

export default KeyRouter;
