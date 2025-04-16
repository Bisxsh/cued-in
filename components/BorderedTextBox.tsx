import React from 'react';
import { View, Text } from 'react-native';

const BorderedTextBox = (props: {
  title: string;
  titleSize?: number;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <View className="relative mx-2 my-4 rounded-lg border border-accent bg-background px-4 py-4 pt-6">
      <Text
        className="absolute left-4 top-[-8] bg-background px-4 font-light color-accent"
        style={{ fontSize: props.titleSize || 14 }}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
};

export default BorderedTextBox;
