import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Env } from '../Env';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import * as gptImageB64 from '../utils/gptImageB64';
import * as gptImageUrl from '../utils/gptImageUrl';
// import { onFetchUpdateAsync } from '../utils/checkUpdates';
import { useNavigation } from '@react-navigation/native';
import useStopPlay from '../utils/useStopPlay';
import { copyImageToClipboard } from '../utils/copyImageToClipboard';
import { shareImage } from '../utils/shareImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const apiUrl = Env.API_ENDPOINTS;

const ImageDalle = ({ setPlaying, playStatus }: any) => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const scrollViewRef = useRef<TextInput>(null);
  const imageRef = useRef<View>(null);

  const navigation = useNavigation();

  let encodedBase64 = useRef('');
  let imageURL = useRef('');
  let promptHeader = useRef('');

  if (status === null) {
    requestPermission();
  }

  // setInterval(onFetchUpdateAsync, 86400000);

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

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.error(`onSaveImageAsync error ${e}`);
    }
  };
  const onShareImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        format: 'jpg',
        quality: 1.0,
      });
      if (localUri) {
        shareImage(localUri);
      }
    } catch (e) {
      console.error(`onShareImageAsync error ${e}`);
    }
  };
  const onCopyToClipboardImageAsync = async () => {
    try {
      const base64 = await captureRef(imageRef, {
        format: 'jpg',
        quality: 1.0,
        result: 'base64',
      });
      if (base64) {
        copyImageToClipboard(base64, setIsCopied);
      }
    } catch (e) {
      console.error(`onCopyToClipboardImageAsync error ${e}`);
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

  // useEffect(() => {
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.focus();
  //   }
  // });

  useStopPlay({ playStatus, setPlaying, navigation });

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          ref={scrollViewRef}
          placeholder="Type from 3 symbols"
          placeholderTextColor="#f1f6ff"
          value={prompt}
          onChangeText={inputHandler}
          style={styles.input}
          multiline={true}
          onBlur={() => Keyboard.dismiss()}
          // onBlur={() => {
          //   if (prompt.length >= 3) {
          //     Keyboard.dismiss();
          //     onSubmit();
          //   }
          // }}
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
                <MaterialCommunityIcons
                  name="swap-vertical"
                  color={'#000'}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSaveImageAsync}
                style={styles.copyButton}
              >
                <MaterialCommunityIcons
                  name="chevron-double-down"
                  color={'#000'}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onShareImageAsync}
                style={styles.copyButton}
              >
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  color={'#000'}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onCopyToClipboardImageAsync}
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
            {/* <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                {loading ||
                  (prompt.length >= 3 && (
                    <IconButton icon="refresh" label="Swap" onPress={onSwap} />
                  ))}
                // <CircleButton onPress={onAddSticker} /> 
                {loading || (
                  <IconButton
                    icon="save-alt"
                    label="Save"
                    onPress={onSaveImageAsync}
                  />
                )}
              </View>
            </View> */}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ImageDalle;
