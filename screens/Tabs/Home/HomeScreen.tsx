import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants';
import {rS} from '../../../utils';
import {styles} from './styles/homescreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {IPageProps} from '../../../types/NavigationProps';
import {getCurrentUser} from '../../../redux/currentUserInfo';
import InputField from '../../../components/InputField';

const HomeScreen = ({navigation}: IPageProps) => {
  const fullName = useSelector((state: any) => state.currentUser.fullName);
  const profileLetter = fullName?.charAt(0).toUpperCase();

  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCurrentUser());
    }, [dispatch]);
  console.log(fullName);

  return (
    <SafeArea>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: rS(SPACING.h7),
          flexGrow: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: rS(FONT_SIZES.h8),
              color: COLORS.black,
              fontFamily: FONT_FAMILY.b,
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.m,
              }}>
              Hello,
            </Text>{' '}
            {fullName}
          </Text>
          {/* {profileImage ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.8}>
              <View style={styles.selectedImageContainer}>
                <ImageBackground
                  source={{
                    uri: profileImage,
                  }}
                  style={styles.selectedImage}
                />
              </View>
            </TouchableOpacity>
          ) : ( */}
          <TouchableOpacity
            style={styles.profileImage}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileText}>{profileLetter}</Text>
          </TouchableOpacity>
          {/* )} */}
        </View>
        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: rS(FONT_SIZES.h6),
              fontFamily: FONT_FAMILY.eb,
            }}>
            News Feed
          </Text>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default HomeScreen;
