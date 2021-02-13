import { createFeatureSelector } from '@ngrx/store';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentAuthenticatedSession: null,
    loginSuccess: false,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.currentAuthenticatedSession = action.payload
    },
    setLoginSuccess: (state, action) => {
      state.loginSuccess = action.payload
    }
  }
});

const {
  reducer,
  actions: {
    setLoginStatus,
    setLoginSuccess,
  },
  name
} = authSlice;

export default reducer;
export {
  name,
  setLoginStatus,
  setLoginSuccess,
};

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
  name
);