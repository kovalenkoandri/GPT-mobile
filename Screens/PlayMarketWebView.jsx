import { WebView } from 'react-native-webview';
import useStopPlay from '../hooks/useStopPlay';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const PlayMarketWebView = ({ playStatus, setPlaying }) => {
  const navigation = useNavigation();
  const { userAgentRef } = useSelector(state => state.gpt);
  useStopPlay({ playStatus, setPlaying, navigation });
  
  return (
    <WebView
      userAgent={userAgentRef ?? ''}
      originWhitelist={['*']}
      source={{
        uri: 'https://play.google.com/store/apps/details?id=com.kovalenkoandrii.GPTmobile',
      }}
    />
  );
};

export default PlayMarketWebView;
