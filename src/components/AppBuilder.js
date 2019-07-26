import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageBuilder from './PageBuilder';
import { useLegacyState, useMap, useContainer } from '../hooks';

const AppBuilder = ({ config, components, utils }) => {
    const { app, routes, pages, containers, widgets } = config;
    const { initState = {}, containerIds, routeIds } = app;
    const [state, setState] = useLegacyState(initState);
    const routeMap = useMap(routes);
    const pageMap = useMap(pages);
    const containerMap = useMap(containers);
    const widgetMap = useMap(widgets);
    const AppContainer = useContainer(containerMap, containerIds, components);

    const appData = { initState, state, setState };

    let routeComponents;
    if (Array.isArray(routeIds)) {
        routeComponents = routeIds.map(routeId => {
            const { id, pageId, ...routeProps } = routeMap.get(routeId);
            return (
                <Route
                    {...routeProps}
                    key={id}
                    render={routerData => (
                        <PageBuilder
                            app={appData}
                            router={routerData}
                            page={pageMap.get(pageId)}
                            containerMap={containerMap}
                            widgetMap={widgetMap}
                            components={components}
                            utils={utils}
                        />
                    )}
                />
            );
        });
    }

    return (
        <BrowserRouter>
            <Route
                render={routerData => (
                    <AppContainer
                        app={appData}
                        router={routerData}
                        utils={utils}
                    >
                        <Switch>{routeComponents}</Switch>
                    </AppContainer>
                )}
            />
        </BrowserRouter>
    );
};

AppBuilder.defaultProps = {
    routes: [],
    pages: [],
    containers: [],
    widgets: [],
    utils: {}
};

const SmartComponent = PropTypes.shape({
    id: PropTypes.string.isRequired,
    handlers: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                function: PropTypes.string.isRequired,
                parameters: PropTypes.array.isRequired
            })
        )
    ),
    initState: PropTypes.object,
    onMount: PropTypes.string,
    onUnmount: PropTypes.string,
    component: PropTypes.shape({
        type: PropTypes.string.isRequired,
        props: PropTypes.object
    }).isRequired
});

AppBuilder.propTypes = {
    config: PropTypes.shape({
        app: PropTypes.shape({
            initState: PropTypes.object,
            containerIds: PropTypes.arrayOf(PropTypes.string),
            routeIds: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired,
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired,
                exact: PropTypes.bool,
                pageId: PropTypes.string.isRequired
            })
        ),
        pages: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                initState: PropTypes.object,
                initLayoutMode: PropTypes.bool,
                containerIds: PropTypes.arrayOf(PropTypes.string),
                widgetIds: PropTypes.arrayOf(PropTypes.string),
                widgetLayouts: PropTypes.objectOf(
                    PropTypes.arrayOf(
                        PropTypes.shape({
                            i: PropTypes.string.isRequired,
                            x: PropTypes.number.isRequired,
                            y: PropTypes.number.isRequired,
                            w: PropTypes.number.isRequired,
                            h: PropTypes.number.isRequired
                        })
                    )
                ).isRequired,
                margin: PropTypes.arrayOf(PropTypes.number),
                breakpoints: PropTypes.objectOf(PropTypes.number),
                cols: PropTypes.objectOf(PropTypes.number),
                rowHeight: PropTypes.number
            })
        ),
        containers: PropTypes.arrayOf(SmartComponent),
        widgets: PropTypes.arrayOf(SmartComponent)
    }).isRequired,
    components: PropTypes.object.isRequired,
    utils: PropTypes.object
};

export default memo(AppBuilder);
