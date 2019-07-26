# Smart App

Smart app is a library which generates an entire application from a simple configuration JSON. The benefits of this include, but are not limited to, the following:
- Allows developers to focus on overlays & widgets.
- Changes to the JSON config are reflected instantly in the app.
- Skip boilerplate code related to routing and state management.
- App can easily be shared via a JSON file.

### Example JSON
```
{
    "initState": {},
    "overlayIds": ["appOverlay"],
    "routes": [{
        "id": "rootPath",
        "path": "/",
        "exact": true,
        "pageId": "examplePage"
    }],
    "pages": [{
        "id": "examplePage",
        "initState": {},
        "overlayIds": ["pageOverlay"],
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
    "overlays": [
        {
            "id": "appOverlay",
            "handlers": {
                "handleMount": [{
                    "function": "${utils.log}",
                    "parameters": ["App overlay mounted"]
                }],
                "handleUnmount": [{
                    "function": "${utils.log}",
                    "parameters": ["App overlay unmounted"]
                }]
            },
            "initState": {},
            "onMount": "${handlers.handleMount}",
            "onUnmount": "${handlers.handeUnmount}",
            "component": {
                "type": "ExampleOverlay",
                "props": {
                    "title": "App Overlay"
                }
            }
        },
        {
            "id": "pageOverlay",
            "handlers": {
                "handleMount": [{
                    "function": "${utils.log}",
                    "parameters": ["Page overlay mounted"]
                }],
                "handleUnmount": [{
                    "function": "${utils.log}",
                    "parameters": ["Page overlay unmounted"]
                }]
            },
            "initState": {},
            "onMount": "${handlers.handleMount}",
            "onUnmount": "${handlers.handeUnmount}",
            "component": {
                "type": "ExampleOverlay",
                "props": {
                    "title": "Page Overlay"
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