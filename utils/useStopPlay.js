import { useEffect, useRef } from 'react';
const useStopPlay = ({ playStatus, setPlaying, navigation }) => {
   const timerRef = useRef(null);

  useEffect(() => {
    const handleTabPress = () => {
      if (playStatus === 'playing') {
        timerRef.current = setTimeout(() => {
          setPlaying(prev => !prev);
        }, 50);
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
