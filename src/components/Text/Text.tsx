import React from 'react';
import {TextProps, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface TextCustomProps extends TextProps {}

const Text: React.FC<TextCustomProps> = ({style, children, ...props}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      {...props}
      style={[{color: isDarkMode ? Colors.white : Colors.dark}, style]}>
      {children}
    </Text>
  );
};

export default Text;
