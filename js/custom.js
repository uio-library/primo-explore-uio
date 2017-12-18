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

            var dt = '';
            if (_this.trail.length > 0) {
                sc.fromTime = _this.trail[_this.trail.length - 1].toTime;
                dt = 'after ' + (sc.toTime - sc.fromTime) / 1000 + ' secs';
            }
            _this.trail.push(sc);
            _this.t1 = new Date();
            _this.log('%c [loggingService] State changed from ' + sc.from + ' to ' + sc.to + ' ' + dt, 'background: green; color: white; display: block;');

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

var _prmExploreMainAfter = require('./prmExploreMainAfter.component');

var _prmExploreMainAfter2 = _interopRequireDefault(_prmExploreMainAfter);

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
app.component('prmExploreMainAfter', _prmExploreMainAfter2.default);
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

},{"./logging.service":85,"./prmActionListAfter.component":87,"./prmBriefResultContainerAfter.component":88,"./prmExploreMainAfter.component":89,"./prmFullViewAfter.component":90,"./prmNoSearchResultAfter.component":91,"./prmSaveToFavoritesButtonAfter.component":92,"./prmSearchAfter.component":93,"./prmSearchBarAfter.component":94,"./prmSearchResultListAfter.component":95,"./viewName":96}],87:[function(require,module,exports){
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

var PrmExploreMainAfterController = function PrmExploreMainAfterController() {
    _classCallCheck(this, PrmExploreMainAfterController);
};

PrmExploreMainAfterController.$inject = [];

exports.default = {
    bindings: { parentCtrl: '<' },
    controller: PrmExploreMainAfterController,
    template: ''
};

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{"lodash/get":72}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Define the view name here.
var viewName = 'UIO';
exports.default = viewName;

},{}]},{},[86])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTGlzdENhY2hlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TZXRDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FwcGx5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlJbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5SW5jbHVkZXNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlNYXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVB1c2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQXNzaWduVmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRmluZEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUluZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYU4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUGljay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VQaWNrQnkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlU2V0VG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVW5pcS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY2FzdFBhdGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19mbGF0UmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRNYXBEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNGbGF0dGVuYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXlhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZURlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZVNldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21lbW9pemVDYXBwZWQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUFkZC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldENhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0VG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2hvcnRPdXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdHJpY3RJbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9LZXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL190b1NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9mbGF0dGVuLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9nZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FyZ3VtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL21lbW9pemUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL25vb3AuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3BpY2suanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91bmlxLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL2xvZ2dpbmcuc2VydmljZS5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9tYWluLmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL3BybUFjdGlvbkxpc3RBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtRXhwbG9yZU1haW5BZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtRnVsbFZpZXdBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtTm9TZWFyY2hSZXN1bHRBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXIuY29tcG9uZW50LmpzIiwicHJpbW8tZXhwbG9yZS9jdXN0b20vVUlPL2pzL3BybVNlYXJjaEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy9wcm1TZWFyY2hCYXJBZnRlci5jb21wb25lbnQuanMiLCJwcmltby1leHBsb3JlL2N1c3RvbS9VSU8vanMvcHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyLmNvbXBvbmVudC5qcyIsInByaW1vLWV4cGxvcmUvY3VzdG9tL1VJTy9qcy92aWV3TmFtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0JBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxjOzs7OztBQUVGOzs7Ozs7Ozs7O0FBVUE7Ozs7OEJBSU07QUFDRjtBQUNIOzs7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QyxHQUE2QyxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLGdCQUF0QixDQUE3Qzs7a0JBRWU7QUFDWCxjQUFVLEVBQUMsWUFBWSxHQUFiLEVBREM7QUFFWCxnQkFBWSxrQ0FGRDtBQUdYLGNBQVU7QUFIQyxDOzs7Ozs7OztBQ2RmO0FBQ0EsSUFBTSxXQUFXLEtBQWpCO2tCQUNlLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuIiwidmFyIGxpc3RDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlQ2xlYXInKSxcbiAgICBsaXN0Q2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVEZWxldGUnKSxcbiAgICBsaXN0Q2FjaGVHZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVHZXQnKSxcbiAgICBsaXN0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVIYXMnKSxcbiAgICBsaXN0Q2FjaGVTZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Q2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKSxcbiAgICBzZXRDYWNoZUFkZCA9IHJlcXVpcmUoJy4vX3NldENhY2hlQWRkJyksXG4gICAgc2V0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19zZXRDYWNoZUhhcycpO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldENhY2hlO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsIi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseTtcbiIsInZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Jhc2VJbmRleE9mJyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluY2x1ZGVzYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIHNwZWNpZnlpbmcgYW4gaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gISFsZW5ndGggJiYgYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCAwKSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5SW5jbHVkZXM7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXJyYXlJbmNsdWRlc2AgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhIGNvbXBhcmF0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdGFyZ2V0YCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheUluY2x1ZGVzV2l0aChhcnJheSwgdmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWFwO1xuIiwiLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5UHVzaDtcbiIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NvY0luZGV4T2Y7XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ25WYWx1ZTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmluZEluZGV4YCBhbmQgYF8uZmluZExhc3RJbmRleGAgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IGZyb21JbmRleCArIChmcm9tUmlnaHQgPyAxIDogLTEpO1xuXG4gIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaW5kSW5kZXg7XG4iLCJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNGbGF0dGVuYWJsZSA9IHJlcXVpcmUoJy4vX2lzRmxhdHRlbmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG4iLCJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzS2V5ID0gcmVxdWlyZSgnLi9faXNLZXknKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0KG9iamVjdCwgcGF0aCkge1xuICBwYXRoID0gaXNLZXkocGF0aCwgb2JqZWN0KSA/IFtwYXRoXSA6IGNhc3RQYXRoKHBhdGgpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0O1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUlzTmFOID0gcmVxdWlyZSgnLi9fYmFzZUlzTmFOJyksXG4gICAgc3RyaWN0SW5kZXhPZiA9IHJlcXVpcmUoJy4vX3N0cmljdEluZGV4T2YnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZVxuICAgID8gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleClcbiAgICA6IGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsInZhciBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmFOYCB3aXRob3V0IHN1cHBvcnQgZm9yIG51bWJlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hTjtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgYmFzZVBpY2tCeSA9IHJlcXVpcmUoJy4vX2Jhc2VQaWNrQnknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5waWNrYCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIHByb3BlcnR5IGlkZW50aWZpZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGljayhvYmplY3QsIHByb3BzKSB7XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYmFzZVBpY2tCeShvYmplY3QsIHByb3BzLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmV0dXJuIGtleSBpbiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQaWNrO1xuIiwidmFyIGJhc2VBc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ25WYWx1ZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mICBgXy5waWNrQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBwaWNrIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIHByb3BlcnR5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZVBpY2tCeShvYmplY3QsIHByb3BzLCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB7fTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBrZXkpKSB7XG4gICAgICBiYXNlQXNzaWduVmFsdWUocmVzdWx0LCBrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUGlja0J5O1xuIiwidmFyIGNvbnN0YW50ID0gcmVxdWlyZSgnLi9jb25zdGFudCcpLFxuICAgIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fZGVmaW5lUHJvcGVydHknKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0VG9TdHJpbmdgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3Agc2hvcnRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldFRvU3RyaW5nID0gIWRlZmluZVByb3BlcnR5ID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBzdHJpbmcpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmMsICd0b1N0cmluZycsIHtcbiAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAnZW51bWVyYWJsZSc6IGZhbHNlLFxuICAgICd2YWx1ZSc6IGNvbnN0YW50KHN0cmluZyksXG4gICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNldFRvU3RyaW5nO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29udmVydCB2YWx1ZXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICByZXR1cm4gYXJyYXlNYXAodmFsdWUsIGJhc2VUb1N0cmluZykgKyAnJztcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwidmFyIFNldENhY2hlID0gcmVxdWlyZSgnLi9fU2V0Q2FjaGUnKSxcbiAgICBhcnJheUluY2x1ZGVzID0gcmVxdWlyZSgnLi9fYXJyYXlJbmNsdWRlcycpLFxuICAgIGFycmF5SW5jbHVkZXNXaXRoID0gcmVxdWlyZSgnLi9fYXJyYXlJbmNsdWRlc1dpdGgnKSxcbiAgICBjYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2NhY2hlSGFzJyksXG4gICAgY3JlYXRlU2V0ID0gcmVxdWlyZSgnLi9fY3JlYXRlU2V0JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgcmVzdWx0ID0gW10sXG4gICAgICBzZWVuID0gcmVzdWx0O1xuXG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICB9XG4gIGVsc2UgaWYgKGxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgdmFyIHNldCA9IGl0ZXJhdGVlID8gbnVsbCA6IGNyZWF0ZVNldChhcnJheSk7XG4gICAgaWYgKHNldCkge1xuICAgICAgcmV0dXJuIHNldFRvQXJyYXkoc2V0KTtcbiAgICB9XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICBpbmNsdWRlcyA9IGNhY2hlSGFzO1xuICAgIHNlZW4gPSBuZXcgU2V0Q2FjaGU7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VlbiA9IGl0ZXJhdGVlID8gW10gOiByZXN1bHQ7XG4gIH1cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUpIDogdmFsdWU7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgc2VlbkluZGV4ID0gc2Vlbi5sZW5ndGg7XG4gICAgICB3aGlsZSAoc2VlbkluZGV4LS0pIHtcbiAgICAgICAgaWYgKHNlZW5bc2VlbkluZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpbmNsdWRlcyhzZWVuLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIGlmIChzZWVuICE9PSByZXN1bHQpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5pcTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGEgYGNhY2hlYCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhY2hlSGFzO1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBzdHJpbmdUb1BhdGggPSByZXF1aXJlKCcuL19zdHJpbmdUb1BhdGgnKTtcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RQYXRoO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZUpzRGF0YTtcbiIsInZhciBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBub29wID0gcmVxdWlyZSgnLi9ub29wJyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2V0IG9iamVjdCBvZiBgdmFsdWVzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYWRkIHRvIHRoZSBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgc2V0LlxuICovXG52YXIgY3JlYXRlU2V0ID0gIShTZXQgJiYgKDEgLyBzZXRUb0FycmF5KG5ldyBTZXQoWywtMF0pKVsxXSkgPT0gSU5GSU5JVFkpID8gbm9vcCA6IGZ1bmN0aW9uKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFNldCh2YWx1ZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTZXQ7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZnVuYyA9IGdldE5hdGl2ZShPYmplY3QsICdkZWZpbmVQcm9wZXJ0eScpO1xuICAgIGZ1bmMoe30sICcnLCB7fSk7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnR5O1xuIiwidmFyIGZsYXR0ZW4gPSByZXF1aXJlKCcuL2ZsYXR0ZW4nKSxcbiAgICBvdmVyUmVzdCA9IHJlcXVpcmUoJy4vX292ZXJSZXN0JyksXG4gICAgc2V0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19zZXRUb1N0cmluZycpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIGZsYXR0ZW5zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGZsYXRSZXN0KGZ1bmMpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHVuZGVmaW5lZCwgZmxhdHRlbiksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdFJlc3Q7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgaXNLZXlhYmxlID0gcmVxdWlyZSgnLi9faXNLZXlhYmxlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXBEYXRhO1xuIiwidmFyIGJhc2VJc05hdGl2ZSA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hdGl2ZScpLFxuICAgIGdldFZhbHVlID0gcmVxdWlyZSgnLi9fZ2V0VmFsdWUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEdldDtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoSGFzO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoU2V0O1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ByZWFkYWJsZVN5bWJvbCA9IFN5bWJvbCA/IFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmbGF0dGVuYWJsZSBgYXJndW1lbnRzYCBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZmxhdHRlbmFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNGbGF0dGVuYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpIHx8XG4gICAgISEoc3ByZWFkYWJsZVN5bWJvbCAmJiB2YWx1ZSAmJiB2YWx1ZVtzcHJlYWRhYmxlU3ltYm9sXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGbGF0dGVuYWJsZTtcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0tleWFibGU7XG4iLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcbiIsIi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVDbGVhcjtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZURlbGV0ZTtcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVHZXQ7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUhhcztcbiIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICArK3RoaXMuc2l6ZTtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZVNldDtcbiIsInZhciBIYXNoID0gcmVxdWlyZSgnLi9fSGFzaCcpLFxuICAgIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVDbGVhcjtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZURlbGV0ZTtcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVHZXQ7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUhhcztcbiIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVTZXQ7XG4iLCJ2YXIgbWVtb2l6ZSA9IHJlcXVpcmUoJy4vbWVtb2l6ZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgbWF4aW11bSBtZW1vaXplIGNhY2hlIHNpemUuICovXG52YXIgTUFYX01FTU9JWkVfU0laRSA9IDUwMDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWVtb2l6ZWAgd2hpY2ggY2xlYXJzIHRoZSBtZW1vaXplZCBmdW5jdGlvbidzXG4gKiBjYWNoZSB3aGVuIGl0IGV4Y2VlZHMgYE1BWF9NRU1PSVpFX1NJWkVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZUNhcHBlZChmdW5jKSB7XG4gIHZhciByZXN1bHQgPSBtZW1vaXplKGZ1bmMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChjYWNoZS5zaXplID09PSBNQVhfTUVNT0laRV9TSVpFKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9KTtcblxuICB2YXIgY2FjaGUgPSByZXN1bHQuY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZUNhcHBlZDtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVDcmVhdGU7XG4iLCJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUmVzdGAgd2hpY2ggdHJhbnNmb3JtcyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgcmVzdCBhcnJheSB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlclJlc3QoZnVuYywgc3RhcnQsIHRyYW5zZm9ybSkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSB0cmFuc2Zvcm0oYXJyYXkpO1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJSZXN0O1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0Q2FjaGVBZGQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0Q2FjaGVIYXM7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvQXJyYXk7XG4iLCJ2YXIgYmFzZVNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVNldFRvU3RyaW5nJyksXG4gICAgc2hvcnRPdXQgPSByZXF1aXJlKCcuL19zaG9ydE91dCcpO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDUwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3J0T3V0O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5kZXhPZmAgd2hpY2ggcGVyZm9ybXMgc3RyaWN0IGVxdWFsaXR5XG4gKiBjb21wYXJpc29ucyBvZiB2YWx1ZXMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmljdEluZGV4T2Y7XG4iLCJ2YXIgbWVtb2l6ZUNhcHBlZCA9IHJlcXVpcmUoJy4vX21lbW9pemVDYXBwZWQnKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZUNhcHBlZChmdW5jdGlvbihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChyZUxlYWRpbmdEb3QudGVzdChzdHJpbmcpKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RyaW5nVG9QYXRoO1xuIiwidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0tleTtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50O1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXE7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpO1xuXG4vKipcbiAqIEZsYXR0ZW5zIGBhcnJheWAgYSBzaW5nbGUgbGV2ZWwgZGVlcC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZsYXR0ZW4oWzEsIFsyLCBbMywgWzRdXSwgNV1dKTtcbiAqIC8vID0+IFsxLCAyLCBbMywgWzRdXSwgNV1cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICByZXR1cm4gbGVuZ3RoID8gYmFzZUZsYXR0ZW4oYXJyYXksIDEpIDogW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlbjtcbiIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcbiIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICogcHJvdmlkZWQsIGl0IGRldGVybWluZXMgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0IGJhc2VkIG9uIHRoZVxuICogYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgbWFwIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICogaXMgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoZSBjYWNoZSBpcyBleHBvc2VkIGFzIHRoZSBgY2FjaGVgIHByb3BlcnR5IG9uIHRoZSBtZW1vaXplZFxuICogZnVuY3Rpb24uIEl0cyBjcmVhdGlvbiBtYXkgYmUgY3VzdG9taXplZCBieSByZXBsYWNpbmcgdGhlIGBfLm1lbW9pemUuQ2FjaGVgXG4gKiBjb25zdHJ1Y3RvciB3aXRoIG9uZSB3aG9zZSBpbnN0YW5jZXMgaW1wbGVtZW50IHRoZVxuICogW2BNYXBgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wcm9wZXJ0aWVzLW9mLXRoZS1tYXAtcHJvdG90eXBlLW9iamVjdClcbiAqIG1ldGhvZCBpbnRlcmZhY2Ugb2YgYGRlbGV0ZWAsIGBnZXRgLCBgaGFzYCwgYW5kIGBzZXRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBUaGUgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdjJzogMywgJ2QnOiA0IH07XG4gKlxuICogdmFyIHZhbHVlcyA9IF8ubWVtb2l6ZShfLnZhbHVlcyk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIHZhbHVlcyhvdGhlcik7XG4gKiAvLyA9PiBbMywgNF1cbiAqXG4gKiBvYmplY3QuYSA9IDI7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIC8vIE1vZGlmeSB0aGUgcmVzdWx0IGNhY2hlLlxuICogdmFsdWVzLmNhY2hlLnNldChvYmplY3QsIFsnYScsICdiJ10pO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKlxuICogLy8gUmVwbGFjZSBgXy5tZW1vaXplLkNhY2hlYC5cbiAqIF8ubWVtb2l6ZS5DYWNoZSA9IFdlYWtNYXA7XG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZnVuYywgcmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicgfHwgKHJlc29sdmVyICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub29wO1xuIiwidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBiYXNlUGljayA9IHJlcXVpcmUoJy4vX2Jhc2VQaWNrJyksXG4gICAgZmxhdFJlc3QgPSByZXF1aXJlKCcuL19mbGF0UmVzdCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGUgcGlja2VkIGBvYmplY3RgIHByb3BlcnRpZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwcm9wc10gVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLnBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICovXG52YXIgcGljayA9IGZsYXRSZXN0KGZ1bmN0aW9uKG9iamVjdCwgcHJvcHMpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8ge30gOiBiYXNlUGljayhvYmplY3QsIGFycmF5TWFwKHByb3BzLCB0b0tleSkpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcbiIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nO1xuIiwidmFyIGJhc2VVbmlxID0gcmVxdWlyZSgnLi9fYmFzZVVuaXEnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiBhbiBhcnJheSwgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGluIHdoaWNoIG9ubHkgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZWFjaCBlbGVtZW50XG4gKiBpcyBrZXB0LiBUaGUgb3JkZXIgb2YgcmVzdWx0IHZhbHVlcyBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBvcmRlciB0aGV5IG9jY3VyXG4gKiBpbiB0aGUgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuaXEoWzIsIDEsIDJdKTtcbiAqIC8vID0+IFsyLCAxXVxuICovXG5mdW5jdGlvbiB1bmlxKGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZVVuaXEoYXJyYXkpXG4gICAgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxO1xuIiwiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC91bmlxJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcblxuY2xhc3MgTG9nZ2luZ1NlcnZpY2Uge1xuXG4gICAgLypcbiAgICAkcm9vdFNjb3BlOiBJUm9vdFNjb3BlU2VydmljZTtcbiAgICBwcmltb1ZlcnNpb246IHN0cmluZztcbiAgICBzZWFyY2hTdGF0ZVNlcnZpY2U6IFNlYXJjaFN0YXRlU2VydmljZTtcbiAgICB0cmFpbDogbGlzdDtcbiAgICBrZXlwcmVzc2VzOiBudW1iZXJcbiAgICBwYXN0ZWQ6IGJvb2xlYW5cbiAgICB0MTogRGF0ZVxuICAgICovXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBsb2coKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoJHJvb3RTY29wZSkge1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuXG4gICAgICAgIC8vIFByaW1vIHZlcnNpb25cbiAgICAgICAgdGhpcy5wcmltb1ZlcnNpb24gPSBudWxsO1xuXG4gICAgICAgIC8vIFVuZm9ydHVuYXRlbHkgUHJpbW8ncyBTZWFyY2hTdGF0ZVNlcnZpY2UgaXMgbm90IGluamVjdGFibGUsIHNvIHdlIG5lZWRcbiAgICAgICAgLy8gdG8gZ2V0IGl0IGZyb20gb25lIG9mIHRoZSBjb21wb25lbnRzLlxuICAgICAgICB0aGlzLnNlYXJjaFN0YXRlU2VydmljZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5sYXN0QWN0aW9uID0gbnVsbDtcblxuICAgICAgICAvLyBOYXZpZ2F0aW9uIHRyYWlsXG4gICAgICAgIHRoaXMudHJhaWwgPSBbXTtcblxuICAgICAgICAvLyBOdW1iZXIgb2Yga2V5cHJlc3NlcyBpbiBtYWluIHNlYXJjaCBmaWVsZC4gVHJhY2tlZCBieSBwcm1TZWFyY2hCYXJBZnRlclxuICAgICAgICB0aGlzLmtleXByZXNzZXMgPSAwO1xuXG4gICAgICAgIC8vIFJlY2VpdmVkIGEgcGFzdGUgZXZlbnQ/IFRyYWNrZWQgYnkgcHJtU2VhcmNoQmFyQWZ0ZXJcbiAgICAgICAgdGhpcy5wYXN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBTZXJ2ZXIgdXJsXG4gICAgICAgIHRoaXMudXJsID0gJ2h0dHBzOi8vdWItd3d3MDEudWlvLm5vL3NsdXJwLyc7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgICAgICAgIHZhciBzYyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBmcm9tU3RhdGUubmFtZSxcbiAgICAgICAgICAgICAgICBmcm9tVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICB0bzogdG9TdGF0ZS5uYW1lLFxuICAgICAgICAgICAgICAgIHRvVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHRvUGFyYW1zLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGR0ID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFpbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc2MuZnJvbVRpbWUgPSB0aGlzLnRyYWlsW3RoaXMudHJhaWwubGVuZ3RoIC0gMV0udG9UaW1lO1xuICAgICAgICAgICAgICAgIGR0ID0gYGFmdGVyICR7KHNjLnRvVGltZSAtIHNjLmZyb21UaW1lKS8xMDAwfSBzZWNzYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudHJhaWwucHVzaChzYyk7XG4gICAgICAgICAgICB0aGlzLnQxID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGAlYyBbbG9nZ2luZ1NlcnZpY2VdIFN0YXRlIGNoYW5nZWQgZnJvbSAke3NjLmZyb219IHRvICR7c2MudG99ICR7ZHR9YCwgJ2JhY2tncm91bmQ6IGdyZWVuOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuXG4gICAgICAgICAgICAvLyBpZiAodG9TdGF0ZS5uYW1lID09ICdleHBsb3JlTWFpbi5zZWFyY2gnKSB7XG4gICAgICAgICAgICAvLyAgIHJlcS5wYXJhbXMgPSB7XG4gICAgICAgICAgICAvLyAgICAgbW9kZTogdG9QYXJhbXMubW9kZSwgIC8vICdhZHZhbmNlZCcgb3IgJz8nXG4gICAgICAgICAgICAvLyAgICAgbGFuZzogdG9QYXJhbXMubGFuZyxcbiAgICAgICAgICAgIC8vICAgICBxdWVyeTogdG9QYXJhbXMucXVlcnksXG4gICAgICAgICAgICAvLyAgICAgc2VhcmNoX3Njb3BlOiB0b1BhcmFtcy5zZWFyY2hfc2NvcGUsICAvLyAnZGVmYXVsdCcsICdldmVyeXRoaW5nJywgJ2xvY2FsX3Njb3BlJyAoQsO4a2VyIHZlZCBVaU8pLCAnYmlic3lzX2lscycsIC4uXG4gICAgICAgICAgICAvLyAgICAgdGFiOiB0b1BhcmFtcy50YWIsICAvLyAnZGVmYXVsdF90YWInLCAnZXZlcnl0aGluZycsICdsb2NhbF91aW8nLCAnYmlic3lzX2NvbnNvcnRpYScgLi4uXG4gICAgICAgICAgICAvLyAgICAgc29ydGJ5OiB0b1BhcmFtcy5zb3J0YnksICAvLyBcInJhbmtcIlxuXG4gICAgICAgICAgICAvLyAgICAgLy8gcGZpbHRlcjogTWF0ZXJpYWx0eXBlL3NwcsOlay91dGdpdmVsc2VzZGF0b1xuICAgICAgICAgICAgLy8gICAgIC8vIENhbiBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkhXG4gICAgICAgICAgICAvLyAgICAgLy8gRXhhbXBsZXM6XG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gXCJwZmlsdGVyLGV4YWN0LGJvb2tzLEFORFwiXG4gICAgICAgICAgICAvLyAgICAgLy8gIC0gW1wibGFuZyxleGFjdCxub3IsQU5EXCIsIFwicGZpbHRlcixleGFjdCxib29rcyxBTkRcIiwgXCJjcmVhdGlvbmRhdGUsZXhhY3QsMS1ZRUFSLEFORFwiXVxuICAgICAgICAgICAgLy8gICAgIHBmaWx0ZXI6IHRvUGFyYW1zLnBmaWx0ZXIsXG5cbiAgICAgICAgICAgIC8vICAgICAvLyBGYWNldHNcbiAgICAgICAgICAgIC8vICAgICAvLyBDYW4gYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IVxuICAgICAgICAgICAgLy8gICAgIC8vIEV4YW1wbGVzOlxuICAgICAgICAgICAgLy8gICAgIC8vICAtIFwibG9jYWw0LGluY2x1ZGUsTkJcIlxuICAgICAgICAgICAgLy8gICAgIC8vICAtIFtcImxvY2FsNCxpbmNsdWRlLE5CXCIsIFwibG9jYWwxMCxpbmNsdWRlLDY0MS41XCIsIFwibG9jYWwxNCxpbmNsdWRlLE1hdG9wcHNrcmlmdGVyXCJdXG4gICAgICAgICAgICAvLyAgICAgZmFjZXQ6IHRvUGFyYW1zLmZhY2V0LFxuICAgICAgICAgICAgLy8gICB9O1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVybmFsIG1ldGhvZHNcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHNpbXBsaWZ5UmVjb3JkKHJlY29yZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6ICAgICAgICAgIGdldChyZWNvcmQsICdwbnguY29udHJvbC5yZWNvcmRpZC4wJyksXG4gICAgICAgICAgICBpc19sb2NhbDogICAgZ2V0KHJlY29yZCwgJ2NvbnRleHQnKSA9PSAnTCcsXG4gICAgICAgICAgICBhZGRzX2lkOiAgICAgZ2V0KHJlY29yZCwgJ3BueC5jb250cm9sLmFkZHNyY3JlY29yZGlkLjAnKSxcbiAgICAgICAgICAgIHNvdXJjZTogICAgICBnZXQocmVjb3JkLCAncG54LmNvbnRyb2wuc291cmNlc3lzdGVtLjAnKSxcbiAgICAgICAgICAgIGRkYzogICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzEwJywgW10pKSxcbiAgICAgICAgICAgIGh1bWU6ICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzE0JywgW10pKSxcbiAgICAgICAgICAgIHJlYWw6ICAgICAgICB1bmlxKGdldChyZWNvcmQsICdwbnguZmFjZXRzLmxmYzIwJywgW10pKSxcbiAgICAgICAgICAgIHJzcmN0eXBlOiAgICBnZXQocmVjb3JkLCAncG54LmZhY2V0cy5yc3JjdHlwZScsIFtdKSxcbiAgICAgICAgICAgIGRpc3B0eXBlOiAgICBnZXQocmVjb3JkLCAncG54LmRpc3BsYXkudHlwZScsIFtdKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0cmFja0V2ZW50KGFjdGlvbiwgZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpLmxlbmd0aDtcbiAgICAgICAgdGhpcy5sb2coYCVjIFtsb2dnaW5nU2VydmljZV0gVHJhY2sgXCIke2FjdGlvbn1cIiBhY3Rpb24gKCR7c2l6ZX0gYnl0ZXMpYCwgJ2JhY2tncm91bmQ6IGdyZWVuOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuICAgICAgICB0aGlzLmxvZygnW2xvZ2dpbmdTZXJ2aWNlXScsIGRhdGEpO1xuXG4gICAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgbGFzdF9hY3Rpb246IHRoaXMubGFzdEFjdGlvbixcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHNlc3Npb25faWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3NsdXJwU2Vzc2lvbklkJyksXG4gICAgICAgICAgICBhY3Rpb25fbm86IHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3NsdXJwQWN0aW9uTm8nKSkgfHwgMSxcbiAgICAgICAgICAgIGhpc3Q6IHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxhc3RBY3Rpb24gPSBhY3Rpb247XG5cbiAgICAgICAgLy8gRG9uJ3QgdXNlICRodHRwIHNpbmNlIHdlIGRvbid0IHdhbnQgdGhlIFByaW1vIGRlZmF1bHQgaGVhZGVycyBldGMuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnc2x1cnBTZXNzaW9uSWQnLCByZXMuc2Vzc2lvbl9pZCk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3NsdXJwQWN0aW9uTm8nLCByZXMuYWN0aW9uX25vKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVxLm9wZW4oJ1BPU1QnLCB0aGlzLnVybCk7XG4gICAgICAgICAgICByZXEuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyYWNrRXJyb3IobXNnKSB7XG4gICAgICAgIHRoaXMubG9nKGAlYyBbbG9nZ2luZ1NlcnZpY2VdIFRyYWNrIGVycm9yIFwiJHttc2d9XCJgLCAnYmFja2dyb3VuZDogcmVkOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuICAgICAgICAvLyBUT0RPOiBBY3R1YWxseSBzZW5kIHNvbWV0aGluZyB0byBzZXJ2ZXJcbiAgICB9XG5cbiAgICB0cmFja1NlYXJjaChzZWFyY2gsIHJlc3VsdCwgcGFnZU5vKSB7XG4gICAgICAgIGlmICghdGhpcy50cmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHNvbWV0aGluZyBpcyB3cm9uZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0cmFpbFN0ZXAgPSB0aGlzLnRyYWlsW3RoaXMudHJhaWwubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBkdCA9IG5ldyBEYXRlKCkgLSB0cmFpbFN0ZXAudG9UaW1lO1xuICAgICAgICB0aGlzLmxvZyhgJWMgW2xvZ2dpbmdTZXJ2aWNlXSBHb3Qgc2VhcmNoIHJlc3VsdHMgYWZ0ZXIgd2FpdGluZyAke2R0LzEwMDAufSBzZWNzYCwgJ2JhY2tncm91bmQ6IGdyZWVuOyBjb2xvcjogd2hpdGU7IGRpc3BsYXk6IGJsb2NrOycpO1xuICAgICAgICB0aGlzLmxvZygnW2xvZ2dpbmdTZXJ2aWNlXScsIHNlYXJjaCwgcmVzdWx0KTtcblxuICAgICAgICBsZXQgcmVjcyA9IHJlc3VsdC5kYXRhLm1hcCh0aGlzLnNpbXBsaWZ5UmVjb3JkKTtcblxuICAgICAgICBsZXQgZmFjZXRzID0gc2VhcmNoLmZhY2V0cy5tYXAoZmFjZXQgPT4gcGljayhmYWNldCwgW1xuICAgICAgICAgICAgJ25hbWUnLCAgICAgICAgICAgICAgIC8vIGV4OiAnbG9jYWwyMCdcbiAgICAgICAgICAgICd2YWx1ZScsICAgICAgICAgICAgICAvLyBleDogJ0Zpc2tlcidcbiAgICAgICAgICAgICd0eXBlJywgICAgICAgICAgICAgICAvLyBleDogJ2luY2x1ZGUnXG4gICAgICAgICAgICAnbXVsdGlGYWNldEdyb3VwSWQnLCAgLy8gaW50XG4gICAgICAgIF0pKTtcblxuICAgICAgICAvLyAtIE11bHRpcGxlIHF1ZXJ5IHBhcnRzIGFyZSBzcGxpdCBieSBzZW1pY29sb25cbiAgICAgICAgLy8gLSBFYWNoIHBhcnQgY29uc2lzdHMgb2Yge2ZpZWxkfSx7cHJlY2lzaW9ufSx7dGVybX0se29wZXJhdG9yfVxuICAgICAgICAvLyAtIFNlbWljb2xvbnMgYXJlIHN0cmlwcGVkIGZyb20gcXVlcmllcy5cbiAgICAgICAgLy8gLSBDb2xvbnMgYXJlIGluY2x1ZGVkIGFuZCBOT1QgZXNjYXBlZC4gRXhhbXBsZTpcbiAgICAgICAgLy8gICAgICB0aXRsZSxjb250YWlucyxmaXNrZXIsa3JhYmJlcixPUjtjcmVhdG9yLGNvbnRhaW5zLHRvcixOT1Q7YW55LGV4YWN0LGxha3MsQU5EXG4gICAgICAgIC8vIC0gSW4gYWR2YW5jZWQgc2VhcmNoLCB0aGVyZSBpcyBhbHdheXMgYSB0cmFpbGluZyBvcGVyYXRvciwgaW4gc2ltcGxlIHNlYXJjaCBub3QuXG4gICAgICAgIC8vIC0gTWF0ZXJpYWwgdHlwZSwgbGFuZ3VhZ2UgYW5kIGRhdGUgc2VsZWN0ZWQgaW4gYWR2YW5jZWQgc2VhcmNoIGFyZSBpbmNsdWRlZCBhc1xuICAgICAgICAvLyAgIHBhcnQgb2YgdGhlIHF1ZXJ5LCBidXQgcHJlZml4ZWQgd2l0aCBcImZhY2V0X1wiXG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gW10sIHF1ZXJ5X2ZhY2V0cyA9IFtdO1xuXG4gICAgICAgIHNlYXJjaC5xdWVyeS5zcGxpdCgvOy8pLmZvckVhY2goZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgbGV0IGNvbXAgPSB4LnNwbGl0KC8sLyk7XG4gICAgICAgICAgICBsZXQgcmVzO1xuXG4gICAgICAgICAgICBpZiAoY29tcFtjb21wLmxlbmd0aC0xXS5tYXRjaCgvXig/OkFORHxPUnxOT1QpJC8pKSB7XG4gICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcDogY29tcFtjb21wLmxlbmd0aC0xXSxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGNvbXBbMF0sXG4gICAgICAgICAgICAgICAgICAgIHByZWM6IGNvbXBbMV0sXG4gICAgICAgICAgICAgICAgICAgIHRlcm06IGNvbXAuc2xpY2UoMiwgY29tcC5sZW5ndGgtMSkuam9pbignLCcpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3A6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBjb21wWzBdLFxuICAgICAgICAgICAgICAgICAgICBwcmVjOiBjb21wWzFdLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtOiBjb21wLnNsaWNlKDIsIGNvbXAubGVuZ3RoKS5qb2luKCcsJyksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMuZmllbGQubWF0Y2goL15mYWNldF8vKSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5X2ZhY2V0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHJlcy5maWVsZCxcbiAgICAgICAgICAgICAgICAgICAgcHJlYzogcmVzLnByZWMsXG4gICAgICAgICAgICAgICAgICAgIHRlcm06IHJlcy50ZXJtLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSBxdWVyeS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICBxdWVyeVtpXS5vcCA9IHF1ZXJ5W2kgLSAxXS5vcDtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeVswXS5vcCA9IG51bGw7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB0cmFpbFN0ZXA6IHRoaXMudHJhaWwubGVuZ3RoLFxuXG4gICAgICAgICAgICBrZXlwcmVzc2VzOiB0aGlzLmtleXByZXNzZXMsXG4gICAgICAgICAgICBwYXN0ZWQ6IHRoaXMucGFzdGVkLFxuICAgICAgICAgICAgcHJlcFRpbWU6IHRyYWlsU3RlcC50b1RpbWUgLSB0cmFpbFN0ZXAuZnJvbVRpbWUsXG4gICAgICAgICAgICBsb2FkVGltZTogKG5ldyBEYXRlKCkgLSB0cmFpbFN0ZXAudG9UaW1lKSxcbiAgICAgICAgICAgIHZlcnNpb246IHRoaXMucHJpbW9WZXJzaW9uLFxuXG4gICAgICAgICAgICAvLyBTZWFyY2hcbiAgICAgICAgICAgIGFkdmFuY2VkOiBzZWFyY2gubW9kZSA9PSAnYWR2YW5jZWQnLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgcXVlcnlfZmFjZXRzOiBxdWVyeV9mYWNldHMsXG4gICAgICAgICAgICBzY29wZTogc2VhcmNoLnNjb3BlLCAgICAvLyBUcmVuZ2VyIHZpIGLDpWRlIHNjb3BlIG9nIHRhYj9cbiAgICAgICAgICAgIHNvcnQ6IHNlYXJjaC5zb3J0YnksXG4gICAgICAgICAgICBmYWNldHM6IGZhY2V0cyxcblxuICAgICAgICAgICAgLy8gUmVzdWx0c1xuICAgICAgICAgICAgZmlyc3Q6IHBhcnNlSW50KHJlc3VsdC5pbmZvLmZpcnN0KSxcbiAgICAgICAgICAgIGxhc3Q6IHBhcnNlSW50KHJlc3VsdC5pbmZvLmxhc3QpLFxuICAgICAgICAgICAgdG90YWw6IHBhcnNlSW50KHJlc3VsdC5pbmZvLnRvdGFsKSxcbiAgICAgICAgICAgIHJlc3VsdHM6IHJlY3MubWFwKCh4KSA9PiB4LmlkKSxcblxuICAgICAgICAgICAgYWdnczoge1xuICAgICAgICAgICAgICAgIHJlY29yZHM6IHJlY3MubGVuZ3RoLCAgLy8gZ3JlaXQgw6UgaGEgbGV0dCB0aWxnamVuZ2VsaWcgZm9yIMOlIGt1bm5lIHJlZ25lIHByb3NlbnRlclxuICAgICAgICAgICAgICAgIGlzX2xvY2FsOiByZWNzLmZpbHRlcigoeCkgPT4geC5pc19sb2NhbCkubGVuZ3RoLCAgLy8gZm9yIMOlIHNpIG5vZSBvbSBodm9yIG1hbmdlIGF2IHRyZWZmZW5lIHNvbSBlciByZWxldmFudGUgZm9yIGVtbmVzw7hrP1xuICAgICAgICAgICAgICAgIGhhc19kZXdleTogcmVjcy5maWx0ZXIoKHgpID0+IHguZGRjLmxlbmd0aCkubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGhhc19odW1vcmQ6IHJlY3MuZmlsdGVyKCh4KSA9PiB4Lmh1bWUubGVuZ3RoKS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgaGFzX3J0OiByZWNzLmZpbHRlcigoeCkgPT4geC5yZWFsLmxlbmd0aCkubGVuZ3RoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB2YXIgc3VtbWFyeSA9IGAke2RhdGEuc2NvcGV9OiR7ZGF0YS5xdWVyeX06IExvYWRlZCAke2RhdGEucmVzdWx0cy5sZW5ndGh9IG9mICR7ZGF0YS50b3RhbH0gcmVzdWx0cywgb2Ygd2hpY2hcbiAgICAgICAgLy8gICAgICR7ZGF0YS5hZ2dzLmlzX2xvY2FsfSBsb2NhbCAobm9uLVBDSSksICR7ZGF0YS5hZ2dzLmhhc19kZXdleX0gZ290IEREQyxcbiAgICAgICAgLy8gICAgICR7ZGF0YS5hZ2dzLmhhc19odW1vcmR9IGdvdCBIdW1vcmQsICR7ZGF0YS5hZ2dzLmhhc19ydH0gZ290IFJlYWxmYWdzdGVybWVyLmA7XG4gICAgICAgIC8vIFRPRE86IE5vdGlmeSBhcyBldmVudD9cblxuICAgICAgICBsZXQgYWN0aW9uID0gJ3NlYXJjaCc7XG4gICAgICAgIGlmIChnZXQoc2VhcmNoLCAnZmFjZXRzLjAubmFtZScpID09ICdmcmJyZ3JvdXBpZCcpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdleHBhbmRfZnJicl9ncm91cCc7XG4gICAgICAgIH0gZWxzZSBpZiAocGFnZU5vID4gMSkge1xuICAgICAgICAgICAgYWN0aW9uID0gJ2NoYW5nZV9wYWdlJztcbiAgICAgICAgfSBlbHNlIGlmIChmYWNldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAncmVmaW5lbWVudCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoYWN0aW9uLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIEludGVyZmFjZSBmb3IgcHJtU2VhcmNoQmFyQWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIHB1YmxpY1xuICAgIGluaXRTZWFyY2hCYXIoKSB7XG4gICAgICAgIHRoaXMucGFzdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMua2V5cHJlc3NlcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gcHVibGljXG4gICAgaW5jcktleXByZXNzQ291bnQoKSB7XG4gICAgICAgIHRoaXMua2V5cHJlc3NlcysrO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNldFNlYXJjaFN0YXRlU2VydmljZShzZWFyY2hTdGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UgPSBzZWFyY2hTdGF0ZVNlcnZpY2U7XG4gICAgfVxuXG4gICAgLy8gcHVibGljXG4gICAgc2V0UHJpbW9WZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgdGhpcy5wcmltb1ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIHB1YmxpY1xuICAgIHNlYXJjaEJhckVsZW1lbnRQYXN0ZUV2ZW50KCkge1xuICAgICAgICB0aGlzLnBhc3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNlYXJjaFJlc3VsdExpc3RBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBmcm9tIHBybVNlYXJjaFJlc3VsdExpc3RBZnRlciB3aGVuIGFueSBudW1iZXIgb2YgcGFnZXNcbiAgICAgKiBhcmUgbG9hZGVkLiBUaGlzIGFsc28gaW5kaWNhdGVzIHRoYXQgc2VhcmNoIHJlc3VsdHMgYXJlIHJlYWR5LlxuICAgICAqL1xuICAgIHNlYXJjaFBhZ2VMb2FkZWQocGFnZXMpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgaXMgcmVhbGx5IHdyb25nXG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaFN0YXRlU2VydmljZSBub3QgaW5qZWN0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5pc1NlYXJjaEluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugc2VhcmNoIHN0aWxsIGluIHByb2dyZXNzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0U2VhcmNoT2JqZWN0KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5nZXRSZXN1bHRPYmplY3QoKTtcblxuICAgICAgICBpZiAoIXNlYXJjaCB8fCAhcmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaE9iamVjdCBvciByZXN1bHRPYmplY3QgaXMgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja1NlYXJjaChzZWFyY2gsIHJlc3VsdCwgcGFnZXMpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1Ob1NlYXJjaFJlc3VsdEFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBub1Jlc3VsdHNQYWdlTG9hZGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoU3RhdGVTZXJ2aWNlKSB7XG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgaXMgcmVhbGx5IHdyb25nXG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaFN0YXRlU2VydmljZSBub3QgaW5qZWN0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5pc1NlYXJjaEluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgdGhpcy50cmFja0Vycm9yKCdzZWFyY2hTdGF0ZVNlcnZpY2Ugc2VhcmNoIHN0aWxsIGluIHByb2dyZXNzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoID0gdGhpcy5zZWFyY2hTdGF0ZVNlcnZpY2UuZ2V0U2VhcmNoT2JqZWN0KCk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnNlYXJjaFN0YXRlU2VydmljZS5nZXRSZXN1bHRPYmplY3QoKTtcblxuICAgICAgICBpZiAoIXNlYXJjaCB8fCAhcmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrRXJyb3IoJ3NlYXJjaE9iamVjdCBvciByZXN1bHRPYmplY3QgaXMgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja1NlYXJjaChzZWFyY2gsIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybUZ1bGxWaWV3QWZ0ZXJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHRyYWNrVmlld1JlY29yZChyZWNvcmQpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNpbXBsaWZ5UmVjb3JkKHJlY29yZCk7XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgndmlld19yZWNvcmQnLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0cmFja1NlbmRUbyhzZXJ2aWNlTmFtZSwgcmVjb3JkKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgc2VydmljZTogc2VydmljZU5hbWUsXG4gICAgICAgICAgICByZWM6IHRoaXMuc2ltcGxpZnlSZWNvcmQocmVjb3JkKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFja0V2ZW50KCdzZW5kX3RvJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbnRlcmZhY2UgZm9yIHBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICB0cmFja1BpblJlY29yZChyZWNvcmQpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNpbXBsaWZ5UmVjb3JkKHJlY29yZCk7XG4gICAgICAgIHRoaXMudHJhY2tFdmVudCgncGluX3JlY29yZCcsIGRhdGEpO1xuICAgIH1cblxuICAgIHRyYWNrVW5waW5SZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zaW1wbGlmeVJlY29yZChyZWNvcmQpO1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ3VucGluX3JlY29yZCcsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogSW50ZXJmYWNlIGZvciBwcm1TZWFyY2hBZnRlclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdHJhY2tIb21lKCkge1xuICAgICAgICB0aGlzLnRyYWNrRXZlbnQoJ2dvdG9faG9tZScsIHt9KTtcbiAgICB9XG5cbn1cblxuTG9nZ2luZ1NlcnZpY2UuJGluamVjdCA9IFsnJHJvb3RTY29wZSddO1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnaW5nU2VydmljZTtcbiIsImltcG9ydCB2aWV3TmFtZSBmcm9tICcuL3ZpZXdOYW1lJztcbmltcG9ydCBMb2dnaW5nU2VydmljZSBmcm9tICcuL2xvZ2dpbmcuc2VydmljZSc7XG5cbmltcG9ydCBwcm1BY3Rpb25MaXN0QWZ0ZXIgZnJvbSAnLi9wcm1BY3Rpb25MaXN0QWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyIGZyb20gJy4vcHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybUV4cGxvcmVNYWluQWZ0ZXIgZnJvbSAnLi9wcm1FeHBsb3JlTWFpbkFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtRnVsbFZpZXdBZnRlciBmcm9tICcuL3BybUZ1bGxWaWV3QWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1Ob1NlYXJjaFJlc3VsdEFmdGVyIGZyb20gJy4vcHJtTm9TZWFyY2hSZXN1bHRBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyQ29tcG9uZW50IGZyb20gJy4vcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXIuY29tcG9uZW50JztcbmltcG9ydCBwcm1TZWFyY2hBZnRlckNvbXBvbmVudCBmcm9tICcuL3BybVNlYXJjaEFmdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgcHJtU2VhcmNoQmFyQWZ0ZXJDb25maWcgZnJvbSAnLi9wcm1TZWFyY2hCYXJBZnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHBybVNlYXJjaFJlc3VsdExpc3RBZnRlciBmcm9tICcuL3BybVNlYXJjaFJlc3VsdExpc3RBZnRlci5jb21wb25lbnQnO1xuXG5jb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndmlld0N1c3RvbScsIFsnYW5ndWxhckxvYWQnXSk7XG5cbmFwcC5zZXJ2aWNlKCdsb2dnaW5nU2VydmljZScsIExvZ2dpbmdTZXJ2aWNlKTtcblxuYXBwLmNvbXBvbmVudCgncHJtQWN0aW9uTGlzdEFmdGVyJywgcHJtQWN0aW9uTGlzdEFmdGVyKTtcbmFwcC5jb21wb25lbnQoJ3BybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXInLCBwcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyKTtcbmFwcC5jb21wb25lbnQoJ3BybUV4cGxvcmVNYWluQWZ0ZXInLCBwcm1FeHBsb3JlTWFpbkFmdGVyKTtcbmFwcC5jb21wb25lbnQoJ3BybUZ1bGxWaWV3QWZ0ZXInLCBwcm1GdWxsVmlld0FmdGVyKTtcbmFwcC5jb21wb25lbnQoJ3BybU5vU2VhcmNoUmVzdWx0QWZ0ZXInLCBwcm1Ob1NlYXJjaFJlc3VsdEFmdGVyKTtcbmFwcC5jb21wb25lbnQoJ3BybVNhdmVUb0Zhdm9yaXRlc0J1dHRvbkFmdGVyJywgcHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb21wb25lbnQpO1xuYXBwLmNvbXBvbmVudCgncHJtU2VhcmNoQWZ0ZXInLCBwcm1TZWFyY2hBZnRlckNvbXBvbmVudCk7XG5hcHAuY29tcG9uZW50KCdwcm1TZWFyY2hCYXJBZnRlcicsIHBybVNlYXJjaEJhckFmdGVyQ29uZmlnKTtcbmFwcC5jb21wb25lbnQoJ3BybVNlYXJjaFJlc3VsdExpc3RBZnRlcicsIHBybVNlYXJjaFJlc3VsdExpc3RBZnRlcik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmFwcC5ydW4oWyckcm9vdFNjb3BlJywgJ2xvZ2dpbmdTZXJ2aWNlJywgKCRyb290U2NvcGUsIGxvZ2dpbmdTZXJ2aWNlKSA9PiB7XG4gICAgLy8gV0FSTklORzogVGhpcyBtaWdodCBub3QgYmUgY2FsbGVkIGlmIFByaW1vIGVycm9ycy4uXG4gICAgLy8gQ29tcG9uZW50cyBtYXkgc3RpbGwgYmUgaW5pdGlhbGl6ZWRcbiAgICAkcm9vdFNjb3BlLnZpZXdOYW1lID0gdmlld05hbWU7XG59XSk7XG4iLCJcbmNsYXNzIFBybUFjdGlvbkxpc3RBZnRlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGxvZ2dpbmdTZXJ2aWNlLCAkZG9jdW1lbnQsICRlbGVtZW50KSB7XG4gICAgICAgIC8vIE5vdGU6IGFjdGlvbiBsaXN0IGNhbiBiZSBwYXJ0IG9mIHJlc3VsdHMgbGlzdCBPUiByZWNvcmQgdmlldy5cbiAgICAgICAgJGRvY3VtZW50LnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gJGVsZW1lbnQucGFyZW50KClbMF07XG4gICAgICAgICAgICBsZXQgYnRucyA9IGFuZ3VsYXIuZWxlbWVudChwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzY3JvbGxBY3Rpb25MaXN0IGJ1dHRvbicpKTtcblxuICAgICAgICAgICAgaWYgKCFidG5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiBObyBhY3Rpb24gYnV0dG9ucyBmb3VuZCEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnRucy5vbignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbmRUb1R5cGUgPSBldnQuY3VycmVudFRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKCcuYnV0dG9uLXRleHQnKVswXS5nZXRBdHRyaWJ1dGUoJ3RyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5wYXJlbnRDdHJsLml0ZW07XG4gICAgICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2UudHJhY2tTZW5kVG8oc2VuZFRvVHlwZSwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5Qcm1BY3Rpb25MaXN0QWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2xvZ2dpbmdTZXJ2aWNlJywgJyRkb2N1bWVudCcsICckZWxlbWVudCddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybUFjdGlvbkxpc3RBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIlxuY2xhc3MgUHJtQnJpZWZSZXN1bHRDb250YWluZXJBZnRlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBsZXQgaXRlbSA9IHRoaXMucGFyZW50Q3RybC5pdGVtO1xuICAgICAgICAvL2xvZ2dpbmdTZXJ2aWNlLnRyYWNrVmlld1JlY29yZChpdGVtKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2JyaWVmIHJlc3VsdCcsIHRoaXMucGFyZW50Q3RybClcblxuICAgICAgICAvLyAkZG9jdW1lbnQucmVhZHkoKCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ0dOVScsIHRoaXMpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG59XG5cblBybUJyaWVmUmVzdWx0Q29udGFpbmVyQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1CcmllZlJlc3VsdENvbnRhaW5lckFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiXG5jbGFzcyBQcm1FeHBsb3JlTWFpbkFmdGVyQ29udHJvbGxlciB7XG59XG5cblBybUV4cGxvcmVNYWluQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1FeHBsb3JlTWFpbkFmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiXG5jbGFzcyBQcm1GdWxsVmlld0FmdGVyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IobG9nZ2luZ1NlcnZpY2UpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhcmVudEN0cmwuaXRlbTtcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2UudHJhY2tWaWV3UmVjb3JkKGl0ZW0pO1xuICAgIH1cbn1cblxuUHJtRnVsbFZpZXdBZnRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnbG9nZ2luZ1NlcnZpY2UnXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1GdWxsVmlld0FmdGVyQ29udHJvbGxlcixcbiAgICB0ZW1wbGF0ZTogJycsXG59O1xuIiwiLyoqXG4gKiBBZG9wdGVkIGZyb20gYSB2ZXJzaW9uIGJ5IEBTYXJhaFp1bVxuICogaHR0cHM6Ly9naXRodWIuY29tL1NhcmFoWnVtL3ByaW1vLWV4cGxvcmUtY3VzdG9tLW5vLXJlc3VsdHNcbiAqL1xuXG5jbGFzcyBQcm1Ob1NlYXJjaFJlc3VsdEFmdGVyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IobG9nZ2luZ1NlcnZpY2UpIHtcbiAgICAgICAgbG9nZ2luZ1NlcnZpY2Uubm9SZXN1bHRzUGFnZUxvYWRlZCgpO1xuXG4gICAgICAgIC8vIHZhciB2bSA9IHRoaXM7XG4gICAgICAgIC8vIHZtLnBjaVNldHRpbmcgPSB2bS5wYXJlbnRDdHJsLnNlYXJjaFN0YXRlU2VydmljZS5zZWFyY2hPYmplY3QucGNBdmFpbGFiaWxpdHkgfHwgJyc7XG4gICAgICAgIC8vIGNvbmRvbGUubG9nKHZtLnBhcmVudEN0cmwuc2VhcmNoU3RhdGVTZXJ2aWNlLnNlYXJjaE9iamVjdCk7XG4gICAgICAgIC8vIHZtLmdldFNlYXJjaFRlcm0gPSBmdW5jdGlvbiBnZXRTZWFyY2hUZXJtKCkge1xuICAgICAgICAvLyAgIHJldHVybiB2bS5wYXJlbnRDdHJsLnRlcm07XG4gICAgICAgIC8vIH07XG4gICAgfVxufVxuXG5Qcm1Ob1NlYXJjaFJlc3VsdEFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWydsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybU5vU2VhcmNoUmVzdWx0QWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG5cbi8vIGV4cG9ydCBkZWZhdWx0IHtcbi8vICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuLy8gICBjb250cm9sbGVyOiBQcm1Ob1NlYXJjaFJlc3VsdEFmdGVyQ29udHJvbGxlcixcbi8vICAgY29udHJvbGxlckFzOiAndm0nLFxuLy8gICB0ZW1wbGF0ZTogYFxuLy8gICAgIDxtZC1jYXJkIGNsYXNzPVwiZGVmYXVsdC1jYXJkIHplcm8tbWFyZ2luIF9tZCBtZC1wcmltb0V4cGxvcmUtdGhlbWVcIj5cbi8vICAgICA8bWQtY2FyZC10aXRsZT5cbi8vICAgICAgIDxtZC1jYXJkLXRpdGxlLXRleHQ+XG4vLyAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibWQtaGVhZGxpbmUgbmctc2NvcGVcIj5ObyByZWNvcmRzIGZvdW5kPC9zcGFuPlxuLy8gICAgICAgPC9tZC1jYXJkLXRpdGxlLXRleHQ+XG4vLyAgICAgPC9tZC1jYXJkLXRpdGxlPlxuLy8gICAgIDxtZC1jYXJkLWNvbnRlbnQ+XG4vLyAgICAgICA8cD5cbi8vICAgICAgICAgPHNwYW4+VGhlcmUgYXJlIG5vIHJlc3VsdHMgbWF0Y2hpbmcgeW91ciBzZWFyY2g6PGJsb2NrcXVvdGU+XG4vLyAgICAgICAgICAgPGk+e3skY3RybC5nZXRTZWFyY2hUZXJtKCl9fTwvaT4uPC9ibG9ja3F1b3RlPlxuLy8gICAgICAgICAgIDxkaXYgbmctaWY9XCIkY3RybC5wY2lTZXR0aW5nICE9PSBcXCd0cnVlXFwnXCI+XG4vLyAgICAgICAgICAgICA8YSBocmVmPVwiL3ByaW1vLWV4cGxvcmUvc2VhcmNoP3F1ZXJ5PWFueSxjb250YWlucyx7eyRjdHJsLmdldFNlYXJjaFRlcm0oKX19JnRhYj1kZWZhdWx0X3RhYiZzZWFyY2hfc2NvcGU9RXZlcnl0aGluZyZ2aWQ9MDFCUkNfU09DJm9mZnNldD0wJnNvcnRieT1yYW5rJnBjQXZhaWxhYmlsaXR5PXRydWVcIj5cbi8vICAgICAgICAgICAgICAgPGI+VHJ5IGFnYWluIHNlYXJjaGluZyBpdGVtcyBoZWxkIGF0IG90aGVyIGxpYnJhcmllcz88L2I+XG4vLyAgICAgICAgICAgICA8L2E+XG4vLyAgICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIDwvc3Bhbj5cbi8vICAgICAgIDwvcD5cbi8vICAgICAgIDxwPlxuLy8gICAgICAgICA8c3BhbiB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cImJvbGQtdGV4dCBuZy1zY29wZVwiPlN1Z2dlc3Rpb25zOjwvc3Bhbj5cbi8vICAgICAgIDwvcD5cbi8vICAgICAgIDx1bD5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5NYWtlIHN1cmUgdGhhdCBhbGwgd29yZHMgYXJlIHNwZWxsZWQgY29ycmVjdGx5LjwvbGk+XG4vLyAgICAgICAgIDxsaSB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm5nLXNjb3BlXCI+VHJ5IGEgZGlmZmVyZW50IHNlYXJjaCBzY29wZS48L2xpPlxuLy8gICAgICAgICA8bGkgdHJhbnNsYXRlPVwiXCIgY2xhc3M9XCJuZy1zY29wZVwiPlRyeSBkaWZmZXJlbnQgc2VhcmNoIHRlcm1zLjwvbGk+XG4vLyAgICAgICAgIDxsaSB0cmFuc2xhdGU9XCJcIiBjbGFzcz1cIm5nLXNjb3BlXCI+VHJ5IG1vcmUgZ2VuZXJhbCBzZWFyY2ggdGVybXMuPC9saT5cbi8vICAgICAgICAgPGxpIHRyYW5zbGF0ZT1cIlwiIGNsYXNzPVwibmctc2NvcGVcIj5UcnkgZmV3ZXIgc2VhcmNoIHRlcm1zLjwvbGk+XG4vLyAgICAgICA8L3VsPlxuLy8gICAgICAgPHA+XG4vLyAgICAgICAgIDxiPlxuLy8gICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3N0b2xhZi5vbi53b3JsZGNhdC5vcmcvc2VhcmNoP3F1ZXJ5U3RyaW5nPWt3Ont7JGN0cmwuZ2V0U2VhcmNoVGVybSgpfX0mZGF0YWJhc2VMaXN0PTI4M1wiPlNlYXJjaCBXb3JsZENhdDwvYT5cbi8vICAgICAgICAgPC9iPlxuLy8gICAgICAgPC9wPlxuLy8gICAgICAgPHA+XG4vLyAgICAgICAgIDxiPlxuLy8gICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5zdG9sYWYuZWR1L2xpYnJhcnkvcmVzZWFyY2gvc3R1ZGVudHMuY2ZtXCI+Q29udGFjdCBhIFJlc2VhcmNoIExpYnJhcmlhbiBmb3IgQXNzaXN0YW5jZTwvYT5cbi8vICAgICAgICAgPC9iPlxuLy8gICAgICAgPC9wPlxuLy8gICAgIDwvbWQtY2FyZC1jb250ZW50PlxuLy8gICA8L21kLWNhcmQ+XG4vLyAgIGBcbi8vIH1cbiIsIlxuY2xhc3MgUHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCR0aW1lb3V0LCAkZWxlbWVudCwgbG9nZ2luZ1NlcnZpY2UpIHtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UgPSBsb2dnaW5nU2VydmljZTtcbiAgICB9XG5cbiAgICAkcG9zdExpbmsoKSB7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LnBhcmVudCgpWzBdO1xuXG5cbiAgICAgICAgICAgIHZhciBwaW5CdG4gPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5waW4tYnV0dG9uJyksXG4gICAgICAgICAgICAgICAgdW5waW5CdG4gPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi51bnBpbi1idXR0b24nKTtcblxuICAgICAgICAgICAgLy8gTGltaXRhdGlvbjogVGhpcyB3aWxsIG9ubHkgc2F2ZSB0aGUgZmlyc3QgY2xpY2ssIHNpbmNlIHRoZW4gdGhlXG4gICAgICAgICAgICAvLyBidXR0b24gaXMgcmVwbGFjZWQgd2l0aCBhbm90aGVyIGJ1dHRvbiBlbGVtZW50LiBXZSBjb3VsZCBhZGQgYVxuICAgICAgICAgICAgLy8gRE9NIHdhdGNoZXIsIGJ1dCBpdCdzIG5vdCB3b3J0aCBpdCBJIHRoaW5rLlxuICAgICAgICAgICAgaWYgKHBpbkJ0bikge1xuICAgICAgICAgICAgICAgIHBpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS50cmFja1BpblJlY29yZCh0aGlzLnBhcmVudEN0cmwuaXRlbSk7XG4gICAgICAgICAgICAgICAgfSwge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRydWV9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5waW5CdG4pIHtcbiAgICAgICAgICAgICAgICB1bnBpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS50cmFja1VucGluUmVjb3JkKHRoaXMucGFyZW50Q3RybC5pdGVtKTtcbiAgICAgICAgICAgICAgICB9LCB7cGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyR0aW1lb3V0JywgJyRlbGVtZW50JywgJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtU2F2ZVRvRmF2b3JpdGVzQnV0dG9uQWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCJjbGFzcyBQcm1TZWFyY2hBZnRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkY29tcGlsZSwgJHRpbWVvdXQsICRkb2N1bWVudCwgbG9nZ2luZ1NlcnZpY2UpIHtcbiAgICAgICAgJGRvY3VtZW50LnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgIC8vIE5vdGU6IEF0IHRoaXMgcG9pbnQsIHRoZSBmcm9udHBhZ2UgSFRNTCB0ZW1wbGF0ZSBtaWdodCBub3QgeWV0IGJlIHJlYWR5LlxuICAgICAgICAgICAgLy8gV2Ugc2VlIHRoaXMgcHJvYmxlbSBlc3BlY2lhbGx5IGluIEZpcmVmb3ggZm9yIHNvbWUgcmVhc29uLiBVbnRpbCB3ZSBmaW5kIGEgYmV0dGVyXG4gICAgICAgICAgICAvLyB3YXkgdG8gZGV0ZWN0IHdoZW4gdGhlIHRlbXBsYXRlIGlzIGxvYWRlZCwgd2UgdXNlIGEgdGltZW91dCBvZiAxMDAgbXNlY3MuXG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvb3RlciA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWlvLWZvb3RlcicpKSxcbiAgICAgICAgICAgICAgICAgICAgcHJtU2VhcmNoQWZ0ZXJFbCA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwcm0tc2VhcmNoLWFmdGVyJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvb3Rlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgYXJlIG9uIHRoZSBmcm9udCBwYWdlLiBNb3ZlIGZvb3RlciB0byBvdXIgc2NvcGUgYW5kIG1ha2UgaXQgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICBwcm1TZWFyY2hBZnRlckVsLmFwcGVuZChmb290ZXIuZGV0YWNoKCkuYWRkQ2xhc3MoJ3Zpc2libGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmbkxpbmsgPSAkY29tcGlsZShmb290ZXIpOyAgICAgIC8vIHJldHVybnMgYSBMaW5rIGZ1bmN0aW9uIHVzZWQgdG8gYmluZCB0ZW1wbGF0ZSB0byB0aGUgc2NvcGVcbiAgICAgICAgICAgICAgICAgICAgZm5MaW5rKCRzY29wZSk7ICAgICAgICAgICAgICAgICAgICAgLy8gQmluZCBzY29wZSB0byB0aGUgdGVtcGxhdGVcblxuICAgICAgICAgICAgICAgICAgICBsb2dnaW5nU2VydmljZS50cmFja0hvbWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblBybVNlYXJjaEFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbXBpbGUnLCAnJHRpbWVvdXQnLCAnJGRvY3VtZW50JywgJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sXG4gICAgY29udHJvbGxlcjogUHJtU2VhcmNoQWZ0ZXJDb250cm9sbGVyLFxuICAgIHRlbXBsYXRlOiAnJyxcbn07XG4iLCJpbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xuXG5jbGFzcyBQcm1TZWFyY2hCYXJBZnRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCAkd2luZG93LCAkZWxlbWVudCwgJHRpbWVvdXQsICRkb2N1bWVudCwgJHJvb3RTY29wZSwgbG9nZ2luZ1NlcnZpY2UpIHtcblxuICAgICAgICBsZXQgcHJpbW9WZXJzaW9uID0gZ2V0KCR3aW5kb3cuYXBwQ29uZmlnLCAnc3lzdGVtLWNvbmZpZ3VyYXRpb24uUHJpbW9fVmVyc2lvbl9OdW1iZXInLCAndW5rbm93bicpO1xuICAgICAgICBsZXQgc2VhcmNoU3RhdGVTZXJ2aWNlID0gdGhpcy5wYXJlbnRDdHJsLnNlYXJjaFNlcnZpY2Uuc2VhcmNoU3RhdGVTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGxvZ2dpbmdTZXJ2aWNlO1xuXG4gICAgICAgIC8vIEluamVjdCBQcmltbydzIHNlYXJjaFN0YXRlU2VydmljZSBpbnRvIG91ciBsb2dnaW5nU2VydmljZVxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnNldFNlYXJjaFN0YXRlU2VydmljZShzZWFyY2hTdGF0ZVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLnNldFByaW1vVmVyc2lvbihwcmltb1ZlcnNpb24pO1xuXG4gICAgICAgIHRoaXMucGFzdGVFdmVudEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2Uuc2VhcmNoQmFyRWxlbWVudFBhc3RlRXZlbnQoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmluY3JLZXlwcmVzc0NvdW50KCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmluaXRTZWFyY2hCYXIoKTtcbiAgICAgICAgJGRvY3VtZW50LnJlYWR5KCgpID0+IHtcblxuICAgICAgICAgICAgLy8gTm90ZTogbWFpblNlYXJjaEZpZWxkIGFsc28gbWFwcyB0byB0aGUgZmlyc3QgaW5wdXQgZmllbGQgb24gYWR2YW5jZWQgc2VhcmNoXG4gICAgICAgICAgICAvLyB0aGlzLiRzY29wZS4kd2F0Y2goJyRjdHJsLnBhcmVudEN0cmwubWFpblNlYXJjaEZpZWxkJywgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGlmIChuZXdWYWx1ZSAhPSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmluY3JLZXlwcmVzc0NvdW50KCk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiR3YXRjaCgnJGN0cmwucGFyZW50Q3RybC5hZHZhbmNlZFNlYXJjaCcsIChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHRoaXMuJGVsZW1lbnQucGFyZW50KClbMF07XG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEJhckVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2hCYXInKTtcblxuICAgICAgICAgICAgICAgIC8vIEZvY3VzIG9uIHRoZSBzZWFyY2ggYmFyLCBpZiBpdCBleGlzdHMuXG4gICAgICAgICAgICAgICAgLy8gTm90ZSB0aGF0LCB3aGVuIHRoZSBsYW5ndWFnZSBpcyBjaGFuZ2VkLFxuICAgICAgICAgICAgICAgIC8vIHRoZSBzZWFyY2ggYmFyIGlzIG5vdCBhdmFpbGFibGUgeWV0IGhlcmUuXG4gICAgICAgICAgICAgICAgLy8gV2UgY2FuIHdhdGNoIGZvciB0aGUgZWxlbWVudCBhbmQgdGhlbiBmb2N1cyBvbiBpdCxcbiAgICAgICAgICAgICAgICAvLyBidXQgaXQgZG9lcyBub3Qgc2VlbSB0byB3b3J0aCBpdC5cbiAgICAgICAgICAgICAgICBpZiAoc2VhcmNoQmFyRWxlbWVudCAmJiAhb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4gc2VhcmNoQmFyRWxlbWVudC5mb2N1cygpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0RWxlbXMgPSBhbmd1bGFyLmVsZW1lbnQocGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKTtcblxuICAgICAgICAgICAgICAgICRpbnB1dEVsZW1zLm9mZigncGFzdGUnLCB0aGlzLnBhc3RlRXZlbnRIYW5kbGVyKTsgLy8gVG8gbWFrZSBzdXJlIHdlIGRvbid0IGVuZCB1cCB3aXRoIGRvdWJsZSBoYW5kbGVyc1xuICAgICAgICAgICAgICAgICRpbnB1dEVsZW1zLm9uKCdwYXN0ZScsIHRoaXMucGFzdGVFdmVudEhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgJGlucHV0RWxlbXMub2ZmKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKTsgIC8vIFRvIG1ha2Ugc3VyZSB3ZSBkb24ndCBlbmQgdXAgd2l0aCBkb3VibGUgaGFuZGxlcnNcbiAgICAgICAgICAgICAgICAkaW5wdXRFbGVtcy5vbignaW5wdXQnLCB0aGlzLmlucHV0SGFuZGxlcik7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAvLyBDYWxsZWQgYWZ0ZXIgdGhpcyBjb250cm9sbGVyJ3MgZWxlbWVudCBhbmQgaXRzIGNoaWxkcmVuIGhhdmUgYmVlbiBsaW5rZWQuXG4gICAgLy8gJHBvc3RMaW5rKCkge1xuICAgIC8vICAgICAvLyBGb2N1cyBpbnB1dCBmaWVsZCBvbiBsb2FkLiBBZGFwdGVkIGZyb20gYSB2ZXJzaW9uIGJ5IEBtdXJhdHNleWhhblxuICAgIC8vICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vRGV0LUtvbmdlbGlnZS1CaWJsaW90ZWsvcHJpbW8tZXhwbG9yZS1yZXgvY29tbWl0Lzg2NDMyZTY4ZTMxM2E0M2RiMWYwMWEzYTI1MTY1MmY4NDk1MmQ1YTZcbiAgICAvLyAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XG4gICAgLy8gICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHRoaXMuJGVsZW1lbnQucGFyZW50KCk7XG4gICAgLy8gICAgICAgICBsZXQgc2VhcmNoQmFyRWxlbWVudCA9IHBhcmVudEVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignI3NlYXJjaEJhcicpO1xuXG4gICAgLy8gICAgICAgICAvLyBGb2N1cyBvbiB0aGUgc2VhcmNoIGJhciwgaWYgaXQgZXhpc3RzLlxuICAgIC8vICAgICAgICAgLy8gTm90ZSB0aGF0LCB3aGVuIHRoZSBsYW5ndWFnZSBpcyBjaGFuZ2VkLFxuICAgIC8vICAgICAgICAgLy8gdGhlIHNlYXJjaCBiYXIgaXMgbm90IGF2YWlsYWJsZSB5ZXQgaGVyZS5cbiAgICAvLyAgICAgICAgIC8vIFdlIGNhbiB3YXRjaCBmb3IgdGhlIGVsZW1lbnQgYW5kIHRoZW4gZm9jdXMgb24gaXQsXG4gICAgLy8gICAgICAgICAvLyBidXQgaXQgZG9lcyBub3Qgc2VlbSB0byB3b3J0aCBpdC5cbiAgICAvLyAgICAgICAgIGlmIChzZWFyY2hCYXJFbGVtZW50KSB7XG4gICAgLy8gICAgICAgICAgICAgc2VhcmNoQmFyRWxlbWVudC5mb2N1cygpO1xuXG4gICAgLy8gICAgICAgICAgICAgc2VhcmNoQmFyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsICgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5zZWFyY2hCYXJFbGVtZW50UGFzdGVFdmVudCgpO1xuICAgIC8vICAgICAgICAgICAgIH0sIHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0cnVlfSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0sIDApO1xuICAgIC8vIH1cblxuICAgIC8vIENoYW5nZSBwbGFjZWhvbGRlciB0ZXh0IChuZWVkcyBvcHRpbWl6YXRpb24gSSB0aGluaylcbiAgICAvLyBieSBBbGV4IFJTOiBodHRwOi8vc2VhcmNoLXRlc3QubGlicmFyeS5icmFuZGVpcy5lZHUvcHJpbW8tZXhwbG9yZS9zZWFyY2g/dmlkPUJSQU5EVEVTVFxuICAgIC8vIHZhciBteVZhciA9IHNldEludGVydmFsKGZ1bmN0aW9uKHBhcmVudEN0cmwpIHtcbiAgICAvLyAgICAgcGFyZW50Q3RybC5fcGxhY2VIb2xkZXJUZXh0ID0gY2FsY3VsYXRlUGxhY2VIb2xkZXJUZXh0KHBhcmVudEN0cmwuX3NlbGVjdGVkVGFiKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJwbGFjZWhvbGRlciBjaGFuZ2VkXCIpO1xuICAgIC8vIH0sIDEwMCwgdGhpcy5wYXJlbnRDdHJsKTtcblxuICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oIG15SW50ZXJ2YWxJRCApIHtcbiAgICAvLyAgICAgY2xlYXJJbnRlcnZhbChteUludGVydmFsSUQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInBsYWNlaG9sZGVyIGludGVydmFsIGNsZWFyZWRcIik7XG4gICAgLy8gfSwgNTAwMCwgbXlWYXIpO1xuXG4gICAgLy8gJHNjb3BlLiR3YXRjaChcIiRwYXJlbnQuJGN0cmwuX3NlbGVjdGVkVGFiXCIsIGZ1bmN0aW9uKG5ld1RhYiwgb2xkVGFiKSB7XG4gICAgLy8gICAgICRzY29wZS4kcGFyZW50LiRjdHJsLl9wbGFjZUhvbGRlclRleHQgPSBjYWxjdWxhdGVQbGFjZUhvbGRlclRleHQobmV3VGFiKTtcbiAgICAvLyB9KTtcblxuICAgIC8vIGZ1bmN0aW9uIGNhbGN1bGF0ZVBsYWNlSG9sZGVyVGV4dCAobXlUYWIpIHtcbiAgICAvLyAgICAgc3dpdGNoIChteVRhYikge1xuICAgIC8vICAgICAgICAgY2FzZSBcInBjaVwiOlxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBcIkZpbmQgYXJ0aWNsZXMgYW5kIG90aGVyIG1hdGVyaWFscyBmcm9tIHNjaG9sYXJseSBqb3VybmFscywgbmV3c3BhcGVycywgYW5kIG9ubGluZSBjb2xsZWN0aW9uc1wiO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcImFsbWFcIjpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJGaW5kIGJvb2tzLCBtb3ZpZXMsIG11c2ljLCBzZXJpYWxzLCBldGNcIjtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJldmVyeXRoaW5nXCI6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIFwiRmluZCBBTEwga2luZHMgb2YgbGlicmFyeSByZXNvdXJjZXMgKGJvb2tzLCBtb3ZpZXMsIGpvdXJuYWwgYXJ0aWNsZXMsIGV0YylcIjtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJjb3Vyc2VcIjpcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gXCJGaW5kIGJvb2tzICYgbWVkaWEgb24gcmVzZXJ2ZSBmb3IgeW91ciBjbGFzcy5cIjtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGRlZmF1bHQ6XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIFwidW5rbm93bi10YWIgcGxhY2Vob2xkZXJcIjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbn1cblxuUHJtU2VhcmNoQmFyQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckd2luZG93JywgJyRlbGVtZW50JywgJyR0aW1lb3V0JywgJyRkb2N1bWVudCcsICckcm9vdFNjb3BlJywgJ2xvZ2dpbmdTZXJ2aWNlJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvLyBUaGUgPCBzeW1ib2wgZGVub3RlcyBvbmUtd2F5IGJpbmRpbmdzIHdoaWNoIGFyZSBhdmFpbGFibGUgc2luY2UgMS41LlxuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcbiAgICBjb250cm9sbGVyOiBQcm1TZWFyY2hCYXJBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIlxuY2xhc3MgUHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigkd2luZG93LCAkc2NvcGUsIGxvZ2dpbmdTZXJ2aWNlKSB7XG4gICAgICAgICRzY29wZS4kd2F0Y2goJyRjdHJsLnBhcmVudEN0cmwubnVtT2ZMb2FkZWRQYWdlcycsIChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2luZ1NlcnZpY2Uuc2VhcmNoUGFnZUxvYWRlZChuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuUHJtU2VhcmNoUmVzdWx0TGlzdEFmdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gWyckd2luZG93JywgJyRzY29wZScsICdsb2dnaW5nU2VydmljZSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxuICAgIGNvbnRyb2xsZXI6IFBybVNlYXJjaFJlc3VsdExpc3RBZnRlckNvbnRyb2xsZXIsXG4gICAgdGVtcGxhdGU6ICcnLFxufTtcbiIsIi8vIERlZmluZSB0aGUgdmlldyBuYW1lIGhlcmUuXG5jb25zdCB2aWV3TmFtZSA9ICdVSU8nO1xuZXhwb3J0IGRlZmF1bHQgdmlld05hbWU7XG4iXX0=
