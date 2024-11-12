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

type PostataProps = {
  id: string;
  author: string;
  content: string;
};

const ProfileScreen = ({navigation}: BottomTabBarProps) => {
  const currentUser = useSelector(state => state.currentUser);
  const fullName = useSelector((state: any) => state.currentUser.fullName);
  const email = useSelector(state => state.currentUser.email);
  const profileLetter = fullName?.charAt(0).toUpperCase();
  const following = useSelector(state => state.currentUser.following);
  const followers = useSelector(state => state.currentUser.followers);

  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getCurrentUser());
  //   }, [dispatch]);
  console.log(currentUser);

  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState();

  const testData = {
    author: 'John Doe',
    content: 'yooo',
    createdAt: {nanoseconds: 104000000, seconds: 1731247491},
    id: 'Q8y3H4EgxseO7rw1SRDs',
  };

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

  const renderPosts = ({item}) => {
    // console.log(item);

    return (
      <PostComponent
        id={item.id}
        author={item.author}
        content={item.content}
        date={item.timestamp}
      />
    );
  };

  return (
    <SafeArea>
      {/* Log out */}
      <TouchableOpacity
        onPress={handleLogOut}
        style={{
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: rS(SPACING.h5),
        }}>
        <Feather name="log-out" size={rS(FONT_SIZES.h5)} color={COLORS.error} />
      </TouchableOpacity>
      {/* <ScrollView
        contentContainerStyle={{
          paddingHorizontal: rS(SPACING.h7),
          flexGrow: 1,
        }}> */}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: rS(SPACING.h5),
          paddingBottom: rS(400),
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.deepTeal,
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
                color: COLORS.normalgreen,
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
                  color: COLORS.placeholder,
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
                  color: COLORS.placeholder,
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
                  color: COLORS.placeholder,
                }}>
                Posts
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: rS(SPACING.h5),
          }}>
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
              style={{
                paddingBottom: rS(200),
              }}>
              <FlatList
                data={userPosts}
                renderItem={renderPosts}
                contentContainerStyle={{
                  paddingBottom: rS(100),
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeArea>
  );
};

export default ProfileScreen;
