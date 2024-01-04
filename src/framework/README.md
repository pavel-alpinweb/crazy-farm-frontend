# Abstarct View - a framework for the client-side of the Crazy Farm game.

## Modules:
### graphic
- **AbstractAnimatedSprite** - used for creating animated Pixi sprites
- **AbstractScene** - used for creating scenes (PIXI.Application)
- **AbstractStaticSprite** - used for creating static Pixi sprites
- **AbstractTilingSprite** - used for creating tiling Pixi sprites
- **AssetsLoader** - used for resource loading

### interface
- **AbstractScreen** - used for creating application screens
- **AbstractStaticScreen** - a lightweight version of screens for rendering static layouts
- **AbstractView** - used for creating UI components, the parent class for AbstractScreen and AbstractWidget
- **AbstractWidget** - used for creating UI components that contain other UI components
- **Loader** - used for invoking the loading screen
- **Toaster** - used for invoking tooltips

##### **AbstractController**
Used for controllers containing the main business logic of the page.

##### **EventBus**
Event bus is used to connect the model and UI components of types: AbstractView and AbstractWidget.

##### **Router**
Used for creating page navigation.

##### **Service**
Used for data exchange with the server through the axios library.

##### **Socket**
Used for data exchange with the server through the WebSocket protocol.