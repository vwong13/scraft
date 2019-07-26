import React, { memo, useState, useEffect, useMemo, useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useLegacyState } from './useLegacyState';
import { objArrayToMap, composeContainers } from '../utils';

export const buildApp = (config, components, utils) => () => {
    const { initState = {}, containerIds, routeIds } = config.app;
    const routeMap = objArrayToMap(config.routes);
    const pageMap = objArrayToMap(config.pages);
    const containerMap = objArrayToMap(config.containers);
    const widgetMap = objArrayToMap(config.widgets);
    const Container = composeContainers(containerMap, containerIds, components);

    const pageContainerMap = new Map();
    pageMap.forEach(({ containerIds }, pageId) => {
        const PageContainer = composeContainers(
            containerMap,
            containerIds,
            components
        );
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
                const { pageId, ...routeProps } = routeMap.get(id);
                return (
                    <Route
                        {...routeProps}
                        key={id}
                        render={router => (
                            <PageWrapper
                                props={props}
                                app={app}
                                router={router}
                                Container={pageContainerMap.get(pageId)}
                                config={pageMap.get(pageId)}
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
                    render={router => {
                        return (
                            <Container
                                props={props}
                                app={app}
                                router={router}
                                utils={utils}
                            >
                                <Switch>{routes}</Switch>
                            </Container>
                        );
                    }}
                />
            </BrowserRouter>
        );
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
