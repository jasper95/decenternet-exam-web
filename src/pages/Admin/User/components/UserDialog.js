import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';
import * as yup from 'yup';
import { getValidationResult, fieldIsRequired, fieldIsInvalid } from 'shared/utils/tools';

function CreateUser(props) {
  const {
    formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;
  return (
    <>
      <TextField
        id="first_name"
        label="First Name"
        className="iField"
        onChange={onElementChange}
        value={fields.first_name}
        error={Boolean(errors.first_name)}
        errorText={errors.first_name}
      />
      <TextField
        id="last_name"
        label="Last Name"
        type="last_name"
        className="iField"
        onChange={onElementChange}
        errorText={errors.last_name}
        error={Boolean(errors.last_name)}
        value={fields.last_name}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        className="iField"
        onChange={onElementChange}
        errorText={errors.email}
        error={Boolean(errors.email)}
        value={fields.email}
      />
    </>
  );
}

const CreateUserDialog = flowRight(
  withDialog(),
)(CreateUser);

CreateUserDialog.defaultProps = {
  validator(data) {
    const schema = yup.object().shape({
      first_name: yup.string().required(fieldIsRequired),
      last_name: yup.string().required(fieldIsRequired),
      email: yup.string().email(fieldIsInvalid).required(fieldIsRequired),
    });
    return getValidationResult(data, schema);
  },
};

export default CreateUserDialog;
