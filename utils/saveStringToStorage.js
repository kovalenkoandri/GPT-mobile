import * as ada from './textAda001onAppLoad';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const writeStringToStorage = async data => {
  try {
    await AsyncStorage.setItem('@storage_Key', data);
  } catch (e) {
    console.warn('@storage_Key setItem error ', e);
    // saving error
  }
};

export const readStringFromStorage = async () => {
  let isTestKey = false;
  try {
    const retrievedString = await AsyncStorage.getItem('@storage_Key');
    if (retrievedString.length === 51) {
      const gptResponse = await ada.default.fetch(
        'what is good for human',
        retrievedString
      );
      if (gptResponse) {
        console.log(
          'Key is accepted. You can continue with chat or image requests.'
        );
        isTestKey = true;
      } else {
        console.log('Invalid key passed. Try another key or payed plan.');
      }
    }
  } catch (error) {
    console.log('AsyncStorage.getItem or ada.default.fetch ' + error);
  }
  return isTestKey;
};
