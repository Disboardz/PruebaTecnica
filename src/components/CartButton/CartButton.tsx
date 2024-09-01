import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useCart} from '../../utils/context/CartContext';
import {useNavigation} from '@react-navigation/native';

const CartButton: React.FC = () => {
  const {cart} = useCart();
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <Icon.Button
        size={30}
        style={style.buttonContainer}
        iconStyle={style.button}
        borderRadius={100}
        backgroundColor={'black'}
        onPress={() => navigation.navigate('cart')}
        name="shopping-cart">
        <Text style={style.text}>{cart.length} Productos</Text>
      </Icon.Button>
    </View>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    height: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    zIndex: 100,
  },
  button: {
    marginRight: 20,
  },
  text: {
    fontSize: 17,
    color: 'white',
  },
});

export default React.memo(CartButton);
