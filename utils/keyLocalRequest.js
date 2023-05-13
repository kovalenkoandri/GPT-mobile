import * as FileSystem from 'expo-file-system';
import * as ada from './textAda001onAppLoad';
import { findFileByName } from './findFileByName';
const { StorageAccessFramework } = FileSystem;

export const keyLocalRequest = async () => {
  let isTestKey = false;
  const gifDir = FileSystem.cacheDirectory + 'giphy/';
  // const fileName = 'openAIStringKey.txt';
  // await findFileByName(fileName)
  //   .then(result => {
  //     if (result) {
  //       console.log('File found:', result);
  //       // Perform operations on the found file
  //     } else {
  //       console.log('File not found');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error while searching for file:', error);
  //   });

  try {
    // const retrievedString = await StorageAccessFramework.readAsStringAsync(
    //   'content://com.android.externalstorage.documents/tree/primary%3AopenAi/document/primary%3AopenAi%2FopenAIStringKey.txt'
    // );
    // console.log(retrievedString);
    // console.log(retrievedString.length);
    // const retrievedDir = await StorageAccessFramework.getUriForDirectoryInRoot(
    //   'openAi'
    // );
    // console.log(retrievedDir);
    // const delDir = await FileSystem.deleteAsync(retrievedDir);
    // 'content://com.android.externalstorage.documents/tree/primary:openAI/document/primary:openAi'
    // );
    // console.log(delDir);
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
