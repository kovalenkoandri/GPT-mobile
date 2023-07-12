import * as FileSystem from 'expo-file-system';
// import { useEffect, useRef } from 'react';
const { StorageAccessFramework } = FileSystem;

let directoryUri = '';
let gifDir = '';

// export const gifDirSharedText = useRef(null);

const createWriteFile = async data => {
  const newFile = await StorageAccessFramework.createFileAsync(
    directoryUri,
    'openAIStringKey',
    'text/plain'
  );
  // Save data to newly created file
  await FileSystem.writeAsStringAsync(newFile, data, {
    encoding: FileSystem.EncodingType.UTF8,
  });
};

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(gifDir);
  console.log(dirInfo);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await StorageAccessFramework.makeDirectoryAsync(gifDir, {
      intermediates: true,
    });
  }
}

export const saveStringPermissions = async data => {
  try {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Get the directory uri that was approved
      directoryUri = permissions.directoryUri;
      // console.log(
      //   await StorageAccessFramework.readDirectoryAsync(directoryUri)
      // );
      // Create file and pass it's SAF URI
      // ["content://com.android.externalstorage.documents/tree/primary%3AOpenAI/document/primary%3AOpenAI%2FopenAIStringKey.txt"]

      const contentAr = await StorageAccessFramework.readDirectoryAsync(
        directoryUri
      );
      const foundKeyFile = contentAr.find(el =>
        el.includes('openAIStringKey.txt')
      );

      // console.log(foundKeyFile);
      if (!foundKeyFile) {
        await createWriteFile(data);
      } else {
        await FileSystem.deleteAsync(foundKeyFile);
        await createWriteFile(data);
      }
    } else {
      alert('You must allow permission to save.');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const writeFileCacheDirectory = async data => {
  gifDir = FileSystem.cacheDirectory + 'giphy/';

  // Checks if gif directory exists. If not, creates it

  ensureDirExists();
  try {
    await StorageAccessFramework.writeAsStringAsync(
      gifDir + `example.txt`,
      data
    );
    // const readFile = await StorageAccessFramework.readAsStringAsync(
    //   gifDir + `example.txt`
    // );
    // console.log(readFile);
    console.log('File saved successfully.');
  } catch (error) {
    console.error('Error while writing file:', error);
  }
};
export const writeSharedTextToCacheDirectory = async data => {
  
  try {
    await StorageAccessFramework.writeAsStringAsync(
      `${FileSystem.cacheDirectory}sharedText.txt`,
      data
    );
    console.log('File saved successfully.');
  } catch (error) {
    console.error('Error while writing file:', error);
  }
};
