export default {
  async fetch(prompt, keyRef) {
    if (prompt.length === 0 || prompt.length > 2048) {
      return 'The length of the payload should be in (0,2048].';
    }

    const url = 'https://api.openai.com/v1/images/generations';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        authorization: `Bearer ${keyRef.current}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '256x256',
        response_format: 'b64_json',
      }),
    };

    const response = await fetch(new Request(url, options));
    const extractedData = await response.json();
    const b64Data = extractedData.data[0].b64_json;
    const data = JSON.stringify(b64Data);
    if (!data) {
      return 'An error is occurred during the b64_json request.';
    }
    return data;
  },
};
