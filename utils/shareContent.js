import * as Sharing from 'expo-sharing';
import { writeSharedTextToCacheDirectory, gifDir } from './saveString';

export const shareContent = async shareData => {
  writeSharedTextToCacheDirectory(shareData);
  try {
    console.log(gifDir);
    await Sharing.shareAsync(gifDir);
  } catch (error) {
    console.error('Error while sharing:', error);
  }
};
