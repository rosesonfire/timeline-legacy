import { StyleSheet, Image, ImageURISource } from 'react-native';

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: {
  placeholderImageSource: ImageURISource;
  selectedImage: string | null;
}) {
  const imageSource = selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
