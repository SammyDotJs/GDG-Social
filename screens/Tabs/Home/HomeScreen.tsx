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
  import {rS} from '../../../utils'; // Utility function for responsive spacing
  import {useDispatch, useSelector} from 'react-redux'; // Redux hooks for state management
  import {IPageProps} from '../../../types/NavigationProps'; // Type for navigation props
  import {getCurrentUser} from '../../../redux/currentUserInfo'; // Redux action for getting current user info
  import firestore from '@react-native-firebase/firestore'; // Firestore database access
  import PostComponent from '../../../components/PostComponent'; // Component for rendering a post

  // Type definition for posts
  export type PostsType = {
    id: string;
    author: string;
    content: string;
    createdAt: any;
    timestamp: any;
    username: string;
    fullName?: string;
    email: string;
    date?: Date;
  };

  // HomeScreen component definition
  const HomeScreen: React.FC<IPageProps> = ({navigation}) => {
    // State variables
    const [postsLoading, setPostsLoading] = useState(true); // Tracks whether posts are loading
    const [posts, setPosts] = useState<PostsType[]>([]); // Stores fetched posts
    const [refreshing, setRefreshing] = useState(false); // Controls refresh state
    const [isUserLoaded, setIsUserLoaded] = useState(false); // Indicates if user data is loaded

    // Redux state selectors
    const currentUser = useSelector((state: any) => state.currentUser);
    const username = useSelector((state: any) => state.currentUser.username);

    const dispatch = useDispatch();

    // Fetches the current user data when the component mounts
    useEffect(() => {
      const fetchUser = async () => {
        await dispatch(getCurrentUser() as any); // Dispatch action to fetch user data
        setIsUserLoaded(true); // Indicate that user data is loaded
      };

      fetchUser();
    }, []);

    // Retrieves the userId from the current user data
    const userId = currentUser?.userid;

    // Fetches the list of users that the current user is following
    const fetchFollowedUsers = async (): Promise<string[]> => {
      setPostsLoading(true); // Sets loading state for posts
      if (!userId) return []; // If no userId, return an empty list

      try {
        const snapshot = await firestore()
          .collection('users')
          .doc(userId)
          .collection('following')
          .get(); // Fetch following users from Firestore

        // Extract usernames from the fetched data
        const followedUsers = snapshot.docs.map(doc => doc.data().username);
        return [...followedUsers, username]; // Add the current user's username
      } catch (error) {
        console.error('Error fetching followed users:', error);
        return [];
      }
    };

    // Fetches posts for the feed based on followed users
    const fetchFeedPosts = async () => {
      try {
        const followedUsers = await fetchFollowedUsers(); // Get the list of followed users
        if (followedUsers.length === 0) return []; // If no followed users, return an empty list

        // Fetch posts from Firestore for the followed users
        const snapshot = await firestore()
          .collection('posts')
          .where('username', 'in', followedUsers)
          .orderBy('createdAt', 'desc')
          .get();

        // Map the fetched data to a structured format
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as PostsType[];
      } catch (error) {
        console.error('Error fetching feed posts:', error);
        return [];
      } finally {
        setPostsLoading(false); // Set loading state to false once done
      }
    };

    // Loads posts into state
    const loadPosts = async () => {
      const fetchedPosts = await fetchFeedPosts(); // Fetch posts from Firestore
      setPosts(fetchedPosts); // Set the fetched posts to state
    };

    // Fetch posts once the user data is loaded
    useEffect(() => {
      if (isUserLoaded) {
        const fetchPosts = async () => {
          await loadPosts(); // Load posts if the user data is ready
        };
        fetchPosts();
      }
    }, [isUserLoaded]);

    // Handles pull-to-refresh functionality
    const onRefresh = async () => {
      setRefreshing(true); // Set refreshing state to true
      await loadPosts(); // Reload posts
      setRefreshing(false); // Reset refreshing state
    };

    // Renders individual post items in the FlatList
    const renderPosts = ({item}: {item: PostsType}) => (
      <PostComponent
        id={item.id}
        author={item.author}
        content={item.content}
        date={item.createdAt?.toDate ? item.createdAt.toDate() : new Date()}
        username={item.username}
        extendedStyles={{
          width: '100%',
        }}
        isNewsFeed
        onPress={() => navigation.navigate('PostDetails', item)} // Navigate to post details
      />
    );

    // Main component rendering
    return (
      <SafeArea>
        <View
          style={{
            paddingHorizontal: rS(SPACING.h7),
            flexGrow: 1,
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
            {postsLoading ? ( // Show loading indicator if posts are loading
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
            ) : posts.length === 0 ? ( // Show message if no posts are found
              <View>
                <Text
                  style={{
                    fontSize: rS(FONT_SIZES.h8),
                    fontFamily: FONT_FAMILY.sb,
                    color: COLORS.purpleBlue1 + 60,
                    textAlign: 'center',
                    marginTop: rS(SPACING.h5),
                  }}>
                  No News Feed? Follow others to update your feed
                </Text>
              </View>
            ) : ( // Render posts in a FlatList if available
              <FlatList
                renderItem={renderPosts}
                data={posts}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  paddingBottom: rS(200),
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
