import { WebView } from 'react-native-webview';
import useStopPlay from '../hooks/useStopPlay';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ImageGenerateWebView = ({ playStatus, setPlaying }) => {
  const navigation = useNavigation();
  const { userAgentRef } = useSelector(state => state.gpt);
  useStopPlay({ playStatus, setPlaying, navigation });

  return (
    <WebView
      originWhitelist={['*']}
      userAgent={userAgentRef ?? ''}
      source={{ uri: 'https://labs.openai.com/' }}
    />
  );
};

export default ImageGenerateWebView;
