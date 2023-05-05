import { keyData } from './keyRequest';

export default {
  async fetch(prompt) {
    if (prompt.length === 0 || prompt.length > 2048) {
      return 'The length of the payload should be in (0,2048].';
    }

    const url = 'https://api.openai.com/v1/images/generations';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        authorization: `Bearer ${keyData}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '256x256',
      }),
    };

    const response = await fetch(new Request(url, options));
    const extractedData = await response.json();
    const b64Data = extractedData.data[0].url;
    const data = JSON.stringify(b64Data);
    if (!data) {
      return 'An error is occurred during uri the request.';
    }
    return data;
  },
};
