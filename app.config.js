import appBuildNumbers from './app.json';
module.exports = ({ config }) => {
  console.log(config.name); // prints 'My App'
  return {
    ...config,
    expo: {
      android: {
        versionCode: appBuildNumbers.expo.android.versionCode,
      },
    },
    extra: {
      eas: {
        projectId: '41fcefab-6f7d-48cb-9092-0ab3fabde6a3',
      },
    },
  };
};
