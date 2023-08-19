import { createSlice } from '@reduxjs/toolkit';
const state = {
  userAgentRef: '',
};

export const gptSlice = createSlice({
  name: 'gpt',
  initialState: state,
  reducers: {
    updateUserAgent: (state, { payload }) => ({
      ...state,
      userAgentRef: payload.userAgentRef,
    }),
  },
});

