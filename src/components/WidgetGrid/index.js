import React, { memo } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Responsive as ResponsiveGrid } from 'react-grid-layout';
import './css/styles.css';

const WidgetGrid = ({ children, layoutMode, ...others }) => (
    <ReactResizeDetector handleWidth>
        {({ width = 0 }) => (
            <ResponsiveGrid
                {...others}
                className='layout'
                width={width}
                isDraggable={layoutMode}
                isResizable={layoutMode}
                isRearrangeable={layoutMode}
            >
                {children}
            </ResponsiveGrid>
        )}
    </ReactResizeDetector>
);

WidgetGrid.defaultProps = {
    margin: [16, 16],
    breakpoints: {
        lg: 1200,
        md: 992,
        sm: 768,
        xs: 0
    },
    cols: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
    },
    rowHeight: 30,
    layoutMode: false
};

export default memo(WidgetGrid);
