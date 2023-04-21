import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  setSelectedImage,
}) {
  const imageSource =
    selectedImage !== ''
      ? { uri: selectedImage }
      : { uri: `data:image/png;base64,${placeholderImageSource}` };
   
      setSelectedImage('');
     
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
