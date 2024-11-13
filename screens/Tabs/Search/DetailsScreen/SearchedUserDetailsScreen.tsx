import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '../../../../redux/currentUserInfo';
import {ActivityIndicator} from 'react-native';
import {PostsType} from '../../Home/HomeScreen';
import PostComponent from '../../../../components/PostComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchedUserDetailsScreen: React.FC<BottomTabBarProps> = ({
  navigation,
  route,
}) => {
  const currentUserId = useSelector((state: any) => state.currentUser.userid);
  const currentUser = useSelector((state: any) => state.currentUser);
  const [isFollowing, setIsFollowing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const userDetails = route?.params;
  const username = route?.params.username;
  const fullName = route?.params.fullName;
  const email = route?.params.email;
  const userid = route?.params.id;
  const profileLetter = fullName?.charAt(0);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [searchedUserFeed, setSearchedUserFeed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  console.log(currentUserId, userid);

  const loadSearchedUserFeed = async () => {
    setPostsLoading(true);
    try {
      const snapshot = await firestore()
        .collection('posts')
        .where('username', '==', username)
        .orderBy('createdAt', 'desc')
        .get();

      setPostsLoading(false);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PostsType[];
    } catch (error) {
      console.error('Error fetching user feed posts:', error);
    } finally {
      setPostsLoading(false);
      setRefreshing(false);
    }
  };

  const loadSearchedUser = async () => {
    setLoading(true);
    loadPosts();
    try {
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
      const checkIfFollowing = followersList.filter(
        user => user.id === currentUserId,
      );
      console.log(checkIfFollowing.length, 'CIF');
      if (checkIfFollowing.length === 1) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
      setFollowers(followersList.length);
      setFollowing(followingList.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    const fetchedPosts = await loadSearchedUserFeed();
    setSearchedUserFeed(fetchedPosts);
    console.log(fetchedPosts, 'FETCHED USER POSTS');
  };
  useEffect(() => {
    loadSearchedUser();
  }, []);
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
      dispatch(getCurrentUser() as any);
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
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
  };

  const renderPosts = ({item}: {item: PostsType}) => {
    return (
      <PostComponent
        id={item.id}
        author={item.author}
        content={item.content}
        date={item.createdAt.toDate()}
        username={item.username}
      />
    );
  };

  return (
    <SafeArea>
      <View style={{}}>
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
        <FlatList
          data={searchedUserFeed}
          renderItem={renderPosts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: rS(100),
          }}
          ListHeaderComponent={() => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: rS(SPACING.h5),
                paddingBottom: rS(SPACING.h5),
              }}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: COLORS.purpleBlue1,
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
                      color: COLORS.lightBlue1,
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
                        color: COLORS.white,
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
                        color: COLORS.white,
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
                        color: COLORS.white,
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
                    title={
                      loading ? (
                        <ActivityIndicator
                          color={COLORS.lightBlue1}
                          size={rS(FONT_SIZES.h4)}
                        />
                      ) : isFollowing ? (
                        'Unfollow'
                      ) : (
                        'Follow'
                      )
                    }
                    buttonStyle={{
                      paddingHorizontal: rS(SPACING.h5),
                      paddingVertical: rS(SPACING.h13),
                      width: '100%',
                      backgroundColor: isFollowing
                        ? COLORS.lightBlue1 + 19
                        : COLORS.white,
                      minWidth: rS(120),
                      minHeight: rS(SPACING.h1),
                    }}
                    titleStyle={{
                      color: isFollowing ? COLORS.white : COLORS.black,
                    }}
                    onPress={isFollowing ? unfollowUser : followUser}
                  />
                </View>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {(
          searchedUserFeed.length === 0 && (
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h8),
                fontFamily: FONT_FAMILY.sb,
                color: COLORS.purpleBlue1 + 60,
                textAlign: 'center',
                marginTop: rS(SPACING.h5),
              }}>
              No posts
            </Text>
          )
        )}
      </View>
    </SafeArea>
  );
};

export default SearchedUserDetailsScreen;
