import {View, Text} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import {COLORS, FONT_SIZES, SPACING} from '../constants';
import {rS} from '../utils';

type ButtonProps = {
  title: string;
  buttonStyle?: any;
  titleStyle?: any;
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
          width: '100%',
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
        },
        titleStyle,
      ]}
      onPress={onPress}
    />
  );
};

export default PrimaryButton;
