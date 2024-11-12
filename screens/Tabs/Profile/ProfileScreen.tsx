import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import {styles} from './styles/profileScreenStyles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
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
import {getCurrentUser} from '../../../redux/currentUserInfo';
import PostComponent from '../../../components/PostComponent';
import {PostsType} from '../Home/HomeScreen';

type PostataProps = {
  id: string;
  author: string;
  content: string;
};

const ProfileScreen = ({navigation}: BottomTabBarProps) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  const username = useSelector((state: any) => state.currentUser.username);
  const fullName = useSelector((state: any) => state.currentUser.fullName);
  const email = useSelector((state: any) => state.currentUser.email);
  const profileLetter = fullName?.charAt(0).toUpperCase();
  const following = useSelector((state: any) => state.currentUser.following);
  const followers = useSelector((state: any) => state.currentUser.followers);

  const [isFetching, setIsFetching] = useState(false);

  console.log(currentUser);

  const [userPosts, setUserPosts] = useState<PostsType[]>([]);
  const [refreshing, setRefreshing] = useState();

  const handleLogOut = () => {
    auth().signOut();
    navigation.navigate('Login');
  };

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
      return posts; // Use in FlatList or other UI components
    } catch (error) {
      console.error('Error fetching posts: ', error);
    } finally {
      setIsFetching(false);
    }
  };

  const onRefresh = async () => {
    await getPosts();
  };

  const getPosts = async () => {
    try {
      const data = await fetchPosts();
      console.log(data);
      setUserPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
    // setUserPosts;
  }, []);

  const renderPosts = ({item}: {item: PostsType}) => {
    return (
      <PostComponent
        id={item.id}
        author={item.author}
        content={item.content}
        date={item.timestamp}
        username={item.username}
      />
    );
  };

  return (
    <SafeArea>
      <View>
        {isFetching ? (
          <ActivityIndicator
            color={COLORS.placeholder}
            style={{
              margin: 'auto',
            }}
            size={rS(FONT_SIZES.h3)}
          />
        ) : (
          <View
            style={
              {
                //   paddingBottom: rS(200),
              }
            }>
            <FlatList
              data={userPosts}
              renderItem={renderPosts}
              contentContainerStyle={{
                paddingBottom: rS(100),
              }}
              ListHeaderComponent={() => (
                <>
                  {/* Log out */}
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
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginTop: rS(SPACING.h5),
                      // paddingBottom: rS(SPACING.h5),
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
                      {/* User action */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: rS(SPACING.h5),
                          marginVertical: rS(SPACING.h8),
                        }}>
                        {/* followers */}
                        <View
                          style={
                            {
                              // alignItems:"center"
                            }
                          }>
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
                        <View
                          style={
                            {
                              // alignItems:"center"
                            }
                          }>
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
                        <View
                          style={
                            {
                              // alignItems:"center"
                            }
                          }>
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
      {/* </View> */}
      {/* </ScrollView> */}
    </SafeArea>
  );
};

export default ProfileScreen;
