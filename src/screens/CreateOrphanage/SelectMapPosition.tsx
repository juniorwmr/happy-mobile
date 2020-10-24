import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LinearGradient } from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { View, StyleSheet, Dimensions, Text, Alert, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import InstructionMap from '../../components/InstructionMap';
import AsyncStorage from '@react-native-community/async-storage';
import { useOrphanageData } from '../../contexts/orphanagedata';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [zIndexInstructions, setZIndexInstructions] = useState(0);
  const { position, setPosition } = useOrphanageData();

  function handleSelectMapPosition(event: MapEvent) {
    const { nativeEvent } = event;
    const { coordinate } = nativeEvent;
    setPosition(coordinate);
  }

  async function handleClickMap() {
    setZIndexInstructions(0);
    await AsyncStorage.setItem('map-instructions', 'done');
  }

  useEffect(() => {
    async function MapInstructionsVerify() {
      const mapInstructions = await AsyncStorage.getItem('map-instructions');
      if (!mapInstructions) {
        setZIndexInstructions(1);
      }
    }
    async function permissionToGetCurrentLocation() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }

      const { coords } = await Location.getCurrentPositionAsync();
      setPosition(coords);
    }
    MapInstructionsVerify();
    permissionToGetCurrentLocation();
  }, []);

  return (
    <>
      <InstructionMap
        zIndex={zIndexInstructions}
        handleClick={handleClickMap}
      />
      {position?.latitude !== 0 ? (
        <View style={styles.container}>
          <MapView
            initialRegion={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            style={styles.mapStyle}
            onPress={handleSelectMapPosition}
          >
            <Marker
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
            />
          </MapView>
          <RectButton
            style={styles.nextButton}
            onPress={() => navigation.navigate('OrphanageData')}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        </View>
      ) : (
        <ShimmerPlaceHolder
          style={styles.mapStyle}
          LinearGradient={LinearGradient}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
