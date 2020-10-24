import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useOrphanageData } from '../../contexts/orphanagedata';

import OrphanagesRepository from '../../repositories/orphanages';

const OrphanageVisitData: React.FC = () => {
  const navigation = useNavigation();
  const {
    name,
    about,
    images,
    position,
    instructions,
    setInstructions,
    opening_hours,
    setOpeningHours,
    open_on_weekends,
    setOpenOnWeekends,
    setAbout,
    setImages,
    setName,
    setPosition,
  } = useOrphanageData();

  async function handleCreateOrphanage() {
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', position.latitude as any);
    data.append('longitude', position.longitude as any);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', open_on_weekends as any);
    images.forEach((image: any, index: number) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    const response = await OrphanagesRepository.create(data);
    if (response?.status == 201) {
      alert('Cadastro efetuado com sucesso!');
      navigation.navigate('OrphanagesMap');
      setName('');
      setPosition({
        latitude: 0,
        longitude: 0,
      });
      setAbout('');
      setImages([]);
      setInstructions('');
      setOpeningHours('');
      setOpenOnWeekends(true);
      navigation.navigate('OrphanagesMap');
    } else {
      alert('Não foi possível cadastrar!');
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Visitação</Text>
        <Text style={styles.stages}>
          01 -{' '}
          <Text style={{ ...styles.stages, fontFamily: 'Nunito_800ExtraBold' }}>
            02
          </Text>
        </Text>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={(text) => setInstructions(text)}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={(text) => setOpeningHours(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton
        style={
          instructions && opening_hours
            ? styles.nextButton
            : { ...styles.nextButton, opacity: 0.6 }
        }
        onPress={handleCreateOrphanage}
        enabled={instructions && opening_hours ? true : false}
      >
        <Text style={styles.nextButtonText}>Confirmar</Text>
      </RectButton>
    </ScrollView>
  );
};

export default OrphanageVisitData;

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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
