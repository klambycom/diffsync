# diffsync [![Dependencies badge][david-image]][david-url] [![DevDependencies badge][david-dev-image]][david-dev-url]

TODO


## Installation

TODO


## Usage

TODO


## API DiffSync.client(socket)

##### Params:

* **Socket.io** *socket* Websocket using Socket.io
* **Document** *doc* Optional param for creating the document

```javascript
let { client } = require('diffsync');
let diffsync = client(socket);
```

### update(json)

Update the whole document

##### Params:

* **Object** *json* Information about and instructions for the document

### merge(json)

Merge instructions

##### Params:

* **Object** *json* Instructions for the document

### on(event, listener)

Listen for events

##### Events:

* diff
* patch

##### Params:

* **String** *event* 
* **Function** *listener* 


## API DiffSync.server(socket)

##### Params:

* **Socket.io** *socket* Websocket using Socket.io
* **Document** *doc* Optional param for creating the document

```javascript
let { server } = require('diffsync');
let diffsync = server(socket);
```

### on(event, listener)

Listen for events

##### Events:

* diff
* patch

##### Params:

* **String** *event*
* **Function** *listener*


## License

MIT


[david-url]: https://david-dm.org/klambycom/diffsync#info=dependencies&view=table
[david-image]: https://david-dm.org/klambycom/diffsync.svg?style=flat-square

[david-dev-url]: https://david-dm.org/klambycom/diffsync#info=devDependencies&view=table
[david-dev-image]: https://david-dm.org/klambycom/diffsync/dev-status.svg?style=flat-square
