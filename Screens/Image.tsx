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
import uuid from 'react-native-uuid';
const apiUrl = Env.API_ENDPOINTS;

interface ChatMessage {
  prompt: string;
  encodedBase64: string;
  itemId: any;
  imageURL: string;
}

const ImageDalle = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const scrollViewRef = useRef<TextInput>(null);
  const imageRef = useRef<View>(null);

  let encodedBase64 = '';
  let imageURL = '';
  let itemId: any;

  if (status === null) {
    requestPermission();
  }

  const onSwap = async (index: any) => {
    try {
      setLoading(true);
      const foundItem = chatHistory.find(item => item.itemId === index);
      const foundItemIdx = chatHistory.findIndex(item => item.itemId === index);
      const gptResponse = await axios.post(
        apiUrl.API_IMAGE_VARIATION_URL,
        {
          link: foundItem?.imageURL,
          // link: 'https://res.cloudinary.com/dpad5ltdp/image/upload/v1682337209/image_variation_original_fjzhea.png',
        },
        { timeout: 6000 }
      );
      async function getImageToBase64(imageURL: string): Promise<string> {
        const data = await fetch(imageURL);
        const blob = await data.blob();
        return new Promise<string>(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
          };
        });
      }

      encodedBase64 = await getImageToBase64(gptResponse.data.url);
      encodedBase64 = await encodedBase64.replace(
        'data:application/octet-stream;base64,',
        ''
      );
      itemId = uuid.v4();
      const newChatHistory = [...chatHistory];
      newChatHistory.splice(foundItemIdx, 1, {
        itemId,
        prompt: chatHistory[foundItemIdx].prompt || prompt,
        encodedBase64,
        imageURL: foundItem?.imageURL || imageURL,
      });
      setChatHistory(newChatHistory);
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
      console.log(e);
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
      const gptResponse = await axios.post(
        apiUrl.API_IMAGE_B64,
        {
          prompt,
        },
        { timeout: 6000 }
      );
      const gptResponseURL = await axios.post(
        apiUrl.API_IMAGE_URL,
        {
          prompt,
        },
        { timeout: 6000 }
      );
      encodedBase64 = gptResponse.data.data[0].b64_json;
      imageURL = gptResponseURL.data.data[0].url;
      itemId = uuid.v4();
      setChatHistory([
        ...chatHistory,
        { itemId, prompt, encodedBase64, imageURL },
      ]);
      setPrompt('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.focus();
    }
  }, [chatHistory]);

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {chatHistory.map((chatItem, index) => {
          return (
            <View key={chatItem.itemId} style={styles.chatItem}>
              <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
              <View ref={imageRef} collapsable={false}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `data:image/png;base64,${chatItem.encodedBase64}`,
                  }}
                />
              </View>
              {loading || (
                <TouchableOpacity
                  style={styles.showDeleteButton}
                  onPress={() => {
                    const newChatHistory = [...chatHistory];
                    newChatHistory.splice(index, 1);
                    setChatHistory(newChatHistory);
                  }}
                >
                  <Text style={styles.showDeleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                  {loading || (
                    <IconButton
                      icon="refresh"
                      label="Swap"
                      onPress={() => onSwap(chatItem.itemId)}
                    />
                  )}
                  {/* <CircleButton onPress={onAddSticker} /> */}
                  {loading || (
                    <IconButton
                      icon="save-alt"
                      label="Save"
                      onPress={onSaveImageAsync}
                    />
                  )}
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.inputContainer}>
          <TextInput
            ref={scrollViewRef}
            placeholder="Type from 3 symbols"
            placeholderTextColor="#f1f6ff"
            value={prompt}
            onChangeText={inputHandler}
            style={styles.input}
            multiline={true}
            onBlur={() => {
              if (prompt.length >= 3) {
                Keyboard.dismiss();
                onSubmit();
              }
            }}
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
      </ScrollView>
    </>
  );
};

export default ImageDalle;
