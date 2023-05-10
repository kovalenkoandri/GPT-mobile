import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;

export const saveString = async data => {
  try {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Get the directory uri that was approved
      let directoryUri = permissions.directoryUri;
      //   const storageAccessFramework =
      //     await StorageAccessFramework.readDirectoryAsync(directoryUri);
      //   console.log(storageAccessFramework);

      // Create file and pass it's SAF URI
      await StorageAccessFramework.createFileAsync(
        directoryUri,
        'openAIStringKey',
        'text/plain'
      )
        .then(async fileUri => {
          // Save data to newly created file
          await FileSystem.writeAsStringAsync(fileUri, data, {
            encoding: FileSystem.EncodingType.UTF8,
          });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      alert('You must allow permission to save.');
    }
  } catch (err) {
    console.warn(err);
  }
};
