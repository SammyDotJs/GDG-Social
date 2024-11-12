import {StyleSheet} from 'react-native';
import {rS} from '../../../../utils';
import {COLORS, FONT_FAMILY, FONT_SIZES} from '../../../../constants';

export const styles = StyleSheet.create({
  profileImage: {
    width: rS(70),
    height: rS(70),
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightgreen,
  },
  selectedImageContainer: {
    overflow: 'hidden',
    borderRadius: 70,
    position: 'relative',
  },
  selectedImage: {
    width: rS(70),
    height: rS(70),
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: rS(FONT_SIZES.h5),
    color: COLORS.lightBlue1,
    fontFamily: FONT_FAMILY.eb,
  },
});
