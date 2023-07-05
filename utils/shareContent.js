import * as Sharing from 'expo-sharing';
import { writeSharedTextToCacheDirectory, gifDir } from './saveString';
import * as FileSystem from 'expo-file-system';

export const shareContent = async shareData => {
  const filePath = gifDir + `sharedText.txt`; // Set the file path
  writeSharedTextToCacheDirectory(shareData);

  try {
    // Get information about the file
    const fileInfo = await FileSystem.getInfoAsync(filePath);

    // Check if the file exists and is a file (not a directory)
    if (fileInfo.exists) {
      const fileUri = fileInfo.uri; // Get the URI of the file
      await Sharing.shareAsync(fileUri); // Share the file using its URI
    } else {
      console.error('Error: sharedText.txt does not exist or is not a file.');
    }
  } catch (error) {
    console.error('Error while sharing:', error);
  }
};
