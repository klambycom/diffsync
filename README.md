# diffsync [![Dependencies badge][david-image]][david-url] [![DevDependencies badge][david-dev-image]][david-dev-url] [![Travis CI][travis-image]][travis-url]


Diffsync is a implementation of [Differential Synchronization][fraser] in
Javascript.

N. Fraser skriver att...

DS skickar inte hela dokumentet, utan bara diffar och utnyttjar bandbredden
effektivt. DS är feltolerant vilket gör att dokumenten kan mergas trots enstaka
fel.

Ett designmål med DS var att skapa en minimalistisk algoritm som inte påverkar
applikationens utforming för mycket. DS är därför också lämplig att använda
i befintliga applikationer.


##### Dictionary

* *Document* is the JSON descripting the document (audio, video, etc.).
* *Shadow* is a copy of the document, updated from patches. Document is the
  working file.
* *Edits*? I don't know, yet.


#### När en användaren gör en ändring i sitt dokument:

![Differential Synchronization](diffsync.png)

1. En diff är skapad, med hjälp av [jsondiffpatch][jsondiffpatch], mellan
   klientens text och klientens shadow.
2. Från diffen skapas en lista med ändringar som har gjorts på klientens text.
3. Ändringarna kopieras till klientens shadow.
4. *(a)* En patch skapas från diffen, och skickas till servern. Med [Socket.io][socket].<br>
   *(b)* Om diffen inte innehåller några ändringar skickas inget till servern.
5. På servern patchas serverns text och serverns shadow som tillhör användaren.
6. Nu upprepas processen i andra riktningen för varje klient.


[//]: # (References)
[fraser]: https://neil.fraser.name/writing/sync/ "Differential Synchronization"
[jsondiffpatch]: https://github.com/benjamine/jsondiffpatch "Diff & patch for JavaScript objects"
[socket]: http://socket.io/ "Websocket"


## Installation

TODO


## Usage

Diffsync needs both a server and a client. Both the server and the client need
socket.io to work. See [example/](https://github.com/klambycom/diffsync/tree/master/example).

#### Server

```javascript
let io = require('socket.io')(server);

io.on('connection', function (socket) {
  let diffsync = server('room_1', socket);

  diffsync.on('patch', data => console.log('PATCH', data));
  diffsync.on('diff',  data => console.log('DIFF',  data));
});
```

#### Client

```javascript
let socket = require('socket.io-client')('http://localhost:8000');

socket.on('connect', function () {
  let titleElem = document.querySelector('#app h1');
  let docElem = document.querySelector('#app .document');
  let sendElem = document.querySelector('#app .send');

  let diffsync = require('diffsync').client(socket);

  diffsync.on('update', data => {
    titleElem.innerHTML = data.name;
    docElem.value = JSON.stringify(data, null, 2);
  });

  sendElem.addEventListener('click', e => {
    diffsync.update(JSON.parse(docElem.value));
  });
});
```


## API DiffSync.client(socket, doc)

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

##### Return:

* **Boolean** false if the document is not changed and diff is not sent

### merge(json)

Merge instructions

##### Params:

* **Object** *json* Instructions for the document

##### Return:

* **Boolean** false if the document is not changed and diff is not sent

### on(event, listener)

Listen for events

##### Events:

* diff
* patch
* update

##### Params:

* **String** *event* 
* **Function** *listener* 


## API DiffSync.server(room, socket, client, doc)

##### Params:

* **String** *room*
* **Socket.io** *socket* Websocket using Socket.io
* **Redis client** *client* Optional
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


## Custom Storage API

```javascript
let myCustomStorageDriver = {

  /**
   * Initialize the storage driver
   *
   * @method _initStorage
   * @param {Object} options
   * @returns Promise
   */

  _initStorage(options) {
  },

  /**
   * Get document
   *
   * @method get
   * @returns Promise
   */

  get() {
  },

  /**
   * Set document
   *
   * @method set
   * @param {Object} data
   * @param {Object} patch
   * @returns Promise
   */

  set(data, patch) {
  }
};

diffsync.server(socket, myCustomStorageDriver, new JSONDocument);
```

### Using Redis for storage

```javascript
let redisStorage = diffsync.redisDefaultStorage(redis);
diffsync.server(socket, redisStorage, new JSONDocument);
```


## License

Copyright (c) 2015 Christian Nilsson

Licensed under the MIT license.


[david-url]: https://david-dm.org/klambycom/diffsync#info=dependencies&view=table
[david-image]: https://david-dm.org/klambycom/diffsync.svg?style=flat-square

[david-dev-url]: https://david-dm.org/klambycom/diffsync#info=devDependencies&view=table
[david-dev-image]: https://david-dm.org/klambycom/diffsync/dev-status.svg?style=flat-square

[travis-url]: https://travis-ci.org/klambycom/diffsync
[travis-image]: https://api.travis-ci.org/klambycom/diffsync.svg?style=flat-square
