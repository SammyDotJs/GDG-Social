import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {rS} from '../utils';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
} from '../constants';

type TextInputProps = {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  query: (text: string) => void;
  keyboardtype?: string;
  textInputStyle?: StyleProp<TextStyle>;
  isPostField?: boolean;
};

const InputField = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  query,
  keyboardtype,
  textInputStyle,
  isPostField,
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
          fontFamily: FONT_FAMILY.m,
        }}>
        {label}
      </Text>
      <TextInput
        keyboardType={keyboardtype}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          {
            width: '100%',
            borderRadius: rS(BORDER_RADIUS.b15),
            backgroundColor: COLORS.lightgreen,
            padding: rS(SPACING.h8),
            fontSize: rS(FONT_SIZES.h10),
            fontFamily: FONT_FAMILY.r,
            color: COLORS.black,
            borderWidth: 2,
            borderColor: isFocused ? COLORS.placeholder : COLORS.lightgreen,
          },
          textInputStyle,
          {
            borderColor:
              isFocused && isPostField ? COLORS.black : COLORS.normalgreen,
          },
        ]}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => query(text)}
      />
    </View>
  );
};

export default InputField;
