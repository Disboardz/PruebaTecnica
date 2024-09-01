import React, {
  useState,
  useCallback,
  PropsWithChildren,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  description: string;
  image: string;
}

export interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  emptyCart: () => {},
});

// Cart provider for the context that contains common methods to use to handle the cart such as:
// addItem
// removeItem
// updateItemQuantity

const CartProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Loading the data for the first time

  React.useEffect(() => {
    const init = async () => {
      try {
        const storagedCart = await AsyncStorage.getItem('cart');
        if (storagedCart) {
          setCart(JSON.parse(storagedCart));
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  // Updating the data in the AsyncStorage every time cart trigger a change

  React.useEffect(() => {
    const updateCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error(`Error updating the cart in async storage: ${error}`);
      }
    };

    updateCart();
  }, [cart]);

  const addItem = useCallback((item: CartItem) => {
    setCart(prev => {
      const itemExist = prev.find(cartItem => cartItem.id === item.id);

      if (itemExist) {
        return prev.map(cartItem => {
          return cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + item.quantity}
            : cartItem;
        });
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart(prev => prev.filter(cartItem => cartItem.id !== id));
  }, []);

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    setCart(prev =>
      prev.map(cartItem =>
        cartItem.id === id ? {...cartItem, quantity} : cartItem,
      ),
    );
  }, []);

  const emptyCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{cart, addItem, removeItem, updateItemQuantity, emptyCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
