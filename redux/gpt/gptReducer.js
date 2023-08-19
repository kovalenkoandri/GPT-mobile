import { createSlice } from '@reduxjs/toolkit';
const state = {
  userAgentRef: '',
  userInfo: null,
};

export const gptSlice = createSlice({
  name: 'gpt',
  initialState: state,
  reducers: {
    updateUserAgent: (state, { payload }) => ({
      ...state,
      userAgentRef: payload.userAgentRef,
    }),
    updateUserInfo: (state, { payload }) => ({
      ...state,
      userInfo: payload.userInfo,
    }),
  },
});

