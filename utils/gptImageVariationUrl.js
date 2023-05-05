export default {
    async fetch(request, env) {
    const image =
      'https://res.cloudinary.com/dpad5ltdp/image/upload/v1682337209/image_variation_original_fjzhea.png';
    const route = 'https://api.openai.com/v1/images/variations';
    const options = {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', 'Bearer ' + env.API_KEY],
      ],
      body: {
        image: image,
        n: 1,
        size: '256x256',
      },
    };
    const result = await fetch(new Request(route, options));
    console.log(result.body);
    // const url = await result.data.data[0].url;

    // console.log(url);
    // const data = JSON.stringify(await url.json())
    // if (!data) {
    //   return new Response('An error is occurred during the request.')
    // }
    return (result);
  },
};
