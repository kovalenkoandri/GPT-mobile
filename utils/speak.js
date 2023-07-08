import * as Speech from 'expo-speech';

export const speak = async (thingToSay, setIsVoice) => {
  const isSpeak = await Speech.isSpeakingAsync();
  if (isSpeak) {
    Speech.stop(thingToSay);
    setIsVoice(false);
  } else {
    Speech.speak(thingToSay);
    setIsVoice(true);
  }
};
