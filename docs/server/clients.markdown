

<!-- Start src/server/clients.js -->

# Clients

Handle clients.

## create(websocket)

Add client and create doc and shadow

### Params:

* **Object** *websocket* Websocket-object from ws-server

### Return:

* **Object** Client if client is valid

## remove(client)

Remove client

### Params:

* **Object** *client* The client to remove

## all()

Array containing all users

### Return:

* **Array** All clients

## forEach(fn)

Call function for every client

### Params:

* **Function** *fn* Function with the parameters currentValue, index and array

<!-- End src/server/clients.js -->

