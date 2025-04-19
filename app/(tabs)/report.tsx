import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';

import Progress from '../../assets/mascots/progress.svg';

import { COLOURS } from '~/Constants';
import { Button } from '~/components/Button';
import Heading from '~/components/Heading';
import { ScreenContent } from '~/components/ScreenContent';
import ThemedText from '~/components/ThemedText';
import { StoreType, useStore } from '~/store/store';

export default function Report() {
  const [showInfo, setShowInfo] = useState(false);

  const { uuid: userUuid, setUuid } = useStore((state: StoreType) => ({
    uuid: state.uuid,
    setUuid: state.setUuid,
  }));

  if (!userUuid) {
    setUuid(uuid.v4());
  }

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
                await copyToClipboard(userUuid);
              }}
              className="mt-2 flex-row items-center justify-center gap-x-2 rounded-lg border border-accent bg-background p-4">
              <ThemedText className="text-md text-center font-semibold color-accent">
                {userUuid}
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
      <TouchableOpacity
        className="absolute bottom-0 right-0 mb-6 mr-2 mt-2"
        onPress={() => setShowInfo(true)}>
        <MaterialIcons size={32} name="info-outline" color={COLOURS.txt} />
      </TouchableOpacity>
      <InfoModal
        visible={showInfo}
        setVisible={setShowInfo}
        title="About"
        buttonText="Close"
        body={
          <>
            <ThemedText className="mb- mt-2 text-xl font-light">
              Mascot images sourced from:
            </ThemedText>
            <Pressable className="mb-4 flex w-full items-center rounded-lg border border-txt p-4">
              <Link href="https://www.freepik.com/author/catalyststuff" asChild>
                <View className="flex-row items-center gap-x-2">
                  <ThemedText className="text-2xl">catalyststuff on Freepik</ThemedText>
                  <Feather name="external-link" size={24} color={COLOURS.txt} />
                </View>
              </Link>
            </Pressable>

            <ThemedText className="text-xl font-light">
              Learn section images sourced from:
            </ThemedText>
            <Pressable className="mb-4 flex w-full items-center rounded-lg border border-txt p-4">
              <Link href="https://www.unsplash.com" asChild>
                <View className="flex-row items-center gap-x-2">
                  <ThemedText className="text-2xl">Unsplash</ThemedText>
                  <Feather name="external-link" size={24} color={COLOURS.txt} />
                </View>
              </Link>
            </Pressable>
          </>
        }
      />
    </SafeAreaView>
  );
}

const InfoModal = (props: {
  title: string;
  body: React.ReactNode;
  buttonText: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      animationType="slide"
      className="absolute bottom-0 left-0 right-0 top-0 z-50 h-full w-full"
      transparent
      visible={props.visible}
      onRequestClose={() => {
        props.setVisible(!props.visible);
      }}>
      <Pressable
        className="centered h-full w-full justify-center bg-gray/80"
        onPress={() => {
          props.setVisible(false);
        }}>
        <View className="m-6 gap-y-4 bg-background p-6 shadow-md">
          <ThemedText className="text-center text-4xl">{props.title}</ThemedText>
          {props.body}
          <Button
            title={props.buttonText}
            onPress={() => props.setVisible(!props.visible)}
            className="w-32 self-center rounded-lg border border-txt bg-background shadow-none"
          />
        </View>
      </Pressable>
    </Modal>
  );
};
