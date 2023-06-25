import React, { useState, useEffect, useRef } from 'react';
import { readStringFromStorage } from './utils/saveStringToStorage';
import KeyRouter from './components/KeyRouter';
import AuthRouter from './components/AuthRouter';

export const useRoute = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isTestKeyPassed, setIsTestKeyPassed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playStatus = useRef('');
  const isTestKey = useRef(false);
  const scrollViewRef = useRef(null);
  const userAgentRef = useRef('');
  const [userInfo, setUserInfo] = useState(null);
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
        scrollViewRef,
        userAgentRef,
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
        scrollViewRef,
        userAgentRef,
        isAuth,
        toggleAuthKey,
      }}
    />
  );
};
