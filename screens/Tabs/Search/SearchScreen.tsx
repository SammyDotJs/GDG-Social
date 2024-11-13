import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {User} from '../../../types/UserTypes';
import {PostsType} from '../Home/HomeScreen';
import {IPageProps} from '../../../types/NavigationProps';

const SearchScreen: React.FC<IPageProps> = ({navigation}) => {
  // State variables for search query, results, and loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Access current user from Redux state
  const currentUser = useSelector((state: any) => state.currentUser);

  // Function to navigate to the details screen with selected user data
  const goToDetailsScreen = (userData: User) => {
    navigation.navigate('DetailsScreen', userData); // Navigate with user data
  };

  // Function to handle search operation
  const handleSearch = async () => {
    setIsLoading(true); // Show loading indicator while fetching data
    if (searchQuery.trim() === '') {
      setSearchResults([]); // Clear results if search query is empty
      setIsLoading(false); // Hide loading indicator
      return;
    }

    try {
      // Fetch users from Firestore where username matches the search query
      const snapshot = await firestore()
        .collection('users')
        .where('username', '>=', searchQuery)
        .where('username', '<=', searchQuery + '\uf8ff') // Perform case-insensitive search
        .get();
      // Map snapshot docs to an array of user objects
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Filter out the current user from search results
      const filteredUsers = users.filter(
        user => user.id !== currentUser.userid,
      );

      setSearchResults(filteredUsers); // Set filtered users as search results
    } catch (error) {
      console.error(error); // Log any errors during fetch
    } finally {
      setIsLoading(false); // Hide loading indicator after operation is complete
    }
  };

  // useEffect to call handleSearch whenever the searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Depend on searchQuery so it triggers when the query changes

  // Function to render each search result in a list item
  const renderSearchResults = ({item}: {item: PostsType}) => {
    return (
      <TouchableOpacity
        onPress={() => goToDetailsScreen(item)} // Navigate to details screen when item is pressed
        style={{
          paddingVertical: rS(SPACING.h9),
          borderBottomWidth: searchQuery.length == 1 ? 0 : 2, // Add bottom border if query length > 1
          borderColor: COLORS.lightBlue1 + 19, // Set border color
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.m,
            fontSize: rS(FONT_SIZES.h9),
            color: COLORS.black,
          }}>
          {item.fullName} {/* Display full name of the user */}
        </Text>
        <Text
          style={{
            fontFamily: FONT_FAMILY.ri,
            fontSize: rS(FONT_SIZES.h9),
            color: COLORS.lightBlue1,
          }}>
          {`@${item.username}`} {/* Display the user's username */}
        </Text>
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
          placeholder="Search for a user" // Input field placeholder text
          textInputStyle={{
            borderRadius: 99, // Rounded corners for the input field
            backgroundColor: COLORS.searchField, // Background color of input field
          }}
          isSearchField={true} // Flag to indicate that this is a search field
          value={searchQuery} // Bind input field value to searchQuery state
          query={text => setSearchQuery(text)} // Update search query state on text change
          onSubmit={handleSearch} // Trigger search on submit
          inputContainerStyle={{
            width: '100%',
          }}
        />
      </View>
      {/* Show loading indicator while fetching data */}
      {isLoading ? (
        <ActivityIndicator
          color={COLORS.placeholder}
          style={{
            margin: 'auto',
          }}
          size={rS(FONT_SIZES.h3)}
        />
      ) : searchQuery.length > 0 && searchResults.length === 0 ? (
        // Show message when no results are found
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
        // Show list of search results if there are any
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id} // Use user ID as the key for list items
          renderItem={renderSearchResults} // Render each item with the renderSearchResults function
          contentContainerStyle={{
            marginTop: rS(SPACING.h6),
            backgroundColor: COLORS.lightBlue1 + 39, // Set background color for the list
            borderRadius: BORDER_RADIUS.b15, // Round the corners of the list container
            paddingHorizontal: rS(SPACING.h8), // Add padding inside the list container
          }}
          showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator
        />
      )}
    </SafeArea>
  );
};

export default SearchScreen; // Export the SearchScreen component
