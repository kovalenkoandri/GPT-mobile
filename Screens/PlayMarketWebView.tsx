import { WebView } from 'react-native-webview';
import { useAppSelector } from '../redux/hooks';

const PlayMarketWebView = () => {
  const { userAgentRef } = useAppSelector(state => state.gpt);
  
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
