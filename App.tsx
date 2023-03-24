import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // The interface is then used as a type annotation for the generic type parameter of the useState hook. Specifically, the useState hook is declared with an initial state value of an empty array ([]) of objects that conform to the ChatMessage interface.
  const inputHandler = (animal: string) => setValue(animal);

  const onSubmit = async () => {
    try {
      setLoading(true);
      // The axios.post method returns a Promise that resolves with the response data. The await keyword is used to wait for the Promise to resolve before continuing execution.

      // The <IApiResponse> syntax specifies the expected response type of the API call. It is a type parameter for the post method that tells TypeScript what shape the response data should have.
      const gptResponse = await axios.post<IApiResponse>(
        'https://gpt-back.onrender.com/api/generate',
        {
          animal: value,
        }
      );
      const data = gptResponse.data.result;
      setResponse(data);
      setChatHistory([...chatHistory, { animal: value, data }]);
      setValue('');
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <Text>{value}</Text> */}
        {/* <Text>{response}</Text> */}
        {chatHistory.map((chatItem, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={styles.chatRequest}>{chatItem.animal}</Text>
            <Text style={styles.chatResponse}>{chatItem.data}</Text>
          </View>
        ))}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your question"
            placeholderTextColor="#f1f6ff"
            value={value}
            onChangeText={inputHandler}
            style={styles.input}
          />
        </View>
        <StatusBar style="auto" />
        <Button title="title" onPress={onSubmit} disabled={loading || value.length === 0} />
        {/* <Text style={styles.sendButtonText}>Submit</Text> */}
        {/* </Button> */}
      </ScrollView>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'grey',
//     color: '#fff',

//   },
//   scrollView: {
//     backgroundColor: 'pink',
//     marginHorizontal: 20,
//   },
//   chatItem: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 10,
//     padding: 10,
//     maxWidth: '80%',
//   },
//   chatRequest: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'red',
//     marginBottom: 10,
//     width: '80%',
//   },
//   chatResponse: {
//     backgroundColor: '#000',
//     borderRadius: 10,
//     marginBottom: 10,
//     padding: 10,
//     maxWidth: '80%',
//   },
//   input: {
//     width: '100%',
//     borderRadius: 10,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'red',
//     marginBottom: 10,
//     backgroundColor: '#000',
//     color: '#fff',
//   },
// });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f3d',
  },
  scrollView: {
    padding: 10,
  },
  chatItem: {
    marginTop: 30,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: '#414155',
    // shadowColor: '#fff',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a3a3d5',
    padding: 10,
    borderTopWidth: 5,
    borderTopColor: '#f1f6ff',
    borderColor: '#f1f6ff',
  },
  input: {
    flex: 1,
    fontSize: 26,
    padding: 10,
    color: '#f1f6ff',
    backgroundColor: '#414155',
    borderRadius: 10,
    textAlignVertical: 'top',
    width: '85%',
  },
  sendButton: {
    backgroundColor: '#0066cc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  chatRequest: {
    backgroundColor: '#353343',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '95%',
    color: '#f1f6ff',
    fontSize: 26,
  },
  chatResponse: {
    backgroundColor: '#353343',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: '95%',
    color: '#f1f6ff',
    fontSize: 26,
  },
});
