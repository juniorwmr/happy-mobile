import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

import HappyOnboarding from './src/components/Onboarding';
import Routes from './src/routes';

export default function App() {
  const [onboarding, setOnboarding] = useState<boolean>(false);
  async function onDoneFunction() {
    setOnboarding(true);
    await AsyncStorage.setItem('onboarding', 'done');
  }

  useEffect(() => {
    async function getOnboardingValue() {
      const onboardingvalue = await AsyncStorage.getItem('onboarding');
      if (onboardingvalue) {
        setOnboarding(true);
      } else {
        setOnboarding(false);
      }
    }
    getOnboardingValue();
  }, []);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return onboarding ? (
      <Routes />
    ) : (
      <HappyOnboarding onDoneFunction={onDoneFunction} />
    );
  }
}
