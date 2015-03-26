

<!-- Start src/storage_driver.js -->

# StorageDriver

global -Promise

## constructor(hash_code, client)

Initialize a storage driver for Redis

### Params:

* **String** *hash_code* 
* **Redisclient** *client* 

## setName(name)

Change name

### Params:

* **String** *name* 

## getName()

Get name

### Return:

* **h** name

## setData(json)

Change data

### Params:

* **JSON** *json* 

## getData()

Get data

### Return:

* **h** JSON

## getJSON()

Get JSON

### Return:

* **l** data as JSON

## disconnect()

Disconnects from redis

<!-- End src/storage_driver.js -->

