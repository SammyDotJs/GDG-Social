import {StyleSheet} from 'react-native';
import {rS} from '../../../../utils';
import {COLORS, FONT_FAMILY, FONT_SIZES} from '../../../../constants';

export const styles = StyleSheet.create({
  profileImage: {
    width: rS(60),
    height: rS(60),
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkTeal,
  },
  selectedImageContainer: {
    overflow: 'hidden',
    borderRadius: 60,
    position: 'relative',
  },
  selectedImage: {
    width: rS(60),
    height: rS(60),
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: rS(FONT_SIZES.h5),
    color: COLORS.normalgreen,
    fontFamily: FONT_FAMILY.eb,
  },
});
