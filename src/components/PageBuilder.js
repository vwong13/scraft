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
        widgetComponents = widgetIds.map(widgetId => (
            <div key={widgetId}>
                <ComponentBuilder
                    {...{ ...others, page: pageData }}
                    components={components}
                    metadata={widgetMap.get(widgetId)}
                />
            </div>
        ));
    }

    return (
        <PageContainer {...others} page={pageData}>
            <WidgetGrid
                {...grid}
                layouts={layouts}
                layoutMode={layoutMode}
                onLayoutChange={(_, layouts) => setLayouts(layouts)}
            >
                {widgetComponents}
            </WidgetGrid>
        </PageContainer>
    );
};

PageBuilder.defaultProps = {
    page: {}
};

export default memo(PageBuilder);
