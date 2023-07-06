import * as Sharing from 'expo-sharing';

export const shareImage = async shareData => {
  try {
    if (shareData) {
      await Sharing.shareAsync(shareData); // Share the file using its URI
    } else {
      console.error('Error: sharedImage.jpg does not exist or is not a file.');
    }
  } catch (error) {
    console.error('Error while sharing:', error);
  }
};
