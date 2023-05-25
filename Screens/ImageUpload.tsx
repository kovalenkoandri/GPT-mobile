import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import React, { useState } from 'react';
import { Env } from '../Env';
import ImageViewer from '../components/ImageViewer';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import useStopPlay from '../utils/useStopPlay';

const PlaceholderImage = require('../assets/images/background-image.png');

const apiUrl = Env.API_ENDPOINTS;

const ImageUpload = ({ playStatus, setPlaying }: any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>('');
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const navigation = useNavigation();

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  useStopPlay({ playStatus, setPlaying, navigation });

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ImageUpload;
