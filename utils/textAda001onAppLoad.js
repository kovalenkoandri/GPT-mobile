export default {
  async fetch(prompt, keyRef) {
    let url = 'https://api.openai.com/v1/completions';
    let options = {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', 'Bearer ' + keyRef],
      ],
      body: JSON.stringify({
        model: 'text-ada-001',
        prompt: prompt,
        max_tokens: 1,
      }),
    };
    let response = await fetch(new Request(url, options));
    let data = JSON.parse(await response.text());
    if (!data.choices) {
      return false;
    }
    return true;
  },
};
