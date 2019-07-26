import React, { memo, useMemo } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Responsive as ResponsiveGrid } from 'react-grid-layout';
import { Helmet } from 'react-helmet';
import { getStyles } from './styles';

const SmartGrid = ({
    children,
    layoutMode,
    widgetPlaceholderColor,
    ...others
}) => {
    const styles = useMemo(() => {
        return getStyles(widgetPlaceholderColor);
    }, [widgetPlaceholderColor]);

    return (
        <React.Fragment>
            <Helmet>
                <style type='text/css'>{styles}</style>
            </Helmet>
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
        </React.Fragment>
    );
};

SmartGrid.defaultProps = {
    widgetPlaceholderColor: 'rgba(0, 0, 0, 0.15)',
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

export default memo(SmartGrid);
