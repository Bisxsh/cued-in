import Wave from '@assets/mascots/wave.svg';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLOURS } from '~/Constants';
import Heading from '~/components/Heading';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import DateRow from '~/components/index/DateRow';
import Habit from '~/components/index/Habit';
import { StoreType, useStore } from '~/store/store';

export default function Home() {
  const { habits } = useStore((state: StoreType) => ({
    habits: state.habits,
  }));

  const habitList = habits.map((habit) => (
    <Habit
      key={habit.id}
      title={habit.title}
      currProgress={habit.currProgress}
      targetProgress={habit.targetProgress}
      intention={habit.intention}
    />
  ));

  return (
    <SafeAreaView className="relative m-6 flex-1 bg-background">
      <ScrollView className="flex-1">
        <HomeHeading />
        <DateRow />
        <Separator text="HABITS" />

        {habitList}
      </ScrollView>

      <Link href="/create/create" asChild>
        <TouchableOpacity
          className="absolute bottom-4 right-4 rounded-full bg-primary p-5 shadow"
          style={Platform.OS === 'android' ? { elevation: 6 } : undefined}>
          <MaterialIcons size={32} name="add" color={COLOURS.txt} />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

function HomeHeading() {
  const [firstLaunch, setFirstLaunch] = useState(true);
  AsyncStorage.getItem('firstLaunch').then((value) => {
    if (value === null) {
      AsyncStorage.setItem('firstLaunch', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
      setFirstLaunch(true);
      console.log('First launch detected, setting firstLaunch to true');
    } else {
      setFirstLaunch(false);
    }
  });

  return (
    <Heading svg={<Wave width={120} height={144} />}>
      <View className="flex flex-1 justify-center">
        <ThemedText className="text-4xl font-semibold">Welcome</ThemedText>
        {!firstLaunch && <ThemedText className="text-4xl font-semibold">Back</ThemedText>}
        <ThemedText className="text-4xl font-extrabold color-primary">Name!</ThemedText>
      </View>
    </Heading>
  );
}
