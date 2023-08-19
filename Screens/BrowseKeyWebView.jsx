import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

const BrowseKeyWebView = () => {
  const { userAgentRef } = useSelector(state => state.gpt);

  return (
    <WebView
      originWhitelist={['*']}
      userAgent={userAgentRef ?? ''}
      source={{ uri: 'https://platform.openai.com/account/api-keys' }}
    />
  );
};

export default BrowseKeyWebView;
