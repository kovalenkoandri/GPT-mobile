import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
// import { Env } from '../Env';
import * as gptImageB64 from '../utils/gptImageB64';
// import * as gptImageUrl from '../utils/gptImageUrl';
import { copyImageToClipboard } from '../utils/copyImageToClipboard';
import { shareImage } from '../utils/shareImage';
import { saveImage } from '../utils/saveImage';

// const apiUrl = Env.API_ENDPOINTS;

const ImageDalle = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  let encodedBase64 = useRef('');
  // let imageURL = useRef('');
  let promptHeader = useRef('');

  if (status === null) {
    requestPermission();
  }

  const onSwap = async () => {
    try {
      setLoading(true);
      // const gptResponse = await axios.post(
      //   apiUrl.API_IMAGE_VARIATION_URL,
      //   {
      //     link: imageURL.current,
      //     // link: 'https://res.cloudinary.com/dpad5ltdp/image/upload/v1682337209/image_variation_original_fjzhea.png',
      //   },
      //   { timeout: 6000 }
      // );
      // async function getImageToBase64(imageURL: string): Promise<string> {
      //   const data = await fetch(imageURL);
      //   const blob = await data.blob();
      //   return new Promise<string>(resolve => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(blob);
      //     reader.onloadend = () => {
      //       const base64data = reader.result as string;
      //       resolve(base64data);
      //     };
      //   });
      // }

      // encodedBase64.current = await getImageToBase64(gptResponse.data.url);
      // encodedBase64.current = await encodedBase64.current.replace(
      //   'data:application/octet-stream;base64,',
      //   ''
      // );
      const gptResponse = await gptImageB64.default.fetch(prompt);
      encodedBase64.current = gptResponse;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputHandler = (prompt: string) => {
    prompt.trim();
    if (prompt.length > 256) {
      return setPrompt(prompt.slice(0, 256));
    }
    return setPrompt(prompt);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const gptResponse = await gptImageB64.default.fetch(prompt);
      // const gptResponseURL = await gptImageUrl.default.fetch(prompt);
      // const gptResponse = await axios.post(
      //   apiUrl.API_IMAGE_B64,
      //   {
      //     prompt,
      //   },
      //   { timeout: 6000 }
      // );
      // const gptResponseURL = await axios.post(
      //   apiUrl.API_IMAGE_URL,
      //   {
      //     prompt,
      //   },
      //   { timeout: 6000 }
      // );
      // encodedBase64.current = gptResponse.data.data[0].b64_json;
      encodedBase64.current = gptResponse;
      // imageURL.current = gptResponseURL.data.data[0].url;
      // imageURL.current = gptResponseURL;
      promptHeader.current = prompt;
      // setPrompt('');
    } catch (error) {
      console.error(`onSubmit gptResponse ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          placeholder="Type from 3 symbols"
          placeholderTextColor="#f1f6ff"
          value={prompt}
          onChangeText={inputHandler}
          style={styles.input}
          multiline={true}
          onBlur={() => Keyboard.dismiss()}
        />
        <TouchableOpacity
          onPress={onSubmit}
          disabled={loading || prompt.length < 3}
          activeOpacity={0.6}
          accessibilityLabel="Send button"
          style={styles.buttonSend}
        >
          {prompt.length >= 3 && <SendIcon />}
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#fff" />}
      </View>
      <ScrollView style={styles.scrollView}>
        {encodedBase64.current && (
          <View style={styles.chatItem}>
            {/* <Text style={styles.chatRequest}>{promptHeader.current}</Text> */}
            <View style={styles.shareImageView}>
              <TouchableOpacity onPress={onSwap} style={styles.copyButton}>
                {loading ? (
                  <MaterialCommunityIcons
                    name="swap-vertical"
                    color={'#e91e63'}
                    size={40}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="swap-vertical"
                    color={'#000'}
                    size={40}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => saveImage(imageRef, setIsDownloaded)}
                style={styles.copyButton}
              >
                {isDownloaded ? (
                  <MaterialCommunityIcons
                    name="check-all"
                    color={'#e91e63'}
                    size={40}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="chevron-double-down"
                    color={'#000'}
                    size={40}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => shareImage(imageRef)}
                style={styles.copyButton}
              >
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  color={'#000'}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => copyImageToClipboard(imageRef, setIsCopied)}
                style={styles.copyButton}
              >
                {isCopied ? (
                  <MaterialCommunityIcons
                    name="check-all"
                    color={'#e91e63'}
                    size={40}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="content-copy"
                    color={'#000'}
                    size={40}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View ref={imageRef} collapsable={false} style={styles.imageRef}>
              <Image
                style={styles.image}
                source={{
                  uri: `data:image/png;base64,${encodedBase64.current}`,
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ImageDalle;
