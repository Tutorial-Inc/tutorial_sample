import { createFeatureSelector } from '@ngrx/store';
import { createSlice } from '@reduxjs/toolkit';
import { User } from './user.model';

type AuthState = {
  currentAuthenticatedSession: User | null,
  isAuthenticated: boolean,
  loading: boolean,
  loginSuccess: boolean,
  challenge: null | 'NEW_PASSWORD_REQUIRED',
  redirectTo: string | null,
  waitCodeAndNewPassword: boolean,
  waitForConfirmSignUp: boolean,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentAuthenticatedSession: null,
    loading: false,
    isAuthenticated: false,
    challenge: null,
    redirectTo: '',
    waitCodeAndNewPassword: false,
    waitForConfirmSignUp: false,
  } as AuthState,
  reducers: {
    initAuthState: (state, _) => {
      state.loading = true
    },
    redirectTo: (state, action) => {
      state.redirectTo = action.payload;
    },
    login: (state, _) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentAuthenticatedSession = action.payload;
    },
    loginFail: (state, _) => {
      state.loading = false;
      state.currentAuthenticatedSession = null;
    },
    logout: (state, _) => {
      state.loading = true;
    },
    logoutSuccess: (state, _) => {
      state.loading = false;
      state.currentAuthenticatedSession = null;
    },
    completeNewPassword: (state, _) => {
      state.loading = true;
    },
    completeNewPasswordSuccess: (state, _) => {
      state.loading = false;
    },
    completeNewPasswordFailure: (state, _) => {
      state.loading = false;
    },
    setChallenge: (state, action) => {
      state.challenge = action.payload;
    },
    forgotPasswordRequest: (state, action) => {
      state.loading = true;
    },
    forgotPasswordRequestSuccess: (state, action) => {
      state.loading = false;
      state.waitCodeAndNewPassword = true;
    },
    forgotPasswordRequestFailure: (state, _) => {
      state.loading = false;
      state.waitCodeAndNewPassword = false;
    },
    forgotPasswordSubmit: (state, action) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.waitCodeAndNewPassword = false;
    },
    requestSignUp: (state, action) => {
      state.loading = true;
    },
    requestSignUpSuccess: (state, action) => {
      state.loading = false;
      state.waitForConfirmSignUp = true;
    },
    confirmSignUp: (state, action) => {
      state.loading = true;
    },
    confirmSignUpSuccess: (state, action) => {
      state.loading = false;
      state.waitForConfirmSignUp = false;
    }
  }
});

const {
  reducer,
  actions: {
    login,
    logout,
    redirectTo,
    initAuthState,
    loginSuccess,
    loginFail,
    logoutSuccess,
    completeNewPassword,
    completeNewPasswordSuccess,
    completeNewPasswordFailure,
    setChallenge,
    forgotPasswordRequest,
    forgotPasswordRequestSuccess,
    forgotPasswordSubmit,
    forgotPasswordSuccess,
    requestSignUp,
    requestSignUpSuccess,
    confirmSignUp,
    confirmSignUpSuccess,
  },
  name
} = authSlice;

export default reducer;
export {
  name,
  login,
  logout,
  redirectTo,
  initAuthState,
  loginSuccess,
  loginFail,
  logoutSuccess,
  completeNewPassword,
  completeNewPasswordSuccess,
  completeNewPasswordFailure,
  setChallenge,
  forgotPasswordRequest,
  forgotPasswordRequestSuccess,
  forgotPasswordSubmit,
  forgotPasswordSuccess,
  requestSignUp,
  requestSignUpSuccess,
  confirmSignUp,
  confirmSignUpSuccess,
};

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
  name
);