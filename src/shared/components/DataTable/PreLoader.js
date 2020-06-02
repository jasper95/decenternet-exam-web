import React from 'react';
import ContentLoader from 'react-content-loader';
import range from 'lodash/range';

function PreLoader(props) {
  const { 
    columns,
    className : BCP
  } = props


  return (
    <div className={BCP}>
      <div className={`${BCP}_header`}>
        {range(0, columns).map(() => (
          <div className={`${BCP}_cell`}>
            <ContentLoader 
              primaryColor="#d5dff1"
              secondaryColor="#dfe8f7"
              speed={2}
              height={5}
              width={90}
            >
              <rect x="0" y="0" rx="1" ry="1" width="70" height="5" />
              <rect x="80" y="0" rx="1" ry="1" width="20" height="5" />
            </ContentLoader>
          </div>
        ))}
      </div>
      <div className={`${BCP}_body`}>
        {range(0, columns).map(() => (
          <div className={`${BCP}_cell`}>
            <ContentLoader
              primaryColor="#ecf1f9"
              secondaryColor="#d5dff1"
              speed={2}
              height={18}
              width={70}
            >
              <rect x="0" y="0" rx="1" ry="1" width="70" height="5" />
              <rect x="0" y="10" rx="1" ry="1" width="45" height="5" />
            </ContentLoader>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreLoader