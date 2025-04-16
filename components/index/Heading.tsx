import Wave from '@assets/mascots/wave.svg';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import * as Svg from 'react-native-svg';

import ThemedText from '../ThemedText';

export default function HomeHeading() {
  return (
    <View className="flex flex-row">
      <View className="flex-1">
        <ThemedText className="text-4xl font-semibold">Welcome</ThemedText>
        <ThemedText className="text-4xl font-semibold">Back</ThemedText>
        <ThemedText className="text-4xl font-extrabold color-primary">Name!</ThemedText>
      </View>
      <Wave width={120} height={144} />
    </View>
  );
}
