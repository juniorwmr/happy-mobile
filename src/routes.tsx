import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageDetails from './screens/OrphanageDetails';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          options={{
            headerTitle: 'Mapa de Orfanatos',
            headerTitleAlign: 'center',
          }}
          name="OrphanagesMap"
          component={OrphanagesMap}
        />
        <Screen
          options={{
            headerTitle: 'Detalhes',
            headerTitleAlign: 'center',
          }}
          name="OrphanageDetails"
          component={OrphanageDetails}
        />
      </Navigator>
    </NavigationContainer>
  );
}
