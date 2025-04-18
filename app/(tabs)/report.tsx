import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Progress from '../../assets/mascots/progress.svg';

import { COLOURS } from '~/Constants';
import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import { ScreenContent } from '~/components/ScreenContent';
import ThemedText from '~/components/ThemedText';

export default function Report() {
  const copyToClipboard = async (str: string) => {
    await Clipboard.setStringAsync(str);
  };
  return (
    <SafeAreaView className="relative mx-6 mt-4 flex-1">
      <ScrollView className="flex-1">
        <Heading svg={<Progress width={132} height={160} />}>
          <View className="flex flex-1 justify-center">
            <ThemedText className="text-5xl font-semibold">Report</ThemedText>
            <ThemedText className="text-5xl font-semibold">Your</ThemedText>
            <ThemedText className="text-5xl font-semibold color-primary">Progress</ThemedText>
          </View>
        </Heading>

        <View className="h-full">
          <ThemedText className="mb-2 mt-10 text-center text-2xl font-semibold">
            How To Report Progress
          </ThemedText>
          <ThemedText className="text-xl font-medium">
            1. Click your UUID below to copy it
          </ThemedText>
          <ThemedText className="text-xl font-medium">
            2. Paste it into the first question in the form
          </ThemedText>
          <ThemedText className="text-xl font-medium">
            3. Answer the remaining questions and submit!
          </ThemedText>

          <View className="flex-1 items-center justify-center">
            <ThemedText className="text-center text-2xl font-semibold">Your UUID</ThemedText>
            <TouchableOpacity
              onPress={async () => {
                await copyToClipboard('1234-5678-9101');
              }}
              className="mt-2 flex-row items-center justify-center gap-x-2 rounded-lg border border-accent bg-background p-4">
              <ThemedText className="text-center text-3xl font-semibold color-accent">
                1234-5678-9101
              </ThemedText>
              <MaterialIcons name="content-copy" size={24} color={COLOURS.accent} />
            </TouchableOpacity>
            <View className="mt-8 items-center">
              <Link href="https://forms.office.com/e/K1DKC7LsEN" asChild>
                <Button
                  title="Report Progress"
                  className="rounded-lg bg-accent px-6 py-4 text-2xl font-semibold shadow-sm"
                />
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
