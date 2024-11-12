import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PostDetailsScreen from './PostDetailsScreen';

const HomeScreenNavigate = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <HomeScreenNavigate.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeScreenNavigate.Screen name="HomeScreen" component={HomeScreen} />
      <HomeScreenNavigate.Screen
        name="PostDetails"
        component={PostDetailsScreen}
      />
    </HomeScreenNavigate.Navigator>
  );
};

export default HomeScreenNavigator;
