import * as Clipboard from 'expo-clipboard';
export const copyToClipboard = async (cpData, setIsCopied) => {
  await Clipboard.setStringAsync(cpData);
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 3000);
};
