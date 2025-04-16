import React, { ReactNode } from 'react';
import { Platform, View } from 'react-native';

interface CardProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <View
      className={`my-2 rounded-lg bg-background px-4 py-4 shadow-sm ${className}`}
      style={Platform.OS === 'android' ? { elevation: 6 } : undefined}>
      {children}
    </View>
  );
};

export default Card;
