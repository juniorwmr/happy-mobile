import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CursorImg from '../images/map-cursor.png';

const InstructionMap: React.FC<{ zIndex: number; handleClick: () => void }> = ({
  zIndex,
  handleClick,
}) => {
  const [size] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(size, {
          toValue: 0,
          duration: 500,
          delay: 700,
          useNativeDriver: false,
        }),
        Animated.timing(size, {
          toValue: 50,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: 4,
      }
    ).start();
  }, []);

  return (
    <View style={{ ...styles.container, zIndex }}>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Animated.View style={{ paddingTop: size }}>
          <Image source={CursorImg} />
        </Animated.View>
        <Text style={styles.instructionText}>
          Toque no mapa para adicionar um orfanato
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InstructionMap;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#15C3D6',
    justifyContent: 'center',
    alignItems: 'center',

    opacity: 0.75,
  },

  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  instructionText: {
    width: 203,
    height: 102,
    fontSize: 24,
    lineHeight: 34,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Nunito_800ExtraBold',
  },
});
