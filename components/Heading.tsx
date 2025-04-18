import { View, Text } from 'react-native';

const Heading = (props: {
  children: React.ReactNode | React.ReactNode[];
  svg: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={`flex flex-row items-center ${props.className}`}>
      <View className="flex-1">{props.children}</View>
      {props.svg}
    </View>
  );
};

export default Heading;
