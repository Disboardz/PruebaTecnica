import {useContext} from 'react';
import {CartContext, CartContextType} from './CartProvider';

const useCart = (): CartContextType => {
  const cart = useContext(CartContext);
  return cart;
};

export default useCart;
