import React from 'react';
import AuthLayout from 'shared/components/Layout/Auth';
import Link from 'react-router-dom/Link';
// import useMutation from 'apollo/mutation';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';
import useVerifyToken from 'shared/hooks/useVerifyToken';
import 'sass/pages/login.scss';
import useMutation from 'shared/hooks/useMutation';
import useQuery from 'shared/hooks/useQuery';

function Verify() {
  const token = new URLSearchParams(window.location.search).get('token');
  const [verifyState, onVerify] = useMutation({ url: '/verify-account', method: 'put' });
  useQuery({ url: `/auth/validate-token?token=${token}&type=signup}` }, { onSuccess });
  return (
    <AuthLayout
      header={(
        <h1 className="authContainer_contentHeader_title">
          Verify Account
        </h1>
      )}
    >
      <>
        <div>
          <div>
            Account successfully verified
          </div>
          <div>
            <Link to="/login">
              <Button
                iconEl={<FontIcon children="arrow_back" />}
                children="Go Back"
              />
            </Link>
          </div>
        </div>
        {/*
          {(verifyState.loading || verifyTokenState === 'pending') && (
            <div>
              Verifying your account ....
            </div>
          )}
          {(verifyState.error || verifyTokenState === 'invalid') && (
            <div>
              Something went wrong
            </div>
          )}
          {verifyState.data && verifyState.data.success && (
            <div>
              <div>
                Account successfully verified
              </div>
              <div>
                <Link to="/login">
                  <Button
                    iconEl={<FontIcon children="arrow_back" />}
                    children="Go Back"
                  />
                </Link>
              </div>
            </div>
          )}
        */}
      </>
    </AuthLayout>
  );

  function onSuccess() {
    onVerify({ data: { token } });
  }
}

export default Verify;
