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
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const scrollViewRef = useRef<TextInput>(null);
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const onReset = () => {
    setShowAppOptions(false);
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
        {chatHistory.map((chatItem, index) => {
          return (
            <View key={index} style={styles.chatItem}>
              <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
                <View style={styles.imageContainer}>
                  <View ref={imageRef} collapsable={false}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `data:image/png;base64,${chatItem.encodedBase64}`,
                      }}
                    />
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
                  <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                      <IconButton
                        icon="refresh"
                        label="Reset"
                        onPress={onReset}
                      />
                      {/* <CircleButton onPress={onAddSticker} /> */}
                      <IconButton
                        icon="save-alt"
                        label="Save"
                        onPress={onSaveImageAsync}
                      />
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
            value={value}
            onChangeText={inputHandler}
            style={styles.input}
            multiline={true}
            onBlur={() => {
              if (value.length >= 3) {
                Keyboard.dismiss();
                onSubmit();
              }
            }}
          />
          <TouchableOpacity
            onPress={onSubmit}
            disabled={loading || value.length < 3}
            activeOpacity={0.6}
            accessibilityLabel="Send button"
          >
            {value.length >= 3 && <SendIcon />}
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </ScrollView>
    </>
  );
};

export default ImageDalle;
