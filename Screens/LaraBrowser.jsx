import { WebView } from 'react-native-webview';
import { useAppSelector } from '../redux/hooks';
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { useState, useEffect, useRef } from 'react';

const LaraBrowser = () => {
  const { userAgentRef } = useAppSelector(state => state.gpt);
  const [address, setAddress] = useState('https://google.com');
  // const [address, setAddress] = useState('');
  const [valid, setValid] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(address, { method: 'HEAD' });
        // const response = await fetch(address, { method: 'GET' })
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
  const ref = useRef(null);
  const handleNavigationStateChange = navState => {
    console.log('navState.url ', navState.url);
    console.log('navState.title ',navState.title);
    console.log('navState.target ',navState.target);
    let newAddress = navState.url;
    console.log(newAddress !== address);
    if (newAddress !== address) {
      setAddress((old) => old = newAddress);
      console.log('address after setAddress ', address);
    }
  };
  const handleLoad = syntheticEvent => {
    // update component to be aware of loading status
    const { nativeEvent } = syntheticEvent;
    console.log(nativeEvent.url);
    console.log(nativeEvent.title);
    console.log(nativeEvent.target);
    // this.isLoading = nativeEvent.loading;
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.btnContainer}>
        <Button
          title="Back"
          onPress={() => {
            ref.current?.goBack();
          }}
        ></Button>
        <Button
          title="Reload"
          onPress={() => {
            ref.current?.reload();
          }}
        ></Button>
        <Button
          title="Forward"
          onPress={() => {
            ref.current?.goForward();
          }}
        ></Button>
        <Button
          title="clearCache"
          onPress={() => {
            ref.current?.clearCache();
          }}
        ></Button>
        <Button
          title="requestFocus"
          onPress={() => {
            ref.current?.requestFocus();
          }}
        ></Button>
        <Button
          title="stopLoading"
          onPress={() => {
            ref.current?.stopLoading();
          }}
        ></Button>
        <Button
          title="clearHistory"
          onPress={() => {
            ref.current?.clearHistory();
          }}
        ></Button>
        <Button
          title="clearFormData"
          onPress={() => {
            ref.current?.clearFormData();
          }}
        ></Button>
      </View>
      <TextInput
        value={address}
        onChangeText={address => setAddress(address)}
        placeholder={'Enter web-address'}
        style={styles.input}
      />
      {/* {console.log(valid)} */}
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
          // onLoadStart={handleLoad}
        />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};
// uri: 'https://play.google.com/store/apps/details?id=com.kovalenkoandrii.GPTmobile',
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
    width: '100%',
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    color: '#e8e8e8',
    backgroundColor: '#2f2f3d',
    borderColor: '#767577',
    borderWidth: 5,
    borderRadius: 10,
  },
  webView: {
    // flex: 1,
    borderRadius: 100,
    borderColor: '#767577',
    borderWidth: 50,
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LaraBrowser;
