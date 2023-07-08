import * as Clipboard from 'expo-clipboard';
export const copyImageToClipboard = async (cpData, setIsCopied) => {
  await Clipboard.setImageAsync(cpData);
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 3000);
};
