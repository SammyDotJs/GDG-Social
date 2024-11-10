import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../constants';
import {modalStyles} from './styles/modalStyles';

type AlertModalTypes = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
};

const AlertModal = ({isVisible, onClose, title}: AlertModalTypes) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0}
      onBackdropPress={onClose}
      style={modalStyles.modal}
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}>
      <View style={modalStyles.container}>
        <Text style={[modalStyles.title, {color: COLORS.white}]}>{title}</Text>
      </View>
    </Modal>
  );
};

export default AlertModal;
