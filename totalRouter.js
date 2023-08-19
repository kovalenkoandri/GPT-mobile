import React, { useState, useEffect, useRef } from 'react';
import { readStringFromStorage } from './utils/saveStringToStorage';
import KeyRouter from './components/KeyRouter';
import AuthRouter from './components/AuthRouter';

export const useRoute = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isTestKeyPassed, setIsTestKeyPassed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playStatus = useRef('');
  const isTestKey = useRef(false);
  const timerRef = useRef(null);

  const checkLocalKey = async () => {
    isTestKey.current = await readStringFromStorage();
    isTestKey.current ? setIsTestKeyPassed(true) : setIsTestKeyPassed(false);
  };
  useEffect(() => {
    checkLocalKey();
  }, [isTestKeyPassed]);
  const toggleAuthKey = () => {
    setIsAuth(prevState => !prevState);
  };
  return isAuth ? (
    <AuthRouter
      {...{
        isAuth,
        toggleAuthKey,
      }}
    />
  ) : (
    <KeyRouter
      {...{
        isTestKeyPassed,
        setIsTestKeyPassed,
        playing,
        setPlaying,
        playStatus,
        isAuth,
        toggleAuthKey,
        timerRef,
      }}
    />
  );
};
