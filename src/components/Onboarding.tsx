import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Animated } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import OnboardingImg1 from '../images/onboarding1.png';
import OnboardingImg2 from '../images/onboarding2.png';

const HappyOnboarding: React.FC<{ onDoneFunction: () => void }> = ({
  onDoneFunction,
}) => {
  const [selectedDotWidth] = useState(new Animated.Value(8));

  const NextButton = (onPress: () => void) => (
    <View style={styles.container}>
      <RectButton style={styles.createOrphanageButton} onPress={onPress}>
        <Feather name="arrow-right" size={20} color="#15B6D6" />
      </RectButton>
    </View>
  );

  const SelectedDotAnimation = () => {
    Animated.timing(selectedDotWidth, {
      toValue: 18,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <Onboarding
        containerStyles={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#F2F3F5',
        }}
        imageContainerStyles={{
          paddingBottom: 0,
          marginBottom: 32,
        }}
        onDone={onDoneFunction}
        NextButtonComponent={({ onPress }) => {
          return NextButton(onPress);
        }}
        DoneButtonComponent={({ onPress }) => {
          return NextButton(onPress);
        }}
        DotComponent={({ selected }) => {
          if (selected) {
            selectedDotWidth.setValue(8);
            SelectedDotAnimation();
          } else {
          }
          return (
            <Animated.View
              style={
                !selected
                  ? styles.dotStyle
                  : {
                      ...styles.dotStyle,
                      width: selectedDotWidth,
                      backgroundColor: '#FFD152',
                    }
              }
            />
          );
        }}
        bottomBarHeight={0}
        pages={[
          {
            backgroundColor: '#CEDEE6;',
            image: <Image source={OnboardingImg1} />,
            title: 'Leve felicidade para o mundo',
            subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
            titleStyles: {
              width: 280,
              height: 192,
              left: 0,
              fontFamily: 'Nunito_800ExtraBold',
              color: '#0089A5',
              fontSize: 48,
              lineHeight: 48,
              textAlign: 'left',
              marginBottom: 24,
            },
            subTitleStyles: {
              fontFamily: 'Nunito_600SemiBold',
              color: '#5C8599',
              width: 280,
              height: 60,
              lineHeight: 30,
              fontSize: 20,
              textAlign: 'left',
              marginBottom: 48,
            },
          },
          {
            backgroundColor: '#CEDEE6;',
            image: <Image source={OnboardingImg2} />,
            title: 'Escolha um orfanato no mapa e faça uma visita',
            subtitle: '',
            titleStyles: {
              width: 295,
              height: 180,
              fontFamily: 'Nunito_800ExtraBold',
              color: '#0089A5',
              fontSize: 30,
              lineHeight: 36,
              textAlign: 'right',
            },
          },
        ]}
      />
    </>
  );
};

export default HappyOnboarding;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width / 3,
    height: 100,
    bottom: 15,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dotStyle: {
    width: 8,
    height: 4,
    backgroundColor: '#BECFD8',
    borderRadius: 4,
    bottom: 60,
    left: 70,
    margin: 2,
  },
});
