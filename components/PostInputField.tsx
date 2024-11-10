import {View, Text, TextInput} from 'react-native';
import React from 'react';

type PostInputFieldProps = {
  label: string;
  query: (text: string) => void;
  value: string;
};

const PostInputField = ({label, query, value}: PostInputFieldProps) => {
  return (
    <View>
      <Text>PostInputField</Text>
      <TextInput value={value} onChangeText={text => query(text)} />
    </View>
  );
};

export default PostInputField;
