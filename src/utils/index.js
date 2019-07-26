import React, { memo } from 'react';
import { recompose } from './recompose';
import { interpolate } from './interpolate';
import ComponentWrapper from '../components/ComponentWrapper';

export const reinterpolate = (target, data, deps = new Map()) => {
    if (typeof data === 'object') {
        return recompose(target, value => {
            return interpolate(
                value,
                data,
                { prefix: Object.keys(data) },
                deps
            );
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
                    const result = part.function(
                        ...reinterpolate(part.parameters, {
                            initialInput,
                            input
                        })
                    );
                    if (result !== undefined) {
                        input = result;
                    }
                } else {
                    console.error(
                        `${handlerKey}: error while processing handler`
                    );
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
            return (
                <Component {...props}>
                    {recursiveRender(containers, props, index + 1)}
                </Component>
            );
        }
    } else {
        return props.children;
    }
};

export const composeContainers = (containerMap, containerIds, components) => {
    let CompositeContainer = ({ children }) => children;
    if (Array.isArray(containerIds)) {
        const containers = containerIds.map(id => {
            return ({ children, ...props }) => (
                <ComponentWrapper
                    {...props}
                    config={containerMap.get(id)}
                    components={components}
                >
                    {children}
                </ComponentWrapper>
            );
        });
        CompositeContainer = props => recursiveRender(containers, props);
    }
    return memo(CompositeContainer);
};
