import {StyleSheet} from 'react-native';
import {rS} from '../../../../utils';
import {COLORS, FONT_FAMILY, FONT_SIZES} from '../../../../constants';

export const styles = StyleSheet.create({
  profileImage: {
    width: rS(50),
    height: rS(50),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightgreen,
  },
  selectedImageContainer: {
    overflow: 'hidden',
    borderRadius: 50,
    position: 'relative',
  },
  selectedImage: {
    width: rS(50),
    height: rS(50),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: rS(FONT_SIZES.h5),
    color: COLORS.normalgreen,
    fontFamily: FONT_FAMILY.eb, 
  },
});
