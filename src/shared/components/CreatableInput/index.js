import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import TextFieldMessage from 'react-md/lib/TextFields/TextFieldMessage';
import PropTypes from 'prop-types';

const components = {
  DropdownIndicator: null,
};

const createOption = label => ({
  label,
  value: label,
});

function CreatableInput(props) {
  const {
    onChange, value: propsValue, id,
    className, classNamePrefix, label,
    error,
  } = props;
  const [value, setValue] = useState(propsValue);
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (!value.map(e => e.value).includes(inputValue)) {
          const newValue = [...value, createOption(inputValue)];
          setValue(newValue);
          onChange(newValue.map(e => e.value), id);
          setInputValue('');
        }
        event.preventDefault();
        break;
      default:
    }
  };
  useEffect(() => {
    if (isNotEqualValue()) {
      setValue(propsValue.map(e => ({ label: e, value: e })));
    }
    function isNotEqualValue() {
      const result = (value && !propsValue) || (!value && propsValue);
      if (value && propsValue) {
        return propsValue.join(',') !== value.map(e => e.value).join(',');
      }
      return result;
    }
  }, [propsValue]);
  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue.map(e => e.value), id);
  };
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <div className="iField">
      {label && (
        <label className="iField_label">
          { label }
        </label>
      )}
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        classNamePrefix={classNamePrefix}
        placeholder="Type something and press enter..."
        value={value}
      />
      <TextFieldMessage
        className="iField_date_message"
        errorText={error}
        error={error}
      />
    </div>
  );
}

CreatableInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
};

CreatableInput.defaultProps = {
  onChange: () => {},
  value: [],
};

export default CreatableInput;
