import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import {styles} from './styles/profileScreenStyles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants';
import {rS} from '../../../utils';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import {getCurrentUser} from '../../../redux/currentUserInfo';

const ProfileScreen = ({navigation}: BottomTabBarProps) => {
  const currentUser = useSelector(state => state.currentUser);
  const fullName = useSelector((state: any) => state.currentUser.fullName);
  const email = useSelector(state => state.currentUser.email);
  const profileLetter = fullName?.charAt(0).toUpperCase();

  const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, [dispatch]);

  const [userPosts, setUserPosts] = useState([]);

  const handleLogOut = () => {
    auth().signOut();
    navigation.navigate('Login');
  };

  const fetchPosts = async () => {
    try {
      const posts: any[] = [];
      const snapshot = await firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();
      snapshot.forEach(doc => {
        posts.push({id: doc.id, ...doc.data()});
      });
      return posts; // Use in FlatList or other UI components
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
    // setUserPosts;
  }, []);

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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: rS(SPACING.h7),
          flexGrow: 1,
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.profileImage}
            // onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileText}>{profileLetter}</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              marginVertical: rS(SPACING.h5),
            }}>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h8),
                fontFamily: FONT_FAMILY.m,
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
            }}>
            {/* followers */}
            <View style={{}}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.b,
                  fontSize: rS(FONT_SIZES.h6),
                }}>
                0
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
            <View style={{}}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.b,
                  fontSize: rS(FONT_SIZES.h6),
                }}>
                0
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
            <View style={{}}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.b,
                  fontSize: rS(FONT_SIZES.h6),
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
      </ScrollView>
    </SafeArea>
  );
};

export default ProfileScreen;
