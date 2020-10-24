import React from 'react';
import { OrphanageDataProvider } from './contexts/orphanagedata';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from './components/Header';

import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageDetails from './screens/OrphanageDetails';
import SelectMapPosition from './screens/CreateOrphanage/SelectMapPosition';
import OrphanageData from './screens/CreateOrphanage/OrphanageData';
import OrphanageVisitData from './screens/CreateOrphanage/OrphanageVisitData';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <OrphanageDataProvider>
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
              header: () => <Header title="Adicionar um orfanato" />,
            }}
            name="SelectMapPosition"
            component={SelectMapPosition}
          />
          <Screen
            options={{
              header: () => <Header title="Adicionar um orfanato" />,
            }}
            name="OrphanageData"
            component={OrphanageData}
          />
          <Screen
            options={{
              header: () => <Header title="Adicionar um orfanato" />,
            }}
            name="OrphanageVisitData"
            component={OrphanageVisitData}
          />
        </Navigator>
      </NavigationContainer>
    </OrphanageDataProvider>
  );
}
