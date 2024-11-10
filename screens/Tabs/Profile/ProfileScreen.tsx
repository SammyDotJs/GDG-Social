import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import SafeArea from '../../../utils/SafeArea';
import {styles} from './styles/profileScreenStyles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation}: BottomTabBarProps) => {
  const currentUser = useSelector(state => state.currentUser);
  const fullName = useSelector((state: any) => state.currentUser.fullName);
  console.log(currentUser);
  const profileLetter = fullName?.charAt(0).toUpperCase();
  console.log(fullName);

  return (
    <SafeArea>
      <ScrollView>
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
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default ProfileScreen;
