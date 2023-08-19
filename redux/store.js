import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { gptSlice } from './gpt/gptReducer';

import reactotron from './ReactotronConfig';

const rootReducer = combineReducers({
  [gptSlice.name]: gptSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [reactotron.createEnhancer()],
});

