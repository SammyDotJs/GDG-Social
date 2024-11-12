import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants';
import {rS} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {IPageProps} from '../../../types/NavigationProps';
import {getCurrentUser} from '../../../redux/currentUserInfo';
import firestore from '@react-native-firebase/firestore';
import PostComponent from '../../../components/PostComponent';

type PostsType = {
  id: string;
  author: string;
  content: string;
  createdAt: any;
  username: string;
};

const HomeScreen = ({navigation}: IPageProps) => {
  const [postsLoading, setPostsLoading] = useState(true);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fullName = useSelector((state: any) => state.currentUser.fullName);
  const currentUser = useSelector((state: any) => state.currentUser);
  const username = useSelector((state: any) => state.currentUser.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser() as any);
  }, [dispatch]);

  const fetchFollowedUsers = async (): Promise<string[]> => {
    const userId = currentUser?.userid;
    if (!userId) return [];

    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('following')
        .get();

      const followedUsers = snapshot.docs.map(doc => doc.data().username);
      return [...followedUsers, username];
    } catch (error) {
      console.error('Error fetching followed users:', error);
      return [];
    }
  };

  const fetchFeedPosts = async () => {
    setPostsLoading(true);
    try {
      const followedUsers = await fetchFollowedUsers();
      if (followedUsers.length === 0) return [];

      const snapshot = await firestore()
        .collection('posts')
        .where('username', 'in', followedUsers)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PostsType[];
    } catch (error) {
      console.error('Error fetching feed posts:', error);
      return [];
    } finally {
      setPostsLoading(false);
    }
  };

  const loadPosts = async () => {
    const fetchedPosts = await fetchFeedPosts();
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const renderPosts = ({index, item}: {index: number; item: PostsType}) => (
    <PostComponent
      id={item.id}
      author={item.author}
      content={item.content}
      date={item.createdAt?.toDate ? item.createdAt.toDate() : new Date()}
      username={item.username}
      extendedStyles={{
        // borderRadius: 0,
        // marginBottom: 0,
        // borderTopColor: COLORS.purpleBlue1 + 19,
        // borderTopWidth: index == 0 ? 0 : 2,
        // backgroundColor: COLORS.bgColor,
        width: '100%',
      }}
      isNewsFeed
    />
  );

  return (
    <SafeArea>
      <View
        style={{
          paddingHorizontal: rS(SPACING.h7),
          flexGrow: 1,
        //   paddingTop: rS(SPACING.h1),
        }}>
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: rS(FONT_SIZES.h6),
              fontFamily: FONT_FAMILY.b,
              color: COLORS.purpleBlue1,
            }}>
            News Feed
          </Text>
        </View>
        <View>
          {postsLoading ? (
            <ActivityIndicator
              color={COLORS.placeholder}
              style={{margin: 'auto'}}
              size={rS(FONT_SIZES.h3)}
            />
          ) : (
            <FlatList
              renderItem={renderPosts}
              data={posts}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingBottom: rS(100),
                marginTop: rS(SPACING.h1),
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeArea>
  );
};

export default HomeScreen;
