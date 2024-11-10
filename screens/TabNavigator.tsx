import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Tabs/Home/HomeScreen';
import AddPost from './Tabs/AddPost/AddPost';
import ProfileScreen from './Tabs/Profile/ProfileScreen';
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../constants';
import {rS} from '../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 99,
          margin: rS(SPACING.h5),
          backgroundColor: COLORS.black,
          elevation: 0,
          borderWidth: 0,
          height: rS(60),
          paddingVertical: rS(SPACING.h6),
        },
        tabBarLabelStyle: {
          fontSize: rS(FONT_SIZES.h9),
          fontFamily: FONT_FAMILY.r,
          fontWeight: 300,
          color: COLORS.lightgreen,
        },
        tabBarItemStyle: {
          paddingVertical: rS(SPACING.h13),
        },
        tabBarLabel: ({focused, children}) => {
          return (
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h9),
                fontFamily: FONT_FAMILY.r,
                fontWeight: 300,
                color: focused ? COLORS.normalgreen : COLORS.lightgreen,
              }}>
              {children}
            </Text>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="home"
                size={rS(FONT_SIZES.h5)}
                color={focused ? COLORS.normalgreen : COLORS.lightgreen}
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
                color={focused ? COLORS.normalgreen : COLORS.lightgreen}
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
                color={focused ? COLORS.normalgreen : COLORS.lightgreen}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
