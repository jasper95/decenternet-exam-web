import { createSlice } from 'redux-starter-kit';

const initialState = {
  dialog: null,
  toast: null,
  dialogProcessing: false,
  formProcessing: false,
  temporaryClosedDialogs: [],
  isSidebarCollapsed: false,
  isSingleUploading: false
};

function hideDialogReducer(state) {
  let dialog = null;
  let { temporaryClosedDialogs } = state;
  if (temporaryClosedDialogs.length) {
    [dialog] = [...temporaryClosedDialogs].reverse();
    temporaryClosedDialogs = temporaryClosedDialogs.slice(0, temporaryClosedDialogs.length - 1);
  }
  state.dialog = dialog;
  state.dialogProcessing = false;
  state.temporaryClosedDialogs = temporaryClosedDialogs;
}

const auth = createSlice({
  slice: 'auth',
  initialState,
  reducers: {
    showDialog(state, { payload }) {
      const { dialog } = state;
      let { temporaryClosedDialogs } = state;
      if (dialog) {
        temporaryClosedDialogs = [...temporaryClosedDialogs, dialog];
      }
      state.dialog = payload;
      state.temporaryClosedDialogs = temporaryClosedDialogs;
    },
    hideDialog: hideDialogReducer,
    dialogProcessing(state, action) {
      const { dialog } = state;
      if (dialog && action.payload) {
        state.dialogProcessing = action.payload;
      }
    },
    formProcessing(state, action) {
      state.formProcessing = action.payload;
    },
    hideNotification(state) {
      state.toast = null;
    },
    showError(state, { payload }) {
      state.toast = {
        ...payload,
        type: 'error',
      };
      state.formProcessing = false;
      state.dialogProcessing = false;
    },
    showSuccess(state, { payload }) {
      const { message, hideDialog = true } = payload;
      if (hideDialog) {
        hideDialogReducer(state);
      }
      state.toast = {
        type: 'success',
        message,
      };
    },
    clearLoading(state) {
      state.formProcessing = false;
      state.dialogProcessing = false;
    },
    toggleSidebar(state, { payload }) {
      const { isSidebarCollapsed } = state;
      state.isSidebarCollapsed = payload;
    },
    toggleSingleUploading(state) {
      state.isSingleUploading = !state.isSingleUploading
    }
  },
});

export const {
  showDialog,
  hideDialog,
  formProcessing,
  hideNotification,
  showError,
  showSuccess,
  clearLoading,
  dialogProcessing,
  toggleSidebar,
  toggleSingleUploading,
} = auth.actions;


export default auth.reducer;
