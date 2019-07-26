function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, useState } from 'react';
import ComponentBuilder from './ComponentBuilder';
import WidgetGrid from './WidgetGrid';
import { useLegacyState, useContainer } from '../hooks';

const PageBuilder = ({
  page,
  containerMap,
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
  } = page;
  const [state, setState] = useLegacyState(initState);
  const [layoutMode, setLayoutMode] = useState(initLayoutMode);
  const [layouts, setLayouts] = useState(widgetLayouts);
  const PageContainer = useContainer(containerMap, containerIds, components);
  const pageData = {
    initState,
    state,
    setState,
    layouts,
    layoutMode,
    setLayoutMode
  };
  let widgetComponents;

  if (Array.isArray(widgetIds)) {
    widgetComponents = widgetIds.map(widgetId => React.createElement("div", {
      key: widgetId
    }, React.createElement(ComponentBuilder, _extends({ ...others,
      page: pageData
    }, {
      components: components,
      metadata: widgetMap.get(widgetId)
    }))));
  }

  return React.createElement(PageContainer, _extends({}, others, {
    page: pageData
  }), React.createElement(WidgetGrid, _extends({}, grid, {
    layouts: layouts,
    layoutMode: layoutMode,
    onLayoutChange: (_, layouts) => setLayouts(layouts)
  }), widgetComponents));
};

PageBuilder.defaultProps = {
  page: {}
};
export default memo(PageBuilder);