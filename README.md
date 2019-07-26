# Scraft

Scraft is a React component library which transforms a configuration JSON into a web application.

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