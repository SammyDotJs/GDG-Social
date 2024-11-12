import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SafeArea from '../../../utils/SafeArea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants';
import {rS} from '../../../utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {formatDistanceToNow} from 'date-fns';

type PostDetailsScreenNavigationProp = StackNavigationProp<any, 'PostDetails'>;
type PostDetailsScreenRouteProp = RouteProp<any, 'PostDetails'>;

interface Props {
  navigation: PostDetailsScreenNavigationProp;
  route: PostDetailsScreenRouteProp;
}

const DateTimeDisplay = (date: string | Date) => {
  const timeAgo = formatDistanceToNow(date, {addSuffix: true});

  return timeAgo;
};

const PostDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const userDetails = route?.params;
  const username = userDetails?.username;
  const author = userDetails?.author;
  const content = userDetails?.content;
  const date = userDetails?.createdAt.toDate();

  const reformatedDate = new Date(date.toString());

  console.log(userDetails);
  return (
    <SafeArea>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginLeft: rS(SPACING.h5),
        }}>
        <Ionicons
          name="chevron-back"
          size={rS(FONT_SIZES.h5)}
          color={COLORS.purpleBlue1}
        />
      </TouchableOpacity>
      <View
        style={{
          marginTop: rS(SPACING.h5),
        }}>
        <View
          style={[
            {
              width: '90%',
              paddingHorizontal: rS(SPACING.h8),
              paddingVertical: rS(SPACING.h5),
              backgroundColor: COLORS.lightgray1,
              borderRadius: 20,
              marginBottom: rS(SPACING.h10),
              marginHorizontal: 'auto',

            },
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
        </View>
      </View>
    </SafeArea>
  );
};

export default PostDetailsScreen;
