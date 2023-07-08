import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export const saveImage = async (imageRef, setIsDownloaded) => {
  const TIMEOUT_DURATION = 3000;

  try {
    const localUri = await captureRef(imageRef, {
      height: 440,
      quality: 1,
    });
    if (localUri) {
      await MediaLibrary.saveToLibraryAsync(localUri);
    }
  } catch (e) {
    console.error(`onSaveImageAsync error ${e}`);
  }
  setIsDownloaded(true);
  setTimeout(() => {
    setIsDownloaded(false);
  }, TIMEOUT_DURATION);
};
