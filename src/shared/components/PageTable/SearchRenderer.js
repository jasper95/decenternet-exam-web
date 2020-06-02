import React from 'react';
import TextField from 'react-md/lib/TextFields/TextField';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';

function Searchbar(props) {
  const { onSearch, pageName } = props;
  return (
    <TextField
      leftIcon={(
        <FontIcon>search</FontIcon>
      )}
      className="iField iField-search"
      placeholder={`Type to search for ${pageName}`}
      onChange={onSearch}
    />
  );
}

export default Searchbar;
