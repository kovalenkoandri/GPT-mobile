import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface gptState {
  userAgentRef: string;
  userInfo: null | string;
}

// const state = {
//   userAgentRef: '',
//   userInfo: null,
// } as gptState;

export const gptSlice = createSlice({
  name: 'gpt',
  initialState: {} as gptState,
  reducers: {
    updateUserAgent: (state, action: PayloadAction<gptState>) => ({
      ...state,
      userAgentRef: action.payload.userAgentRef,
    }),
    updateUserInfo: (state, action: PayloadAction<gptState>) => ({
      ...state,
      userInfo: action.payload.userInfo,
    }),
  },
});

