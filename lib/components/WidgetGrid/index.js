function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  return React.createElement(React.Fragment, null, React.createElement(Helmet, null, React.createElement("style", {
    type: "text/css"
  }, styles)), React.createElement(ReactResizeDetector, {
    handleWidth: true
  }, ({
    width = 0
  }) => React.createElement(ResponsiveGrid, _extends({}, others, {
    className: "layout",
    width: width,
    isDraggable: layoutMode,
    isResizable: layoutMode,
    isRearrangeable: layoutMode
  }), children)));
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