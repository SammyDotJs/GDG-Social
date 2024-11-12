import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import SafeArea from '../../../../utils/SafeArea';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
} from '../../../../constants';
import {rS} from '../../../../utils';
import PrimaryButton from '../../../../components/PrimaryButton';
import {styles} from '../../Profile/styles/profileScreenStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '../../../../redux/currentUserInfo';
import {ActivityIndicator} from 'react-native';

const SearchedUserDetailsScreen = ({navigation, route}: BottomTabBarProps) => {
  const currentUserId = useSelector(state => state.currentUser.userid);
  const currentUser = useSelector(state => state.currentUser);
  const [isFollowing, setIsFollowing] = useState(false);

  const [loading, setLoading] = useState(false);
  //   console.log(route.params, 'PARAMS');
  const userDetails = route?.params;
  const username = route?.params.username;
  const fullName = route?.params.fullName;
  const email = route?.params.email;
  const userid = route?.params.id;
  const profileLetter = fullName?.charAt(0);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const dispatch = useDispatch();

  console.log(currentUserId, userid);

  const loadSearchedUser = async () => {
    setLoading(true);
    try {
      //   const checkIfFollowing = await firestore().collection('users').doc(userid).collection('following')
      const following = await firestore()
        .collection('users')
        .doc(userid)
        .collection('following')
        .get();

      const followingList = following.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const followers = await firestore()
        .collection('users')
        .doc(userid)
        .collection('followers')
        .get();

      const followersList = followers.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const checkIfFollowing = followersList.forEach(user => {
        console.log(user.id, currentUserId, 'CHECK FOLLOWING');
        if (user.id === currentUserId) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
      setFollowers(followersList.length);
      setFollowing(followingList.length);
      // console.log(followersList.length, followingList.length, 'CURES');
      console.log(followersList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSearchedUser();
  }, []);
  console.log(isFollowing)
  const followUser = async () => {
    try {
      // Add target user to the following list of the current user
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('following')
        .doc(userid)
        .set({
          followedAt: firestore.FieldValue.serverTimestamp(),
          ...userDetails,
        });

      // Add current user to the followers list of the target user
      await firestore()
        .collection('users')
        .doc(userid)
        .collection('followers')
        .doc(currentUserId)
        .set({
          followedAt: firestore.FieldValue.serverTimestamp(),
          ...currentUser,
        });
      loadSearchedUser();
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      dispatch(getCurrentUser());
    }
  };
  const unfollowUser = async () => {
    try {
      // Remove target user from the following list of the current user
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('following')
        .doc(userid)
        .delete();

      // Remove current user from the followers list of the target user
      await firestore()
        .collection('users')
        .doc(userid)
        .collection('followers')
        .doc(currentUserId)
        .delete();
      loadSearchedUser();
      console.log('Successfully unfollowed the user');
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) {
    return (
      <SafeArea>
        <ActivityIndicator
          color={COLORS.placeholder}
          style={{
            margin: 'auto',
          }}
          size={rS(FONT_SIZES.h3)}
        />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.deepTeal + 90,
            width: '90%',
            padding: rS(SPACING.h8),
            borderRadius: BORDER_RADIUS.b30,
          }}>
          <View style={styles.profileImage}>
            <Text style={styles.profileText}>{profileLetter}</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: rS(SPACING.h5),
            }}>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h8),
                fontFamily: FONT_FAMILY.m,
                color: COLORS.white,
              }}>
              {`@${username}`}
            </Text>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h8),
                fontFamily: FONT_FAMILY.m,
                color: COLORS.normalgreen,
              }}>
              {fullName}
            </Text>
          </View>
          {/* User action */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: rS(SPACING.h5),
              marginVertical: rS(SPACING.h8),
            }}>
            {/* followers */}
            <View>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.b,
                  fontSize: rS(FONT_SIZES.h6),
                  color: COLORS.lightgreen,
                }}>
                {followers}
              </Text>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.m,
                  fontSize: rS(FONT_SIZES.h8),
                  color: COLORS.placeholder,
                }}>
                Followers
              </Text>
            </View>
            {/* following */}
            <View>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.b,
                  fontSize: rS(FONT_SIZES.h6),
                  color: COLORS.lightgreen,
                }}>
                {following}
              </Text>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.m,
                  fontSize: rS(FONT_SIZES.h8),
                  color: COLORS.placeholder,
                }}>
                Following
              </Text>
            </View>
            {/* posts */}
            <View>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.b,
                  fontSize: rS(FONT_SIZES.h6),
                  color: COLORS.lightgreen,
                }}>
                0
              </Text>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.m,
                  fontSize: rS(FONT_SIZES.h8),
                  color: COLORS.placeholder,
                }}>
                Posts
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: rS(SPACING.h5),
            }}>
            <PrimaryButton
              title={isFollowing ? 'Unfollow' : 'Follow'}
              buttonStyle={{
                paddingHorizontal: rS(SPACING.h5),
                paddingVertical: rS(SPACING.h13),
                width: '100%',
                backgroundColor: isFollowing
                  ? COLORS.darkTeal
                  : COLORS.lightgreen,
              }}
              titleStyle={{
                color: isFollowing ? COLORS.white : COLORS.black,
              }}
              onPress={isFollowing ? unfollowUser : followUser}
            />
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default SearchedUserDetailsScreen;
