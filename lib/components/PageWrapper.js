function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, useState, useMemo } from 'react';
import ComponentWrapper from './ComponentWrapper';
import WidgetGrid from './WidgetGrid';
import { useLegacyState } from '../hooks/useLegacyState';
export const PageWrapper = ({
  Container,
  config,
  widgetMap,
  components,
  ...others
}) => {
  const {
    initState = {},
    initLayoutMode,
    containerIds,
    widgetIds,
    widgetLayouts,
    ...grid
  } = config;
  const [state, setState] = useLegacyState(initState);
  const [layoutMode, setLayoutMode] = useState(initLayoutMode);
  const [layouts, setLayouts] = useState(widgetLayouts);
  const page = useMemo(() => {
    return {
      initState,
      state,
      setState,
      layouts,
      layoutMode,
      setLayoutMode
    };
  }, [initState, state, setState, layouts, layoutMode, setLayoutMode]);
  let widgets;

  if (Array.isArray(widgetIds)) {
    widgets = widgetIds.map(id => React.createElement("div", {
      key: id
    }, React.createElement(ComponentWrapper, _extends({}, others, {
      page: page,
      config: widgetMap.get(id),
      components: components
    }))));
  }

  return React.createElement(Container, _extends({}, others, {
    page: page
  }), React.createElement(WidgetGrid, _extends({}, grid, {
    layouts: layouts,
    layoutMode: layoutMode,
    onLayoutChange: (_, layouts) => setLayouts(layouts)
  }), widgets));
};
PageWrapper.defaultProps = {
  Container: React.Fragment,
  config: {}
};
export default memo(PageWrapper);