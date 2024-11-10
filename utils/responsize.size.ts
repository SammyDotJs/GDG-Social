import {PropsWithChildren} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

type ScaleProps = PropsWithChildren<{
  size: number;
  factor: number;
}>;

const rS = (size: number) => scale(size);

const rV = (size: number) => verticalScale(size);

const rMS = ({size, factor}: ScaleProps) => moderateScale(size, factor);

export {rS, rV, rMS};
