import {StyleSheet} from 'react-native';
import {COLORS, FONT_SIZES, SPACING} from '../../constants';
import {rS} from '../../utils';

export const modalStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    padding: rS(SPACING.h10),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '50%',
    opacity: 0.9,
    shadowColor: '#00000089',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,
    elevation: 7,
  },

  modal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: rS(FONT_SIZES.h9),
    color: COLORS.white,
    textAlign: 'center',
  },
});
