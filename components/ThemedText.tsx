import React from 'react';
import { View, Text } from 'react-native';

const ThemedText = (props: { className?: string; children: React.ReactNode; colour?: string }) => {
  if (props.colour) {
    return (
      <View>
        <Text className={`${props.className} ${props.colour}`}>{props.children}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text className={`text-txt ${props.className}`}>{props.children}</Text>
    </View>
  );
};

export default ThemedText;
