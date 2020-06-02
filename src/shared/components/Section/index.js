import React from 'react';

function SectionHeader(props) {
  const {
    desc,
    header,
    position,
    headerLabel,
    withContainer,
    rowSize,
  } = props;

  return (
    <div className={`section_headerRow row row-header row-${position}`}>
      {withContainer
        ? (
          <div className="container">
            <div className={`row row-${position}`}>
              <div className={`col col-md-${rowSize} col-${position}`}>
                { headerLabel && (
                  <h5 className="section_headerLabel">
                    {headerLabel}
                  </h5>
                )}
                { header && (
                  <h1 className="section_header">
                    {header}
                  </h1>
                )}
                { desc && (
                  <p className="section_desc">
                    {desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={`col col-md-${rowSize} col-${position}`}>
            { headerLabel && (
              <h5 className="section_headerLabel">
                {headerLabel}
              </h5>
            )}
            { header && (
              <h1 className="section_header">
                {header}
              </h1>
            )}
            { desc && (
              <p className="section_desc">
                {desc}
              </p>
            )}
          </div>
        )
      }
    </div>
  );
}

SectionHeader.defaultProps = {
  position: 'center',
  rowSize: 10,
};

export default SectionHeader;
