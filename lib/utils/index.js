function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import { recompose } from './recompose';
import { interpolate } from './interpolate';
import ComponentWrapper from '../components/ComponentWrapper';
export const reinterpolate = (target, data, deps = new Map()) => {
  if (typeof data === 'object') {
    return recompose(target, value => {
      return interpolate(value, data, {
        prefix: Object.keys(data)
      }, deps);
    });
  }

  return target;
};
export const funcifyHandler = (handler, handlerKey) => {
  return initialInput => {
    if (Array.isArray(handler)) {
      let input = initialInput;
      handler.forEach(part => {
        if (typeof part.function === 'function') {
          const result = part.function(...reinterpolate(part.parameters, {
            initialInput,
            input
          }));

          if (result !== undefined) {
            input = result;
          }
        } else {
          console.error(`${handlerKey}: error while processing handler`);
        }
      });
      return input;
    }
  };
};
export const objArrayToMap = (objArray, primaryKey = 'id') => {
  const objMap = new Map();

  if (Array.isArray(objArray)) {
    objArray.forEach(obj => {
      if (typeof obj === 'object' && obj != null) {
        objMap.set(obj[primaryKey], obj);
      }
    });
  }

  return objMap;
};
export const recursiveRender = (containers = [], props = {}, index = 0) => {
  if (Array.isArray(containers) && index < containers.length) {
    const Component = containers[index];

    if (Component) {
      return React.createElement(Component, props, recursiveRender(containers, props, index + 1));
    }
  } else {
    return props.children;
  }
};
export const composeContainers = (containerMap, containerIds, components) => {
  let CompositeContainer = ({
    children
  }) => children;

  if (Array.isArray(containerIds)) {
    const containers = containerIds.map(id => {
      return ({
        children,
        ...props
      }) => React.createElement(ComponentWrapper, _extends({}, props, {
        config: containerMap.get(id),
        components: components
      }), children);
    });

    CompositeContainer = props => recursiveRender(containers, props);
  }

  return memo(CompositeContainer);
};