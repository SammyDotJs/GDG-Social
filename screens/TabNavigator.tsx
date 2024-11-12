import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Tabs/Home/HomeScreen';
import AddPost from './Tabs/AddPost/AddPost';
import ProfileScreen from './Tabs/Profile/ProfileScreen';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
} from '../constants';
import {rS} from '../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Text} from 'react-native';
import SearchScreenNavigator from './Tabs/Search/SearchScreenNavigator';
import HomeScreenNavigator from './Tabs/Home/HomeScreenNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopRightRadius: BORDER_RADIUS.b10,
          borderTopLeftRadius: BORDER_RADIUS.b10,
          //   margin: rS(SPACING.h5),
          backgroundColor: COLORS.bgColor,
          elevation: 0,
          borderWidth: 0,
          height: rS(70),
          paddingVertical: rS(SPACING.h6),
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: rS(FONT_SIZES.h9),
          fontFamily: FONT_FAMILY.r,
          fontWeight: 300,
          color: COLORS.black,
        },
        tabBarItemStyle: {
          paddingTop: rS(SPACING.h9),
        },
        tabBarHideOnKeyboard: true,
        tabBarLabel: ({focused, children}) => {
          return (
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h9),
                fontFamily: FONT_FAMILY.r,
                color: focused ? COLORS.purpleBlue1 : COLORS.lightBlue1,
              }}>
              {children}
            </Text>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="home"
                size={rS(FONT_SIZES.h5)}
                color={focused ? COLORS.purpleBlue1 : COLORS.lightBlue1}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Feather
                name="search"
                size={rS(FONT_SIZES.h5)}
                color={focused ? COLORS.purpleBlue1 : COLORS.lightBlue1}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={AddPost}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialIcons
                name="post-add"
                size={rS(FONT_SIZES.h5)}
                color={focused ? COLORS.purpleBlue1 : COLORS.lightBlue1}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Feather
                name="user"
                size={rS(FONT_SIZES.h5)}
                color={focused ? COLORS.purpleBlue1 : COLORS.lightBlue1}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
