import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

interface IApiResponse {
  result: string;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const inputHandler = (animal: string) => setValue(animal);

  const onSubmit = async () => {
    try {
      const gptResponse = await axios.post<IApiResponse>(
        'https://gpt-back.onrender.com/api/generate',
        {
          animal: value,
        }
      );
      const data = await gptResponse.data.result;
      setResponse(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <Text>{response}</Text>
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
