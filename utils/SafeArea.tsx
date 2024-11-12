import {StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { COLORS } from '../constants';

const SafeArea = ({children, style}: any) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          //   backgroundColor: '#ffffff',
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
