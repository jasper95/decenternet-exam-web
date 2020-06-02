import React from 'react';
import Paper from 'react-md/lib/Papers/Paper';
import DataTable from 'shared/components/DataTable';
import pick from 'lodash/pick';
import SearchRenderer from './SearchRenderer';
import ToolbarRenderer from './ToolbarRenderer';

function PageTable(props) {
  const {
    pageTableState, pageTableHandlers, columns, toolbarRenderer: Toolbar,
    searchRenderer: SearchBar, onClickNew, pageName,
  } = props;
  const { tableState, rowResponse, showPagination } = pageTableState;
  const { selected, sort } = tableState;
  const { data, loading: isLoading } = rowResponse;
  const rows = showPagination ? data.data : data;
  const {
    onRowToggle, onSort, onSearch, onConfirmDelete, tableDispatch,
  } = pageTableHandlers;
  return (
    <>
      <div className="row row-ToolbarHeader row-ToolbarHeader-floating">
        <Paper className="col-md-12-guttered">
          <Toolbar
            pageName={pageName}
            baseClass="ToolbarHeader"
            rows={rows}
            selected={selected}
            onClickNew={onClickNew}
            onConfirmDelete={onConfirmDelete}
          />
        </Paper>
      </div>

      <div className="row row-Table row-Table">
        <Paper className="col-md-12-guttered">
          <div className="row-Table_header">
            <SearchBar onSearch={onSearch} pageName={pageName} />
          </div>
          <DataTable
            selected={selected}
            onRowToggle={onRowToggle}
            rows={rows}
            columns={columns}
            isSelectable
            sort={sort}
            onSort={onSort}
            isLoading={isLoading}
            showPagination={showPagination}
            tableState={tableState}
            tableDispatch={tableDispatch}
            rowCount={showPagination ? data.count : undefined}
          />
        </Paper>
      </div>
    </>
  );
}

PageTable.defaultProps = {
  searchRenderer: SearchRenderer,
  toolbarRenderer: ToolbarRenderer,
};
export default PageTable;
