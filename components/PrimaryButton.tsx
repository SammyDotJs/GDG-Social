import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../constants';
import {rS} from '../utils';
import {ViewStyle} from 'react-native-size-matters';

type ButtonProps = {
  title: string;
  buttonStyle?: any;
  titleStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

const PrimaryButton = ({
  title,
  buttonStyle,
  titleStyle,
  onPress,
}: ButtonProps) => {
  return (
    <Button
      title={title}
      buttonStyle={[
        {
          //   width: '100%',
          padding: rS(SPACING.h10),
          backgroundColor: COLORS.black,
          borderRadius: 99,
        },
        buttonStyle,
      ]}
      titleStyle={[
        {
          color: COLORS.white,
          fontSize: rS(FONT_SIZES.h8),
          fontFamily: FONT_FAMILY.m,
        },
        titleStyle,
      ]}
      onPress={onPress}
    />
  );
};

export default PrimaryButton;
