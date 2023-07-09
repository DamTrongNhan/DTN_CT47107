import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/auth/';

type User = {
  email: string,
  password: string,
}
type DataUser = {
  _id: string,
  villageId: string,
  smallHolderId: string,
  isAdmin: boolean,
  isAdminWebsite: boolean,
  isAdminSmallHolder: boolean,
  accessToken: string,
}

type Payload = {
  message: string;
  status: boolean;
  data: DataUser

}
// Get user from localStorage
const user: DataUser = JSON.parse(localStorage.getItem('user')!);

type InitialState = {
  user: DataUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  isSuccessLogout: boolean;
  isErrorLogout: boolean;

};

const initialState: InitialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isSuccessLogout: false,
  isErrorLogout: false,

};

// signUp user
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: User, thunkAPI) => {
    try {
      const response = await httpRequest.post(API_URL + 'signUp', userData, undefined);
      if (response) {
        // localStorage.setItem('user', JSON.stringify(response));
        return response;
      }
    } catch (error) {
      console.log(error);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// signIn user
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData: User, thunkAPI) => {
    try {
      const response = await httpRequest.post(API_URL + 'signIn', userData, undefined);
      if (response) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
      }
    } catch (error) {

      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async (accessToken: string, thunkAPI) => {
    try {
      const response = await httpRequest.post(API_URL + 'logout', undefined, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      if (response) {
        localStorage.removeItem('user');
        return response;
      }
    } catch (error) {
      console.log(error);
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isSuccessLogout = false;
      state.isErrorLogout = false;
    },
    clearData: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<Payload>) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<Payload>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message
        state.user = action.payload.data;
      })
      .addCase(signIn.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action: AnyAction) => {
        state.user = null;
        state.isSuccessLogout = true;
        state.message = action.payload.message;
      })
      .addCase(logout.rejected, (state, action: AnyAction) => {
        state.isErrorLogout = true;
        state.message = action.payload;
      })
  },
});

export const { reset, clearData } = authSlice.actions;
export default authSlice.reducer;
