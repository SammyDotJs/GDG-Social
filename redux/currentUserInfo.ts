import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
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
  error: null,
};

export const getCurrentUser = createAsyncThunk<
  {fullName: string | null | undefined; email: string | null | undefined},
  undefined,
  AsyncThunkConfig
>('currentUser/getCurrentUser', async (_: undefined, {rejectWithValue}) => {
  try {
    const user = auth().currentUser;
    return {
      fullName: user?.displayName,
      email: user?.email,
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
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export default currentUserSlice.reducer;
