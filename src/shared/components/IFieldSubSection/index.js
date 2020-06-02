import React from 'react';
import PropTypes from 'prop-types';

function IFieldSubSection(props) {
  const { label, children } = props;
  return (
    <div className="iFieldSubSection">

      {label && (
        <div className="iFieldSubSection_label">
          {label}
        </div>
      )}

      <div className="iFieldSubSection_content">
        {children}
      </div>
    </div>
  );
}

IFieldSubSection.propTypes = {
  label: PropTypes.string.isRequired,
};

IFieldSubSection.defaultProps = {
  error: '',
};


export default IFieldSubSection;
