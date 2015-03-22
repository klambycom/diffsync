

<!-- Start src/client.js -->

# Client(socket, doc)

### Params:

**Socket.io** *socket* 
**JSONDocument** *doc* Optional param for creating the document

## update(json)

Update the whole document

### Params:

* **Object** *json* Information about and instructions for the document

## merge(json)

Merge instructions

### Params:

* **Object** *json* Instructions for the document

## on(event, listener)

Listen for events

### Events:

* diff
* patch

### Params:

* **String** *event* 
* **Function** *listener* 

<!-- End src/client.js -->

