import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-md/lib/DataTables/DataTable';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';
import TableHead from 'react-md/lib/DataTables/TableHeader';
import cn from 'classnames';
import Row from './Row';
import PreLoader from './PreLoader';

function DataTable(props) {
  const {
    rows, columns, onRowClick, className, isSelectable, selected,
    onSort, sort, isLoading, showPagination, tableDispatch, pageSizes, tableState, rowCount,
  } = props;

  const dataEmpty = rows.length === 0;
  const BCP = 'iTable';

  return (
    <Table
      plain={!isSelectable}
      className={cn(`${BCP} ${className}`, {
        [`${BCP}-empty`]: rows.length === 0,
        [`${BCP}-loading`]: isLoading,
      })}
      onRowToggle={onRowToggle}
    >
      {
        <>
          {
            isLoading ? (
              <PreLoader columns={columns.length} className={`${BCP}_preLoader`} />
            ) : (
              <>
                <TableHead className={`${BCP}_header`}>
                  <TableRow className={`${BCP}_row`}>
                    {columns.map(({ title, accessor, headProps = {} }, idx) => (
                      <TableColumn
                        key={idx}
                        onClick={() => onSort(accessor)}
                        sorted={sort[accessor]}
                        className={`${BCP}_cell`}
                        {...headProps}
                      >
                        {title}

                      </TableColumn>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className={`${BCP}_body`}>
                  { dataEmpty && (
                    <div>No Records Found</div>
                  )}
                  {!dataEmpty && rows.map((row, rowIndex) => (
                    <TableRow
                      key={row.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(row);
                      }}
                      selected={selected.includes(row.id)}
                      className={`${BCP}_row`}
                    >
                      {columns.map((column, idx) => (
                        <Row
                          key={idx}
                          row={row}
                          index={rowIndex}
                          columnClassName={`${BCP}_cell`}
                          {...column}
                        />
                      ))
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )
          }
          {showPagination && !dataEmpty && (
            <TablePagination
              id={`${BCP}_pagination`}
              className={`${BCP}_pagination`}
              selectFieldClassName={`${BCP}_pagination_select`}
              selectFieldInputClassName={`${BCP}_pagination_select_input`}
              rows={rowCount}
              rowsPerPageItems={pageSizes}
              rowsPerPage={tableState.size}
              page={tableState.page + 1}
              onPagination={(a, size, page) => tableDispatch({ type: 'SetPagination', payload: { page: page - 1, size } })}
            />
          )}
        </>
      }
    </Table>
  );


  function onRowToggle(index, checked) {
    tableDispatch({ type: 'SetSelected', payload: { index, checked, rows } });
  }
}

DataTable.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  selected: PropTypes.array,
  isSelectable: PropTypes.bool,
  // onRowToggle: PropTypes.func,
  onSort: PropTypes.func,
  sort: PropTypes.object,
  isLoading: PropTypes.bool,
  showPagination: PropTypes.bool.isRequired,
  rowCount: PropTypes.number.isRequired,
  tableDispatch: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  tableState: PropTypes.shape({
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

DataTable.defaultProps = {
  className: '',
  onRowClick: () => {},
  // onRowToggle: () => {},
  selected: [],
  isSelectable: false,
  onSort: () => {},
  sort: {},
  isLoading: false,
  pageSizes: [10, 50, 100, 250],
  // showPagination: true,
};

export default DataTable;
