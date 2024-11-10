import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {rS} from '../utils';
import {BORDER_RADIUS, COLORS, FONT_SIZES, SPACING} from '../constants';

type TextInputProps = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  query: (text: string) => void;
  keyboardtype?: string;
};

const InputField = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  query,
  keyboardtype
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'column',
        gap: rS(SPACING.h12),
        width: '100%',
        marginHorizontal: 'auto',
      }}>
      <Text
        style={{
          fontSize: rS(FONT_SIZES.h9),
          color: isFocused ? COLORS.black : COLORS.lightgray,
          fontWeight: '700',
        }}>
        {label}
      </Text>
      <TextInput
        keyboardType={keyboardtype}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          borderRadius: rS(BORDER_RADIUS.b15),
          backgroundColor: COLORS.lightgreen,
          padding: rS(SPACING.h8),
          fontSize: rS(FONT_SIZES.h10),
          color: COLORS.black,
          fontWeight: '600',
          borderWidth: 2,
          borderColor: isFocused ? COLORS.placeholder : COLORS.lightgreen,
        }}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => query(text)}
      />
    </View>
  );
};

export default InputField;
