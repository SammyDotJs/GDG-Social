import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import {styles} from './styles/profileScreenStyles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
} from '../../../constants';
import {rS} from '../../../utils';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import PostComponent from '../../../components/PostComponent';
import {PostsType} from '../Home/HomeScreen';
import {IPageProps} from '../../../types/NavigationProps';

type PostDataProps = {
  id: string;
  author: string;
  content: string;
};

const ProfileScreen = ({navigation}: IPageProps) => {
  // Accessing user data from Redux state
  const currentUser = useSelector((state: any) => state.currentUser);
  const username = useSelector((state: any) => state.currentUser.username);
  const fullName = useSelector((state: any) => state.currentUser.fullName);
  const email = useSelector((state: any) => state.currentUser.email);
  const profileLetter = fullName?.charAt(0).toUpperCase();
  const following = useSelector((state: any) => state.currentUser.following);
  const followers = useSelector((state: any) => state.currentUser.followers);

  const [isFetching, setIsFetching] = useState(false);
  const [userPosts, setUserPosts] = useState<PostsType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Logs the user out and navigates to Login screen
  const handleLogOut = () => {
    auth().signOut();
    navigation.navigate('Login');
  };

  // Fetches user-specific posts from Firestore
  const fetchPosts = async () => {
    setIsFetching(true);
    try {
      const posts: any[] = [];
      const snapshot = await firestore()
        .collection('posts')
        .where('username', '==', username)
        .orderBy('createdAt', 'desc')
        .get();
      snapshot.forEach(doc => {
        const firestoreTimestamp = doc.data().createdAt;
        posts.push({
          id: doc.id,
          timestamp: firestoreTimestamp.toDate(),
          ...doc.data(),
        });
      });
      return posts;
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setIsFetching(false);
    }
  };

  // Refreshes post data
  const onRefresh = async () => {
    await getPosts();
  };

  // Gets posts and sets the data
  const getPosts = async () => {
    try {
      const data = await fetchPosts();
      setUserPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    getPosts();
  }, []);

  // Deletes a post by ID
  const deletePost = async (postId: string) => {
    try {
      await firestore().collection('posts').doc(postId).delete();
      console.log('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post: ', error);
    } finally {
      await getPosts();
    }
  };

  // Renders a single post
  const renderPosts = ({item}: {item: PostsType}) => (
    <PostComponent
      id={item.id}
      author={item.author}
      content={item.content}
      date={item.timestamp}
      username={item.username}
      deletePost={() => deletePost(item.id)}
      isProfile
    />
  );

  return (
    <SafeArea>
      <View>
        {isFetching ? (
          // Display loading indicator
          <View
            style={{
              height: '90%',
            }}>
            <ActivityIndicator
              color={COLORS.purpleBlue1}
              style={{
                margin: 'auto',
              }}
              size={rS(FONT_SIZES.h1)}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={userPosts}
              renderItem={renderPosts}
              contentContainerStyle={{
                paddingBottom: rS(100),
              }}
              ListHeaderComponent={() => (
                <>
                  {/* Log out button */}
                  <TouchableOpacity
                    onPress={handleLogOut}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      gap: rS(SPACING.h9),
                    }}>
                    <Text
                      style={{
                        fontSize: rS(FONT_SIZES.h8),
                        fontFamily: FONT_FAMILY.m,
                        color: COLORS.error,
                      }}>
                      Log out
                    </Text>
                    <Feather
                      name="log-out"
                      size={rS(FONT_SIZES.h5)}
                      color={COLORS.error}
                    />
                  </TouchableOpacity>

                  {/* User profile section */}
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: rS(SPACING.h5),
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
                          {fullName}
                        </Text>
                        <Text
                          style={{
                            fontSize: rS(FONT_SIZES.h8),
                            fontFamily: FONT_FAMILY.m,
                            color: COLORS.lightBlue1,
                          }}>
                          {email}
                        </Text>
                      </View>

                      {/* Followers, Following, Posts section */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: rS(SPACING.h5),
                          marginVertical: rS(SPACING.h8),
                        }}>
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
                        <View>
                          <Text
                            style={{
                              fontFamily: FONT_FAMILY.b,
                              fontSize: rS(FONT_SIZES.h6),
                              color: COLORS.lightgreen,
                            }}>
                            {userPosts.length}
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
                    </View>
                    <View
                      style={{
                        marginVertical: rS(SPACING.h8),
                        alignItems: 'center',
                        width: '90%',
                      }}>
                      <Text
                        style={{
                          fontFamily: FONT_FAMILY.m,
                          fontSize: rS(FONT_SIZES.h8),
                          color: COLORS.black,
                        }}>
                        Posts
                      </Text>
                    </View>
                  </View>
                </>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </SafeArea>
  );
};

export default ProfileScreen;
