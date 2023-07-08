import * as Clipboard from 'expo-clipboard';
import { captureRef } from 'react-native-view-shot';

export const copyImageToClipboard = async (imageRef, setIsCopied) => {
  const TIMEOUT_DURATION = 3000;
  try {
    const base64 = await captureRef(imageRef, {
      format: 'jpg',
      quality: 1.0,
      result: 'base64',
    });
    if (base64) {
      await Clipboard.setImageAsync(base64);
    }
  } catch (e) {
    console.error(`onCopyToClipboardImageAsync error ${e}`);
  }
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, TIMEOUT_DURATION);
};
