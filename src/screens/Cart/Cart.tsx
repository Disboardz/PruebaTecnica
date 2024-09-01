import React from 'react';
import {CartItem} from '../../components';
import {View, FlatList, StyleSheet, Text, Pressable} from 'react-native';
import {useCart} from '../../utils/context/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const {cart, emptyCart} = useCart();
  const navigation = useNavigation();
  const totalPrice = React.useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  React.useEffect(() => {
    if (cart.length > 0) {
      navigation.setOptions({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <Pressable onPress={emptyCart}>
            <Text style={style.emptyCartText}>Vaciar</Text>
          </Pressable>
        ),
      });
    }
  }, [navigation, cart, emptyCart]);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <View style={style.container}>
      <FlatList
        style={style.flatList}
        data={cart}
        keyExtractor={item => item.id}
        numColumns={1}
        renderItem={item => <CartItem {...item.item} />}
        ListFooterComponent={<View style={style.flatListFooter} />}
      />
      <View style={style.footer}>
        <Text style={style.footerPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        <Pressable onPress={() => {}} style={style.pagar}>
          <Text style={style.pagarText}>Pagar</Text>
          <Icon
            color={'black'}
            size={30}
            style={style.pagarIcon}
            name="angle-right"
          />
        </Pressable>
      </View>
    </View>
  );
};

const EmptyCart = () => (
  <View style={style.emptyContainer}>
    <Icon size={50} name="shopping-cart" />
    <Text style={style.emptyText}>Su carrito esta vacio !</Text>
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  flatList: {
    paddingTop: 10,
  },
  flatListFooter: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 80,
    shadowColor: 'black',
    shadowOpacity: 1,
    zIndex: 2,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  footerPrice: {
    color: 'black',
    fontSize: 22,
  },
  pagar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagarText: {
    color: 'black',
    fontSize: 22,
  },
  pagarIcon: {
    height: 27,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 15,
    fontSize: 20,
  },
  emptyCartText: {
    color: 'black',
    fontSize: 19,
    fontWeight: '500',
  },
});

export default Cart;
