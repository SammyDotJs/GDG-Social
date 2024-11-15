import {StatusBar, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants';

type SafeAreaTypes = {
  children: any;
  style?: StyleProp<ViewStyle>;
};

const SafeArea: React.FC<SafeAreaTypes> = ({children, style}) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.bgColor,
          paddingTop: StatusBar?.currentHeight,
        },
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
