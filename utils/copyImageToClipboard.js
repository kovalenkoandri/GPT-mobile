import * as Clipboard from 'expo-clipboard';
export const copyImageToClipboard = async cpData => {
  await Clipboard.setImageAsync(cpData);
};
