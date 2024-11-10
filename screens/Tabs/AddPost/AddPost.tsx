import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import LoadingModal from '../../../components/LoadingModal';
import {FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants';
import {rS} from '../../../utils';

const AddPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LoadingModal isVisible={isLoading} />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: rS(SPACING.h7),
            flexGrow: 1,
          }}>
          <View
            style={{
              paddingVertical: rS(SPACING.h5),
            }}>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h6),
                fontFamily: FONT_FAMILY.sb,
              }}>
              Create a post
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default AddPost;
