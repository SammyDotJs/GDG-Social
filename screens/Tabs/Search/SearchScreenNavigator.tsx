import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import SearchedUserDetailsScreen from './DetailsScreen/SearchedUserDetailsScreen';

const SearchScreenNavigate = createStackNavigator();

const SearchScreenNavigator = () => {
  return (
    <SearchScreenNavigate.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <SearchScreenNavigate.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <SearchScreenNavigate.Screen
        name="DetailsScreen"
        component={SearchedUserDetailsScreen}
      />
    </SearchScreenNavigate.Navigator>
  );
};

export default SearchScreenNavigator;
