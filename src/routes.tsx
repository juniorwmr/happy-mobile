import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from './components/Header';

import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageDetails from './screens/OrphanageDetails';
import SelectMapPosition from './screens/CreateOrphanage/SelectMapPosition';
import OrphanageData from './screens/CreateOrphanage/OrphanageData';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          options={{
            headerShown: false,
          }}
          name="OrphanagesMap"
          component={OrphanagesMap}
        />
        <Screen
          options={{
            header: () => <Header showCancel={false} title="Detalhes" />,
          }}
          name="OrphanageDetails"
          component={OrphanageDetails}
        />
        <Screen
          options={{
            header: () => <Header title="Posição no Mapa" />,
          }}
          name="SelectMapPosition"
          component={SelectMapPosition}
        />
        <Screen
          options={{
            header: () => <Header title="Cadastro" />,
          }}
          name="OrphanageData"
          component={OrphanageData}
        />
      </Navigator>
    </NavigationContainer>
  );
}
