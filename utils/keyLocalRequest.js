import * as FileSystem from 'expo-file-system';
import * as ada from './textAda001onAppLoad';
const { StorageAccessFramework } = FileSystem;

export const keyLocalRequest = async () => {
  let isTestKey = false;
  const gifDir = FileSystem.cacheDirectory + 'giphy/';

  try {
    const retrievedString = await StorageAccessFramework.readAsStringAsync(
      gifDir + `example.txt`
    );
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
    console.error(error);
  }
  return isTestKey;
};
