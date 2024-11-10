import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

const initialState = {
  fullName: '',
  email: '',
  error: null,
};

export const getCurrentUser = createAsyncThunk(
  'currentUser/getCurrentUser',
  async (_: undefined, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      return {
        fullName: user?.displayName,
        email: user?.email,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
