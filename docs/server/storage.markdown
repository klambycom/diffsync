

<!-- Start src/server/storage.js -->

# StorageDriver

### Params:

* **String** *hash_code* 
* **Redisclient** *client* 

global -Promise

## getName()

Get name

### Return:

* **h** name

## setName(name)

Change name

### Params:

* **String** *name* 

## getData()

Get data

### Return:

* **h** JSON

## setData(json)

Change data

### Params:

* **JSON** *json* 

## setFromDocument(doc)

Set data from a document, getJSON() must be called first, because of
tests. I don't have time to do it better right now. Sorry.

### Params:

* **Document** *doc* 

## getJSON()

Get JSON

### Return:

* **l** data as JSON

## disconnect()

Disconnects from redis

<!-- End src/server/storage.js -->

