(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":37,"./_hashDelete":38,"./_hashGet":39,"./_hashHas":40,"./_hashSet":41}],2:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":46,"./_listCacheDelete":47,"./_listCacheGet":48,"./_listCacheHas":49,"./_listCacheSet":50}],3:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":35,"./_root":59}],4:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":51,"./_mapCacheDelete":52,"./_mapCacheGet":53,"./_mapCacheHas":54,"./_mapCacheSet":55}],5:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":35,"./_root":59}],6:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":4,"./_setCacheAdd":60,"./_setCacheHas":61}],7:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":59}],8:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],9:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":18}],10:[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],11:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],12:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],13:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":70}],14:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":31}],15:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],16:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":12,"./_isFlattenable":42}],17:[function(require,module,exports){
var castPath = require('./_castPath'),
    isKey = require('./_isKey'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_castPath":28,"./_isKey":43,"./_toKey":67}],18:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":15,"./_baseIsNaN":20,"./_strictIndexOf":65}],19:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && objectToString.call(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./isObjectLike":78}],20:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],21:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":45,"./_toSource":68,"./isFunction":76,"./isObject":77}],22:[function(require,module,exports){
var basePickBy = require('./_basePickBy');

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

module.exports = basePick;

},{"./_basePickBy":23}],23:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue');

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      baseAssignValue(result, key, value);
    }
  }
  return result;
}

module.exports = basePickBy;

},{"./_baseAssignValue":14}],24:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":31,"./constant":69,"./identity":73}],25:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":7,"./_arrayMap":11,"./isArray":75,"./isSymbol":79}],26:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./_SetCache":6,"./_arrayIncludes":9,"./_arrayIncludesWith":10,"./_cacheHas":27,"./_createSet":30,"./_setToArray":62}],27:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],28:[function(require,module,exports){
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = castPath;

},{"./_stringToPath":66,"./isArray":75}],29:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":59}],30:[function(require,module,exports){
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;

},{"./_Set":5,"./_setToArray":62,"./noop":81}],31:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":35}],32:[function(require,module,exports){
var flatten = require('./flatten'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;

},{"./_overRest":58,"./_setToString":63,"./flatten":71}],33:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],34:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":44}],35:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":21,"./_getValue":36}],36:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],37:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":57}],38:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],39:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":57}],40:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":57}],41:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":57}],42:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

},{"./_Symbol":7,"./isArguments":74,"./isArray":75}],43:[function(require,module,exports){
var isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;

},{"./isArray":75,"./isSymbol":79}],44:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],45:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":29}],46:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],47:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":13}],48:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":13}],49:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":13}],50:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":13}],51:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":1,"./_ListCache":2,"./_Map":3}],52:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":34}],53:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":34}],54:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":34}],55:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":34}],56:[function(require,module,exports){
var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

},{"./memoize":80}],57:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":35}],58:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":8}],59:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":33}],60:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],61:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],62:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],63:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":24,"./_shortOut":64}],64:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 500,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],65:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],66:[function(require,module,exports){
var memoizeCapped = require('./_memoizeCapped'),
    toString = require('./toString');

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;

},{"./_memoizeCapped":56,"./toString":83}],67:[function(require,module,exports){
var isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;

},{"./isSymbol":79}],68:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],69:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],70:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],71:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten');

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

},{"./_baseFlatten":16}],72:[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":17}],73:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],74:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":19,"./isObjectLike":78}],75:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],76:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./isObject":77}],77:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],78:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],79:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":78}],80:[function(require,module,exports){
var MapCache = require('./_MapCache');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

},{"./_MapCache":4}],81:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],82:[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    basePick = require('./_basePick'),
    flatRest = require('./_flatRest'),
    toKey = require('./_toKey');

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, props) {
  return object == null ? {} : basePick(object, arrayMap(props, toKey));
});

module.exports = pick;

},{"./_arrayMap":11,"./_basePick":22,"./_flatRest":32,"./_toKey":67}],83:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":25}],84:[function(require,module,exports){
var baseUniq = require('./_baseUniq');

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length)
    ? baseUniq(array)
    : [];
}

module.exports = uniq;

},{"./_baseUniq":26}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoggingService = function () {
    _createClass(LoggingService, [{
        key: 'log',


        /*
        $rootScope: IRootScopeService;
        primoVersion: string;
        searchStateService: SearchStateService;
        trail: list;
        keypresses: number
        pasted: boolean
        t1: Date
        */

        /****************************************************************************
         * Constructor
         ****************************************************************************/

        value: function log() {
            // console.log.apply(this, arguments);
        }
    }]);

    function LoggingService($rootScope) {
        var _this = this;

        _classCallCheck(this, LoggingService);

        this.$rootScope = $rootScope;

        // Primo version
        this.primoVersion = null;

        // Unfortunately Primo's SearchStateService is not injectable, so we need
        // to get it from one of the components.
        this.searchStateService = null;

        this.lastAction = null;

        // Navigation trail
        this.trail = [];

        // User language
        this.lang = null;

        // Number of keypresses in main search field. Tracked by prmSearchBarAfter
        this.keypresses = 0;

        // Received a paste event? Tracked by prmSearchBarAfter
        this.pasted = false;

        // Server url
        this.url = 'https://ub-www01.uio.no/slurp/';

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            var sc = {
                from: fromState.name,
                fromTime: new Date(),
                to: toState.name,
                toTime: new Date(),
                params: toParams
            };

            if (toParams.lang) {
                _this.lang = toParams.lang;
            }

            var dt = '';
            if (_this.trail.length > 0) {
                sc.fromTime = _this.trail[_this.trail.length - 1].toTime;
                dt = 'after ' + (sc.toTime - sc.fromTime) / 1000 + ' secs';
            }
            _this.trail.push(sc);
            _this.t1 = new Date();
            _this.log('%c [loggingService] State changed from ' + sc.from + ' to ' + sc.to + ' ' + dt, 'background: green; color: white; display: block;');

            // if (toState.params.slurp) {
            //     console.log('SLURP!');
            // }

            // if (toState.name == 'exploreMain.search') {
            //   req.params = {
            //     mode: toParams.mode,  // 'advanced' or '?'
            //     lang: toParams.lang,
            //     query: toParams.query,
            //     search_scope: toParams.search_scope,  // 'default', 'everything', 'local_scope' (Bøker ved UiO), 'bibsys_ils', ..
            //     tab: toParams.tab,  // 'default_tab', 'everything', 'local_uio', 'bibsys_consortia' ...
            //     sortby: toParams.sortby,  // "rank"

            //     // pfilter: Materialtype/språk/utgivelsesdato
            //     // Can be either a string or an array!
            //     // Examples:
            //     //  - "pfilter,exact,books,AND"
            //     //  - ["lang,exact,nor,AND", "pfilter,exact,books,AND", "creationdate,exact,1-YEAR,AND"]
            //     pfilter: toParams.pfilter,

            //     // Facets
            //     // Can be either a string or an array!
            //     // Examples:
            //     //  - "local4,include,NB"
            //     //  - ["local4,include,NB", "local10,include,641.5", "local14,include,Matoppskrifter"]
            //     facet: toParams.facet,
            //   };
            // }
        });
    }

    /****************************************************************************
     * Internal methods
     ****************************************************************************/

    _createClass(LoggingService, [{
        key: 'simplifyRecord',
        value: function simplifyRecord(record) {
            return {
                id: (0, _get2.default)(record, 'pnx.control.recordid.0'),
                is_local: (0, _get2.default)(record, 'context') == 'L',
                adds_id: (0, _get2.default)(record, 'pnx.control.addsrcrecordid.0'),
                source: (0, _get2.default)(record, 'pnx.control.sourcesystem.0'),
                ddc: (0, _uniq2.default)((0, _get2.default)(record, 'pnx.facets.lfc10', [])),
                hume: (0, _uniq2.default)((0, _get2.default)(record, 'pnx.facets.lfc14', [])),
                real: (0, _uniq2.default)((0, _get2.default)(record, 'pnx.facets.lfc20', [])),
                rsrctype: (0, _get2.default)(record, 'pnx.facets.rsrctype', []),
                disptype: (0, _get2.default)(record, 'pnx.display.type', [])
            };
        }
    }, {
        key: 'trackEvent',
        value: function trackEvent(action, data) {
            var _this2 = this;

            var size = JSON.stringify(data).length;
            this.log('%c [loggingService] Track "' + action + '" action (' + size + ' bytes)', 'background: green; color: white; display: block;');
            this.log('[loggingService]', data);

            data.lang = this.lang;

            var payload = {
                last_action: this.lastAction,
                action: action,
                data: data,
                session_id: sessionStorage.getItem('slurpSessionId'),
                action_no: parseInt(sessionStorage.getItem('slurpActionNo')) || 1,
                hist: window.history.length
            };

            this.lastAction = action;

            // Don't use $http since we don't want the Primo default headers etc.
            setTimeout(function () {
                var req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                        var res = JSON.parse(req.responseText);
                        sessionStorage.setItem('slurpSessionId', res.session_id);
                        sessionStorage.setItem('slurpActionNo', res.action_no);
                    }
                };
                req.open('POST', _this2.url);
                req.send(JSON.stringify(payload));
            });
        }
    }, {
        key: 'trackError',
        value: function trackError(msg) {
            this.log('%c [loggingService] Track error "' + msg + '"', 'background: red; color: white; display: block;');
            // TODO: Actually send something to server
        }
    }, {
        key: 'trackSearch',
        value: function trackSearch(search, result, pageNo) {
            if (!this.trail.length) {
                // something is wrong
                return;
            }
            var trailStep = this.trail[this.trail.length - 1];
            var dt = new Date() - trailStep.toTime;
            this.log('%c [loggingService] Got search results after waiting ' + dt / 1000. + ' secs', 'background: green; color: white; display: block;');
            this.log('[loggingService]', search, result);

            var recs = result.data.map(this.simplifyRecord);

            var facets = search.facets.map(function (facet) {
                return (0, _pick2.default)(facet, ['name', // ex: 'local20'
                'value', // ex: 'Fisker'
                'type', // ex: 'include'
                'multiFacetGroupId'] // int
                );
            });

            // - Multiple query parts are split by semicolon
            // - Each part consists of {field},{precision},{term},{operator}
            // - Semicolons are stripped from queries.
            // - Colons are included and NOT escaped. Example:
            //      title,contains,fisker,krabber,OR;creator,contains,tor,NOT;any,exact,laks,AND
            // - In advanced search, there is always a trailing operator, in simple search not.
            // - Material type, language and date selected in advanced search are included as
            //   part of the query, but prefixed with "facet_"

            var query = [],
                query_facets = [];

            search.query.split(/;/).forEach(function (x) {
                var comp = x.split(/,/);
                var res = void 0;

                if (comp[comp.length - 1].match(/^(?:AND|OR|NOT)$/)) {
                    res = {
                        op: comp[comp.length - 1],
                        field: comp[0],
                        prec: comp[1],
                        term: comp.slice(2, comp.length - 1).join(',')
                    };
                } else {
                    res = {
                        op: null,
                        field: comp[0],
                        prec: comp[1],
                        term: comp.slice(2, comp.length).join(',')
                    };
                }
                if (res.field.match(/^facet_/)) {
                    query_facets.push({
                        field: res.field,
                        prec: res.prec,
                        term: res.term
                    });
                } else {
                    query.push(res);
                }
            });

            for (var i = query.length - 1; i > 0; i--) {
                query[i].op = query[i - 1].op;
            }
            query[0].op = null;

            var data = {
                trailStep: this.trail.length,

                keypresses: this.keypresses,
                pasted: this.pasted,
                prepTime: trailStep.toTime - trailStep.fromTime,
                loadTime: new Date() - trailStep.toTime,
                version: this.primoVersion,

                // Search
                advanced: search.mode == 'advanced',
                query: query,
                query_facets: query_facets,
                scope: search.scope, // Trenger vi både scope og tab?
                sort: search.sortby,
                facets: facets,

                // Results
                first: parseInt(result.info.first),
                last: parseInt(result.info.last),
                total: parseInt(result.info.total),
                results: recs.map(function (x) {
                    return x.id;
                }),

                aggs: {
                    records: recs.length, // greit å ha lett tilgjengelig for å kunne regne prosenter
                    is_local: recs.filter(function (x) {
                        return x.is_local;
                    }).length, // for å si noe om hvor mange av treffene som er relevante for emnesøk?
                    has_dewey: recs.filter(function (x) {
                        return x.ddc.length;
                    }).length,
                    has_humord: recs.filter(function (x) {
                        return x.hume.length;
                    }).length,
                    has_rt: recs.filter(function (x) {
                        return x.real.length;
                    }).length
                }
            };

            // var summary = `${data.scope}:${data.query}: Loaded ${data.results.length} of ${data.total} results, of which
            //     ${data.aggs.is_local} local (non-PCI), ${data.aggs.has_dewey} got DDC,
            //     ${data.aggs.has_humord} got Humord, ${data.aggs.has_rt} got Realfagstermer.`;
            // TODO: Notify as event?

            var action = 'search';
            if ((0, _get2.default)(search, 'facets.0.name') == 'frbrgroupid') {
                action = 'expand_frbr_group';
            } else if (pageNo > 1) {
                action = 'change_page';
            } else if (facets.length) {
                action = 'refinement';
            }

            this.trackEvent(action, data);
        }

        /****************************************************************************
         * Interface for prmSearchBarAfter
         ****************************************************************************/

        // public

    }, {
        key: 'initSearchBar',
        value: function initSearchBar() {
            this.pasted = false;
            this.keypresses = 0;
        }

        // public

    }, {
        key: 'incrKeypressCount',
        value: function incrKeypressCount() {
            this.keypresses++;
        }

        // public

    }, {
        key: 'setSearchStateService',
        value: function setSearchStateService(searchStateService) {
            this.searchStateService = searchStateService;
        }

        // public

    }, {
        key: 'setPrimoVersion',
        value: function setPrimoVersion(version) {
            this.primoVersion = version;
        }

        // public

    }, {
        key: 'searchBarElementPasteEvent',
        value: function searchBarElementPasteEvent() {
            this.pasted = true;
        }

        /****************************************************************************
         * Interface for prmSearchResultListAfter
         ****************************************************************************/

        /**
         * Method called from prmSearchResultListAfter when any number of pages
         * are loaded. This also indicates that search results are ready.
         */

    }, {
        key: 'searchPageLoaded',
        value: function searchPageLoaded(pages) {

            if (!this.searchStateService) {
                // Something is really wrong
                this.trackError('searchStateService not injected');
                return;
            }

            if (this.searchStateService.isSearchInProgress()) {
                this.trackError('searchStateService search still in progress');
                return;
            }

            var search = this.searchStateService.getSearchObject();
            var result = this.searchStateService.getResultObject();

            if (!search || !result) {
                this.trackError('searchObject or resultObject is missing');
                return;
            }

            this.trackSearch(search, result, pages);
        }

        /****************************************************************************
         * Interface for prmNoSearchResultAfter
         ****************************************************************************/

    }, {
        key: 'noResultsPageLoaded',
        value: function noResultsPageLoaded() {
            if (!this.searchStateService) {
                // Something is really wrong
                this.trackError('searchStateService not injected');
                return;
            }

            if (this.searchStateService.isSearchInProgress()) {
                this.trackError('searchStateService search still in progress');
                return;
            }

            var search = this.searchStateService.getSearchObject();
            var result = this.searchStateService.getResultObject();

            if (!search || !result) {
                this.trackError('searchObject or resultObject is missing');
                return;
            }

            this.trackSearch(search, result);
        }

        /****************************************************************************
         * Interface for prmFullViewAfter
         ****************************************************************************/

    }, {
        key: 'trackViewRecord',
        value: function trackViewRecord(record) {
            var data = this.simplifyRecord(record);
            this.trackEvent('view_record', data);
        }
    }, {
        key: 'trackSendTo',
        value: function trackSendTo(serviceName, record) {
            var data = {
                service: serviceName,
                rec: this.simplifyRecord(record)
            };
            this.trackEvent('send_to', data);
        }

        /****************************************************************************
         * Interface for prmSaveToFavoritesButtonAfter
         ****************************************************************************/

    }, {
        key: 'trackPinRecord',
        value: function trackPinRecord(record) {
            var data = this.simplifyRecord(record);
            this.trackEvent('pin_record', data);
        }
    }, {
        key: 'trackUnpinRecord',
        value: function trackUnpinRecord(record) {
            var data = this.simplifyRecord(record);
            this.trackEvent('unpin_record', data);
        }

        /****************************************************************************
         * Interface for prmSearchAfter
         ****************************************************************************/

    }, {
        key: 'trackHome',
        value: function trackHome() {
            this.trackEvent('goto_home', {});
        }
    }]);

    return LoggingService;
}();

LoggingService.$inject = ['$rootScope'];

exports.default = LoggingService;

},{"lodash/get":72,"lodash/pick":82,"lodash/uniq":84}],86:[function(require,module,exports){
'use strict';

var _viewName = require('./viewName');

var _viewName2 = _interopRequireDefault(_viewName);

var _logging = require('./logging.service');

var _logging2 = _interopRequireDefault(_logging);

var _prmActionListAfter = require('./prmActionListAfter.component');

var _prmActionListAfter2 = _interopRequireDefault(_prmActionListAfter);

var _prmBriefResultContainerAfter = require('./prmBriefResultContainerAfter.component');

var _prmBriefResultContainerAfter2 = _interopRequireDefault(_prmBriefResultContainerAfter);

var _prmFullViewAfter = require('./prmFullViewAfter.component');

var _prmFullViewAfter2 = _interopRequireDefault(_prmFullViewAfter);

var _prmNoSearchResultAfter = require('./prmNoSearchResultAfter.component');

var _prmNoSearchResultAfter2 = _interopRequireDefault(_prmNoSearchResultAfter);

var _prmSaveToFavoritesButtonAfter = require('./prmSaveToFavoritesButtonAfter.component');

var _prmSaveToFavoritesButtonAfter2 = _interopRequireDefault(_prmSaveToFavoritesButtonAfter);

var _prmSearchAfter = require('./prmSearchAfter.component');

var _prmSearchAfter2 = _interopRequireDefault(_prmSearchAfter);

var _prmSearchBarAfter = require('./prmSearchBarAfter.component');

var _prmSearchBarAfter2 = _interopRequireDefault(_prmSearchBarAfter);

var _prmSearchResultListAfter = require('./prmSearchResultListAfter.component');

var _prmSearchResultListAfter2 = _interopRequireDefault(_prmSearchResultListAfter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('viewCustom', ['angularLoad']);

app.service('loggingService', _logging2.default);

app.component('prmActionListAfter', _prmActionListAfter2.default);
app.component('prmBriefResultContainerAfter', _prmBriefResultContainerAfter2.default);
app.component('prmFullViewAfter', _prmFullViewAfter2.default);
app.component('prmNoSearchResultAfter', _prmNoSearchResultAfter2.default);
app.component('prmSaveToFavoritesButtonAfter', _prmSaveToFavoritesButtonAfter2.default);
app.component('prmSearchAfter', _prmSearchAfter2.default);
app.component('prmSearchBarAfter', _prmSearchBarAfter2.default);
app.component('prmSearchResultListAfter', _prmSearchResultListAfter2.default);

// ------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
app.run(['$rootScope', 'loggingService', function ($rootScope, loggingService) {
    // WARNING: This might not be called if Primo errors..
    // Components may still be initialized
    $rootScope.viewName = _viewName2.default;
}]);

},{"./logging.service":85,"./prmActionListAfter.component":87,"./prmBriefResultContainerAfter.component":88,"./prmFullViewAfter.component":89,"./prmNoSearchResultAfter.component":90,"./prmSaveToFavoritesButtonAfter.component":91,"./prmSearchAfter.component":92,"./prmSearchBarAfter.component":93,"./prmSearchResultListAfter.component":94,"./viewName":95}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmActionListAfterController = function PrmActionListAfterController(loggingService, $document, $element) {
    var _this = this;

    _classCallCheck(this, PrmActionListAfterController);

    // Note: action list can be part of results list OR record view.
    $document.ready(function () {
        var parentElement = $element.parent()[0];
        var btns = angular.element(parentElement.querySelectorAll('#scrollActionList button'));

        if (!btns.length) {
            console.error('Error: No action buttons found!');
        }

        btns.on('click', function (evt) {
            var sendToType = evt.currentTarget.querySelectorAll('.button-text')[0].getAttribute('translate');
            var item = _this.parentCtrl.item;
            loggingService.trackSendTo(sendToType, item);
        });
    });
};

PrmActionListAfterController.$inject = ['loggingService', '$document', '$element'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmActionListAfterController,
    template: ''
};

},{}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmBriefResultContainerAfterController = function PrmBriefResultContainerAfterController() {
    // let item = this.parentCtrl.item;
    //loggingService.trackViewRecord(item);
    // console.log('brief result', this.parentCtrl)

    // $document.ready(() => {
    //     console.log('GNU', this);
    // });

    _classCallCheck(this, PrmBriefResultContainerAfterController);
};

PrmBriefResultContainerAfterController.$inject = [];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmBriefResultContainerAfterController,
    template: ''
};

},{}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmFullViewAfterController = function PrmFullViewAfterController(loggingService) {
    _classCallCheck(this, PrmFullViewAfterController);

    var item = this.parentCtrl.item;
    loggingService.trackViewRecord(item);
};

PrmFullViewAfterController.$inject = ['loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmFullViewAfterController,
    template: ''
};

},{}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Adopted from a version by @SarahZum
 * https://github.com/SarahZum/primo-explore-custom-no-results
 */

var PrmNoSearchResultAfterController = function PrmNoSearchResultAfterController(loggingService) {
    _classCallCheck(this, PrmNoSearchResultAfterController);

    loggingService.noResultsPageLoaded();

    // var vm = this;
    // vm.pciSetting = vm.parentCtrl.searchStateService.searchObject.pcAvailability || '';
    // condole.log(vm.parentCtrl.searchStateService.searchObject);
    // vm.getSearchTerm = function getSearchTerm() {
    //   return vm.parentCtrl.term;
    // };
};

PrmNoSearchResultAfterController.$inject = ['loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmNoSearchResultAfterController,
    template: ''
};

// export default {
//   bindings: {parentCtrl: '<'},
//   controller: PrmNoSearchResultAfterController,
//   controllerAs: 'vm',
//   template: `
//     <md-card class="default-card zero-margin _md md-primoExplore-theme">
//     <md-card-title>
//       <md-card-title-text>
//         <span translate="" class="md-headline ng-scope">No records found</span>
//       </md-card-title-text>
//     </md-card-title>
//     <md-card-content>
//       <p>
//         <span>There are no results matching your search:<blockquote>
//           <i>{{$ctrl.getSearchTerm()}}</i>.</blockquote>
//           <div ng-if="$ctrl.pciSetting !== \'true\'">
//             <a href="/primo-explore/search?query=any,contains,{{$ctrl.getSearchTerm()}}&tab=default_tab&search_scope=Everything&vid=01BRC_SOC&offset=0&sortby=rank&pcAvailability=true">
//               <b>Try again searching items held at other libraries?</b>
//             </a>
//           </div>
//         </span>
//       </p>
//       <p>
//         <span translate="" class="bold-text ng-scope">Suggestions:</span>
//       </p>
//       <ul>
//         <li translate="" class="ng-scope">Make sure that all words are spelled correctly.</li>
//         <li translate="" class="ng-scope">Try a different search scope.</li>
//         <li translate="" class="ng-scope">Try different search terms.</li>
//         <li translate="" class="ng-scope">Try more general search terms.</li>
//         <li translate="" class="ng-scope">Try fewer search terms.</li>
//       </ul>
//       <p>
//         <b>
//           <a href="https://stolaf.on.worldcat.org/search?queryString=kw:{{$ctrl.getSearchTerm()}}&databaseList=283">Search WorldCat</a>
//         </b>
//       </p>
//       <p>
//         <b>
//           <a href="https://www.stolaf.edu/library/research/students.cfm">Contact a Research Librarian for Assistance</a>
//         </b>
//       </p>
//     </md-card-content>
//   </md-card>
//   `
// }

},{}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSaveToFavoritesButtonAfterController = function () {
    function PrmSaveToFavoritesButtonAfterController($timeout, $element, loggingService) {
        _classCallCheck(this, PrmSaveToFavoritesButtonAfterController);

        this.$timeout = $timeout;
        this.$element = $element;
        this.loggingService = loggingService;
    }

    _createClass(PrmSaveToFavoritesButtonAfterController, [{
        key: '$postLink',
        value: function $postLink() {
            var _this = this;

            this.$timeout(function () {
                var parentElement = _this.$element.parent()[0];

                var pinBtn = parentElement.querySelector('button.pin-button'),
                    unpinBtn = parentElement.querySelector('button.unpin-button');

                // Limitation: This will only save the first click, since then the
                // button is replaced with another button element. We could add a
                // DOM watcher, but it's not worth it I think.
                if (pinBtn) {
                    pinBtn.addEventListener('click', function () {
                        _this.loggingService.trackPinRecord(_this.parentCtrl.item);
                    }, { passive: true, capture: true });
                } else if (unpinBtn) {
                    unpinBtn.addEventListener('click', function () {
                        _this.loggingService.trackUnpinRecord(_this.parentCtrl.item);
                    }, { passive: true, capture: true });
                }
            });
        }
    }]);

    return PrmSaveToFavoritesButtonAfterController;
}();

PrmSaveToFavoritesButtonAfterController.$inject = ['$timeout', '$element', 'loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSaveToFavoritesButtonAfterController,
    template: ''
};

},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchAfterController = function PrmSearchAfterController($scope, $compile, $timeout, $document, loggingService) {
    _classCallCheck(this, PrmSearchAfterController);

    $document.ready(function () {
        // Note: At this point, the frontpage HTML template might not yet be ready.
        // We see this problem especially in Firefox for some reason. Until we find a better
        // way to detect when the template is loaded, we use a timeout of 100 msecs.
        $timeout(function () {
            var footer = angular.element(document.querySelector('.uio-footer')),
                prmSearchAfterEl = angular.element(document.querySelector('prm-search-after'));

            if (footer.length) {
                // We are on the front page. Move footer to our scope and make it visible
                prmSearchAfterEl.append(footer.detach().addClass('visible'));
                var fnLink = $compile(footer); // returns a Link function used to bind template to the scope
                fnLink($scope); // Bind scope to the template

                loggingService.trackHome();
            }
        }, 100);
    });
};

PrmSearchAfterController.$inject = ['$scope', '$compile', '$timeout', '$document', 'loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchAfterController,
    template: ''
};

},{}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchBarAfterController = function PrmSearchBarAfterController($scope, $window, $element, $timeout, $document, $rootScope, loggingService) {
    var _this = this;

    _classCallCheck(this, PrmSearchBarAfterController);

    var primoVersion = (0, _get2.default)($window.appConfig, 'system-configuration.Primo_Version_Number', 'unknown');
    var searchStateService = this.parentCtrl.searchService.searchStateService;

    this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
    this.loggingService = loggingService;

    // Inject Primo's searchStateService into our loggingService
    this.loggingService.setSearchStateService(searchStateService);
    this.loggingService.setPrimoVersion(primoVersion);

    this.pasteEventHandler = function () {
        this.loggingService.searchBarElementPasteEvent();
    }.bind(this);

    this.inputHandler = function () {
        this.loggingService.incrKeypressCount();
    }.bind(this);

    this.loggingService.initSearchBar();
    $document.ready(function () {

        // Note: mainSearchField also maps to the first input field on advanced search
        // this.$scope.$watch('$ctrl.parentCtrl.mainSearchField', (newValue, oldValue) => {
        //     if (newValue != oldValue) {
        //         this.loggingService.incrKeypressCount();
        //     }
        // });

        _this.$scope.$watch('$ctrl.parentCtrl.advancedSearch', function (newValue, oldValue) {
            var parentElement = _this.$element.parent()[0];
            var searchBarElement = parentElement.querySelector('#searchBar');

            // Focus on the search bar, if it exists.
            // Note that, when the language is changed,
            // the search bar is not available yet here.
            // We can watch for the element and then focus on it,
            // but it does not seem to worth it.
            if (searchBarElement && !oldValue) {
                $timeout(function () {
                    return searchBarElement.focus();
                });
            }

            var $inputElems = angular.element(parentElement.querySelectorAll('input'));

            $inputElems.off('paste', _this.pasteEventHandler); // To make sure we don't end up with double handlers
            $inputElems.on('paste', _this.pasteEventHandler);

            $inputElems.off('input', _this.inputHandler); // To make sure we don't end up with double handlers
            $inputElems.on('input', _this.inputHandler);
        });
    });
}

// // Called after this controller's element and its children have been linked.
// $postLink() {
//     // Focus input field on load. Adapted from a version by @muratseyhan
//     // https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex/commit/86432e68e313a43db1f01a3a251652f84952d5a6
//     this.$timeout(() => {
//         let parentElement = this.$element.parent();
//         let searchBarElement = parentElement[0].querySelector('#searchBar');

//         // Focus on the search bar, if it exists.
//         // Note that, when the language is changed,
//         // the search bar is not available yet here.
//         // We can watch for the element and then focus on it,
//         // but it does not seem to worth it.
//         if (searchBarElement) {
//             searchBarElement.focus();

//             searchBarElement.addEventListener('paste', () => {
//                 this.loggingService.searchBarElementPasteEvent();
//             }, {passive: true, capture: true});
//         }
//     }, 0);
// }

// Change placeholder text (needs optimization I think)
// by Alex RS: http://search-test.library.brandeis.edu/primo-explore/search?vid=BRANDTEST
// var myVar = setInterval(function(parentCtrl) {
//     parentCtrl._placeHolderText = calculatePlaceHolderText(parentCtrl._selectedTab);
//     console.log("placeholder changed");
// }, 100, this.parentCtrl);

// setTimeout(function( myIntervalID ) {
//     clearInterval(myIntervalID);
//     console.log("placeholder interval cleared");
// }, 5000, myVar);

// $scope.$watch("$parent.$ctrl._selectedTab", function(newTab, oldTab) {
//     $scope.$parent.$ctrl._placeHolderText = calculatePlaceHolderText(newTab);
// });

// function calculatePlaceHolderText (myTab) {
//     switch (myTab) {
//         case "pci":
//             return "Find articles and other materials from scholarly journals, newspapers, and online collections";
//             break;
//         case "alma":
//             return "Find books, movies, music, serials, etc";
//             break;
//         case "everything":
//             return "Find ALL kinds of library resources (books, movies, journal articles, etc)";
//             break;
//         case "course":
//             return "Find books & media on reserve for your class.";
//             break;
//         default:
//             return "unknown-tab placeholder";
//     }
// }
;

PrmSearchBarAfterController.$inject = ['$scope', '$window', '$element', '$timeout', '$document', '$rootScope', 'loggingService'];

exports.default = {
    // The < symbol denotes one-way bindings which are available since 1.5.
    bindings: { parentCtrl: '<' },
    controller: PrmSearchBarAfterController,
    template: ''
};

},{"lodash/get":72}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrmSearchResultListAfterController = function PrmSearchResultListAfterController($window, $scope, loggingService) {
    _classCallCheck(this, PrmSearchResultListAfterController);

    $scope.$watch('$ctrl.parentCtrl.numOfLoadedPages', function (newValue) {
        if (newValue) {
            loggingService.searchPageLoaded(newValue);
        }
    });
};

PrmSearchResultListAfterController.$inject = ['$window', '$scope', 'loggingService'];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmSearchResultListAfterController,
    template: ''
};

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Define the view name here.
var viewName = 'UIO';
exports.default = viewName;

},{}]},{},[86])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTGlzdENhY2hlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TZXRDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FwcGx5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlJbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5SW5jbHVkZXNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVB1c2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQXNzaWduVmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRmluZEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUluZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYU4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUGljay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VQaWNrQnkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlU2V0VG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVW5pcS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY2FzdFBhdGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19mbGF0UmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRNYXBEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXlhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZVNldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21lbW9pemVDYXBwZWQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUFkZC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldENhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0VG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2hvcnRPdXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpY3RJbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9LZXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL190b1NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9mbGF0dGVuLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9nZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FyZ3VtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL21lbW9pemUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL25vb3AuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3BpY2suanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91bmlxLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL2xvZ2dpbmcuc2VydmljZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9tYWluLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL3BybUFjdGlvbkxpc3RBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtRnVsbFZpZXdBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtTm9TZWFyY2hSZXN1bHRBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXIuY29tcG9uZW50LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL3BybVNlYXJjaEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TZWFyY2hCYXJBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy92aWV3TmFtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0JBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxjOzs7OztBQUVGOzs7Ozs7Ozs7O0FBVUE7Ozs7OEJBSU07QUFDRjtBQUNIOzs7QUFFRCw0QkFBWSxVQUFaLEVBQXdCO0FBQUE7O0FBQUE7O0FBQ3BCLGFBQUssVUFBTCxHQUFrQixVQUFsQjs7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R0FBYixFQURDO0FBRVgsZ0JBQVksa0NBRkQ7QUFHWCxjQUFVO0FBSEMsQzs7Ozs7Ozs7QUNkZjtBQUNBLElBQU0sV0FBVyxLQUFqQjtrQkFDZSxRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBoYXNoQ2xlYXIgPSByZXF1aXJlKCcuL19oYXNoQ2xlYXInKSxcbiAgICBoYXNoRGVsZXRlID0gcmVxdWlyZSgnLi9faGFzaERlbGV0ZScpLFxuICAgIGhhc2hHZXQgPSByZXF1aXJlKCcuL19oYXNoR2V0JyksXG4gICAgaGFzaEhhcyA9IHJlcXVpcmUoJy4vX2hhc2hIYXMnKSxcbiAgICBoYXNoU2V0ID0gcmVxdWlyZSgnLi9faGFzaFNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gSGFzaDtcbiIsInZhciBsaXN0Q2FjaGVDbGVhciA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUNsZWFyJyksXG4gICAgbGlzdENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlRGVsZXRlJyksXG4gICAgbGlzdENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlR2V0JyksXG4gICAgbGlzdENhY2hlSGFzID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlSGFzJyksXG4gICAgbGlzdENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdENhY2hlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBtYXBDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVDbGVhcicpLFxuICAgIG1hcENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVEZWxldGUnKSxcbiAgICBtYXBDYWNoZUdldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlR2V0JyksXG4gICAgbWFwQ2FjaGVIYXMgPSByZXF1aXJlKCcuL19tYXBDYWNoZUhhcycpLFxuICAgIG1hcENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcENhY2hlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXRDYWNoZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7XG4iLCJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL19iYXNlSW5kZXhPZicpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5pbmNsdWRlc2AgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBzcGVjaWZ5aW5nIGFuIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tYXBgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheU1hcDtcbiIsIi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVB1c2g7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NJbmRleE9mO1xuIiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fZGVmaW5lUHJvcGVydHknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYXNzaWduVmFsdWVgIGFuZCBgYXNzaWduTWVyZ2VWYWx1ZWAgd2l0aG91dFxuICogdmFsdWUgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSA9PSAnX19wcm90b19fJyAmJiBkZWZpbmVQcm9wZXJ0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICdlbnVtZXJhYmxlJzogdHJ1ZSxcbiAgICAgICd2YWx1ZSc6IHZhbHVlLFxuICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQXNzaWduVmFsdWU7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmluZEluZGV4O1xuIiwidmFyIGFycmF5UHVzaCA9IHJlcXVpcmUoJy4vX2FycmF5UHVzaCcpLFxuICAgIGlzRmxhdHRlbmFibGUgPSByZXF1aXJlKCcuL19pc0ZsYXR0ZW5hYmxlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBzdXBwb3J0IGZvciByZXN0cmljdGluZyBmbGF0dGVuaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmVkaWNhdGU9aXNGbGF0dGVuYWJsZV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU3RyaWN0XSBSZXN0cmljdCB0byB2YWx1ZXMgdGhhdCBwYXNzIGBwcmVkaWNhdGVgIGNoZWNrcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGRlcHRoLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBpc0ZsYXR0ZW5hYmxlKTtcbiAgcmVzdWx0IHx8IChyZXN1bHQgPSBbXSk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKGRlcHRoID4gMCAmJiBwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICBpZiAoZGVwdGggPiAxKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIGJhc2VGbGF0dGVuKHZhbHVlLCBkZXB0aCAtIDEsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNTdHJpY3QpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGbGF0dGVuO1xuIiwidmFyIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4vX2lzS2V5JyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aF0gOiBjYXN0UGF0aChwYXRoKTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3RvS2V5KHBhdGhbaW5kZXgrK10pXTtcbiAgfVxuICByZXR1cm4gKGluZGV4ICYmIGluZGV4ID09IGxlbmd0aCkgPyBvYmplY3QgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldDtcbiIsInZhciBiYXNlRmluZEluZGV4ID0gcmVxdWlyZSgnLi9fYmFzZUZpbmRJbmRleCcpLFxuICAgIGJhc2VJc05hTiA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hTicpLFxuICAgIHN0cmljdEluZGV4T2YgPSByZXF1aXJlKCcuL19zdHJpY3RJbmRleE9mJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWVcbiAgICA/IHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpXG4gICAgOiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGZyb21JbmRleCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUluZGV4T2Y7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hTmAgd2l0aG91dCBzdXBwb3J0IGZvciBudW1iZXIgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYU47XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTWFza2VkID0gcmVxdWlyZSgnLi9faXNNYXNrZWQnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmF0aXZlO1xuIiwidmFyIGJhc2VQaWNrQnkgPSByZXF1aXJlKCcuL19iYXNlUGlja0J5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucGlja2Agd2l0aG91dCBzdXBwb3J0IGZvciBpbmRpdmlkdWFsXG4gKiBwcm9wZXJ0eSBpZGVudGlmaWVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2sob2JqZWN0LCBwcm9wcykge1xuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJldHVybiBrZXkgaW4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUGljaztcbiIsInZhciBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiAgYF8ucGlja0J5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gcGljayBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKHJlc3VsdCwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVBpY2tCeTtcbiIsInZhciBjb25zdGFudCA9IHJlcXVpcmUoJy4vY29uc3RhbnQnKSxcbiAgICBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHNldFRvU3RyaW5nYCB3aXRob3V0IHN1cHBvcnQgZm9yIGhvdCBsb29wIHNob3J0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIGJhc2VTZXRUb1N0cmluZyA9ICFkZWZpbmVQcm9wZXJ0eSA/IGlkZW50aXR5IDogZnVuY3Rpb24oZnVuYywgc3RyaW5nKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jLCAndG9TdHJpbmcnLCB7XG4gICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgJ2VudW1lcmFibGUnOiBmYWxzZSxcbiAgICAndmFsdWUnOiBjb25zdGFudChzdHJpbmcpLFxuICAgICd3cml0YWJsZSc6IHRydWVcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTZXRUb1N0cmluZztcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbnZlcnQgdmFsdWVzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgcmV0dXJuIGFycmF5TWFwKHZhbHVlLCBiYXNlVG9TdHJpbmcpICsgJyc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcbiIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXMnKSxcbiAgICBhcnJheUluY2x1ZGVzV2l0aCA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXNXaXRoJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpLFxuICAgIGNyZWF0ZVNldCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVNldCcpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUhhcztcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgc3RyaW5nVG9QYXRoID0gcmVxdWlyZSgnLi9fc3RyaW5nVG9QYXRoJyk7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogc3RyaW5nVG9QYXRoKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYXN0UGF0aDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgbm9vcCA9IHJlcXVpcmUoJy4vbm9vcCcpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2V0O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcbiIsInZhciBmbGF0dGVuID0gcmVxdWlyZSgnLi9mbGF0dGVuJyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCBmbGF0dGVucyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBmbGF0UmVzdChmdW5jKSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCB1bmRlZmluZWQsIGZsYXR0ZW4pLCBmdW5jICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXRSZXN0O1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGlzS2V5YWJsZSA9IHJlcXVpcmUoJy4vX2lzS2V5YWJsZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TWFwRGF0YTtcbiIsInZhciBiYXNlSXNOYXRpdmUgPSByZXF1aXJlKCcuL19iYXNlSXNOYXRpdmUnKSxcbiAgICBnZXRWYWx1ZSA9IHJlcXVpcmUoJy4vX2dldFZhbHVlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaERlbGV0ZTtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwcmVhZGFibGVTeW1ib2wgPSBTeW1ib2wgPyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmxhdHRlbmFibGUgYGFyZ3VtZW50c2Agb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzRmxhdHRlbmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSB8fFxuICAgICEhKHNwcmVhZGFibGVTeW1ib2wgJiYgdmFsdWUgJiYgdmFsdWVbc3ByZWFkYWJsZVN5bWJvbF0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRmxhdHRlbmFibGU7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXk7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuIiwidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlQ2xlYXI7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlR2V0O1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVIYXM7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlU2V0O1xuIiwidmFyIG1lbW9pemUgPSByZXF1aXJlKCcuL21lbW9pemUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIG1heGltdW0gbWVtb2l6ZSBjYWNoZSBzaXplLiAqL1xudmFyIE1BWF9NRU1PSVpFX1NJWkUgPSA1MDA7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1lbW9pemVgIHdoaWNoIGNsZWFycyB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24nc1xuICogY2FjaGUgd2hlbiBpdCBleGNlZWRzIGBNQVhfTUVNT0laRV9TSVpFYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1lbW9pemVDYXBwZWQoZnVuYykge1xuICB2YXIgcmVzdWx0ID0gbWVtb2l6ZShmdW5jLCBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoY2FjaGUuc2l6ZSA9PT0gTUFYX01FTU9JWkVfU0laRSkge1xuICAgICAgY2FjaGUuY2xlYXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfSk7XG5cbiAgdmFyIGNhY2hlID0gcmVzdWx0LmNhY2hlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemVDYXBwZWQ7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuIiwidmFyIGFwcGx5ID0gcmVxdWlyZSgnLi9fYXBwbHknKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIHRyYW5zZm9ybXMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIHJlc3QgYXJyYXkgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCB0cmFuc2Zvcm0pIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gdHJhbnNmb3JtKGFycmF5KTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyUmVzdDtcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlQWRkO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlSGFzO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb0FycmF5O1xuIiwidmFyIGJhc2VTZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VTZXRUb1N0cmluZycpLFxuICAgIHNob3J0T3V0ID0gcmVxdWlyZSgnLi9fc2hvcnRPdXQnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb1N0cmluZztcbiIsIi8qKiBVc2VkIHRvIGRldGVjdCBob3QgZnVuY3Rpb25zIGJ5IG51bWJlciBvZiBjYWxscyB3aXRoaW4gYSBzcGFuIG9mIG1pbGxpc2Vjb25kcy4gKi9cbnZhciBIT1RfQ09VTlQgPSA1MDAsXG4gICAgSE9UX1NQQU4gPSAxNjtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0J2xsIHNob3J0IG91dCBhbmQgaW52b2tlIGBpZGVudGl0eWAgaW5zdGVhZFxuICogb2YgYGZ1bmNgIHdoZW4gaXQncyBjYWxsZWQgYEhPVF9DT1VOVGAgb3IgbW9yZSB0aW1lcyBpbiBgSE9UX1NQQU5gXG4gKiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc2hvcnRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzaG9ydE91dChmdW5jKSB7XG4gIHZhciBjb3VudCA9IDAsXG4gICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YW1wID0gbmF0aXZlTm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IEhPVF9TUEFOIC0gKHN0YW1wIC0gbGFzdENhbGxlZCk7XG5cbiAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmICgrK2NvdW50ID49IEhPVF9DT1VOVCkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG9ydE91dDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluZGV4T2ZgIHdoaWNoIHBlcmZvcm1zIHN0cmljdCBlcXVhbGl0eVxuICogY29tcGFyaXNvbnMgb2YgdmFsdWVzLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHJpY3RJbmRleE9mO1xuIiwidmFyIG1lbW9pemVDYXBwZWQgPSByZXF1aXJlKCcuL19tZW1vaXplQ2FwcGVkJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUxlYWRpbmdEb3QgPSAvXlxcLi8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvUGF0aDtcbiIsInZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9LZXk7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0cyk7XG4gKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzWzBdID09PSBvYmplY3RzWzFdKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zdGFudDtcbiIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuIiwidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKTtcblxuLyoqXG4gKiBGbGF0dGVucyBgYXJyYXlgIGEgc2luZ2xlIGxldmVsIGRlZXAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5mbGF0dGVuKFsxLCBbMiwgWzMsIFs0XV0sIDVdXSk7XG4gKiAvLyA9PiBbMSwgMiwgWzMsIFs0XV0sIDVdXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGJhc2VGbGF0dGVuKGFycmF5LCAxKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47XG4iLCJ2YXIgYmFzZUdldCA9IHJlcXVpcmUoJy4vX2Jhc2VHZXQnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuIElmIHRoZSByZXNvbHZlZCB2YWx1ZSBpc1xuICogYHVuZGVmaW5lZGAsIHRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjcuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gW2RlZmF1bHRWYWx1ZV0gVGhlIHZhbHVlIHJldHVybmVkIGZvciBgdW5kZWZpbmVkYCByZXNvbHZlZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCJ2YXIgYmFzZUlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9fYmFzZUlzQXJndW1lbnRzJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8ubm9vcCk7XG4gKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9vcDtcbiIsInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZVBpY2sgPSByZXF1aXJlKCcuL19iYXNlUGljaycpLFxuICAgIGZsYXRSZXN0ID0gcmVxdWlyZSgnLi9fZmxhdFJlc3QnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIHBpY2tlZCBgb2JqZWN0YCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0gey4uLihzdHJpbmd8c3RyaW5nW10pfSBbcHJvcHNdIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6ICcyJywgJ2MnOiAzIH07XG4gKlxuICogXy5waWNrKG9iamVjdCwgWydhJywgJ2MnXSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2MnOiAzIH1cbiAqL1xudmFyIHBpY2sgPSBmbGF0UmVzdChmdW5jdGlvbihvYmplY3QsIHByb3BzKSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHt9IDogYmFzZVBpY2sob2JqZWN0LCBhcnJheU1hcChwcm9wcywgdG9LZXkpKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY2s7XG4iLCJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVRvU3RyaW5nJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZztcbiIsInZhciBiYXNlVW5pcSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmlxJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgYW4gYXJyYXksIHVzaW5nXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpbiB3aGljaCBvbmx5IHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVhY2ggZWxlbWVudFxuICogaXMga2VwdC4gVGhlIG9yZGVyIG9mIHJlc3VsdCB2YWx1ZXMgaXMgZGV0ZXJtaW5lZCBieSB0aGUgb3JkZXIgdGhleSBvY2N1clxuICogaW4gdGhlIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51bmlxKFsyLCAxLCAyXSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqL1xuZnVuY3Rpb24gdW5pcShhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VVbmlxKGFycmF5KVxuICAgIDogW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcTtcbiIsImltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gvdW5pcSc7XG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gvcGljayc7XG5cbmNsYXNzIExvZ2dpbmdTZXJ2aWNlIHtcblxuICAgIC8qXG4gICAgJHJvb3RTY29wZTogSVJvb3RTY29wZVNlcnZpY2U7XG4gICAgcHJpbW9WZXJzaW9uOiBzdHJpbmc7XG4gICAgc2VhcmNoU3RhdGVTZXJ2aWNlOiBTZWFyY2hTdGF0ZVNlcnZpY2U7XG4gICAgdHJhaWw6IGxpc3Q7XG4gICAga2V5cHJlc3NlczogbnVtYmVyXG4gICAgcGFzdGVkOiBib29sZWFuXG4gICAgdDE6IERhdGVcbiAgICAqL1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgbG9nKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCRyb290U2NvcGUpIHtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcblxuICAgICAgICAvLyBQcmltbyB2ZXJzaW9uXG4gICAgICAgIHRoaXMucHJpbW9WZXJzaW9uID0gbnVsbDtcblxuICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5IFByaW1vJ3MgU2VhcmNoU3RhdGVTZXJ2aWNlIGlzIG5vdCBpbmplY3RhYmxlLCBzbyB3ZSBuZWVkXG4gICAgICAgIC8vIHRvIGdldCBpdCBmcm9tIG9uZSBvZiB0aGUgY29tcG9uZW50cy5cbiAgICAgICAgdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMubGFzdEFjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgLy8gTmF2aWdhdGlvbiB0cmFpbFxuICAgICAgICB0aGlzLnRyYWlsID0gW107XG5cbiAgICAgICAgLy8gVXNlciBsYW5ndWFnZVxuICAgICAgICB0aGlzLmxhbmcgPSBudWxsO1xuXG4gICAgICAgIC8vIE51bWJlciBvZiBrZXlwcmVzc2VzIGluIG1haW4gc2VhcmNoIGZpZWxkLiBUcmFja2VkIGJ5IHBybVNlYXJjaEJhckFmdGVyXG4gICAgICAgIHRoaXMua2V5cHJlc3NlcyA9IDA7XG5cbiAgICAgICAgLy8gUmVjZWl2ZWQgYSBwYXN0ZSBldmVudD8gVHJhY2tlZCBieSBwcm1TZWFyY2hCYXJBZnRlclxuICAgICAgICB0aGlzLnBhc3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFNlcnZlciB1cmxcbiAgICAgICAgdGhpcy51cmwgPSAnaHR0cHM6Ly91Yi13d3cwMS51aW8ubm8vc2x1cnAvJztcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHNjID0ge1xuICAgICAgICAgICAgICAgIGZyb206IGZyb21TdGF0ZS5uYW1lLFxuICAgICAgICAgICAgICAgIGZyb21UaW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHRvOiB0b1N0YXRlLm5hbWUsXG4gICAgICAgICAgICAgICAgdG9UaW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIHBhcmFtczogdG9QYXJhbXMsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodG9QYXJhbXMubGFuZykge1xuICAgICAgICAgICAgICAgIHRoaXMubGFuZyA9IHRvUGFyYW1zLmxhbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkdCA9ICcnO1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhaWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNjLmZyb21UaW1lID0gdGhpcy50cmFpbFt0aGlzLnRyYWlsLmxlbmd0aCAtIDFdLnRvVGltZTtcbiAgICAgICAgICAgICAgICBkdCA9IGBhZnRlciAkeyhzYy50b1RpbWUgLSBzYy5mcm9tVGltZSkvMTAwMH0gc2Vjc2A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRyYWlsLnB1c2goc2MpO1xuICAgICAgICAgICAgdGhpcy50MSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmxvZyhgJWMgW2xvZ2dpbmdTZXJ2aWNlXSBTdGF0ZSBjaGFuZ2VkIGZyb20gJHtzYy5mcm9tfSB0byAke3NjLnRvfSAke2R0fWAsICdiYWNrZ3JvdW5kOiBncmVlbjsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBibG9jazsnKTtcblxuICAgICAgICAgICAgLy8gaWYgKHRvU3RhdGUucGFyYW1zLnNsdXJwKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1NMVVJQIScpO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvLyBpZiAodG9TdGF0ZS5uYW1lID09ICdleHBsb3JlTWFpbi5zZWFyY2gnKSB7XG4gICAgICAgICAgICAvLyAgIHJlcS5wYXJhbXMgPSB7XG4gICAgICAgICAgICAvLyAgICAgbW9kZTogdG9QYXJhbXMubW9kZSwgIC8vICdhZHZhbmNlZCcgb3IgJz8nXG4gICAgICAgICAgICAvLyAgICAgbGFuZzogdG9QYXJhbXMubGFuZyxcbiAgICAgICAgICAgIC8vICAgICBxdWVyeTogdG9QYXJhbXMucXVlcnksXG4gICAgICAgICAgICAvLyAgICAgc2VhcmNoX3Njb3BlOiB0b1BhcmFtcy5zZWFyY2hfc2NvcGUsICAvLyAnZGVmYXVsdCcsICdldmVyeXRoaW5nJywgJ2xvY2FsX3Njb3BlJyAoQsO4a2VyIHZlZCBVaU8pLCAnYmlic3lzX2lscycsIC4uXG4gICAgICAgICAgICAvLyAgICAgdGFiOiB0b1BhcmFtcy50YWIsICAvLyAnZGVmYXVsdF90YWInLCAnZXZlcnl0aGluZycsICdsb2NhbF91aW8nLCAnYmlic3lzX2NvbnNvcnRpYScgLi4uXG4gICAgICAgICAgICAvLyAgICAgc29ydGJ5OiB0b1BhcmFtcy5zb3J0YnksICAvLyBcInJhbmtcIlxuXG4gICAgICAgICAgICAvLyAgICAgLy8gcGZpbHRlcjogTWF0ZXJpYWx0eXBlL3NwcsOlay91dGdpdmVsc2VzZGF0b1xuICAgICAgICAgICAgLy8gICAgIC8vIENhbiBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkhXG4gICAgICAgICAgICAvLyAgICAgLy8gRXhhbXBsZXM6XG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gXCJwZmlsdGVyLGV4YWN0LGJvb2tzLEFORFwiXG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gW1wibGFuZyxleGFjdCxub3IsQU5EXCIsIFwicGZpbHRlcixleGFjdCxib29rcyxBTkRcIiwgXCJjcmVhdGlvbmRhdGUsZXhhY3QsMS1ZRUFSLEFORFwiXVxuICAgICAgICAgICAgLy8gICAgIHBmaWx0ZXI6IHRvUGFyYW1zLnBmaWx0ZXIsXG5cbiAgICAgICAgICAgIC8vICAgICAvLyBGYWNldHNcbiAgICAgICAgICAgIC8vICAgICAvLyBDYW4gYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IVxuICAgICAgICAgICAgLy8gICAgIC8vIEV4YW1wbGVzOlxuICAgICAgICAgICAgLy8gICAgIC8vICAtIFwibG9jYWw0LGluY2x1ZGUsTkJcIlxuICAgICAgICAgICAgLy8gICAgIC8vICAtIFtcImxvY2FsNCxpbmNsdWRlLE5CXCIsIFwibG9jYWwxMCxpbmNsdWRlLDY0MS41XCIsIFwibG9jYWwxNCxpbmNsdWRlLE1hdG9wcHNrcmlmdGVyXCJdXG4gICAgICAgICAgICAvLyAgICAgZmFjZXQ6IHRvUGFyYW1zLmZhY2V0LFxuICAgICAgICAgICAgLy8gICB9O1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVybmFsIG1ldGhvZHNcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHNpbXBsaWZ5UmVjb3JkKHJlY29yZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6ICAgICAgICAgIGdldChyZWNvcmQsICdwbnguY29udHJvbC5yZWNvcmRpZC4wJyksXG4gICAgICAgICAgICBpc19sb2NhbDogICAgZ2V0KHJlY29yZCwgJ2NvbnRleHQnKSA9PSAnTCcsXG4gICAgICAgICAgICBhZGRzX2lkOiAgICAgZ2V0KHJlY29yZCwgJ3BueC5jb250cm9sLmFkZHNyY3JlY29yZGlkLjAnKSxcbiAgICAgICAgICAgIHNvdXJjZTogICAgICBnZXQocmVjb3JkLCAncG54LmNvbnRyb2wuc291cmNlc3lzdGVtLjAnKSxcbiAgICAgICAgICAgIGRkYzogICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzEwJywgW10pKSxcbiAgICAgICAgICAgIGh1bWU6ICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzE0JywgW10pKSxcbiAgICAgICAgICAgIHJlYWw6ICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzIwJywgW10pKSxcbiAgICAgICAgICAgIHJzcmN0eXBlOiAgICBnZXQocmVjb3JkLCAncG54LmZhY2V0cy5yc3JjdHlwZScsIFtdKSxcbiAgICAgICAgICAgIGRpc3B0eXBlOiAgICBnZXQocmVjb3JkLCAncG54LmRpc3BsYXkudHlwZScsIFtdKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0cmFja0V2ZW50KGFjdGlvbiwgZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpLmxlbmd0aDtcbiAgICAgICAgdGhpcy5sb2coYCVjIFtsb2dnaW5nU2VydmljZV0gVHJhY2sgXCIke2FjdGlvbn1cIiBhY3Rpb24gKCR7c2l6ZX0gYnl0ZXMpYCwgJ2JhY2tncm91bmQ6IGdyZWVuOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuICAgICAgICB0aGlzLmxvZygnW2xvZ2dpbmdTZXJ2aWNlXScsIGRhdGEpO1xuXG4gICAgICAgIGRhdGEubGFuZyA9IHRoaXMubGFuZztcblxuICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGxhc3RfYWN0aW9uOiB0aGlzLmxhc3RBY3Rpb24sXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzZXNzaW9uX2lkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzbHVycFNlc3Npb25JZCcpLFxuICAgICAgICAgICAgYWN0aW9uX25vOiBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzbHVycEFjdGlvbk5vJykpIHx8IDEsXG4gICAgICAgICAgICBoaXN0OiB3aW5kb3cuaGlzdG9yeS5sZW5ndGgsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sYXN0QWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgIC8vIERvbid0IHVzZSAkaHR0cCBzaW5jZSB3ZSBkb24ndCB3YW50IHRoZSBQcmltbyBkZWZhdWx0IGhlYWRlcnMgZXRjLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3NsdXJwU2Vzc2lvbklkJywgcmVzLnNlc3Npb25faWQpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdzbHVycEFjdGlvbk5vJywgcmVzLmFjdGlvbl9ubyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcS5vcGVuKCdQT1NUJywgdGhpcy51cmwpO1xuICAgICAgICAgICAgcmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmFja0Vycm9yKG1zZykge1xuICAgICAgICB0aGlzLmxvZyhgJWMgW2xvZ2dpbmdTZXJ2aWNlXSBUcmFjayBlcnJvciBcIiR7bXNnfVwiYCwgJ2JhY2tncm91bmQ6IHJlZDsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBibG9jazsnKTtcbiAgICAgICAgLy8gVE9ETzogQWN0dWFsbHkgc2VuZCBzb21ldGhpbmcgdG8gc2VydmVyXG4gICAgfVxuXG4gICAgdHJhY2tTZWFyY2goc2VhcmNoLCByZXN1bHQsIHBhZ2VObykge1xuICAgICAgICBpZiAoIXRoaXMudHJhaWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBzb21ldGhpbmcgaXMgd3JvbmdcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHJhaWxTdGVwID0gdGhpcy50cmFpbFt0aGlzLnRyYWlsLmxlbmd0aCAtIDFdO1xuICAgICAgICBsZXQgZHQgPSBuZXcgRGF0ZSgpIC0gdHJhaWxTdGVwLnRvVGltZTtcbiAgICAgICAgdGhpcy5sb2coYCVjIFtsb2dnaW5nU2VydmljZV0gR290IHNlYXJjaCByZXN1bHRzIGFmdGVyIHdhaXRpbmcgJHtkdC8xMDAwLn0gc2Vjc2AsICdiYWNrZ3JvdW5kOiBncmVlbjsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBibG9jazsnKTtcbiAgICAgICAgdGhpcy5sb2coJ1tsb2dnaW5nU2VydmljZV0nLCBzZWFyY2gsIHJlc3VsdCk7XG5cbiAgICAgICAgbGV0IHJlY3MgPSByZXN1bHQuZGF0YS5tYXAodGhpcy5zaW1wbGlmeVJlY29yZCk7XG5cbiAgICAgICAgbGV0IGZhY2V0cyA9IHNlYXJjaC5mYWNldHMubWFwKGZhY2V0ID0+IHBpY2soZmFjZXQsIFtcbiAgICAgICAgICAgICduYW1lJywgICAgICAgICAgICAgICAvLyBleDogJ2xvY2FsMjAnXG4gICAgICAgICAgICAndmFsdWUnLCAgICAgICAgICAgICAgLy8gZXg6ICdGaXNrZXInXG4gICAgICAgICAgICAndHlwZScsICAgICAgICAgICAgICAgLy8gZXg6ICdpbmNsdWRlJ1xuICAgICAgICAgICAgJ211bHRpRmFjZXRHcm91cElkJywgIC8vIGludFxuICAgICAgICBdKSk7XG5cbiAgICAgICAgLy8gLSBNdWx0aXBsZSBxdWVyeSBwYXJ0cyBhcmUgc3BsaXQgYnkgc2VtaWNvbG9uXG4gICAgICAgIC8vIC0gRWFjaCBwYXJ0IGNvbnNpc3RzIG9mIHtmaWVsZH0se3ByZWNpc2lvbn0se3Rlcm19LHtvcGVyYXRvcn1cbiAgICAgICAgLy8gLSBTZW1pY29sb25zIGFyZSBzdHJpcHBlZCBmcm9tIHF1ZXJpZXMuXG4gICAgICAgIC8vIC0gQ29sb25zIGFyZSBpbmNsdWRlZCBhbmQgTk9UIGVzY2FwZWQuIEV4YW1wbGU6XG4gICAgICAgIC8vICAgICAgdGl0bGUsY29udGFpbnMsZmlza2VyLGtyYWJiZXIsT1I7Y3JlYXRvcixjb250YWlucyx0b3IsTk9UO2FueSxleGFjdCxsYWtzLEFORFxuICAgICAgICAvLyAtIEluIGFkdmFuY2VkIHNlYXJjaCwgdGhlcmUgaXMgYWx3YXlzIGEgdHJhaWxpbmcgb3BlcmF0b3IsIGluIHNpbXBsZSBzZWFyY2ggbm90LlxuICAgICAgICAvLyAtIE1hdGVyaWFsIHR5cGUsIGxhbmd1YWdlIGFuZCBkYXRlIHNlbGVjdGVkIGluIGFkdmFuY2VkIHNlYXJjaCBhcmUgaW5jbHVkZWQgYXNcbiAgICAgICAgLy8gICBwYXJ0IG9mIHRoZSBxdWVyeSwgYnV0IHByZWZpeGVkIHdpdGggXCJmYWNldF9cIlxuXG4gICAgICAgIGxldCBxdWVyeSA9IFtdLCBxdWVyeV9mYWNldHMgPSBbXTtcblxuICAgICAgICBzZWFyY2gucXVlcnkuc3BsaXQoLzsvKS5mb3JFYWNoKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIGxldCBjb21wID0geC5zcGxpdCgvLC8pO1xuICAgICAgICAgICAgbGV0IHJlcztcblxuICAgICAgICAgICAgaWYgKGNvbXBbY29tcC5sZW5ndGgtMV0ubWF0Y2goL14oPzpBTkR8T1J8Tk9UKSQvKSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3A6IGNvbXBbY29tcC5sZW5ndGgtMV0sXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjb21wWzBdLFxuICAgICAgICAgICAgICAgICAgICBwcmVjOiBjb21wWzFdLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiBjb21wLnNsaWNlKDIsIGNvbXAubGVuZ3RoLTEpLmpvaW4oJywnKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9wOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogY29tcFswXSxcbiAgICAgICAgICAgICAgICAgICAgcHJlYzogY29tcFsxXSxcbiAgICAgICAgICAgICAgICAgICAgdGVybTogY29tcC5zbGljZSgyLCBjb21wLmxlbmd0aCkuam9pbignLCcpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLmZpZWxkLm1hdGNoKC9eZmFjZXRfLykpIHtcbiAgICAgICAgICAgICAgICBxdWVyeV9mYWNldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiByZXMuZmllbGQsXG4gICAgICAgICAgICAgICAgICAgIHByZWM6IHJlcy5wcmVjLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiByZXMudGVybSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVlcnkucHVzaChyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gcXVlcnkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgcXVlcnlbaV0ub3AgPSBxdWVyeVtpIC0gMV0ub3A7XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnlbMF0ub3AgPSBudWxsO1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgdHJhaWxTdGVwOiB0aGlzLnRyYWlsLmxlbmd0aCxcblxuICAgICAgICAgICAga2V5cHJlc3NlczogdGhpcy5rZXlwcmVzc2VzLFxuICAgICAgICAgICAgcGFzdGVkOiB0aGlzLnBhc3RlZCxcbiAgICAgICAgICAgIHByZXBUaW1lOiB0cmFpbFN0ZXAudG9UaW1lIC0gdHJhaWxTdGVwLmZyb21UaW1lLFxuICAgICAgICAgICAgbG9hZFRpbWU6IChuZXcgRGF0ZSgpIC0gdHJhaWxTdGVwLnRvVGltZSksXG4gICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnByaW1vVmVyc2lvbixcblxuICAgICAgICAgICAgLy8gU2VhcmNoXG4gICAgICAgICAgICBhZHZhbmNlZDogc2VhcmNoLm1vZGUgPT0gJ2FkdmFuY2VkJyxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHF1ZXJ5X2ZhY2V0czogcXVlcnlfZmFjZXRzLFxuICAgICAgICAgICAgc2NvcGU6IHNlYXJjaC5zY29wZSwgICAgLy8gVHJlbmdlciB2aSBiw6VkZSBzY29wZSBvZyB0YWI/XG4gICAgICAgICAgICBzb3J0OiBzZWFyY2guc29ydGJ5LFxuICAgICAgICAgICAgZmFjZXRzOiBmYWNldHMsXG5cbiAgICAgICAgICAgIC8vIFJlc3VsdHNcbiAgICAgICAgICAgIGZpcnN0OiBwYXJzZUludChyZXN1bHQuaW5mby5maXJzdCksXG4gICAgICAgICAgICBsYXN0OiBwYXJzZUludChyZXN1bHQuaW5mby5sYXN0KSxcbiAgICAgICAgICAgIHRvdGFsOiBwYXJzZUludChyZXN1bHQuaW5mby50b3RhbCksXG4gICAgICAgICAgICByZXN1bHRzOiByZWNzLm1hcCgoeCkgPT4geC5pZCksXG5cbiAgICAgICAgICAgIGFnZ3M6IHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiByZWNzLmxlbmd0aCwgIC8vIGdyZWl0IMOlIGhhIGxldHQgdGlsZ2plbmdlbGlnIGZvciDDpSBrdW5uZSByZWduZSBwcm9zZW50ZXJcbiAgICAgICAgICAgICAgICBpc19sb2NhbDogcmVjcy5maWx0ZXIoKHgpID0+IHguaXNfbG9jYWwpLmxlbmd0aCwgIC8vIGZvciDDpSBzaSBub2Ugb20gaHZvciBtYW5nZSBhdiB0cmVmZmVuZSBzb20gZXIgcmVsZXZhbnRlIGZvciBlbW5lc8O4az9cbiAgICAgICAgICAgICAgICBoYXNfZGV3ZXk6IHJlY3MuZmlsdGVyKCh4KSA9PiB4LmRkYy5sZW5ndGgpLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBoYXNfaHVtb3JkOiByZWNzLmZpbHRlcigoeCkgPT4geC5odW1lLmxlbmd0aCkubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGhhc19ydDogcmVjcy5maWx0ZXIoKHgpID0+IHgucmVhbC5sZW5ndGgpLmxlbmd0aCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdmFyIHN1bW1hcnkgPSBgJHtkYXRhLnNjb3BlfToke2RhdGEucXVlcnl9OiBMb2FkZWQgJHtkYXRhLnJlc3VsdHMubGVuZ3RofSBvZiAke2RhdGEudG90YWx9IHJlc3VsdHMsIG9mIHdoaWNoXG4gICAgICAgIC8vICAgICAke2RhdGEuYWdncy5pc19sb2NhbH0gbG9jYWwgKG5vbi1QQ0kpLCAke2RhdGEuYWdncy5oYXNfZGV3ZXl9IGdvdCBEREMsXG4gICAgICAgIC8vICAgICAke2RhdGEuYWdncy5oYXNfaHVtb3JkfSBnb3QgSHVtb3JkLCAke2RhdGEuYWdncy5oYXNfcnR9IGdvdCBSZWFsZmFnc3Rlcm1lci5gO1xuICAgICAgICAvLyBUT0RPOiBOb3RpZnkgYXMgZXZlbnQ/XG5cbiAgICAgICAgbGV0IGFjdGlvbiA9ICdzZWFyY2gnO1xuICAgICAgICBpZiAoZ2V0KHNlYXJjaCwgJ2ZhY2V0cy4wLm5hbWUnKSA9PSAnZnJicmdyb3VwaWQnKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAnZXhwYW5kX2ZyYnJfZ3JvdXAnO1xuICAgICAgICB9IGVsc2UgaWYgKHBhZ2VObyA+IDEpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdjaGFuZ2VfcGFnZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoZmFjZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ3JlZmluZW1lbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja0V2ZW50KGFjdGlvbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNlYXJjaEJhckFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvLyBwdWJsaWNcbiAgICBpbml0U2VhcmNoQmFyKCkge1xuICAgICAgICB0aGlzLnBhc3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmtleXByZXNzZXMgPSAwO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIGluY3JLZXlwcmVzc0NvdW50KCkge1xuICAgICAgICB0aGlzLmtleXByZXNzZXMrKztcbiAgICB9XG5cbiAgICAvLyBwdWJsaWNcbiAgICBzZXRTZWFyY2hTdGF0ZVNlcnZpY2Uoc2VhcmNoU3RhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlID0gc2VhcmNoU3RhdGVTZXJ2aWNlO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNldFByaW1vVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMucHJpbW9WZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWNcbiAgICBzZWFyY2hCYXJFbGVtZW50UGFzdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5wYXN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgZnJvbSBwcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXIgd2hlbiBhbnkgbnVtYmVyIG9mIHBhZ2VzXG4gICAgICogYXJlIGxvYWRlZC4gVGhpcyBhbHNvIGluZGljYXRlcyB0aGF0IHNlYXJjaCByZXN1bHRzIGFyZSByZWFkeS5cbiAgICAgKi9cbiAgICBzZWFyY2hQYWdlTG9hZGVkKHBhZ2VzKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFN0YXRlU2VydmljZSkge1xuICAgICAgICAgICAgLy8gU29tZXRoaW5nIGlzIHJlYWxseSB3cm9uZ1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugbm90IGluamVjdGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuaXNTZWFyY2hJblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tFcnJvcignc2VhcmNoU3RhdGVTZXJ2aWNlIHNlYXJjaCBzdGlsbCBpbiBwcm9ncmVzcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlLmdldFNlYXJjaE9iamVjdCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0UmVzdWx0T2JqZWN0KCk7XG5cbiAgICAgICAgaWYgKCFzZWFyY2ggfHwgIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hPYmplY3Qgb3IgcmVzdWx0T2JqZWN0IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhY2tTZWFyY2goc2VhcmNoLCByZXN1bHQsIHBhZ2VzKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtTm9TZWFyY2hSZXN1bHRBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgbm9SZXN1bHRzUGFnZUxvYWRlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFN0YXRlU2VydmljZSkge1xuICAgICAgICAgICAgLy8gU29tZXRoaW5nIGlzIHJlYWxseSB3cm9uZ1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugbm90IGluamVjdGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuaXNTZWFyY2hJblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tFcnJvcignc2VhcmNoU3RhdGVTZXJ2aWNlIHNlYXJjaCBzdGlsbCBpbiBwcm9ncmVzcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaCA9IHRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlLmdldFNlYXJjaE9iamVjdCgpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0UmVzdWx0T2JqZWN0KCk7XG5cbiAgICAgICAgaWYgKCFzZWFyY2ggfHwgIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hPYmplY3Qgb3IgcmVzdWx0T2JqZWN0IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhY2tTZWFyY2goc2VhcmNoLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1GdWxsVmlld0FmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICB0cmFja1ZpZXdSZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zaW1wbGlmeVJlY29yZChyZWNvcmQpO1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ3ZpZXdfcmVjb3JkJywgZGF0YSk7XG4gICAgfVxuXG4gICAgdHJhY2tTZW5kVG8oc2VydmljZU5hbWUsIHJlY29yZCkge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHNlcnZpY2U6IHNlcnZpY2VOYW1lLFxuICAgICAgICAgICAgcmVjOiB0aGlzLnNpbXBsaWZ5UmVjb3JkKHJlY29yZCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgnc2VuZF90bycsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdHJhY2tQaW5SZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zaW1wbGlmeVJlY29yZChyZWNvcmQpO1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ3Bpbl9yZWNvcmQnLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0cmFja1VucGluUmVjb3JkKHJlY29yZCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc2ltcGxpZnlSZWNvcmQocmVjb3JkKTtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCd1bnBpbl9yZWNvcmQnLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtU2VhcmNoQWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHRyYWNrSG9tZSgpIHtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCdnb3RvX2hvbWUnLCB7fSk7XG4gICAgfVxuXG59XG5cbkxvZ2dpbmdTZXJ2aWNlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2luZ1NlcnZpY2U7XG4iLCJpbXBvcnQgdmlld05hbWUgZnJvbSAnLi92aWV3TmFtZSc7XG5pbXBvcnQgTG9nZ2luZ1NlcnZpY2UgZnJvbSAnLi9sb2dnaW5nLnNlcnZpY2UnO1xuXG5pbXBvcnQgcHJtQWN0aW9uTGlzdEFmdGVyIGZyb20gJy4vcHJtQWN0aW9uTGlzdEFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlciBmcm9tICcuL3BybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1GdWxsVmlld0FmdGVyIGZyb20gJy4vcHJtRnVsbFZpZXdBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybU5vU2VhcmNoUmVzdWx0QWZ0ZXIgZnJvbSAnLi9wcm1Ob1NlYXJjaFJlc3VsdEFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb21wb25lbnQgZnJvbSAnLi9wcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybVNlYXJjaEFmdGVyQ29tcG9uZW50IGZyb20gJy4vcHJtU2VhcmNoQWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1TZWFyY2hCYXJBZnRlckNvbmZpZyBmcm9tICcuL3BybVNlYXJjaEJhckFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyIGZyb20gJy4vcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyLmNvbXBvbmVudCc7XG5cbmNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd2aWV3Q3VzdG9tJywgWydhbmd1bGFyTG9hZCddKTtcblxuYXBwLnNlcnZpY2UoJ2xvZ2dpbmdTZXJ2aWNlJywgTG9nZ2luZ1NlcnZpY2UpO1xuXG5hcHAuY29tcG9uZW50KCdwcm1BY3Rpb25MaXN0QWZ0ZXInLCBwcm1BY3Rpb25MaXN0QWZ0ZXIpO1xuYXBwLmNvbXBvbmVudCgncHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlcicsIHBybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXIpO1xuYXBwLmNvbXBvbmVudCgncHJtRnVsbFZpZXdBZnRlcicsIHBybUZ1bGxWaWV3QWZ0ZXIpO1xuYXBwLmNvbXBvbmVudCgncHJtTm9TZWFyY2hSZXN1bHRBZnRlcicsIHBybU5vU2VhcmNoUmVzdWx0QWZ0ZXIpO1xuYXBwLmNvbXBvbmVudCgncHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXInLCBwcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbXBvbmVudCk7XG5hcHAuY29tcG9uZW50KCdwcm1TZWFyY2hBZnRlcicsIHBybVNlYXJjaEFmdGVyQ29tcG9uZW50KTtcbmFwcC5jb21wb25lbnQoJ3BybVNlYXJjaEJhckFmdGVyJywgcHJtU2VhcmNoQmFyQWZ0ZXJDb25maWcpO1xuYXBwLmNvbXBvbmVudCgncHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyJywgcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuYXBwLnJ1bihbJyRyb290U2NvcGUnLCAnbG9nZ2luZ1NlcnZpY2UnLCAoJHJvb3RTY29wZSwgbG9nZ2luZ1NlcnZpY2UpID0+IHtcbiAgICAvLyBXQVJOSU5HOiBUaGlzIG1pZ2h0IG5vdCBiZSBjYWxsZWQgaWYgUHJpbW8gZXJyb3JzLi5cbiAgICAvLyBDb21wb25lbnRzIG1heSBzdGlsbCBiZSBpbml0aWFsaXplZFxuICAgICRyb290U2NvcGUudmlld05hbWUgPSB2aWV3TmFtZTtcbn1dKTtcbiIsIlxuY2xhc3MgUHJtQWN0aW9uTGlzdEFmdGVyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IobG9nZ2luZ1NlcnZpY2UsICRkb2N1bWVudCwgJGVsZW1lbnQpIHtcbiAgICAgICAgLy8gTm90ZTogYWN0aW9uIGxpc3QgY2FuIGJlIHBhcnQgb2YgcmVzdWx0cyBsaXN0IE9SIHJlY29yZCB2aWV3LlxuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnQoKVswXTtcbiAgICAgICAgICAgIGxldCBidG5zID0gYW5ndWxhci5lbGVtZW50KHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3Njcm9sbEFjdGlvbkxpc3QgYnV0dG9uJykpO1xuXG4gICAgICAgICAgICBpZiAoIWJ0bnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IE5vIGFjdGlvbiBidXR0b25zIGZvdW5kIScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidG5zLm9uKCdjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc2VuZFRvVHlwZSA9IGV2dC5jdXJyZW50VGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24tdGV4dCcpWzBdLmdldEF0dHJpYnV0ZSgndHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhcmVudEN0cmwuaXRlbTtcbiAgICAgICAgICAgICAgICBsb2dnaW5nU2VydmljZS50cmFja1NlbmRUbyhzZW5kVG9UeXBlLCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblBybUFjdGlvbkxpc3RBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnbG9nZ2luZ1NlcnZpY2UnLCAnJGRvY3VtZW50JywgJyRlbGVtZW50J107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtQWN0aW9uTGlzdEFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiXG5jbGFzcyBQcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGxldCBpdGVtID0gdGhpcy5wYXJlbnRDdHJsLml0ZW07XG4gICAgICAgIC8vbG9nZ2luZ1NlcnZpY2UudHJhY2tWaWV3UmVjb3JkKGl0ZW0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYnJpZWYgcmVzdWx0JywgdGhpcy5wYXJlbnRDdHJsKVxuXG4gICAgICAgIC8vICRkb2N1bWVudC5yZWFkeSgoKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnR05VJywgdGhpcyk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbn1cblxuUHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCJcbmNsYXNzIFBybUZ1bGxWaWV3QWZ0ZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnaW5nU2VydmljZSkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucGFyZW50Q3RybC5pdGVtO1xuICAgICAgICBsb2dnaW5nU2VydmljZS50cmFja1ZpZXdSZWNvcmQoaXRlbSk7XG4gICAgfVxufVxuXG5Qcm1GdWxsVmlld0FmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWydsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybUZ1bGxWaWV3QWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCIvKipcbiAqIEFkb3B0ZWQgZnJvbSBhIHZlcnNpb24gYnkgQFNhcmFoWnVtXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU2FyYWhadW0vcHJpbW8tZXhwbG9yZS1jdXN0b20tbm8tcmVzdWx0c1xuICovXG5cbmNsYXNzIFBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnaW5nU2VydmljZSkge1xuICAgICAgICBsb2dnaW5nU2VydmljZS5ub1Jlc3VsdHNQYWdlTG9hZGVkKCk7XG5cbiAgICAgICAgLy8gdmFyIHZtID0gdGhpcztcbiAgICAgICAgLy8gdm0ucGNpU2V0dGluZyA9IHZtLnBhcmVudEN0cmwuc2VhcmNoU3RhdGVTZXJ2aWNlLnNlYXJjaE9iamVjdC5wY0F2YWlsYWJpbGl0eSB8fCAnJztcbiAgICAgICAgLy8gY29uZG9sZS5sb2codm0ucGFyZW50Q3RybC5zZWFyY2hTdGF0ZVNlcnZpY2Uuc2VhcmNoT2JqZWN0KTtcbiAgICAgICAgLy8gdm0uZ2V0U2VhcmNoVGVybSA9IGZ1bmN0aW9uIGdldFNlYXJjaFRlcm0oKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIHZtLnBhcmVudEN0cmwudGVybTtcbiAgICAgICAgLy8gfTtcbiAgICB9XG59XG5cblBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtTm9TZWFyY2hSZXN1bHRBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcblxuLy8gZXhwb3J0IGRlZmF1bHQge1xuLy8gICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4vLyAgIGNvbnRyb2xsZXI6IFBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyLFxuLy8gICBjb250cm9sbGVyQXM6ICd2bScsXG4vLyAgIHRlbXBsYXRlOiBgXG4vLyAgICAgPG1kLWNhcmQgY2xhc3M9XCJkZWZhdWx0LWNhcmQgemVyby1tYXJnaW4gX21kIG1kLXByaW1vRXhwbG9yZS10aGVtZVwiPlxuLy8gICAgIDxtZC1jYXJkLXRpdGxlPlxuLy8gICAgICAgPG1kLWNhcmQtdGl0bGUtdGV4dD5cbi8vICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJtZC1oZWFkbGluZSBuZy1zY29wZVwiPk5vIHJlY29yZHMgZm91bmQ8L3NwYW4+XG4vLyAgICAgICA8L21kLWNhcmQtdGl0bGUtdGV4dD5cbi8vICAgICA8L21kLWNhcmQtdGl0bGU+XG4vLyAgICAgPG1kLWNhcmQtY29udGVudD5cbi8vICAgICAgIDxwPlxuLy8gICAgICAgICA8c3Bhbj5UaGVyZSBhcmUgbm8gcmVzdWx0cyBtYXRjaGluZyB5b3VyIHNlYXJjaDo8YmxvY2txdW90ZT5cbi8vICAgICAgICAgICA8aT57eyRjdHJsLmdldFNlYXJjaFRlcm0oKX19PC9pPi48L2Jsb2NrcXVvdGU+XG4vLyAgICAgICAgICAgPGRpdiBuZy1pZj1cIiRjdHJsLnBjaVNldHRpbmcgIT09IFxcJ3RydWVcXCdcIj5cbi8vICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJpbW8tZXhwbG9yZS9zZWFyY2g/cXVlcnk9YW55LGNvbnRhaW5zLHt7JGN0cmwuZ2V0U2VhcmNoVGVybSgpfX0mdGFiPWRlZmF1bHRfdGFiJnNlYXJjaF9zY29wZT1FdmVyeXRoaW5nJnZpZD0wMUJSQ19TT0Mmb2Zmc2V0PTAmc29ydGJ5PXJhbmsmcGNBdmFpbGFiaWxpdHk9dHJ1ZVwiPlxuLy8gICAgICAgICAgICAgICA8Yj5UcnkgYWdhaW4gc2VhcmNoaW5nIGl0ZW1zIGhlbGQgYXQgb3RoZXIgbGlicmFyaWVzPzwvYj5cbi8vICAgICAgICAgICAgIDwvYT5cbi8vICAgICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgPC9zcGFuPlxuLy8gICAgICAgPC9wPlxuLy8gICAgICAgPHA+XG4vLyAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwiYm9sZC10ZXh0IG5nLXNjb3BlXCI+U3VnZ2VzdGlvbnM6PC9zcGFuPlxuLy8gICAgICAgPC9wPlxuLy8gICAgICAgPHVsPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPk1ha2Ugc3VyZSB0aGF0IGFsbCB3b3JkcyBhcmUgc3BlbGxlZCBjb3JyZWN0bHkuPC9saT5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5UcnkgYSBkaWZmZXJlbnQgc2VhcmNoIHNjb3BlLjwvbGk+XG4vLyAgICAgICAgIDxsaSB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm5nLXNjb3BlXCI+VHJ5IGRpZmZlcmVudCBzZWFyY2ggdGVybXMuPC9saT5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5UcnkgbW9yZSBnZW5lcmFsIHNlYXJjaCB0ZXJtcy48L2xpPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPlRyeSBmZXdlciBzZWFyY2ggdGVybXMuPC9saT5cbi8vICAgICAgIDwvdWw+XG4vLyAgICAgICA8cD5cbi8vICAgICAgICAgPGI+XG4vLyAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vc3RvbGFmLm9uLndvcmxkY2F0Lm9yZy9zZWFyY2g/cXVlcnlTdHJpbmc9a3c6e3skY3RybC5nZXRTZWFyY2hUZXJtKCl9fSZkYXRhYmFzZUxpc3Q9MjgzXCI+U2VhcmNoIFdvcmxkQ2F0PC9hPlxuLy8gICAgICAgICA8L2I+XG4vLyAgICAgICA8L3A+XG4vLyAgICAgICA8cD5cbi8vICAgICAgICAgPGI+XG4vLyAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LnN0b2xhZi5lZHUvbGlicmFyeS9yZXNlYXJjaC9zdHVkZW50cy5jZm1cIj5Db250YWN0IGEgUmVzZWFyY2ggTGlicmFyaWFuIGZvciBBc3Npc3RhbmNlPC9hPlxuLy8gICAgICAgICA8L2I+XG4vLyAgICAgICA8L3A+XG4vLyAgICAgPC9tZC1jYXJkLWNvbnRlbnQ+XG4vLyAgIDwvbWQtY2FyZD5cbi8vICAgYFxuLy8gfVxuIiwiXG5jbGFzcyBQcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoJHRpbWVvdXQsICRlbGVtZW50LCBsb2dnaW5nU2VydmljZSkge1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGxvZ2dpbmdTZXJ2aWNlO1xuICAgIH1cblxuICAgICRwb3N0TGluaygpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHRoaXMuJGVsZW1lbnQucGFyZW50KClbMF07XG5cblxuICAgICAgICAgICAgdmFyIHBpbkJ0biA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnBpbi1idXR0b24nKSxcbiAgICAgICAgICAgICAgICB1bnBpbkJ0biA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnVucGluLWJ1dHRvbicpO1xuXG4gICAgICAgICAgICAvLyBMaW1pdGF0aW9uOiBUaGlzIHdpbGwgb25seSBzYXZlIHRoZSBmaXJzdCBjbGljaywgc2luY2UgdGhlbiB0aGVcbiAgICAgICAgICAgIC8vIGJ1dHRvbiBpcyByZXBsYWNlZCB3aXRoIGFub3RoZXIgYnV0dG9uIGVsZW1lbnQuIFdlIGNvdWxkIGFkZCBhXG4gICAgICAgICAgICAvLyBET00gd2F0Y2hlciwgYnV0IGl0J3Mgbm90IHdvcnRoIGl0IEkgdGhpbmsuXG4gICAgICAgICAgICBpZiAocGluQnRuKSB7XG4gICAgICAgICAgICAgICAgcGluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnRyYWNrUGluUmVjb3JkKHRoaXMucGFyZW50Q3RybC5pdGVtKTtcbiAgICAgICAgICAgICAgICB9LCB7cGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1bnBpbkJ0bikge1xuICAgICAgICAgICAgICAgIHVucGluQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnRyYWNrVW5waW5SZWNvcmQodGhpcy5wYXJlbnRDdHJsLml0ZW0pO1xuICAgICAgICAgICAgICAgIH0sIHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnJGVsZW1lbnQnLCAnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1TYXZlVG9GYXZvcml0ZXNCdXR0b25BZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsImNsYXNzIFBybVNlYXJjaEFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRjb21waWxlLCAkdGltZW91dCwgJGRvY3VtZW50LCBsb2dnaW5nU2VydmljZSkge1xuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgLy8gTm90ZTogQXQgdGhpcyBwb2ludCwgdGhlIGZyb250cGFnZSBIVE1MIHRlbXBsYXRlIG1pZ2h0IG5vdCB5ZXQgYmUgcmVhZHkuXG4gICAgICAgICAgICAvLyBXZSBzZWUgdGhpcyBwcm9ibGVtIGVzcGVjaWFsbHkgaW4gRmlyZWZveCBmb3Igc29tZSByZWFzb24uIFVudGlsIHdlIGZpbmQgYSBiZXR0ZXJcbiAgICAgICAgICAgIC8vIHdheSB0byBkZXRlY3Qgd2hlbiB0aGUgdGVtcGxhdGUgaXMgbG9hZGVkLCB3ZSB1c2UgYSB0aW1lb3V0IG9mIDEwMCBtc2Vjcy5cbiAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9vdGVyID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aW8tZm9vdGVyJykpLFxuICAgICAgICAgICAgICAgICAgICBwcm1TZWFyY2hBZnRlckVsID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BybS1zZWFyY2gtYWZ0ZXInKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9vdGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBhcmUgb24gdGhlIGZyb250IHBhZ2UuIE1vdmUgZm9vdGVyIHRvIG91ciBzY29wZSBhbmQgbWFrZSBpdCB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIHBybVNlYXJjaEFmdGVyRWwuYXBwZW5kKGZvb3Rlci5kZXRhY2goKS5hZGRDbGFzcygndmlzaWJsZScpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZuTGluayA9ICRjb21waWxlKGZvb3Rlcik7ICAgICAgLy8gcmV0dXJucyBhIExpbmsgZnVuY3Rpb24gdXNlZCB0byBiaW5kIHRlbXBsYXRlIHRvIHRoZSBzY29wZVxuICAgICAgICAgICAgICAgICAgICBmbkxpbmsoJHNjb3BlKTsgICAgICAgICAgICAgICAgICAgICAvLyBCaW5kIHNjb3BlIHRvIHRoZSB0ZW1wbGF0ZVxuXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dpbmdTZXJ2aWNlLnRyYWNrSG9tZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckY29tcGlsZScsICckdGltZW91dCcsICckZG9jdW1lbnQnLCAnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1TZWFyY2hBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsImltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XG5cbmNsYXNzIFBybVNlYXJjaEJhckFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICR3aW5kb3csICRlbGVtZW50LCAkdGltZW91dCwgJGRvY3VtZW50LCAkcm9vdFNjb3BlLCBsb2dnaW5nU2VydmljZSkge1xuXG4gICAgICAgIGxldCBwcmltb1ZlcnNpb24gPSBnZXQoJHdpbmRvdy5hcHBDb25maWcsICdzeXN0ZW0tY29uZmlndXJhdGlvbi5Qcmltb19WZXJzaW9uX051bWJlcicsICd1bmtub3duJyk7XG4gICAgICAgIGxldCBzZWFyY2hTdGF0ZVNlcnZpY2UgPSB0aGlzLnBhcmVudEN0cmwuc2VhcmNoU2VydmljZS5zZWFyY2hTdGF0ZVNlcnZpY2U7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gbG9nZ2luZ1NlcnZpY2U7XG5cbiAgICAgICAgLy8gSW5qZWN0IFByaW1vJ3Mgc2VhcmNoU3RhdGVTZXJ2aWNlIGludG8gb3VyIGxvZ2dpbmdTZXJ2aWNlXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2Uuc2V0U2VhcmNoU3RhdGVTZXJ2aWNlKHNlYXJjaFN0YXRlU2VydmljZSk7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2Uuc2V0UHJpbW9WZXJzaW9uKHByaW1vVmVyc2lvbik7XG5cbiAgICAgICAgdGhpcy5wYXN0ZUV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5zZWFyY2hCYXJFbGVtZW50UGFzdGVFdmVudCgpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuaW5jcktleXByZXNzQ291bnQoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuaW5pdFNlYXJjaEJhcigpO1xuICAgICAgICAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBOb3RlOiBtYWluU2VhcmNoRmllbGQgYWxzbyBtYXBzIHRvIHRoZSBmaXJzdCBpbnB1dCBmaWVsZCBvbiBhZHZhbmNlZCBzZWFyY2hcbiAgICAgICAgICAgIC8vIHRoaXMuJHNjb3BlLiR3YXRjaCgnJGN0cmwucGFyZW50Q3RybC5tYWluU2VhcmNoRmllbGQnLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKG5ld1ZhbHVlICE9IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuaW5jcktleXByZXNzQ291bnQoKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJHdhdGNoKCckY3RybC5wYXJlbnRDdHJsLmFkdmFuY2VkU2VhcmNoJywgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKVswXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoQmFyRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaEJhcicpO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9jdXMgb24gdGhlIHNlYXJjaCBiYXIsIGlmIGl0IGV4aXN0cy5cbiAgICAgICAgICAgICAgICAvLyBOb3RlIHRoYXQsIHdoZW4gdGhlIGxhbmd1YWdlIGlzIGNoYW5nZWQsXG4gICAgICAgICAgICAgICAgLy8gdGhlIHNlYXJjaCBiYXIgaXMgbm90IGF2YWlsYWJsZSB5ZXQgaGVyZS5cbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4gd2F0Y2ggZm9yIHRoZSBlbGVtZW50IGFuZCB0aGVuIGZvY3VzIG9uIGl0LFxuICAgICAgICAgICAgICAgIC8vIGJ1dCBpdCBkb2VzIG5vdCBzZWVtIHRvIHdvcnRoIGl0LlxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hCYXJFbGVtZW50ICYmICFvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dCgoKSA9PiBzZWFyY2hCYXJFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRFbGVtcyA9IGFuZ3VsYXIuZWxlbWVudChwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykpO1xuXG4gICAgICAgICAgICAgICAgJGlucHV0RWxlbXMub2ZmKCdwYXN0ZScsIHRoaXMucGFzdGVFdmVudEhhbmRsZXIpOyAvLyBUbyBtYWtlIHN1cmUgd2UgZG9uJ3QgZW5kIHVwIHdpdGggZG91YmxlIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgJGlucHV0RWxlbXMub24oJ3Bhc3RlJywgdGhpcy5wYXN0ZUV2ZW50SGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAkaW5wdXRFbGVtcy5vZmYoJ2lucHV0JywgdGhpcy5pbnB1dEhhbmRsZXIpOyAgLy8gVG8gbWFrZSBzdXJlIHdlIGRvbid0IGVuZCB1cCB3aXRoIGRvdWJsZSBoYW5kbGVyc1xuICAgICAgICAgICAgICAgICRpbnB1dEVsZW1zLm9uKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC8vIENhbGxlZCBhZnRlciB0aGlzIGNvbnRyb2xsZXIncyBlbGVtZW50IGFuZCBpdHMgY2hpbGRyZW4gaGF2ZSBiZWVuIGxpbmtlZC5cbiAgICAvLyAkcG9zdExpbmsoKSB7XG4gICAgLy8gICAgIC8vIEZvY3VzIGlucHV0IGZpZWxkIG9uIGxvYWQuIEFkYXB0ZWQgZnJvbSBhIHZlcnNpb24gYnkgQG11cmF0c2V5aGFuXG4gICAgLy8gICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EZXQtS29uZ2VsaWdlLUJpYmxpb3Rlay9wcmltby1leHBsb3JlLXJleC9jb21taXQvODY0MzJlNjhlMzEzYTQzZGIxZjAxYTNhMjUxNjUyZjg0OTUyZDVhNlxuICAgIC8vICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy4kZWxlbWVudC5wYXJlbnQoKTtcbiAgICAvLyAgICAgICAgIGxldCBzZWFyY2hCYXJFbGVtZW50ID0gcGFyZW50RWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoQmFyJyk7XG5cbiAgICAvLyAgICAgICAgIC8vIEZvY3VzIG9uIHRoZSBzZWFyY2ggYmFyLCBpZiBpdCBleGlzdHMuXG4gICAgLy8gICAgICAgICAvLyBOb3RlIHRoYXQsIHdoZW4gdGhlIGxhbmd1YWdlIGlzIGNoYW5nZWQsXG4gICAgLy8gICAgICAgICAvLyB0aGUgc2VhcmNoIGJhciBpcyBub3QgYXZhaWxhYmxlIHlldCBoZXJlLlxuICAgIC8vICAgICAgICAgLy8gV2UgY2FuIHdhdGNoIGZvciB0aGUgZWxlbWVudCBhbmQgdGhlbiBmb2N1cyBvbiBpdCxcbiAgICAvLyAgICAgICAgIC8vIGJ1dCBpdCBkb2VzIG5vdCBzZWVtIHRvIHdvcnRoIGl0LlxuICAgIC8vICAgICAgICAgaWYgKHNlYXJjaEJhckVsZW1lbnQpIHtcbiAgICAvLyAgICAgICAgICAgICBzZWFyY2hCYXJFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAvLyAgICAgICAgICAgICBzZWFyY2hCYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnNlYXJjaEJhckVsZW1lbnRQYXN0ZUV2ZW50KCk7XG4gICAgLy8gICAgICAgICAgICAgfSwge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRydWV9KTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSwgMCk7XG4gICAgLy8gfVxuXG4gICAgLy8gQ2hhbmdlIHBsYWNlaG9sZGVyIHRleHQgKG5lZWRzIG9wdGltaXphdGlvbiBJIHRoaW5rKVxuICAgIC8vIGJ5IEFsZXggUlM6IGh0dHA6Ly9zZWFyY2gtdGVzdC5saWJyYXJ5LmJyYW5kZWlzLmVkdS9wcmltby1leHBsb3JlL3NlYXJjaD92aWQ9QlJBTkRURVNUXG4gICAgLy8gdmFyIG15VmFyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24ocGFyZW50Q3RybCkge1xuICAgIC8vICAgICBwYXJlbnRDdHJsLl9wbGFjZUhvbGRlclRleHQgPSBjYWxjdWxhdGVQbGFjZUhvbGRlclRleHQocGFyZW50Q3RybC5fc2VsZWN0ZWRUYWIpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInBsYWNlaG9sZGVyIGNoYW5nZWRcIik7XG4gICAgLy8gfSwgMTAwLCB0aGlzLnBhcmVudEN0cmwpO1xuXG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiggbXlJbnRlcnZhbElEICkge1xuICAgIC8vICAgICBjbGVhckludGVydmFsKG15SW50ZXJ2YWxJRCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwicGxhY2Vob2xkZXIgaW50ZXJ2YWwgY2xlYXJlZFwiKTtcbiAgICAvLyB9LCA1MDAwLCBteVZhcik7XG5cbiAgICAvLyAkc2NvcGUuJHdhdGNoKFwiJHBhcmVudC4kY3RybC5fc2VsZWN0ZWRUYWJcIiwgZnVuY3Rpb24obmV3VGFiLCBvbGRUYWIpIHtcbiAgICAvLyAgICAgJHNjb3BlLiRwYXJlbnQuJGN0cmwuX3BsYWNlSG9sZGVyVGV4dCA9IGNhbGN1bGF0ZVBsYWNlSG9sZGVyVGV4dChuZXdUYWIpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gZnVuY3Rpb24gY2FsY3VsYXRlUGxhY2VIb2xkZXJUZXh0IChteVRhYikge1xuICAgIC8vICAgICBzd2l0Y2ggKG15VGFiKSB7XG4gICAgLy8gICAgICAgICBjYXNlIFwicGNpXCI6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIFwiRmluZCBhcnRpY2xlcyBhbmQgb3RoZXIgbWF0ZXJpYWxzIGZyb20gc2Nob2xhcmx5IGpvdXJuYWxzLCBuZXdzcGFwZXJzLCBhbmQgb25saW5lIGNvbGxlY3Rpb25zXCI7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwiYWxtYVwiOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcIkZpbmQgYm9va3MsIG1vdmllcywgbXVzaWMsIHNlcmlhbHMsIGV0Y1wiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcImV2ZXJ5dGhpbmdcIjpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJGaW5kIEFMTCBraW5kcyBvZiBsaWJyYXJ5IHJlc291cmNlcyAoYm9va3MsIG1vdmllcywgam91cm5hbCBhcnRpY2xlcywgZXRjKVwiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcImNvdXJzZVwiOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcIkZpbmQgYm9va3MgJiBtZWRpYSBvbiByZXNlcnZlIGZvciB5b3VyIGNsYXNzLlwiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgZGVmYXVsdDpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJ1bmtub3duLXRhYiBwbGFjZWhvbGRlclwiO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxufVxuXG5Qcm1TZWFyY2hCYXJBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyR3aW5kb3cnLCAnJGVsZW1lbnQnLCAnJHRpbWVvdXQnLCAnJGRvY3VtZW50JywgJyRyb290U2NvcGUnLCAnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8vIFRoZSA8IHN5bWJvbCBkZW5vdGVzIG9uZS13YXkgYmluZGluZ3Mgd2hpY2ggYXJlIGF2YWlsYWJsZSBzaW5jZSAxLjUuXG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNlYXJjaEJhckFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiXG5jbGFzcyBQcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCR3aW5kb3csICRzY29wZSwgbG9nZ2luZ1NlcnZpY2UpIHtcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnJGN0cmwucGFyZW50Q3RybC5udW1PZkxvYWRlZFBhZ2VzJywgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb2dnaW5nU2VydmljZS5zZWFyY2hQYWdlTG9hZGVkKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1TZWFyY2hSZXN1bHRMaXN0QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnJHNjb3BlJywgJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiLy8gRGVmaW5lIHRoZSB2aWV3IG5hbWUgaGVyZS5cbmNvbnN0IHZpZXdOYW1lID0gJ1VJTyc7XG5leHBvcnQgZGVmYXVsdCB2aWV3TmFtZTtcbiJdfQ==
