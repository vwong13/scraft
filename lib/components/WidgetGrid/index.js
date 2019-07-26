function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Responsive as ResponsiveGrid } from 'react-grid-layout';
import './css/styles.css';

const WidgetGrid = ({
  children,
  layoutMode,
  ...others
}) => React.createElement(ReactResizeDetector, {
  handleWidth: true
}, ({
  width = 0
}) => React.createElement(ResponsiveGrid, _extends({}, others, {
  className: "layout",
  width: width,
  isDraggable: layoutMode,
  isResizable: layoutMode,
  isRearrangeable: layoutMode
}), children));

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