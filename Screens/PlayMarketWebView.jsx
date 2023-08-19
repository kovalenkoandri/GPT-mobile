import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

const PlayMarketWebView = () => {
  const { userAgentRef } = useSelector(state => state.gpt);
  
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
