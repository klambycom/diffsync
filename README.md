# diffsync [![Dependencies badge][david-image]][david-url] [![DevDependencies badge][david-dev-image]][david-dev-url]


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


[david-url]: https://david-dm.org/klambycom/podcat#info=dependencies&view=table
[david-image]: https://david-dm.org/klambycom/Podcat.svg?style=flat-square

[david-dev-url]: https://david-dm.org/klambycom/podcat#info=devDependencies&view=table
[david-dev-image]: https://david-dm.org/klambycom/Podcat/dev-status.svg?style=flat-square

