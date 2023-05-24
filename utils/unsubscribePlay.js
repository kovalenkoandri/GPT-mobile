import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();

export const unsubscribePlay = navigation.addListener(
  'tabPress',
  () => {
    console.log('paste here tab pressed');
    console.log(playStatus.current);

    if (
      playStatus.current === 'playing' ||
      playStatus.current === 'buffering'
    ) {
      setPlaying(prev => {
        console.log(prev);
        if (!prev === true) {
          return !prev;
        }
      });
    }
  },
  [navigation]
);
