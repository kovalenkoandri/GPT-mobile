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
  const [userInfo, setUserInfo] = useState(null);
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
        setPlaying,
        playStatus,
        userInfo,
        setUserInfo,
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
