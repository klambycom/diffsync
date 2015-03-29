

<!-- Start src/storage_driver.js -->

# StorageDriver

global -Promise

## create(hash_code, client)

Initialize a storage driver for Redis

### Params:

* **String** *hash_code* 
* **Redisclient** *client* 

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

## getJSON()

Get JSON

### Return:

* **l** data as JSON

## disconnect()

Disconnects from redis

<!-- End src/storage_driver.js -->

