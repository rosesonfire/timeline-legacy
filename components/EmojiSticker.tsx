import { View, Image, ImageSourcePropType } from 'react-native';
import {
  GestureEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}) {
  const scaleImage = useSharedValue(imageSize);

  const onDoubleTap: (event: GestureEvent<TapGestureHandlerEventPayload>) => void =
    useAnimatedGestureHandler({
      onActive: () => {
        if (scaleImage.value) {
          scaleImage.value = scaleImage.value * 2;
        }
      },
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <View style={{ top: -350 }}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <AnimatedImage
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </TapGestureHandler>
    </View>
  );
}
