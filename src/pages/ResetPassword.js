import React, { useState } from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import Link from 'react-router-dom/Link';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';
import AuthLayout from 'shared/components/Layout/Auth';
import Button from 'react-md/lib/Buttons/Button';
import cn from 'classnames';
import useForm from 'shared/hooks/useForm';
import * as yup from 'yup';
import useMutation from 'shared/hooks/useMutation';
import { getValidationResult, fieldIsRequired } from 'shared/utils/tools';
import 'sass/pages/login.scss';
import useRouter from 'shared/hooks/useRouter';
import { SpinnerSkeletonLoader } from 'shared/components/Skeletons';
import useQuery from 'shared/hooks/useQuery';

const initialFields = {
  password: '',
  token: '',
};

function ResetPassword() {
  const router = useRouter();
  const type = router.match.path.replace('/', '');
  const [requestSuccess, setRequestSuccess] = useState(false);
  const {
    pageTitle, requestUrl, successMessage,
  } = {
    'reset-password': {
      linkName: 'Reset password link',
      pageTitle: 'Activate Account',
      requestUrl: '/auth/reset-password',
      successMessage: 'Password successfully updated',
    },
    activate: {
      linkName: 'Activation link',
      pageTitle: 'Activate Account',
      requestUrl: '/auth/verify-account',
      successMessage: 'Account successfully verified',
    },
  }[type];
  const token = new URLSearchParams(window.location.search).get('token');
  const [{ data, loading, error }] = useQuery({ url: `/auth/validate-token?token=${token}&type=${type}` }, { initialData: null, onFetchSuccess: onVerifySuccess });
  const [resetState, onReset] = useMutation({
    url: requestUrl,
    method: 'put',
    // message: requestMessage,
    onSuccess: onResetSuccess,
  });
  const [formState, formHandlers] = useForm({ initialFields, validator, onValid });
  const {
    onChange,
    onValidate,
    onElementChange,
  } = formHandlers;
  const { fields, errors } = formState;

  return (
    <AuthLayout
      header={(
        <h1 className="authContainer_contentHeader_title">
          {pageTitle}
        </h1>
      )}
    >
      {loading && (
        <SpinnerSkeletonLoader />
      )}
      {error && (
        <div>
          Something went wrong
        </div>
      )}
      {data && (
        <>
          {requestSuccess ? (
            <div>
              <div>
                {successMessage}
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
          ) : (
            <form
              className="authContainer_form"
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                onValidate();
              }}
            >
              <input type="Submit" hidden />
              <TextField
                className="iField"
                id="password"
                type="password"
                label="Password"
                value={fields.password || ''}
                error={!!errors.password}
                errorText={errors.password}
                onChange={onElementChange}
              />
              <div className="authContainer_form_action">
                <Button
                  className={cn('iBttn iBttn-primary', { processing: resetState.loading })}
                  onClick={onValidate}
                  children="Submit"
                  flat
                />
              </div>
            </form>
          )}
        </>
      )}
    </AuthLayout>
  );

  function onValid(input) {
    onReset({
      data: input,
    });
  }
  function onResetSuccess() {
    setRequestSuccess(true);
  }
  function onVerifySuccess() {
    onChange('token', token);
  }
}

function validator(data) {
  const schema = yup.object({
    password: yup.string().required(fieldIsRequired),
  });
  return getValidationResult(data, schema);
}

export default ResetPassword;
