import axios from 'axios';
import { Env } from '../Env';
const apiUrl = Env.API_ENDPOINTS;
export let keyData;

// const keyRequest = async () => {
//   const keyResponse = await axios.post(
//     apiUrl.API_GET_KEY_ONRENDER,
//     {
//       prompt: 'sk-v9VjHfRZ',
//     }
//     // { timeout: 1000 }
//   );
//       const keyData = keyResponse.data.DATA;
//       console.log(keyData);
// }
//       keyRequest();
export const keyRequest = async () => {
    const keyResponse = await axios.post(
      apiUrl.API_GET_KEY_CLOUDFLARE,
      {
        prompt: 'sk-v9VjHfRZ',
      },
      { timeout: 1000 }
    );
  keyData = keyResponse.data;
};
