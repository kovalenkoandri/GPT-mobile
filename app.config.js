import 'dotenv/config';
module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: '41fcefab-6f7d-48cb-9092-0ab3fabde6a3',
      },
      API_URL: 'https://text-davinci-003.kovalenkoandrii2931.workers.dev',
      API_CHAT_35_TURBO:
        'https://gpt-body-35-turbo.kovalenkoandrii2931.workers.dev',
      API_IMAGE_B64: 'https://gpt-image-b64.kovalenkoandrii2931.workers.dev',
      API_IMAGE_URL: 'https://gpt-image-url.kovalenkoandrii2931.workers.dev',
      API_GET_KEY_CLOUDFLARE:
        'https://gpt-get-key.kovalenkoandrii2931.workers.dev',
      API_GET_KEY_ONRENDER: 'https://gpt-back.onrender.com/api/getData',
      API_IMAGE_VARIATION_URL:
        'https://gpt-back.onrender.com/api/imageVariation',
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  };
};