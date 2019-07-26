function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ComponentBuilder from '../components/ComponentBuilder';
import { recompose } from './recompose';
import { interpolate } from './interpolate';
export const recursiveRender = (components, props = {}, index = 0) => {
  if (Array.isArray(components) && components[index]) {
    const Component = components[index];
    return React.createElement(Component, props, recursiveRender(components, props, index + 1));
  } else {
    return props.children;
  }
};
export const composeContainers = (containerMap, containerIds, components) => () => {
  let CompositeContainer = ({
    children
  }) => children;

  if (Array.isArray(containerIds) && containerIds.length > 0) {
    const containerComponents = containerIds.map(containerId => {
      return ({
        children,
        ...data
      }) => React.createElement(ComponentBuilder, _extends({}, data, {
        components: components,
        metadata: containerMap.get(containerId)
      }), children);
    });

    CompositeContainer = props => {
      return recursiveRender(containerComponents, props);
    };
  }

  return CompositeContainer;
};
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