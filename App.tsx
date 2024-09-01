import React from 'react';
import {StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CartProvider} from './src/utils/context/CartContext';

// imports from react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Products, Cart} from './src/screens';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="products">
            <Stack.Screen
              name="products"
              component={Products}
              options={{title: 'Productos', headerTitleAlign: 'center'}}
            />
            <Stack.Screen
              name="cart"
              component={Cart}
              options={{title: 'Carrito'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </>
  );
}

export default App;
