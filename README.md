# diffsync


## Installation

TODO


## Usage

TODO


## API


### client(socket)

##### Params:

* **Socket.io** *socket* Websocket using Socket.io

```javascript
let { client } = require('diffsync');
let diffsync = client(socket);
```

#### update(json)

Update the whole document

##### Params:

* **Object** *json* Information about and instructions for the document

#### merge(json)

Merge instructions

##### Params:

* **Object** *json* Instructions for the document


### server(socket)

##### Params:

* **Socket.io** *socket* Websocket using Socket.io

```javascript
let { server } = require('diffsync');
let diffsync = server(socket);
```

#### on(event, listener)

Listen for events

##### Events:

* diff
* patch

##### Params:

* **String** *event*
* **Function** *listener*


## License

MIT
