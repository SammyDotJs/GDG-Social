import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [isCreatePostSuccessful, setIsCreatePostSuccessful] = useState(false);
  const [isCreatePostFailed, setIsCreatePostFailed] = useState(false);
  const author = useSelector((state: any) => state.currentUser.fullName);
  const username = useSelector((state: any) => state.currentUser.username);
  console.log(username, 'username');

  const createPost = async (content: string, author: string) => {
    try {
      await firestore().collection('posts').add({
        username,
        content,
        author,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setIsCreatePostSuccessful(true);
      setTimeout(() => {
        setIsCreatePostSuccessful(false);
      }, 2000);
      console.log('Post created successfully!');
    } catch (error) {
      setIsCreatePostFailed(true);
      setTimeout(() => {
        setIsCreatePostFailed(false);
      }, 2000);
      console.error('Error adding post: ', error);
    } finally {
      setNewPost('');
    }
  };

  const AddPost = async () => {
    await createPost(newPost, author);
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LoadingModal isVisible={isLoading} />
        <PostAlertModal
          isVisible={isCreatePostSuccessful}
          title="post created successfully"
          onClose={() => setIsCreatePostSuccessful(false)}
          modalContainerStyle={{
            backgroundColor: COLORS.normalgreen,
          }}
        />
        <PostAlertModal
          isVisible={isCreatePostFailed}
          title="post creation failed"
          onClose={() => setIsCreatePostFailed(false)}
          modalContainerStyle={{
            backgroundColor: COLORS.error,
          }}
        />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: rS(SPACING.h7),
            flexGrow: 1,
          }}>
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
          <View style={{}}>
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
