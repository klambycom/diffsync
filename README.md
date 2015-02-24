# diffsync


## Installation

TODO


## Usage

TODO


## API


### client(socket)

##### Params:

* **Socket.io** *socket* 

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


### server

TODO


## License

MIT
