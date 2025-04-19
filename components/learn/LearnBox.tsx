import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import type { LinkProps } from 'expo-router';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { type ImageSourcePropType } from 'react-native';

import ThemedText from '../ThemedText';

import { IS_BASIC_VERSION } from '~/Constants';

type LearnBoxProps = {
  title: string;
  imagePath: ImageSourcePropType;
  href: LinkProps['href'];
  isComplete?: boolean;
  onPress?: () => void;
};

const LearnBox = ({ title, imagePath, isComplete, href, onPress }: LearnBoxProps) => {
  return (
    <Link href={href} asChild disabled={IS_BASIC_VERSION}>
      <TouchableOpacity className="my-3 overflow-hidden rounded-xl shadow-md" onPress={onPress}>
        <ImageBackground
          source={imagePath}
          resizeMode="cover"
          className="h-64 w-full items-center justify-center"
          imageStyle={{ borderRadius: 12 }}>
          <View className="absolute inset-0 rounded-xl bg-txt opacity-50" />

          {IS_BASIC_VERSION && (
            <View className="absolute inset-0 z-20 flex-row items-center items-center justify-center justify-center gap-x-2 rounded-xl bg-txt/90">
              <ThemedText className="text-xl font-bold color-background">Locked</ThemedText>
              <MaterialIcons name="lock" size={32} color="white" />
            </View>
          )}

          {isComplete && (
            <MaterialIcons
              name="check"
              size={20}
              color="black"
              className="absolute right-0 top-0 z-10 mr-4 mt-4 rounded-full bg-primary p-1"
            />
          )}

          <ThemedText className="text-2xl font-bold color-background">{title}</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

export default LearnBox;
