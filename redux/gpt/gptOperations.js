import Constants from 'expo-constants';

import { gptSlice } from './gptReducer';

const { updateUserAgent, updateUserInfo } = gptSlice.actions;

export const userAgent = () => async (dispatch, getState) => {
  try {
    const userAgentRef = await Constants.getWebViewUserAgentAsync();
    dispatch(updateUserAgent({ userAgentRef }));
  } catch (error) {
    console.log('fetch user agent error ', error);
  }
};
export const userInfoFetch = userInfo => (dispatch, getState) => {
  if (userInfo) {
    dispatch(updateUserInfo({ userInfo }));
  }
};
