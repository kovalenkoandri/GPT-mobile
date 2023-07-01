import * as Clipboard from 'expo-clipboard';
export const copyToClipboard = async cpData => {
  await Clipboard.setStringAsync(cpData);
};
