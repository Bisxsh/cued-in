import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

import { COLOURS } from '~/Constants';

type CheckboxProps = {
  isChecked: boolean;
  onPress: () => void;
};

const ReanimatedCheckbox = ({ isChecked, onPress }: CheckboxProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.8, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`mr-3 h-6 w-6 items-center justify-center rounded border-2 ${
        isChecked ? 'border-primary bg-primary' : 'border-primary bg-background'
      }`}>
      <Animated.View
        style={animatedStyle}
        className={`h-6 w-6 items-center justify-center rounded border-2 ${
          isChecked ? 'border-primary bg-primary' : 'border-primary bg-background'
        }`}>
        {isChecked && <FontAwesome name="check" size={14} color={COLOURS.background} />}
      </Animated.View>
    </Pressable>
  );
};

export default ReanimatedCheckbox;
