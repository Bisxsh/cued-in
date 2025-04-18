import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import { COLOURS } from '~/Constants';

const LightningBox = (props: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <View className="flex flex-row items-center rounded-lg border border-primary bg-background p-4">
      <MaterialCommunityIcons
        name="lightning-bolt-outline"
        size={36}
        color={COLOURS.primary}
        className="mr-4"
      />
      {props.children}
    </View>
  );
};

export default LightningBox;
