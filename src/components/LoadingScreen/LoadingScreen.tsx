import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LoadingScreen: React.FC = () => {
  return (
    <View style={[style.container]}>
      <Text style={style.text}>Cargando...</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 25,
  },
});

export default LoadingScreen;
