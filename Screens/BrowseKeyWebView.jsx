import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import useStopPlay from '../hooks/useStopPlay';
import { useSelector } from 'react-redux';

const BrowseKeyWebView = ({ playStatus, setPlaying }) => {
  const navigation = useNavigation();
  const { userAgentRef } = useSelector(state => state.gpt);
  useStopPlay({ playStatus, setPlaying, navigation });

  return (
    <WebView
      originWhitelist={['*']}
      userAgent={userAgentRef ?? ''}
      source={{ uri: 'https://platform.openai.com/account/api-keys' }}
    />
  );
};

export default BrowseKeyWebView;
