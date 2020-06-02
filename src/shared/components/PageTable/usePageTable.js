import {
  useCallback, useMemo, useReducer,
} from 'react';
import useQuery from 'shared/hooks/useQuery';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import useMutation from 'shared/hooks/useMutation';
import loadable from '@loadable/component';
import { showDialog } from 'shared/redux/app/reducer';
import qs from 'qs';
import capitalize from 'lodash/capitalize';
import tableReducer, { tableInitialState } from './tableReducer';

const Confirm = loadable(() => import('shared/components/Dialogs/Confirm'));
const defaultSort = [{ column: 'created_date', direction: 'desc' }];
function usePageTable(props) {
  const {
    node = '',
    mutationNode = node,
    queryParams = {},
    initialSort = defaultSort,
    queryUrl,
    isPaginated,
    searchableFields = [],
    isBaseQuery = true,
    isBaseCreate = true,
    isBaseUpdate = true,
    isBaseDelete = true,
    entityName = capitalize(node),
  } = props;
  const listInitialData = [];
  const paginatedListInitialData = { data: [], count: 0 };
  const initialData = isPaginated ? paginatedListInitialData : listInitialData;
  const debounceSearch = useCallback(debounce(onSearch, 1000), []);
  const [tableState, tableDispatch] = useReducer(
    tableReducer, { ...tableInitialState, sort: initialSort },
  );
  const { sort, page, size } = tableState;
  const queryString = qs.stringify({
    search: {
      fields: searchableFields,
      value: tableState.search,
    },
    sort,
    ...(isPaginated && { page, size }),
    ...queryParams,
  });

  const [rowResponse, queryHandlers] = useQuery(
    {
      url: `${queryUrl ? `${queryUrl}?${queryString}` : `/${node}?${queryString}`}`,
    },
    { initialData, isBase: isBaseQuery },
  );
  const [, onCreate] = useMutation({
    url: `/${mutationNode}`,
    method: 'POST',
    isBase: isBaseCreate,
    onSuccess: queryHandlers.refetch,
    message: `${entityName} successfully created`,
  });
  const [, onUpdate] = useMutation({
    url: `/${mutationNode}`,
    method: 'PUT',
    isBase: isBaseUpdate,
    message: `${entityName} successfully updated`,
    onSuccess: queryHandlers.refetch,
  });
  const [, onDelete] = useMutation({
    url: `/${mutationNode}/bulk`,
    method: 'DELETE',
    isBase: isBaseDelete,
    onSuccess: () => {
      tableDispatch({ type: 'ResetSelected' });
      queryHandlers.refetch();
    },
    message: `${entityName} successfully deleted`,
  });
  const dispatch = useDispatch();
  const states = useMemo(
    () => ({
      tableState,
      rowResponse,
      showPagination: isPaginated,
    }),
    [tableState, rowResponse, isPaginated],
  );
  const handlers = {
    onCreate,
    onDelete,
    onUpdate,
    onSearch: debounceSearch,
    tableDispatch,
    queryHandlers,
    onConfirmDelete: confirmDelete,
  };
  return [states, handlers];

  function onSearch(value) {
    tableDispatch({ type: 'SetSearch', payload: value });
  }

  function confirmDelete(ids) {
    dispatch(showDialog({
      component: Confirm,
      props: {
        title: 'Confirm Delete',
        message: 'Do you want to delete selected record(s)?',
        onValid: () => onDelete({ data: { ids }, message: 'Record(s) successfully deleted' }),
      },
    }));
  }
}
export default usePageTable;
