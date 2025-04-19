import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import type { LinkProps } from 'expo-router';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { type ImageSourcePropType } from 'react-native';

import ThemedText from '../ThemedText';

type LearnBoxProps = {
  title: string;
  imagePath: ImageSourcePropType;
  href: LinkProps['href'];
  isComplete?: boolean;
  onPress?: () => void;
};

const LearnBox = ({ title, imagePath, isComplete, href, onPress }: LearnBoxProps) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity className="my-3 overflow-hidden rounded-xl shadow-md" onPress={onPress}>
        <ImageBackground
          source={imagePath}
          resizeMode="cover"
          className="h-64 w-full items-center justify-center"
          imageStyle={{ borderRadius: 12 }}>
          <View className="absolute inset-0 rounded-xl bg-txt opacity-50" />
          {isComplete && (
            <MaterialIcons
              name="check"
              size={20}
              color="black"
              className="absolute right-0 top-0 z-20 mr-4 mt-4 rounded-full bg-primary p-1"
            />
          )}

          <View className="bg-black/40 z-10 flex-row items-center space-x-2 rounded-md px-4 py-2">
            <ThemedText className="text-2xl font-bold color-background">{title}</ThemedText>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

export default LearnBox;
