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
    const response = await fetch(new Request(url, options));
    const data = await response.text();
    const parsedData = JSON.parse(data);

    if (!JSON.stringify(parsedData.choices[0].text, null, 2)) {
      return false;
    }
    return true;
  },
};
