import React from 'react';
import { View, Text } from 'react-native';

const Separator = (props: { text: string; className?: string }) => {
  return (
    <View className={`relative my-4 w-full items-center justify-center ${props.className}`}>
      <View className="h-[1px] w-full bg-accent" />
      <Text className="absolute z-10 bg-background px-2 text-lg text-accent">{props.text}</Text>
    </View>
  );
};

export default Separator;
