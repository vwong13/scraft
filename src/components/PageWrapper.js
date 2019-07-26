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
        widgets = widgetIds.map(id => (
            <div key={id}>
                <ComponentWrapper
                    {...others}
                    page={page}
                    config={widgetMap.get(id)}
                    components={components}
                />
            </div>
        ));
    }

    return (
        <Container {...others} page={page}>
            <WidgetGrid
                {...grid}
                layouts={layouts}
                layoutMode={layoutMode}
                onLayoutChange={(_, layouts) => setLayouts(layouts)}
            >
                {widgets}
            </WidgetGrid>
        </Container>
    );
};

PageWrapper.defaultProps = {
    Container: React.Fragment,
    config: {}
};

export default memo(PageWrapper);
