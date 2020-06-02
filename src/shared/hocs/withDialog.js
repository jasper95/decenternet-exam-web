import React from 'react';
import DialogLayout from 'shared/components/Layout/Dialog';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { hideDialog, dialogProcessing } from 'shared/redux/app/reducer';
import useForm from 'shared/hooks/useForm';
import { useSelector, useDispatch } from 'react-redux';

const dialogProps = ['dialogId', 'dialogActionsRenderer', 'dialogTitleRenderer', 'title', 'dialogClass', 'dialogClassName'];
const formProps = ['initialFields', 'validator', 'customChangeHandler', 'onValid'];

export default () => (WrappedComponent) => {
  function Dialog(props) {
    const dispatch = useDispatch();
    const isProcessing = useSelector(state => state.app.dialogProcessing);
    const [formState, formHandlers] = useForm({ ...pick(props, formProps), onValid });
    return (
      <DialogLayout
        {...pick(props, dialogProps)}
        onContinue={onContinue}
        onCancel={onCancel}
        isProcessing={isProcessing}
      >
        <WrappedComponent
          formState={formState}
          formHandlers={formHandlers}
          onContinue={onContinue}
          onCancel={onCancel}
          {...omit(props, dialogProps.concat(formProps))}
        />
      </DialogLayout>
    );
    function onValid(...args) {
      dispatch(dialogProcessing(true));
      props.onValid(...args);
    }
    function onContinue() {
      formHandlers.onValidate(formState.fields);
    }
    function onCancel() {
      dispatch(hideDialog());
    }
  }
  Dialog.displayName = `withDialog(${WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'})`;
  return Dialog;
};
