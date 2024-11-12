import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../constants';
import {rS} from '../utils';
import {formatDistanceToNow} from 'date-fns';

type PostComponentProps = {
  id: string;
  author: string;
  date: Date;
  content: string;
  username: string;
  extendedStyles?: StyleProp<ViewStyle>;
  isNewsFeed?: boolean;
  onPress?: () => void;
};

const DateTimeDisplay = (date: string | Date) => {
  //   const givenDate = new Date(date);

  const timeAgo = formatDistanceToNow(date, {addSuffix: true});

  return timeAgo;
};

const PostComponent = ({
  id,
  author,
  date,
  content,
  username,
  extendedStyles,
  isNewsFeed,
  onPress,
}: PostComponentProps) => {
  console.log(date);
  const reformatedDate = new Date(date.toString());
  // console.log(new Date(`${date}`).toISOString())
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      key={id}
      style={[
        {
          width: '90%',
          paddingHorizontal: rS(SPACING.h8),
          paddingVertical: rS(SPACING.h5),
          //   borderBottomWidth: 1,
          //   borderColor: COLORS.lightgreen + 19,
          backgroundColor: COLORS.lightgray1,
          borderRadius: 20,
          marginBottom: rS(SPACING.h10),
          marginHorizontal: 'auto',
        },
        extendedStyles,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: rS(FONT_SIZES.h10),
              fontFamily: FONT_FAMILY.sbi,
              color: COLORS.brownGray,
            }}>
            {`${author}.`}
          </Text>
          <Text
            style={{
              fontSize: rS(FONT_SIZES.h10),
              fontFamily: FONT_FAMILY.ri,
              color: COLORS.lightBlue1 + 89,
              marginLeft: rS(SPACING.h10),
            }}>
            {`@${username}`}
          </Text>
        </View>
        <Text
          style={{
            fontSize: rS(FONT_SIZES.h10),
            fontFamily: FONT_FAMILY.r,
            color: COLORS.black + 50,
          }}>
          {DateTimeDisplay(reformatedDate)}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: rS(SPACING.h5),
        }}>
        <Text
          style={{
            fontSize: rS(FONT_SIZES.h9),
            fontFamily: FONT_FAMILY.m,
            color: COLORS.black,
          }}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostComponent;
