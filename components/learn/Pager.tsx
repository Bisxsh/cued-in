import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import ThemedText from '../ThemedText';

const Pager = (props: {
  pageNum: number;
  maxNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View className="mb-6 mt-4 h-full flex-1 flex-row items-center justify-center gap-x-4 bg-background">
      <TouchableOpacity
        disabled={props.pageNum === 1}
        onPress={() => props.setPageNum((prev: number) => (prev === 1 ? prev : prev - 1))}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          className={`rounded-md p-3 py-2 ${props.pageNum === 1 ? 'bg-gray' : 'bg-primary'}`}
        />
      </TouchableOpacity>
      <ThemedText className="font-light">
        {props.pageNum} of {props.maxNum}
      </ThemedText>
      <TouchableOpacity
        disabled={props.pageNum === props.maxNum}
        onPress={() =>
          props.setPageNum((prev: number) => (prev === props.maxNum ? prev : prev + 1))
        }>
        <MaterialIcons
          name="arrow-forward"
          size={24}
          color="black"
          className={`rounded-md p-3 py-2 ${props.pageNum === props.maxNum ? 'bg-gray' : 'bg-primary'}`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pager;
