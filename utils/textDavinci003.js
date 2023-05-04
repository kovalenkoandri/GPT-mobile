import { keyData } from './keyRequest';
export default {
  async fetch(prompt) {
    if (prompt.length === 0 || prompt.length > 2048) {
      return new Response('The length of the payload should be in (0,2048].');
    }

    let url = 'https://api.openai.com/v1/completions';
    let options = {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', 'Bearer ' + keyData],
      ],
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 2048,
      }),
    };
    let response = await fetch(new Request(url, options));
    let data = JSON.parse(await response.text());
    if (!data.choices) {
      return new Response('An error is occurred during the request.');
    }

    return data.choices[0].text.trim();
  },
};
