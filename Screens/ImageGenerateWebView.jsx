import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

const ImageGenerateWebView = () => {
  const { userAgentRef } = useSelector(state => state.gpt);

  return (
    <WebView
      originWhitelist={['*']}
      userAgent={userAgentRef ?? ''}
      source={{ uri: 'https://labs.openai.com/' }}
    />
  );
};

export default ImageGenerateWebView;
