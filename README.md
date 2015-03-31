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

DS används av texteditorna Eclipse, Bespin och Gedit, som alla använder eller
är kompatibla med MobWrite !!Läs om MobWrite !!. Där används algoritmen för att
göra det möjligt för flera användare att jobba på samma textfil i olika editorer.
Men N. Fraser skriver att algoritmen ska fungerar med allt innehåll som det går
att skapa en diff på.

En oväntad användning för DS som N. Fraser fann var för onlineapplikationer som
vill erbjuda autosave-funktionalitet. Då kollaborerar bara användaren med sig
själv, men eventuellt från olika datorer.

Anledningen till att jag skapar diffsync i javascript är att jag kan dela
väldigt mycket kod mellan klient och server, det skriver även N. Fraser är en
av fördelarna med algoritmen.


##### Dictionary

* *Document* is the JSON descripting the document (audio, video, etc.).
* *Shadow* is a copy of the document, updated from patches. Document is the
  working file.
* *Edits*? I don't know, yet.


#### När en användaren gör en ändring i sitt dokument:

![Differential Synchronization](diffsync.png)


##### Online

1. En diff är skapad, med hjälp av [jsondiffpatch][jsondiffpatch], mellan
   klientens text och klientens shadow.
2. Från diffen skapas en lista med ändringar som har gjorts på klientens text.
3. Ändringarna kopieras till klientens shadow.
4. *(a)* En patch skapas från diffen, och skickas till servern. Med [Socket.io][socket].<br>
   *(b)* Om diffen inte innehåller några ändringar skickas inget till servern.
5. På servern patchas serverns text och serverns shadow som tillhör användaren.
6. Nu upprepas processen i andra riktningen för varje klient.
7. Diffar och patchar skapas så länge dokumenten och deras shadow inte är
   identiska.


##### Offline

För att alternativ ett ska fungera måste servern spara alla diffar, medans
alternativ två måste låsa dokumentet för att inga ändringar ska kunna göras
innan dokumentet har hunnit ikapp servern. Om alternativ ett är väldig snabb
behövs kanske inte dokumentet låsas. Alternativ tre är antagligen det vinnande
alternativet just nu, jag kan inte se några problem med den. Dokumentet måste
fortfarande låsas, precis som med alternativ 2, men förhoppningsvis bara ett
par millisekunder. Och servern måste inte spara alla diffar.

###### Alt. 1

1. När en klient ansluter efter att ha varit offline, får den dokumentet från
   servern, som vanligt.
2. Klienten skickar tidpunkt till server för att få diffar från efter den
   tiden.
3. Dokumentet patchas om det går.
4. Den vanliga algoritmen börjar igen.

###### Alt. 2

1. När en klient ansluter efter att ha varit offline, får den dokumentet från
   servern, som vanligt.
2. Användarens dokument låses tillfälligt.
3. Klienten skickar diffen till servern.
4. Dokumenten patchas med de diffar där dokumentet fortfarande är samma.
5. Dokumentet skickas på nytt till klienten som uppdaterar dokumenten.

###### Alt. 3

Algoritmen har arbetat på som vanligt fram till och med steg 3.

1. När en klient ansluter efter att ha varit offline, får den dokumentet från
   servern, som vanligt.
2. Ett tillfälligt dokument skapas från JSON från servern (föregående steg).
3. Dokumentet låses.
4. En diff mellan klientens dokument och det tillfälliga dokumentet skapas.
5. Client document och client shadow patchas.
6. Dokumentet låses upp.


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


## License

Copyright (c) 2015 Christian Nilsson

Licensed under the MIT license.


[david-url]: https://david-dm.org/klambycom/diffsync#info=dependencies&view=table
[david-image]: https://david-dm.org/klambycom/diffsync.svg?style=flat-square

[david-dev-url]: https://david-dm.org/klambycom/diffsync#info=devDependencies&view=table
[david-dev-image]: https://david-dm.org/klambycom/diffsync/dev-status.svg?style=flat-square

[travis-url]: https://travis-ci.org/klambycom/diffsync
[travis-image]: https://api.travis-ci.org/klambycom/diffsync.svg?style=flat-square
