import { WebView } from 'react-native-webview';
import { useAppSelector } from '../redux/hooks';
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Keyboard,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Progress from 'react-native-progress';

const windowDimensions = Dimensions.get('window');

const LaraBrowser = () => {
  const { userAgentRef } = useAppSelector(state => state.gpt);
  const [address, setAddress] = useState(
    // 'https://prom.ua/'
    // 'https://olx.ua'
    // 'https://medium.com/geekculture/first-class-push-notifications-for-expo-apps-4bd7bbb9a01a'
    'https://google.com'
  );
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [valid, setValid] = useState(true);
  const [multiline, setMultiline] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [navStateUrl, setNavStateUrl] = useState('');
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(address, { method: 'HEAD' });
        // console.log(JSON.stringify(response, null, 2));
        // console.log(JSON.stringify(response.url, null, 2));
        if (response) {
          setValid(true);
          // Keyboard.dismiss();
          // console.log(ref.current);
        }
      } catch (error) {
        console.error('Error fetching website:', error);
        setValid(false);
      }
    };
    fetchData();
  }, [address]);

  useEffect(() => {
    if (shouldReload) {
      ref.current?.reload();
      setShouldReload(false); // Reset the flag after reloading
    }
  }, [shouldReload]);
  const ref = useRef(null);
  const handleNavigationStateChange = navState => {
    console.log('navState.url ', navState.url);
    // one way to handle errors is via query string
    if (navState.url.includes('?errors=true')) {
      ref.current?.stopLoading();
    }
    setNavStateUrl(oldUrl => {
      if (navState.url !== oldUrl) {
        return navState.url;
      }
      return oldUrl;
    });
  };
  const handleClipboard = async () => {
    Keyboard.dismiss();
    await Clipboard.setStringAsync(navStateUrl);
  };
  const INJECTED_JAVASCRIPT = `
      (function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location.href));
})();
    `;

  return (
    <SafeAreaView style={styles.safeAreaView}>
     {isLoaded && <Progress.Bar
        progress={progress}
        borderWidth={0}
        borderRadius={0}
        color="blue"
        width={null}
      />}
      <View style={styles.btnContainer}>
        <Button
          title="Back"
          onPress={() => {
            ref.current?.goBack();
          }}
        ></Button>
        <Button
          title="For"
          onPress={() => {
            ref.current?.goForward();
          }}
        ></Button>
        <Button
          title="stop"
          onPress={() => {
            ref.current?.stopLoading();
          }}
        ></Button>
        <Button
          title="Rel"
          onPress={() => {
            ref.current?.reload();
          }}
        ></Button>
        {/* <Button
          title="clearCache"
          onPress={() => {
            ref.current?.clearCache();
          }}
        ></Button> */}
        {/* <Button
          title="requestFocus"
          onPress={() => {
            ref.current?.requestFocus();
          }}
        ></Button> */}
        {/* <Button
          title="clearHistory"
          onPress={() => {
            ref.current?.clearHistory();
          }}
        ></Button> */}
        {/* <Button
          title="clearFormData"
          onPress={() => {
            ref.current?.clearFormData();
          }}
        ></Button> */}

        <TextInput
          value={address}
          onChangeText={address => setAddress(address)}
          placeholder={'Enter web-address'}
          style={styles.input}
          multiline={multiline}
          onBlur={() => setMultiline(false)}
          onFocus={() => setMultiline(true)}
          selection={{ start: 0, end: 32 }}
        />
        <TouchableOpacity onPress={handleClipboard}>
          <Text
            selectable={true}
            style={[{ width: dimensions.window.width - 30 }, styles.output]}
          >
            {navStateUrl}
          </Text>
        </TouchableOpacity>
      </View>
      {valid ? (
        <WebView
          ref={ref}
          userAgent={userAgentRef ?? ''}
          originWhitelist={['*']}
          source={{
            uri: address,
          }}
          style={styles.webView}
          onNavigationStateChange={handleNavigationStateChange}
          onError={({ nativeEvent }) =>
            console.log('WebView error:', nativeEvent.description)
          }
          forceDarkOn={true}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onMessage={event => {
            console.log('window.location.href >>>>' + event.nativeEvent.data);
          }}
          startInLoadingState={true}
          onLoadStart={() => setIsLoaded(true)}
          onLoadEnd={() => setIsLoaded(false)}
          onLoadProgress={({ nativeEvent }) =>
            setProgress(nativeEvent.progress)
          }
        />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    borderColor: '#767577',
    borderWidth: 5,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    // width: '40%',
    padding: 4,
    // marginTop: 20,
    // marginBottom: 10,
    color: '#e8e8e8',
    backgroundColor: '#2f2f3d',
    borderColor: '#767577',
    borderWidth: 5,
    borderRadius: 10,
    fontSize: 12,
  },
  output: {
    paddingBottom: 8,
    height: 40,
    // marginTop: 20,
    // marginBottom: 10,
    color: '#e8e8e8',
    backgroundColor: '#2f2f3d',
    borderColor: '#767577',
    borderWidth: 5,
    borderRadius: 10,
    fontSize: 24,
  },
  webView: {
    // flex: 1,
    borderRadius: 100,
    borderColor: '#767577',
    borderWidth: 50,
    // marginTop: 50,
    // marginBottom: 20,
  },
});

export default LaraBrowser;
