import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeArea from '../../../utils/SafeArea';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
} from '../../../constants';
import {rS} from '../../../utils';
import InputField from '../../../components/InputField';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {Button} from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

const SearchScreen = ({navigation}: BottomTabBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const currentUser = useSelector(state => state.currentUser);

  const goToDetailsScreen = userData => {
    console.log(userData);
    navigation.navigate('DetailsScreen', userData);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const snapshot = await firestore()
        .collection('users')
        .where('username', '>=', searchQuery)
        .where('username', '<=', searchQuery + '\uf8ff')
        .get();
      console.log(snapshot.docs, 'SNAPSHOT');
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredUsers = users.filter(
        user => user.id !== currentUser.userid,
      );

      setSearchResults(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  console.log(currentUser.userid, searchResults);

  const renderSearchResults = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => goToDetailsScreen(item)}
        style={{
          paddingVertical: rS(SPACING.h9),
          borderBottomWidth: searchQuery.length == 1 ? 0 : 2,
          borderColor: COLORS.lightBlue1 + 19,
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.m,
            fontSize: rS(FONT_SIZES.h9),
            color: COLORS.black,
          }}>
          {item.fullName}
        </Text>
        <Text
          style={{
            fontFamily: FONT_FAMILY.ri,
            fontSize: rS(FONT_SIZES.h9),
            color: COLORS.lightBlue1,
          }}>{`@${item.username}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeArea
      style={{
        paddingHorizontal: rS(SPACING.h7),
        paddingTop: rS(SPACING.h5),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <InputField
          placeholder="Search for a user"
          textInputStyle={{
            borderRadius: 99,
            // borderColor: COLORS.lightgreen,
            backgroundColor: COLORS.searchField,
          }}
          isSearchField={true}
          value={searchQuery}
          query={text => setSearchQuery(text)}
          onSubmit={handleSearch}
          inputContainerStyle={{
            width: '100%',
          }}
        />
      </View>
      {searchQuery.length > 0 && searchResults.length === 0 ? (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rS(SPACING.h1),
          }}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.m,
              fontSize: rS(FONT_SIZES.h9),
              color: COLORS.black,
            }}>
            User not found
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={renderSearchResults}
          contentContainerStyle={{
            marginTop: rS(SPACING.h6),
            backgroundColor: COLORS.lightBlue1 + 39,
            borderRadius: BORDER_RADIUS.b15,
            paddingHorizontal: rS(SPACING.h8),
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeArea>
  );
};

export default SearchScreen;
