import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import SafeArea from '../../../utils/SafeArea';
  import LoadingModal from '../../../components/LoadingModal';
  import {COLORS, FONT_FAMILY, FONT_SIZES, SPACING} from '../../../constants';
  import {rS} from '../../../utils';
  import InputField from '../../../components/InputField';
  import PrimaryButton from '../../../components/PrimaryButton';
  import firestore from '@react-native-firebase/firestore';
  import {useSelector} from 'react-redux';
  import PostAlertModal from '../../../components/PostAlertModal';

  const AddPost = () => {
    // State to control loading modal visibility
    const [isLoading, setIsLoading] = useState(false);

    // State to store new post content
    const [newPost, setNewPost] = useState('');

    // States to control post creation alert modals
    const [isCreatePostSuccessful, setIsCreatePostSuccessful] = useState(false);
    const [isCreatePostFailed, setIsCreatePostFailed] = useState(false);

    // Select current user details from Redux state
    const author = useSelector((state: any) => state.currentUser.fullName);
    const username = useSelector((state: any) => state.currentUser.username);

    // Function to create a new post in Firestore
    const createPost = async (content: string, author: string) => {
      try {
        // Add new post data to Firestore collection
        await firestore().collection('posts').add({
          username,
          content,
          author,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        // Show success modal
        setIsCreatePostSuccessful(true);
        // Hide success modal after 2 seconds
        setTimeout(() => {
          setIsCreatePostSuccessful(false);
        }, 2000);
      } catch (error) {
        // Show failure modal in case of error
        setIsCreatePostFailed(true);
        // Hide failure modal after 2 seconds
        setTimeout(() => {
          setIsCreatePostFailed(false);
        }, 2000);
      } finally {
        // Clear input field after post creation
        setNewPost('');
      }
    };

    // Function to handle "Post" button press
    const AddPost = async () => {
      if (newPost.trim() === '') {
        // Show alert if input is empty
        Alert.alert('Please fill in the text field');
        return;
      }
      // Create post if input is valid
      await createPost(newPost, author);
    };

    return (
      <SafeArea>
        {/* Keyboard avoiding view for handling input fields and keyboard on iOS */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          {/* Loading modal */}
          <LoadingModal isVisible={isLoading} />

          {/* Post creation success modal */}
          <PostAlertModal
            isVisible={isCreatePostSuccessful}
            title="Post created successfully"
            onClose={() => setIsCreatePostSuccessful(false)}
            modalContainerStyle={{
              backgroundColor: COLORS.normalgreen,
            }}
          />

          {/* Post creation failure modal */}
          <PostAlertModal
            isVisible={isCreatePostFailed}
            title="Post creation failed"
            onClose={() => setIsCreatePostFailed(false)}
            modalContainerStyle={{
              backgroundColor: COLORS.error,
            }}
          />

          {/* Main content */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: rS(SPACING.h7),
              flexGrow: 1,
            }}>

            {/* Header text */}
            <View
              style={{
                paddingVertical: rS(SPACING.h5),
              }}>
              <Text
                style={{
                  fontSize: rS(FONT_SIZES.h6),
                  fontFamily: FONT_FAMILY.sb,
                  color: COLORS.purpleBlue1,
                }}>
                Create a post
              </Text>
            </View>

            {/* Input field for new post */}
            <View>
              <InputField
                label="New post"
                value={newPost}
                query={text => setNewPost(text)}
                textInputStyle={{
                  backgroundColor: COLORS.searchField,
                  borderWidth: 0,
                  paddingBottom: rS(SPACING.h13),
                  paddingHorizontal: rS(SPACING.h11),
                }}
                isPostField={true}
              />

              {/* Post button */}
              <View
                style={{
                  marginVertical: rS(SPACING.h5),
                }}>
                <PrimaryButton
                  title="Post"
                  onPress={AddPost}
                  buttonStyle={{
                    width: rS(100),
                    padding: rS(SPACING.h13),
                    marginLeft: 'auto',
                    backgroundColor: COLORS.black,
                  }}
                  titleStyle={{
                    color: COLORS.white,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeArea>
    );
  };

  export default AddPost;
