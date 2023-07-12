import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export const shareImage = async imageRef => {
  try {
    const localUri = await captureRef(imageRef, {
      format: 'jpg',
      quality: 1.0,
    });
    if (localUri) {
      await Sharing.shareAsync(localUri); // Share the file using its URI
    }
  } catch (error) {
    console.error('Error while sharing:', error);
  }
};
