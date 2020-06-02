import React, { useState, useEffect, useRef } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  WindowScroller,
  Masonry
} from 'react-virtualized';

const ROW_HEIGHTS = [50, 75, 100];


function GalleryMasonry(props) {
  const { photos } = props;
  const [ masonryWidth, updateMasonryWidth ] = useState(0);
  const masonryRef = useRef(null);

  let cellPositioner = null

  let gutter = 10;
  let columnCount = 3;
  let columnWidth = 250;
  let defaultHeight = 250;


  const cache = new CellMeasurerCache({
    defaultHeight: 250,
    defaultWidth: 200,
    fixedWidth: true,
    fixedHeight: false,
  });

  function reset() {
    // calculateColumnCount();
    cache.clearAll();
    // resetCellPositioner();
    masonryRef.current.clearCellPositions();
  }

  function resetCellPositioner() {
    cellPositioner.reset({
      columnCount,
      columnWidth,
      spacer: gutter,
    });
  }

  function onResize({width}) {
    updateMasonryWidth(width)
    reset()
  }

  function calculateColumnCount() {
    const brakePoints = [640, 768, 920, 1200, 1400];
    columnCount = brakePoints.reduceRight( (p, c, i) => {
      return c < masonryWidth ? p : i;
    }, brakePoints.length) + 1;

    columnWidth = Math.floor((masonryWidth - columnCount * gutter) / columnCount);
  }

  function initCellPositioner() {
    if (!cellPositioner) {
      cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: cache,
        columnCount,
        columnWidth,
        spacer: gutter,
      });
    }
  }

  const cellRenderer = ({index, key, parent, style}) => {
    style.width = columnWidth;
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div
          className="ReactVirtualized__Masonry-item"
          style={style}
        >
          <div
            style={{
              backgroundColor: 'lightblue',
              borderRadius: '0.5rem',
              height: '100%',
              width: '100%',
              marginBottom: '0.5rem',
              fontSize: 20,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {index}
          </div>
        </div>
      </CellMeasurer>
    );
  }

  return(
    <AutoSizer
      onResize={onResize}
    >
      {({width, height}) => {
        // updateMasonryWidth(width);
        // calculateColumnCount();
        initCellPositioner();
        return (
          <Masonry
            autoHeight={false}
            cellCount={100}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={height}
            overscanByPixels={0}
            ref={masonryRef}
            width={width}
            style={{
              willChange: 'auto',
            }}
          />
        );
      }}
    </AutoSizer>
  )

}

export default GalleryMasonry;
