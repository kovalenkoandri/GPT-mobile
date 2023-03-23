import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

interface IApiResponse {
  result: string;
}
interface ChatMessage {
  animal: string;
  data: string;
}
export default function App(): JSX.Element {
  const [value, setValue] = useState<string>(''); // The type annotation :string after the variable name response specifies that the state variable should be of type
  const [response, setResponse] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // The interface is then used as a type annotation for the generic type parameter of the useState hook. Specifically, the useState hook is declared with an initial state value of an empty array ([]) of objects that conform to the ChatMessage interface.
  const inputHandler = (animal: string) => setValue(animal);

  const onSubmit = async () => {
    try {
      // The axios.post method returns a Promise that resolves with the response data. The await keyword is used to wait for the Promise to resolve before continuing execution.

      // The <IApiResponse> syntax specifies the expected response type of the API call. It is a type parameter for the post method that tells TypeScript what shape the response data should have.
      const gptResponse = await axios.post<IApiResponse>(
        'https://gpt-back.onrender.com/api/generate',
        {
          animal: value,
        }
      );
      const data = await gptResponse.data.result;
      setResponse(data);
      setChatHistory([...chatHistory, { animal: value, data }]);
      setValue('');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <Text>{response}</Text>
      {chatHistory.map((chatItem, index) => (
        <View key={index} style={styles.chatItem}>
          <Text style={styles.chatInput}>{chatItem.animal}</Text>
          <Text style={styles.chatResponse}>{chatItem.data}</Text>
        </View>
      ))}
      <TextInput
        placeholder="Type text"
        value={value}
        onChangeText={inputHandler}
        style={styles.input}
      />
      <StatusBar style="auto" />
      <Button title={'Submit'} onPress={onSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatItem: {},
  chatInput: {},
  chatResponse: {},
  input: {
    width: '80%',
    borderRadius: 10,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 10,
    backgroundColor: '#000',
    color: '#fff',
  },
});
