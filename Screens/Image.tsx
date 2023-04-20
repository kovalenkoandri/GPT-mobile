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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import ImageViewer from '../components/ImageViewer';
import EmojiPicker from '../components/EmojiPicker';
import EmojiList from '../components/EmojiList';
import EmojiSticker from '../components/EmojiSticker';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import Button from '../components/Button';

const apiUrl = Env.API_ENDPOINTS;

interface ChatMessage {
  prompt: string;
  encodedBase64: string;
}

const ImageDalle = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messageToDelete, setMessageToDelete] = useState<number>(-1);
  const [selectedImage, setSelectedImage] = useState<string | null>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const scrollViewRef = useRef<TextInput>(null);
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
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

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const inputHandler = (prompt: string) => {
    prompt.trim();
    if (prompt.length > 256) {
      return setValue(prompt.slice(0, 256));
    }
    return setValue(prompt);
  };
  let encodedBase64 = '';
  const onSubmit = async () => {
    try {
      setLoading(true);
      const gptResponse = await axios.post(apiUrl.API_IMAGE_URL, {
        prompt: value,
      });
      encodedBase64 = gptResponse.data.data[0].b64_json;
      setChatHistory([...chatHistory, { prompt: value, encodedBase64 }]);
      setValue('');
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
        {chatHistory.map((chatItem, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
            <GestureHandlerRootView style={styles.gestureContainer}>
              <View style={styles.imageContainer}>
                <View ref={imageRef} collapsable={false}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `data:image/png;base64,${chatItem.encodedBase64}`,
                    }}
                  />
                  {pickedEmoji !== null ? (
                    <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
                  ) : null}
                </View>
              </View>
              {messageToDelete !== index && (
                <TouchableOpacity
                  style={styles.showDeleteButton}
                  onPress={() => {
                    setMessageToDelete(index);
                    const newChatHistory = [...chatHistory];
                    newChatHistory.splice(index, 1);
                    setChatHistory(newChatHistory);
                    setMessageToDelete(-1);
                  }}
                >
                  <Text style={styles.showDeleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              {showAppOptions ? (
                <View style={styles.optionsContainer}>
                  <View style={styles.optionsRow}>
                    <IconButton
                      icon="refresh"
                      label="Reset"
                      onPress={onReset}
                    />
                    <CircleButton onPress={onAddSticker} />
                    <IconButton
                      icon="save-alt"
                      label="Save"
                      onPress={onSaveImageAsync}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.footerContainer}>
                  <Button
                    theme="primary"
                    label="Choose a photo"
                    onPress={pickImageAsync}
                  />
                  <Button
                    theme="secondary"
                    label="Use this photo"
                    onPress={() => setShowAppOptions(true)}
                  />
                </View>
              )}
              <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList
                  onSelect={setPickedEmoji}
                  onCloseModal={onModalClose}
                />
              </EmojiPicker>
            </GestureHandlerRootView>
          </View>
        ))}

        <View style={styles.inputContainer}>
          <TextInput
            ref={scrollViewRef}
            placeholder="Type from 5 symbols"
            placeholderTextColor="#f1f6ff"
            value={value}
            onChangeText={inputHandler}
            style={styles.input}
            multiline={true}
            onBlur={() => {
              if (value.length >= 5) {
                Keyboard.dismiss();
                onSubmit();
              }
            }}
          />
          <TouchableOpacity
            onPress={onSubmit}
            disabled={loading || value.length < 5}
            activeOpacity={0.6}
            accessibilityLabel="Send button"
          >
            {value.length >= 5 && <SendIcon />}
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </ScrollView>
    </>
  );
};

export default ImageDalle;
