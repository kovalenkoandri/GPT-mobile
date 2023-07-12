import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { SendIcon } from '../assets/send';
import React, { useState, useEffect, useRef } from 'react';
import * as textDavinci003 from '../utils/textDavinci003';
import { gpt35Turbo } from '../utils/gpt35Turbo';
import { onFetchUpdateAsync } from '../utils/checkUpdates';
import { useNavigation } from '@react-navigation/native';
import useStopPlay from '../hooks/useStopPlay';
import { copyToClipboard } from '../utils/copyToClipboard';
import { shareContent } from '../utils/shareContent';
import { speak } from '../utils/speak';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ChatMessage {
  prompt: string;
  data: string;
}

const Chat = ({ setPlaying, playStatus }: any) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [smart, setSmart] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isVoice, setIsVoice] = useState<boolean>(false);

  const navigation = useNavigation();

  const inputHandler = (prompt: string) => {
    prompt.trim();
    if (prompt.length > 256) {
      return setValue(prompt.slice(0, 256));
    }
    return setValue(prompt);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      let gptResponse;
      if (smart) {
        gptResponse = await gpt35Turbo(value);
      } else {
        gptResponse = await textDavinci003.default.fetch(value);
      }
      // what is good for human
      const data = gptResponse;
      setChatHistory([...chatHistory, { prompt: value, data }]);
      setValue('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    !__DEV__ && onFetchUpdateAsync();
  }, []);

  const toggleSmartFast = () => {
    setSmart(prevState => !prevState);
  };
  useStopPlay({ playStatus, setPlaying, navigation });
  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {chatHistory.map((chatItem, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatRequest}>{chatItem.prompt}</Text>
            <Text style={styles.chatResponse}>{chatItem.data}</Text>
            <View style={styles.shareView}>
              <TouchableOpacity
                onPress={() => speak(chatItem.data, setIsVoice)}
                style={styles.copyButton}
              >
                {isVoice ? (
                  <MaterialCommunityIcons
                    name="account-voice"
                    color={'#e91e63'}
                    size={40}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="account-voice-off"
                    color={'#000'}
                    size={40}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => shareContent(chatItem.data)}
                style={styles.copyButton}
              >
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  color={'#000'}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => copyToClipboard(chatItem.data, setIsCopied)}
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
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => {
                  const newChatHistory = [...chatHistory];
                  newChatHistory.splice(index, 1);
                  setChatHistory(newChatHistory);
                }}
              >
                <MaterialCommunityIcons
                  name="delete-variant"
                  color={'#000'}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.inputContainer}>
          <TextInput
            autoFocus={true}
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
            disabled={loading || value.length < 5}
            activeOpacity={0.6}
            accessibilityLabel="Send button"
            style={styles.buttonSend}
            onPress={onSubmit}
          >
            {value.length >= 5 && <SendIcon />}
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
      </ScrollView>

      <View style={styles.toggleSmartFastView}>
        <Text style={styles.toggleSmartFastText}>
          {smart ? 'Answer is smart' : 'Answer is fast'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={smart ? '#7d7da1' : '#cdc5ff'}
          onValueChange={toggleSmartFast}
          value={smart}
          style={styles.toggleSwitch}
        />
      </View>
    </>
  );
};
export default Chat;
