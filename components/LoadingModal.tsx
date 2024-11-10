import {View} from 'react-native';
import {Text} from 'react-native';
import {CONSTANT_STYLES} from '../constants';
import {rS} from '../utils';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {modalStyles} from './styles/modalStyles';

type LoadingProps = {
  isVisible: boolean;
};

const LoadingModal = ({isVisible}: LoadingProps) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0}
      style={[
        modalStyles.modal,
        {
          justifyContent: 'center',
        },
      ]}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View
        style={[
          modalStyles.container,
          {
            width: rS(80),
            height: rS(80),
          },
          CONSTANT_STYLES.flexColumn,
        ]}>
        <LottieView
          autoPlay
          style={{
            width: 70,
            height: 70,
          }}
          source={require('../assets/animations/Ntl4ulo41s.json')}
        />
      </View>
    </Modal>
  );
};

export default LoadingModal;
