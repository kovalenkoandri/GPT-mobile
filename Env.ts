import Constants from 'expo-constants';

function getApiUrl() {
  const API_ENDPOINTS = {
    API_URL: Constants?.expoConfig?.extra?.API_URL,
    API_CHAT_35_TURBO: Constants?.expoConfig?.extra?.API_CHAT_35_TURBO,
    API_IMAGE_B64: Constants?.expoConfig?.extra?.API_IMAGE_B64,
    API_IMAGE_URL: Constants?.expoConfig?.extra?.API_IMAGE_URL,
    API_GET_KEY_CLOUDFLARE:
      Constants?.expoConfig?.extra?.API_GET_KEY_CLOUDFLARE,
    API_GET_KEY_ONRENDER: Constants?.expoConfig?.extra?.API_GET_KEY_ONRENDER,
    API_IMAGE_VARIATION_URL:
      Constants?.expoConfig?.extra?.API_IMAGE_VARIATION_URL,
  };

  if (!API_ENDPOINTS.API_URL) {
    throw new Error('API_URL is missing.');
  }
  if (!API_ENDPOINTS.API_CHAT_35_TURBO) {
    throw new Error('API_CHAT_35_TURBO is missing.');
  }
  if (!API_ENDPOINTS.API_IMAGE_URL) {
    throw new Error('API_IMAGE_URL is missing.');
  }
  if (!API_ENDPOINTS.API_IMAGE_B64) {
    throw new Error('API_IMAGE_B64 is missing.');
  }
  if (!API_ENDPOINTS.API_IMAGE_VARIATION_URL) {
    throw new Error('API_IMAGE_VARIATION_URL is missing.');
  }
  if (!API_ENDPOINTS.API_GET_KEY_CLOUDFLARE) {
    throw new Error('API_GET_KEY_CLOUDFLARE is missing.');
  }
  if (!API_ENDPOINTS.API_GET_KEY_ONRENDER) {
    throw new Error('API_GET_KEY_ONRENDER is missing.');
  }

  return API_ENDPOINTS;
}

export const Env = {
  API_ENDPOINTS: getApiUrl(),
};
