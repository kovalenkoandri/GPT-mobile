import * as FileSystem from 'expo-file-system';

export const findFileByName = async fileName => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory);
    console.log(dirInfo);
    if (dirInfo.exists) {
        const files = await FileSystem.readDirectoryAsync(dirInfo.uri);
        console.log(files + ' files');
        const matchingFiles = files.filter(file => file === fileName);
        console.log(matchingFiles);
      if (matchingFiles.length > 0) {
        // The file exists
        return matchingFiles[0];
      } else {
        // The file does not exist
        return null;
      }
    }
  } catch (error) {
    // Handle any errors that occur during the file search
    console.error('Error while searching for file:', error);
    return null;
  }
};
