import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SafeArea from '../../../utils/SafeArea'; // Custom component to ensure safe display area for screens
import Ionicons from 'react-native-vector-icons/Ionicons'; // Icon library for React Native
import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants'; // App-specific constants for styling
import {rS} from '../../../utils'; // Utility function for responsive spacing/scaling
import {StackNavigationProp} from '@react-navigation/stack'; // Navigation prop types for stack navigators
import {RouteProp} from '@react-navigation/native'; // Type for route props
import {formatDistanceToNow} from 'date-fns'; // Date formatting utility for displaying time ago

// Type definition for navigation prop for PostDetailsScreen
type PostDetailsScreenNavigationProp = StackNavigationProp<any, 'PostDetails'>;
// Type definition for route prop for PostDetailsScreen
type PostDetailsScreenRouteProp = RouteProp<any, 'PostDetails'>;

// Interface for props expected by PostDetailsScreen component
interface Props {
  navigation: PostDetailsScreenNavigationProp;
  route: PostDetailsScreenRouteProp;
}

// Utility function to display date-time information in "time ago" format
const DateTimeDisplay = (date: string | Date) => {
  const timeAgo = formatDistanceToNow(date, {addSuffix: true}); // Calculate how long ago the date occurred
  return timeAgo;
};

// PostDetailsScreen functional component
const PostDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  // Extract post details passed through navigation route params
  const userDetails = route?.params;
  const username = userDetails?.username;
  const author = userDetails?.author;
  const content = userDetails?.content;
  const date = userDetails?.createdAt.toDate(); // Convert Firestore timestamp to JS Date

  // Reformat the date for better display formatting
  const reformatedDate = new Date(date.toString());


  return (
    <SafeArea>
      {/* TouchableOpacity used for navigating back */}
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Navigate back to the previous screen
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginLeft: rS(SPACING.h5), // Responsive margin
        }}>
        <Ionicons
          name="chevron-back" // Icon name for back button
          size={rS(FONT_SIZES.h5)} // Icon size
          color={COLORS.purpleBlue1} // Icon color
        />
      </TouchableOpacity>

      {/* Container view for post details */}
      <View
        style={{
          marginTop: rS(SPACING.h5), // Top margin for spacing
        }}>
        {/* View wrapping the post content */}
        <View
          style={[
            {
              width: '90%',
              paddingHorizontal: rS(SPACING.h8), // Horizontal padding
              paddingVertical: rS(SPACING.h5), // Vertical padding
              backgroundColor: COLORS.lightgray1, // Background color for the container
              borderRadius: 20, // Border radius for rounded corners
              marginBottom: rS(SPACING.h10), // Bottom margin
              marginHorizontal: 'auto', // Center horizontally
            },
          ]}>
          {/* Header view for author details and timestamp */}
          <View
            style={{
              flexDirection: 'row', // Arrange elements in a row
              justifyContent: 'space-between', // Space between elements
              alignItems: 'center', // Center align vertically
            }}>
            <View
              style={{
                flexDirection: 'row', // Row direction for author and username
              }}>
              <Text
                style={{
                  fontSize: rS(FONT_SIZES.h10), // Responsive font size
                  fontFamily: FONT_FAMILY.sbi, // Font style
                  color: COLORS.brownGray, // Text color
                }}>
                {`${author}.`} {/* Display author's name */}
              </Text>
              <Text
                style={{
                  fontSize: rS(FONT_SIZES.h10), // Responsive font size
                  fontFamily: FONT_FAMILY.ri, // Font style
                  color: COLORS.lightBlue1 + 89, // Text color with transparency
                  marginLeft: rS(SPACING.h10), // Left margin
                }}>
                {`@${username}`} {/* Display username */}
              </Text>
            </View>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h10), // Responsive font size
                fontFamily: FONT_FAMILY.r, // Font style
                color: COLORS.black + 50, // Text color with transparency
              }}>
              {DateTimeDisplay(reformatedDate)} {/* Display formatted date */}
            </Text>
          </View>

          {/* Content view for post details */}
          <View
            style={{
              width: '100%', // Full width
              marginTop: rS(SPACING.h5), // Top margin
            }}>
            <Text
              style={{
                fontSize: rS(FONT_SIZES.h9), // Responsive font size
                fontFamily: FONT_FAMILY.m, // Font style
                color: COLORS.black, // Text color
              }}>
              {content} {/* Display post content */}
            </Text>
          </View>
        </View>
      </View>
    </SafeArea>
  );
};

export default PostDetailsScreen; // Export component as default
