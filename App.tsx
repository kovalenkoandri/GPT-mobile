import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [value, setValue] = useState('');
  const inputHandler = (animal: any) => setValue(animal);
  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/cors', {
        animal: value
      });

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 10,
    backgroundColor: '#000',
    color: '#fff',
  },
});
 