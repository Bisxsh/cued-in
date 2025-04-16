import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  fontAwesomeName?: React.ComponentProps<typeof FontAwesome>['name'];
  materialIconName?: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) => {
  if (props.fontAwesomeName) {
    return (
      <FontAwesome
        size={28}
        style={styles.tabBarIcon}
        color={props.color}
        name={props.fontAwesomeName}
      />
    );
  }
  return (
    <MaterialIcons
      size={28}
      style={styles.tabBarIcon}
      color={props.color}
      name={props.materialIconName}
    />
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
