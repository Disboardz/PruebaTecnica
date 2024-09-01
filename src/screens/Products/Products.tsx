import React from 'react';
import {View, Alert, StyleSheet, FlatList} from 'react-native';
import {CartItem} from '../../utils/context/CartContext/CartProvider';
import {LoadingScreen, ProductItem, CartButton} from '../../components';
import {useFocusEffect} from '@react-navigation/native';

const Products = () => {
  const [products, setProducts] = React.useState<CartItem[]>([]);
  const [extendedButton, setExtendedButton] = React.useState<string | null>(
    null,
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleScroll = () => {
    setExtendedButton(null);
  };

  const handleExtendedButton = (id: string | null) => {
    setExtendedButton(id);
  };

  const onScreenBlur = () => {
    setExtendedButton(null);
  };

  React.useEffect(() => {
    const init = async () => {
      try {
        let response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP Status Error: Http Status: ${response.status}`);
        }

        const _products = await response.json();

        // getting the products and upload it to the state of product screen
        setProducts(_products);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', error.message, [{text: 'Ok', onPress: () => {}}], {
          cancelable: true,
        });
      }
    };

    init();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => onScreenBlur();
    }, []),
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={style.container}>
      <CartButton />
      <FlatList
        style={style.flatlist}
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={item => (
          <ProductItem
            {...item.item}
            handleExtended={handleExtendedButton}
            extendedButton={extendedButton}
          />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={<View style={style.flatListFooter} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  flatlist: {
    paddingTop: 10,
  },
  flatListFooter: {
    height: 90,
  },
});

export default Products;
