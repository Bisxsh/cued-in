import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import ThemedText from './ThemedText';

type ButtonProps = {
  title: string;
  textClassName?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, textClassName, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${touchableProps.className}`}>
        <ThemedText className={`${styles.buttonText} ${textClassName}`}>{title}</ThemedText>
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
};
