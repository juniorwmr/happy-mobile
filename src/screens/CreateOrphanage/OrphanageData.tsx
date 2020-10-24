import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { useOrphanageData } from '../../contexts/orphanagedata';

export default function OrphanageData() {
  const navigation = useNavigation();
  const {
    name,
    setName,
    about,
    setAbout,
    images,
    setImages,
  } = useOrphanageData();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Eita, precisamos de acesso as suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;
    setImages([...images, image]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Dados</Text>
        <Text style={styles.stages}>
          <Text style={{ ...styles.stages, fontFamily: 'Nunito_800ExtraBold' }}>
            01
          </Text>{' '}
          - 02
        </Text>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={(text) => setAbout(text)}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImageContainer}>
        {images &&
          images.map((image: any) => (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          ))}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <RectButton
        style={
          name && about && images[0]
            ? styles.nextButton
            : { ...styles.nextButton, opacity: 0.6 }
        }
        onPress={() => navigation.navigate('OrphanageVisitData')}
        enabled={name && about && images[0] ? true : false}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',

    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',

    justifyContent: 'space-between',
  },

  stages: {
    color: '#5c8599',
    fontSize: 14,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  uploadedImageContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },
});
