import { keyData } from './keyRequest';
export default {
  async fetch(prompt) {
    if (prompt.length === 0 || prompt.length > 2048) {
      return new Response('The length of the payload should be in (0,2048].');
    }

    const url = 'https://api.openai.com/v1/chat/completions';
    const options = {
      method: 'POST',
      headers: {
        // 'user-agent': 'Cloudflare Worker',
        'content-type': 'application/json;charset=UTF-8',
        authorization: `Bearer ${keyData}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    };
    const response = await fetch(new Request(url, options));
    const data = JSON.parse(await response.text());
    if (!data.choices) {
      return 'An error is occurred during the request.';
    }

    return data.choices[0].message.content.trim();
  },
};
