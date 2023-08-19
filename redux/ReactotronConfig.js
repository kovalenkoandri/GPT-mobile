import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: '192.168.43.80', port: 9090 })
  .useReactNative()
  .use(reactotronRedux())
  .use(networking())
  .connect();
export default reactotron;