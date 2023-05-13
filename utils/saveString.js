import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;

// export const saveString = async data => {
//   try {
//     const permissions =
//       await StorageAccessFramework.requestDirectoryPermissionsAsync();

//     if (permissions.granted) {
//       // Get the directory uri that was approved
//       let directoryUri = permissions.directoryUri;
//       //   const storageAccessFramework =
//       //     await StorageAccessFramework.readDirectoryAsync(directoryUri);
//       //   console.log(storageAccessFramework);

//       // Create file and pass it's SAF URI
//       await StorageAccessFramework.createFileAsync(
//         directoryUri,
//         'openAIStringKey',
//         'text/plain'
//       )
//         .then(async fileUri => {
//           // Save data to newly created file
//           await FileSystem.writeAsStringAsync(fileUri, data, {
//             encoding: FileSystem.EncodingType.UTF8,
//           });
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     } else {
//       alert('You must allow permission to save.');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

export const writeFile = async data => {
  const gifDir = FileSystem.cacheDirectory + 'giphy/';

  // Checks if gif directory exists. If not, creates it
  async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(gifDir);
    console.log(dirInfo);
    if (!dirInfo.exists) {
      console.log("Gif directory doesn't exist, creating...");
      await StorageAccessFramework.makeDirectoryAsync(gifDir, {
        intermediates: true,
      });
    }
  }
  ensureDirExists();
  try {
    
    await StorageAccessFramework.writeAsStringAsync(
      gifDir + `example.txt`,
      data
    );
    console.log(
      await StorageAccessFramework.readAsStringAsync(gifDir + `example.txt`)
    );
    console.log('File saved successfully.');
  } catch (error) {
    console.error('Error while writing file:', error);
  }
};
