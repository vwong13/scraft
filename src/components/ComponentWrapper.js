import React, { memo, useEffect } from 'react';
import { useLegacyState } from '../hooks/useLegacyState';
import { useInterpolater } from '../hooks/useInterpolater';

const ComponentWrapper = ({ config, components, children, ...props }) => {
    const { initState = {} } = config;
    const [state, setState] = useLegacyState(initState);
    const data = { ...props, state, setState };
    const { id, onMount, onUnmount, component = {} } = useInterpolater(
        config,
        data
    );

    useEffect(() => {
        if (typeof onMount === 'function') {
            onMount();
        }
        if (typeof onUnmount === 'function') {
            return onUnmount;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Component = components[component.type];
    if (Component) {
        return <Component {...component.props}>{children}</Component>;
    } else {
        const errorMsg = `${id}: component type ${component.type} not found.`;
        const errorStyle = {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };
        console.error(errorMsg);
        return <div style={errorStyle}>{id}</div>;
    }
};

ComponentWrapper.defaultProps = {
    config: {},
    components: {}
};

export default memo(ComponentWrapper);
