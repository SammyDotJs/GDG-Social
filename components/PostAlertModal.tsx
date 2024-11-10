import React from 'react';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../constants';
import {modalStyles} from './styles/modalStyles';

type PostAlertModalTypes = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  modalContainerStyle?: StyleProp<ViewStyle>;
};

const PostAlertModal = ({
  isVisible,
  onClose,
  title,
  modalContainerStyle,
}: PostAlertModalTypes) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0}
      onBackdropPress={onClose}
      style={modalStyles.modal}
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}>
      <View style={[modalStyles.container, modalContainerStyle]}>
        <Text style={[modalStyles.title, {color: COLORS.white}]}>{title}</Text>
      </View>
    </Modal>
  );
};

export default PostAlertModal;
