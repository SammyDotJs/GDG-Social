import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../constants';
import {rS} from '../utils';
import {formatDistanceToNow} from 'date-fns';

type PostComponentProps = {
  id: string;
  author: string;
  date: any;
  content: string;
};

const DateTimeDisplay = date => {
  //   const givenDate = new Date(date);

  const timeAgo = formatDistanceToNow(date, {addSuffix: true});

  return timeAgo;
};

const PostComponent = ({id, author, date, content}: PostComponentProps) => {
  const reformatedDate = new Date(date.toString());
  //   console.log(new Date(`${date}`).toISOString())
  return (
    <TouchableOpacity
      key={id}
      style={{
        width: '95%',
        paddingHorizontal: rS(SPACING.h8),
        paddingVertical: rS(SPACING.h5),
        borderBottomWidth: 1,
        // borderColor: COLORS.lightgreen,
        backgroundColor: COLORS.lightgreen + 19,
        borderRadius: 20,
        marginBottom: rS(SPACING.h10),
        marginHorizontal: 'auto',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: rS(FONT_SIZES.h10),
            fontFamily: FONT_FAMILY.sbi,
            color: COLORS.placeholder,
          }}>
          {author}
        </Text>
        <Text
          style={{
            fontSize: rS(FONT_SIZES.h10),
            fontFamily: FONT_FAMILY.m,
            color: COLORS.lightgray,
          }}>
          {DateTimeDisplay(reformatedDate)}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: rS(FONT_SIZES.h9),
            fontFamily: FONT_FAMILY.r,
            color: COLORS.white,
          }}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostComponent;
