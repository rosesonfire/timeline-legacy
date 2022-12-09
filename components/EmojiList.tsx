import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable, ImageURISource } from 'react-native';

export default function EmojiList({
  onSelect,
  onCloseModal,
}: {
  onSelect: (item: ImageURISource) => void;
  onCloseModal: () => void;
}) {
  const [emoji] = useState<ImageURISource[]>([
    require('../assets/adaptive-icon.png'),
    require('../assets/favicon.png'),
    require('../assets/icon.png'),
    require('../assets/splash.png'),
  ]);

  return (
    <FlatList<ImageURISource>
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
