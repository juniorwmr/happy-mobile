import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent, LatLng } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    const { nativeEvent } = event;
    const { coordinate } = nativeEvent;
    setPosition(coordinate);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -9.9470472,
          longitude: -67.8156968,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
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
