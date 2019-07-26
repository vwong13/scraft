# Smart App

Smart app is a library which generates an entire application from a simple configuration JSON. The benefits of this include, but are not limited to, the following:
- Allows developers to focus on containers & widgets.
- Changes to the JSON config are reflected instantly in the app.
- Skip boilerplate code related to routing and state management.
- App can easily be shared via a JSON file.

### Example JSON
```
{
    "initState": {},
    "containerIds": ["appContainer"],
    "routes": [{
        "id": "rootPath",
        "path": "/",
        "exact": true,
        "pageId": "examplePage"
    }],
    "pages": [{
        "id": "examplePage",
        "initState": {},
        "containerIds": ["pageContainer"],
        "widgetIds": ["exampleWidget"],
        "widgetLayouts": {
            "lg": [{
                "i": "exampleWidget",
                "x": 0,
                "y": 0,
                "w": 12,
                "h": 4,
                "minW": 2,
                "minH": 2
            }]
        }     
    }],
    "containers": [
        {
            "id": "appContainer",
            "handlers": {
                "handleMount": [{
                    "function": "${utils.log}",
                    "parameters": ["App container mounted"]
                }],
                "handleUnmount": [{
                    "function": "${utils.log}",
                    "parameters": ["App container unmounted"]
                }]
            },
            "initState": {},
            "onMount": "${handlers.handleMount}",
            "onUnmount": "${handlers.handeUnmount}",
            "component": {
                "type": "ExampleContainer",
                "props": {
                    "title": "App Container"
                }
            }
        },
        {
            "id": "pageContainer",
            "handlers": {
                "handleMount": [{
                    "function": "${utils.log}",
                    "parameters": ["Page container mounted"]
                }],
                "handleUnmount": [{
                    "function": "${utils.log}",
                    "parameters": ["Page container unmounted"]
                }]
            },
            "initState": {},
            "onMount": "${handlers.handleMount}",
            "onUnmount": "${handlers.handeUnmount}",
            "component": {
                "type": "ExampleContainer",
                "props": {
                    "title": "Page Container"
                }
            }
        }
    ],
    "widgets": [{
        "id": "exampleWidget",
        "handlers": {
            "handleMount": [{
                "function": "${utils.log}",
                "parameters": ["exampleWidget mounted"]
            }],
            "handleUnmount": [{
                "function": "${utils.log}",
                "parameters": ["exampleWidget unmounted"]
            }]
        },
        "initState": {},
        "onMount": "${handlers.handleMount}",
        "onUnmount": "${handlers.handeUnmount}",
        "component": {
            "type": "TextField",
            "props": {
                "label": "Name",
                "placeholder": "enter name here"
            }
        }
    }]
}
```