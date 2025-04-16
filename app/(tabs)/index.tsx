import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLOURS } from '~/components/Constats';
import Separator from '~/components/Separator';
import DateRow from '~/components/index/DateRow';
import Habit from '~/components/index/Habit';
import HomeHeading from '~/components/index/Heading';

export default function Home() {
  return (
    <SafeAreaView className="relative m-6 flex-1 bg-background">
      <ScrollView className="flex-1">
        <HomeHeading />
        <DateRow />
        <Separator text="HABITS" />

        <Habit title="My Habit" currProgress={50} targetProgress={100} intention="Stay healthy" />
      </ScrollView>
      <TouchableOpacity className="absolute bottom-4 right-4 rounded-full bg-primary p-5">
        <MaterialIcons size={32} name="add" color={COLOURS.txt} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
