import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AppDispatch, RootState} from './store';

interface AsyncThunkConfig {
  // Define any additional parameters you need here
  state?: RootState;
  dispatch?: AppDispatch;
  rejectValue?: string;
}

const initialState = {
  fullName: '',
  email: '',
  userid: {},
  error: null,
  following: 0,
  followers: 0,
};

export const getCurrentUser = createAsyncThunk<
  {
    fullName: string | null | undefined;
    email: string | null | undefined;
    userid: any | null | undefined;
    followers: number;
    following: number;
  },
  undefined,
  AsyncThunkConfig
>('currentUser/getCurrentUser', async (_: undefined, {rejectWithValue}) => {
  try {
  } catch (error) {}
  try {
    const user = auth().currentUser;

    const snapshot = await firestore()
      .collection('users')
      .where('email', '==', user?.email)
      .get();
    const userid = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    const following = await firestore()
      .collection('users')
      .doc(userid[0]?.id)
      .collection('following')
      .get();

    const followingList = following.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const followers = await firestore()
      .collection('users')
      .doc(userid[0]?.id)
      .collection('followers')
      .get();

    const followersList = followers.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(followersList.length, 'CURES');
    return {
      fullName: user?.displayName,
      email: user?.email,
      userid: userid[0]?.id,
      following: followingList.length,
      followers: followersList.length,
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.userid = action.payload.userid;
        state.followers = action.payload.followers;
        state.following = action.payload.following;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default currentUserSlice.reducer;
