import { useEffect, useRef } from 'react';
const useStopPlay = ({ playStatus, setPlaying, navigation }) => {
   const timerRef = useRef(null);

  useEffect(() => {
    const handleTabPress = () => {
      if (playStatus.current === 'playing') {
        timerRef.current = setTimeout(() => {
          setPlaying(prev => !prev);
        }, 50);
        // console.log('handleTabPress ' + playStatus.current);
      }
    };

    const unsubscribePlay = navigation.addListener('tabPress', handleTabPress);

    handleTabPress();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      unsubscribePlay();
    };
  }, [navigation]);
};

export default useStopPlay;
