import { View, Text } from 'react-native';

const ThemedText = (props: { className?: string; children: React.ReactNode; colour?: string }) => {
  if (props.colour) {
    return <Text className={`${props.className} ${props.colour}`}>{props.children}</Text>;
  }

  return (
    <Text className={`break-words text-txt ${props.className}`} ellipsizeMode="tail">
      {props.children}
    </Text>
  );
};

export default ThemedText;
