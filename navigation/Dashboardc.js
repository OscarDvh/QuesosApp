import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Homec from '../screens/Homec';
import Profile from '../screens/Profile';
import Products from '../screens/Products'
import Checkout from '../screens/Checkout';
import FinalScreen from '../screens/FinalScreen';

export default function Dashboardc() {
  return (
    <Drawer.Navigator initialRouteName='Homec'>
      <Drawer.Screen
        name='Homec'
        component={Homec}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name='Products'
        component={Products}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name='Checkout'
        component={Checkout}
        options={{ 
          headerShown: true,
          drawerItemStyle: { display: 'none' }

        }}
      />
      <Drawer.Screen
        name='FinalScreen'
        component={FinalScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' } 
        }}  
      />
      

    </Drawer.Navigator>
  );
}
/* */