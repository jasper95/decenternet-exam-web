import React from 'react';
import PageTable from 'shared/components/PageTable';
import history from 'shared/utils/history';
import usePageTable from 'shared/components/PageTable/usePageTable';
import { formatDate } from 'shared/components/DataTable/CellFormatter';
import { showDialog } from 'shared/redux/app/reducer';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';

const CreateCategoryDialog = loadable(() => import('pages/Admin/Category/components/CreateCategoryDialog'));

function Category() {
  const [pageTableState, pageTableHandlers] = usePageTable({ node: 'category', onSuccess, isPaginated: true });
  const dispatch = useDispatch();
  return (
    <PageTable
      node="category"
      columns={getColumns()}
      pageName="Categories"
      pageTableState={pageTableState}
      pageTableHandlers={pageTableHandlers}
      onClickNew={() => handleCategoryDialog('Create')}
    />
  );

  function getColumns() {
    return [
      {
        title: 'Title',
        accessor: 'name',
      },
      {
        type: 'function',
        fn: formatDate('updated_date', 'MMMM DD, YYYY'),
        title: 'Last Updated',
      },
      {
        title: 'Actions',
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: data => handleCategoryDialog('Update', data),
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: row => pageTableHandlers.onConfirmDelete([row.id]),
          },
        ],
      },
    ];
  }

  function handleCategoryDialog(type, initialFields = {}) {
    const { onCreate, onUpdate } = pageTableHandlers;
    const onSave = type === 'Create' ? onCreate : onUpdate;
    dispatch(showDialog({
      component: CreateCategoryDialog,
      props: {
        title: `${type} Category`,
        initialFields,
        onValid: (data) => {
          onSave({
            data,
          });
        },
      },
    }));
  }

  function onValid(data) {
    pageTableHandlers.onCreate({ data });
  }

  function onSuccess(data) {
    history.push(`/admin/albums/${data.id}`);
  }
}

export default Category;
