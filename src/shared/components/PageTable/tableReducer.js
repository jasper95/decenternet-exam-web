export const tableInitialState = {
  size: 10,
  page: 0,
  sort: [],
  selected: [],
  search: '',
};

export default function tableReducer(state, action) {
  if (action.type === 'SetSearch') {
    return {
      ...tableInitialState,
      search: action.payload,
      sort: state.sort,
    };
  }
  if (action.type === 'ResetSelected') {
    return { ...state, selected: [] };
  } if (action.type === 'SetSort') {
    return { ...state, sort: [action.payload] };
  }
  const keyMappings = {
    SetSize: 'size',
    SetPage: 'page',
    SetSelected: 'selected',
  };
  const key = keyMappings[action.type];
  if (action.type === 'SetSelected') {
    const { index, checked, rows } = action.payload;
    const { selected } = state;
    let arr = [];
    if (index === 0) {
      arr = checked ? rows.map(e => e.id) : [];
    } else {
      const { id } = rows[index - 1];
      arr = checked ? [...selected, id] : selected.filter(e => e !== id);
    }
    return { ...state, [key]: arr };
  } if (action.type === 'SetPagination') {
    return {
      ...state,
      ...action.payload,
    };
  }
  return { ...state, [key]: action.payload };
}
