import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {CartItem} from '../../utils/context/CartContext/CartProvider';
import ProductAddButton from './ProductAddButton';
import {useCart} from '../../utils/context/CartContext';

interface ProductItemProps extends CartItem {
  extendedButton: string | null;
  handleExtended: (id: string | null) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  description,
  price,
  title,
  image,
  extendedButton,
  handleExtended,
  ...props
}) => {
  const {addItem, removeItem, updateItemQuantity, cart} = useCart();
  const quantity = React.useMemo(() => {
    return cart.find(item => item.id === id)?.quantity || 0;
  }, [cart, id]);

  const handleAdd = () => {
    addItem({id, description, price, title, image, quantity: quantity + 1});
  };

  const handleRemove = () => {
    removeItem(id);
  };

  const handleUpdate = (plus: boolean) => {
    const newQuantity = plus ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <View style={style.container}>
      <Image resizeMode="center" style={style.image} source={{uri: image}} />
      <Text style={style.precio}>${price}</Text>
      <Text style={style.description} numberOfLines={2}>
        {description}
      </Text>
      <ProductAddButton
        handleExtended={handleExtended}
        quantity={quantity}
        extended={extendedButton === id}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
        id={id}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 25,
  },
  precio: {
    color: 'black',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  description: {
    textAlign: 'left',
    paddingRight: 50,
  },
});

export default React.memo(ProductItem);
