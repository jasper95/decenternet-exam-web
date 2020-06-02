import { useState } from 'react';

export default function useTableSort(params) {
  const { initialSort } = params;
  const [sort, setSort] = useState(initialSort);

  function onSort(columnName) {
    setSort(prevSort => prevSort.map((e) => {
      if (e.column === columnName) {
        return {
          ...e,
          direction: e.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return e;
    }));
  }
  return [sort, onSort];
}
