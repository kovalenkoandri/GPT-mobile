import { useEffect, useRef } from 'react';
import Constants from 'expo-constants';

const useUserAgent = ({ scrollViewRef, userAgentRef }) => {

  useEffect(() => {
    const fetchUserAgent = async () => {
      userAgentRef.current = await Constants.getWebViewUserAgentAsync();
    };
    fetchUserAgent();
    if (scrollViewRef.current) {
      scrollViewRef.current.focus();
    }
  }, []);
};

export default useUserAgent;
