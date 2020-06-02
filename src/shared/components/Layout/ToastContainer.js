import React from 'react';
import { createSelector } from 'redux-starter-kit';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'shared/components/Snackbar';
import { hideNotification } from 'shared/redux/app/reducer';

const toastSelector = createSelector(
  state => state.app.toast,
  e => e,
);
function ToastContainer() {
  const dispatch = useDispatch();
  const toast = useSelector(toastSelector);
  return (
    <>
      {toast && (
        <Snackbar
          onClose={() => dispatch(hideNotification())}
          open={!!toast}
          {...toast}
        />
      )}
    </>
  );
}

export default ToastContainer;
