import React, { memo, useEffect } from 'react';
import { useLegacyState, useInterpolation } from '../hooks';

const ComponentBuilder = ({
  components,
  metadata,
  children,
  ...props
}) => {
  const {
    initState = {}
  } = metadata;
  const [state, setState] = useLegacyState(initState);
  const data = { ...props,
    state,
    setState
  };
  const {
    id,
    onMount,
    onUnmount,
    component = {}
  } = useInterpolation(metadata, data);
  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount();
    }

    if (typeof onUnmount === 'function') {
      return onUnmount;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  const Component = components[component.type];

  if (Component) {
    return React.createElement(Component, component.props, children);
  } else {
    const errorMsg = `${id}: component type ${component.type} not found.`;
    const errorStyle = {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    console.error(errorMsg);
    return React.createElement("div", {
      style: errorStyle
    }, id);
  }
};

ComponentBuilder.defaultProps = {
  metadata: {}
};
export default memo(ComponentBuilder);