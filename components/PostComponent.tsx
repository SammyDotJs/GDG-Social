import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../constants';
import {rS} from '../utils';
import {formatDistanceToNow} from 'date-fns';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

type PostComponentProps = {
  id: string;
  author: string;
  date: Date;
  content: string;
  username: string;
  extendedStyles?: StyleProp<ViewStyle>;
  isNewsFeed?: boolean;
  onPress?: () => void;
  goToDetailsScreen?: () => void;
  deletePost?: () => void;
  isProfile?: boolean;
};

const DateTimeDisplay = (date: string | Date) => {
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
  isProfile,
  onPress,
  goToDetailsScreen,
  deletePost,
}: PostComponentProps) => {
  const reformatedDate = new Date(date.toString());
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
          backgroundColor: COLORS.lightpurple,
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
          <TouchableOpacity onPress={goToDetailsScreen}>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h10),
                fontFamily: FONT_FAMILY.sbi,
                color: COLORS.brownGray,
              }}>
              {`${author}.`}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: rS(FONT_SIZES.h10),
              fontFamily: FONT_FAMILY.mi,
              color: COLORS.lightBlue1,
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
      {isProfile && (
        <TouchableOpacity
          onPress={deletePost}
          style={{
            marginLeft: 'auto',
            width: rS(SPACING.h5),
            height: rS(SPACING.h5),
          }}>
          <EvilIcons name="trash" size={rS(SPACING.h5)} color={COLORS.error} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default PostComponent;
