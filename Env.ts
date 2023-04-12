import Constants from 'expo-constants';

function getApiUrl() {
  const API_ENDPOINTS = {
    API_URL: Constants?.expoConfig?.extra?.API_URL,
    API_IMAGE_URL: Constants?.expoConfig?.extra?.API_IMAGE_URL,
  };

  if (!API_ENDPOINTS.API_URL) {
    throw new Error('API_URL is missing.');
  }
  if (!API_ENDPOINTS.API_IMAGE_URL) {
    throw new Error('API_IMAGE_URL is missing.');
  }

  return API_ENDPOINTS;
}

export const Env = {
  API_ENDPOINTS: getApiUrl(),
};
