import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
  async fetch(prompt) {
    const retrievedString = await AsyncStorage.getItem('@storage_Key');
    if (prompt.length === 0 || prompt.length > 2048) {
      return new Response('The length of the payload should be in (0,2048].');
    }

    let url = 'https://api.openai.com/v1/completions';
    let options = {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', 'Bearer ' + retrievedString],
      ],
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 2048,
      }),
    };
    const response = await fetch(new Request(url, options));
    const data = JSON.parse(await response.text());
    const parsedData = JSON.stringify(data.choices[0].text, null, 2);
    const replacedN = parsedData.replace(/\\n/g, '');
    if (!parsedData) {
      return new Response('An error is occurred during the request.');
    }

    return replacedN;
  },
};
