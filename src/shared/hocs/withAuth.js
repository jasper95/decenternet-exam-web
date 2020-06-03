import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import { authRequest } from 'shared/redux/auth/reducer';
import { SpinnerSkeletonLoader } from 'shared/components/Skeletons';
import history from 'shared/utils/history';
import useRouter from 'shared/hooks/useRouter';

export const authSelector = createSelector(
  state => state.auth.user,
  state => state.auth.sessionLoading,
  state => state.auth.sessionRequested,
  (auth, sessionLoading, sessionRequested) => ({
    auth,
    sessionLoading,
    sessionRequested,
  }),
);

const withAuth = (WrappedComponent) => {
  function Auth(props) {
    const dispatch = useDispatch();
    const { requireAuth } = props;
    const router = useRouter();
    const { auth, sessionLoading, sessionRequested } = useSelector(authSelector);
    const isIndex = router.pathname === '/';
    const authRequiredNotReady = requireAuth && !auth;
    useEffect(() => {
      if (!sessionRequested) {
        dispatch(authRequest());
      }
    }, []);
    useEffect(() => {
      const unAuthorized = sessionRequested && !auth && !sessionLoading;
      if (unAuthorized) {
        history.push('/login');
      } else if (auth && requireAuth !== true) {
        history.push('/admin');
      }
    }, [auth, sessionLoading, sessionRequested]);
    if (sessionLoading || authRequiredNotReady || isIndex) {
      return (<SpinnerSkeletonLoader />);
    }
    return (
      <WrappedComponent {...props} />
    );
  }

  return Auth;
};

export default withAuth;
