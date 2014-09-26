# SetStrict

## Constructor
The `SetStrict` constructor accepts no arguments. `new SetStrict()` creates an empty set.

## Methods

### `.add(Object thing) => undefined`
Adds `thing` to the set if it is not already present.

### .`remove(Object thing) => undefined`
Removes `thing` from the set if present. If not present, does nothing. The `.delete()` method is an alias for `.remove()`.

### `.contains(Object thing) => Boolean`
Returns `true` if `thing` is in the set; `false` otherwise; The `.has()` method is an alias for `.contains()`.

### `.clear()`
Empties the set.

### `.size() => Number`
Returns the number of objects present in the set.
