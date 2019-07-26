import { useState, useEffect, useMemo, useRef } from 'react';
import {
    objArrayToMap,
    composeContainers,
    reinterpolate,
    funcifyHandler
} from '../utils';

export const useMap = array => useMemo(() => objArrayToMap(array), [array]);

export const useLegacyState = initState => {
    const [state, replaceState] = useState(initState);
    const setState = useMemo(() => {
        return updates => replaceState(state => ({ ...state, ...updates }));
    }, [replaceState]);
    return [state, setState];
};

export const useContainer = (containerMap, containerIds, components) => {
    const [Container, setContainer] = useState(
        composeContainers(containerMap, containerIds, components)
    );
    const isMounted = useRef(false);

    useEffect(() => {
        // Container is already initialized with the return value of composeContainers,
        // so we skip doing this again on mount. Without this, Container
        // and all of its children would be mounted twice.
        if (isMounted.current) {
            setContainer(
                composeContainers(containerMap, containerIds, components)
            );
        } else {
            isMounted.current = true;
        }
    }, [containerMap, containerIds, components]);

    return Container;
};

export const useInterpolation = (
    target = {},
    data = {},
    handlersKey = 'handlers'
) => {
    const deps = new Map();
    const interpolated = reinterpolate(target, data, deps);

    const handlers = interpolated[handlersKey];
    const handlerFuncs = {};
    if (typeof handlers === 'object' && handlers != null) {
        Object.keys(handlers).forEach(key => {
            const handler = handlers[key];
            handlerFuncs[key] = funcifyHandler(
                reinterpolate(handler, {
                    ...data,
                    [handlersKey]: handlerFuncs
                }),
                key
            );
        });
    }

    return reinterpolate(target, { ...data, [handlersKey]: handlerFuncs });
};
