import { createSlice, createAction } from 'redux-starter-kit';
import cookie from 'js-cookie';

const initialState = {
  user: null,
  sessionLoading: false,
  sessionRequested: false,
  csrf: '',
};

const auth = createSlice({
  slice: 'auth',
  initialState,
  reducers: {
    authorize(state, { payload }) {
      state.user = payload;
      state.sessionLoading = false;
    },
    unauthorize(state) {
      state.user = null;
      state.sessionLoading = false;
      cookie.remove('token');
    },
    authRequest(state) {
      state.sessionRequested = true;
      state.sessionLoading = true;
    },
    setCsrf(state, action) {
      state.csrf = action.payload.csrf;
    },
  },
});

export const logoutRequest = createAction('auth/logoutRequest');
export const loginRequest = createAction('auth/loginRequest');

export const {
  authorize,
  unauthorize,
  authRequest,
  setCsrf,
} = auth.actions;

export default auth.reducer;

// export default {
//   SET_STATE(state, { payload }) {
//     return { ...state, ...payload };
//   },
//   SHOW_DIALOG(state, { payload }) {
//     const { dialog } = state;
//     let { temporaryClosedDialogs } = state;
//     if (dialog) {
//       temporaryClosedDialogs = [...temporaryClosedDialogs, dialog];
//     }
//     return {
//       ...state,
//       dialog: payload,
//       temporaryClosedDialogs,
//     };
//   },
//   HIDE_DIALOG(state) {
//     let dialog = null;
//     let { temporaryClosedDialogs } = state;
//     if (temporaryClosedDialogs.length) {
//       [dialog] = [...temporaryClosedDialogs].reverse();
//       temporaryClosedDialogs = temporaryClosedDialogs.slice(0, temporaryClosedDialogs.length - 1);
//     }
//     return {
//       ...state,
//       dialog,
//       dialogProcessing: false,
//       temporaryClosedDialogs,
//     };
//   },
//   HIDE_NOTIFICATION(state) {
//     return { ...state, toast: null };
//   },
//   ERROR(state, { payload }) {
//     return {
//       ...state,
//       toast: {
//         type: 'error',
//         ...payload,
//       },
//       dialogProcessing: false,
//     };
//   },
//   SUCCESS(state, { payload }) {
//     const { message, hideDialog = true } = payload;
//     return {
//       ...hideDialog ? this.HIDE_DIALOG(state) : state,
//       toast: {
//         type: 'success',
//         message,
//         // ...payload,
//       },
//     };
//   },
// };
