import Empty from '@assets/empty.svg';
import Wave from '@assets/mascots/wave.svg';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';

import { COLOURS } from '~/Constants';
import Heading from '~/components/Heading';
import Separator from '~/components/Separator';
import ThemedText from '~/components/ThemedText';
import DateRow from '~/components/index/DateRow';
import Habit from '~/components/index/Habit';
import { StoreType, useStore } from '~/store/store';

export default function Home() {
  const { habits, updateHabit, setDayComplete, removeCompletedDay } = useStore(
    (state: StoreType) => ({
      habits: state.habits,
      updateHabit: state.updateHabit,
      setDayComplete: state.setDayComplete,
      removeCompletedDay: state.removeCompletedDay,
    })
  );

  const habitList = habits.map((habit, index) => (
    <TouchableOpacity
      onPress={() => {
        const max = habit.targetProgress;
        if (habit.currProgress < max) {
          updateHabit(habit.id, { currProgress: habit.currProgress + 1 });
        }
        if (habit.currProgress === max - 1) {
          setDayComplete(new Date().toDateString());
        }
      }}
      onLongPress={() => {
        if (habit.currProgress === habit.targetProgress) {
          removeCompletedDay(new Date().toDateString());
        }

        if (habit.currProgress > 0) {
          updateHabit(habit.id, { currProgress: habit.currProgress - 1 });
        }
      }}
      key={habit.id}>
      <Habit
        title={habit.title}
        currProgress={habit.currProgress}
        targetProgress={habit.targetProgress}
        intention={habit.intention}
      />
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView className="relative m-6 flex-1 bg-background">
      <ScrollView className="flex-1">
        <HomeHeading />
        <DateRow />
        <Separator text="HABITS" />

        {habitList.length === 0 ? (
          <View className="flex h-[80%] items-center justify-center gap-y-8">
            <ThemedText className="text-center text-2xl font-light">
              Click the plus icon to create your first habit!
            </ThemedText>
            <Empty width={200} height={200} />
          </View>
        ) : (
          habitList
        )}
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
