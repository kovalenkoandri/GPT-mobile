import Constants from 'expo-constants';

function getApiUrl() {
    const API_URL = Constants?.expoConfig?.extra?.API_URL;

  if (!API_URL) {
    throw new Error('API_URL is missing.');
  }

  return API_URL;
}

export const Env = {
  API_URL: getApiUrl(),
};
