import { SafeAreaView, StyleSheet, View } from 'react-native';

import DateRow from '~/components/index/DateRow';
import HomeHeading from '~/components/index/Heading';

export default function Home() {
  return (
    <>
      {/* <Stack.Screen options={{ title: 'Tab One' }} /> */}
      <SafeAreaView style={styles.container}>
        <HomeHeading />
        <DateRow />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    margin: 24,
    marginTop: 48,
  },
});
