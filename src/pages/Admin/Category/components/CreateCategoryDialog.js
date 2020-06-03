import React from 'react';
import flowRight from 'lodash/flowRight';
import withDialog from 'shared/hocs/withDialog';
import TextField from 'react-md/lib/TextFields/TextField';
import * as yup from 'yup';
import { getValidationResult, fieldIsRequired } from 'shared/utils/tools';

function CreateCategory(props) {
  const {
    formState, formHandlers,
  } = props;
  const { fields, errors } = formState;
  const { onElementChange } = formHandlers;
  return (
    <>
      <TextField
        id="name"
        label="Category Name"
        className="iField"
        onChange={onElementChange}
        value={fields.name}
        error={Boolean(errors.name)}
        errorText={errors.name}
      />
    </>
  );
}
const CreateCategoryDialog = flowRight(
  withDialog(),
)(CreateCategory);

CreateCategoryDialog.defaultProps = {
  validator(data) {
    const schema = yup.object().shape({
      name: yup.string().required(fieldIsRequired),
    });
    return getValidationResult(data, schema);
  },
};

export default CreateCategoryDialog;
