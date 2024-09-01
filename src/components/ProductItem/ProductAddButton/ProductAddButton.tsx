import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type ProductAddButton = {
  quantity: number;
  extended: boolean;
  handleExtended: (id: string | null) => void;
  handleAdd: () => void;
  handleRemove: () => void;
  handleUpdate: (plus: boolean) => void;
  id: string;
};

const ProductAddButton: React.FC<ProductAddButton> = ({
  id,
  quantity,
  extended,
  handleExtended,
  handleAdd,
  handleRemove,
  handleUpdate,
}) => {
  const handleMinus = () => {
    if (quantity <= 1) {
      handleRemove();
      handleExtended(null);
    } else {
      handleUpdate(false);
    }
  };

  if (extended) {
    return (
      <View style={[style.container, style.extendedContainer]}>
        <Icon.Button
          color={'white'}
          name={quantity <= 1 ? 'trash-alt' : 'minus'}
          backgroundColor={'transparent'}
          iconStyle={style.extendedIcon}
          onPress={handleMinus}
        />
        <Text style={style.quantity}>{quantity} ct</Text>
        <Icon.Button
          color={'white'}
          name="plus"
          backgroundColor={'transparent'}
          iconStyle={style.extendedIcon}
          onPress={() => handleUpdate(true)}
        />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Icon.Button
        color={'white'}
        borderRadius={100}
        backgroundColor={'black'}
        iconStyle={style.icon}
        name="plus"
        onPress={() => {
          if (quantity < 1) {
            handleAdd();
          }
          handleExtended(id);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  extendedContainer: {
    flex: 1,
    left: 0,
    backgroundColor: 'black',
    borderRadius: 100,
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 0,
    padding: 2,
    paddingHorizontal: 4,
    color: 'white',
  },
  extendedIcon: {
    marginRight: 0,
  },
  quantity: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '500',
  },
});

export default React.memo(ProductAddButton);
