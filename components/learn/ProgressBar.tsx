import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Bar } from 'react-native-progress';

import { COLOURS } from '~/Constants';

const ProgressBar = (props: { progress: number }) => {
  const navigation = useNavigation();

  return (
    <View className="my-2 flex w-full flex-row items-center justify-between gap-x-4 rounded-xl bg-background p-4">
      <TouchableOpacity
        className="h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm"
        onPress={() => navigation.goBack()}>
        <FontAwesome6 name="xmark" size={20} color="black" />
      </TouchableOpacity>
      <Bar
        progress={props.progress / 100}
        width={280}
        height={16}
        borderRadius={1000}
        unfilledColor={COLOURS.gray}
        color={COLOURS.primary}
      />
    </View>
  );
};

export default ProgressBar;
