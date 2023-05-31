// import Reactotron from 'reactotron-react-native';
// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .use(networking())
//   .connect(); // let's connect!
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { networking } from 'reactotron-react-native';
Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: '192.168.43.162', port: 9090 })
  .useReactNative()
  .use(networking())
  .connect(); 