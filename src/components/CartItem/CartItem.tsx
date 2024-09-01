import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {CartItem as CartItemData} from '../../utils/context/CartContext/CartProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useCart} from '../../utils/context/CartContext';

interface CartItemProps extends CartItemData {}

const CartItem: React.FC<CartItemProps> = props => {
  const {removeItem} = useCart();

  return (
    <View style={style.container}>
      <Image
        resizeMode="contain"
        style={style.image}
        source={{uri: props.image}}
      />
      <Text numberOfLines={2} style={style.description}>
        {props.description}
      </Text>
      <Pressable onPress={() => removeItem(props.id)}>
        <Icon
          style={style.button}
          color={'black'}
          solid
          size={20}
          suppressHighlighting={true}
          name="trash-alt"
        />
      </Pressable>

      <View>
        <Text style={style.quantity}>Cantidad: {props.quantity}</Text>
        <Text style={style.price}>
          ${(props.price * props.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 100,
    alignItems: 'center',
  },
  image: {
    height: 80,
    aspectRatio: 1,
  },
  description: {
    flex: 1,
    color: 'black',
    textAlign: 'left',
    fontSize: 17,
    lineHeight: 23,
    alignSelf: 'flex-start',
    paddingTop: 20,
    paddingLeft: 5,
  },
  button: {width: 80, paddingLeft: 20, backgroundColor: 'transparent'},
  price: {
    color: 'black',
    fontSize: 20,
    textAlign: 'right',
  },
  quantity: {
    fontSize: 15,
  },
});

export default React.memo(CartItem);
