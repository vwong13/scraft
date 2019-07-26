function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, useState, useEffect, useMemo, useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useLegacyState } from './useLegacyState';
import { objArrayToMap, composeContainers } from '../utils';
export const buildApp = (config, components, utils) => () => {
  const {
    initState = {},
    containerIds,
    routeIds
  } = config.app;
  const routeMap = objArrayToMap(config.routes);
  const pageMap = objArrayToMap(config.pages);
  const containerMap = objArrayToMap(config.containers);
  const widgetMap = objArrayToMap(config.widgets);
  const Container = composeContainers(containerMap, containerIds, components);
  const pageContainerMap = new Map();
  pageMap.forEach(({
    containerIds
  }, pageId) => {
    const PageContainer = composeContainers(containerMap, containerIds, components);
    pageContainerMap.set(pageId, PageContainer);
  });

  const App = props => {
    const [state, setState] = useLegacyState(initState);
    const app = useMemo(() => {
      return {
        initState,
        state,
        setState
      };
    }, [state, setState]);
    let routes;

    if (Array.isArray(routeIds)) {
      routes = routeIds.map(id => {
        const {
          pageId,
          ...routeProps
        } = routeMap.get(id);
        return React.createElement(Route, _extends({}, routeProps, {
          key: id,
          render: router => React.createElement(PageWrapper, {
            props: props,
            app: app,
            router: router,
            Container: pageContainerMap.get(pageId),
            config: pageMap.get(pageId),
            widgetMap: widgetMap,
            components: components,
            utils: utils
          })
        }));
      });
    }

    return React.createElement(BrowserRouter, null, React.createElement(Route, {
      render: router => {
        return React.createElement(Container, {
          props: props,
          app: app,
          router: router,
          utils: utils
        }, React.createElement(Switch, null, routes));
      }
    }));
  };

  return memo(App);
};
export const useBuilder = (config, components, utils) => {
  const [App, setApp] = useState(buildApp(config, components, utils));
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      setApp(buildApp(config, components, utils));
    } else {
      isMounted.current = true;
    }
  }, [config, components, utils]);
  return App;
};
export default useBuilder;