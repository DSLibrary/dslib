# Map

## Constructor
The `Map` constructor accepts no arguments. `new Map()` creates an empty map.

## Methods

### `.add(Object key, Object value) => undefined`
Adds a the pair `key` and `value` to the map. If `key` is already present in the map, does nothing. The `insert()` method is an alias for `add()`. 

### `.remove(Object key) => undefined`
Removes the `key` and it's associated value from the map. If `key` is not in the map, does nothing.

### `.get(Object key) => Object value | undefined`
Returns the `value` which is mapped to `key` in the map. If `key` is not present, returns `undefined`.

### `.update(Object key, Object value) => undefined`
Updates the mapping of `key` to `value`, **only** if `key` is in the set. If `key` is not in the set, does nothing.

### `.set(Object key, Object value) => undefined`
Sets the mapping of `key` to `value`, regardless of whether or not the `key` is already present. (If present, overwrites previous value).

### `.hasKey(Object key) => Boolean`
Returns whether or not the map contains `key`.

### `.size() => Number`
Returns the number of key/value pairs in the map.
