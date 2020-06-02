import React from 'react';
import PageTable from 'shared/components/PageTable';
import usePageTable from 'shared/components/PageTable/usePageTable';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import { showDialog } from 'shared/redux/app/reducer';

const UserDialog = loadable(() => import('pages/Admin/User/components/UserDialog'));

function User() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'user', isBaseCreate: false, isPaginated: true });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="user"
      columns={getColumns()}
      pageName="Users"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => handleUserDialog('Create')}
      onClickEdit={data => handleUserDialog('Update', data)}
    />
  );

  function handleUserDialog(type, initialFields = {}) {
    const { onCreate, onUpdate } = pageTableHandlers;
    const onSave = type === 'Create' ? onCreate : onUpdate;
    dispatch(showDialog({
      component: UserDialog,
      props: {
        title: `${type} User`,
        initialFields,
        onValid: (data) => {
          onSave({
            data,
          });
        },
      },
    }));
  }

  function getColumns() {
    const { onConfirmDelete } = pageTableHandlers;
    return [
      {
        title: 'Email',
        accessor: 'email',
      },
      {
        title: 'Full Name',
        type: 'function',
        fn: row => [row.first_name, row.last_name].join(' '),
      },
      {
        title: 'Actions',
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: row => handleUserDialog('Update', row),
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: row => onConfirmDelete([row.id]),
          },
        ],
      },
    ];
  }
}

export default User;
