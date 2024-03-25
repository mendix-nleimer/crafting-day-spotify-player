
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import * as React from 'react';
import { createElement, memo, forwardRef, useRef, useEffect, useState, PureComponent, createRef, useCallback } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// src/helpers.ts
function isOfType(type) {
  return value => typeof value === type;
}
var isFunction = isOfType("function");
var isNull = value => {
  return value === null;
};
var isRegex = value => {
  return Object.prototype.toString.call(value).slice(8, -1) === "RegExp";
};
var isObject = value => {
  return !isUndefined$1(value) && !isNull(value) && (isFunction(value) || typeof value === "object");
};
var isUndefined$1 = isOfType("undefined");

// src/index.ts
function equalArray(left, right) {
  const {
    length
  } = left;
  if (length !== right.length) {
    return false;
  }
  for (let index = length; index-- !== 0;) {
    if (!equal(left[index], right[index])) {
      return false;
    }
  }
  return true;
}
function equalArrayBuffer(left, right) {
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  const view1 = new DataView(left.buffer);
  const view2 = new DataView(right.buffer);
  let index = left.byteLength;
  while (index--) {
    if (view1.getUint8(index) !== view2.getUint8(index)) {
      return false;
    }
  }
  return true;
}
function equalMap(left, right) {
  if (left.size !== right.size) {
    return false;
  }
  for (const index of left.entries()) {
    if (!right.has(index[0])) {
      return false;
    }
  }
  for (const index of left.entries()) {
    if (!equal(index[1], right.get(index[0]))) {
      return false;
    }
  }
  return true;
}
function equalSet(left, right) {
  if (left.size !== right.size) {
    return false;
  }
  for (const index of left.entries()) {
    if (!right.has(index[0])) {
      return false;
    }
  }
  return true;
}
function equal(left, right) {
  if (left === right) {
    return true;
  }
  if (left && isObject(left) && right && isObject(right)) {
    if (left.constructor !== right.constructor) {
      return false;
    }
    if (Array.isArray(left) && Array.isArray(right)) {
      return equalArray(left, right);
    }
    if (left instanceof Map && right instanceof Map) {
      return equalMap(left, right);
    }
    if (left instanceof Set && right instanceof Set) {
      return equalSet(left, right);
    }
    if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
      return equalArrayBuffer(left, right);
    }
    if (isRegex(left) && isRegex(right)) {
      return left.source === right.source && left.flags === right.flags;
    }
    if (left.valueOf !== Object.prototype.valueOf) {
      return left.valueOf() === right.valueOf();
    }
    if (left.toString !== Object.prototype.toString) {
      return left.toString() === right.toString();
    }
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) {
      return false;
    }
    for (let index = leftKeys.length; index-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(right, leftKeys[index])) {
        return false;
      }
    }
    for (let index = leftKeys.length; index-- !== 0;) {
      const key = leftKeys[index];
      if (key === "_owner" && left.$$typeof) {
        continue;
      }
      if (!equal(left[key], right[key])) {
        return false;
      }
    }
    return true;
  }
  if (Number.isNaN(left) && Number.isNaN(right)) {
    return true;
  }
  return left === right;
}

var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === 'number' && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = areInputsEqual;
  }
  var cache = null;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }
    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult: lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}

var KEBAB_REGEX = /[A-Z]/g;
var hash = function (str) {
  var h = 5381,
    i = str.length;
  while (i) h = h * 33 ^ str.charCodeAt(--i);
  return '_' + (h >>> 0).toString(36);
};
var create = function (config) {
  config = config || {};
  var assign = config.assign || Object.assign;
  var client = typeof window === 'object';

  // Check if we are really in browser environment.
  {
    if (client) {
      if (typeof document !== 'object' || !document.getElementsByTagName('HTML')) {
        console.error('nano-css detected browser environment because of "window" global, but ' + '"document" global seems to be defective.');
      }
    }
  }
  var renderer = assign({
    raw: '',
    pfx: '_',
    client: client,
    assign: assign,
    stringify: JSON.stringify,
    kebab: function (prop) {
      return prop.replace(KEBAB_REGEX, '-$&').toLowerCase();
    },
    decl: function (key, value) {
      key = renderer.kebab(key);
      return key + ':' + value + ';';
    },
    hash: function (obj) {
      return hash(renderer.stringify(obj));
    },
    selector: function (parent, selector) {
      return parent + (selector[0] === ':' ? '' : ' ') + selector;
    },
    putRaw: function (rawCssRule) {
      renderer.raw += rawCssRule;
    }
  }, config);
  if (renderer.client) {
    if (!renderer.sh) document.head.appendChild(renderer.sh = document.createElement('style'));
    {
      renderer.sh.setAttribute('data-nano-css-dev', '');

      // Test style sheet used in DEV mode to test if .insetRule() would throw.
      renderer.shTest = document.createElement('style');
      renderer.shTest.setAttribute('data-nano-css-dev-tests', '');
      document.head.appendChild(renderer.shTest);
    }
    renderer.putRaw = function (rawCssRule) {
      // .insertRule() is faster than .appendChild(), that's why we use it in PROD.
      // But CSS injected using .insertRule() is not displayed in Chrome Devtools,
      // that's why we use .appendChild in DEV.
      {
        // Test if .insertRule() works in dev mode. Unknown pseudo-selectors will throw when
        // .insertRule() is used, but .appendChild() will not throw.
        try {
          renderer.shTest.sheet.insertRule(rawCssRule, renderer.shTest.sheet.cssRules.length);
        } catch (error) {
          if (config.verbose) {
            console.error(error);
          }
        }

        // Insert pretty-printed CSS for dev mode.
        renderer.sh.appendChild(document.createTextNode(rawCssRule));
      }
    };
  }
  renderer.put = function (selector, decls, atrule) {
    var str = '';
    var prop, value;
    var postponed = [];
    for (prop in decls) {
      value = decls[prop];
      if (value instanceof Object && !(value instanceof Array)) {
        postponed.push(prop);
      } else {
        if (!renderer.sourcemaps) {
          str += '    ' + renderer.decl(prop, value, selector, atrule) + '\n';
        } else {
          str += renderer.decl(prop, value, selector, atrule);
        }
      }
    }
    if (str) {
      if (!renderer.sourcemaps) {
        str = '\n' + selector + ' {\n' + str + '}\n';
      } else {
        str = selector + '{' + str + '}';
      }
      renderer.putRaw(atrule ? atrule + '{' + str + '}' : str);
    }
    for (var i = 0; i < postponed.length; i++) {
      prop = postponed[i];
      if (prop[0] === '@' && prop !== '@font-face') {
        renderer.putAt(selector, decls[prop], prop);
      } else {
        renderer.put(renderer.selector(selector, prop), decls[prop], atrule);
      }
    }
  };
  renderer.putAt = renderer.put;
  return renderer;
};

var cache = {};

cache.addon = function (renderer) {
  var cache = {};
  renderer.cache = function (css) {
    if (!css) return '';
    var key = renderer.hash(css);
    if (!cache[key]) {
      cache[key] = renderer.rule(css, key);
    }
    return cache[key];
  };
};

var warnOnMissingDependencies;
var hasRequiredWarnOnMissingDependencies;

function requireWarnOnMissingDependencies () {
	if (hasRequiredWarnOnMissingDependencies) return warnOnMissingDependencies;
	hasRequiredWarnOnMissingDependencies = 1;

	var pkgName = 'nano-css';
	warnOnMissingDependencies = function warnOnMissingDependencies(addon, renderer, deps) {
	  var missing = [];
	  for (var i = 0; i < deps.length; i++) {
	    var name = deps[i];
	    if (!renderer[name]) {
	      missing.push(name);
	    }
	  }
	  if (missing.length) {
	    var str = 'Addon "' + addon + '" is missing the following dependencies:';
	    for (var j = 0; j < missing.length; j++) {
	      str += '\n require("' + pkgName + '/addon/' + missing[j] + '").addon(nano);';
	    }
	    throw new Error(str);
	  }
	};
	return warnOnMissingDependencies;
}

var addonCache = cache.addon;
var addon$5 = function (renderer) {
  if (!renderer.cache) {
    addonCache(renderer);
  }
  {
    requireWarnOnMissingDependencies()('jsx', renderer, ['rule', 'cache']);
  }
  renderer.jsx = function (fn, styles, block) {
    var className;
    var isElement = typeof fn === 'string';

    // In dev mode emit CSS immediately so correct sourcemaps can be generated.
    {
      className = renderer.rule(styles, block);
    }
    var Component = function (props) {
      if (!className) {
        className = renderer.rule(styles, block);
      }
      var copy = props;
      var $as = copy.$as;
      var $ref = copy.$ref;
      {
        copy = renderer.assign({}, props);
      }
      var dynamicClassName = renderer.cache(props.css);
      delete copy.css;
      delete copy.$as;
      if (isElement || $as) {
        delete copy.$ref;
        copy.ref = $ref;
      }
      copy.className = (props.className || '') + className + dynamicClassName;
      return isElement || $as ? renderer.h($as || fn, copy) : fn(copy);
    };
    {
      if (block) {
        Component.displayName = 'jsx(' + block + ')';
      }
    }
    return Component;
  };
};

var addon$4 = function (renderer, config) {
  {
    requireWarnOnMissingDependencies()('keyframes', renderer, ['putRaw', 'put']);
  }
  config = renderer.assign({
    prefixes: ['-webkit-', '-moz-', '-o-', '']
  }, config || {});
  var prefixes = config.prefixes;
  if (renderer.client) {
    // Craete @keyframe Stylesheet `ksh`.
    document.head.appendChild(renderer.ksh = document.createElement('style'));
  }
  var putAt = renderer.putAt;
  renderer.putAt = function (__, keyframes, prelude) {
    // @keyframes
    if (prelude[1] === 'k') {
      var str = '';
      for (var keyframe in keyframes) {
        var decls = keyframes[keyframe];
        var strDecls = '';
        for (var prop in decls) strDecls += renderer.decl(prop, decls[prop]);
        str += keyframe + '{' + strDecls + '}';
      }
      for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        var rawKeyframes = prelude.replace('@keyframes', '@' + prefix + 'keyframes') + '{' + str + '}';
        if (renderer.client) {
          renderer.ksh.appendChild(document.createTextNode(rawKeyframes));
        } else {
          renderer.putRaw(rawKeyframes);
        }
      }
      return;
    }
    putAt(__, keyframes, prelude);
  };
  renderer.keyframes = function (keyframes, block) {
    if (!block) block = renderer.hash(keyframes);
    block = renderer.pfx + block;
    renderer.putAt('', keyframes, '@keyframes ' + block);
    return block;
  };
};

var addon$3 = function (renderer) {
  renderer.selector = function (parentSelectors, selector) {
    var parents = parentSelectors.split(',');
    var result = [];
    var selectors = selector.split(',');
    var len1 = parents.length;
    var len2 = selectors.length;
    var i, j, sel, pos, parent, replacedSelector;
    for (i = 0; i < len2; i++) {
      sel = selectors[i];
      pos = sel.indexOf('&');
      if (pos > -1) {
        for (j = 0; j < len1; j++) {
          parent = parents[j];
          replacedSelector = sel.replace(/&/g, parent);
          result.push(replacedSelector);
        }
      } else {
        for (j = 0; j < len1; j++) {
          parent = parents[j];
          if (parent) {
            result.push(parent + ' ' + sel);
          } else {
            result.push(sel);
          }
        }
      }
    }
    return result.join(',');
  };
};

var addon$2 = function (renderer) {
  {
    requireWarnOnMissingDependencies()('rule', renderer, ['put']);
  }
  var blocks;
  {
    blocks = {};
  }
  renderer.rule = function (css, block) {
    // Warn user if CSS selectors clash.
    {
      if (block) {
        if (typeof block !== 'string') {
          throw new TypeError('nano-css block name must be a string. ' + 'For example, use nano.rule({color: "red", "RedText").');
        }
        if (blocks[block]) {
          console.error('Block name "' + block + '" used more than once.');
        }
        blocks[block] = 1;
      }
    }
    block = block || renderer.hash(css);
    block = renderer.pfx + block;
    renderer.put('.' + block, css);
    return ' ' + block;
  };
};

var addon$1 = function (renderer) {
  {
    requireWarnOnMissingDependencies()('style', renderer, ['jsx']);
  }
  renderer.style = function (fn, styles, dynamicTemplate, block) {
    var jsxComponent = renderer.jsx(fn, styles, block);
    var Component = function (props) {
      var copy = props;
      {
        copy = Object.assign({}, props);
      }
      if (dynamicTemplate) {
        copy.css = dynamicTemplate(props);
      }
      return jsxComponent(copy);
    };
    {
      if (block || typeof fn === 'function') {
        Component.displayName = 'style(' + (block || fn.displayName || fn.name) + ')';
      }
    }
    return Component;
  };
};

var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',
// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
var addon = function (renderer) {
  {
    requireWarnOnMissingDependencies()('styled', renderer, ['style']);
  }
  var styled = function (tag) {
    return function (styles, dynamicTemplate, block) {
      return renderer.style(tag, styles, dynamicTemplate, block);
    };
  };
  var tag;
  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];
    styled[tag] = styled(tag);
  }
  renderer.styled = styled;
};

/**
 * Special values that tell deepmerge to perform a certain action.
 */
const actions = {
  defaultMerge: Symbol("deepmerge-ts: default merge"),
  skip: Symbol("deepmerge-ts: skip")
};
/**
 * Special values that tell deepmergeInto to perform a certain action.
 */
({
  defaultMerge: actions.defaultMerge
});

/**
 * The default function to update meta data.
 */
function defaultMetaDataUpdater(previousMeta, metaMeta) {
  return metaMeta;
}

/**
 * Get the type of the given object.
 *
 * @param object - The object to get the type of.
 * @returns The type of the given object.
 */
function getObjectType(object) {
  if (typeof object !== "object" || object === null) {
    return 0 /* ObjectType.NOT */;
  }
  if (Array.isArray(object)) {
    return 2 /* ObjectType.ARRAY */;
  }
  if (isRecord(object)) {
    return 1 /* ObjectType.RECORD */;
  }
  if (object instanceof Set) {
    return 3 /* ObjectType.SET */;
  }
  if (object instanceof Map) {
    return 4 /* ObjectType.MAP */;
  }
  return 5 /* ObjectType.OTHER */;
}
/**
 * Get the keys of the given objects including symbol keys.
 *
 * Note: Only keys to enumerable properties are returned.
 *
 * @param objects - An array of objects to get the keys of.
 * @returns A set containing all the keys of all the given objects.
 */
function getKeys(objects) {
  const keys = new Set();
  /* eslint-disable functional/no-loop-statements -- using a loop here is more efficient. */
  for (const object of objects) {
    for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
      keys.add(key);
    }
  }
  /* eslint-enable functional/no-loop-statements */
  return keys;
}
/**
 * Does the given object have the given property.
 *
 * @param object - The object to test.
 * @param property - The property to test.
 * @returns Whether the object has the property.
 */
function objectHasProperty(object, property) {
  return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
}
/**
 * Get an iterable object that iterates over the given iterables.
 */
function getIterableOfIterables(iterables) {
  return {
    *[Symbol.iterator]() {
      // eslint-disable-next-line functional/no-loop-statements
      for (const iterable of iterables) {
        // eslint-disable-next-line functional/no-loop-statements
        for (const value of iterable) {
          yield value;
        }
      }
    }
  };
}
const validRecordToStringValues = new Set(["[object Object]", "[object Module]"]);
/**
 * Does the given object appear to be a record.
 */
function isRecord(value) {
  // All records are objects.
  if (!validRecordToStringValues.has(Object.prototype.toString.call(value))) {
    return false;
  }
  const {
    constructor
  } = value;
  // If has modified constructor.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (constructor === undefined) {
    return true;
  }
  // eslint-disable-next-line prefer-destructuring
  const prototype = constructor.prototype;
  // If has modified prototype.
  if (prototype === null || typeof prototype !== "object" || !validRecordToStringValues.has(Object.prototype.toString.call(prototype))) {
    return false;
  }
  // If constructor does not have an Object-specific method.
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return, no-prototype-builtins
  if (!prototype.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  // Most likely a record.
  return true;
}

/**
 * The default strategy to merge records.
 *
 * @param values - The records.
 */
function mergeRecords$2(values, utils, meta) {
  const result = {};
  /* eslint-disable functional/no-loop-statements, functional/no-conditional-statements -- using a loop here is more performant. */
  for (const key of getKeys(values)) {
    const propValues = [];
    for (const value of values) {
      if (objectHasProperty(value, key)) {
        propValues.push(value[key]);
      }
    }
    if (propValues.length === 0) {
      continue;
    }
    const updatedMeta = utils.metaDataUpdater(meta, {
      key,
      parents: values
    });
    const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
    if (propertyResult === actions.skip) {
      continue;
    }
    if (key === "__proto__") {
      Object.defineProperty(result, key, {
        value: propertyResult,
        configurable: true,
        enumerable: true,
        writable: true
      });
    } else {
      result[key] = propertyResult;
    }
  }
  /* eslint-enable functional/no-loop-statements, functional/no-conditional-statements */
  return result;
}
/**
 * The default strategy to merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$2(values) {
  return values.flat();
}
/**
 * The default strategy to merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$2(values) {
  return new Set(getIterableOfIterables(values));
}
/**
 * The default strategy to merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$2(values) {
  return new Map(getIterableOfIterables(values));
}
/**
 * Get the last value in the given array.
 */
function mergeOthers$2(values) {
  return values[values.length - 1];
}
var defaultMergeFunctions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mergeRecords: mergeRecords$2,
  mergeArrays: mergeArrays$2,
  mergeSets: mergeSets$2,
  mergeMaps: mergeMaps$2,
  mergeOthers: mergeOthers$2
});

/**
 * Deeply merge objects.
 *
 * @param objects - The objects to merge.
 */
function deepmerge(...objects) {
  return deepmergeCustom({})(...objects);
}
function deepmergeCustom(options, rootMetaData) {
  const utils = getUtils(options, customizedDeepmerge);
  /**
   * The customized deepmerge function.
   */
  function customizedDeepmerge(...objects) {
    return mergeUnknowns(objects, utils, rootMetaData);
  }
  return customizedDeepmerge;
}
/**
 * The the utils that are available to the merge functions.
 *
 * @param options - The options the user specified
 */
function getUtils(options, customizedDeepmerge) {
  var _a, _b;
  return {
    defaultMergeFunctions,
    mergeFunctions: {
      ...defaultMergeFunctions,
      ...Object.fromEntries(Object.entries(options).filter(([key, option]) => Object.prototype.hasOwnProperty.call(defaultMergeFunctions, key)).map(([key, option]) => option === false ? [key, mergeOthers$2] : [key, option]))
    },
    metaDataUpdater: (_a = options.metaDataUpdater) !== null && _a !== void 0 ? _a : defaultMetaDataUpdater,
    deepmerge: customizedDeepmerge,
    useImplicitDefaultMerging: (_b = options.enableImplicitDefaultMerging) !== null && _b !== void 0 ? _b : false,
    actions
  };
}
/**
 * Merge unknown things.
 *
 * @param values - The values.
 */
function mergeUnknowns(values, utils, meta) {
  if (values.length === 0) {
    return undefined;
  }
  if (values.length === 1) {
    return mergeOthers$1(values, utils, meta);
  }
  const type = getObjectType(values[0]);
  // eslint-disable-next-line functional/no-conditional-statements -- add an early escape for better performance.
  if (type !== 0 /* ObjectType.NOT */ && type !== 5 /* ObjectType.OTHER */) {
    // eslint-disable-next-line functional/no-loop-statements -- using a loop here is more performant than mapping every value and then testing every value.
    for (let m_index = 1; m_index < values.length; m_index++) {
      if (getObjectType(values[m_index]) === type) {
        continue;
      }
      return mergeOthers$1(values, utils, meta);
    }
  }
  switch (type) {
    case 1 /* ObjectType.RECORD */:
      {
        return mergeRecords$1(values, utils, meta);
      }
    case 2 /* ObjectType.ARRAY */:
      {
        return mergeArrays$1(values, utils, meta);
      }
    case 3 /* ObjectType.SET */:
      {
        return mergeSets$1(values, utils, meta);
      }
    case 4 /* ObjectType.MAP */:
      {
        return mergeMaps$1(values, utils, meta);
      }
    default:
      {
        return mergeOthers$1(values, utils, meta);
      }
  }
}
/**
 * Merge records.
 *
 * @param values - The records.
 */
function mergeRecords$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeRecords(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords) {
    return utils.defaultMergeFunctions.mergeRecords(values, utils, meta);
  }
  return result;
}
/**
 * Merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeArrays(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays) {
    return utils.defaultMergeFunctions.mergeArrays(values);
  }
  return result;
}
/**
 * Merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeSets(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets) {
    return utils.defaultMergeFunctions.mergeSets(values);
  }
  return result;
}
/**
 * Merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeMaps(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps) {
    return utils.defaultMergeFunctions.mergeMaps(values);
  }
  return result;
}
/**
 * Merge other things.
 *
 * @param values - The other things.
 */
function mergeOthers$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeOthers(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers) {
    return utils.defaultMergeFunctions.mergeOthers(values);
  }
  return result;
}

var __read = undefined && undefined.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function getBaseProps(props) {
  var _a, _b, _c, _d, _e, _f, _g;
  return {
    axis: (_a = props === null || props === void 0 ? void 0 : props.axis) !== null && _a !== void 0 ? _a : 'x',
    xMax: (_b = props === null || props === void 0 ? void 0 : props.xMax) !== null && _b !== void 0 ? _b : 100,
    xMin: (_c = props === null || props === void 0 ? void 0 : props.xMin) !== null && _c !== void 0 ? _c : 0,
    xStep: (_d = props === null || props === void 0 ? void 0 : props.xStep) !== null && _d !== void 0 ? _d : 1,
    yMax: (_e = props === null || props === void 0 ? void 0 : props.yMax) !== null && _e !== void 0 ? _e : 100,
    yMin: (_f = props === null || props === void 0 ? void 0 : props.yMin) !== null && _f !== void 0 ? _f : 0,
    yStep: (_g = props === null || props === void 0 ? void 0 : props.yStep) !== null && _g !== void 0 ? _g : 1
  };
}
function getCoordinates(event, lastPosition) {
  if ('touches' in event) {
    // eslint-disable-next-line unicorn/prefer-spread
    var _a = __read(__spreadArray([], __read(Array.from(event.touches)), false), 1),
      touch = _a[0];
    return {
      x: touch ? touch.clientX : lastPosition.x,
      y: touch ? touch.clientY : lastPosition.y
    };
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function getPosition(position, props, el) {
  var _a = getBaseProps(props),
    axis = _a.axis,
    xMax = _a.xMax,
    xMin = _a.xMin,
    xStep = _a.xStep,
    yMax = _a.yMax,
    yMin = _a.yMin,
    yStep = _a.yStep;
  var _b = (el === null || el === void 0 ? void 0 : el.getBoundingClientRect()) || {},
    _c = _b.height,
    height = _c === void 0 ? xMax : _c,
    _d = _b.width,
    width = _d === void 0 ? yMax : _d;
  var x = position.x,
    y = position.y;
  var dx = 0;
  var dy = 0;
  if (x < 0) {
    x = 0;
  }
  if (x > width) {
    x = width;
  }
  if (y < 0) {
    y = 0;
  }
  if (y > height) {
    y = height;
  }
  if (axis === 'x' || axis === 'xy') {
    dx = Math.round(x / width * (xMax - xMin));
  }
  if (axis === 'y' || axis === 'xy') {
    dy = Math.round(y / height * (yMax - yMin));
  }
  return {
    x: round$2(dx, xStep),
    y: round$2(dy, yStep)
  };
}
/**
 * Get a normalized value
 */
function getNormalizedValue(name, props) {
  var value = props[name] || 0;
  var min = name === 'x' ? props.xMin : props.yMin;
  var max = name === 'x' ? props.xMax : props.yMax;
  if (isNumber$2(min) && value < min) {
    return min;
  }
  if (isNumber$2(max) && value > max) {
    return max;
  }
  return value;
}
/**
 * Check if the value is a number
 */
function isNumber$2(value) {
  return typeof value === 'number';
}
/**
 * Check if the value is undefined
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Parse a string into a number or return it if it's already a number
 */
function parseNumber(value) {
  if (typeof value === 'number') {
    return value;
  }
  return parseInt(value, 10);
}
/**
 *  Remove properties from an object
 */
function removeProperties(input) {
  var filter = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    filter[_i - 1] = arguments[_i];
  }
  var output = {};
  for (var key in input) {
    /* istanbul ignore else */
    if ({}.hasOwnProperty.call(input, key)) {
      if (!filter.includes(key)) {
        output[key] = input[key];
      }
    }
  }
  return output;
}
function round$2(value, increment) {
  return Math.ceil(value / increment) * increment;
}

var __assign$1 = undefined && undefined.__assign || function () {
  __assign$1 = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var defaultOptions = {
  height: '20px',
  padding: '6px',
  rangeColor: '#007bff',
  thumbBorder: '2px solid #000',
  thumbBorderRadius: '4px',
  thumbBorderRadiusXY: '50%',
  thumbColor: '#fff',
  thumbSize: '10px',
  thumbSizeXY: '20px',
  thumbSpace: '6px',
  trackBorderRadius: '3px',
  trackColor: '#ccc',
  width: '20px'
};
function getStyles(styles) {
  var options = deepmerge(defaultOptions, styles ? styles.options : {});
  var slider = {
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: options.padding,
    transition: 'height 0.4s, width 0.4s'
  };
  var track = {
    backgroundColor: options.trackColor,
    borderRadius: options.trackBorderRadius,
    boxSizing: 'border-box',
    height: '100%',
    position: 'relative',
    width: '100%'
  };
  var range = {
    backgroundColor: options.rangeColor,
    borderRadius: options.trackBorderRadius,
    position: 'absolute'
  };
  var rail = {
    boxSizing: 'border-box',
    height: options.height,
    position: 'absolute',
    transition: 'height 0.4s, width 0.4s',
    width: options.width
  };
  var thumb = {
    backgroundColor: options.thumbColor,
    border: options.thumbBorder,
    borderRadius: options.thumbBorderRadius,
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    transition: 'height 0.4s, width 0.4s'
  };
  var defaultStyles = {
    rail: rail,
    rangeX: __assign$1(__assign$1({}, range), {
      height: '100%',
      top: 0
    }),
    rangeXY: __assign$1(__assign$1({}, range), {
      bottom: 0
    }),
    rangeY: __assign$1(__assign$1({}, range), {
      bottom: 0,
      left: 0,
      width: '100%'
    }),
    sliderX: __assign$1(__assign$1({}, slider), {
      height: parseNumber(options.height) + parseNumber(options.padding) * 2,
      width: '100%'
    }),
    sliderXY: __assign$1(__assign$1({}, slider), {
      height: '100%',
      width: '100%'
    }),
    sliderY: __assign$1(__assign$1({}, slider), {
      height: '100%',
      width: parseNumber(options.width) + parseNumber(options.padding) * 2
    }),
    thumbX: __assign$1(__assign$1({}, thumb), {
      height: parseNumber(options.height) + parseNumber(options.thumbSpace),
      left: -(parseNumber(options.thumbSize) / 2),
      top: -(parseNumber(options.thumbSpace) / 2),
      width: options.thumbSize
    }),
    thumbXY: __assign$1(__assign$1({}, thumb), {
      backgroundColor: 'transparent',
      border: options.thumbBorder,
      borderRadius: options.thumbBorderRadiusXY,
      bottom: -(parseNumber(options.thumbSizeXY) / 2),
      height: options.thumbSizeXY,
      left: -(parseNumber(options.thumbSizeXY) / 2),
      position: 'absolute',
      width: options.thumbSizeXY
    }),
    thumbY: __assign$1(__assign$1({}, thumb), {
      bottom: -(parseNumber(options.thumbSize) / 2),
      height: options.thumbSize,
      left: -(parseNumber(options.thumbSpace) / 2),
      width: parseNumber(options.width) + parseNumber(options.thumbSpace)
    }),
    trackX: __assign$1(__assign$1({}, track), {
      height: options.height
    }),
    trackXY: __assign$1(__assign$1({}, track), {
      height: '100%',
      minHeight: '50px',
      width: '100%'
    }),
    trackY: __assign$1(__assign$1({}, track), {
      height: '100%',
      minHeight: '50px',
      width: options.width
    })
  };
  return deepmerge(defaultStyles, styles || {});
}

var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var RangeSlider = /** @class */function (_super) {
  __extends(RangeSlider, _super);
  function RangeSlider(props) {
    var _this = _super.call(this, props) || this;
    _this.lastCoordinates = {
      x: 0,
      y: 0
    };
    _this.mounted = false;
    _this.offset = {
      x: 0,
      y: 0
    };
    _this.start = {
      x: 0,
      y: 0
    };
    _this.getDragPosition = function (_a) {
      var x = _a.x,
        y = _a.y;
      return {
        x: x + _this.start.x - _this.offset.x,
        y: _this.offset.y + _this.start.y - y
      };
    };
    _this.updateOptions = function (_a) {
      var _b, _c, _d, _e, _f, _g, _h, _j;
      var x = _a.x,
        y = _a.y;
      var _k = _this,
        rail = _k.rail,
        track = _k.track;
      _this.start = {
        x: (_c = (_b = rail.current) === null || _b === void 0 ? void 0 : _b.offsetLeft) !== null && _c !== void 0 ? _c : 0,
        y: ((_e = (_d = track.current) === null || _d === void 0 ? void 0 : _d.offsetHeight) !== null && _e !== void 0 ? _e : 0) - ((_g = (_f = rail.current) === null || _f === void 0 ? void 0 : _f.offsetTop) !== null && _g !== void 0 ? _g : 0) - ((_j = (_h = rail.current) === null || _h === void 0 ? void 0 : _h.offsetHeight) !== null && _j !== void 0 ? _j : 0)
      };
      _this.lastCoordinates = {
        x: x,
        y: y
      };
      _this.offset = {
        x: x,
        y: y
      };
    };
    _this.updatePosition = function (position) {
      _this.setState(getPosition(position, _this.props, _this.slider.current));
    };
    _this.handleBlur = function () {
      document.removeEventListener('keydown', _this.handleKeydown);
    };
    _this.handleClickTrack = function (event) {
      var onAfterEnd = _this.props.onAfterEnd;
      var isDragging = _this.state.isDragging;
      if (!isDragging) {
        var element = event.currentTarget;
        var _a = getCoordinates(event, _this.lastCoordinates),
          x = _a.x,
          y = _a.y;
        var _b = element.getBoundingClientRect(),
          bottom = _b.bottom,
          left = _b.left;
        var nextPosition = {
          x: x - left,
          y: bottom - y
        };
        _this.lastCoordinates = {
          x: x,
          y: y
        };
        _this.updatePosition(nextPosition);
        if (onAfterEnd) {
          onAfterEnd(getPosition(nextPosition, _this.props, _this.slider.current), _this.props);
        }
      } else if (_this.mounted) {
        _this.setState({
          isDragging: false
        });
      }
    };
    _this.handleDrag = function (event) {
      event.preventDefault();
      var coordinates = getCoordinates(event, _this.lastCoordinates);
      _this.updatePosition(_this.getDragPosition(coordinates));
      _this.lastCoordinates = coordinates;
    };
    _this.handleDragEnd = function (event) {
      event.preventDefault();
      var _a = _this.props,
        onAfterEnd = _a.onAfterEnd,
        onDragEnd = _a.onDragEnd;
      var position = getPosition(_this.getDragPosition(getCoordinates(event, _this.lastCoordinates)), _this.props, _this.slider.current);
      document.removeEventListener('mousemove', _this.handleDrag);
      document.removeEventListener('mouseup', _this.handleDragEnd);
      document.removeEventListener('touchmove', _this.handleDrag);
      document.removeEventListener('touchend', _this.handleDragEnd);
      document.removeEventListener('touchcancel', _this.handleDragEnd);
      /* istanbul ignore else */
      if (onDragEnd) {
        onDragEnd(position, _this.props);
      }
      /* istanbul ignore else */
      if (onAfterEnd) {
        onAfterEnd(position, _this.props);
      }
    };
    _this.handleFocus = function () {
      document.addEventListener('keydown', _this.handleKeydown, {
        passive: false
      });
    };
    _this.handleKeydown = function (event) {
      var _a = _this.state,
        innerX = _a.x,
        innerY = _a.y;
      var _b = _this.props,
        x = _b.x,
        y = _b.y;
      var _c = getBaseProps(_this.props),
        axis = _c.axis,
        xMax = _c.xMax,
        xMin = _c.xMin,
        xStep = _c.xStep,
        yMax = _c.yMax,
        yMin = _c.yMin,
        yStep = _c.yStep;
      var codes = {
        down: 'ArrowDown',
        left: 'ArrowLeft',
        up: 'ArrowUp',
        right: 'ArrowRight'
      };
      /* istanbul ignore else */
      if (Object.values(codes).includes(event.code)) {
        event.preventDefault();
        var position = {
          x: isUndefined(x) ? innerX : getNormalizedValue('x', _this.props),
          y: isUndefined(y) ? innerY : getNormalizedValue('y', _this.props)
        };
        var xMinus = position.x - xStep <= xMin ? xMin : position.x - xStep;
        var xPlus = position.x + xStep >= xMax ? xMax : position.x + xStep;
        var yMinus = position.y - yStep <= yMin ? yMin : position.y - yStep;
        var yPlus = position.y + yStep >= yMax ? yMax : position.y + yStep;
        switch (event.code) {
          case codes.up:
            {
              if (axis === 'x') {
                position.x = xPlus;
              } else {
                position.y = yPlus;
              }
              break;
            }
          case codes.down:
            {
              if (axis === 'x') {
                position.x = xMinus;
              } else {
                position.y = yMinus;
              }
              break;
            }
          case codes.left:
            {
              if (axis === 'y') {
                position.y = yMinus;
              } else {
                position.x = xMinus;
              }
              break;
            }
          case codes.right:
          default:
            {
              if (axis === 'y') {
                position.y = yPlus;
              } else {
                position.x = xPlus;
              }
              break;
            }
        }
        _this.setState(position);
      }
    };
    _this.handleMouseDown = function (event) {
      event.preventDefault();
      _this.updateOptions(getCoordinates(event, _this.lastCoordinates));
      _this.setState({
        isDragging: true
      });
      document.addEventListener('mousemove', _this.handleDrag);
      document.addEventListener('mouseup', _this.handleDragEnd);
    };
    _this.handleTouchStart = function (event) {
      event.preventDefault();
      _this.updateOptions(getCoordinates(event, _this.lastCoordinates));
      document.addEventListener('touchmove', _this.handleDrag, {
        passive: false
      });
      document.addEventListener('touchend', _this.handleDragEnd, {
        passive: false
      });
      document.addEventListener('touchcancel', _this.handleDragEnd, {
        passive: false
      });
    };
    _this.slider = React.createRef();
    _this.rail = React.createRef();
    _this.track = React.createRef();
    _this.state = {
      isDragging: false,
      x: getNormalizedValue('x', props),
      y: getNormalizedValue('y', props)
    };
    return _this;
  }
  RangeSlider.prototype.componentDidMount = function () {
    this.mounted = true;
  };
  RangeSlider.prototype.componentDidUpdate = function (_, previousState) {
    var _a = this.state,
      x = _a.x,
      y = _a.y;
    var onChange = this.props.onChange;
    var previousX = previousState.x,
      previousY = previousState.y;
    /* istanbul ignore else */
    if (onChange && (x !== previousX || y !== previousY)) {
      onChange({
        x: x,
        y: y
      }, this.props);
    }
  };
  RangeSlider.prototype.componentWillUnmount = function () {
    this.mounted = false;
  };
  Object.defineProperty(RangeSlider.prototype, "position", {
    get: function () {
      var _a = getBaseProps(this.props),
        axis = _a.axis,
        xMax = _a.xMax,
        xMin = _a.xMin,
        yMax = _a.yMax,
        yMin = _a.yMin;
      var bottom = (this.y - yMin) / (yMax - yMin) * 100;
      var left = (this.x - xMin) / (xMax - xMin) * 100;
      if (bottom > 100) {
        bottom = 100;
      }
      if (bottom < 0) {
        bottom = 0;
      }
      // bottom shouldn't be set with X axis
      /* istanbul ignore else */
      if (axis === 'x') {
        bottom = 0;
      }
      if (left > 100) {
        left = 100;
      }
      if (left < 0) {
        left = 0;
      }
      // left shouldn't be set with Y axis
      /* istanbul ignore else */
      if (axis === 'y') {
        left = 0;
      }
      return {
        x: left,
        y: bottom
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RangeSlider.prototype, "styles", {
    get: function () {
      var styles = this.props.styles;
      return getStyles(styles);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RangeSlider.prototype, "x", {
    get: function () {
      var innerX = this.state.x;
      var x = this.props.x;
      return isUndefined(x) ? innerX : x;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RangeSlider.prototype, "y", {
    get: function () {
      var innerY = this.state.y;
      var y = this.props.y;
      return isUndefined(y) ? innerY : y;
    },
    enumerable: false,
    configurable: true
  });
  RangeSlider.prototype.render = function () {
    var _a = this.props,
      axis = _a.axis,
      className = _a.className,
      xMax = _a.xMax,
      xMin = _a.xMin,
      yMax = _a.yMax,
      yMin = _a.yMin;
    var rest = removeProperties(this.props, 'axis', 'className', 'onAfterEnd', 'onChange', 'onDragEnd', 'styles', 'x', 'xMin', 'xMax', 'xStep', 'y', 'yMin', 'yMax', 'yStep');
    var _b = this.position,
      xPos = _b.x,
      yPos = _b.y;
    var position = {
      left: "".concat(xPos, "%"),
      bottom: "".concat(yPos, "%")
    };
    var size = {};
    var orientation;
    var range;
    var slider;
    var thumb;
    var track;
    var valuemax = xMax;
    var valuemin = xMin;
    var valuenow = this.x;
    /* istanbul ignore else */
    if (axis === 'x') {
      size.width = "".concat(xPos, "%");
      slider = this.styles.sliderX;
      orientation = 'horizontal';
      range = this.styles.rangeX;
      track = this.styles.trackX;
      thumb = this.styles.thumbX;
    }
    /* istanbul ignore else */
    if (axis === 'y') {
      size.height = "".concat(yPos, "%");
      slider = this.styles.sliderY;
      range = this.styles.rangeY;
      track = this.styles.trackY;
      thumb = this.styles.thumbY;
      orientation = 'vertical';
      valuemax = yMax;
      valuemin = yMin;
      valuenow = this.y;
    }
    /* istanbul ignore else */
    if (axis === 'xy') {
      size.height = "".concat(yPos, "%");
      size.width = "".concat(xPos, "%");
      slider = this.styles.sliderXY;
      range = this.styles.rangeXY;
      track = this.styles.trackXY;
      thumb = this.styles.thumbXY;
    }
    return React.createElement("div", __assign({
      ref: this.slider,
      className: className,
      style: slider
    }, rest), React.createElement("div", {
      ref: this.track,
      className: className && "".concat(className, "__track"),
      onClick: this.handleClickTrack,
      role: "presentation",
      // @ts-ignore We can't use React's events because the listeners
      style: track
    }, React.createElement("div", {
      className: className && "".concat(className, "__range"),
      style: __assign(__assign({}, size), range)
    }), React.createElement("div", {
      ref: this.rail,
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart,
      // @ts-ignore We can't use React's events because the listeners
      role: "presentation",
      // @ts-ignore We can't use React's events because the listeners
      style: __assign(__assign({}, this.styles.rail), position)
    }, React.createElement("span", {
      "aria-label": "slider handle",
      "aria-orientation": orientation,
      "aria-valuemax": valuemax,
      "aria-valuemin": valuemin,
      "aria-valuenow": valuenow,
      className: className && "".concat(className, "__thumb"),
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      role: "slider",
      style: thumb,
      tabIndex: 0
    }))));
  };
  RangeSlider.defaultProps = getBaseProps();
  return RangeSlider;
}(React.Component);

const HSLKeys = ['h', 's', 'l'];
const RGBKeys = ['r', 'g', 'b'];
function invariant(condition, message) {
  if (condition) {
    return;
  }
  /* istanbul ignore else */
  {
    if (message === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }
  let error;
  if (!message) {
    throw new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
  } else {
    error = new Error(message);
  }
  error.name = 'colorizr';
  throw error;
}
/**
 * Check if an object contains HSL values
 */
function isHSL(input) {
  if (!isPlainObject(input)) {
    return false;
  }
  const entries = Object.entries(input);
  return !!entries.length && entries.every(([key, value]) => HSLKeys.includes(key) && value >= 0 && value <= (key === 'h' ? 360 : 100));
}
/**
 * Check if the input is a number and not NaN
 */
function isNumber$1(input) {
  return typeof input === 'number' && !Number.isNaN(input);
}
/**
 * Check if the input is an object
 */
function isPlainObject(input) {
  if (!input) {
    return false;
  }
  const {
    toString
  } = Object.prototype;
  const prototype = Object.getPrototypeOf(input);
  return toString.call(input) === '[object Object]' && (prototype === null || prototype === Object.getPrototypeOf({}));
}
/**
 * Check if an object contains RGB values.
 */
function isRGB(input) {
  if (!isPlainObject(input)) {
    return false;
  }
  const entries = Object.entries(input);
  return !!entries.length && entries.every(([key, value]) => RGBKeys.includes(key) && value >= 0 && value <= 255);
}
/**
 * Check if an array contains RGB values.
 */
function isRGBArray(input) {
  return Array.isArray(input) && input.length === 3 && input.every(d => d >= 0 && d <= 255);
}
/**
 * Check if the input is a string
 */
function isString(input) {
  return typeof input === 'string';
}
/**
 * Limit values per type.
 */
function limit(input, type) {
  invariant(isNumber$1(input), 'Input is not a number');
  /* istanbul ignore else */
  if (RGBKeys.includes(type)) {
    return Math.max(Math.min(input, 255), 0);
  }
  if (['s', 'l'].includes(type)) {
    return Math.max(Math.min(input, 100), 0);
  }
  if (type === 'h') {
    return Math.max(Math.min(input, 360), 0);
  }
  throw new Error('Invalid type');
}
const messages = {
  amount: 'amount must be a number',
  left: 'left is required and must be a string',
  right: 'right is required and must be a string',
  input: 'input is required',
  inputString: 'input is required and must be a string',
  invalid: 'invalid input',
  options: 'invalid options'
};
/**
 * Round decimal numbers.
 */
function round$1(input, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(input * factor) / factor;
}

function isValidHex(input, alpha = true) {
  if (!isString(input)) {
    return false;
  }
  if (alpha) {
    return /^#([\da-f]{3,4}|[\da-f]{6,8})$/i.test(input);
  }
  return /^#([\da-f]{3}|[\da-f]{6})$/i.test(input);
}

function formatHex(input) {
  invariant(isString(input), messages.inputString);
  const color = input.replace('#', '');
  let hex = color;
  if (color.length === 3 || color.length === 4) {
    hex = '';
    [...color].forEach(d => {
      hex += d + d;
    });
  }
  hex = `#${hex}`;
  invariant(isValidHex(hex), 'invalid hex');
  return hex;
}

function hex2rgb(input) {
  invariant(isString(input), messages.inputString);
  const hex = formatHex(input).substr(1);
  return {
    r: parseInt(String(hex.charAt(0)) + hex.charAt(1), 16),
    g: parseInt(String(hex.charAt(2)) + hex.charAt(3), 16),
    b: parseInt(String(hex.charAt(4)) + hex.charAt(5), 16)
  };
}

function rgb2hsl(input) {
  invariant(!!input, messages.input);
  let rgb = input;
  if (Array.isArray(input)) {
    rgb = {
      r: input[0],
      g: input[1],
      b: input[2]
    };
  }
  invariant(isRGB(rgb), messages.invalid);
  const rLimit = limit(rgb.r, 'r') / 255;
  const gLimit = limit(rgb.g, 'g') / 255;
  const bLimit = limit(rgb.b, 'b') / 255;
  const min = Math.min(rLimit, gLimit, bLimit);
  const max = Math.max(rLimit, gLimit, bLimit);
  const delta = max - min;
  let h = 0;
  let s;
  const l = (max + min) / 2;
  let rate;
  switch (max) {
    case rLimit:
      rate = !delta ? 0 : (gLimit - bLimit) / delta;
      h = 60 * rate;
      break;
    case gLimit:
      rate = (bLimit - rLimit) / delta;
      h = 60 * rate + 120;
      break;
    case bLimit:
      rate = (rLimit - gLimit) / delta;
      h = 60 * rate + 240;
      break;
  }
  if (h < 0) {
    h = 360 + h;
  }
  if (min === max) {
    s = 0;
  } else {
    s = l < 0.5 ? delta / (2 * l) : delta / (2 - 2 * l);
  }
  return {
    h: Math.abs(+(h % 360).toFixed(2)),
    s: +(s * 100).toFixed(2),
    l: +(l * 100).toFixed(2)
  };
}

function hex2hsl(input) {
  invariant(isString(input), messages.inputString);
  return rgb2hsl(hex2rgb(input));
}

/**
 * Convert hue to RGB using chroma and median point
 */
function hue2rgb(point, chroma, h) {
  invariant(isNumber$1(point) && isNumber$1(chroma) && isNumber$1(h), 'point, chroma and h are required');
  let hue = h;
  if (hue < 0) {
    hue += 1;
  }
  if (hue > 1) {
    hue -= 1;
  }
  if (hue < 1 / 6) {
    return round$1(point + (chroma - point) * 6 * hue, 4);
  }
  if (hue < 1 / 2) {
    return round$1(chroma, 4);
  }
  if (hue < 2 / 3) {
    return round$1(point + (chroma - point) * (2 / 3 - hue) * 6, 4);
  }
  return round$1(point, 4);
}

/**
 * Convert an HSL object to RGB.
 */
function hsl2rgb(input) {
  invariant(!!input, messages.inputString);
  invariant(isHSL(input), 'invalid input');
  const h = round$1(input.h) / 360;
  const s = round$1(input.s) / 100;
  const l = round$1(input.l) / 100;
  let r;
  let g;
  let b;
  let point;
  let chroma;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    chroma = l < 0.5 ? l * (1 + s) : l + s - l * s;
    point = 2 * l - chroma;
    r = hue2rgb(point, chroma, h + 1 / 3);
    g = hue2rgb(point, chroma, h);
    b = hue2rgb(point, chroma, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Convert an RGA object to hex.
 */
function rgb2hex(input) {
  invariant(!!input, messages.input);
  invariant(isRGBArray(input) || isRGB(input), messages.invalid);
  let r;
  let g;
  let b;
  if (isRGBArray(input)) {
    [r, g, b] = input;
  } else {
    ({
      r,
      g,
      b
    } = input);
  }
  const output = [r.toString(16), g.toString(16), b.toString(16)];
  return `#${output.map(d => d.length === 1 ? `0${d}` : d).join('')}`;
}

/**
 * Convert a HSL object to HEX.
 */
function hsl2hex(input) {
  invariant(isHSL(input), messages.invalid);
  return rgb2hex(hsl2rgb(input));
}

/**
 * CSS named colors
 */
const cssColors = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#FAFAD2',
  lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370d8',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#d87093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

/**
 * Parse CSS color
 */
function parseCSS(input, output) {
  invariant(isString(input), messages.inputString);
  let result;
  const parsedInput = cssColors[input.toLowerCase()] || input;
  if (isValidHex(parsedInput)) {
    switch (output) {
      case 'hsl':
        {
          result = hex2hsl(parsedInput);
          break;
        }
      case 'rgb':
        {
          result = hex2rgb(parsedInput);
          break;
        }
      default:
        {
          result = parsedInput;
          break;
        }
    }
  } else {
    // TODO: improve the pattern to require 3 groups
    const matches = parsedInput.match(/(hsl|rgb)a?\((\d+)(?:,\s*|\s+)(\d+)%?(?:,\s*|\s+)(\d+)%?[^)]*\)/i);
    invariant(Array.isArray(matches), 'invalid CSS string');
    invariant(matches.length === 5, 'invalid CSS string');
    const [, model, hORr, sORg, lORb] = matches;
    let hex;
    let hsl;
    let rgb;
    if (model === 'hsl') {
      hsl = {
        h: parseInt(hORr, 10),
        s: parseInt(sORg, 10),
        l: parseInt(lORb, 10)
      };
      hex = hsl2hex(hsl);
      rgb = hsl2rgb(hsl);
    } else {
      rgb = {
        r: parseInt(hORr, 10),
        g: parseInt(sORg, 10),
        b: parseInt(lORb, 10)
      };
      hex = rgb2hex(rgb);
      hsl = rgb2hsl(rgb);
    }
    switch (output) {
      case 'hsl':
        {
          result = hsl;
          break;
        }
      case 'rgb':
        {
          result = rgb;
          break;
        }
      case 'hex':
      default:
        {
          result = hex;
          break;
        }
    }
  }
  return result;
}

/**
 * Fade the color
 */
function fade(input, amount = 10, output = 'rgb') {
  invariant(isString(input), messages.inputString);
  invariant(isNumber$1(amount), messages.amount);
  const hex = parseCSS(input);
  const percentage = (100 - amount) / 100;
  if (output === 'rgb') {
    const {
      r,
      g,
      b
    } = hex2rgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${percentage})`;
  }
  if (output === 'hsl') {
    const {
      h,
      s,
      l
    } = hex2hsl(hex);
    return `hsla(${h}, ${s}%, ${l}%, ${percentage})`;
  }
  return `${hex}${Math.round(percentage * 255).toString(16)}`;
}

/**
 * Get the contrasted color for a given hex.
 */
function textColor(input) {
  invariant(isString(input), messages.inputString);
  const {
    r,
    g,
    b
  } = hex2rgb(parseCSS(input));
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

var _Class;
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};

// src/constants.ts
var ERROR_TYPE = {
  ACCOUNT: "account",
  AUTHENTICATION: "authentication",
  INITIALIZATION: "initialization",
  PLAYBACK: "playback",
  PLAYER: "player"
};
var STATUS = {
  ERROR: "ERROR",
  IDLE: "IDLE",
  INITIALIZING: "INITIALIZING",
  READY: "READY",
  RUNNING: "RUNNING",
  UNSUPPORTED: "UNSUPPORTED"
};
var TRANSPARENT_COLOR = "rgba(0, 0, 0, 0)";
var TYPE = {
  DEVICE: "device_update",
  FAVORITE: "favorite_update",
  PLAYER: "player_update",
  PROGRESS: "progress_update",
  STATUS: "status_update",
  TRACK: "track_update"
};

// src/modules/getters.ts
function getBgColor(bgColor, fallbackColor) {
  if (fallbackColor) {
    return bgColor === TRANSPARENT_COLOR ? fallbackColor : bgColor;
  }
  return bgColor === "transparent" ? TRANSPARENT_COLOR : bgColor;
}
function getLocale(locale) {
  return {
    currentDevice: "Current device",
    devices: "Devices",
    next: "Next",
    otherDevices: "Select other device",
    pause: "Pause",
    play: "Play",
    previous: "Previous",
    removeTrack: "Remove from your favorites",
    saveTrack: "Save to your favorites",
    title: "{name} on SPOTIFY",
    volume: "Volume",
    ...locale
  };
}
function getMergedStyles(styles) {
  const mergedStyles = {
    activeColor: "#1cb954",
    altColor: "#ccc",
    bgColor: "#fff",
    color: "#333",
    errorColor: "#ff0026",
    height: 80,
    loaderColor: "#ccc",
    loaderSize: 32,
    sliderColor: "#666",
    sliderHandleBorderRadius: "50%",
    sliderHandleColor: "#000",
    sliderHeight: 4,
    sliderTrackBorderRadius: 4,
    sliderTrackColor: "#ccc",
    trackArtistColor: "#666",
    trackNameColor: "#333",
    ...styles
  };
  mergedStyles.bgColor = getBgColor(mergedStyles.bgColor);
  return mergedStyles;
}
function getSpotifyLink(uri) {
  const [, type = "", id = ""] = uri.split(":");
  return `https://open.spotify.com/${type}/${id}`;
}
function getSpotifyLinkTitle(name, locale) {
  return locale.replace("{name}", name);
}
function getSpotifyURIType(uri) {
  const [, type = ""] = uri.split(":");
  return type;
}

// src/modules/helpers.ts
function convertTrack(track) {
  const {
    album,
    artists,
    duration_ms,
    id,
    name,
    uri
  } = track;
  return {
    artists,
    durationMs: duration_ms,
    id: id ?? "",
    image: getAlbumImage(album),
    name,
    uri
  };
}
function getAlbumImage(album) {
  const maxWidth = Math.max(...album.images.map(d => d.width || 0));
  return album.images.find(d => d.width === maxWidth)?.url || "";
}
function getRepeatState(mode) {
  switch (mode) {
    case 1:
      return "context";
    case 2:
      return "track";
    case 0:
    default:
      return "off";
  }
}
function getURIs(uris) {
  if (!uris) {
    return [];
  }
  return Array.isArray(uris) ? uris : [uris];
}
function isNumber(value) {
  return typeof value === "number";
}
function loadSpotifyPlayer() {
  return new Promise((resolve, reject) => {
    const scriptTag = document.getElementById("spotify-player");
    if (!scriptTag) {
      const script = document.createElement("script");
      script.id = "spotify-player";
      script.type = "text/javascript";
      script.async = false;
      script.defer = true;
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.onload = () => resolve();
      script.onerror = error => reject(new Error(`loadScript: ${error.message}`));
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
}
function millisecondsToTime(input) {
  const seconds = Math.floor(input / 1e3 % 60);
  const minutes = Math.floor(input / (1e3 * 60) % 60);
  const hours = Math.floor(input / (1e3 * 60 * 60) % 24);
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}`.padStart(2, "0"), `${minutes}`.padStart(2, "0"), `${seconds}`.padStart(2, "0"));
  } else {
    parts.push(`${minutes}`, `${seconds}`.padStart(2, "0"));
  }
  return parts.join(":");
}
function parseVolume(value) {
  if (!isNumber(value)) {
    return 1;
  }
  if (value > 1) {
    return value / 100;
  }
  return value;
}
function round(number, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(number * factor) / factor;
}
function validateURI(input) {
  const validTypes = ["album", "artist", "playlist", "show", "track"];
  if (input && input.indexOf(":") > -1) {
    const [key, type, id] = input.split(":");
    if (key === "spotify" && validTypes.indexOf(type) >= 0 && id.length === 22) {
      return true;
    }
  }
  return false;
}

// src/modules/spotify.ts
var spotify_exports = {};
__export(spotify_exports, {
  checkTracksStatus: () => checkTracksStatus,
  getDevices: () => getDevices,
  getPlaybackState: () => getPlaybackState,
  getQueue: () => getQueue,
  next: () => next,
  pause: () => pause,
  play: () => play,
  previous: () => previous,
  removeTracks: () => removeTracks,
  repeat: () => repeat,
  saveTracks: () => saveTracks,
  seek: () => seek,
  setDevice: () => setDevice,
  setVolume: () => setVolume,
  shuffle: () => shuffle
});
async function checkTracksStatus(token, tracks) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];
  return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(d => d.json());
}
async function getDevices(token) {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(d => d.json());
}
async function getPlaybackState(token) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(d => {
    if (d.status === 204) {
      return null;
    }
    return d.json();
  });
}
async function getQueue(token) {
  return fetch(`https://api.spotify.com/v1/me/player/queue`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  }).then(d => d.json());
}
async function next(token, deviceId) {
  let query = "";
  if (deviceId) {
    query += `?device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/next${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}
async function pause(token, deviceId) {
  let query = "";
  if (deviceId) {
    query += `?device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/pause${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function play(token, {
  context_uri,
  deviceId,
  offset = 0,
  uris
}) {
  let body;
  if (context_uri) {
    const isArtist = context_uri.indexOf("artist") >= 0;
    let position;
    if (!isArtist) {
      position = {
        position: offset
      };
    }
    body = JSON.stringify({
      context_uri,
      offset: position
    });
  } else if (Array.isArray(uris) && uris.length) {
    body = JSON.stringify({
      uris,
      offset: {
        position: offset
      }
    });
  }
  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function previous(token, deviceId) {
  let query = "";
  if (deviceId) {
    query += `?device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/previous${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });
}
async function removeTracks(token, tracks) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];
  await fetch(`https://api.spotify.com/v1/me/tracks`, {
    body: JSON.stringify(ids),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "DELETE"
  });
}
async function repeat(token, state, deviceId) {
  let query = `?state=${state}`;
  if (deviceId) {
    query += `&device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/repeat${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function saveTracks(token, tracks) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];
  await fetch(`https://api.spotify.com/v1/me/tracks`, {
    body: JSON.stringify({
      ids
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function seek(token, position, deviceId) {
  let query = `?position_ms=${position}`;
  if (deviceId) {
    query += `&device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/seek${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function setDevice(token, deviceId, shouldPlay) {
  await fetch(`https://api.spotify.com/v1/me/player`, {
    body: JSON.stringify({
      device_ids: [deviceId],
      play: shouldPlay
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function setVolume(token, volume, deviceId) {
  let query = `?volume_percent=${volume}`;
  if (deviceId) {
    query += `&device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/volume${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
async function shuffle(token, state, deviceId) {
  let query = `?state=${state}`;
  if (deviceId) {
    query += `&device_id=${deviceId}`;
  }
  await fetch(`https://api.spotify.com/v1/me/player/shuffle${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "PUT"
  });
}
var nano = create({
  h: createElement
});
addon$2(nano);
addon$4(nano);
addon$5(nano);
addon$1(nano);
addon(nano);
addon$3(nano);
var {
  keyframes,
  put,
  styled
} = nano;
var px = value => typeof value === "number" ? `${value}px` : value;
var Wrapper = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  "pointer-events": "none"
}, ({
  style
}) => {
  let styles = {
    bottom: 0,
    position: "absolute",
    right: 0,
    width: "auto"
  };
  if (style.layout === "responsive") {
    styles = {
      "@media (max-width: 767px)": styles,
      "@media (min-width: 768px)": {
        height: px(style.h)
      }
    };
  }
  return {
    height: px(32),
    ...styles
  };
}, "ActionsRSWP");
function Actions(props) {
  const {
    children,
    layout,
    styles
  } = props;
  return /* @__PURE__ */jsx(Wrapper, {
    "data-component-name": "Actions",
    style: {
      h: styles.height,
      layout
    },
    children
  });
}
var Actions_default = memo(Actions);
function Next(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M53.486 0a3.2 3.2 0 0 0-3.2 3.2v23.543L4.8.489A3.2 3.2 0 0 0 0 3.255V60.74a3.2 3.2 0 0 0 4.8 2.774l45.486-26.262V60.8a3.2 3.2 0 0 0 3.2 3.2H60.8a3.2 3.2 0 0 0 3.2-3.2V3.2A3.2 3.2 0 0 0 60.8 0h-7.314Z",
      fill: "currentColor"
    })
  });
}
function Pause(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm-5.4 18h-5.2a1.4 1.4 0 0 0-1.4 1.4v25.2a1.4 1.4 0 0 0 1.4 1.4h5.2a1.4 1.4 0 0 0 1.4-1.4V19.4a1.4 1.4 0 0 0-1.4-1.4Zm16 0h-5.2a1.4 1.4 0 0 0-1.4 1.4v25.2a1.4 1.4 0 0 0 1.4 1.4h5.2a1.4 1.4 0 0 0 1.4-1.4V19.4a1.4 1.4 0 0 0-1.4-1.4Z",
      fill: "currentColor"
    })
  });
}
function Play(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm-7.61 18.188c-.435.251-.702.715-.701 1.216v25.194a1.402 1.402 0 0 0 2.104 1.214L47.61 33.214a1.402 1.402 0 0 0 0-2.428L25.793 18.188c-.435-.25-.97-.25-1.404 0Z",
      fill: "currentColor"
    })
  });
}
function Previous(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M10.514 0a3.2 3.2 0 0 1 3.2 3.2v23.543L59.2.489A3.2 3.2 0 0 1 64 3.255V60.74a3.2 3.2 0 0 1-4.8 2.774L13.714 37.253V60.8a3.2 3.2 0 0 1-3.2 3.2H3.2A3.2 3.2 0 0 1 0 60.8V3.2A3.2 3.2 0 0 1 3.2 0h7.314Z",
      fill: "currentColor"
    })
  });
}
var Wrapper2 = styled("div")({
  alignItems: "center",
  display: "flex",
  fontSize: px(12),
  transition: "height 0.3s",
  zIndex: 10
}, ({
  style
}) => ({
  '[class^="rswp_"]': {
    color: style.c,
    lineHeight: 1,
    minWidth: px(32)
  },
  ".rswp_progress": {
    marginRight: px(style.sliderHeight + 6),
    textAlign: "right"
  },
  ".rswp_duration": {
    marginLeft: px(style.sliderHeight + 6),
    textAlign: "left"
  }
}), "SliderRSWP");
function Slider(props) {
  const {
    durationMs,
    isMagnified,
    onChangeRange,
    onToggleMagnify,
    position,
    progressMs,
    styles
  } = props;
  const handleChangeRange = async ({
    x
  }) => {
    onChangeRange(x);
  };
  const handleSize = styles.sliderHeight + 6;
  return /* @__PURE__ */jsxs(Wrapper2, {
    "data-component-name": "Slider",
    "data-position": position,
    onMouseEnter: onToggleMagnify,
    onMouseLeave: onToggleMagnify,
    style: {
      c: styles.color,
      sliderHeight: styles.sliderHeight
    },
    children: [/* @__PURE__ */jsx("div", {
      className: "rswp_progress",
      children: millisecondsToTime(progressMs)
    }), /* @__PURE__ */jsx(RangeSlider, {
      axis: "x",
      className: "slider",
      "data-component-name": "progress-bar",
      onChange: handleChangeRange,
      styles: {
        options: {
          thumbBorder: 0,
          thumbBorderRadius: styles.sliderHandleBorderRadius,
          thumbColor: styles.sliderHandleColor,
          thumbSize: isMagnified ? handleSize + 4 : handleSize,
          height: isMagnified ? styles.sliderHeight + 4 : styles.sliderHeight,
          padding: 0,
          rangeColor: styles.sliderColor,
          trackBorderRadius: styles.sliderTrackBorderRadius,
          trackColor: styles.sliderTrackColor
        }
      },
      x: position,
      xMax: 100,
      xMin: 0,
      xStep: 0.1
    }), /* @__PURE__ */jsx("div", {
      className: "rswp_duration",
      children: millisecondsToTime(durationMs)
    })]
  });
}
var Slider_default = memo(Slider);
var Wrapper3 = styled("div")({
  ".rswp__volume": {
    position: "absolute",
    right: 0,
    top: 0
  },
  ".rswp__devices": {
    position: "absolute",
    left: 0,
    top: 0
  }
}, ({
  style
}) => {
  const isCompactLayout = style.layout === "compact";
  const styles = {};
  if (isCompactLayout) {
    styles.padding = px(8);
  } else {
    styles.padding = `${px(4)} 0`;
    styles["@media (max-width: 767px)"] = {
      padding: px(8)
    };
  }
  return styles;
}, "ControlsRSWP");
var Buttons = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  marginBottom: px(8),
  position: "relative",
  "> div": {
    alignItems: "center",
    display: "flex",
    minWidth: px(32),
    textAlign: "center"
  }
}, ({
  style
}) => ({
  color: style.c
}), "ControlsButtonsRSWP");
var Button = styled("button")({
  alignItems: "center",
  display: "inline-flex",
  fontSize: px(16),
  height: px(32),
  justifyContent: "center",
  width: px(32),
  "&:disabled": {
    cursor: "default",
    opacity: 0.6
  },
  "&.rswp__toggle": {
    fontSize: px(32),
    width: px(48)
  }
}, () => ({}), "ControlsButtonRSWP");
function Controls(props) {
  const {
    components: {
      leftButton,
      rightButton
    } = {},
    devices,
    durationMs,
    isActive,
    isExternalDevice,
    isMagnified,
    isPlaying,
    layout,
    locale,
    nextTracks,
    onChangeRange,
    onClickNext,
    onClickPrevious,
    onClickTogglePlay,
    onToggleMagnify,
    position,
    progressMs,
    styles,
    volume
  } = props;
  const {
    color
  } = styles;
  return /* @__PURE__ */jsxs(Wrapper3, {
    "data-component-name": "Controls",
    "data-playing": isPlaying,
    style: {
      layout
    },
    children: [/* @__PURE__ */jsxs(Buttons, {
      style: {
        c: color
      },
      children: [devices && /* @__PURE__ */jsx("div", {
        className: "rswp__devices",
        children: devices
      }), /* @__PURE__ */jsx("div", {
        children: leftButton
      }), /* @__PURE__ */jsx("div", {
        children: /* @__PURE__ */jsx(Button, {
          "aria-label": locale.previous,
          className: "ButtonRSWP",
          disabled: !isActive && !isExternalDevice,
          onClick: onClickPrevious,
          title: locale.previous,
          type: "button",
          children: /* @__PURE__ */jsx(Previous, {})
        })
      }), /* @__PURE__ */jsx("div", {
        children: /* @__PURE__ */jsx(Button, {
          "aria-label": isPlaying ? locale.pause : locale.play,
          className: "ButtonRSWP rswp__toggle",
          onClick: onClickTogglePlay,
          title: isPlaying ? locale.pause : locale.play,
          type: "button",
          children: isPlaying ? /* @__PURE__ */jsx(Pause, {}) : /* @__PURE__ */jsx(Play, {})
        })
      }), /* @__PURE__ */jsx("div", {
        children: /* @__PURE__ */jsx(Button, {
          "aria-label": locale.next,
          className: "ButtonRSWP",
          disabled: !nextTracks.length && !isActive && !isExternalDevice,
          onClick: onClickNext,
          title: locale.next,
          type: "button",
          children: /* @__PURE__ */jsx(Next, {})
        })
      }), /* @__PURE__ */jsx("div", {
        children: rightButton
      }), volume && /* @__PURE__ */jsx("div", {
        className: "rswp__volume",
        children: volume
      })]
    }), /* @__PURE__ */jsx(Slider_default, {
      durationMs,
      isMagnified,
      onChangeRange,
      onToggleMagnify,
      position,
      progressMs,
      styles
    })]
  });
}
var Controls_default = memo(Controls);
function ClickOutside(props) {
  const {
    children,
    isActive,
    onClick,
    ...rest
  } = props;
  const containerRef = useRef(null);
  const isTouch = useRef(false);
  const handleClick = useRef(event => {
    const container = containerRef.current;
    if (event.type === "touchend") {
      isTouch.current = true;
    }
    if (event.type === "click" && isTouch.current) {
      return;
    }
    if (container && !container.contains(event.target)) {
      onClick();
    }
  });
  useEffect(() => {
    const {
      current
    } = handleClick;
    if (isActive) {
      document.addEventListener("touchend", current, true);
      document.addEventListener("click", current, true);
    }
    return () => {
      document.removeEventListener("touchend", current, true);
      document.removeEventListener("click", current, true);
    };
  }, [isActive]);
  return /* @__PURE__ */jsx("div", {
    ref: containerRef,
    ...rest,
    children
  });
}
var ClickOutside_default = memo(ClickOutside);
function DevicesIcon(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M57 4c3.864 0 7 3.136 7 7v42a7 7 0 0 1-7 7H31a7 7 0 0 1-7-7V11c0-3.864 3.136-7 7-7h26ZM16 54v6H8v-6h8Zm41-44H31a1 1 0 0 0-1 1v42a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1ZM44 32a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM16 4v6H7a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h9v6H7a7 7 0 0 1-7-7V11c0-3.864 3.136-7 7-7h9Zm28 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
      fill: "currentColor"
    })
  });
}
function DevicesComputerIcon(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M7.226 10.323a7.228 7.228 0 0 1 7.226-7.226h35.096a7.228 7.228 0 0 1 7.226 7.226V37.16a7.226 7.226 0 0 1-7.226 7.226H14.452a7.226 7.226 0 0 1-7.226-7.226V10.323Zm7.226-1.033c-.57 0-1.033.462-1.033 1.033V37.16c0 .57.463 1.033 1.033 1.033h35.096c.57 0 1.033-.463 1.033-1.033V10.323c0-.57-.463-1.033-1.033-1.033H14.452ZM0 57.806a3.097 3.097 0 0 1 3.097-3.096h57.806a3.097 3.097 0 0 1 0 6.193H3.097A3.097 3.097 0 0 1 0 57.806Z",
      fill: "currentColor"
    })
  });
}
function DevicesMobileIcon(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M44.8 0a9.6 9.6 0 0 1 9.6 9.6v44.8a9.6 9.6 0 0 1-9.6 9.6H19.2a9.6 9.6 0 0 1-9.6-9.6V9.6A9.6 9.6 0 0 1 19.2 0h25.6Zm0 6.4H19.2A3.2 3.2 0 0 0 16 9.6v44.8a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V9.6a3.2 3.2 0 0 0-3.2-3.2ZM32 43.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
      fill: "currentColor"
    })
  });
}
function DevicesSpeakerIcon(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M45 4c3.864 0 7 3.136 7 7v42a7 7 0 0 1-7 7H19a7 7 0 0 1-7-7V11c0-3.864 3.136-7 7-7h26Zm0 6H19a1 1 0 0 0-1 1v42a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1ZM32 32a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0-16a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
      fill: "currentColor"
    })
  });
}
var Wrapper4 = styled("div")({
  "pointer-events": "all",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  zIndex: 20,
  "> div": {
    backgroundColor: "#000",
    borderRadius: px(8),
    color: "#fff",
    filter: "drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.5))",
    fontSize: px(14),
    padding: px(16),
    position: "absolute",
    textAlign: "left",
    "> p": {
      fontWeight: "bold",
      marginBottom: px(8),
      marginTop: px(16),
      whiteSpace: "nowrap"
    },
    button: {
      alignItems: "center",
      display: "flex",
      whiteSpace: "nowrap",
      width: "100%",
      "&:not(:last-of-type)": {
        marginBottom: px(12)
      },
      span: {
        display: "inline-block",
        marginLeft: px(4)
      }
    },
    "> span": {
      background: "transparent",
      borderLeft: `6px solid transparent`,
      borderRight: `6px solid transparent`,
      content: '""',
      display: "block",
      height: 0,
      position: "absolute",
      width: 0
    }
  },
  "> button": {
    alignItems: "center",
    display: "flex",
    fontSize: px(24),
    height: px(32),
    justifyContent: "center",
    width: px(32)
  }
}, ({
  style
}) => {
  const isCompact = style.layout === "compact";
  const divStyles = isCompact ? {
    bottom: "120%",
    left: 0
  } : {
    [style.p]: "120%",
    left: 0,
    "@media (min-width: 768px)": {
      left: "auto",
      right: 0
    }
  };
  const spanStyles = isCompact ? {
    bottom: `-${px(6)}`,
    borderTop: `6px solid #000`,
    left: px(10)
  } : {
    [style.p === "top" ? "border-bottom" : "border-top"]: `6px solid #000`,
    [style.p]: "-6px",
    left: px(10),
    "@media (min-width: 768px)": {
      left: "auto",
      right: px(10)
    }
  };
  return {
    "> button": {
      color: style.c
    },
    "> div": {
      ...divStyles,
      "> span": spanStyles
    }
  };
}, "DevicesRSWP");
var ListHeader = styled("div")({
  p: {
    whiteSpace: "nowrap",
    "&:nth-of-type(1)": {
      fontWeight: "bold",
      marginBottom: px(8)
    },
    "&:nth-of-type(2)": {
      alignItems: "center",
      display: "flex",
      span: {
        display: "inline-block",
        marginLeft: px(4)
      }
    }
  }
});
function getDeviceIcon(type) {
  if (type.toLowerCase().includes("speaker")) {
    return /* @__PURE__ */jsx(DevicesSpeakerIcon, {});
  }
  if (type.toLowerCase().includes("computer")) {
    return /* @__PURE__ */jsx(DevicesComputerIcon, {});
  }
  return /* @__PURE__ */jsx(DevicesMobileIcon, {});
}
function Devices(props) {
  const {
    currentDeviceId,
    deviceId,
    devices = [],
    layout,
    locale,
    onClickDevice,
    open,
    playerPosition,
    styles: {
      color
    }
  } = props;
  const [isOpen, setOpen] = useState(open);
  const handleClickSetDevice = event => {
    const {
      dataset
    } = event.currentTarget;
    if (dataset.id) {
      onClickDevice(dataset.id);
      setOpen(false);
    }
  };
  const handleClickToggleList = useCallback(() => {
    setOpen(s => !s);
  }, []);
  const {
    currentDevice,
    otherDevices
  } = devices.reduce((acc, device) => {
    if (device.id === currentDeviceId) {
      acc.currentDevice = device;
    } else {
      acc.otherDevices.push(device);
    }
    return acc;
  }, {
    currentDevice: null,
    otherDevices: []
  });
  let icon = /* @__PURE__ */jsx(DevicesIcon, {});
  if (deviceId && currentDevice && currentDevice.id !== deviceId) {
    icon = getDeviceIcon(currentDevice.type);
  }
  return /* @__PURE__ */jsx(ClickOutside_default, {
    isActive: isOpen,
    onClick: handleClickToggleList,
    children: /* @__PURE__ */jsx(Wrapper4, {
      "data-component-name": "Devices",
      "data-device-id": currentDeviceId,
      style: {
        c: color,
        layout,
        p: playerPosition
      },
      children: !!devices.length && /* @__PURE__ */jsxs(Fragment, {
        children: [isOpen && /* @__PURE__ */jsxs("div", {
          children: [currentDevice && /* @__PURE__ */jsxs(ListHeader, {
            children: [/* @__PURE__ */jsx("p", {
              children: locale.currentDevice
            }), /* @__PURE__ */jsxs("p", {
              children: [getDeviceIcon(currentDevice.type), /* @__PURE__ */jsx("span", {
                children: currentDevice.name
              })]
            })]
          }), !!otherDevices.length && /* @__PURE__ */jsxs(Fragment, {
            children: [/* @__PURE__ */jsx("p", {
              children: locale.otherDevices
            }), otherDevices.map(device => /* @__PURE__ */jsxs("button", {
              "aria-label": device.name,
              className: "ButtonRSWP",
              "data-id": device.id,
              onClick: handleClickSetDevice,
              type: "button",
              children: [getDeviceIcon(device.type), /* @__PURE__ */jsx("span", {
                children: device.name
              })]
            }, device.id))]
          }), /* @__PURE__ */jsx("span", {})]
        }), /* @__PURE__ */jsx("button", {
          "aria-label": locale.devices,
          className: "ButtonRSWP",
          onClick: handleClickToggleList,
          title: locale.devices,
          type: "button",
          children: icon
        })]
      })
    })
  });
}
var Wrapper5 = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  width: "100%"
}, ({
  style
}) => ({
  backgroundColor: style.bgColor,
  borderTop: `1px solid ${style.errorColor}`,
  color: style.errorColor,
  height: px(style.h)
}), "ErrorRSWP");
function ErrorMessage({
  children,
  styles: {
    bgColor,
    errorColor,
    height
  }
}) {
  return /* @__PURE__ */jsx(Wrapper5, {
    "data-component-name": "ErrorMessage",
    style: {
      bgColor,
      errorColor,
      h: height
    },
    children
  });
}
function useMediaQuery(input) {
  const getMatches = query => {
    return window.matchMedia(query).matches;
  };
  const [matches, setMatches] = useState(getMatches(input));
  function handleChange() {
    setMatches(getMatches(input));
  }
  useEffect(() => {
    const matchMedia = window.matchMedia(input);
    handleChange();
    try {
      matchMedia.addEventListener("change", handleChange);
    } catch {
      matchMedia.addListener(handleChange);
    }
    return () => {
      try {
        matchMedia.removeEventListener("change", handleChange);
      } catch {
        matchMedia.removeListener(handleChange);
      }
    };
  }, [input]);
  return matches;
}
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function Favorite(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M63.673 16.52A17.676 17.676 0 0 0 49.197 2.563c-5.4-.861-10.891.852-14.844 4.63a3.43 3.43 0 0 1-4.672 0C22.956.689 12.305.62 5.498 7.039c-6.808 6.419-7.366 17.055-1.268 24.15l24.246 28.894a4.623 4.623 0 0 0 7.078 0L59.8 31.19a17.328 17.328 0 0 0 3.873-14.66v-.008Z",
      fill: "currentColor"
    })
  });
}
function FavoriteOutline(props) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M5.944 7.206C13.271.3 24.723.34 31.999 7.3A18.924 18.924 0 0 1 48.02 2.32h.008a19.068 19.068 0 0 1 15.617 15.071v.013A18.759 18.759 0 0 1 59.47 33.26L37.573 59.353a7.288 7.288 0 0 1-8.642 1.916 7.276 7.276 0 0 1-2.498-1.912l-21.901-26.1c-6.55-7.671-5.93-19.131 1.408-26.051h.004Zm13.04 1.04a12.726 12.726 0 0 0-9.737 20.997l.021.02 21.905 26.105c.316.372.84.488 1.284.285.143-.066.27-.164.372-.285l21.934-26.137a12.565 12.565 0 0 0 2.808-10.625 12.875 12.875 0 0 0-10.534-10.17 12.714 12.714 0 0 0-10.785 3.37l-.029.029a6.198 6.198 0 0 1-8.444 0l-.037-.033a12.727 12.727 0 0 0-8.758-3.556Z",
      fill: "currentColor"
    })
  });
}
function SpotifyLogo({
  bgColor,
  ...rest
}) {
  return /* @__PURE__ */jsx("svg", {
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 512 160",
    width: "3.2em",
    ...rest,
    children: /* @__PURE__ */jsx("path", {
      d: "M79.655 0C35.664 0 0 35.663 0 79.654c0 43.993 35.664 79.653 79.655 79.653 43.996 0 79.656-35.66 79.656-79.653 0-43.988-35.66-79.65-79.657-79.65L79.655 0Zm36.53 114.884a4.963 4.963 0 0 1-6.83 1.646c-18.702-11.424-42.246-14.011-69.973-7.676a4.967 4.967 0 0 1-5.944-3.738 4.958 4.958 0 0 1 3.734-5.945c30.343-6.933 56.37-3.948 77.367 8.884a4.965 4.965 0 0 1 1.645 6.83Zm9.75-21.689c-1.799 2.922-5.622 3.845-8.543 2.047-21.41-13.16-54.049-16.972-79.374-9.284a6.219 6.219 0 0 1-7.75-4.138 6.22 6.22 0 0 1 4.141-7.745c28.929-8.778 64.892-4.526 89.48 10.583 2.92 1.798 3.843 5.622 2.045 8.538Zm.836-22.585C101.1 55.362 58.742 53.96 34.231 61.4c-3.936 1.194-8.098-1.028-9.29-4.964a7.453 7.453 0 0 1 4.965-9.294c28.137-8.542 74.912-6.892 104.469 10.655a7.441 7.441 0 0 1 2.606 10.209c-2.092 3.54-6.677 4.707-10.206 2.605h-.004Zm89.944 2.922c-13.754-3.28-16.198-5.581-16.198-10.418 0-4.57 4.299-7.645 10.7-7.645 6.202 0 12.347 2.336 18.796 7.143.19.145.437.203.675.165a.888.888 0 0 0 .6-.367l6.715-9.466a.903.903 0 0 0-.171-1.225c-7.676-6.157-16.313-9.15-26.415-9.15-14.848 0-25.225 8.911-25.225 21.662 0 13.673 8.95 18.515 24.417 22.252 13.155 3.031 15.38 5.57 15.38 10.11 0 5.032-4.49 8.161-11.718 8.161-8.028 0-14.582-2.71-21.906-9.046a.932.932 0 0 0-.656-.218.89.89 0 0 0-.619.313l-7.533 8.96a.906.906 0 0 0 .086 1.256c8.522 7.61 19.004 11.624 30.323 11.624 16 0 26.339-8.742 26.339-22.277.028-11.421-6.81-17.746-23.561-21.821l-.029-.013Zm59.792-13.564c-6.934 0-12.622 2.732-17.321 8.33v-6.3c0-.498-.4-.903-.894-.903h-12.318a.899.899 0 0 0-.894.902v70.009c0 .494.4.903.894.903h12.318a.901.901 0 0 0 .894-.903v-22.097c4.699 5.26 10.387 7.838 17.32 7.838 12.89 0 25.94-9.92 25.94-28.886.019-18.97-13.032-28.894-25.93-28.894l-.01.001Zm11.614 28.893c0 9.653-5.945 16.397-14.468 16.397-8.418 0-14.772-7.048-14.772-16.397 0-9.35 6.354-16.397 14.772-16.397 8.38 0 14.468 6.893 14.468 16.396Zm47.759-28.893c-16.598 0-29.601 12.78-29.601 29.1 0 16.143 12.917 28.784 29.401 28.784 16.655 0 29.696-12.736 29.696-28.991 0-16.2-12.955-28.89-29.496-28.89v-.003Zm0 45.385c-8.827 0-15.485-7.096-15.485-16.497 0-9.444 6.43-16.298 15.285-16.298 8.884 0 15.58 7.093 15.58 16.504 0 9.443-6.468 16.291-15.38 16.291Zm64.937-44.258h-13.554V47.24c0-.497-.4-.902-.894-.902H374.05a.906.906 0 0 0-.904.902v13.855h-5.916a.899.899 0 0 0-.894.902v10.584a.9.9 0 0 0 .894.903h5.916v27.39c0 11.062 5.508 16.674 16.38 16.674 4.413 0 8.075-.914 11.528-2.873a.88.88 0 0 0 .457-.78v-10.083a.896.896 0 0 0-.428-.76.873.873 0 0 0-.876-.039c-2.368 1.19-4.66 1.741-7.229 1.741-3.947 0-5.716-1.798-5.716-5.812V73.49h13.554a.899.899 0 0 0 .894-.903V62.003a.873.873 0 0 0-.884-.903l-.01-.005Zm47.217.054v-1.702c0-5.006 1.921-7.238 6.22-7.238 2.57 0 4.633.51 6.945 1.28a.895.895 0 0 0 1.18-.858l-.001-10.377a.891.891 0 0 0-.637-.865c-2.435-.726-5.555-1.47-10.235-1.47-11.367 0-17.388 6.405-17.388 18.516v2.606h-5.916a.906.906 0 0 0-.904.902v10.638c0 .497.41.903.904.903h5.916v42.237c0 .504.41.904.904.904h12.308c.504 0 .904-.4.904-.904V73.487h11.5l17.616 42.234c-1.998 4.433-3.967 5.317-6.65 5.317-2.168 0-4.46-.646-6.79-1.93a.98.98 0 0 0-.714-.067.896.896 0 0 0-.533.485l-4.175 9.16a.9.9 0 0 0 .39 1.17c4.356 2.359 8.284 3.367 13.145 3.367 9.093 0 14.125-4.242 18.548-15.637l21.364-55.204a.88.88 0 0 0-.095-.838.878.878 0 0 0-.733-.392h-12.822a.901.901 0 0 0-.856.605l-13.136 37.509-14.382-37.534a.898.898 0 0 0-.837-.58h-21.04v-.003Zm-27.375-.054h-12.318a.907.907 0 0 0-.903.902v53.724c0 .504.409.904.903.904h12.318c.495 0 .904-.4.904-.904v-53.72a.9.9 0 0 0-.904-.903v-.003Zm-6.088-24.464c-4.88 0-8.836 3.95-8.836 8.828a8.835 8.835 0 0 0 8.836 8.836c4.88 0 8.827-3.954 8.827-8.836a8.83 8.83 0 0 0-8.827-8.828Z",
      fill: textColor(bgColor)
    })
  });
}
var imageSize = 64;
var iconSize = 32;
var Wrapper6 = styled("div")({
  textAlign: "left",
  "> a": {
    display: "inline-flex",
    textDecoration: "none",
    minHeight: px(64),
    minWidth: px(64),
    "&:hover": {
      textDecoration: "underline"
    }
  },
  button: {
    alignItems: "center",
    display: "flex",
    fontSize: px(16),
    height: px(iconSize + 8),
    justifyContent: "center",
    width: px(iconSize)
  }
}, ({
  style
}) => {
  const isCompactLayout = style.layout === "compact";
  const styles = {};
  if (isCompactLayout) {
    styles.borderBottom = `1px solid ${fade(style.c, 40)}`;
    styles["> a"] = {
      display: "flex",
      margin: "0 auto",
      maxWidth: px(640),
      paddingBottom: "100%",
      position: "relative",
      img: {
        display: "block",
        bottom: 0,
        left: 0,
        maxWidth: "100%",
        position: "absolute",
        right: 0,
        top: 0
      }
    };
  } else {
    styles.alignItems = "center";
    styles.display = "flex";
    styles.minHeight = px(80);
    styles["@media (max-width: 767px)"] = {
      borderBottom: `1px solid ${fade(style.c, 40)}`,
      paddingLeft: px(8),
      display: "none",
      width: "100%"
    };
    styles.img = {
      height: px(imageSize),
      width: px(imageSize)
    };
    styles["&.rswp__active"] = {
      "@media (max-width: 767px)": {
        display: "flex"
      }
    };
  }
  return {
    button: {
      color: style.c,
      "&.rswp__active": {
        color: style.activeColor
      }
    },
    ...styles
  };
}, "InfoRSWP");
var ContentWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "> a": {
    fontSize: px(22),
    marginTop: px(4)
  }
}, ({
  style
}) => {
  const isCompactLayout = style.layout === "compact";
  const styles = {};
  if (isCompactLayout) {
    styles.padding = px(8);
    styles.width = "100%";
  } else {
    styles.minHeight = px(imageSize);
    if (!style.hideCoverArt) {
      styles.marginLeft = px(8);
      styles.width = `calc(100% - ${px(imageSize + 8)})`;
    } else {
      styles.width = "100%";
    }
  }
  return styles;
}, "ContentWrapperRSWP");
var Content = styled("div")({
  display: "flex",
  justifyContent: "start",
  '[data-type="title-artist-wrapper"]': {
    overflow: "hidden",
    div: {
      marginLeft: `-${px(8)}`,
      whiteSpace: "nowrap"
    }
  },
  p: {
    fontSize: px(14),
    lineHeight: 1.3,
    paddingLeft: px(8),
    paddingRight: px(8),
    width: "100%",
    "&:nth-of-type(1)": {
      alignItems: "center",
      display: "inline-flex"
    },
    "&:nth-of-type(2)": {
      fontSize: px(12)
    }
  },
  span: {
    display: "inline-block"
  }
}, ({
  style
}) => {
  const maskImageColor = getBgColor(style.bgColor, style.trackNameColor);
  return {
    '[data-type="title-artist-wrapper"]': {
      color: style.trackNameColor,
      maxWidth: `calc(100% - ${px(style.showSaveIcon ? iconSize : 0)})`,
      div: {
        "-webkit-mask-image": `linear-gradient(90deg,transparent 0, ${maskImageColor} 6px, ${maskImageColor} calc(100% - 12px),transparent)`
      }
    },
    p: {
      "&:nth-of-type(1)": {
        color: style.trackNameColor,
        a: {
          color: style.trackNameColor
        }
      },
      "&:nth-of-type(2)": {
        color: style.trackArtistColor,
        a: {
          color: style.trackArtistColor
        }
      }
    }
  };
}, "ContentRSWP");
function Info(props) {
  const {
    hideAttribution,
    hideCoverArt,
    isActive,
    layout,
    locale,
    onFavoriteStatusChange,
    showSaveIcon,
    styles: {
      activeColor,
      bgColor,
      color,
      height,
      trackArtistColor,
      trackNameColor
    },
    token,
    track: {
      artists = [],
      id,
      image,
      name,
      uri
    },
    updateSavedStatus
  } = props;
  const [isSaved, setIsSaved] = useState(false);
  const isMounted = useRef(false);
  const previousId = usePrevious(id);
  const updateState = state => {
    if (!isMounted.current) {
      return;
    }
    setIsSaved(state);
  };
  const setStatus = async () => {
    if (!isMounted.current) {
      return;
    }
    if (updateSavedStatus && id) {
      updateSavedStatus(newStatus => {
        updateState(newStatus);
      });
    }
    const status = await checkTracksStatus(token, id);
    const [isFavorite] = status || [false];
    updateState(isFavorite);
    onFavoriteStatusChange(isSaved);
  };
  useEffect(() => {
    isMounted.current = true;
    if (showSaveIcon && id) {
      setStatus();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (showSaveIcon && previousId !== id && id) {
      updateState(false);
      setStatus();
    }
  });
  const handleClickIcon = async () => {
    if (isSaved) {
      await removeTracks(token, id);
      updateState(false);
    } else {
      await saveTracks(token, id);
      updateState(true);
    }
    onFavoriteStatusChange(!isSaved);
  };
  const title = getSpotifyLinkTitle(name, locale.title);
  let favorite;
  if (showSaveIcon && id) {
    favorite = /* @__PURE__ */jsx("button", {
      "aria-label": isSaved ? locale.removeTrack : locale.saveTrack,
      className: `ButtonRSWP${isSaved ? " rswp__active" : ""}`,
      onClick: handleClickIcon,
      title: isSaved ? locale.removeTrack : locale.saveTrack,
      type: "button",
      children: isSaved ? /* @__PURE__ */jsx(Favorite, {}) : /* @__PURE__ */jsx(FavoriteOutline, {})
    });
  }
  const classes = [];
  if (isActive) {
    classes.push("rswp__active");
  }
  if (!id) {
    return /* @__PURE__ */jsx("div", {});
  }
  return /* @__PURE__ */jsxs(Wrapper6, {
    className: classes.join(" "),
    "data-component-name": "Info",
    style: {
      activeColor,
      c: color,
      h: height,
      layout,
      showSaveIcon
    },
    children: [!hideCoverArt && /* @__PURE__ */jsx("a", {
      "aria-label": title,
      href: getSpotifyLink(uri),
      rel: "noreferrer",
      target: "_blank",
      title,
      children: /* @__PURE__ */jsx("img", {
        alt: name,
        src: image
      })
    }), /* @__PURE__ */jsxs(ContentWrapper, {
      style: {
        hideCoverArt,
        layout,
        showSaveIcon
      },
      children: [!!name && /* @__PURE__ */jsxs(Content, {
        style: {
          bgColor,
          layout,
          showSaveIcon,
          trackArtistColor,
          trackNameColor
        },
        children: [/* @__PURE__ */jsx("div", {
          "data-type": "title-artist-wrapper",
          children: /* @__PURE__ */jsxs("div", {
            children: [/* @__PURE__ */jsx("p", {
              children: /* @__PURE__ */jsx("span", {
                children: /* @__PURE__ */jsx("a", {
                  "aria-label": title,
                  href: getSpotifyLink(uri),
                  rel: "noreferrer",
                  target: "_blank",
                  title,
                  children: name
                })
              })
            }), /* @__PURE__ */jsx("p", {
              title: artists.map(d => d.name).join(", "),
              children: artists.map((artist, index) => {
                const artistTitle = getSpotifyLinkTitle(artist.name, locale.title);
                return /* @__PURE__ */jsxs("span", {
                  children: [index ? ", " : "", /* @__PURE__ */jsx("a", {
                    "aria-label": artistTitle,
                    href: getSpotifyLink(artist.uri),
                    rel: "noreferrer",
                    target: "_blank",
                    title: artistTitle,
                    children: artist.name
                  })]
                }, artist.uri);
              })
            })]
          })
        }), favorite]
      }), !hideAttribution && /* @__PURE__ */jsx("a", {
        "aria-label": "Play on Spotify",
        href: getSpotifyLink(uri),
        rel: "noreferrer",
        target: "_blank",
        children: /* @__PURE__ */jsx(SpotifyLogo, {
          bgColor
        })
      })]
    })]
  });
}
var Info_default = memo(Info);
var Wrapper7 = styled("div")({
  alignItems: "center",
  display: "flex",
  jsutifyContent: "center",
  position: "relative",
  "> div": {
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: 0,
    boxSizing: "border-box",
    height: 0,
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 0
  }
}, ({
  style
}) => {
  const pulse = keyframes({
    "0%": {
      height: 0,
      width: 0
    },
    "30%": {
      borderWidth: px(8),
      height: px(style.loaderSize),
      opacity: 1,
      width: px(style.loaderSize)
    },
    "100%": {
      borderWidth: 0,
      height: px(style.loaderSize),
      opacity: 0,
      width: px(style.loaderSize)
    }
  });
  return {
    height: px(style.h),
    "> div": {
      animation: `${pulse} 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1)`,
      borderColor: style.loaderColor,
      height: px(style.loaderSize),
      width: px(style.loaderSize)
    }
  };
}, "LoaderRSWP");
function Loader({
  styles: {
    height,
    loaderColor,
    loaderSize
  }
}) {
  return /* @__PURE__ */jsx(Wrapper7, {
    "data-component-name": "Loader",
    style: {
      h: height,
      loaderColor,
      loaderSize
    },
    children: /* @__PURE__ */jsx("div", {})
  });
}
var Player = forwardRef((props, ref) => {
  const {
    children,
    styles: {
      bgColor,
      height
    },
    ...rest
  } = props;
  return /* @__PURE__ */jsx("div", {
    ref,
    className: "PlayerRSWP",
    "data-component-name": "Player",
    style: {
      background: bgColor,
      minHeight: px(height)
    },
    ...rest,
    children
  });
});
var Player_default = Player;
function VolumeHigh(props) {
  return /* @__PURE__ */jsx("svg", {
    "data-component-name": "VolumeHigh",
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M37.963 3.402a2.989 2.989 0 0 1 1.5 2.596v52a3 3 0 0 1-4.5 2.6l-27.7-16C.32 40.572-2.06 31.688 1.943 24.73a14.556 14.556 0 0 1 5.32-5.328l27.7-16a3 3 0 0 1 3 0ZM45 9.542a23.008 23.008 0 0 1 0 44.912V48.25a17.008 17.008 0 0 0 0-32.508Zm-11.532 1.656-23.2 13.4a8.556 8.556 0 0 0 0 14.8l23.2 13.4v-41.6ZM45 22.238a11 11 0 0 1 0 19.52v-19.52Z",
      fill: "currentColor"
    })
  });
}
function VolumeLow(props) {
  return /* @__PURE__ */jsx("svg", {
    "data-component-name": "VolumeLow",
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M37.963 3.398a3 3 0 0 1 1.5 2.6v52a3 3 0 0 1-4.5 2.6l-27.7-16C.32 40.572-2.06 31.688 1.943 24.73a14.556 14.556 0 0 1 5.32-5.328l27.7-16a3 3 0 0 1 3 0v-.004Zm-27.696 21.2a8.556 8.556 0 0 0 0 14.8l23.2 13.4v-41.6l-23.2 13.4ZM45 41.758v-19.52a11 11 0 0 1 0 19.52Z",
      fill: "currentColor"
    })
  });
}
function VolumeHigh2(props) {
  return /* @__PURE__ */jsx("svg", {
    "data-component-name": "VolumeMid",
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M37.963 3.398a3 3 0 0 1 1.5 2.6v52a3 3 0 0 1-4.5 2.6l-27.7-16C.32 40.572-2.06 31.688 1.943 24.73a14.556 14.556 0 0 1 5.32-5.328l27.7-16a3 3 0 0 1 3 0v-.004Zm-27.696 21.2a8.556 8.556 0 0 0 0 14.8l23.2 13.4v-41.6l-23.2 13.4ZM45 48.946a18.008 18.008 0 0 0 0-33.896v6.6a11.996 11.996 0 0 1 0 20.7v6.596Z",
      fill: "currentColor"
    })
  });
}
function VolumeMute(props) {
  return /* @__PURE__ */jsx("svg", {
    "data-component-name": "VolumeMute",
    height: "1em",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 64 64",
    width: "1em",
    ...props,
    children: /* @__PURE__ */jsx("path", {
      d: "M34.963 3.402a3 3 0 0 1 4.5 2.6v7.624a19.03 19.03 0 0 0-6 2.776v-5.2l-23.2 13.4a8.57 8.57 0 0 0-3.12 3.128 8.564 8.564 0 0 0 3.124 11.68l23.196 13.392v-5.2a18.92 18.92 0 0 0 6 2.776v7.624a3 3 0 0 1-4.5 2.596l-27.7-16a14.556 14.556 0 0 1-5.32-5.328C-2.06 32.313.32 23.428 7.263 19.402l27.7-16Zm17.354 17.6a3 3 0 0 1 2.122 5.12l-5.88 5.88 5.876 5.88a3 3 0 0 1-4.24 4.24l-5.88-5.88-5.88 5.88a3 3 0 1 1-4.385-4.095l6.025-6.025-5.876-5.88a3 3 0 0 1 4.236-4.24l5.88 5.88 5.88-5.88a3 3 0 0 1 2.122-.88Z",
      fill: "currentColor"
    })
  });
}
var WrapperWithToggle = styled("div")({
  display: "none",
  "pointer-events": "all",
  position: "relative",
  zIndex: 20,
  "> div": {
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: px(4),
    color: "#fff",
    display: "flex",
    filter: "drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.5))",
    flexDirection: "column",
    left: "-4px",
    padding: px(16),
    position: "absolute",
    "> span": {
      background: "transparent",
      borderLeft: `6px solid transparent`,
      borderRight: `6px solid transparent`,
      content: '""',
      display: "block",
      height: 0,
      position: "absolute",
      width: 0
    }
  },
  "> button": {
    alignItems: "center",
    display: "flex",
    fontSize: px(24),
    height: px(32),
    justifyContent: "center",
    width: px(32)
  },
  "@media (any-pointer: fine)": {
    display: "block"
  }
}, ({
  style
}) => {
  const isCompact = style.layout === "compact";
  const spanStyles = isCompact ? {
    bottom: `-${px(6)}`,
    borderTop: `6px solid #000`
  } : {
    [style.p === "top" ? "border-bottom" : "border-top"]: `6px solid #000`,
    [style.p]: "-6px"
  };
  return {
    "> button": {
      color: style.c
    },
    "> div": {
      [isCompact ? "bottom" : style.p]: "130%",
      "> span": spanStyles
    }
  };
}, "VolumeRSWP");
var WrapperInline = styled("div")({
  display: "none",
  padding: `0 ${px(8)}`,
  "pointer-events": "all",
  "> div": {
    display: "flex",
    padding: `0 ${px(5)}`,
    width: px(100)
  },
  "> span": {
    display: "flex",
    fontSize: px(24)
  },
  "@media (any-pointer: fine)": {
    alignItems: "center",
    display: "flex"
  }
}, ({
  style
}) => ({
  color: style.c
}), "VolumeInlineRSWP");
function Volume(props) {
  const {
    inlineVolume,
    layout,
    locale,
    playerPosition,
    setVolume: setVolume2,
    styles,
    volume
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [volumeState, setVolumeState] = useState(volume);
  const timeoutRef = useRef();
  const previousVolume = usePrevious(volume);
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const isInline = layout === "responsive" && inlineVolume && isMediumScreen;
  useEffect(() => {
    if (previousVolume !== volume && volume !== volumeState) {
      setVolumeState(volume);
    }
  }, [previousVolume, volume, volumeState]);
  const handleClickToggleList = useCallback(() => {
    setIsOpen(s => !s);
  }, []);
  const handleChangeSlider = ({
    x,
    y
  }) => {
    const value = isInline ? x : y;
    const currentvolume = Math.round(value) / 100;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setVolume2(currentvolume);
    }, 250);
    setVolumeState(currentvolume);
  };
  const handleAfterEnd = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };
  let icon = /* @__PURE__ */jsx(VolumeHigh, {});
  if (volume === 0) {
    icon = /* @__PURE__ */jsx(VolumeMute, {});
  } else if (volume <= 0.4) {
    icon = /* @__PURE__ */jsx(VolumeLow, {});
  } else if (volume <= 0.7) {
    icon = /* @__PURE__ */jsx(VolumeHigh2, {});
  }
  if (isInline) {
    return /* @__PURE__ */jsxs(WrapperInline, {
      "data-component-name": "Volume",
      "data-value": volume,
      style: {
        c: styles.color
      },
      children: [/* @__PURE__ */jsx("span", {
        children: icon
      }), /* @__PURE__ */jsx("div", {
        children: /* @__PURE__ */jsx(RangeSlider, {
          axis: "x",
          className: "volume",
          "data-component-name": "volume-bar",
          onAfterEnd: handleAfterEnd,
          onChange: handleChangeSlider,
          styles: {
            options: {
              thumbBorder: 0,
              thumbBorderRadius: styles.sliderHandleBorderRadius,
              thumbColor: styles.sliderHandleColor,
              height: 4,
              padding: 0,
              rangeColor: styles.sliderColor,
              trackBorderRadius: styles.sliderTrackBorderRadius,
              trackColor: styles.sliderTrackColor
            }
          },
          x: volume * 100,
          xMax: 100,
          xMin: 0
        })
      })]
    });
  }
  return /* @__PURE__ */jsx(ClickOutside_default, {
    isActive: isOpen,
    onClick: handleClickToggleList,
    children: /* @__PURE__ */jsxs(WrapperWithToggle, {
      "data-component-name": "Volume",
      "data-value": volume,
      style: {
        c: styles.color,
        layout,
        p: playerPosition
      },
      children: [isOpen && /* @__PURE__ */jsxs("div", {
        children: [/* @__PURE__ */jsx(RangeSlider, {
          axis: "y",
          className: "volume",
          "data-component-name": "volume-bar",
          onAfterEnd: handleAfterEnd,
          onChange: handleChangeSlider,
          styles: {
            options: {
              padding: 0,
              rangeColor: "#fff",
              thumbBorder: 0,
              thumbBorderRadius: 12,
              thumbColor: "#fff",
              thumbSize: 12,
              trackColor: "rgba(255, 255, 255, 0.5)",
              width: 6
            }
          },
          y: volume * 100,
          yMax: 100,
          yMin: 0
        }), /* @__PURE__ */jsx("span", {})]
      }), /* @__PURE__ */jsx("button", {
        "aria-label": locale.volume,
        className: "ButtonRSWP",
        onClick: handleClickToggleList,
        title: locale.volume,
        type: "button",
        children: icon
      })]
    })
  });
}
var StyledWrapper = styled("div")({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  position: "relative",
  "> *": {
    width: "100%"
  }
}, ({
  style
}) => {
  let styles = {};
  if (style.layout === "responsive") {
    styles = {
      "> *": {
        "@media (min-width: 768px)": {
          width: "33.3333%"
        }
      },
      "@media (min-width: 768px)": {
        flexDirection: "row",
        padding: `0 ${px(8)}`
      }
    };
  }
  return {
    minHeight: px(style.h),
    ...styles
  };
}, "WrapperRSWP");
function Wrapper8(props) {
  const {
    children,
    layout,
    styles
  } = props;
  return /* @__PURE__ */jsx(StyledWrapper, {
    "data-component-name": "Wrapper",
    style: {
      h: styles.height,
      layout
    },
    children
  });
}
var Wrapper_default = memo(Wrapper8);
put(".PlayerRSWP", {
  boxSizing: "border-box",
  fontSize: "inherit",
  width: "100%",
  "*": {
    boxSizing: "border-box"
  },
  p: {
    margin: 0
  }
});
put(".ButtonRSWP", {
  appearance: "none",
  background: "transparent",
  border: 0,
  borderRadius: 0,
  color: "inherit",
  cursor: "pointer",
  display: "inline-flex",
  lineHeight: 1,
  padding: 0,
  ":focus": {
    outlineColor: "#000",
    outlineOffset: 3
  }
});
var SpotifyWebPlayer$1 = (_Class = class SpotifyWebPlayer extends PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "isMounted", false);
    _defineProperty(this, "emptyTrack", {
      artists: [],
      durationMs: 0,
      id: "",
      image: "",
      name: "",
      uri: ""
    });
    _defineProperty(this, "locale", void 0);
    _defineProperty(this, "player", void 0);
    _defineProperty(this, "playerProgressInterval", void 0);
    _defineProperty(this, "playerSyncInterval", void 0);
    _defineProperty(this, "ref", createRef());
    _defineProperty(this, "renderInlineActions", false);
    _defineProperty(this, "resizeTimeout", void 0);
    _defineProperty(this, "seekUpdateInterval", 100);
    _defineProperty(this, "styles", void 0);
    _defineProperty(this, "syncTimeout", void 0);
    _defineProperty(this, "getPlayOptions", memoizeOne(ids => {
      const playOptions = {
        context_uri: void 0,
        uris: void 0
      };
      if (ids) {
        if (!ids.every(d => validateURI(d))) {
          return playOptions;
        }
        if (ids.some(d => getSpotifyURIType(d) === "track")) {
          if (!ids.every(d => getSpotifyURIType(d) === "track")) {
            console.warn("You can't mix tracks URIs with other types");
          }
          playOptions.uris = ids.filter(d => validateURI(d) && getSpotifyURIType(d) === "track");
        } else {
          if (ids.length > 1) {
            console.warn("Albums, Artists, Playlists and Podcasts can't have multiple URIs");
          }
          playOptions.context_uri = ids[0];
        }
      }
      return playOptions;
    }));
    _defineProperty(this, "handleChangeRange", async position => {
      const {
        track
      } = this.state;
      const {
        callback
      } = this.props;
      let progress = 0;
      try {
        const percentage = position / 100;
        let stateChanges = {};
        if (this.isExternalPlayer) {
          progress = Math.round(track.durationMs * percentage);
          await seek(this.token, progress);
          stateChanges = {
            position,
            progressMs: progress
          };
        } else if (this.player) {
          const state = await this.player.getCurrentState();
          if (state) {
            progress = Math.round(state.track_window.current_track.duration_ms * percentage);
            await this.player.seek(progress);
            stateChanges = {
              position,
              progressMs: progress
            };
          } else {
            stateChanges = {
              position: 0
            };
          }
        }
        this.updateState(stateChanges);
        if (callback) {
          callback({
            ...this.state,
            ...stateChanges,
            type: TYPE.PROGRESS
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "handleClickTogglePlay", async () => {
      const {
        isActive
      } = this.state;
      try {
        await this.togglePlay(!this.isExternalPlayer && !isActive);
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "handleClickPrevious", async () => {
      try {
        if (this.isExternalPlayer) {
          await previous(this.token);
          this.syncTimeout = window.setTimeout(() => {
            this.syncDevice();
          }, 300);
        } else if (this.player) {
          await this.player.previousTrack();
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "handleClickNext", async () => {
      try {
        if (this.isExternalPlayer) {
          await next(this.token);
          this.syncTimeout = window.setTimeout(() => {
            this.syncDevice();
          }, 300);
        } else if (this.player) {
          await this.player.nextTrack();
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "handleClickDevice", async deviceId => {
      const {
        isUnsupported
      } = this.state;
      const {
        autoPlay,
        persistDeviceSelection
      } = this.props;
      this.updateState({
        currentDeviceId: deviceId
      });
      try {
        await setDevice(this.token, deviceId);
        if (persistDeviceSelection) {
          sessionStorage.setItem("rswpDeviceId", deviceId);
        }
        if (isUnsupported) {
          await this.syncDevice();
          const playerState = await getPlaybackState(this.token);
          if (playerState && !playerState.is_playing && autoPlay) {
            await this.togglePlay(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "handleFavoriteStatusChange", status => {
      const {
        isSaved
      } = this.state;
      this.updateState({
        isSaved: status
      });
      if (isSaved !== status) {
        this.handleCallback({
          ...this.state,
          isSaved: status,
          type: TYPE.FAVORITE
        });
      }
    });
    _defineProperty(this, "handlePlayerErrors", async (type, message) => {
      const {
        status
      } = this.state;
      const isPlaybackError = type === ERROR_TYPE.PLAYBACK;
      const isInitializationError = type === ERROR_TYPE.INITIALIZATION;
      let nextStatus = status;
      let devices = [];
      if (this.player && !isPlaybackError) {
        this.player.disconnect();
        this.player = void 0;
      }
      if (isInitializationError) {
        nextStatus = STATUS.UNSUPPORTED;
        ({
          devices = []
        } = await getDevices(this.token));
      } else if (!isPlaybackError) {
        nextStatus = STATUS.ERROR;
      }
      this.updateState({
        devices,
        error: message,
        errorType: type,
        isInitializing: false,
        isUnsupported: isInitializationError,
        status: nextStatus
      });
    });
    _defineProperty(this, "handlePlayerStateChanges", async state => {
      try {
        if (state) {
          const {
            paused,
            position,
            repeat_mode,
            shuffle: shuffle2,
            track_window: {
              current_track,
              next_tracks,
              previous_tracks
            }
          } = state;
          const isPlaying = !paused;
          const volume = (await this.player?.getVolume()) ?? 100;
          let trackState = {};
          if (position === 0 && current_track) {
            trackState = {
              nextTracks: next_tracks.map(convertTrack),
              position: 0,
              previousTracks: previous_tracks.map(convertTrack),
              track: convertTrack(current_track)
            };
          }
          this.updateState({
            error: "",
            errorType: null,
            isActive: true,
            isPlaying,
            progressMs: position,
            repeat: getRepeatState(repeat_mode),
            shuffle: shuffle2,
            volume: round(volume),
            ...trackState
          });
        } else if (this.isExternalPlayer) {
          await this.syncDevice();
        } else {
          this.updateState({
            isActive: false,
            isPlaying: false,
            nextTracks: [],
            position: 0,
            previousTracks: [],
            track: {
              artists: [],
              durationMs: 0,
              id: "",
              image: "",
              name: "",
              uri: ""
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "handlePlayerStatus", async ({
      device_id
    }) => {
      const {
        currentDeviceId,
        devices
      } = await this.initializeDevices(device_id);
      this.updateState({
        currentDeviceId,
        deviceId: device_id,
        devices,
        isInitializing: false,
        status: device_id ? STATUS.READY : STATUS.IDLE
      });
    });
    _defineProperty(this, "handleResize", () => {
      const {
        layout = "responsive"
      } = this.props;
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = window.setTimeout(() => {
        this.renderInlineActions = window.innerWidth >= 768 && layout === "responsive";
        this.forceUpdate();
      }, 100);
    });
    _defineProperty(this, "handleToggleMagnify", () => {
      const {
        magnifySliderOnHover
      } = this.props;
      if (magnifySliderOnHover) {
        this.updateState(previousState => {
          return {
            isMagnified: !previousState.isMagnified
          };
        });
      }
    });
    _defineProperty(this, "initializePlayer", () => {
      const {
        volume
      } = this.state;
      const {
        getOAuthToken = callback => {
          callback(this.token);
        },
        getPlayer,
        name = "Spotify Web Player"
      } = this.props;
      if (!window.Spotify) {
        return;
      }
      this.updateState({
        error: "",
        errorType: null,
        isInitializing: true
      });
      this.player = new window.Spotify.Player({
        getOAuthToken,
        name,
        volume
      });
      this.player.addListener("ready", this.handlePlayerStatus);
      this.player.addListener("not_ready", this.handlePlayerStatus);
      this.player.addListener("player_state_changed", this.handlePlayerStateChanges);
      this.player.addListener("initialization_error", error => this.handlePlayerErrors(ERROR_TYPE.INITIALIZATION, error.message));
      this.player.addListener("authentication_error", error => this.handlePlayerErrors(ERROR_TYPE.AUTHENTICATION, error.message));
      this.player.addListener("account_error", error => this.handlePlayerErrors(ERROR_TYPE.ACCOUNT, error.message));
      this.player.addListener("playback_error", error => this.handlePlayerErrors(ERROR_TYPE.PLAYBACK, error.message));
      this.player.addListener("autoplay_failed", async () => {
        console.log("Autoplay is not allowed by the browser autoplay rules");
      });
      this.player.connect();
      if (getPlayer) {
        getPlayer(this.player);
      }
    });
    _defineProperty(this, "setExternalDevice", id => {
      this.updateState({
        currentDeviceId: id,
        isPlaying: true
      });
    });
    _defineProperty(this, "setVolume", async volume => {
      if (this.isExternalPlayer) {
        await setVolume(this.token, Math.round(volume * 100));
        await this.syncDevice();
      } else if (this.player) {
        await this.player.setVolume(volume);
      }
      this.updateState({
        volume
      });
    });
    _defineProperty(this, "syncDevice", async () => {
      if (!this.isMounted) {
        return;
      }
      const {
        deviceId
      } = this.state;
      try {
        const playerState = await getPlaybackState(this.token);
        let track = this.emptyTrack;
        if (!playerState) {
          throw new Error("No player");
        }
        if (playerState.item) {
          track = {
            artists: "artists" in playerState.item ? playerState.item.artists : [],
            durationMs: playerState.item.duration_ms,
            id: playerState.item.id,
            image: "album" in playerState.item ? getAlbumImage(playerState.item.album) : "",
            name: playerState.item.name,
            uri: playerState.item.uri
          };
        }
        this.updateState({
          error: "",
          errorType: null,
          isActive: true,
          isPlaying: playerState.is_playing,
          nextTracks: [],
          previousTracks: [],
          progressMs: playerState.item ? playerState.progress_ms ?? 0 : 0,
          status: STATUS.READY,
          track,
          volume: parseVolume(playerState.device.volume_percent)
        });
      } catch (error) {
        const state = {
          isActive: false,
          isPlaying: false,
          position: 0,
          track: this.emptyTrack
        };
        if (deviceId) {
          this.updateState({
            currentDeviceId: deviceId,
            ...state
          });
          return;
        }
        this.updateState({
          error: error.message,
          errorType: ERROR_TYPE.PLAYER,
          status: STATUS.ERROR,
          ...state
        });
      }
    });
    _defineProperty(this, "toggleOffset", async () => {
      const {
        currentDeviceId
      } = this.state;
      const {
        offset,
        uris
      } = this.props;
      const playOptions = this.getPlayOptions(getURIs(uris));
      if (typeof offset === "number") {
        await play(this.token, {
          deviceId: currentDeviceId,
          offset,
          ...playOptions
        });
      }
    });
    _defineProperty(this, "togglePlay", async (force = false) => {
      const {
        currentDeviceId,
        isPlaying,
        needsUpdate
      } = this.state;
      const {
        offset,
        uris
      } = this.props;
      const shouldInitialize = force || needsUpdate;
      const playOptions = this.getPlayOptions(getURIs(uris));
      try {
        if (this.isExternalPlayer) {
          if (!isPlaying) {
            await play(this.token, {
              deviceId: currentDeviceId,
              offset,
              ...(shouldInitialize ? playOptions : void 0)
            });
          } else {
            await pause(this.token);
            this.updateState({
              isPlaying: false
            });
          }
          this.syncTimeout = window.setTimeout(() => {
            this.syncDevice();
          }, 300);
        } else if (this.player) {
          await this.player.activateElement();
          const playerState = await this.player.getCurrentState();
          const shouldPlay = !playerState && !!(playOptions.context_uri ?? playOptions.uris);
          if (shouldPlay || shouldInitialize) {
            await play(this.token, {
              deviceId: currentDeviceId,
              offset,
              ...(shouldInitialize ? playOptions : void 0)
            });
            await this.player.togglePlay();
          } else {
            await this.player.togglePlay();
          }
        }
        if (needsUpdate) {
          this.updateState({
            needsUpdate: false
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "updateSeekBar", async () => {
      if (!this.isMounted) {
        return;
      }
      const {
        progressMs,
        track
      } = this.state;
      try {
        if (this.isExternalPlayer) {
          let position = progressMs / track.durationMs;
          position = Number(((Number.isFinite(position) ? position : 0) * 100).toFixed(1));
          this.updateState({
            position,
            progressMs: progressMs + this.seekUpdateInterval
          });
        } else if (this.player) {
          const state = await this.player.getCurrentState();
          if (state) {
            const progress = state.position;
            const position = Number((progress / state.track_window.current_track.duration_ms * 100).toFixed(1));
            this.updateState({
              position,
              progressMs: progress + this.seekUpdateInterval
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
    _defineProperty(this, "updateState", state => {
      if (!this.isMounted) {
        return;
      }
      this.setState(state);
    });
    this.state = {
      currentDeviceId: "",
      deviceId: "",
      devices: [],
      error: "",
      errorType: null,
      isActive: false,
      isInitializing: false,
      isMagnified: false,
      isPlaying: false,
      isSaved: false,
      isUnsupported: false,
      needsUpdate: false,
      nextTracks: [],
      playerPosition: "bottom",
      position: 0,
      previousTracks: [],
      progressMs: 0,
      repeat: "off",
      shuffle: false,
      status: STATUS.IDLE,
      track: this.emptyTrack,
      volume: parseVolume(props.initialVolume) || 1
    };
    this.locale = getLocale(props.locale);
    this.styles = getMergedStyles(props.styles);
  }
  async componentDidMount() {
    this.isMounted = true;
    const {
      top = 0
    } = this.ref.current?.getBoundingClientRect() ?? {};
    this.updateState({
      playerPosition: top > window.innerHeight / 2 ? "bottom" : "top",
      status: STATUS.INITIALIZING
    });
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = this.initializePlayer;
    } else {
      this.initializePlayer();
    }
    await loadSpotifyPlayer();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
  async componentDidUpdate(previousProps, previousState) {
    const {
      currentDeviceId,
      deviceId,
      isInitializing,
      isPlaying,
      repeat: repeat2,
      shuffle: shuffle2,
      status,
      track
    } = this.state;
    const {
      autoPlay,
      layout,
      locale,
      offset,
      play: playProp,
      showSaveIcon,
      styles,
      syncExternalDevice,
      uris
    } = this.props;
    const isReady = previousState.status !== STATUS.READY && status === STATUS.READY;
    const playOptions = this.getPlayOptions(getURIs(uris));
    const canPlay = !!currentDeviceId && !!(playOptions.context_uri ?? playOptions.uris);
    const shouldPlay = isReady && (autoPlay || playProp);
    if (canPlay && shouldPlay) {
      await this.togglePlay(true);
      if (!isPlaying) {
        this.updateState({
          isPlaying: true
        });
      }
      if (this.isExternalPlayer) {
        this.syncTimeout = window.setTimeout(() => {
          this.syncDevice();
        }, 600);
      }
    } else if (!equal(previousProps.uris, uris)) {
      if (isPlaying || playProp) {
        await this.togglePlay(true);
      } else {
        this.updateState({
          needsUpdate: true
        });
      }
    } else if (previousProps.play !== playProp && playProp !== isPlaying) {
      await this.togglePlay(!track.id);
    }
    if (previousState.status !== status) {
      this.handleCallback({
        ...this.state,
        type: TYPE.STATUS
      });
    }
    if (previousState.currentDeviceId !== currentDeviceId && currentDeviceId) {
      if (!isReady) {
        this.handleCallback({
          ...this.state,
          type: TYPE.DEVICE
        });
      }
      await this.toggleSyncInterval(this.isExternalPlayer);
      await this.updateSeekBar();
    }
    if (previousState.track.id !== track.id && track.id) {
      this.handleCallback({
        ...this.state,
        type: TYPE.TRACK
      });
      if (showSaveIcon) {
        this.updateState({
          isSaved: false
        });
      }
    }
    if (previousState.isPlaying !== isPlaying) {
      this.toggleProgressBar();
      await this.toggleSyncInterval(this.isExternalPlayer);
      this.handleCallback({
        ...this.state,
        type: TYPE.PLAYER
      });
    }
    if (previousState.repeat !== repeat2 || previousState.shuffle !== shuffle2) {
      this.handleCallback({
        ...this.state,
        type: TYPE.PLAYER
      });
    }
    if (previousProps.offset !== offset) {
      await this.toggleOffset();
    }
    if (previousState.isInitializing && !isInitializing) {
      if (syncExternalDevice && !uris) {
        const playerState = await getPlaybackState(this.token);
        if (playerState?.is_playing && playerState.device.id !== deviceId) {
          this.setExternalDevice(playerState.device.id ?? "");
        }
      }
    }
    if (previousProps.layout !== layout) {
      this.handleResize();
    }
    if (!equal(previousProps.locale, locale)) {
      this.locale = getLocale(locale);
    }
    if (!equal(previousProps.styles, styles)) {
      this.styles = getMergedStyles(styles);
    }
  }
  async componentWillUnmount() {
    this.isMounted = false;
    if (this.player) {
      this.player.disconnect();
    }
    clearInterval(this.playerSyncInterval);
    clearInterval(this.playerProgressInterval);
    clearTimeout(this.syncTimeout);
    window.removeEventListener("resize", this.handleResize);
  }
  handleCallback(state) {
    const {
      callback
    } = this.props;
    if (callback) {
      callback(state);
    }
  }
  get token() {
    const {
      token
    } = this.props;
    return token;
  }
  async initializeDevices(id) {
    const {
      persistDeviceSelection
    } = this.props;
    const {
      devices
    } = await getDevices(this.token);
    let currentDeviceId = id;
    if (persistDeviceSelection) {
      const savedDeviceId = sessionStorage.getItem("rswpDeviceId");
      if (!savedDeviceId || !devices.some(d => d.id === savedDeviceId)) {
        sessionStorage.setItem("rswpDeviceId", currentDeviceId);
      } else {
        currentDeviceId = savedDeviceId;
      }
    }
    return {
      currentDeviceId,
      devices
    };
  }
  get isExternalPlayer() {
    const {
      currentDeviceId,
      deviceId,
      status
    } = this.state;
    return currentDeviceId && currentDeviceId !== deviceId || status === STATUS.UNSUPPORTED;
  }
  async toggleSyncInterval(shouldSync) {
    const {
      syncExternalDeviceInterval
    } = this.props;
    try {
      if (this.isExternalPlayer && shouldSync && !this.playerSyncInterval) {
        await this.syncDevice();
        clearInterval(this.playerSyncInterval);
        this.playerSyncInterval = window.setInterval(this.syncDevice, syncExternalDeviceInterval * 1e3);
      }
      if ((!shouldSync || !this.isExternalPlayer) && this.playerSyncInterval) {
        clearInterval(this.playerSyncInterval);
        this.playerSyncInterval = void 0;
      }
    } catch (error) {
      console.error(error);
    }
  }
  toggleProgressBar() {
    const {
      isPlaying
    } = this.state;
    if (isPlaying) {
      if (!this.playerProgressInterval) {
        this.playerProgressInterval = window.setInterval(this.updateSeekBar, this.seekUpdateInterval);
      }
    } else if (this.playerProgressInterval) {
      clearInterval(this.playerProgressInterval);
      this.playerProgressInterval = void 0;
    }
  }
  render() {
    const {
      currentDeviceId,
      deviceId,
      devices,
      error,
      isActive,
      isMagnified,
      isPlaying,
      isUnsupported,
      nextTracks,
      playerPosition,
      position,
      progressMs,
      status,
      track,
      volume
    } = this.state;
    const {
      components,
      hideAttribution = false,
      hideCoverArt = false,
      inlineVolume = true,
      layout = "responsive",
      showSaveIcon,
      updateSavedStatus
    } = this.props;
    const isReady = [STATUS.READY, STATUS.UNSUPPORTED].includes(status);
    const output = {
      main: /* @__PURE__ */jsx(Loader, {
        styles: this.styles
      })
    };
    if (isReady) {
      if (!output.info) {
        output.info = /* @__PURE__ */jsx(Info_default, {
          hideAttribution,
          hideCoverArt,
          isActive,
          layout,
          locale: this.locale,
          onFavoriteStatusChange: this.handleFavoriteStatusChange,
          showSaveIcon,
          styles: this.styles,
          token: this.token,
          track,
          updateSavedStatus
        });
      }
      output.devices = /* @__PURE__ */jsx(Devices, {
        currentDeviceId,
        deviceId,
        devices,
        layout,
        locale: this.locale,
        onClickDevice: this.handleClickDevice,
        open: isUnsupported && !deviceId,
        playerPosition,
        styles: this.styles
      });
      output.volume = currentDeviceId ? /* @__PURE__ */jsx(Volume, {
        inlineVolume,
        layout,
        locale: this.locale,
        playerPosition,
        setVolume: this.setVolume,
        styles: this.styles,
        volume
      }) : null;
      if (this.renderInlineActions) {
        output.actions = /* @__PURE__ */jsxs(Actions_default, {
          layout,
          styles: this.styles,
          children: [output.devices, output.volume]
        });
      }
      output.controls = /* @__PURE__ */jsx(Controls_default, {
        components,
        devices: this.renderInlineActions ? null : output.devices,
        durationMs: track.durationMs,
        isActive,
        isExternalDevice: this.isExternalPlayer,
        isMagnified,
        isPlaying,
        layout,
        locale: this.locale,
        nextTracks,
        onChangeRange: this.handleChangeRange,
        onClickNext: this.handleClickNext,
        onClickPrevious: this.handleClickPrevious,
        onClickTogglePlay: this.handleClickTogglePlay,
        onToggleMagnify: this.handleToggleMagnify,
        position,
        progressMs,
        styles: this.styles,
        volume: this.renderInlineActions ? null : output.volume
      });
      output.main = /* @__PURE__ */jsxs(Wrapper_default, {
        layout,
        styles: this.styles,
        children: [output.info, output.controls, output.actions]
      });
    } else if (output.info) {
      output.main = output.info;
    }
    if (status === STATUS.ERROR) {
      output.main = /* @__PURE__ */jsx(ErrorMessage, {
        styles: this.styles,
        children: error
      });
    }
    return /* @__PURE__ */jsx(Player_default, {
      ref: this.ref,
      "data-ready": isReady,
      styles: this.styles,
      children: output.main
    });
  }
}, _defineProperty(_Class, "defaultProps", {
  autoPlay: false,
  initialVolume: 1,
  magnifySliderOnHover: false,
  name: "Spotify Web Player",
  persistDeviceSelection: false,
  showSaveIcon: false,
  syncExternalDeviceInterval: 5,
  syncExternalDevice: false
}), _Class);
var src_default = SpotifyWebPlayer$1;

function SpotifyWebPlayer({ token, uri }) {
    return (createElement(src_default, { token: token.displayValue, uris: uri.displayValue }));
}

export { SpotifyWebPlayer };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVdlYlBsYXllci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZ2lsYmFyYmFyYS9kZWVwLWVxdWFsL2Rpc3QvaW5kZXgubWpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXNwb3RpZnktd2ViLXBsYXliYWNrL25vZGVfbW9kdWxlcy9tZW1vaXplLW9uZS9kaXN0L21lbW9pemUtb25lLmVzbS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9hZGRvbi9jYWNoZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9hZGRvbi9fX2Rldl9fL3dhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmFuby1jc3MvYWRkb24vanN4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25hbm8tY3NzL2FkZG9uL2tleWZyYW1lcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9hZGRvbi9uZXN0aW5nLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25hbm8tY3NzL2FkZG9uL3J1bGUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmFuby1jc3MvYWRkb24vc3R5bGUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmFuby1jc3MvYWRkb24vc3R5bGVkLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RlZXBtZXJnZS10cy9kaXN0L25vZGUvaW5kZXgubWpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BnaWxiYXJiYXJhL3JlYWN0LXJhbmdlLXNsaWRlci9lc20vdXRpbHMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGdpbGJhcmJhcmEvcmVhY3QtcmFuZ2Utc2xpZGVyL2VzbS9zdHlsZXMuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGdpbGJhcmJhcmEvcmVhY3QtcmFuZ2Utc2xpZGVyL2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vbW9kdWxlcy91dGlscy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vaXMtdmFsaWQtaGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9mb3JtYXQtaGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9oZXgycmdiLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9yZ2IyaHNsLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9oZXgyaHNsLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9tb2R1bGVzL2h1ZTJyZ2IuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL2hzbDJyZ2IuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL3JnYjJoZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL2hzbDJoZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL21vZHVsZXMvY3NzLWNvbG9ycy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vcGFyc2UtY3NzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9mYWRlLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS90ZXh0LWNvbG9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LXNwb3RpZnktd2ViLXBsYXliYWNrL2Rpc3QvaW5kZXgubWpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL1Nwb3RpZnlXZWJQbGF5ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9oZWxwZXJzLnRzXG5mdW5jdGlvbiBpc09mVHlwZSh0eXBlKSB7XG4gIHJldHVybiAodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gdHlwZTtcbn1cbnZhciBpc0Z1bmN0aW9uID0gaXNPZlR5cGUoXCJmdW5jdGlvblwiKTtcbnZhciBpc051bGwgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsO1xufTtcbnZhciBpc1JlZ2V4ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKSA9PT0gXCJSZWdFeHBcIjtcbn07XG52YXIgaXNPYmplY3QgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuICFpc1VuZGVmaW5lZCh2YWx1ZSkgJiYgIWlzTnVsbCh2YWx1ZSkgJiYgKGlzRnVuY3Rpb24odmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIik7XG59O1xudmFyIGlzVW5kZWZpbmVkID0gaXNPZlR5cGUoXCJ1bmRlZmluZWRcIik7XG5cbi8vIHNyYy9pbmRleC50c1xuZnVuY3Rpb24gZXF1YWxBcnJheShsZWZ0LCByaWdodCkge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbGVmdDtcbiAgaWYgKGxlbmd0aCAhPT0gcmlnaHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAobGV0IGluZGV4ID0gbGVuZ3RoOyBpbmRleC0tICE9PSAwOyApIHtcbiAgICBpZiAoIWVxdWFsKGxlZnRbaW5kZXhdLCByaWdodFtpbmRleF0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gZXF1YWxBcnJheUJ1ZmZlcihsZWZ0LCByaWdodCkge1xuICBpZiAobGVmdC5ieXRlTGVuZ3RoICE9PSByaWdodC5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHZpZXcxID0gbmV3IERhdGFWaWV3KGxlZnQuYnVmZmVyKTtcbiAgY29uc3QgdmlldzIgPSBuZXcgRGF0YVZpZXcocmlnaHQuYnVmZmVyKTtcbiAgbGV0IGluZGV4ID0gbGVmdC5ieXRlTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIGlmICh2aWV3MS5nZXRVaW50OChpbmRleCkgIT09IHZpZXcyLmdldFVpbnQ4KGluZGV4KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVxdWFsTWFwKGxlZnQsIHJpZ2h0KSB7XG4gIGlmIChsZWZ0LnNpemUgIT09IHJpZ2h0LnNpemUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChjb25zdCBpbmRleCBvZiBsZWZ0LmVudHJpZXMoKSkge1xuICAgIGlmICghcmlnaHQuaGFzKGluZGV4WzBdKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IGluZGV4IG9mIGxlZnQuZW50cmllcygpKSB7XG4gICAgaWYgKCFlcXVhbChpbmRleFsxXSwgcmlnaHQuZ2V0KGluZGV4WzBdKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBlcXVhbFNldChsZWZ0LCByaWdodCkge1xuICBpZiAobGVmdC5zaXplICE9PSByaWdodC5zaXplKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAoY29uc3QgaW5kZXggb2YgbGVmdC5lbnRyaWVzKCkpIHtcbiAgICBpZiAoIXJpZ2h0LmhhcyhpbmRleFswXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBlcXVhbChsZWZ0LCByaWdodCkge1xuICBpZiAobGVmdCA9PT0gcmlnaHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAobGVmdCAmJiBpc09iamVjdChsZWZ0KSAmJiByaWdodCAmJiBpc09iamVjdChyaWdodCkpIHtcbiAgICBpZiAobGVmdC5jb25zdHJ1Y3RvciAhPT0gcmlnaHQuY29uc3RydWN0b3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobGVmdCkgJiYgQXJyYXkuaXNBcnJheShyaWdodCkpIHtcbiAgICAgIHJldHVybiBlcXVhbEFycmF5KGxlZnQsIHJpZ2h0KTtcbiAgICB9XG4gICAgaWYgKGxlZnQgaW5zdGFuY2VvZiBNYXAgJiYgcmlnaHQgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybiBlcXVhbE1hcChsZWZ0LCByaWdodCk7XG4gICAgfVxuICAgIGlmIChsZWZ0IGluc3RhbmNlb2YgU2V0ICYmIHJpZ2h0IGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICByZXR1cm4gZXF1YWxTZXQobGVmdCwgcmlnaHQpO1xuICAgIH1cbiAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGxlZnQpICYmIEFycmF5QnVmZmVyLmlzVmlldyhyaWdodCkpIHtcbiAgICAgIHJldHVybiBlcXVhbEFycmF5QnVmZmVyKGxlZnQsIHJpZ2h0KTtcbiAgICB9XG4gICAgaWYgKGlzUmVnZXgobGVmdCkgJiYgaXNSZWdleChyaWdodCkpIHtcbiAgICAgIHJldHVybiBsZWZ0LnNvdXJjZSA9PT0gcmlnaHQuc291cmNlICYmIGxlZnQuZmxhZ3MgPT09IHJpZ2h0LmZsYWdzO1xuICAgIH1cbiAgICBpZiAobGVmdC52YWx1ZU9mICE9PSBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YpIHtcbiAgICAgIHJldHVybiBsZWZ0LnZhbHVlT2YoKSA9PT0gcmlnaHQudmFsdWVPZigpO1xuICAgIH1cbiAgICBpZiAobGVmdC50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykge1xuICAgICAgcmV0dXJuIGxlZnQudG9TdHJpbmcoKSA9PT0gcmlnaHQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgY29uc3QgbGVmdEtleXMgPSBPYmplY3Qua2V5cyhsZWZ0KTtcbiAgICBjb25zdCByaWdodEtleXMgPSBPYmplY3Qua2V5cyhyaWdodCk7XG4gICAgaWYgKGxlZnRLZXlzLmxlbmd0aCAhPT0gcmlnaHRLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpbmRleCA9IGxlZnRLZXlzLmxlbmd0aDsgaW5kZXgtLSAhPT0gMDsgKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyaWdodCwgbGVmdEtleXNbaW5kZXhdKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGluZGV4ID0gbGVmdEtleXMubGVuZ3RoOyBpbmRleC0tICE9PSAwOyApIHtcbiAgICAgIGNvbnN0IGtleSA9IGxlZnRLZXlzW2luZGV4XTtcbiAgICAgIGlmIChrZXkgPT09IFwiX293bmVyXCIgJiYgbGVmdC4kJHR5cGVvZikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICghZXF1YWwobGVmdFtrZXldLCByaWdodFtrZXldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChOdW1iZXIuaXNOYU4obGVmdCkgJiYgTnVtYmVyLmlzTmFOKHJpZ2h0KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBsZWZ0ID09PSByaWdodDtcbn1cbmV4cG9ydCB7XG4gIGVxdWFsIGFzIGRlZmF1bHRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIiwidmFyIHNhZmVJc05hTiA9IE51bWJlci5pc05hTiB8fFxuICAgIGZ1bmN0aW9uIHBvbnlmaWxsKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIHZhbHVlICE9PSB2YWx1ZTtcbiAgICB9O1xuZnVuY3Rpb24gaXNFcXVhbChmaXJzdCwgc2Vjb25kKSB7XG4gICAgaWYgKGZpcnN0ID09PSBzZWNvbmQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChzYWZlSXNOYU4oZmlyc3QpICYmIHNhZmVJc05hTihzZWNvbmQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBhcmVJbnB1dHNFcXVhbChuZXdJbnB1dHMsIGxhc3RJbnB1dHMpIHtcbiAgICBpZiAobmV3SW5wdXRzLmxlbmd0aCAhPT0gbGFzdElucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0lucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWlzRXF1YWwobmV3SW5wdXRzW2ldLCBsYXN0SW5wdXRzW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBtZW1vaXplT25lKHJlc3VsdEZuLCBpc0VxdWFsKSB7XG4gICAgaWYgKGlzRXF1YWwgPT09IHZvaWQgMCkgeyBpc0VxdWFsID0gYXJlSW5wdXRzRXF1YWw7IH1cbiAgICB2YXIgY2FjaGUgPSBudWxsO1xuICAgIGZ1bmN0aW9uIG1lbW9pemVkKCkge1xuICAgICAgICB2YXIgbmV3QXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbmV3QXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZSAmJiBjYWNoZS5sYXN0VGhpcyA9PT0gdGhpcyAmJiBpc0VxdWFsKG5ld0FyZ3MsIGNhY2hlLmxhc3RBcmdzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmxhc3RSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSByZXN1bHRGbi5hcHBseSh0aGlzLCBuZXdBcmdzKTtcbiAgICAgICAgY2FjaGUgPSB7XG4gICAgICAgICAgICBsYXN0UmVzdWx0OiBsYXN0UmVzdWx0LFxuICAgICAgICAgICAgbGFzdEFyZ3M6IG5ld0FyZ3MsXG4gICAgICAgICAgICBsYXN0VGhpczogdGhpcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgfVxuICAgIG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIGNhY2hlID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBtZW1vaXplZDtcbn1cblxuZXhwb3J0IHsgbWVtb2l6ZU9uZSBhcyBkZWZhdWx0IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBLRUJBQl9SRUdFWCA9IC9bQS1aXS9nO1xuXG52YXIgaGFzaCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB2YXIgaCA9IDUzODEsIGkgPSBzdHIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkpIGggPSAoaCAqIDMzKSBeIHN0ci5jaGFyQ29kZUF0KC0taSk7XG5cbiAgICByZXR1cm4gJ18nICsgKGggPj4+IDApLnRvU3RyaW5nKDM2KTtcbn07XG5cbmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB2YXIgYXNzaWduID0gY29uZmlnLmFzc2lnbiB8fCBPYmplY3QuYXNzaWduO1xuICAgIHZhciBjbGllbnQgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JztcblxuICAgIC8vIENoZWNrIGlmIHdlIGFyZSByZWFsbHkgaW4gYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoY2xpZW50KSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gJ29iamVjdCcpIHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnSFRNTCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ25hbm8tY3NzIGRldGVjdGVkIGJyb3dzZXIgZW52aXJvbm1lbnQgYmVjYXVzZSBvZiBcIndpbmRvd1wiIGdsb2JhbCwgYnV0ICcgK1xuICAgICAgICAgICAgICAgICAgICAnXCJkb2N1bWVudFwiIGdsb2JhbCBzZWVtcyB0byBiZSBkZWZlY3RpdmUuJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVuZGVyZXIgPSBhc3NpZ24oe1xuICAgICAgICByYXc6ICcnLFxuICAgICAgICBwZng6ICdfJyxcbiAgICAgICAgY2xpZW50OiBjbGllbnQsXG4gICAgICAgIGFzc2lnbjogYXNzaWduLFxuICAgICAgICBzdHJpbmdpZnk6IEpTT04uc3RyaW5naWZ5LFxuICAgICAgICBrZWJhYjogZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wLnJlcGxhY2UoS0VCQUJfUkVHRVgsICctJCYnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9LFxuICAgICAgICBkZWNsOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAga2V5ID0gcmVuZGVyZXIua2ViYWIoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBrZXkgKyAnOicgKyB2YWx1ZSArICc7JztcbiAgICAgICAgfSxcbiAgICAgICAgaGFzaDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIGhhc2gocmVuZGVyZXIuc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQgKyAoc2VsZWN0b3JbMF0gPT09ICc6JyA/ICcnICA6ICcgJykgKyBzZWxlY3RvcjtcbiAgICAgICAgfSxcbiAgICAgICAgcHV0UmF3OiBmdW5jdGlvbiAocmF3Q3NzUnVsZSkge1xuICAgICAgICAgICAgcmVuZGVyZXIucmF3ICs9IHJhd0Nzc1J1bGU7XG4gICAgICAgIH1cbiAgICB9LCBjb25maWcpO1xuXG4gICAgaWYgKHJlbmRlcmVyLmNsaWVudCkge1xuICAgICAgICBpZiAoIXJlbmRlcmVyLnNoKVxuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChyZW5kZXJlci5zaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJykpO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICByZW5kZXJlci5zaC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFuby1jc3MtZGV2JywgJycpO1xuXG4gICAgICAgICAgICAvLyBUZXN0IHN0eWxlIHNoZWV0IHVzZWQgaW4gREVWIG1vZGUgdG8gdGVzdCBpZiAuaW5zZXRSdWxlKCkgd291bGQgdGhyb3cuXG4gICAgICAgICAgICByZW5kZXJlci5zaFRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgcmVuZGVyZXIuc2hUZXN0LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW5vLWNzcy1kZXYtdGVzdHMnLCAnJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHJlbmRlcmVyLnNoVGVzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJlci5wdXRSYXcgPSBmdW5jdGlvbiAocmF3Q3NzUnVsZSkge1xuICAgICAgICAgICAgLy8gLmluc2VydFJ1bGUoKSBpcyBmYXN0ZXIgdGhhbiAuYXBwZW5kQ2hpbGQoKSwgdGhhdCdzIHdoeSB3ZSB1c2UgaXQgaW4gUFJPRC5cbiAgICAgICAgICAgIC8vIEJ1dCBDU1MgaW5qZWN0ZWQgdXNpbmcgLmluc2VydFJ1bGUoKSBpcyBub3QgZGlzcGxheWVkIGluIENocm9tZSBEZXZ0b29scyxcbiAgICAgICAgICAgIC8vIHRoYXQncyB3aHkgd2UgdXNlIC5hcHBlbmRDaGlsZCBpbiBERVYuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhciBzaGVldCA9IHJlbmRlcmVyLnNoLnNoZWV0O1xuXG4gICAgICAgICAgICAgICAgLy8gVW5rbm93biBwc2V1ZG8tc2VsZWN0b3JzIHdpbGwgdGhyb3csIHRoaXMgdHJ5L2NhdGNoIHN3YWxsb3dzIGFsbCBlcnJvcnMuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShyYXdDc3NSdWxlLCBzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUZXN0IGlmIC5pbnNlcnRSdWxlKCkgd29ya3MgaW4gZGV2IG1vZGUuIFVua25vd24gcHNldWRvLXNlbGVjdG9ycyB3aWxsIHRocm93IHdoZW5cbiAgICAgICAgICAgICAgICAvLyAuaW5zZXJ0UnVsZSgpIGlzIHVzZWQsIGJ1dCAuYXBwZW5kQ2hpbGQoKSB3aWxsIG5vdCB0aHJvdy5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5zaFRlc3Quc2hlZXQuaW5zZXJ0UnVsZShyYXdDc3NSdWxlLCByZW5kZXJlci5zaFRlc3Quc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnZlcmJvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHByZXR0eS1wcmludGVkIENTUyBmb3IgZGV2IG1vZGUuXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuc2guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocmF3Q3NzUnVsZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcmVyLnB1dCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgZGVjbHMsIGF0cnVsZSkge1xuICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgIHZhciBwcm9wLCB2YWx1ZTtcbiAgICAgICAgdmFyIHBvc3Rwb25lZCA9IFtdO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBkZWNscykge1xuICAgICAgICAgICAgdmFsdWUgPSBkZWNsc1twcm9wXTtcblxuICAgICAgICAgICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgIHBvc3Rwb25lZC5wdXNoKHByb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmICFyZW5kZXJlci5zb3VyY2VtYXBzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnICAgICcgKyByZW5kZXJlci5kZWNsKHByb3AsIHZhbHVlLCBzZWxlY3RvciwgYXRydWxlKSArICdcXG4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSByZW5kZXJlci5kZWNsKHByb3AsIHZhbHVlLCBzZWxlY3RvciwgYXRydWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RyKSB7XG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmICFyZW5kZXJlci5zb3VyY2VtYXBzKSB7XG4gICAgICAgICAgICAgICAgc3RyID0gJ1xcbicgKyBzZWxlY3RvciArICcge1xcbicgKyBzdHIgKyAnfVxcbic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0ciA9IHNlbGVjdG9yICsgJ3snICsgc3RyICsgJ30nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVuZGVyZXIucHV0UmF3KGF0cnVsZSA/IGF0cnVsZSArICd7JyArIHN0ciArICd9JyA6IHN0cik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc3Rwb25lZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvcCA9IHBvc3Rwb25lZFtpXTtcblxuICAgICAgICAgICAgaWYgKHByb3BbMF0gPT09ICdAJyAmJiBwcm9wICE9PSAnQGZvbnQtZmFjZScpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJlci5wdXRBdChzZWxlY3RvciwgZGVjbHNbcHJvcF0sIHByb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW5kZXJlci5wdXQocmVuZGVyZXIuc2VsZWN0b3Ioc2VsZWN0b3IsIHByb3ApLCBkZWNsc1twcm9wXSwgYXRydWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZW5kZXJlci5wdXRBdCA9IHJlbmRlcmVyLnB1dDtcblxuICAgIHJldHVybiByZW5kZXJlcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuYWRkb24gPSBmdW5jdGlvbiAocmVuZGVyZXIpIHtcbiAgICB2YXIgY2FjaGUgPSB7fTtcblxuICAgIHJlbmRlcmVyLmNhY2hlID0gZnVuY3Rpb24gKGNzcykge1xuICAgICAgICBpZiAoIWNzcykgcmV0dXJuICcnO1xuXG4gICAgICAgIHZhciBrZXkgPSByZW5kZXJlci5oYXNoKGNzcyk7XG5cbiAgICAgICAgaWYgKCFjYWNoZVtrZXldKSB7XG4gICAgICAgICAgICBjYWNoZVtrZXldID0gcmVuZGVyZXIucnVsZShjc3MsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBrZ05hbWUgPSAnbmFuby1jc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMgKGFkZG9uLCByZW5kZXJlciwgZGVwcykge1xuICAgIHZhciBtaXNzaW5nID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBkZXBzW2ldO1xuXG4gICAgICAgIGlmICghcmVuZGVyZXJbbmFtZV0pIHtcbiAgICAgICAgICAgIG1pc3NpbmcucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtaXNzaW5nLmxlbmd0aCkge1xuICAgICAgICB2YXIgc3RyID0gJ0FkZG9uIFwiJyArIGFkZG9uICsgJ1wiIGlzIG1pc3NpbmcgdGhlIGZvbGxvd2luZyBkZXBlbmRlbmNpZXM6JztcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1pc3NpbmcubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHN0ciArPSAnXFxuIHJlcXVpcmUoXCInICsgcGtnTmFtZSArICcvYWRkb24vJyArIG1pc3Npbmdbal0gKyAnXCIpLmFkZG9uKG5hbm8pOyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3RyKTtcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWRkb25DYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKS5hZGRvbjtcblxuZXhwb3J0cy5hZGRvbiA9IGZ1bmN0aW9uIChyZW5kZXJlcikge1xuICAgIGlmICghcmVuZGVyZXIuY2FjaGUpIHtcbiAgICAgICAgYWRkb25DYWNoZShyZW5kZXJlcik7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9fX2Rldl9fL3dhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMnKSgnanN4JywgcmVuZGVyZXIsIFsncnVsZScsICdjYWNoZSddKTtcbiAgICB9XG5cbiAgICByZW5kZXJlci5qc3ggPSBmdW5jdGlvbiAoZm4sIHN0eWxlcywgYmxvY2spIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZTtcbiAgICAgICAgdmFyIGlzRWxlbWVudCA9IHR5cGVvZiBmbiA9PT0gJ3N0cmluZyc7XG5cbiAgICAgICAgLy8gSW4gZGV2IG1vZGUgZW1pdCBDU1MgaW1tZWRpYXRlbHkgc28gY29ycmVjdCBzb3VyY2VtYXBzIGNhbiBiZSBnZW5lcmF0ZWQuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSByZW5kZXJlci5ydWxlKHN0eWxlcywgYmxvY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIENvbXBvbmVudCA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSByZW5kZXJlci5ydWxlKHN0eWxlcywgYmxvY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29weSA9IHByb3BzO1xuICAgICAgICAgICAgdmFyICRhcyA9IGNvcHkuJGFzO1xuICAgICAgICAgICAgdmFyICRyZWYgPSBjb3B5LiRyZWY7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29weSA9IHJlbmRlcmVyLmFzc2lnbih7fSwgcHJvcHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHluYW1pY0NsYXNzTmFtZSA9IHJlbmRlcmVyLmNhY2hlKHByb3BzLmNzcyk7XG4gICAgICAgICAgICBkZWxldGUgY29weS5jc3M7XG4gICAgICAgICAgICBkZWxldGUgY29weS4kYXM7XG5cbiAgICAgICAgICAgIGlmIChpc0VsZW1lbnQgfHwgJGFzKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvcHkuJHJlZjtcbiAgICAgICAgICAgICAgICBjb3B5LnJlZiA9ICRyZWY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvcHkuY2xhc3NOYW1lID0gKHByb3BzLmNsYXNzTmFtZSB8fCAnJykgKyBjbGFzc05hbWUgKyBkeW5hbWljQ2xhc3NOYW1lO1xuXG4gICAgICAgICAgICByZXR1cm4gKGlzRWxlbWVudCB8fCAkYXMpXG4gICAgICAgICAgICAgICAgPyByZW5kZXJlci5oKCRhcyB8fCBmbiwgY29weSlcbiAgICAgICAgICAgICAgICA6IGZuKGNvcHkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoYmxvY2spIHtcbiAgICAgICAgICAgICAgICBDb21wb25lbnQuZGlzcGxheU5hbWUgPSAnanN4KCcgKyBibG9jayArICcpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDb21wb25lbnQ7XG4gICAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuYWRkb24gPSBmdW5jdGlvbiAocmVuZGVyZXIsIGNvbmZpZykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHJlcXVpcmUoJy4vX19kZXZfXy93YXJuT25NaXNzaW5nRGVwZW5kZW5jaWVzJykoJ2tleWZyYW1lcycsIHJlbmRlcmVyLCBbJ3B1dFJhdycsICdwdXQnXSk7XG4gICAgfVxuXG4gICAgY29uZmlnID0gcmVuZGVyZXIuYXNzaWduKHtcbiAgICAgICAgcHJlZml4ZXM6IFsnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW8tJywgJyddLFxuICAgIH0sIGNvbmZpZyB8fCB7fSk7XG5cbiAgICB2YXIgcHJlZml4ZXMgPSBjb25maWcucHJlZml4ZXM7XG5cbiAgICBpZiAocmVuZGVyZXIuY2xpZW50KSB7XG4gICAgICAgIC8vIENyYWV0ZSBAa2V5ZnJhbWUgU3R5bGVzaGVldCBga3NoYC5cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChyZW5kZXJlci5rc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpKTtcbiAgICB9XG5cbiAgICB2YXIgcHV0QXQgPSByZW5kZXJlci5wdXRBdDtcblxuICAgIHJlbmRlcmVyLnB1dEF0ID0gZnVuY3Rpb24gKF9fLCBrZXlmcmFtZXMsIHByZWx1ZGUpIHtcbiAgICAgICAgLy8gQGtleWZyYW1lc1xuICAgICAgICBpZiAocHJlbHVkZVsxXSA9PT0gJ2snKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleWZyYW1lIGluIGtleWZyYW1lcykge1xuICAgICAgICAgICAgICAgIHZhciBkZWNscyA9IGtleWZyYW1lc1trZXlmcmFtZV07XG4gICAgICAgICAgICAgICAgdmFyIHN0ckRlY2xzID0gJyc7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGRlY2xzKVxuICAgICAgICAgICAgICAgICAgICBzdHJEZWNscyArPSByZW5kZXJlci5kZWNsKHByb3AsIGRlY2xzW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgIHN0ciArPSBrZXlmcmFtZSArICd7JyArIHN0ckRlY2xzICsgJ30nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgICAgICAgICAgIHZhciByYXdLZXlmcmFtZXMgPSBwcmVsdWRlLnJlcGxhY2UoJ0BrZXlmcmFtZXMnLCAnQCcgKyBwcmVmaXggKyAna2V5ZnJhbWVzJykgKyAneycgKyBzdHIgKyAnfSc7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZXIuY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmtzaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShyYXdLZXlmcmFtZXMpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5wdXRSYXcocmF3S2V5ZnJhbWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1dEF0KF9fLCBrZXlmcmFtZXMsIHByZWx1ZGUpO1xuICAgIH07XG5cbiAgICByZW5kZXJlci5rZXlmcmFtZXMgPSBmdW5jdGlvbiAoa2V5ZnJhbWVzLCBibG9jaykge1xuICAgICAgICBpZiAoIWJsb2NrKSBibG9jayA9IHJlbmRlcmVyLmhhc2goa2V5ZnJhbWVzKTtcbiAgICAgICAgYmxvY2sgPSByZW5kZXJlci5wZnggKyBibG9jaztcblxuICAgICAgICByZW5kZXJlci5wdXRBdCgnJywga2V5ZnJhbWVzLCAnQGtleWZyYW1lcyAnICsgYmxvY2spO1xuXG4gICAgICAgIHJldHVybiBibG9jaztcbiAgICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5hZGRvbiA9IGZ1bmN0aW9uIChyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnNlbGVjdG9yID0gZnVuY3Rpb24gKHBhcmVudFNlbGVjdG9ycywgc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyIHBhcmVudHMgPSBwYXJlbnRTZWxlY3RvcnMuc3BsaXQoJywnKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgc2VsZWN0b3JzID0gc2VsZWN0b3Iuc3BsaXQoJywnKTtcbiAgICAgICAgdmFyIGxlbjEgPSBwYXJlbnRzLmxlbmd0aDtcbiAgICAgICAgdmFyIGxlbjIgPSBzZWxlY3RvcnMubGVuZ3RoO1xuICAgICAgICB2YXIgaSwgaiwgc2VsLCBwb3MsIHBhcmVudCwgcmVwbGFjZWRTZWxlY3RvcjtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuMjsgaSsrKSB7XG4gICAgICAgICAgICBzZWwgPSBzZWxlY3RvcnNbaV07XG4gICAgICAgICAgICBwb3MgPSBzZWwuaW5kZXhPZignJicpO1xuXG4gICAgICAgICAgICBpZiAocG9zID4gLTEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VkU2VsZWN0b3IgPSBzZWwucmVwbGFjZSgvJi9nLCBwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChyZXBsYWNlZFNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50c1tqXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXJlbnQgKyAnICcgKyBzZWwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc2VsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignLCcpO1xuICAgIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmFkZG9uID0gZnVuY3Rpb24gKHJlbmRlcmVyKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9fX2Rldl9fL3dhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMnKSgncnVsZScsIHJlbmRlcmVyLCBbJ3B1dCddKTtcbiAgICB9XG5cbiAgICB2YXIgYmxvY2tzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYmxvY2tzID0ge307XG4gICAgfVxuXG4gICAgcmVuZGVyZXIucnVsZSA9IGZ1bmN0aW9uIChjc3MsIGJsb2NrKSB7XG4gICAgICAgIC8vIFdhcm4gdXNlciBpZiBDU1Mgc2VsZWN0b3JzIGNsYXNoLlxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9jayAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICduYW5vLWNzcyBibG9jayBuYW1lIG11c3QgYmUgYSBzdHJpbmcuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCB1c2UgbmFuby5ydWxlKHtjb2xvcjogXCJyZWRcIiwgXCJSZWRUZXh0XCIpLidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzW2Jsb2NrXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdCbG9jayBuYW1lIFwiJyArIGJsb2NrICsgJ1wiIHVzZWQgbW9yZSB0aGFuIG9uY2UuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmxvY2tzW2Jsb2NrXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBibG9jayA9IGJsb2NrIHx8IHJlbmRlcmVyLmhhc2goY3NzKTtcbiAgICAgICAgYmxvY2sgPSByZW5kZXJlci5wZnggKyBibG9jaztcbiAgICAgICAgcmVuZGVyZXIucHV0KCcuJyArIGJsb2NrLCBjc3MpO1xuXG4gICAgICAgIHJldHVybiAnICcgKyBibG9jaztcbiAgICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5hZGRvbiA9IGZ1bmN0aW9uIChyZW5kZXJlcikge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHJlcXVpcmUoJy4vX19kZXZfXy93YXJuT25NaXNzaW5nRGVwZW5kZW5jaWVzJykoJ3N0eWxlJywgcmVuZGVyZXIsIFsnanN4J10pO1xuICAgIH1cblxuICAgIHJlbmRlcmVyLnN0eWxlID0gZnVuY3Rpb24gKGZuLCBzdHlsZXMsIGR5bmFtaWNUZW1wbGF0ZSwgYmxvY2spIHtcbiAgICAgICAgdmFyIGpzeENvbXBvbmVudCA9IHJlbmRlcmVyLmpzeChmbiwgc3R5bGVzLCBibG9jayk7XG5cbiAgICAgICAgdmFyIENvbXBvbmVudCA9IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgICAgICB2YXIgY29weSA9IHByb3BzO1xuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkeW5hbWljVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBjb3B5LmNzcyA9IGR5bmFtaWNUZW1wbGF0ZShwcm9wcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBqc3hDb21wb25lbnQoY29weSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChibG9jayB8fCAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIENvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdzdHlsZSgnICsgKGJsb2NrIHx8IGZuLmRpc3BsYXlOYW1lIHx8IGZuLm5hbWUpICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcbiAgICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRhZ3MgPSBbXG4gICAgJ2EnLFxuICAgICdhYmJyJyxcbiAgICAnYWRkcmVzcycsXG4gICAgJ2FyZWEnLFxuICAgICdhcnRpY2xlJyxcbiAgICAnYXNpZGUnLFxuICAgICdhdWRpbycsXG4gICAgJ2InLFxuICAgICdiYXNlJyxcbiAgICAnYmRpJyxcbiAgICAnYmRvJyxcbiAgICAnYmlnJyxcbiAgICAnYmxvY2txdW90ZScsXG4gICAgJ2JvZHknLFxuICAgICdicicsXG4gICAgJ2J1dHRvbicsXG4gICAgJ2NhbnZhcycsXG4gICAgJ2NhcHRpb24nLFxuICAgICdjaXRlJyxcbiAgICAnY29kZScsXG4gICAgJ2NvbCcsXG4gICAgJ2NvbGdyb3VwJyxcbiAgICAnZGF0YScsXG4gICAgJ2RhdGFsaXN0JyxcbiAgICAnZGQnLFxuICAgICdkZWwnLFxuICAgICdkZXRhaWxzJyxcbiAgICAnZGZuJyxcbiAgICAnZGlhbG9nJyxcbiAgICAnZGl2JyxcbiAgICAnZGwnLFxuICAgICdkdCcsXG4gICAgJ2VtJyxcbiAgICAnZW1iZWQnLFxuICAgICdmaWVsZHNldCcsXG4gICAgJ2ZpZ2NhcHRpb24nLFxuICAgICdmaWd1cmUnLFxuICAgICdmb290ZXInLFxuICAgICdmb3JtJyxcbiAgICAnaDEnLFxuICAgICdoMicsXG4gICAgJ2gzJyxcbiAgICAnaDQnLFxuICAgICdoNScsXG4gICAgJ2g2JyxcbiAgICAnaGVhZCcsXG4gICAgJ2hlYWRlcicsXG4gICAgJ2hncm91cCcsXG4gICAgJ2hyJyxcbiAgICAnaHRtbCcsXG4gICAgJ2knLFxuICAgICdpZnJhbWUnLFxuICAgICdpbWcnLFxuICAgICdpbnB1dCcsXG4gICAgJ2lucycsXG4gICAgJ2tiZCcsXG4gICAgJ2tleWdlbicsXG4gICAgJ2xhYmVsJyxcbiAgICAnbGVnZW5kJyxcbiAgICAnbGknLFxuICAgICdsaW5rJyxcbiAgICAnbWFpbicsXG4gICAgJ21hcCcsXG4gICAgJ21hcmsnLFxuICAgICdtYXJxdWVlJyxcbiAgICAnbWVudScsXG4gICAgJ21lbnVpdGVtJyxcbiAgICAnbWV0YScsXG4gICAgJ21ldGVyJyxcbiAgICAnbmF2JyxcbiAgICAnbm9zY3JpcHQnLFxuICAgICdvYmplY3QnLFxuICAgICdvbCcsXG4gICAgJ29wdGdyb3VwJyxcbiAgICAnb3B0aW9uJyxcbiAgICAnb3V0cHV0JyxcbiAgICAncCcsXG4gICAgJ3BhcmFtJyxcbiAgICAncGljdHVyZScsXG4gICAgJ3ByZScsXG4gICAgJ3Byb2dyZXNzJyxcbiAgICAncScsXG4gICAgJ3JwJyxcbiAgICAncnQnLFxuICAgICdydWJ5JyxcbiAgICAncycsXG4gICAgJ3NhbXAnLFxuICAgICdzY3JpcHQnLFxuICAgICdzZWN0aW9uJyxcbiAgICAnc2VsZWN0JyxcbiAgICAnc21hbGwnLFxuICAgICdzb3VyY2UnLFxuICAgICdzcGFuJyxcbiAgICAnc3Ryb25nJyxcbiAgICAnc3R5bGUnLFxuICAgICdzdWInLFxuICAgICdzdW1tYXJ5JyxcbiAgICAnc3VwJyxcbiAgICAndGFibGUnLFxuICAgICd0Ym9keScsXG4gICAgJ3RkJyxcbiAgICAndGV4dGFyZWEnLFxuICAgICd0Zm9vdCcsXG4gICAgJ3RoJyxcbiAgICAndGhlYWQnLFxuICAgICd0aW1lJyxcbiAgICAndGl0bGUnLFxuICAgICd0cicsXG4gICAgJ3RyYWNrJyxcbiAgICAndScsXG4gICAgJ3VsJyxcbiAgICAndmFyJyxcbiAgICAndmlkZW8nLFxuICAgICd3YnInLFxuXG4gICAgLy8gU1ZHXG4gICAgJ2NpcmNsZScsXG4gICAgJ2NsaXBQYXRoJyxcbiAgICAnZGVmcycsXG4gICAgJ2VsbGlwc2UnLFxuICAgICdmb3JlaWduT2JqZWN0JyxcbiAgICAnZycsXG4gICAgJ2ltYWdlJyxcbiAgICAnbGluZScsXG4gICAgJ2xpbmVhckdyYWRpZW50JyxcbiAgICAnbWFzaycsXG4gICAgJ3BhdGgnLFxuICAgICdwYXR0ZXJuJyxcbiAgICAncG9seWdvbicsXG4gICAgJ3BvbHlsaW5lJyxcbiAgICAncmFkaWFsR3JhZGllbnQnLFxuICAgICdyZWN0JyxcbiAgICAnc3RvcCcsXG4gICAgJ3N2ZycsXG4gICAgJ3RleHQnLFxuICAgICd0c3BhbicsXG5dO1xuXG5leHBvcnRzLmFkZG9uID0gZnVuY3Rpb24gKHJlbmRlcmVyKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9fX2Rldl9fL3dhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMnKSgnc3R5bGVkJywgcmVuZGVyZXIsIFsnc3R5bGUnXSk7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlZCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHlsZXMsIGR5bmFtaWNUZW1wbGF0ZSwgYmxvY2spIHtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXJlci5zdHlsZSh0YWcsIHN0eWxlcywgZHluYW1pY1RlbXBsYXRlLCBibG9jayk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciB0YWc7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFnID0gdGFnc1tpXTtcbiAgICAgICAgc3R5bGVkW3RhZ10gPSBzdHlsZWQodGFnKTtcbiAgICB9XG5cbiAgICByZW5kZXJlci5zdHlsZWQgPSBzdHlsZWQ7XG59O1xuIiwiLyoqXG4gKiBTcGVjaWFsIHZhbHVlcyB0aGF0IHRlbGwgZGVlcG1lcmdlIHRvIHBlcmZvcm0gYSBjZXJ0YWluIGFjdGlvbi5cbiAqL1xuY29uc3QgYWN0aW9ucyA9IHtcbiAgICBkZWZhdWx0TWVyZ2U6IFN5bWJvbChcImRlZXBtZXJnZS10czogZGVmYXVsdCBtZXJnZVwiKSxcbiAgICBza2lwOiBTeW1ib2woXCJkZWVwbWVyZ2UtdHM6IHNraXBcIiksXG59O1xuLyoqXG4gKiBTcGVjaWFsIHZhbHVlcyB0aGF0IHRlbGwgZGVlcG1lcmdlSW50byB0byBwZXJmb3JtIGEgY2VydGFpbiBhY3Rpb24uXG4gKi9cbmNvbnN0IGFjdGlvbnNJbnRvID0ge1xuICAgIGRlZmF1bHRNZXJnZTogYWN0aW9ucy5kZWZhdWx0TWVyZ2UsXG59O1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIHRvIHVwZGF0ZSBtZXRhIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRNZXRhRGF0YVVwZGF0ZXIocHJldmlvdXNNZXRhLCBtZXRhTWV0YSkge1xuICAgIHJldHVybiBtZXRhTWV0YTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHR5cGUgb2YgdGhlIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBnZXQgdGhlIHR5cGUgb2YuXG4gKiBAcmV0dXJucyBUaGUgdHlwZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBnZXRPYmplY3RUeXBlKG9iamVjdCkge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMCAvKiBPYmplY3RUeXBlLk5PVCAqLztcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gMiAvKiBPYmplY3RUeXBlLkFSUkFZICovO1xuICAgIH1cbiAgICBpZiAoaXNSZWNvcmQob2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gMSAvKiBPYmplY3RUeXBlLlJFQ09SRCAqLztcbiAgICB9XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICByZXR1cm4gMyAvKiBPYmplY3RUeXBlLlNFVCAqLztcbiAgICB9XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICByZXR1cm4gNCAvKiBPYmplY3RUeXBlLk1BUCAqLztcbiAgICB9XG4gICAgcmV0dXJuIDUgLyogT2JqZWN0VHlwZS5PVEhFUiAqLztcbn1cbi8qKlxuICogR2V0IHRoZSBrZXlzIG9mIHRoZSBnaXZlbiBvYmplY3RzIGluY2x1ZGluZyBzeW1ib2wga2V5cy5cbiAqXG4gKiBOb3RlOiBPbmx5IGtleXMgdG8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFyZSByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0cyAtIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZ2V0IHRoZSBrZXlzIG9mLlxuICogQHJldHVybnMgQSBzZXQgY29udGFpbmluZyBhbGwgdGhlIGtleXMgb2YgYWxsIHRoZSBnaXZlbiBvYmplY3RzLlxuICovXG5mdW5jdGlvbiBnZXRLZXlzKG9iamVjdHMpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzIC0tIHVzaW5nIGEgbG9vcCBoZXJlIGlzIG1vcmUgZWZmaWNpZW50LiAqL1xuICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIG9iamVjdHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgW1xuICAgICAgICAgICAgLi4uT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgICAgICAgIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KSxcbiAgICAgICAgXSkge1xuICAgICAgICAgICAga2V5cy5hZGQoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzICovXG4gICAgcmV0dXJuIGtleXM7XG59XG4vKipcbiAqIERvZXMgdGhlIGdpdmVuIG9iamVjdCBoYXZlIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHBhcmFtIHByb3BlcnR5IC0gVGhlIHByb3BlcnR5IHRvIHRlc3QuXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0SGFzUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiAodHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpO1xufVxuLyoqXG4gKiBHZXQgYW4gaXRlcmFibGUgb2JqZWN0IHRoYXQgaXRlcmF0ZXMgb3ZlciB0aGUgZ2l2ZW4gaXRlcmFibGVzLlxuICovXG5mdW5jdGlvbiBnZXRJdGVyYWJsZU9mSXRlcmFibGVzKGl0ZXJhYmxlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50c1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVyYWJsZSBvZiBpdGVyYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuY3Rpb25hbC9uby1sb29wLXN0YXRlbWVudHNcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuY29uc3QgdmFsaWRSZWNvcmRUb1N0cmluZ1ZhbHVlcyA9IG5ldyBTZXQoW1xuICAgIFwiW29iamVjdCBPYmplY3RdXCIsXG4gICAgXCJbb2JqZWN0IE1vZHVsZV1cIixcbl0pO1xuLyoqXG4gKiBEb2VzIHRoZSBnaXZlbiBvYmplY3QgYXBwZWFyIHRvIGJlIGEgcmVjb3JkLlxuICovXG5mdW5jdGlvbiBpc1JlY29yZCh2YWx1ZSkge1xuICAgIC8vIEFsbCByZWNvcmRzIGFyZSBvYmplY3RzLlxuICAgIGlmICghdmFsaWRSZWNvcmRUb1N0cmluZ1ZhbHVlcy5oYXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbnN0cnVjdG9yIH0gPSB2YWx1ZTtcbiAgICAvLyBJZiBoYXMgbW9kaWZpZWQgY29uc3RydWN0b3IuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bm5lY2Vzc2FyeS1jb25kaXRpb25cbiAgICBpZiAoY29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgY29uc3QgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIC8vIElmIGhhcyBtb2RpZmllZCBwcm90b3R5cGUuXG4gICAgaWYgKHByb3RvdHlwZSA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlb2YgcHJvdG90eXBlICE9PSBcIm9iamVjdFwiIHx8XG4gICAgICAgICF2YWxpZFJlY29yZFRvU3RyaW5nVmFsdWVzLmhhcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvdG90eXBlKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJZiBjb25zdHJ1Y3RvciBkb2VzIG5vdCBoYXZlIGFuIE9iamVjdC1zcGVjaWZpYyBtZXRob2QuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHNvbmFyanMvcHJlZmVyLXNpbmdsZS1ib29sZWFuLXJldHVybiwgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgaWYgKCFwcm90b3R5cGUuaGFzT3duUHJvcGVydHkoXCJpc1Byb3RvdHlwZU9mXCIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gTW9zdCBsaWtlbHkgYSByZWNvcmQuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgc3RyYXRlZ3kgdG8gbWVyZ2UgcmVjb3Jkcy5cbiAqXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHJlY29yZHMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlUmVjb3JkcyQyKHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50cywgZnVuY3Rpb25hbC9uby1jb25kaXRpb25hbC1zdGF0ZW1lbnRzIC0tIHVzaW5nIGEgbG9vcCBoZXJlIGlzIG1vcmUgcGVyZm9ybWFudC4gKi9cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBnZXRLZXlzKHZhbHVlcykpIHtcbiAgICAgICAgY29uc3QgcHJvcFZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKG9iamVjdEhhc1Byb3BlcnR5KHZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcHJvcFZhbHVlcy5wdXNoKHZhbHVlW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBkYXRlZE1ldGEgPSB1dGlscy5tZXRhRGF0YVVwZGF0ZXIobWV0YSwge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcGFyZW50czogdmFsdWVzLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcHJvcGVydHlSZXN1bHQgPSBtZXJnZVVua25vd25zKHByb3BWYWx1ZXMsIHV0aWxzLCB1cGRhdGVkTWV0YSk7XG4gICAgICAgIGlmIChwcm9wZXJ0eVJlc3VsdCA9PT0gYWN0aW9ucy5za2lwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ID09PSBcIl9fcHJvdG9fX1wiKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcHJvcGVydHlSZXN1bHQsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gcHJvcGVydHlSZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50cywgZnVuY3Rpb25hbC9uby1jb25kaXRpb25hbC1zdGF0ZW1lbnRzICovXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogVGhlIGRlZmF1bHQgc3RyYXRlZ3kgdG8gbWVyZ2UgYXJyYXlzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgYXJyYXlzLlxuICovXG5mdW5jdGlvbiBtZXJnZUFycmF5cyQyKHZhbHVlcykge1xuICAgIHJldHVybiB2YWx1ZXMuZmxhdCgpO1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSBzZXRzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgc2V0cy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VTZXRzJDIodmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBTZXQoZ2V0SXRlcmFibGVPZkl0ZXJhYmxlcyh2YWx1ZXMpKTtcbn1cbi8qKlxuICogVGhlIGRlZmF1bHQgc3RyYXRlZ3kgdG8gbWVyZ2UgbWFwcy5cbiAqXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIG1hcHMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlTWFwcyQyKHZhbHVlcykge1xuICAgIHJldHVybiBuZXcgTWFwKGdldEl0ZXJhYmxlT2ZJdGVyYWJsZXModmFsdWVzKSk7XG59XG4vKipcbiAqIEdldCB0aGUgbGFzdCB2YWx1ZSBpbiB0aGUgZ2l2ZW4gYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3RoZXJzJDIodmFsdWVzKSB7XG4gICAgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV07XG59XG5cbnZhciBkZWZhdWx0TWVyZ2VGdW5jdGlvbnMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIG1lcmdlUmVjb3JkczogbWVyZ2VSZWNvcmRzJDIsXG4gICAgbWVyZ2VBcnJheXM6IG1lcmdlQXJyYXlzJDIsXG4gICAgbWVyZ2VTZXRzOiBtZXJnZVNldHMkMixcbiAgICBtZXJnZU1hcHM6IG1lcmdlTWFwcyQyLFxuICAgIG1lcmdlT3RoZXJzOiBtZXJnZU90aGVycyQyXG59KTtcblxuLyoqXG4gKiBEZWVwbHkgbWVyZ2Ugb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0cyAtIFRoZSBvYmplY3RzIHRvIG1lcmdlLlxuICovXG5mdW5jdGlvbiBkZWVwbWVyZ2UoLi4ub2JqZWN0cykge1xuICAgIHJldHVybiBkZWVwbWVyZ2VDdXN0b20oe30pKC4uLm9iamVjdHMpO1xufVxuZnVuY3Rpb24gZGVlcG1lcmdlQ3VzdG9tKG9wdGlvbnMsIHJvb3RNZXRhRGF0YSkge1xuICAgIGNvbnN0IHV0aWxzID0gZ2V0VXRpbHMob3B0aW9ucywgY3VzdG9taXplZERlZXBtZXJnZSk7XG4gICAgLyoqXG4gICAgICogVGhlIGN1c3RvbWl6ZWQgZGVlcG1lcmdlIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGN1c3RvbWl6ZWREZWVwbWVyZ2UoLi4ub2JqZWN0cykge1xuICAgICAgICByZXR1cm4gbWVyZ2VVbmtub3ducyhvYmplY3RzLCB1dGlscywgcm9vdE1ldGFEYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGN1c3RvbWl6ZWREZWVwbWVyZ2U7XG59XG4vKipcbiAqIFRoZSB0aGUgdXRpbHMgdGhhdCBhcmUgYXZhaWxhYmxlIHRvIHRoZSBtZXJnZSBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0aGUgdXNlciBzcGVjaWZpZWRcbiAqL1xuZnVuY3Rpb24gZ2V0VXRpbHMob3B0aW9ucywgY3VzdG9taXplZERlZXBtZXJnZSkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVmYXVsdE1lcmdlRnVuY3Rpb25zLFxuICAgICAgICBtZXJnZUZ1bmN0aW9uczoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdE1lcmdlRnVuY3Rpb25zLFxuICAgICAgICAgICAgLi4uT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW2tleSwgb3B0aW9uXSkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRNZXJnZUZ1bmN0aW9ucywga2V5KSlcbiAgICAgICAgICAgICAgICAubWFwKChba2V5LCBvcHRpb25dKSA9PiBvcHRpb24gPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgPyBba2V5LCBtZXJnZU90aGVycyQyXVxuICAgICAgICAgICAgICAgIDogW2tleSwgb3B0aW9uXSkpLFxuICAgICAgICB9LFxuICAgICAgICBtZXRhRGF0YVVwZGF0ZXI6ICgoX2EgPSBvcHRpb25zLm1ldGFEYXRhVXBkYXRlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGVmYXVsdE1ldGFEYXRhVXBkYXRlciksXG4gICAgICAgIGRlZXBtZXJnZTogY3VzdG9taXplZERlZXBtZXJnZSxcbiAgICAgICAgdXNlSW1wbGljaXREZWZhdWx0TWVyZ2luZzogKF9iID0gb3B0aW9ucy5lbmFibGVJbXBsaWNpdERlZmF1bHRNZXJnaW5nKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZSxcbiAgICAgICAgYWN0aW9ucyxcbiAgICB9O1xufVxuLyoqXG4gKiBNZXJnZSB1bmtub3duIHRoaW5ncy5cbiAqXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VVbmtub3ducyh2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlT3RoZXJzJDEodmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSBnZXRPYmplY3RUeXBlKHZhbHVlc1swXSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmN0aW9uYWwvbm8tY29uZGl0aW9uYWwtc3RhdGVtZW50cyAtLSBhZGQgYW4gZWFybHkgZXNjYXBlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gICAgaWYgKHR5cGUgIT09IDAgLyogT2JqZWN0VHlwZS5OT1QgKi8gJiYgdHlwZSAhPT0gNSAvKiBPYmplY3RUeXBlLk9USEVSICovKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50cyAtLSB1c2luZyBhIGxvb3AgaGVyZSBpcyBtb3JlIHBlcmZvcm1hbnQgdGhhbiBtYXBwaW5nIGV2ZXJ5IHZhbHVlIGFuZCB0aGVuIHRlc3RpbmcgZXZlcnkgdmFsdWUuXG4gICAgICAgIGZvciAobGV0IG1faW5kZXggPSAxOyBtX2luZGV4IDwgdmFsdWVzLmxlbmd0aDsgbV9pbmRleCsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0T2JqZWN0VHlwZSh2YWx1ZXNbbV9pbmRleF0pID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VPdGhlcnMkMSh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAxIC8qIE9iamVjdFR5cGUuUkVDT1JEICovOiB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VSZWNvcmRzJDEodmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAyIC8qIE9iamVjdFR5cGUuQVJSQVkgKi86IHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZUFycmF5cyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMyAvKiBPYmplY3RUeXBlLlNFVCAqLzoge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlU2V0cyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNCAvKiBPYmplY3RUeXBlLk1BUCAqLzoge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlTWFwcyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZU90aGVycyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBNZXJnZSByZWNvcmRzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgcmVjb3Jkcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VSZWNvcmRzJDEodmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlUmVjb3Jkcyh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAocmVzdWx0ID09PSBhY3Rpb25zLmRlZmF1bHRNZXJnZSB8fFxuICAgICAgICAodXRpbHMudXNlSW1wbGljaXREZWZhdWx0TWVyZ2luZyAmJlxuICAgICAgICAgICAgcmVzdWx0ID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlUmVjb3JkcyAhPT1cbiAgICAgICAgICAgICAgICB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VSZWNvcmRzKSkge1xuICAgICAgICByZXR1cm4gdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlUmVjb3Jkcyh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogTWVyZ2UgYXJyYXlzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgYXJyYXlzLlxuICovXG5mdW5jdGlvbiBtZXJnZUFycmF5cyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBjb25zdCByZXN1bHQgPSB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZUFycmF5cyh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAocmVzdWx0ID09PSBhY3Rpb25zLmRlZmF1bHRNZXJnZSB8fFxuICAgICAgICAodXRpbHMudXNlSW1wbGljaXREZWZhdWx0TWVyZ2luZyAmJlxuICAgICAgICAgICAgcmVzdWx0ID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlQXJyYXlzICE9PVxuICAgICAgICAgICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZUFycmF5cykpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZUFycmF5cyh2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBNZXJnZSBzZXRzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgc2V0cy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VTZXRzJDEodmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlU2V0cyh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAocmVzdWx0ID09PSBhY3Rpb25zLmRlZmF1bHRNZXJnZSB8fFxuICAgICAgICAodXRpbHMudXNlSW1wbGljaXREZWZhdWx0TWVyZ2luZyAmJlxuICAgICAgICAgICAgcmVzdWx0ID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlU2V0cyAhPT0gdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlU2V0cykpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZVNldHModmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogTWVyZ2UgbWFwcy5cbiAqXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIG1hcHMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlTWFwcyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBjb25zdCByZXN1bHQgPSB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZU1hcHModmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gYWN0aW9ucy5kZWZhdWx0TWVyZ2UgfHxcbiAgICAgICAgKHV0aWxzLnVzZUltcGxpY2l0RGVmYXVsdE1lcmdpbmcgJiZcbiAgICAgICAgICAgIHJlc3VsdCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZU1hcHMgIT09IHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZU1hcHMpKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VNYXBzKHZhbHVlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIE1lcmdlIG90aGVyIHRoaW5ncy5cbiAqXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIG90aGVyIHRoaW5ncy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPdGhlcnMkMSh2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VPdGhlcnModmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgaWYgKHJlc3VsdCA9PT0gYWN0aW9ucy5kZWZhdWx0TWVyZ2UgfHxcbiAgICAgICAgKHV0aWxzLnVzZUltcGxpY2l0RGVmYXVsdE1lcmdpbmcgJiZcbiAgICAgICAgICAgIHJlc3VsdCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZU90aGVycyAhPT1cbiAgICAgICAgICAgICAgICB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VPdGhlcnMpKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VPdGhlcnModmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSByZWNvcmRzIGludG8gYSB0YXJnZXQgcmVjb3JkLlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSByZXN1bHQgd2lsbCBiZSBtdXRhdGVkIGludG8gdGhpcyByZWNvcmRcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgcmVjb3JkcyAoaW5jbHVkaW5nIHRoZSB0YXJnZXQncyB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUpLlxuICovXG5mdW5jdGlvbiBtZXJnZVJlY29yZHMobV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50cywgZnVuY3Rpb25hbC9uby1jb25kaXRpb25hbC1zdGF0ZW1lbnRzIC0tIHVzaW5nIGEgbG9vcCBoZXJlIGlzIG1vcmUgcGVyZm9ybWFudC4gKi9cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBnZXRLZXlzKHZhbHVlcykpIHtcbiAgICAgICAgY29uc3QgcHJvcFZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKG9iamVjdEhhc1Byb3BlcnR5KHZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcHJvcFZhbHVlcy5wdXNoKHZhbHVlW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBkYXRlZE1ldGEgPSB1dGlscy5tZXRhRGF0YVVwZGF0ZXIobWV0YSwge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcGFyZW50czogdmFsdWVzLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcHJvcGVydHlUYXJnZXQgPSB7IHZhbHVlOiBwcm9wVmFsdWVzWzBdIH07XG4gICAgICAgIG1lcmdlVW5rbm93bnNJbnRvKHByb3BlcnR5VGFyZ2V0LCBwcm9wVmFsdWVzLCB1dGlscywgdXBkYXRlZE1ldGEpO1xuICAgICAgICBpZiAoa2V5ID09PSBcIl9fcHJvdG9fX1wiKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobV90YXJnZXQsIGtleSwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wZXJ0eVRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbV90YXJnZXQudmFsdWVba2V5XSA9IHByb3BlcnR5VGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgZnVuY3Rpb25hbC9uby1sb29wLXN0YXRlbWVudHMsIGZ1bmN0aW9uYWwvbm8tY29uZGl0aW9uYWwtc3RhdGVtZW50cyAqL1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSBhcnJheXMgaW50byBhIHRhcmdldCBhcnJheS5cbiAqXG4gKiBAcGFyYW0gbV90YXJnZXQgLSBUaGUgcmVzdWx0IHdpbGwgYmUgbXV0YXRlZCBpbnRvIHRoaXMgYXJyYXlcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgYXJyYXlzIChpbmNsdWRpbmcgdGhlIHRhcmdldCdzIHZhbHVlIGlmIHRoZXJlIGlzIG9uZSkuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXlzKG1fdGFyZ2V0LCB2YWx1ZXMpIHtcbiAgICBtX3RhcmdldC52YWx1ZS5wdXNoKC4uLnZhbHVlcy5zbGljZSgxKS5mbGF0KCkpO1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSBzZXRzIGludG8gYSB0YXJnZXQgc2V0LlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSByZXN1bHQgd2lsbCBiZSBtdXRhdGVkIGludG8gdGhpcyBzZXRcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgc2V0cyAoaW5jbHVkaW5nIHRoZSB0YXJnZXQncyB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUpLlxuICovXG5mdW5jdGlvbiBtZXJnZVNldHMobV90YXJnZXQsIHZhbHVlcykge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgZ2V0SXRlcmFibGVPZkl0ZXJhYmxlcyh2YWx1ZXMuc2xpY2UoMSkpKSB7XG4gICAgICAgIG1fdGFyZ2V0LnZhbHVlLmFkZCh2YWx1ZSk7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSBtYXBzIGludG8gYSB0YXJnZXQgbWFwLlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSByZXN1bHQgd2lsbCBiZSBtdXRhdGVkIGludG8gdGhpcyBtYXBcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgbWFwcyAoaW5jbHVkaW5nIHRoZSB0YXJnZXQncyB2YWx1ZSBpZiB0aGVyZSBpcyBvbmUpLlxuICovXG5mdW5jdGlvbiBtZXJnZU1hcHMobV90YXJnZXQsIHZhbHVlcykge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGdldEl0ZXJhYmxlT2ZJdGVyYWJsZXModmFsdWVzLnNsaWNlKDEpKSkge1xuICAgICAgICBtX3RhcmdldC52YWx1ZS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxufVxuLyoqXG4gKiBTZXQgdGhlIHRhcmdldCB0byB0aGUgbGFzdCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPdGhlcnMobV90YXJnZXQsIHZhbHVlcykge1xuICAgIG1fdGFyZ2V0LnZhbHVlID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbn1cblxudmFyIGRlZmF1bHRNZXJnZUludG9GdW5jdGlvbnMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIG1lcmdlUmVjb3JkczogbWVyZ2VSZWNvcmRzLFxuICAgIG1lcmdlQXJyYXlzOiBtZXJnZUFycmF5cyxcbiAgICBtZXJnZVNldHM6IG1lcmdlU2V0cyxcbiAgICBtZXJnZU1hcHM6IG1lcmdlTWFwcyxcbiAgICBtZXJnZU90aGVyczogbWVyZ2VPdGhlcnNcbn0pO1xuXG5mdW5jdGlvbiBkZWVwbWVyZ2VJbnRvKHRhcmdldCwgLi4ub2JqZWN0cykge1xuICAgIHJldHVybiB2b2lkIGRlZXBtZXJnZUludG9DdXN0b20oe30pKHRhcmdldCwgLi4ub2JqZWN0cyk7XG59XG5mdW5jdGlvbiBkZWVwbWVyZ2VJbnRvQ3VzdG9tKG9wdGlvbnMsIHJvb3RNZXRhRGF0YSkge1xuICAgIGNvbnN0IHV0aWxzID0gZ2V0SW50b1V0aWxzKG9wdGlvbnMsIGN1c3RvbWl6ZWREZWVwbWVyZ2VJbnRvKTtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VzdG9taXplZCBkZWVwbWVyZ2UgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3VzdG9taXplZERlZXBtZXJnZUludG8odGFyZ2V0LCAuLi5vYmplY3RzKSB7XG4gICAgICAgIG1lcmdlVW5rbm93bnNJbnRvKHsgdmFsdWU6IHRhcmdldCB9LCBbdGFyZ2V0LCAuLi5vYmplY3RzXSwgdXRpbHMsIHJvb3RNZXRhRGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBjdXN0b21pemVkRGVlcG1lcmdlSW50bztcbn1cbi8qKlxuICogVGhlIHRoZSB1dGlscyB0aGF0IGFyZSBhdmFpbGFibGUgdG8gdGhlIG1lcmdlIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHRoZSB1c2VyIHNwZWNpZmllZFxuICovXG5mdW5jdGlvbiBnZXRJbnRvVXRpbHMob3B0aW9ucywgY3VzdG9taXplZERlZXBtZXJnZUludG8pIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVmYXVsdE1lcmdlRnVuY3Rpb25zOiBkZWZhdWx0TWVyZ2VJbnRvRnVuY3Rpb25zLFxuICAgICAgICBtZXJnZUZ1bmN0aW9uczoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdE1lcmdlSW50b0Z1bmN0aW9ucyxcbiAgICAgICAgICAgIC4uLk9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhvcHRpb25zKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtrZXksIG9wdGlvbl0pID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0TWVyZ2VJbnRvRnVuY3Rpb25zLCBrZXkpKVxuICAgICAgICAgICAgICAgIC5tYXAoKFtrZXksIG9wdGlvbl0pID0+IG9wdGlvbiA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICA/IFtrZXksIG1lcmdlT3RoZXJzXVxuICAgICAgICAgICAgICAgIDogW2tleSwgb3B0aW9uXSkpLFxuICAgICAgICB9LFxuICAgICAgICBtZXRhRGF0YVVwZGF0ZXI6ICgoX2EgPSBvcHRpb25zLm1ldGFEYXRhVXBkYXRlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGVmYXVsdE1ldGFEYXRhVXBkYXRlciksXG4gICAgICAgIGRlZXBtZXJnZUludG86IGN1c3RvbWl6ZWREZWVwbWVyZ2VJbnRvLFxuICAgICAgICBhY3Rpb25zOiBhY3Rpb25zSW50byxcbiAgICB9O1xufVxuLyoqXG4gKiBNZXJnZSB1bmtub3duIHRoaW5ncyBpbnRvIGEgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSB0YXJnZXQgdG8gbWVyZ2UgaW50by5cbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBtZXJnZVVua25vd25zSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1pbnZhbGlkLXZvaWQtdHlwZVxuKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdm9pZCBtZXJnZU90aGVyc0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gZ2V0T2JqZWN0VHlwZShtX3RhcmdldC52YWx1ZSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmN0aW9uYWwvbm8tY29uZGl0aW9uYWwtc3RhdGVtZW50cyAtLSBhZGQgYW4gZWFybHkgZXNjYXBlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gICAgaWYgKHR5cGUgIT09IDAgLyogT2JqZWN0VHlwZS5OT1QgKi8gJiYgdHlwZSAhPT0gNSAvKiBPYmplY3RUeXBlLk9USEVSICovKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50cyAtLSB1c2luZyBhIGxvb3AgaGVyZSBpcyBtb3JlIHBlcmZvcm1hbnQgdGhhbiBtYXBwaW5nIGV2ZXJ5IHZhbHVlIGFuZCB0aGVuIHRlc3RpbmcgZXZlcnkgdmFsdWUuXG4gICAgICAgIGZvciAobGV0IG1faW5kZXggPSAxOyBtX2luZGV4IDwgdmFsdWVzLmxlbmd0aDsgbV9pbmRleCsrKSB7XG4gICAgICAgICAgICBpZiAoZ2V0T2JqZWN0VHlwZSh2YWx1ZXNbbV9pbmRleF0pID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBtZXJnZU90aGVyc0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIDEgLyogT2JqZWN0VHlwZS5SRUNPUkQgKi86IHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIG1lcmdlUmVjb3Jkc0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMiAvKiBPYmplY3RUeXBlLkFSUkFZICovOiB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBtZXJnZUFycmF5c0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMyAvKiBPYmplY3RUeXBlLlNFVCAqLzoge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgbWVyZ2VTZXRzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA0IC8qIE9iamVjdFR5cGUuTUFQICovOiB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBtZXJnZU1hcHNJbnRvKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBtZXJnZU90aGVyc0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBNZXJnZSByZWNvcmRzIGludG8gYSB0YXJnZXQgcmVjb3JkLlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSB0YXJnZXQgdG8gbWVyZ2UgaW50by5cbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgcmVjb3Jkcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VSZWNvcmRzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlUmVjb3JkcyhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgaWYgKGFjdGlvbiA9PT0gYWN0aW9uc0ludG8uZGVmYXVsdE1lcmdlKSB7XG4gICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZVJlY29yZHMobV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIH1cbn1cbi8qKlxuICogTWVyZ2UgYXJyYXlzIGludG8gYSB0YXJnZXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBtZXJnZSBpbnRvLlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBhcnJheXMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXlzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlQXJyYXlzKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAoYWN0aW9uID09PSBhY3Rpb25zSW50by5kZWZhdWx0TWVyZ2UpIHtcbiAgICAgICAgdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlQXJyYXlzKG1fdGFyZ2V0LCB2YWx1ZXMpO1xuICAgIH1cbn1cbi8qKlxuICogTWVyZ2Ugc2V0cyBpbnRvIGEgdGFyZ2V0IHNldC5cbiAqXG4gKiBAcGFyYW0gbV90YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIG1lcmdlIGludG8uXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHNldHMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlU2V0c0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBjb25zdCBhY3Rpb24gPSB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZVNldHMobV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChhY3Rpb24gPT09IGFjdGlvbnNJbnRvLmRlZmF1bHRNZXJnZSkge1xuICAgICAgICB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VTZXRzKG1fdGFyZ2V0LCB2YWx1ZXMpO1xuICAgIH1cbn1cbi8qKlxuICogTWVyZ2UgbWFwcyBpbnRvIGEgdGFyZ2V0IG1hcC5cbiAqXG4gKiBAcGFyYW0gbV90YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIG1lcmdlIGludG8uXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIG1hcHMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlTWFwc0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBjb25zdCBhY3Rpb24gPSB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZU1hcHMobV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChhY3Rpb24gPT09IGFjdGlvbnNJbnRvLmRlZmF1bHRNZXJnZSkge1xuICAgICAgICB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VNYXBzKG1fdGFyZ2V0LCB2YWx1ZXMpO1xuICAgIH1cbn1cbi8qKlxuICogTWVyZ2Ugb3RoZXIgdGhpbmdzIGludG8gYSB0YXJnZXQuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBtZXJnZSBpbnRvLlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBvdGhlciB0aGluZ3MuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3RoZXJzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlT3RoZXJzKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAoYWN0aW9uID09PSBhY3Rpb25zSW50by5kZWZhdWx0TWVyZ2UgfHxcbiAgICAgICAgbV90YXJnZXQudmFsdWUgPT09IGFjdGlvbnNJbnRvLmRlZmF1bHRNZXJnZSkge1xuICAgICAgICB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VPdGhlcnMobV90YXJnZXQsIHZhbHVlcyk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBkZWVwbWVyZ2UsIGRlZXBtZXJnZUN1c3RvbSwgZGVlcG1lcmdlSW50bywgZGVlcG1lcmdlSW50b0N1c3RvbSB9O1xuIiwidmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJhc2VQcm9wcyhwcm9wcykge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZztcbiAgICByZXR1cm4ge1xuICAgICAgICBheGlzOiAoX2EgPSBwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMuYXhpcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ3gnLFxuICAgICAgICB4TWF4OiAoX2IgPSBwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMueE1heCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMTAwLFxuICAgICAgICB4TWluOiAoX2MgPSBwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMueE1pbikgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMCxcbiAgICAgICAgeFN0ZXA6IChfZCA9IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy54U3RlcCkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMSxcbiAgICAgICAgeU1heDogKF9lID0gcHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnlNYXgpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IDEwMCxcbiAgICAgICAgeU1pbjogKF9mID0gcHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnlNaW4pICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IDAsXG4gICAgICAgIHlTdGVwOiAoX2cgPSBwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMueVN0ZXApICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IDEsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlcyhldmVudCwgbGFzdFBvc2l0aW9uKSB7XG4gICAgaWYgKCd0b3VjaGVzJyBpbiBldmVudCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItc3ByZWFkXG4gICAgICAgIHZhciBfYSA9IF9fcmVhZChfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoQXJyYXkuZnJvbShldmVudC50b3VjaGVzKSksIGZhbHNlKSwgMSksIHRvdWNoID0gX2FbMF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0b3VjaCA/IHRvdWNoLmNsaWVudFggOiBsYXN0UG9zaXRpb24ueCxcbiAgICAgICAgICAgIHk6IHRvdWNoID8gdG91Y2guY2xpZW50WSA6IGxhc3RQb3NpdGlvbi55LFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBldmVudC5jbGllbnRYLFxuICAgICAgICB5OiBldmVudC5jbGllbnRZLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9zaXRpb24ocG9zaXRpb24sIHByb3BzLCBlbCkge1xuICAgIHZhciBfYSA9IGdldEJhc2VQcm9wcyhwcm9wcyksIGF4aXMgPSBfYS5heGlzLCB4TWF4ID0gX2EueE1heCwgeE1pbiA9IF9hLnhNaW4sIHhTdGVwID0gX2EueFN0ZXAsIHlNYXggPSBfYS55TWF4LCB5TWluID0gX2EueU1pbiwgeVN0ZXAgPSBfYS55U3RlcDtcbiAgICB2YXIgX2IgPSAoZWwgPT09IG51bGwgfHwgZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSB8fCB7fSwgX2MgPSBfYi5oZWlnaHQsIGhlaWdodCA9IF9jID09PSB2b2lkIDAgPyB4TWF4IDogX2MsIF9kID0gX2Iud2lkdGgsIHdpZHRoID0gX2QgPT09IHZvaWQgMCA/IHlNYXggOiBfZDtcbiAgICB2YXIgeCA9IHBvc2l0aW9uLngsIHkgPSBwb3NpdGlvbi55O1xuICAgIHZhciBkeCA9IDA7XG4gICAgdmFyIGR5ID0gMDtcbiAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgeCA9IDA7XG4gICAgfVxuICAgIGlmICh4ID4gd2lkdGgpIHtcbiAgICAgICAgeCA9IHdpZHRoO1xuICAgIH1cbiAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgeSA9IDA7XG4gICAgfVxuICAgIGlmICh5ID4gaGVpZ2h0KSB7XG4gICAgICAgIHkgPSBoZWlnaHQ7XG4gICAgfVxuICAgIGlmIChheGlzID09PSAneCcgfHwgYXhpcyA9PT0gJ3h5Jykge1xuICAgICAgICBkeCA9IE1hdGgucm91bmQoKHggLyB3aWR0aCkgKiAoeE1heCAtIHhNaW4pKTtcbiAgICB9XG4gICAgaWYgKGF4aXMgPT09ICd5JyB8fCBheGlzID09PSAneHknKSB7XG4gICAgICAgIGR5ID0gTWF0aC5yb3VuZCgoeSAvIGhlaWdodCkgKiAoeU1heCAtIHlNaW4pKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcm91bmQoZHgsIHhTdGVwKSxcbiAgICAgICAgeTogcm91bmQoZHksIHlTdGVwKSxcbiAgICB9O1xufVxuLyoqXG4gKiBHZXQgYSBub3JtYWxpemVkIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb3JtYWxpemVkVmFsdWUobmFtZSwgcHJvcHMpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9wc1tuYW1lXSB8fCAwO1xuICAgIHZhciBtaW4gPSBuYW1lID09PSAneCcgPyBwcm9wcy54TWluIDogcHJvcHMueU1pbjtcbiAgICB2YXIgbWF4ID0gbmFtZSA9PT0gJ3gnID8gcHJvcHMueE1heCA6IHByb3BzLnlNYXg7XG4gICAgaWYgKGlzTnVtYmVyKG1pbikgJiYgdmFsdWUgPCBtaW4pIHtcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKG1heCkgJiYgdmFsdWUgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIGludG8gYSBudW1iZXIgb3IgcmV0dXJuIGl0IGlmIGl0J3MgYWxyZWFkeSBhIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOdW1iZXIodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xufVxuLyoqXG4gKiAgUmVtb3ZlIHByb3BlcnRpZXMgZnJvbSBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByb3BlcnRpZXMoaW5wdXQpIHtcbiAgICB2YXIgZmlsdGVyID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZmlsdGVyW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGlucHV0KSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0LCBrZXkpKSB7XG4gICAgICAgICAgICBpZiAoIWZpbHRlci5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBpbnB1dFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcm91bmQodmFsdWUsIGluY3JlbWVudCkge1xuICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUgLyBpbmNyZW1lbnQpICogaW5jcmVtZW50O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbmltcG9ydCB7IGRlZXBtZXJnZSB9IGZyb20gJ2RlZXBtZXJnZS10cyc7XG5pbXBvcnQgeyBwYXJzZU51bWJlciB9IGZyb20gJy4vdXRpbHMnO1xudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGhlaWdodDogJzIwcHgnLFxuICAgIHBhZGRpbmc6ICc2cHgnLFxuICAgIHJhbmdlQ29sb3I6ICcjMDA3YmZmJyxcbiAgICB0aHVtYkJvcmRlcjogJzJweCBzb2xpZCAjMDAwJyxcbiAgICB0aHVtYkJvcmRlclJhZGl1czogJzRweCcsXG4gICAgdGh1bWJCb3JkZXJSYWRpdXNYWTogJzUwJScsXG4gICAgdGh1bWJDb2xvcjogJyNmZmYnLFxuICAgIHRodW1iU2l6ZTogJzEwcHgnLFxuICAgIHRodW1iU2l6ZVhZOiAnMjBweCcsXG4gICAgdGh1bWJTcGFjZTogJzZweCcsXG4gICAgdHJhY2tCb3JkZXJSYWRpdXM6ICczcHgnLFxuICAgIHRyYWNrQ29sb3I6ICcjY2NjJyxcbiAgICB3aWR0aDogJzIwcHgnLFxufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFN0eWxlcyhzdHlsZXMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGRlZXBtZXJnZShkZWZhdWx0T3B0aW9ucywgc3R5bGVzID8gc3R5bGVzLm9wdGlvbnMgOiB7fSk7XG4gICAgdmFyIHNsaWRlciA9IHtcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICBwYWRkaW5nOiBvcHRpb25zLnBhZGRpbmcsXG4gICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC40cywgd2lkdGggMC40cycsXG4gICAgfTtcbiAgICB2YXIgdHJhY2sgPSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy50cmFja0NvbG9yLFxuICAgICAgICBib3JkZXJSYWRpdXM6IG9wdGlvbnMudHJhY2tCb3JkZXJSYWRpdXMsXG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgfTtcbiAgICB2YXIgcmFuZ2UgPSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5yYW5nZUNvbG9yLFxuICAgICAgICBib3JkZXJSYWRpdXM6IG9wdGlvbnMudHJhY2tCb3JkZXJSYWRpdXMsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIH07XG4gICAgdmFyIHJhaWwgPSB7XG4gICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0LFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjRzLCB3aWR0aCAwLjRzJyxcbiAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGgsXG4gICAgfTtcbiAgICB2YXIgdGh1bWIgPSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy50aHVtYkNvbG9yLFxuICAgICAgICBib3JkZXI6IG9wdGlvbnMudGh1bWJCb3JkZXIsXG4gICAgICAgIGJvcmRlclJhZGl1czogb3B0aW9ucy50aHVtYkJvcmRlclJhZGl1cyxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNHMsIHdpZHRoIDAuNHMnLFxuICAgIH07XG4gICAgdmFyIGRlZmF1bHRTdHlsZXMgPSB7XG4gICAgICAgIHJhaWw6IHJhaWwsXG4gICAgICAgIHJhbmdlWDogX19hc3NpZ24oX19hc3NpZ24oe30sIHJhbmdlKSwgeyBoZWlnaHQ6ICcxMDAlJywgdG9wOiAwIH0pLFxuICAgICAgICByYW5nZVhZOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmFuZ2UpLCB7IGJvdHRvbTogMCB9KSxcbiAgICAgICAgcmFuZ2VZOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmFuZ2UpLCB7IGJvdHRvbTogMCwgbGVmdDogMCwgd2lkdGg6ICcxMDAlJyB9KSxcbiAgICAgICAgc2xpZGVyWDogX19hc3NpZ24oX19hc3NpZ24oe30sIHNsaWRlciksIHsgaGVpZ2h0OiBwYXJzZU51bWJlcihvcHRpb25zLmhlaWdodCkgKyBwYXJzZU51bWJlcihvcHRpb25zLnBhZGRpbmcpICogMiwgd2lkdGg6ICcxMDAlJyB9KSxcbiAgICAgICAgc2xpZGVyWFk6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzbGlkZXIpLCB7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogJzEwMCUnIH0pLFxuICAgICAgICBzbGlkZXJZOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2xpZGVyKSwgeyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6IHBhcnNlTnVtYmVyKG9wdGlvbnMud2lkdGgpICsgcGFyc2VOdW1iZXIob3B0aW9ucy5wYWRkaW5nKSAqIDIgfSksXG4gICAgICAgIHRodW1iWDogX19hc3NpZ24oX19hc3NpZ24oe30sIHRodW1iKSwgeyBoZWlnaHQ6IHBhcnNlTnVtYmVyKG9wdGlvbnMuaGVpZ2h0KSArIHBhcnNlTnVtYmVyKG9wdGlvbnMudGh1bWJTcGFjZSksIGxlZnQ6IC0ocGFyc2VOdW1iZXIob3B0aW9ucy50aHVtYlNpemUpIC8gMiksIHRvcDogLShwYXJzZU51bWJlcihvcHRpb25zLnRodW1iU3BhY2UpIC8gMiksIHdpZHRoOiBvcHRpb25zLnRodW1iU2l6ZSB9KSxcbiAgICAgICAgdGh1bWJYWTogX19hc3NpZ24oX19hc3NpZ24oe30sIHRodW1iKSwgeyBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsIGJvcmRlcjogb3B0aW9ucy50aHVtYkJvcmRlciwgYm9yZGVyUmFkaXVzOiBvcHRpb25zLnRodW1iQm9yZGVyUmFkaXVzWFksIGJvdHRvbTogLShwYXJzZU51bWJlcihvcHRpb25zLnRodW1iU2l6ZVhZKSAvIDIpLCBoZWlnaHQ6IG9wdGlvbnMudGh1bWJTaXplWFksIGxlZnQ6IC0ocGFyc2VOdW1iZXIob3B0aW9ucy50aHVtYlNpemVYWSkgLyAyKSwgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiBvcHRpb25zLnRodW1iU2l6ZVhZIH0pLFxuICAgICAgICB0aHVtYlk6IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aHVtYiksIHsgYm90dG9tOiAtKHBhcnNlTnVtYmVyKG9wdGlvbnMudGh1bWJTaXplKSAvIDIpLCBoZWlnaHQ6IG9wdGlvbnMudGh1bWJTaXplLCBsZWZ0OiAtKHBhcnNlTnVtYmVyKG9wdGlvbnMudGh1bWJTcGFjZSkgLyAyKSwgd2lkdGg6IHBhcnNlTnVtYmVyKG9wdGlvbnMud2lkdGgpICsgcGFyc2VOdW1iZXIob3B0aW9ucy50aHVtYlNwYWNlKSB9KSxcbiAgICAgICAgdHJhY2tYOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdHJhY2spLCB7IGhlaWdodDogb3B0aW9ucy5oZWlnaHQgfSksXG4gICAgICAgIHRyYWNrWFk6IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0cmFjayksIHsgaGVpZ2h0OiAnMTAwJScsIG1pbkhlaWdodDogJzUwcHgnLCB3aWR0aDogJzEwMCUnIH0pLFxuICAgICAgICB0cmFja1k6IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0cmFjayksIHsgaGVpZ2h0OiAnMTAwJScsIG1pbkhlaWdodDogJzUwcHgnLCB3aWR0aDogb3B0aW9ucy53aWR0aCB9KSxcbiAgICB9O1xuICAgIHJldHVybiBkZWVwbWVyZ2UoZGVmYXVsdFN0eWxlcywgc3R5bGVzIHx8IHt9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlcy5qcy5tYXAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBnZXRTdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xuaW1wb3J0IHsgZ2V0QmFzZVByb3BzLCBnZXRDb29yZGluYXRlcywgZ2V0Tm9ybWFsaXplZFZhbHVlLCBnZXRQb3NpdGlvbiwgaXNVbmRlZmluZWQsIHJlbW92ZVByb3BlcnRpZXMsIH0gZnJvbSAnLi91dGlscyc7XG52YXIgUmFuZ2VTbGlkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJhbmdlU2xpZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJhbmdlU2xpZGVyKHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5sYXN0Q29vcmRpbmF0ZXMgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgX3RoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgX3RoaXMuc3RhcnQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgX3RoaXMuZ2V0RHJhZ1Bvc2l0aW9uID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiB4ICsgX3RoaXMuc3RhcnQueCAtIF90aGlzLm9mZnNldC54LFxuICAgICAgICAgICAgICAgIHk6IF90aGlzLm9mZnNldC55ICsgX3RoaXMuc3RhcnQueSAtIHksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy51cGRhdGVPcHRpb25zID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qO1xuICAgICAgICAgICAgdmFyIHggPSBfYS54LCB5ID0gX2EueTtcbiAgICAgICAgICAgIHZhciBfayA9IF90aGlzLCByYWlsID0gX2sucmFpbCwgdHJhY2sgPSBfay50cmFjaztcbiAgICAgICAgICAgIF90aGlzLnN0YXJ0ID0ge1xuICAgICAgICAgICAgICAgIHg6IChfYyA9IChfYiA9IHJhaWwuY3VycmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9mZnNldExlZnQpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IDAsXG4gICAgICAgICAgICAgICAgeTogKChfZSA9IChfZCA9IHRyYWNrLmN1cnJlbnQpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5vZmZzZXRIZWlnaHQpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IDApIC1cbiAgICAgICAgICAgICAgICAgICAgKChfZyA9IChfZiA9IHJhaWwuY3VycmVudCkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLm9mZnNldFRvcCkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogMCkgLVxuICAgICAgICAgICAgICAgICAgICAoKF9qID0gKF9oID0gcmFpbC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gub2Zmc2V0SGVpZ2h0KSAhPT0gbnVsbCAmJiBfaiAhPT0gdm9pZCAwID8gX2ogOiAwKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy5sYXN0Q29vcmRpbmF0ZXMgPSB7IHg6IHgsIHk6IHkgfTtcbiAgICAgICAgICAgIF90aGlzLm9mZnNldCA9IHsgeDogeCwgeTogeSB9O1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy51cGRhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoZ2V0UG9zaXRpb24ocG9zaXRpb24sIF90aGlzLnByb3BzLCBfdGhpcy5zbGlkZXIuY3VycmVudCkpO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVCbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIF90aGlzLmhhbmRsZUtleWRvd24pO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVDbGlja1RyYWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgb25BZnRlckVuZCA9IF90aGlzLnByb3BzLm9uQWZ0ZXJFbmQ7XG4gICAgICAgICAgICB2YXIgaXNEcmFnZ2luZyA9IF90aGlzLnN0YXRlLmlzRHJhZ2dpbmc7XG4gICAgICAgICAgICBpZiAoIWlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gZ2V0Q29vcmRpbmF0ZXMoZXZlbnQsIF90aGlzLmxhc3RDb29yZGluYXRlcyksIHggPSBfYS54LCB5ID0gX2EueTtcbiAgICAgICAgICAgICAgICB2YXIgX2IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBib3R0b20gPSBfYi5ib3R0b20sIGxlZnQgPSBfYi5sZWZ0O1xuICAgICAgICAgICAgICAgIHZhciBuZXh0UG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHggLSBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICB5OiBib3R0b20gLSB5LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgX3RoaXMubGFzdENvb3JkaW5hdGVzID0geyB4OiB4LCB5OiB5IH07XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlUG9zaXRpb24obmV4dFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAob25BZnRlckVuZCkge1xuICAgICAgICAgICAgICAgICAgICBvbkFmdGVyRW5kKGdldFBvc2l0aW9uKG5leHRQb3NpdGlvbiwgX3RoaXMucHJvcHMsIF90aGlzLnNsaWRlci5jdXJyZW50KSwgX3RoaXMucHJvcHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLm1vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGlzRHJhZ2dpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVEcmFnID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXMoZXZlbnQsIF90aGlzLmxhc3RDb29yZGluYXRlcyk7XG4gICAgICAgICAgICBfdGhpcy51cGRhdGVQb3NpdGlvbihfdGhpcy5nZXREcmFnUG9zaXRpb24oY29vcmRpbmF0ZXMpKTtcbiAgICAgICAgICAgIF90aGlzLmxhc3RDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVEcmFnRW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMucHJvcHMsIG9uQWZ0ZXJFbmQgPSBfYS5vbkFmdGVyRW5kLCBvbkRyYWdFbmQgPSBfYS5vbkRyYWdFbmQ7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBnZXRQb3NpdGlvbihfdGhpcy5nZXREcmFnUG9zaXRpb24oZ2V0Q29vcmRpbmF0ZXMoZXZlbnQsIF90aGlzLmxhc3RDb29yZGluYXRlcykpLCBfdGhpcy5wcm9wcywgX3RoaXMuc2xpZGVyLmN1cnJlbnQpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX3RoaXMuaGFuZGxlRHJhZyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgX3RoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBfdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgX3RoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIF90aGlzLmhhbmRsZURyYWdFbmQpO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICAgIGlmIChvbkRyYWdFbmQpIHtcbiAgICAgICAgICAgICAgICBvbkRyYWdFbmQocG9zaXRpb24sIF90aGlzLnByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgICBpZiAob25BZnRlckVuZCkge1xuICAgICAgICAgICAgICAgIG9uQWZ0ZXJFbmQocG9zaXRpb24sIF90aGlzLnByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuaGFuZGxlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgX3RoaXMuaGFuZGxlS2V5ZG93biwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuaGFuZGxlS2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMuc3RhdGUsIGlubmVyWCA9IF9hLngsIGlubmVyWSA9IF9hLnk7XG4gICAgICAgICAgICB2YXIgX2IgPSBfdGhpcy5wcm9wcywgeCA9IF9iLngsIHkgPSBfYi55O1xuICAgICAgICAgICAgdmFyIF9jID0gZ2V0QmFzZVByb3BzKF90aGlzLnByb3BzKSwgYXhpcyA9IF9jLmF4aXMsIHhNYXggPSBfYy54TWF4LCB4TWluID0gX2MueE1pbiwgeFN0ZXAgPSBfYy54U3RlcCwgeU1heCA9IF9jLnlNYXgsIHlNaW4gPSBfYy55TWluLCB5U3RlcCA9IF9jLnlTdGVwO1xuICAgICAgICAgICAgdmFyIGNvZGVzID0geyBkb3duOiAnQXJyb3dEb3duJywgbGVmdDogJ0Fycm93TGVmdCcsIHVwOiAnQXJyb3dVcCcsIHJpZ2h0OiAnQXJyb3dSaWdodCcgfTtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnZhbHVlcyhjb2RlcykuaW5jbHVkZXMoZXZlbnQuY29kZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogaXNVbmRlZmluZWQoeCkgPyBpbm5lclggOiBnZXROb3JtYWxpemVkVmFsdWUoJ3gnLCBfdGhpcy5wcm9wcyksXG4gICAgICAgICAgICAgICAgICAgIHk6IGlzVW5kZWZpbmVkKHkpID8gaW5uZXJZIDogZ2V0Tm9ybWFsaXplZFZhbHVlKCd5JywgX3RoaXMucHJvcHMpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHhNaW51cyA9IHBvc2l0aW9uLnggLSB4U3RlcCA8PSB4TWluID8geE1pbiA6IHBvc2l0aW9uLnggLSB4U3RlcDtcbiAgICAgICAgICAgICAgICB2YXIgeFBsdXMgPSBwb3NpdGlvbi54ICsgeFN0ZXAgPj0geE1heCA/IHhNYXggOiBwb3NpdGlvbi54ICsgeFN0ZXA7XG4gICAgICAgICAgICAgICAgdmFyIHlNaW51cyA9IHBvc2l0aW9uLnkgLSB5U3RlcCA8PSB5TWluID8geU1pbiA6IHBvc2l0aW9uLnkgLSB5U3RlcDtcbiAgICAgICAgICAgICAgICB2YXIgeVBsdXMgPSBwb3NpdGlvbi55ICsgeVN0ZXAgPj0geU1heCA/IHlNYXggOiBwb3NpdGlvbi55ICsgeVN0ZXA7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29kZXMudXA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54ID0geFBsdXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0geVBsdXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvZGVzLmRvd246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54ID0geE1pbnVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSA9IHlNaW51cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29kZXMubGVmdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgPSB5TWludXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54ID0geE1pbnVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb2Rlcy5yaWdodDpcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgPSB5UGx1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggPSB4UGx1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuaGFuZGxlTW91c2VEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlT3B0aW9ucyhnZXRDb29yZGluYXRlcyhldmVudCwgX3RoaXMubGFzdENvb3JkaW5hdGVzKSk7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGlzRHJhZ2dpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBfdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfdGhpcy5oYW5kbGVEcmFnRW5kKTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuaGFuZGxlVG91Y2hTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZU9wdGlvbnMoZ2V0Q29vcmRpbmF0ZXMoZXZlbnQsIF90aGlzLmxhc3RDb29yZGluYXRlcykpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgX3RoaXMuaGFuZGxlRHJhZywgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgX3RoaXMuaGFuZGxlRHJhZ0VuZCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgX3RoaXMuaGFuZGxlRHJhZ0VuZCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuc2xpZGVyID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgICAgIF90aGlzLnJhaWwgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgX3RoaXMudHJhY2sgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHg6IGdldE5vcm1hbGl6ZWRWYWx1ZSgneCcsIHByb3BzKSxcbiAgICAgICAgICAgIHk6IGdldE5vcm1hbGl6ZWRWYWx1ZSgneScsIHByb3BzKSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSYW5nZVNsaWRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IHRydWU7XG4gICAgfTtcbiAgICBSYW5nZVNsaWRlci5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gKF8sIHByZXZpb3VzU3RhdGUpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5zdGF0ZSwgeCA9IF9hLngsIHkgPSBfYS55O1xuICAgICAgICB2YXIgb25DaGFuZ2UgPSB0aGlzLnByb3BzLm9uQ2hhbmdlO1xuICAgICAgICB2YXIgcHJldmlvdXNYID0gcHJldmlvdXNTdGF0ZS54LCBwcmV2aW91c1kgPSBwcmV2aW91c1N0YXRlLnk7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChvbkNoYW5nZSAmJiAoeCAhPT0gcHJldmlvdXNYIHx8IHkgIT09IHByZXZpb3VzWSkpIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHsgeDogeCwgeTogeSB9LCB0aGlzLnByb3BzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmFuZ2VTbGlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5nZVNsaWRlci5wcm90b3R5cGUsIFwicG9zaXRpb25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGdldEJhc2VQcm9wcyh0aGlzLnByb3BzKSwgYXhpcyA9IF9hLmF4aXMsIHhNYXggPSBfYS54TWF4LCB4TWluID0gX2EueE1pbiwgeU1heCA9IF9hLnlNYXgsIHlNaW4gPSBfYS55TWluO1xuICAgICAgICAgICAgdmFyIGJvdHRvbSA9ICgodGhpcy55IC0geU1pbikgLyAoeU1heCAtIHlNaW4pKSAqIDEwMDtcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gKCh0aGlzLnggLSB4TWluKSAvICh4TWF4IC0geE1pbikpICogMTAwO1xuICAgICAgICAgICAgaWYgKGJvdHRvbSA+IDEwMCkge1xuICAgICAgICAgICAgICAgIGJvdHRvbSA9IDEwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChib3R0b20gPCAwKSB7XG4gICAgICAgICAgICAgICAgYm90dG9tID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJvdHRvbSBzaG91bGRuJ3QgYmUgc2V0IHdpdGggWCBheGlzXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICAgICAgICAgIGJvdHRvbSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVmdCA+IDEwMCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVmdCA8IDApIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGxlZnQgc2hvdWxkbid0IGJlIHNldCB3aXRoIFkgYXhpc1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICAgIGlmIChheGlzID09PSAneScpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHg6IGxlZnQsIHk6IGJvdHRvbSB9O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmdlU2xpZGVyLnByb3RvdHlwZSwgXCJzdHlsZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnByb3BzLnN0eWxlcztcbiAgICAgICAgICAgIHJldHVybiBnZXRTdHlsZXMoc3R5bGVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5nZVNsaWRlci5wcm90b3R5cGUsIFwieFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlubmVyWCA9IHRoaXMuc3RhdGUueDtcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5wcm9wcy54O1xuICAgICAgICAgICAgcmV0dXJuIGlzVW5kZWZpbmVkKHgpID8gaW5uZXJYIDogeDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5nZVNsaWRlci5wcm90b3R5cGUsIFwieVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlubmVyWSA9IHRoaXMuc3RhdGUueTtcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5wcm9wcy55O1xuICAgICAgICAgICAgcmV0dXJuIGlzVW5kZWZpbmVkKHkpID8gaW5uZXJZIDogeTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFJhbmdlU2xpZGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMucHJvcHMsIGF4aXMgPSBfYS5heGlzLCBjbGFzc05hbWUgPSBfYS5jbGFzc05hbWUsIHhNYXggPSBfYS54TWF4LCB4TWluID0gX2EueE1pbiwgeU1heCA9IF9hLnlNYXgsIHlNaW4gPSBfYS55TWluO1xuICAgICAgICB2YXIgcmVzdCA9IHJlbW92ZVByb3BlcnRpZXModGhpcy5wcm9wcywgJ2F4aXMnLCAnY2xhc3NOYW1lJywgJ29uQWZ0ZXJFbmQnLCAnb25DaGFuZ2UnLCAnb25EcmFnRW5kJywgJ3N0eWxlcycsICd4JywgJ3hNaW4nLCAneE1heCcsICd4U3RlcCcsICd5JywgJ3lNaW4nLCAneU1heCcsICd5U3RlcCcpO1xuICAgICAgICB2YXIgX2IgPSB0aGlzLnBvc2l0aW9uLCB4UG9zID0gX2IueCwgeVBvcyA9IF9iLnk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHsgbGVmdDogXCJcIi5jb25jYXQoeFBvcywgXCIlXCIpLCBib3R0b206IFwiXCIuY29uY2F0KHlQb3MsIFwiJVwiKSB9O1xuICAgICAgICB2YXIgc2l6ZSA9IHt9O1xuICAgICAgICB2YXIgb3JpZW50YXRpb247XG4gICAgICAgIHZhciByYW5nZTtcbiAgICAgICAgdmFyIHNsaWRlcjtcbiAgICAgICAgdmFyIHRodW1iO1xuICAgICAgICB2YXIgdHJhY2s7XG4gICAgICAgIHZhciB2YWx1ZW1heCA9IHhNYXg7XG4gICAgICAgIHZhciB2YWx1ZW1pbiA9IHhNaW47XG4gICAgICAgIHZhciB2YWx1ZW5vdyA9IHRoaXMueDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICAgICAgc2l6ZS53aWR0aCA9IFwiXCIuY29uY2F0KHhQb3MsIFwiJVwiKTtcbiAgICAgICAgICAgIHNsaWRlciA9IHRoaXMuc3R5bGVzLnNsaWRlclg7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgICAgIHJhbmdlID0gdGhpcy5zdHlsZXMucmFuZ2VYO1xuICAgICAgICAgICAgdHJhY2sgPSB0aGlzLnN0eWxlcy50cmFja1g7XG4gICAgICAgICAgICB0aHVtYiA9IHRoaXMuc3R5bGVzLnRodW1iWDtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICBzaXplLmhlaWdodCA9IFwiXCIuY29uY2F0KHlQb3MsIFwiJVwiKTtcbiAgICAgICAgICAgIHNsaWRlciA9IHRoaXMuc3R5bGVzLnNsaWRlclk7XG4gICAgICAgICAgICByYW5nZSA9IHRoaXMuc3R5bGVzLnJhbmdlWTtcbiAgICAgICAgICAgIHRyYWNrID0gdGhpcy5zdHlsZXMudHJhY2tZO1xuICAgICAgICAgICAgdGh1bWIgPSB0aGlzLnN0eWxlcy50aHVtYlk7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICAgICAgICB2YWx1ZW1heCA9IHlNYXg7XG4gICAgICAgICAgICB2YWx1ZW1pbiA9IHlNaW47XG4gICAgICAgICAgICB2YWx1ZW5vdyA9IHRoaXMueTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoYXhpcyA9PT0gJ3h5Jykge1xuICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBcIlwiLmNvbmNhdCh5UG9zLCBcIiVcIik7XG4gICAgICAgICAgICBzaXplLndpZHRoID0gXCJcIi5jb25jYXQoeFBvcywgXCIlXCIpO1xuICAgICAgICAgICAgc2xpZGVyID0gdGhpcy5zdHlsZXMuc2xpZGVyWFk7XG4gICAgICAgICAgICByYW5nZSA9IHRoaXMuc3R5bGVzLnJhbmdlWFk7XG4gICAgICAgICAgICB0cmFjayA9IHRoaXMuc3R5bGVzLnRyYWNrWFk7XG4gICAgICAgICAgICB0aHVtYiA9IHRoaXMuc3R5bGVzLnRodW1iWFk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9fYXNzaWduKHsgcmVmOiB0aGlzLnNsaWRlciwgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHN0eWxlOiBzbGlkZXIgfSwgcmVzdCksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiB0aGlzLnRyYWNrLCBjbGFzc05hbWU6IGNsYXNzTmFtZSAmJiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX190cmFja1wiKSwgb25DbGljazogdGhpcy5oYW5kbGVDbGlja1RyYWNrLCByb2xlOiBcInByZXNlbnRhdGlvblwiLCBcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIFdlIGNhbid0IHVzZSBSZWFjdCdzIGV2ZW50cyBiZWNhdXNlIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICBzdHlsZTogdHJhY2sgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgJiYgXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9fcmFuZ2VcIiksIHN0eWxlOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2l6ZSksIHJhbmdlKSB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiB0aGlzLnJhaWwsIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU1vdXNlRG93biwgb25Ub3VjaFN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsIFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIFdlIGNhbid0IHVzZSBSZWFjdCdzIGV2ZW50cyBiZWNhdXNlIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogXCJwcmVzZW50YXRpb25cIiwgXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgV2UgY2FuJ3QgdXNlIFJlYWN0J3MgZXZlbnRzIGJlY2F1c2UgdGhlIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuc3R5bGVzLnJhaWwpLCBwb3NpdGlvbikgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBcImFyaWEtbGFiZWxcIjogXCJzbGlkZXIgaGFuZGxlXCIsIFwiYXJpYS1vcmllbnRhdGlvblwiOiBvcmllbnRhdGlvbiwgXCJhcmlhLXZhbHVlbWF4XCI6IHZhbHVlbWF4LCBcImFyaWEtdmFsdWVtaW5cIjogdmFsdWVtaW4sIFwiYXJpYS12YWx1ZW5vd1wiOiB2YWx1ZW5vdywgY2xhc3NOYW1lOiBjbGFzc05hbWUgJiYgXCJcIi5jb25jYXQoY2xhc3NOYW1lLCBcIl9fdGh1bWJcIiksIG9uQmx1cjogdGhpcy5oYW5kbGVCbHVyLCBvbkZvY3VzOiB0aGlzLmhhbmRsZUZvY3VzLCByb2xlOiBcInNsaWRlclwiLCBzdHlsZTogdGh1bWIsIHRhYkluZGV4OiAwIH0pKSkpKTtcbiAgICB9O1xuICAgIFJhbmdlU2xpZGVyLmRlZmF1bHRQcm9wcyA9IGdldEJhc2VQcm9wcygpO1xuICAgIHJldHVybiBSYW5nZVNsaWRlcjtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbmV4cG9ydCBkZWZhdWx0IFJhbmdlU2xpZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IGNvbnN0IEhTTEtleXMgPSBbJ2gnLCAncycsICdsJ107XG5leHBvcnQgY29uc3QgUkdCS2V5cyA9IFsncicsICdnJywgJ2InXTtcbi8qKlxuICogQ29uc3RyYWluIHZhbHVlIGludG8gdGhlIHJhbmdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJhaW4oaW5wdXQsIGFtb3VudCwgcmFuZ2UsIHNpZ24pIHtcbiAgICBpbnZhcmlhbnQoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCwgJ0FsbCBwYXJhbWV0ZXJzIGFyZSByZXF1aXJlZCcpO1xuICAgIGNvbnN0IFttaW4sIG1heF0gPSByYW5nZTtcbiAgICBsZXQgdmFsdWUgPSBleHByKGlucHV0ICsgc2lnbiArIGFtb3VudCk7XG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XG4gICAgICAgIHZhbHVlID0gbWluO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZSA+IG1heCkge1xuICAgICAgICB2YWx1ZSA9IG1heDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlKTtcbn1cbi8qKlxuICogQ29uc3RyYWluIGFuIGFuZ2xlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJhaW5EZWdyZWVzKGlucHV0LCBhbW91bnQpIHtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIoaW5wdXQpLCAnaW5wdXQgaXMgcmVxdWlyZWQnKTtcbiAgICBsZXQgdmFsdWUgPSBpbnB1dCArIGFtb3VudDtcbiAgICBpZiAodmFsdWUgPiAzNjApIHtcbiAgICAgICAgdmFsdWUgJT0gMzYwO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgIHZhbHVlICs9IDM2MDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlKTtcbn1cbi8qKlxuICogUGFyc2UgbWF0aCBzdHJpbmcgZXhwcmVzc2lvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cHIoaW5wdXQpIHtcbiAgICBjb25zdCBjaGFycyA9IFsuLi5pbnB1dF07XG4gICAgY29uc3QgbiA9IFtdO1xuICAgIGNvbnN0IG9wID0gW107XG4gICAgbGV0IHBhcnNlZDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGxldCBsYXN0ID0gdHJ1ZTtcbiAgICBuW2luZGV4XSA9ICcnO1xuICAgIC8vIFBhcnNlIHRoZSBzdHJpbmdcbiAgICBmb3IgKGNvbnN0IGNoYXIgb2YgY2hhcnMpIHtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihwYXJzZUludChjaGFyLCAxMCkpICYmIGNoYXIgIT09ICcuJyAmJiAhbGFzdCkge1xuICAgICAgICAgICAgb3BbaW5kZXhdID0gY2hhcjtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBuW2luZGV4XSA9ICcnO1xuICAgICAgICAgICAgbGFzdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuW2luZGV4XSArPSBjaGFyO1xuICAgICAgICAgICAgbGFzdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZXhwcmVzc2lvblxuICAgIHBhcnNlZCA9IHBhcnNlRmxvYXQoblswXSk7XG4gICAgZm9yIChjb25zdCBbbywgZWxlbWVudF0gb2Ygb3AuZW50cmllcygpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdChuW28gKyAxXSk7XG4gICAgICAgIHN3aXRjaCAoZWxlbWVudCkge1xuICAgICAgICAgICAgY2FzZSAnKyc6XG4gICAgICAgICAgICAgICAgcGFyc2VkICs9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICAgICAgcGFyc2VkIC09IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnKic6XG4gICAgICAgICAgICAgICAgcGFyc2VkICo9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICAgICAgcGFyc2VkIC89IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGVycm9yO1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgZXJyb3IubmFtZSA9ICdjb2xvcml6cic7XG4gICAgdGhyb3cgZXJyb3I7XG59XG4vKipcbiAqIENoZWNrIGlmIGFuIG9iamVjdCBjb250YWlucyBIU0wgdmFsdWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0hTTChpbnB1dCkge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChpbnB1dCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoaW5wdXQpO1xuICAgIHJldHVybiAoISFlbnRyaWVzLmxlbmd0aCAmJlxuICAgICAgICBlbnRyaWVzLmV2ZXJ5KChba2V5LCB2YWx1ZV0pID0+IEhTTEtleXMuaW5jbHVkZXMoa2V5KSAmJiB2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IChrZXkgPT09ICdoJyA/IDM2MCA6IDEwMCkpKTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGlucHV0IGlzIGEgbnVtYmVyIGFuZCBub3QgTmFOXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihpbnB1dCkge1xuICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInICYmICFOdW1iZXIuaXNOYU4oaW5wdXQpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB0aGUgaW5wdXQgaXMgYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KGlucHV0KSB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGU7XG4gICAgY29uc3QgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGlucHV0KTtcbiAgICByZXR1cm4gKHRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBPYmplY3RdJyAmJlxuICAgICAgICAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KSkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiBhbiBvYmplY3QgY29udGFpbnMgUkdCIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUkdCKGlucHV0KSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhpbnB1dCk7XG4gICAgcmV0dXJuICghIWVudHJpZXMubGVuZ3RoICYmXG4gICAgICAgIGVudHJpZXMuZXZlcnkoKFtrZXksIHZhbHVlXSkgPT4gUkdCS2V5cy5pbmNsdWRlcyhrZXkpICYmIHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMjU1KSk7XG59XG4vKipcbiAqIENoZWNrIGlmIGFuIGFycmF5IGNvbnRhaW5zIFJHQiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JHQkFycmF5KGlucHV0KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpICYmIGlucHV0Lmxlbmd0aCA9PT0gMyAmJiBpbnB1dC5ldmVyeShkID0+IGQgPj0gMCAmJiBkIDw9IDI1NSk7XG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSBpbnB1dCBpcyBhIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcoaW5wdXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogTGltaXQgdmFsdWVzIHBlciB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGltaXQoaW5wdXQsIHR5cGUpIHtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIoaW5wdXQpLCAnSW5wdXQgaXMgbm90IGEgbnVtYmVyJyk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoUkdCS2V5cy5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oaW5wdXQsIDI1NSksIDApO1xuICAgIH1cbiAgICBpZiAoWydzJywgJ2wnXS5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oaW5wdXQsIDEwMCksIDApO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2gnKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihpbnB1dCwgMzYwKSwgMCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0eXBlJyk7XG59XG5leHBvcnQgY29uc3QgbWVzc2FnZXMgPSB7XG4gICAgYW1vdW50OiAnYW1vdW50IG11c3QgYmUgYSBudW1iZXInLFxuICAgIGxlZnQ6ICdsZWZ0IGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGEgc3RyaW5nJyxcbiAgICByaWdodDogJ3JpZ2h0IGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGEgc3RyaW5nJyxcbiAgICBpbnB1dDogJ2lucHV0IGlzIHJlcXVpcmVkJyxcbiAgICBpbnB1dFN0cmluZzogJ2lucHV0IGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGEgc3RyaW5nJyxcbiAgICBpbnZhbGlkOiAnaW52YWxpZCBpbnB1dCcsXG4gICAgb3B0aW9uczogJ2ludmFsaWQgb3B0aW9ucycsXG59O1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGUgcGlja2VkIHNvdXJjZSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGljayhpbnB1dCwgb3B0aW9ucykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgICAgICAgLmZpbHRlcihkID0+IHR5cGVvZiBpbnB1dFtkXSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgZCkgPT4ge1xuICAgICAgICBhY2NbZF0gPSBpbnB1dFtkXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vKipcbiAqIFJvdW5kIGRlY2ltYWwgbnVtYmVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKGlucHV0LCBkaWdpdHMgPSAyKSB7XG4gICAgY29uc3QgZmFjdG9yID0gMTAgKiogZGlnaXRzO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGlucHV0ICogZmFjdG9yKSAvIGZhY3Rvcjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCIsImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVmFsaWRIZXgoaW5wdXQsIGFscGhhID0gdHJ1ZSkge1xuICAgIGlmICghaXNTdHJpbmcoaW5wdXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGFscGhhKSB7XG4gICAgICAgIHJldHVybiAvXiMoW1xcZGEtZl17Myw0fXxbXFxkYS1mXXs2LDh9KSQvaS50ZXN0KGlucHV0KTtcbiAgICB9XG4gICAgcmV0dXJuIC9eIyhbXFxkYS1mXXszfXxbXFxkYS1mXXs2fSkkL2kudGVzdChpbnB1dCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pcy12YWxpZC1oZXguanMubWFwIiwiaW1wb3J0IGlzVmFsaWRIZXggZnJvbSAnLi9pcy12YWxpZC1oZXgnO1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc1N0cmluZywgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0SGV4KGlucHV0KSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGlucHV0KSwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIGNvbnN0IGNvbG9yID0gaW5wdXQucmVwbGFjZSgnIycsICcnKTtcbiAgICBsZXQgaGV4ID0gY29sb3I7XG4gICAgaWYgKGNvbG9yLmxlbmd0aCA9PT0gMyB8fCBjb2xvci5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgaGV4ID0gJyc7XG4gICAgICAgIFsuLi5jb2xvcl0uZm9yRWFjaChkID0+IHtcbiAgICAgICAgICAgIGhleCArPSBkICsgZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhleCA9IGAjJHtoZXh9YDtcbiAgICBpbnZhcmlhbnQoaXNWYWxpZEhleChoZXgpLCAnaW52YWxpZCBoZXgnKTtcbiAgICByZXR1cm4gaGV4O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ybWF0LWhleC5qcy5tYXAiLCJpbXBvcnQgZm9ybWF0SGV4IGZyb20gJy4vZm9ybWF0LWhleCc7XG5pbXBvcnQgeyBpbnZhcmlhbnQsIGlzU3RyaW5nLCBtZXNzYWdlcyB9IGZyb20gJy4vbW9kdWxlcy91dGlscyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZXgycmdiKGlucHV0KSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGlucHV0KSwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIGNvbnN0IGhleCA9IGZvcm1hdEhleChpbnB1dCkuc3Vic3RyKDEpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHI6IHBhcnNlSW50KFN0cmluZyhoZXguY2hhckF0KDApKSArIGhleC5jaGFyQXQoMSksIDE2KSxcbiAgICAgICAgZzogcGFyc2VJbnQoU3RyaW5nKGhleC5jaGFyQXQoMikpICsgaGV4LmNoYXJBdCgzKSwgMTYpLFxuICAgICAgICBiOiBwYXJzZUludChTdHJpbmcoaGV4LmNoYXJBdCg0KSkgKyBoZXguY2hhckF0KDUpLCAxNiksXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhleDJyZ2IuanMubWFwIiwiaW1wb3J0IHsgaW52YXJpYW50LCBpc1JHQiwgbGltaXQsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJnYjJoc2woaW5wdXQpIHtcbiAgICBpbnZhcmlhbnQoISFpbnB1dCwgbWVzc2FnZXMuaW5wdXQpO1xuICAgIGxldCByZ2IgPSBpbnB1dDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgcmdiID0geyByOiBpbnB1dFswXSwgZzogaW5wdXRbMV0sIGI6IGlucHV0WzJdIH07XG4gICAgfVxuICAgIGludmFyaWFudChpc1JHQihyZ2IpLCBtZXNzYWdlcy5pbnZhbGlkKTtcbiAgICBjb25zdCByTGltaXQgPSBsaW1pdChyZ2IuciwgJ3InKSAvIDI1NTtcbiAgICBjb25zdCBnTGltaXQgPSBsaW1pdChyZ2IuZywgJ2cnKSAvIDI1NTtcbiAgICBjb25zdCBiTGltaXQgPSBsaW1pdChyZ2IuYiwgJ2InKSAvIDI1NTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihyTGltaXQsIGdMaW1pdCwgYkxpbWl0KTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heChyTGltaXQsIGdMaW1pdCwgYkxpbWl0KTtcbiAgICBjb25zdCBkZWx0YSA9IG1heCAtIG1pbjtcbiAgICBsZXQgaCA9IDA7XG4gICAgbGV0IHM7XG4gICAgY29uc3QgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBsZXQgcmF0ZTtcbiAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHJMaW1pdDpcbiAgICAgICAgICAgIHJhdGUgPSAhZGVsdGEgPyAwIDogKGdMaW1pdCAtIGJMaW1pdCkgLyBkZWx0YTtcbiAgICAgICAgICAgIGggPSA2MCAqIHJhdGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBnTGltaXQ6XG4gICAgICAgICAgICByYXRlID0gKGJMaW1pdCAtIHJMaW1pdCkgLyBkZWx0YTtcbiAgICAgICAgICAgIGggPSA2MCAqIHJhdGUgKyAxMjA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBiTGltaXQ6XG4gICAgICAgICAgICByYXRlID0gKHJMaW1pdCAtIGdMaW1pdCkgLyBkZWx0YTtcbiAgICAgICAgICAgIGggPSA2MCAqIHJhdGUgKyAyNDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCA9IDM2MCArIGg7XG4gICAgfVxuICAgIGlmIChtaW4gPT09IG1heCkge1xuICAgICAgICBzID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHMgPSBsIDwgMC41ID8gZGVsdGEgLyAoMiAqIGwpIDogZGVsdGEgLyAoMiAtIDIgKiBsKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaDogTWF0aC5hYnMoKyhoICUgMzYwKS50b0ZpeGVkKDIpKSxcbiAgICAgICAgczogKyhzICogMTAwKS50b0ZpeGVkKDIpLFxuICAgICAgICBsOiArKGwgKiAxMDApLnRvRml4ZWQoMiksXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJnYjJoc2wuanMubWFwIiwiaW1wb3J0IGhleDJyZ2IgZnJvbSAnLi9oZXgycmdiJztcbmltcG9ydCB7IGludmFyaWFudCwgaXNTdHJpbmcsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCByZ2IyaHNsIGZyb20gJy4vcmdiMmhzbCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZXgyaHNsKGlucHV0KSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGlucHV0KSwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIHJldHVybiByZ2IyaHNsKGhleDJyZ2IoaW5wdXQpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhleDJoc2wuanMubWFwIiwiaW1wb3J0IHsgaW52YXJpYW50LCBpc051bWJlciwgcm91bmQgfSBmcm9tICcuL3V0aWxzJztcbi8qKlxuICogQ29udmVydCBodWUgdG8gUkdCIHVzaW5nIGNocm9tYSBhbmQgbWVkaWFuIHBvaW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh1ZTJyZ2IocG9pbnQsIGNocm9tYSwgaCkge1xuICAgIGludmFyaWFudChpc051bWJlcihwb2ludCkgJiYgaXNOdW1iZXIoY2hyb21hKSAmJiBpc051bWJlcihoKSwgJ3BvaW50LCBjaHJvbWEgYW5kIGggYXJlIHJlcXVpcmVkJyk7XG4gICAgbGV0IGh1ZSA9IGg7XG4gICAgaWYgKGh1ZSA8IDApIHtcbiAgICAgICAgaHVlICs9IDE7XG4gICAgfVxuICAgIGlmIChodWUgPiAxKSB7XG4gICAgICAgIGh1ZSAtPSAxO1xuICAgIH1cbiAgICBpZiAoaHVlIDwgMSAvIDYpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kKHBvaW50ICsgKGNocm9tYSAtIHBvaW50KSAqIDYgKiBodWUsIDQpO1xuICAgIH1cbiAgICBpZiAoaHVlIDwgMSAvIDIpIHtcbiAgICAgICAgcmV0dXJuIHJvdW5kKGNocm9tYSwgNCk7XG4gICAgfVxuICAgIGlmIChodWUgPCAyIC8gMykge1xuICAgICAgICByZXR1cm4gcm91bmQocG9pbnQgKyAoY2hyb21hIC0gcG9pbnQpICogKDIgLyAzIC0gaHVlKSAqIDYsIDQpO1xuICAgIH1cbiAgICByZXR1cm4gcm91bmQocG9pbnQsIDQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHVlMnJnYi5qcy5tYXAiLCJpbXBvcnQgaHVlMnJnYiBmcm9tICcuL21vZHVsZXMvaHVlMnJnYic7XG5pbXBvcnQgeyBpbnZhcmlhbnQsIGlzSFNMLCBtZXNzYWdlcywgcm91bmQgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuLyoqXG4gKiBDb252ZXJ0IGFuIEhTTCBvYmplY3QgdG8gUkdCLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoc2wycmdiKGlucHV0KSB7XG4gICAgaW52YXJpYW50KCEhaW5wdXQsIG1lc3NhZ2VzLmlucHV0U3RyaW5nKTtcbiAgICBpbnZhcmlhbnQoaXNIU0woaW5wdXQpLCAnaW52YWxpZCBpbnB1dCcpO1xuICAgIGNvbnN0IGggPSByb3VuZChpbnB1dC5oKSAvIDM2MDtcbiAgICBjb25zdCBzID0gcm91bmQoaW5wdXQucykgLyAxMDA7XG4gICAgY29uc3QgbCA9IHJvdW5kKGlucHV0LmwpIC8gMTAwO1xuICAgIGxldCByO1xuICAgIGxldCBnO1xuICAgIGxldCBiO1xuICAgIGxldCBwb2ludDtcbiAgICBsZXQgY2hyb21hO1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgIHIgPSBsO1xuICAgICAgICBnID0gbDtcbiAgICAgICAgYiA9IGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjaHJvbWEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgICBwb2ludCA9IDIgKiBsIC0gY2hyb21hO1xuICAgICAgICByID0gaHVlMnJnYihwb2ludCwgY2hyb21hLCBoICsgMSAvIDMpO1xuICAgICAgICBnID0gaHVlMnJnYihwb2ludCwgY2hyb21hLCBoKTtcbiAgICAgICAgYiA9IGh1ZTJyZ2IocG9pbnQsIGNocm9tYSwgaCAtIDEgLyAzKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogTWF0aC5yb3VuZChyICogMjU1KSxcbiAgICAgICAgZzogTWF0aC5yb3VuZChnICogMjU1KSxcbiAgICAgICAgYjogTWF0aC5yb3VuZChiICogMjU1KSxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHNsMnJnYi5qcy5tYXAiLCJpbXBvcnQgeyBpbnZhcmlhbnQsIGlzUkdCLCBpc1JHQkFycmF5LCBtZXNzYWdlcyB9IGZyb20gJy4vbW9kdWxlcy91dGlscyc7XG4vKipcbiAqIENvbnZlcnQgYW4gUkdBIG9iamVjdCB0byBoZXguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJnYjJoZXgoaW5wdXQpIHtcbiAgICBpbnZhcmlhbnQoISFpbnB1dCwgbWVzc2FnZXMuaW5wdXQpO1xuICAgIGludmFyaWFudChpc1JHQkFycmF5KGlucHV0KSB8fCBpc1JHQihpbnB1dCksIG1lc3NhZ2VzLmludmFsaWQpO1xuICAgIGxldCByO1xuICAgIGxldCBnO1xuICAgIGxldCBiO1xuICAgIGlmIChpc1JHQkFycmF5KGlucHV0KSkge1xuICAgICAgICBbciwgZywgYl0gPSBpbnB1dDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICh7IHIsIGcsIGIgfSA9IGlucHV0KTtcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gW3IudG9TdHJpbmcoMTYpLCBnLnRvU3RyaW5nKDE2KSwgYi50b1N0cmluZygxNildO1xuICAgIHJldHVybiBgIyR7b3V0cHV0Lm1hcChkID0+IChkLmxlbmd0aCA9PT0gMSA/IGAwJHtkfWAgOiBkKSkuam9pbignJyl9YDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJnYjJoZXguanMubWFwIiwiaW1wb3J0IGhzbDJyZ2IgZnJvbSAnLi9oc2wycmdiJztcbmltcG9ydCB7IGludmFyaWFudCwgaXNIU0wsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCByZ2IyaGV4IGZyb20gJy4vcmdiMmhleCc7XG4vKipcbiAqIENvbnZlcnQgYSBIU0wgb2JqZWN0IHRvIEhFWC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHNsMmhleChpbnB1dCkge1xuICAgIGludmFyaWFudChpc0hTTChpbnB1dCksIG1lc3NhZ2VzLmludmFsaWQpO1xuICAgIHJldHVybiByZ2IyaGV4KGhzbDJyZ2IoaW5wdXQpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhzbDJoZXguanMubWFwIiwiLyoqXG4gKiBDU1MgbmFtZWQgY29sb3JzXG4gKi9cbmV4cG9ydCBjb25zdCBjc3NDb2xvcnMgPSB7XG4gICAgYWxpY2VibHVlOiAnI2YwZjhmZicsXG4gICAgYW50aXF1ZXdoaXRlOiAnI2ZhZWJkNycsXG4gICAgYXF1YTogJyMwMGZmZmYnLFxuICAgIGFxdWFtYXJpbmU6ICcjN2ZmZmQ0JyxcbiAgICBhenVyZTogJyNmMGZmZmYnLFxuICAgIGJlaWdlOiAnI2Y1ZjVkYycsXG4gICAgYmlzcXVlOiAnI2ZmZTRjNCcsXG4gICAgYmxhY2s6ICcjMDAwMDAwJyxcbiAgICBibGFuY2hlZGFsbW9uZDogJyNmZmViY2QnLFxuICAgIGJsdWU6ICcjMDAwMGZmJyxcbiAgICBibHVldmlvbGV0OiAnIzhhMmJlMicsXG4gICAgYnJvd246ICcjYTUyYTJhJyxcbiAgICBidXJseXdvb2Q6ICcjZGViODg3JyxcbiAgICBjYWRldGJsdWU6ICcjNWY5ZWEwJyxcbiAgICBjaGFydHJldXNlOiAnIzdmZmYwMCcsXG4gICAgY2hvY29sYXRlOiAnI2QyNjkxZScsXG4gICAgY29yYWw6ICcjZmY3ZjUwJyxcbiAgICBjb3JuZmxvd2VyYmx1ZTogJyM2NDk1ZWQnLFxuICAgIGNvcm5zaWxrOiAnI2ZmZjhkYycsXG4gICAgY3JpbXNvbjogJyNkYzE0M2MnLFxuICAgIGN5YW46ICcjMDBmZmZmJyxcbiAgICBkYXJrYmx1ZTogJyMwMDAwOGInLFxuICAgIGRhcmtjeWFuOiAnIzAwOGI4YicsXG4gICAgZGFya2dvbGRlbnJvZDogJyNiODg2MGInLFxuICAgIGRhcmtncmF5OiAnI2E5YTlhOScsXG4gICAgZGFya2dyZXk6ICcjYTlhOWE5JyxcbiAgICBkYXJrZ3JlZW46ICcjMDA2NDAwJyxcbiAgICBkYXJra2hha2k6ICcjYmRiNzZiJyxcbiAgICBkYXJrbWFnZW50YTogJyM4YjAwOGInLFxuICAgIGRhcmtvbGl2ZWdyZWVuOiAnIzU1NmIyZicsXG4gICAgZGFya29yYW5nZTogJyNmZjhjMDAnLFxuICAgIGRhcmtvcmNoaWQ6ICcjOTkzMmNjJyxcbiAgICBkYXJrcmVkOiAnIzhiMDAwMCcsXG4gICAgZGFya3NhbG1vbjogJyNlOTk2N2EnLFxuICAgIGRhcmtzZWFncmVlbjogJyM4ZmJjOGYnLFxuICAgIGRhcmtzbGF0ZWJsdWU6ICcjNDgzZDhiJyxcbiAgICBkYXJrc2xhdGVncmF5OiAnIzJmNGY0ZicsXG4gICAgZGFya3NsYXRlZ3JleTogJyMyZjRmNGYnLFxuICAgIGRhcmt0dXJxdW9pc2U6ICcjMDBjZWQxJyxcbiAgICBkYXJrdmlvbGV0OiAnIzk0MDBkMycsXG4gICAgZGVlcHBpbms6ICcjZmYxNDkzJyxcbiAgICBkZWVwc2t5Ymx1ZTogJyMwMGJmZmYnLFxuICAgIGRpbWdyYXk6ICcjNjk2OTY5JyxcbiAgICBkaW1ncmV5OiAnIzY5Njk2OScsXG4gICAgZG9kZ2VyYmx1ZTogJyMxZTkwZmYnLFxuICAgIGZpcmVicmljazogJyNiMjIyMjInLFxuICAgIGZsb3JhbHdoaXRlOiAnI2ZmZmFmMCcsXG4gICAgZm9yZXN0Z3JlZW46ICcjMjI4YjIyJyxcbiAgICBmdWNoc2lhOiAnI2ZmMDBmZicsXG4gICAgZ2FpbnNib3JvOiAnI2RjZGNkYycsXG4gICAgZ2hvc3R3aGl0ZTogJyNmOGY4ZmYnLFxuICAgIGdvbGQ6ICcjZmZkNzAwJyxcbiAgICBnb2xkZW5yb2Q6ICcjZGFhNTIwJyxcbiAgICBncmF5OiAnIzgwODA4MCcsXG4gICAgZ3JleTogJyM4MDgwODAnLFxuICAgIGdyZWVuOiAnIzAwODAwMCcsXG4gICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICBob25leWRldzogJyNmMGZmZjAnLFxuICAgIGhvdHBpbms6ICcjZmY2OWI0JyxcbiAgICBpbmRpYW5yZWQ6ICcjY2Q1YzVjJyxcbiAgICBpbmRpZ286ICcjNGIwMDgyJyxcbiAgICBpdm9yeTogJyNmZmZmZjAnLFxuICAgIGtoYWtpOiAnI2YwZTY4YycsXG4gICAgbGF2ZW5kZXI6ICcjZTZlNmZhJyxcbiAgICBsYXZlbmRlcmJsdXNoOiAnI2ZmZjBmNScsXG4gICAgbGF3bmdyZWVuOiAnIzdjZmMwMCcsXG4gICAgbGVtb25jaGlmZm9uOiAnI2ZmZmFjZCcsXG4gICAgbGlnaHRibHVlOiAnI2FkZDhlNicsXG4gICAgbGlnaHRjb3JhbDogJyNmMDgwODAnLFxuICAgIGxpZ2h0Y3lhbjogJyNlMGZmZmYnLFxuICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiAnI0ZBRkFEMicsXG4gICAgbGlnaHRncmF5OiAnI2QzZDNkMycsXG4gICAgbGlnaHRncmV5OiAnI2QzZDNkMycsXG4gICAgbGlnaHRncmVlbjogJyM5MGVlOTAnLFxuICAgIGxpZ2h0cGluazogJyNmZmI2YzEnLFxuICAgIGxpZ2h0c2FsbW9uOiAnI2ZmYTA3YScsXG4gICAgbGlnaHRzZWFncmVlbjogJyMyMGIyYWEnLFxuICAgIGxpZ2h0c2t5Ymx1ZTogJyM4N2NlZmEnLFxuICAgIGxpZ2h0c2xhdGVncmF5OiAnIzc3ODg5OScsXG4gICAgbGlnaHRzbGF0ZWdyZXk6ICcjNzc4ODk5JyxcbiAgICBsaWdodHN0ZWVsYmx1ZTogJyNiMGM0ZGUnLFxuICAgIGxpZ2h0eWVsbG93OiAnI2ZmZmZlMCcsXG4gICAgbGltZTogJyMwMGZmMDAnLFxuICAgIGxpbWVncmVlbjogJyMzMmNkMzInLFxuICAgIGxpbmVuOiAnI2ZhZjBlNicsXG4gICAgbWFnZW50YTogJyNmZjAwZmYnLFxuICAgIG1hcm9vbjogJyM4MDAwMDAnLFxuICAgIG1lZGl1bWFxdWFtYXJpbmU6ICcjNjZjZGFhJyxcbiAgICBtZWRpdW1ibHVlOiAnIzAwMDBjZCcsXG4gICAgbWVkaXVtb3JjaGlkOiAnI2JhNTVkMycsXG4gICAgbWVkaXVtcHVycGxlOiAnIzkzNzBkOCcsXG4gICAgbWVkaXVtc2VhZ3JlZW46ICcjM2NiMzcxJyxcbiAgICBtZWRpdW1zbGF0ZWJsdWU6ICcjN2I2OGVlJyxcbiAgICBtZWRpdW1zcHJpbmdncmVlbjogJyMwMGZhOWEnLFxuICAgIG1lZGl1bXR1cnF1b2lzZTogJyM0OGQxY2MnLFxuICAgIG1lZGl1bXZpb2xldHJlZDogJyNjNzE1ODUnLFxuICAgIG1pZG5pZ2h0Ymx1ZTogJyMxOTE5NzAnLFxuICAgIG1pbnRjcmVhbTogJyNmNWZmZmEnLFxuICAgIG1pc3R5cm9zZTogJyNmZmU0ZTEnLFxuICAgIG1vY2Nhc2luOiAnI2ZmZTRiNScsXG4gICAgbmF2YWpvd2hpdGU6ICcjZmZkZWFkJyxcbiAgICBuYXZ5OiAnIzAwMDA4MCcsXG4gICAgb2xkbGFjZTogJyNmZGY1ZTYnLFxuICAgIG9saXZlOiAnIzgwODAwMCcsXG4gICAgb2xpdmVkcmFiOiAnIzZiOGUyMycsXG4gICAgb3JhbmdlOiAnI2ZmYTUwMCcsXG4gICAgb3JhbmdlcmVkOiAnI2ZmNDUwMCcsXG4gICAgb3JjaGlkOiAnI2RhNzBkNicsXG4gICAgcGFsZWdvbGRlbnJvZDogJyNlZWU4YWEnLFxuICAgIHBhbGVncmVlbjogJyM5OGZiOTgnLFxuICAgIHBhbGV0dXJxdW9pc2U6ICcjYWZlZWVlJyxcbiAgICBwYWxldmlvbGV0cmVkOiAnI2Q4NzA5MycsXG4gICAgcGFwYXlhd2hpcDogJyNmZmVmZDUnLFxuICAgIHBlYWNocHVmZjogJyNmZmRhYjknLFxuICAgIHBlcnU6ICcjY2Q4NTNmJyxcbiAgICBwaW5rOiAnI2ZmYzBjYicsXG4gICAgcGx1bTogJyNkZGEwZGQnLFxuICAgIHBvd2RlcmJsdWU6ICcjYjBlMGU2JyxcbiAgICBwdXJwbGU6ICcjODAwMDgwJyxcbiAgICByZWQ6ICcjZmYwMDAwJyxcbiAgICByb3N5YnJvd246ICcjYmM4ZjhmJyxcbiAgICByb3lhbGJsdWU6ICcjNDE2OWUxJyxcbiAgICBzYWRkbGVicm93bjogJyM4YjQ1MTMnLFxuICAgIHNhbG1vbjogJyNmYTgwNzInLFxuICAgIHNhbmR5YnJvd246ICcjZjRhNDYwJyxcbiAgICBzZWFncmVlbjogJyMyZThiNTcnLFxuICAgIHNlYXNoZWxsOiAnI2ZmZjVlZScsXG4gICAgc2llbm5hOiAnI2EwNTIyZCcsXG4gICAgc2lsdmVyOiAnI2MwYzBjMCcsXG4gICAgc2t5Ymx1ZTogJyM4N2NlZWInLFxuICAgIHNsYXRlYmx1ZTogJyM2YTVhY2QnLFxuICAgIHNsYXRlZ3JheTogJyM3MDgwOTAnLFxuICAgIHNsYXRlZ3JleTogJyM3MDgwOTAnLFxuICAgIHNub3c6ICcjZmZmYWZhJyxcbiAgICBzcHJpbmdncmVlbjogJyMwMGZmN2YnLFxuICAgIHN0ZWVsYmx1ZTogJyM0NjgyYjQnLFxuICAgIHRhbjogJyNkMmI0OGMnLFxuICAgIHRlYWw6ICcjMDA4MDgwJyxcbiAgICB0aGlzdGxlOiAnI2Q4YmZkOCcsXG4gICAgdG9tYXRvOiAnI2ZmNjM0NycsXG4gICAgdHVycXVvaXNlOiAnIzQwZTBkMCcsXG4gICAgdmlvbGV0OiAnI2VlODJlZScsXG4gICAgd2hlYXQ6ICcjZjVkZWIzJyxcbiAgICB3aGl0ZTogJyNmZmZmZmYnLFxuICAgIHdoaXRlc21va2U6ICcjZjVmNWY1JyxcbiAgICB5ZWxsb3c6ICcjZmZmZjAwJyxcbiAgICB5ZWxsb3dncmVlbjogJyM5YWNkMzInLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNzcy1jb2xvcnMuanMubWFwIiwiaW1wb3J0IGhleDJoc2wgZnJvbSAnLi9oZXgyaHNsJztcbmltcG9ydCBoZXgycmdiIGZyb20gJy4vaGV4MnJnYic7XG5pbXBvcnQgaHNsMmhleCBmcm9tICcuL2hzbDJoZXgnO1xuaW1wb3J0IGhzbDJyZ2IgZnJvbSAnLi9oc2wycmdiJztcbmltcG9ydCBpc1ZhbGlkSGV4IGZyb20gJy4vaXMtdmFsaWQtaGV4JztcbmltcG9ydCB7IGNzc0NvbG9ycyB9IGZyb20gJy4vbW9kdWxlcy9jc3MtY29sb3JzJztcbmltcG9ydCB7IGludmFyaWFudCwgaXNTdHJpbmcsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCByZ2IyaGV4IGZyb20gJy4vcmdiMmhleCc7XG5pbXBvcnQgcmdiMmhzbCBmcm9tICcuL3JnYjJoc2wnO1xuLyoqXG4gKiBQYXJzZSBDU1MgY29sb3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VDU1MoaW5wdXQsIG91dHB1dCkge1xuICAgIGludmFyaWFudChpc1N0cmluZyhpbnB1dCksIG1lc3NhZ2VzLmlucHV0U3RyaW5nKTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGNvbnN0IHBhcnNlZElucHV0ID0gY3NzQ29sb3JzW2lucHV0LnRvTG93ZXJDYXNlKCldIHx8IGlucHV0O1xuICAgIGlmIChpc1ZhbGlkSGV4KHBhcnNlZElucHV0KSkge1xuICAgICAgICBzd2l0Y2ggKG91dHB1dCkge1xuICAgICAgICAgICAgY2FzZSAnaHNsJzoge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGhleDJoc2wocGFyc2VkSW5wdXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAncmdiJzoge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGhleDJyZ2IocGFyc2VkSW5wdXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBhcnNlZElucHV0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBpbXByb3ZlIHRoZSBwYXR0ZXJuIHRvIHJlcXVpcmUgMyBncm91cHNcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHBhcnNlZElucHV0Lm1hdGNoKC8oaHNsfHJnYilhP1xcKChcXGQrKSg/OixcXHMqfFxccyspKFxcZCspJT8oPzosXFxzKnxcXHMrKShcXGQrKSU/W14pXSpcXCkvaSk7XG4gICAgICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KG1hdGNoZXMpLCAnaW52YWxpZCBDU1Mgc3RyaW5nJyk7XG4gICAgICAgIGludmFyaWFudChtYXRjaGVzLmxlbmd0aCA9PT0gNSwgJ2ludmFsaWQgQ1NTIHN0cmluZycpO1xuICAgICAgICBjb25zdCBbLCBtb2RlbCwgaE9Sciwgc09SZywgbE9SYl0gPSBtYXRjaGVzO1xuICAgICAgICBsZXQgaGV4O1xuICAgICAgICBsZXQgaHNsO1xuICAgICAgICBsZXQgcmdiO1xuICAgICAgICBpZiAobW9kZWwgPT09ICdoc2wnKSB7XG4gICAgICAgICAgICBoc2wgPSB7XG4gICAgICAgICAgICAgICAgaDogcGFyc2VJbnQoaE9SciwgMTApLFxuICAgICAgICAgICAgICAgIHM6IHBhcnNlSW50KHNPUmcsIDEwKSxcbiAgICAgICAgICAgICAgICBsOiBwYXJzZUludChsT1JiLCAxMCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaGV4ID0gaHNsMmhleChoc2wpO1xuICAgICAgICAgICAgcmdiID0gaHNsMnJnYihoc2wpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmdiID0ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KGhPUnIsIDEwKSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChzT1JnLCAxMCksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQobE9SYiwgMTApLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGhleCA9IHJnYjJoZXgocmdiKTtcbiAgICAgICAgICAgIGhzbCA9IHJnYjJoc2wocmdiKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG91dHB1dCkge1xuICAgICAgICAgICAgY2FzZSAnaHNsJzoge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGhzbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3JnYic6IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZ2I7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdoZXgnOlxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGhleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFyc2UtY3NzLmpzLm1hcCIsImltcG9ydCBoZXgyaHNsIGZyb20gJy4vaGV4MmhzbCc7XG5pbXBvcnQgaGV4MnJnYiBmcm9tICcuL2hleDJyZ2InO1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc051bWJlciwgaXNTdHJpbmcsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCBwYXJzZUNTUyBmcm9tICcuL3BhcnNlLWNzcyc7XG4vKipcbiAqIEZhZGUgdGhlIGNvbG9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhZGUoaW5wdXQsIGFtb3VudCA9IDEwLCBvdXRwdXQgPSAncmdiJykge1xuICAgIGludmFyaWFudChpc1N0cmluZyhpbnB1dCksIG1lc3NhZ2VzLmlucHV0U3RyaW5nKTtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIoYW1vdW50KSwgbWVzc2FnZXMuYW1vdW50KTtcbiAgICBjb25zdCBoZXggPSBwYXJzZUNTUyhpbnB1dCk7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9ICgxMDAgLSBhbW91bnQpIC8gMTAwO1xuICAgIGlmIChvdXRwdXQgPT09ICdyZ2InKSB7XG4gICAgICAgIGNvbnN0IHsgciwgZywgYiB9ID0gaGV4MnJnYihoZXgpO1xuICAgICAgICByZXR1cm4gYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgJHtwZXJjZW50YWdlfSlgO1xuICAgIH1cbiAgICBpZiAob3V0cHV0ID09PSAnaHNsJykge1xuICAgICAgICBjb25zdCB7IGgsIHMsIGwgfSA9IGhleDJoc2woaGV4KTtcbiAgICAgICAgcmV0dXJuIGBoc2xhKCR7aH0sICR7c30lLCAke2x9JSwgJHtwZXJjZW50YWdlfSlgO1xuICAgIH1cbiAgICByZXR1cm4gYCR7aGV4fSR7TWF0aC5yb3VuZChwZXJjZW50YWdlICogMjU1KS50b1N0cmluZygxNil9YDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZhZGUuanMubWFwIiwiaW1wb3J0IGhleDJyZ2IgZnJvbSAnLi9oZXgycmdiJztcbmltcG9ydCB7IGludmFyaWFudCwgaXNTdHJpbmcsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCBwYXJzZUNTUyBmcm9tICcuL3BhcnNlLWNzcyc7XG4vKipcbiAqIEdldCB0aGUgY29udHJhc3RlZCBjb2xvciBmb3IgYSBnaXZlbiBoZXguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRDb2xvcihpbnB1dCkge1xuICAgIGludmFyaWFudChpc1N0cmluZyhpbnB1dCksIG1lc3NhZ2VzLmlucHV0U3RyaW5nKTtcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IGhleDJyZ2IocGFyc2VDU1MoaW5wdXQpKTtcbiAgICBjb25zdCB5aXEgPSAociAqIDI5OSArIGcgKiA1ODcgKyBiICogMTE0KSAvIDEwMDA7XG4gICAgcmV0dXJuIHlpcSA+PSAxMjggPyAnIzAwMDAwMCcgOiAnI2ZmZmZmZic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZXh0LWNvbG9yLmpzLm1hcCIsInZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG5cbi8vIHNyYy9pbmRleC50c3hcbmltcG9ydCB7IGNyZWF0ZVJlZiwgUHVyZUNvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSBcIkBnaWxiYXJiYXJhL2RlZXAtZXF1YWxcIjtcbmltcG9ydCBtZW1vaXplIGZyb20gXCJtZW1vaXplLW9uZVwiO1xuXG4vLyBzcmMvY29uc3RhbnRzLnRzXG52YXIgRVJST1JfVFlQRSA9IHtcbiAgQUNDT1VOVDogXCJhY2NvdW50XCIsXG4gIEFVVEhFTlRJQ0FUSU9OOiBcImF1dGhlbnRpY2F0aW9uXCIsXG4gIElOSVRJQUxJWkFUSU9OOiBcImluaXRpYWxpemF0aW9uXCIsXG4gIFBMQVlCQUNLOiBcInBsYXliYWNrXCIsXG4gIFBMQVlFUjogXCJwbGF5ZXJcIlxufTtcbnZhciBTVEFUVVMgPSB7XG4gIEVSUk9SOiBcIkVSUk9SXCIsXG4gIElETEU6IFwiSURMRVwiLFxuICBJTklUSUFMSVpJTkc6IFwiSU5JVElBTElaSU5HXCIsXG4gIFJFQURZOiBcIlJFQURZXCIsXG4gIFJVTk5JTkc6IFwiUlVOTklOR1wiLFxuICBVTlNVUFBPUlRFRDogXCJVTlNVUFBPUlRFRFwiXG59O1xudmFyIFRSQU5TUEFSRU5UX0NPTE9SID0gXCJyZ2JhKDAsIDAsIDAsIDApXCI7XG52YXIgVFlQRSA9IHtcbiAgREVWSUNFOiBcImRldmljZV91cGRhdGVcIixcbiAgRkFWT1JJVEU6IFwiZmF2b3JpdGVfdXBkYXRlXCIsXG4gIFBMQVlFUjogXCJwbGF5ZXJfdXBkYXRlXCIsXG4gIFBST0dSRVNTOiBcInByb2dyZXNzX3VwZGF0ZVwiLFxuICBTVEFUVVM6IFwic3RhdHVzX3VwZGF0ZVwiLFxuICBUUkFDSzogXCJ0cmFja191cGRhdGVcIlxufTtcblxuLy8gc3JjL21vZHVsZXMvZ2V0dGVycy50c1xuZnVuY3Rpb24gZ2V0QmdDb2xvcihiZ0NvbG9yLCBmYWxsYmFja0NvbG9yKSB7XG4gIGlmIChmYWxsYmFja0NvbG9yKSB7XG4gICAgcmV0dXJuIGJnQ29sb3IgPT09IFRSQU5TUEFSRU5UX0NPTE9SID8gZmFsbGJhY2tDb2xvciA6IGJnQ29sb3I7XG4gIH1cbiAgcmV0dXJuIGJnQ29sb3IgPT09IFwidHJhbnNwYXJlbnRcIiA/IFRSQU5TUEFSRU5UX0NPTE9SIDogYmdDb2xvcjtcbn1cbmZ1bmN0aW9uIGdldExvY2FsZShsb2NhbGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50RGV2aWNlOiBcIkN1cnJlbnQgZGV2aWNlXCIsXG4gICAgZGV2aWNlczogXCJEZXZpY2VzXCIsXG4gICAgbmV4dDogXCJOZXh0XCIsXG4gICAgb3RoZXJEZXZpY2VzOiBcIlNlbGVjdCBvdGhlciBkZXZpY2VcIixcbiAgICBwYXVzZTogXCJQYXVzZVwiLFxuICAgIHBsYXk6IFwiUGxheVwiLFxuICAgIHByZXZpb3VzOiBcIlByZXZpb3VzXCIsXG4gICAgcmVtb3ZlVHJhY2s6IFwiUmVtb3ZlIGZyb20geW91ciBmYXZvcml0ZXNcIixcbiAgICBzYXZlVHJhY2s6IFwiU2F2ZSB0byB5b3VyIGZhdm9yaXRlc1wiLFxuICAgIHRpdGxlOiBcIntuYW1lfSBvbiBTUE9USUZZXCIsXG4gICAgdm9sdW1lOiBcIlZvbHVtZVwiLFxuICAgIC4uLmxvY2FsZVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0TWVyZ2VkU3R5bGVzKHN0eWxlcykge1xuICBjb25zdCBtZXJnZWRTdHlsZXMgPSB7XG4gICAgYWN0aXZlQ29sb3I6IFwiIzFjYjk1NFwiLFxuICAgIGFsdENvbG9yOiBcIiNjY2NcIixcbiAgICBiZ0NvbG9yOiBcIiNmZmZcIixcbiAgICBjb2xvcjogXCIjMzMzXCIsXG4gICAgZXJyb3JDb2xvcjogXCIjZmYwMDI2XCIsXG4gICAgaGVpZ2h0OiA4MCxcbiAgICBsb2FkZXJDb2xvcjogXCIjY2NjXCIsXG4gICAgbG9hZGVyU2l6ZTogMzIsXG4gICAgc2xpZGVyQ29sb3I6IFwiIzY2NlwiLFxuICAgIHNsaWRlckhhbmRsZUJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICBzbGlkZXJIYW5kbGVDb2xvcjogXCIjMDAwXCIsXG4gICAgc2xpZGVySGVpZ2h0OiA0LFxuICAgIHNsaWRlclRyYWNrQm9yZGVyUmFkaXVzOiA0LFxuICAgIHNsaWRlclRyYWNrQ29sb3I6IFwiI2NjY1wiLFxuICAgIHRyYWNrQXJ0aXN0Q29sb3I6IFwiIzY2NlwiLFxuICAgIHRyYWNrTmFtZUNvbG9yOiBcIiMzMzNcIixcbiAgICAuLi5zdHlsZXNcbiAgfTtcbiAgbWVyZ2VkU3R5bGVzLmJnQ29sb3IgPSBnZXRCZ0NvbG9yKG1lcmdlZFN0eWxlcy5iZ0NvbG9yKTtcbiAgcmV0dXJuIG1lcmdlZFN0eWxlcztcbn1cbmZ1bmN0aW9uIGdldFNwb3RpZnlMaW5rKHVyaSkge1xuICBjb25zdCBbLCB0eXBlID0gXCJcIiwgaWQgPSBcIlwiXSA9IHVyaS5zcGxpdChcIjpcIik7XG4gIHJldHVybiBgaHR0cHM6Ly9vcGVuLnNwb3RpZnkuY29tLyR7dHlwZX0vJHtpZH1gO1xufVxuZnVuY3Rpb24gZ2V0U3BvdGlmeUxpbmtUaXRsZShuYW1lLCBsb2NhbGUpIHtcbiAgcmV0dXJuIGxvY2FsZS5yZXBsYWNlKFwie25hbWV9XCIsIG5hbWUpO1xufVxuZnVuY3Rpb24gZ2V0U3BvdGlmeVVSSVR5cGUodXJpKSB7XG4gIGNvbnN0IFssIHR5cGUgPSBcIlwiXSA9IHVyaS5zcGxpdChcIjpcIik7XG4gIHJldHVybiB0eXBlO1xufVxuXG4vLyBzcmMvbW9kdWxlcy9oZWxwZXJzLnRzXG5mdW5jdGlvbiBjb252ZXJ0VHJhY2sodHJhY2spIHtcbiAgY29uc3QgeyBhbGJ1bSwgYXJ0aXN0cywgZHVyYXRpb25fbXMsIGlkLCBuYW1lLCB1cmkgfSA9IHRyYWNrO1xuICByZXR1cm4ge1xuICAgIGFydGlzdHMsXG4gICAgZHVyYXRpb25NczogZHVyYXRpb25fbXMsXG4gICAgaWQ6IGlkID8/IFwiXCIsXG4gICAgaW1hZ2U6IGdldEFsYnVtSW1hZ2UoYWxidW0pLFxuICAgIG5hbWUsXG4gICAgdXJpXG4gIH07XG59XG5mdW5jdGlvbiBnZXRBbGJ1bUltYWdlKGFsYnVtKSB7XG4gIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoLi4uYWxidW0uaW1hZ2VzLm1hcCgoZCkgPT4gZC53aWR0aCB8fCAwKSk7XG4gIHJldHVybiBhbGJ1bS5pbWFnZXMuZmluZCgoZCkgPT4gZC53aWR0aCA9PT0gbWF4V2lkdGgpPy51cmwgfHwgXCJcIjtcbn1cbmZ1bmN0aW9uIGdldFJlcGVhdFN0YXRlKG1vZGUpIHtcbiAgc3dpdGNoIChtb2RlKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIFwiY29udGV4dFwiO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBcInRyYWNrXCI7XG4gICAgY2FzZSAwOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJvZmZcIjtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0VVJJcyh1cmlzKSB7XG4gIGlmICghdXJpcykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gQXJyYXkuaXNBcnJheSh1cmlzKSA/IHVyaXMgOiBbdXJpc107XG59XG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuZnVuY3Rpb24gbG9hZFNwb3RpZnlQbGF5ZXIoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3Qgc2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcG90aWZ5LXBsYXllclwiKTtcbiAgICBpZiAoIXNjcmlwdFRhZykge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgIHNjcmlwdC5pZCA9IFwic3BvdGlmeS1wbGF5ZXJcIjtcbiAgICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICAgIHNjcmlwdC5zcmMgPSBcImh0dHBzOi8vc2RrLnNjZG4uY28vc3BvdGlmeS1wbGF5ZXIuanNcIjtcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICBzY3JpcHQub25lcnJvciA9IChlcnJvcikgPT4gcmVqZWN0KG5ldyBFcnJvcihgbG9hZFNjcmlwdDogJHtlcnJvci5tZXNzYWdlfWApKTtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBtaWxsaXNlY29uZHNUb1RpbWUoaW5wdXQpIHtcbiAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IoaW5wdXQgLyAxZTMgJSA2MCk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKGlucHV0IC8gKDFlMyAqIDYwKSAlIDYwKTtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKGlucHV0IC8gKDFlMyAqIDYwICogNjApICUgMjQpO1xuICBjb25zdCBwYXJ0cyA9IFtdO1xuICBpZiAoaG91cnMgPiAwKSB7XG4gICAgcGFydHMucHVzaChcbiAgICAgIGAke2hvdXJzfWAucGFkU3RhcnQoMiwgXCIwXCIpLFxuICAgICAgYCR7bWludXRlc31gLnBhZFN0YXJ0KDIsIFwiMFwiKSxcbiAgICAgIGAke3NlY29uZHN9YC5wYWRTdGFydCgyLCBcIjBcIilcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzLnB1c2goYCR7bWludXRlc31gLCBgJHtzZWNvbmRzfWAucGFkU3RhcnQoMiwgXCIwXCIpKTtcbiAgfVxuICByZXR1cm4gcGFydHMuam9pbihcIjpcIik7XG59XG5mdW5jdGlvbiBwYXJzZVZvbHVtZSh2YWx1ZSkge1xuICBpZiAoIWlzTnVtYmVyKHZhbHVlKSkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIGlmICh2YWx1ZSA+IDEpIHtcbiAgICByZXR1cm4gdmFsdWUgLyAxMDA7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gcm91bmQobnVtYmVyLCBkaWdpdHMgPSAyKSB7XG4gIGNvbnN0IGZhY3RvciA9IDEwICoqIGRpZ2l0cztcbiAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyICogZmFjdG9yKSAvIGZhY3Rvcjtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlVVJJKGlucHV0KSB7XG4gIGNvbnN0IHZhbGlkVHlwZXMgPSBbXCJhbGJ1bVwiLCBcImFydGlzdFwiLCBcInBsYXlsaXN0XCIsIFwic2hvd1wiLCBcInRyYWNrXCJdO1xuICBpZiAoaW5wdXQgJiYgaW5wdXQuaW5kZXhPZihcIjpcIikgPiAtMSkge1xuICAgIGNvbnN0IFtrZXksIHR5cGUsIGlkXSA9IGlucHV0LnNwbGl0KFwiOlwiKTtcbiAgICBpZiAoa2V5ID09PSBcInNwb3RpZnlcIiAmJiB2YWxpZFR5cGVzLmluZGV4T2YodHlwZSkgPj0gMCAmJiBpZC5sZW5ndGggPT09IDIyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBzcmMvbW9kdWxlcy9zcG90aWZ5LnRzXG52YXIgc3BvdGlmeV9leHBvcnRzID0ge307XG5fX2V4cG9ydChzcG90aWZ5X2V4cG9ydHMsIHtcbiAgY2hlY2tUcmFja3NTdGF0dXM6ICgpID0+IGNoZWNrVHJhY2tzU3RhdHVzLFxuICBnZXREZXZpY2VzOiAoKSA9PiBnZXREZXZpY2VzLFxuICBnZXRQbGF5YmFja1N0YXRlOiAoKSA9PiBnZXRQbGF5YmFja1N0YXRlLFxuICBnZXRRdWV1ZTogKCkgPT4gZ2V0UXVldWUsXG4gIG5leHQ6ICgpID0+IG5leHQsXG4gIHBhdXNlOiAoKSA9PiBwYXVzZSxcbiAgcGxheTogKCkgPT4gcGxheSxcbiAgcHJldmlvdXM6ICgpID0+IHByZXZpb3VzLFxuICByZW1vdmVUcmFja3M6ICgpID0+IHJlbW92ZVRyYWNrcyxcbiAgcmVwZWF0OiAoKSA9PiByZXBlYXQsXG4gIHNhdmVUcmFja3M6ICgpID0+IHNhdmVUcmFja3MsXG4gIHNlZWs6ICgpID0+IHNlZWssXG4gIHNldERldmljZTogKCkgPT4gc2V0RGV2aWNlLFxuICBzZXRWb2x1bWU6ICgpID0+IHNldFZvbHVtZSxcbiAgc2h1ZmZsZTogKCkgPT4gc2h1ZmZsZVxufSk7XG5hc3luYyBmdW5jdGlvbiBjaGVja1RyYWNrc1N0YXR1cyh0b2tlbiwgdHJhY2tzKSB7XG4gIGNvbnN0IGlkcyA9IEFycmF5LmlzQXJyYXkodHJhY2tzKSA/IHRyYWNrcyA6IFt0cmFja3NdO1xuICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3RyYWNrcy9jb250YWlucz9pZHM9JHtpZHN9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJHRVRcIlxuICB9KS50aGVuKChkKSA9PiBkLmpzb24oKSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXREZXZpY2VzKHRva2VuKSB7XG4gIHJldHVybiBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL2RldmljZXNgLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIkdFVFwiXG4gIH0pLnRoZW4oKGQpID0+IGQuanNvbigpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFBsYXliYWNrU3RhdGUodG9rZW4pIHtcbiAgcmV0dXJuIGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS9wbGF5ZXJgLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIkdFVFwiXG4gIH0pLnRoZW4oKGQpID0+IHtcbiAgICBpZiAoZC5zdGF0dXMgPT09IDIwNCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBkLmpzb24oKTtcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRRdWV1ZSh0b2tlbikge1xuICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9xdWV1ZWAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiR0VUXCJcbiAgfSkudGhlbigoZCkgPT4gZC5qc29uKCkpO1xufVxuYXN5bmMgZnVuY3Rpb24gbmV4dCh0b2tlbiwgZGV2aWNlSWQpIHtcbiAgbGV0IHF1ZXJ5ID0gXCJcIjtcbiAgaWYgKGRldmljZUlkKSB7XG4gICAgcXVlcnkgKz0gYD9kZXZpY2VfaWQ9JHtkZXZpY2VJZH1gO1xuICB9XG4gIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS9wbGF5ZXIvbmV4dCR7cXVlcnl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBwYXVzZSh0b2tlbiwgZGV2aWNlSWQpIHtcbiAgbGV0IHF1ZXJ5ID0gXCJcIjtcbiAgaWYgKGRldmljZUlkKSB7XG4gICAgcXVlcnkgKz0gYD9kZXZpY2VfaWQ9JHtkZXZpY2VJZH1gO1xuICB9XG4gIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS9wbGF5ZXIvcGF1c2Uke3F1ZXJ5fWAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBwbGF5KHRva2VuLCB7IGNvbnRleHRfdXJpLCBkZXZpY2VJZCwgb2Zmc2V0ID0gMCwgdXJpcyB9KSB7XG4gIGxldCBib2R5O1xuICBpZiAoY29udGV4dF91cmkpIHtcbiAgICBjb25zdCBpc0FydGlzdCA9IGNvbnRleHRfdXJpLmluZGV4T2YoXCJhcnRpc3RcIikgPj0gMDtcbiAgICBsZXQgcG9zaXRpb247XG4gICAgaWYgKCFpc0FydGlzdCkge1xuICAgICAgcG9zaXRpb24gPSB7IHBvc2l0aW9uOiBvZmZzZXQgfTtcbiAgICB9XG4gICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgY29udGV4dF91cmksIG9mZnNldDogcG9zaXRpb24gfSk7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh1cmlzKSAmJiB1cmlzLmxlbmd0aCkge1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHVyaXMsIG9mZnNldDogeyBwb3NpdGlvbjogb2Zmc2V0IH0gfSk7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9wbGF5P2RldmljZV9pZD0ke2RldmljZUlkfWAsIHtcbiAgICBib2R5LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQVVRcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHByZXZpb3VzKHRva2VuLCBkZXZpY2VJZCkge1xuICBsZXQgcXVlcnkgPSBcIlwiO1xuICBpZiAoZGV2aWNlSWQpIHtcbiAgICBxdWVyeSArPSBgP2RldmljZV9pZD0ke2RldmljZUlkfWA7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9wcmV2aW91cyR7cXVlcnl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVUcmFja3ModG9rZW4sIHRyYWNrcykge1xuICBjb25zdCBpZHMgPSBBcnJheS5pc0FycmF5KHRyYWNrcykgPyB0cmFja3MgOiBbdHJhY2tzXTtcbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3RyYWNrc2AsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpZHMpLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJERUxFVEVcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlcGVhdCh0b2tlbiwgc3RhdGUsIGRldmljZUlkKSB7XG4gIGxldCBxdWVyeSA9IGA/c3RhdGU9JHtzdGF0ZX1gO1xuICBpZiAoZGV2aWNlSWQpIHtcbiAgICBxdWVyeSArPSBgJmRldmljZV9pZD0ke2RldmljZUlkfWA7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9yZXBlYXQke3F1ZXJ5fWAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBzYXZlVHJhY2tzKHRva2VuLCB0cmFja3MpIHtcbiAgY29uc3QgaWRzID0gQXJyYXkuaXNBcnJheSh0cmFja3MpID8gdHJhY2tzIDogW3RyYWNrc107XG4gIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS90cmFja3NgLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpZHMgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBVVFwiXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gc2Vlayh0b2tlbiwgcG9zaXRpb24sIGRldmljZUlkKSB7XG4gIGxldCBxdWVyeSA9IGA/cG9zaXRpb25fbXM9JHtwb3NpdGlvbn1gO1xuICBpZiAoZGV2aWNlSWQpIHtcbiAgICBxdWVyeSArPSBgJmRldmljZV9pZD0ke2RldmljZUlkfWA7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9zZWVrJHtxdWVyeX1gLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBVVFwiXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gc2V0RGV2aWNlKHRva2VuLCBkZXZpY2VJZCwgc2hvdWxkUGxheSkge1xuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyYCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGV2aWNlX2lkczogW2RldmljZUlkXSwgcGxheTogc2hvdWxkUGxheSB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBzZXRWb2x1bWUodG9rZW4sIHZvbHVtZSwgZGV2aWNlSWQpIHtcbiAgbGV0IHF1ZXJ5ID0gYD92b2x1bWVfcGVyY2VudD0ke3ZvbHVtZX1gO1xuICBpZiAoZGV2aWNlSWQpIHtcbiAgICBxdWVyeSArPSBgJmRldmljZV9pZD0ke2RldmljZUlkfWA7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci92b2x1bWUke3F1ZXJ5fWAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBzaHVmZmxlKHRva2VuLCBzdGF0ZSwgZGV2aWNlSWQpIHtcbiAgbGV0IHF1ZXJ5ID0gYD9zdGF0ZT0ke3N0YXRlfWA7XG4gIGlmIChkZXZpY2VJZCkge1xuICAgIHF1ZXJ5ICs9IGAmZGV2aWNlX2lkPSR7ZGV2aWNlSWR9YDtcbiAgfVxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3NodWZmbGUke3F1ZXJ5fWAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5cbi8vIHNyYy9tb2R1bGVzL3N0eWxlZC50c3hcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gXCJuYW5vLWNzc1wiO1xuaW1wb3J0IHsgYWRkb24gYXMgYWRkb25KU1ggfSBmcm9tIFwibmFuby1jc3MvYWRkb24vanN4LmpzXCI7XG5pbXBvcnQgeyBhZGRvbiBhcyBhZGRvbktleWZyYW1lcyB9IGZyb20gXCJuYW5vLWNzcy9hZGRvbi9rZXlmcmFtZXMuanNcIjtcbmltcG9ydCB7IGFkZG9uIGFzIGFkZG9uTmVzdGluZyB9IGZyb20gXCJuYW5vLWNzcy9hZGRvbi9uZXN0aW5nLmpzXCI7XG5pbXBvcnQgeyBhZGRvbiBhcyBhZGRvblJ1bGUgfSBmcm9tIFwibmFuby1jc3MvYWRkb24vcnVsZS5qc1wiO1xuaW1wb3J0IHsgYWRkb24gYXMgYWRkb25TdHlsZSB9IGZyb20gXCJuYW5vLWNzcy9hZGRvbi9zdHlsZS5qc1wiO1xuaW1wb3J0IHsgYWRkb24gYXMgYWRkb25TdHlsZWQgfSBmcm9tIFwibmFuby1jc3MvYWRkb24vc3R5bGVkLmpzXCI7XG52YXIgbmFubyA9IGNyZWF0ZSh7IGg6IGNyZWF0ZUVsZW1lbnQgfSk7XG5hZGRvblJ1bGUobmFubyk7XG5hZGRvbktleWZyYW1lcyhuYW5vKTtcbmFkZG9uSlNYKG5hbm8pO1xuYWRkb25TdHlsZShuYW5vKTtcbmFkZG9uU3R5bGVkKG5hbm8pO1xuYWRkb25OZXN0aW5nKG5hbm8pO1xudmFyIHsga2V5ZnJhbWVzLCBwdXQsIHN0eWxlZCB9ID0gbmFubztcbnZhciBweCA9ICh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiID8gYCR7dmFsdWV9cHhgIDogdmFsdWU7XG5cbi8vIHNyYy9jb21wb25lbnRzL0FjdGlvbnMudHN4XG5pbXBvcnQgeyBtZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBXcmFwcGVyID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiLFxuICAgIFwicG9pbnRlci1ldmVudHNcIjogXCJub25lXCJcbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4ge1xuICAgIGxldCBzdHlsZXMgPSB7XG4gICAgICBib3R0b206IDAsXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogXCJhdXRvXCJcbiAgICB9O1xuICAgIGlmIChzdHlsZS5sYXlvdXQgPT09IFwicmVzcG9uc2l2ZVwiKSB7XG4gICAgICBzdHlsZXMgPSB7XG4gICAgICAgIFwiQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KVwiOiBzdHlsZXMsXG4gICAgICAgIFwiQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KVwiOiB7XG4gICAgICAgICAgaGVpZ2h0OiBweChzdHlsZS5oKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBweCgzMiksXG4gICAgICAuLi5zdHlsZXNcbiAgICB9O1xuICB9LFxuICBcIkFjdGlvbnNSU1dQXCJcbik7XG5mdW5jdGlvbiBBY3Rpb25zKHByb3BzKSB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGxheW91dCwgc3R5bGVzIH0gPSBwcm9wcztcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goV3JhcHBlciwgeyBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJBY3Rpb25zXCIsIHN0eWxlOiB7IGg6IHN0eWxlcy5oZWlnaHQsIGxheW91dCB9LCBjaGlsZHJlbiB9KTtcbn1cbnZhciBBY3Rpb25zX2RlZmF1bHQgPSBtZW1vKEFjdGlvbnMpO1xuXG4vLyBzcmMvY29tcG9uZW50cy9Db250cm9scy50c3hcbmltcG9ydCB7IG1lbW8gYXMgbWVtbzMgfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvTmV4dC50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gyIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBOZXh0KHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MihcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MihcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk01My40ODYgMGEzLjIgMy4yIDAgMCAwLTMuMiAzLjJ2MjMuNTQzTDQuOC40ODlBMy4yIDMuMiAwIDAgMCAwIDMuMjU1VjYwLjc0YTMuMiAzLjIgMCAwIDAgNC44IDIuNzc0bDQ1LjQ4Ni0yNi4yNjJWNjAuOGEzLjIgMy4yIDAgMCAwIDMuMiAzLjJINjAuOGEzLjIgMy4yIDAgMCAwIDMuMi0zLjJWMy4yQTMuMiAzLjIgMCAwIDAgNjAuOCAwaC03LjMxNFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL1BhdXNlLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIFBhdXNlKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MyhcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MyhcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0zMiAwYzE3LjY3MyAwIDMyIDE0LjMyNyAzMiAzMiAwIDE3LjY3My0xNC4zMjcgMzItMzIgMzJDMTQuMzI3IDY0IDAgNDkuNjczIDAgMzIgMCAxNC4zMjcgMTQuMzI3IDAgMzIgMFptLTUuNCAxOGgtNS4yYTEuNCAxLjQgMCAwIDAtMS40IDEuNHYyNS4yYTEuNCAxLjQgMCAwIDAgMS40IDEuNGg1LjJhMS40IDEuNCAwIDAgMCAxLjQtMS40VjE5LjRhMS40IDEuNCAwIDAgMC0xLjQtMS40Wm0xNiAwaC01LjJhMS40IDEuNCAwIDAgMC0xLjQgMS40djI1LjJhMS40IDEuNCAwIDAgMCAxLjQgMS40aDUuMmExLjQgMS40IDAgMCAwIDEuNC0xLjRWMTkuNGExLjQgMS40IDAgMCAwLTEuNC0xLjRaXCIsXG4gICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgfVxuICApIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9QbGF5LnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIFBsYXkocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3g0KFwic3ZnXCIsIHsgaGVpZ2h0OiBcIjFlbVwiLCBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsIHdpZHRoOiBcIjFlbVwiLCAuLi5wcm9wcywgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3g0KFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTMyIDBjMTcuNjczIDAgMzIgMTQuMzI3IDMyIDMyIDAgMTcuNjczLTE0LjMyNyAzMi0zMiAzMkMxNC4zMjcgNjQgMCA0OS42NzMgMCAzMiAwIDE0LjMyNyAxNC4zMjcgMCAzMiAwWm0tNy42MSAxOC4xODhjLS40MzUuMjUxLS43MDIuNzE1LS43MDEgMS4yMTZ2MjUuMTk0YTEuNDAyIDEuNDAyIDAgMCAwIDIuMTA0IDEuMjE0TDQ3LjYxIDMzLjIxNGExLjQwMiAxLjQwMiAwIDAgMCAwLTIuNDI4TDI1Ljc5MyAxOC4xODhjLS40MzUtLjI1LS45Ny0uMjUtMS40MDQgMFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL1ByZXZpb3VzLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDUgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIFByZXZpb3VzKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4NShcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4NShcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xMC41MTQgMGEzLjIgMy4yIDAgMCAxIDMuMiAzLjJ2MjMuNTQzTDU5LjIuNDg5QTMuMiAzLjIgMCAwIDEgNjQgMy4yNTVWNjAuNzRhMy4yIDMuMiAwIDAgMS00LjggMi43NzRMMTMuNzE0IDM3LjI1M1Y2MC44YTMuMiAzLjIgMCAwIDEtMy4yIDMuMkgzLjJBMy4yIDMuMiAwIDAgMSAwIDYwLjhWMy4yQTMuMiAzLjIgMCAwIDEgMy4yIDBoNy4zMTRaXCIsXG4gICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgfVxuICApIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9TbGlkZXIudHN4XG5pbXBvcnQgeyBtZW1vIGFzIG1lbW8yIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmFuZ2VTbGlkZXIgZnJvbSBcIkBnaWxiYXJiYXJhL3JlYWN0LXJhbmdlLXNsaWRlclwiO1xuaW1wb3J0IHsganN4IGFzIGpzeDYsIGpzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBXcmFwcGVyMiA9IHN0eWxlZChcImRpdlwiKShcbiAge1xuICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgZm9udFNpemU6IHB4KDEyKSxcbiAgICB0cmFuc2l0aW9uOiBcImhlaWdodCAwLjNzXCIsXG4gICAgekluZGV4OiAxMFxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiAoe1xuICAgICdbY2xhc3NePVwicnN3cF9cIl0nOiB7XG4gICAgICBjb2xvcjogc3R5bGUuYyxcbiAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICBtaW5XaWR0aDogcHgoMzIpXG4gICAgfSxcbiAgICBcIi5yc3dwX3Byb2dyZXNzXCI6IHtcbiAgICAgIG1hcmdpblJpZ2h0OiBweChzdHlsZS5zbGlkZXJIZWlnaHQgKyA2KSxcbiAgICAgIHRleHRBbGlnbjogXCJyaWdodFwiXG4gICAgfSxcbiAgICBcIi5yc3dwX2R1cmF0aW9uXCI6IHtcbiAgICAgIG1hcmdpbkxlZnQ6IHB4KHN0eWxlLnNsaWRlckhlaWdodCArIDYpLFxuICAgICAgdGV4dEFsaWduOiBcImxlZnRcIlxuICAgIH1cbiAgfSksXG4gIFwiU2xpZGVyUlNXUFwiXG4pO1xuZnVuY3Rpb24gU2xpZGVyKHByb3BzKSB7XG4gIGNvbnN0IHsgZHVyYXRpb25NcywgaXNNYWduaWZpZWQsIG9uQ2hhbmdlUmFuZ2UsIG9uVG9nZ2xlTWFnbmlmeSwgcG9zaXRpb24sIHByb2dyZXNzTXMsIHN0eWxlcyB9ID0gcHJvcHM7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZVJhbmdlID0gYXN5bmMgKHsgeCB9KSA9PiB7XG4gICAgb25DaGFuZ2VSYW5nZSh4KTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlU2l6ZSA9IHN0eWxlcy5zbGlkZXJIZWlnaHQgKyA2O1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHMoXG4gICAgV3JhcHBlcjIsXG4gICAge1xuICAgICAgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiU2xpZGVyXCIsXG4gICAgICBcImRhdGEtcG9zaXRpb25cIjogcG9zaXRpb24sXG4gICAgICBvbk1vdXNlRW50ZXI6IG9uVG9nZ2xlTWFnbmlmeSxcbiAgICAgIG9uTW91c2VMZWF2ZTogb25Ub2dnbGVNYWduaWZ5LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgYzogc3R5bGVzLmNvbG9yLFxuICAgICAgICBzbGlkZXJIZWlnaHQ6IHN0eWxlcy5zbGlkZXJIZWlnaHRcbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4NihcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyc3dwX3Byb2dyZXNzXCIsIGNoaWxkcmVuOiBtaWxsaXNlY29uZHNUb1RpbWUocHJvZ3Jlc3NNcykgfSksXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3g2KFxuICAgICAgICAgIFJhbmdlU2xpZGVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGF4aXM6IFwieFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNsaWRlclwiLFxuICAgICAgICAgICAgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwicHJvZ3Jlc3MtYmFyXCIsXG4gICAgICAgICAgICBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlUmFuZ2UsXG4gICAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHRodW1iQm9yZGVyOiAwLFxuICAgICAgICAgICAgICAgIHRodW1iQm9yZGVyUmFkaXVzOiBzdHlsZXMuc2xpZGVySGFuZGxlQm9yZGVyUmFkaXVzLFxuICAgICAgICAgICAgICAgIHRodW1iQ29sb3I6IHN0eWxlcy5zbGlkZXJIYW5kbGVDb2xvcixcbiAgICAgICAgICAgICAgICB0aHVtYlNpemU6IGlzTWFnbmlmaWVkID8gaGFuZGxlU2l6ZSArIDQgOiBoYW5kbGVTaXplLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaXNNYWduaWZpZWQgPyBzdHlsZXMuc2xpZGVySGVpZ2h0ICsgNCA6IHN0eWxlcy5zbGlkZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICByYW5nZUNvbG9yOiBzdHlsZXMuc2xpZGVyQ29sb3IsXG4gICAgICAgICAgICAgICAgdHJhY2tCb3JkZXJSYWRpdXM6IHN0eWxlcy5zbGlkZXJUcmFja0JvcmRlclJhZGl1cyxcbiAgICAgICAgICAgICAgICB0cmFja0NvbG9yOiBzdHlsZXMuc2xpZGVyVHJhY2tDb2xvclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeDogcG9zaXRpb24sXG4gICAgICAgICAgICB4TWF4OiAxMDAsXG4gICAgICAgICAgICB4TWluOiAwLFxuICAgICAgICAgICAgeFN0ZXA6IDAuMVxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDYoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicnN3cF9kdXJhdGlvblwiLCBjaGlsZHJlbjogbWlsbGlzZWNvbmRzVG9UaW1lKGR1cmF0aW9uTXMpIH0pXG4gICAgICBdXG4gICAgfVxuICApO1xufVxudmFyIFNsaWRlcl9kZWZhdWx0ID0gbWVtbzIoU2xpZGVyKTtcblxuLy8gc3JjL2NvbXBvbmVudHMvQ29udHJvbHMudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4NywganN4cyBhcyBqc3hzMiB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFdyYXBwZXIzID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgXCIucnN3cF9fdm9sdW1lXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICByaWdodDogMCxcbiAgICAgIHRvcDogMFxuICAgIH0sXG4gICAgXCIucnN3cF9fZGV2aWNlc1wiOiB7XG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMFxuICAgIH1cbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4ge1xuICAgIGNvbnN0IGlzQ29tcGFjdExheW91dCA9IHN0eWxlLmxheW91dCA9PT0gXCJjb21wYWN0XCI7XG4gICAgY29uc3Qgc3R5bGVzID0ge307XG4gICAgaWYgKGlzQ29tcGFjdExheW91dCkge1xuICAgICAgc3R5bGVzLnBhZGRpbmcgPSBweCg4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzLnBhZGRpbmcgPSBgJHtweCg0KX0gMGA7XG4gICAgICBzdHlsZXNbXCJAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpXCJdID0ge1xuICAgICAgICBwYWRkaW5nOiBweCg4KVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfSxcbiAgXCJDb250cm9sc1JTV1BcIlxuKTtcbnZhciBCdXR0b25zID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBtYXJnaW5Cb3R0b206IHB4KDgpLFxuICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgXCI+IGRpdlwiOiB7XG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBtaW5XaWR0aDogcHgoMzIpLFxuICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiAoe1xuICAgIGNvbG9yOiBzdHlsZS5jXG4gIH0pLFxuICBcIkNvbnRyb2xzQnV0dG9uc1JTV1BcIlxuKTtcbnZhciBCdXR0b24gPSBzdHlsZWQoXCJidXR0b25cIikoXG4gIHtcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgICBmb250U2l6ZTogcHgoMTYpLFxuICAgIGhlaWdodDogcHgoMzIpLFxuICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgIHdpZHRoOiBweCgzMiksXG4gICAgXCImOmRpc2FibGVkXCI6IHtcbiAgICAgIGN1cnNvcjogXCJkZWZhdWx0XCIsXG4gICAgICBvcGFjaXR5OiAwLjZcbiAgICB9LFxuICAgIFwiJi5yc3dwX190b2dnbGVcIjoge1xuICAgICAgZm9udFNpemU6IHB4KDMyKSxcbiAgICAgIHdpZHRoOiBweCg0OClcbiAgICB9XG4gIH0sXG4gICgpID0+ICh7fSksXG4gIFwiQ29udHJvbHNCdXR0b25SU1dQXCJcbik7XG5mdW5jdGlvbiBDb250cm9scyhwcm9wcykge1xuICBjb25zdCB7XG4gICAgY29tcG9uZW50czogeyBsZWZ0QnV0dG9uLCByaWdodEJ1dHRvbiB9ID0ge30sXG4gICAgZGV2aWNlcyxcbiAgICBkdXJhdGlvbk1zLFxuICAgIGlzQWN0aXZlLFxuICAgIGlzRXh0ZXJuYWxEZXZpY2UsXG4gICAgaXNNYWduaWZpZWQsXG4gICAgaXNQbGF5aW5nLFxuICAgIGxheW91dCxcbiAgICBsb2NhbGUsXG4gICAgbmV4dFRyYWNrcyxcbiAgICBvbkNoYW5nZVJhbmdlLFxuICAgIG9uQ2xpY2tOZXh0LFxuICAgIG9uQ2xpY2tQcmV2aW91cyxcbiAgICBvbkNsaWNrVG9nZ2xlUGxheSxcbiAgICBvblRvZ2dsZU1hZ25pZnksXG4gICAgcG9zaXRpb24sXG4gICAgcHJvZ3Jlc3NNcyxcbiAgICBzdHlsZXMsXG4gICAgdm9sdW1lXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgeyBjb2xvciB9ID0gc3R5bGVzO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHMyKFdyYXBwZXIzLCB7IFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIkNvbnRyb2xzXCIsIFwiZGF0YS1wbGF5aW5nXCI6IGlzUGxheWluZywgc3R5bGU6IHsgbGF5b3V0IH0sIGNoaWxkcmVuOiBbXG4gICAgLyogQF9fUFVSRV9fICovIGpzeHMyKEJ1dHRvbnMsIHsgc3R5bGU6IHsgYzogY29sb3IgfSwgY2hpbGRyZW46IFtcbiAgICAgIGRldmljZXMgJiYgLyogQF9fUFVSRV9fICovIGpzeDcoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicnN3cF9fZGV2aWNlc1wiLCBjaGlsZHJlbjogZGV2aWNlcyB9KSxcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3g3KFwiZGl2XCIsIHsgY2hpbGRyZW46IGxlZnRCdXR0b24gfSksXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4NyhcImRpdlwiLCB7IGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4NyhcbiAgICAgICAgQnV0dG9uLFxuICAgICAgICB7XG4gICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGxvY2FsZS5wcmV2aW91cyxcbiAgICAgICAgICBjbGFzc05hbWU6IFwiQnV0dG9uUlNXUFwiLFxuICAgICAgICAgIGRpc2FibGVkOiAhaXNBY3RpdmUgJiYgIWlzRXh0ZXJuYWxEZXZpY2UsXG4gICAgICAgICAgb25DbGljazogb25DbGlja1ByZXZpb3VzLFxuICAgICAgICAgIHRpdGxlOiBsb2NhbGUucHJldmlvdXMsXG4gICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDcoUHJldmlvdXMsIHt9KVxuICAgICAgICB9XG4gICAgICApIH0pLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeDcoXCJkaXZcIiwgeyBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDcoXG4gICAgICAgIEJ1dHRvbixcbiAgICAgICAge1xuICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBpc1BsYXlpbmcgPyBsb2NhbGUucGF1c2UgOiBsb2NhbGUucGxheSxcbiAgICAgICAgICBjbGFzc05hbWU6IFwiQnV0dG9uUlNXUCByc3dwX190b2dnbGVcIixcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrVG9nZ2xlUGxheSxcbiAgICAgICAgICB0aXRsZTogaXNQbGF5aW5nID8gbG9jYWxlLnBhdXNlIDogbG9jYWxlLnBsYXksXG4gICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICBjaGlsZHJlbjogaXNQbGF5aW5nID8gLyogQF9fUFVSRV9fICovIGpzeDcoUGF1c2UsIHt9KSA6IC8qIEBfX1BVUkVfXyAqLyBqc3g3KFBsYXksIHt9KVxuICAgICAgICB9XG4gICAgICApIH0pLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeDcoXCJkaXZcIiwgeyBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDcoXG4gICAgICAgIEJ1dHRvbixcbiAgICAgICAge1xuICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBsb2NhbGUubmV4dCxcbiAgICAgICAgICBjbGFzc05hbWU6IFwiQnV0dG9uUlNXUFwiLFxuICAgICAgICAgIGRpc2FibGVkOiAhbmV4dFRyYWNrcy5sZW5ndGggJiYgIWlzQWN0aXZlICYmICFpc0V4dGVybmFsRGV2aWNlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2tOZXh0LFxuICAgICAgICAgIHRpdGxlOiBsb2NhbGUubmV4dCxcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4NyhOZXh0LCB7fSlcbiAgICAgICAgfVxuICAgICAgKSB9KSxcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3g3KFwiZGl2XCIsIHsgY2hpbGRyZW46IHJpZ2h0QnV0dG9uIH0pLFxuICAgICAgdm9sdW1lICYmIC8qIEBfX1BVUkVfXyAqLyBqc3g3KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJzd3BfX3ZvbHVtZVwiLCBjaGlsZHJlbjogdm9sdW1lIH0pXG4gICAgXSB9KSxcbiAgICAvKiBAX19QVVJFX18gKi8ganN4NyhcbiAgICAgIFNsaWRlcl9kZWZhdWx0LFxuICAgICAge1xuICAgICAgICBkdXJhdGlvbk1zLFxuICAgICAgICBpc01hZ25pZmllZCxcbiAgICAgICAgb25DaGFuZ2VSYW5nZSxcbiAgICAgICAgb25Ub2dnbGVNYWduaWZ5LFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgcHJvZ3Jlc3NNcyxcbiAgICAgICAgc3R5bGVzXG4gICAgICB9XG4gICAgKVxuICBdIH0pO1xufVxudmFyIENvbnRyb2xzX2RlZmF1bHQgPSBtZW1vMyhDb250cm9scyk7XG5cbi8vIHNyYy9jb21wb25lbnRzL0RldmljZXMudHN4XG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvQ2xpY2tPdXRzaWRlLnRzeFxuaW1wb3J0IHsgbWVtbyBhcyBtZW1vNCwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCBhcyBqc3g4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBDbGlja091dHNpZGUocHJvcHMpIHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgaXNBY3RpdmUsIG9uQ2xpY2ssIC4uLnJlc3QgfSA9IHByb3BzO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGlzVG91Y2ggPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVDbGljayA9IHVzZVJlZigoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJSZWYuY3VycmVudDtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJ0b3VjaGVuZFwiKSB7XG4gICAgICBpc1RvdWNoLmN1cnJlbnQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiICYmIGlzVG91Y2guY3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyICYmICFjb250YWluZXIuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgb25DbGljaygpO1xuICAgIH1cbiAgfSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgeyBjdXJyZW50IH0gPSBoYW5kbGVDbGljaztcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBjdXJyZW50LCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjdXJyZW50LCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBjdXJyZW50LCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjdXJyZW50LCB0cnVlKTtcbiAgICB9O1xuICB9LCBbaXNBY3RpdmVdKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3g4KFwiZGl2XCIsIHsgcmVmOiBjb250YWluZXJSZWYsIC4uLnJlc3QsIGNoaWxkcmVuIH0pO1xufVxudmFyIENsaWNrT3V0c2lkZV9kZWZhdWx0ID0gbWVtbzQoQ2xpY2tPdXRzaWRlKTtcblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvRGV2aWNlcy50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3g5IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBEZXZpY2VzSWNvbihwcm9wcykge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDkoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDkoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNTcgNGMzLjg2NCAwIDcgMy4xMzYgNyA3djQyYTcgNyAwIDAgMS03IDdIMzFhNyA3IDAgMCAxLTctN1YxMWMwLTMuODY0IDMuMTM2LTcgNy03aDI2Wk0xNiA1NHY2SDh2LTZoOFptNDEtNDRIMzFhMSAxIDAgMCAwLTEgMXY0MmExIDEgMCAwIDAgMSAxaDI2YTEgMSAwIDAgMCAxLTFWMTFhMSAxIDAgMCAwLTEtMVpNNDQgMzJhOCA4IDAgMSAxIDAgMTYgOCA4IDAgMCAxIDAtMTZaTTE2IDR2Nkg3YTEgMSAwIDAgMC0xIDF2MjZhMSAxIDAgMCAwIDEgMWg5djZIN2E3IDcgMCAwIDEtNy03VjExYzAtMy44NjQgMy4xMzYtNyA3LTdoOVptMjggMTJhNCA0IDAgMSAxIDAgOCA0IDQgMCAwIDEgMC04WlwiLFxuICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvRGV2aWNlc0NvbXB1dGVyLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDEwIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBEZXZpY2VzQ29tcHV0ZXJJY29uKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTAoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDEwKFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTcuMjI2IDEwLjMyM2E3LjIyOCA3LjIyOCAwIDAgMSA3LjIyNi03LjIyNmgzNS4wOTZhNy4yMjggNy4yMjggMCAwIDEgNy4yMjYgNy4yMjZWMzcuMTZhNy4yMjYgNy4yMjYgMCAwIDEtNy4yMjYgNy4yMjZIMTQuNDUyYTcuMjI2IDcuMjI2IDAgMCAxLTcuMjI2LTcuMjI2VjEwLjMyM1ptNy4yMjYtMS4wMzNjLS41NyAwLTEuMDMzLjQ2Mi0xLjAzMyAxLjAzM1YzNy4xNmMwIC41Ny40NjMgMS4wMzMgMS4wMzMgMS4wMzNoMzUuMDk2Yy41NyAwIDEuMDMzLS40NjMgMS4wMzMtMS4wMzNWMTAuMzIzYzAtLjU3LS40NjMtMS4wMzMtMS4wMzMtMS4wMzNIMTQuNDUyWk0wIDU3LjgwNmEzLjA5NyAzLjA5NyAwIDAgMSAzLjA5Ny0zLjA5Nmg1Ny44MDZhMy4wOTcgMy4wOTcgMCAwIDEgMCA2LjE5M0gzLjA5N0EzLjA5NyAzLjA5NyAwIDAgMSAwIDU3LjgwNlpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL0RldmljZXNNb2JpbGUudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MTEgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIERldmljZXNNb2JpbGVJY29uKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTEoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDExKFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTQ0LjggMGE5LjYgOS42IDAgMCAxIDkuNiA5LjZ2NDQuOGE5LjYgOS42IDAgMCAxLTkuNiA5LjZIMTkuMmE5LjYgOS42IDAgMCAxLTkuNi05LjZWOS42QTkuNiA5LjYgMCAwIDEgMTkuMiAwaDI1LjZabTAgNi40SDE5LjJBMy4yIDMuMiAwIDAgMCAxNiA5LjZ2NDQuOGEzLjIgMy4yIDAgMCAwIDMuMiAzLjJoMjUuNmEzLjIgMy4yIDAgMCAwIDMuMi0zLjJWOS42YTMuMiAzLjIgMCAwIDAtMy4yLTMuMlpNMzIgNDMuMmE0IDQgMCAxIDEgMCA4IDQgNCAwIDAgMSAwLThaXCIsXG4gICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgfVxuICApIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9EZXZpY2VzU3BlYWtlci50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxMiB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gRGV2aWNlc1NwZWFrZXJJY29uKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTIoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDEyKFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTQ1IDRjMy44NjQgMCA3IDMuMTM2IDcgN3Y0MmE3IDcgMCAwIDEtNyA3SDE5YTcgNyAwIDAgMS03LTdWMTFjMC0zLjg2NCAzLjEzNi03IDctN2gyNlptMCA2SDE5YTEgMSAwIDAgMC0xIDF2NDJhMSAxIDAgMCAwIDEgMWgyNmExIDEgMCAwIDAgMS0xVjExYTEgMSAwIDAgMC0xLTFaTTMyIDMyYTggOCAwIDEgMSAwIDE2IDggOCAwIDAgMSAwLTE2Wm0wLTE2YTQgNCAwIDEgMSAwIDggNCA0IDAgMCAxIDAtOFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL0RldmljZXMudHN4XG5pbXBvcnQgeyBGcmFnbWVudCwganN4IGFzIGpzeDEzLCBqc3hzIGFzIGpzeHMzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgV3JhcHBlcjQgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwiYWxsXCIsXG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgIHpJbmRleDogMjAsXG4gICAgXCI+IGRpdlwiOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBweCg4KSxcbiAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgIGZpbHRlcjogXCJkcm9wLXNoYWRvdygxcHggMXB4IDZweCByZ2JhKDAsIDAsIDAsIDAuNSkpXCIsXG4gICAgICBmb250U2l6ZTogcHgoMTQpLFxuICAgICAgcGFkZGluZzogcHgoMTYpLFxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHRleHRBbGlnbjogXCJsZWZ0XCIsXG4gICAgICBcIj4gcFwiOiB7XG4gICAgICAgIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuICAgICAgICBtYXJnaW5Cb3R0b206IHB4KDgpLFxuICAgICAgICBtYXJnaW5Ub3A6IHB4KDE2KSxcbiAgICAgICAgd2hpdGVTcGFjZTogXCJub3dyYXBcIlxuICAgICAgfSxcbiAgICAgIGJ1dHRvbjoge1xuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgd2hpdGVTcGFjZTogXCJub3dyYXBcIixcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBcIiY6bm90KDpsYXN0LW9mLXR5cGUpXCI6IHtcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IHB4KDEyKVxuICAgICAgICB9LFxuICAgICAgICBzcGFuOiB7XG4gICAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgICBtYXJnaW5MZWZ0OiBweCg0KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCI+IHNwYW5cIjoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgIGJvcmRlckxlZnQ6IGA2cHggc29saWQgdHJhbnNwYXJlbnRgLFxuICAgICAgICBib3JkZXJSaWdodDogYDZweCBzb2xpZCB0cmFuc3BhcmVudGAsXG4gICAgICAgIGNvbnRlbnQ6ICdcIlwiJyxcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHdpZHRoOiAwXG4gICAgICB9XG4gICAgfSxcbiAgICBcIj4gYnV0dG9uXCI6IHtcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgIGZvbnRTaXplOiBweCgyNCksXG4gICAgICBoZWlnaHQ6IHB4KDMyKSxcbiAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgd2lkdGg6IHB4KDMyKVxuICAgIH1cbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4ge1xuICAgIGNvbnN0IGlzQ29tcGFjdCA9IHN0eWxlLmxheW91dCA9PT0gXCJjb21wYWN0XCI7XG4gICAgY29uc3QgZGl2U3R5bGVzID0gaXNDb21wYWN0ID8ge1xuICAgICAgYm90dG9tOiBcIjEyMCVcIixcbiAgICAgIGxlZnQ6IDBcbiAgICB9IDoge1xuICAgICAgW3N0eWxlLnBdOiBcIjEyMCVcIixcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBcIkBtZWRpYSAobWluLXdpZHRoOiA3NjhweClcIjoge1xuICAgICAgICBsZWZ0OiBcImF1dG9cIixcbiAgICAgICAgcmlnaHQ6IDBcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHNwYW5TdHlsZXMgPSBpc0NvbXBhY3QgPyB7XG4gICAgICBib3R0b206IGAtJHtweCg2KX1gLFxuICAgICAgYm9yZGVyVG9wOiBgNnB4IHNvbGlkICMwMDBgLFxuICAgICAgbGVmdDogcHgoMTApXG4gICAgfSA6IHtcbiAgICAgIFtzdHlsZS5wID09PSBcInRvcFwiID8gXCJib3JkZXItYm90dG9tXCIgOiBcImJvcmRlci10b3BcIl06IGA2cHggc29saWQgIzAwMGAsXG4gICAgICBbc3R5bGUucF06IFwiLTZweFwiLFxuICAgICAgbGVmdDogcHgoMTApLFxuICAgICAgXCJAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpXCI6IHtcbiAgICAgICAgbGVmdDogXCJhdXRvXCIsXG4gICAgICAgIHJpZ2h0OiBweCgxMClcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBcIj4gYnV0dG9uXCI6IHtcbiAgICAgICAgY29sb3I6IHN0eWxlLmNcbiAgICAgIH0sXG4gICAgICBcIj4gZGl2XCI6IHtcbiAgICAgICAgLi4uZGl2U3R5bGVzLFxuICAgICAgICBcIj4gc3BhblwiOiBzcGFuU3R5bGVzXG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgXCJEZXZpY2VzUlNXUFwiXG4pO1xudmFyIExpc3RIZWFkZXIgPSBzdHlsZWQoXCJkaXZcIikoe1xuICBwOiB7XG4gICAgd2hpdGVTcGFjZTogXCJub3dyYXBcIixcbiAgICBcIiY6bnRoLW9mLXR5cGUoMSlcIjoge1xuICAgICAgZm9udFdlaWdodDogXCJib2xkXCIsXG4gICAgICBtYXJnaW5Cb3R0b206IHB4KDgpXG4gICAgfSxcbiAgICBcIiY6bnRoLW9mLXR5cGUoMilcIjoge1xuICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgc3Bhbjoge1xuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICBtYXJnaW5MZWZ0OiBweCg0KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5mdW5jdGlvbiBnZXREZXZpY2VJY29uKHR5cGUpIHtcbiAgaWYgKHR5cGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcInNwZWFrZXJcIikpIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDEzKERldmljZXNTcGVha2VySWNvbiwge30pO1xuICB9XG4gIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJjb21wdXRlclwiKSkge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTMoRGV2aWNlc0NvbXB1dGVySWNvbiwge30pO1xuICB9XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTMoRGV2aWNlc01vYmlsZUljb24sIHt9KTtcbn1cbmZ1bmN0aW9uIERldmljZXMocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIGN1cnJlbnREZXZpY2VJZCxcbiAgICBkZXZpY2VJZCxcbiAgICBkZXZpY2VzID0gW10sXG4gICAgbGF5b3V0LFxuICAgIGxvY2FsZSxcbiAgICBvbkNsaWNrRGV2aWNlLFxuICAgIG9wZW4sXG4gICAgcGxheWVyUG9zaXRpb24sXG4gICAgc3R5bGVzOiB7IGNvbG9yIH1cbiAgfSA9IHByb3BzO1xuICBjb25zdCBbaXNPcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKG9wZW4pO1xuICBjb25zdCBoYW5kbGVDbGlja1NldERldmljZSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBpZiAoZGF0YXNldC5pZCkge1xuICAgICAgb25DbGlja0RldmljZShkYXRhc2V0LmlkKTtcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgaGFuZGxlQ2xpY2tUb2dnbGVMaXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldE9wZW4oKHMpID0+ICFzKTtcbiAgfSwgW10pO1xuICBjb25zdCB7IGN1cnJlbnREZXZpY2UsIG90aGVyRGV2aWNlcyB9ID0gZGV2aWNlcy5yZWR1Y2UoXG4gICAgKGFjYywgZGV2aWNlKSA9PiB7XG4gICAgICBpZiAoZGV2aWNlLmlkID09PSBjdXJyZW50RGV2aWNlSWQpIHtcbiAgICAgICAgYWNjLmN1cnJlbnREZXZpY2UgPSBkZXZpY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2Mub3RoZXJEZXZpY2VzLnB1c2goZGV2aWNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSxcbiAgICB7IGN1cnJlbnREZXZpY2U6IG51bGwsIG90aGVyRGV2aWNlczogW10gfVxuICApO1xuICBsZXQgaWNvbiA9IC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhEZXZpY2VzSWNvbiwge30pO1xuICBpZiAoZGV2aWNlSWQgJiYgY3VycmVudERldmljZSAmJiBjdXJyZW50RGV2aWNlLmlkICE9PSBkZXZpY2VJZCkge1xuICAgIGljb24gPSBnZXREZXZpY2VJY29uKGN1cnJlbnREZXZpY2UudHlwZSk7XG4gIH1cbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhDbGlja091dHNpZGVfZGVmYXVsdCwgeyBpc0FjdGl2ZTogaXNPcGVuLCBvbkNsaWNrOiBoYW5kbGVDbGlja1RvZ2dsZUxpc3QsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTMoXG4gICAgV3JhcHBlcjQsXG4gICAge1xuICAgICAgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiRGV2aWNlc1wiLFxuICAgICAgXCJkYXRhLWRldmljZS1pZFwiOiBjdXJyZW50RGV2aWNlSWQsXG4gICAgICBzdHlsZToge1xuICAgICAgICBjOiBjb2xvcixcbiAgICAgICAgbGF5b3V0LFxuICAgICAgICBwOiBwbGF5ZXJQb3NpdGlvblxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiAhIWRldmljZXMubGVuZ3RoICYmIC8qIEBfX1BVUkVfXyAqLyBqc3hzMyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgICBpc09wZW4gJiYgLyogQF9fUFVSRV9fICovIGpzeHMzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICBjdXJyZW50RGV2aWNlICYmIC8qIEBfX1BVUkVfXyAqLyBqc3hzMyhMaXN0SGVhZGVyLCB7IGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4MTMoXCJwXCIsIHsgY2hpbGRyZW46IGxvY2FsZS5jdXJyZW50RGV2aWNlIH0pLFxuICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeHMzKFwicFwiLCB7IGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgIGdldERldmljZUljb24oY3VycmVudERldmljZS50eXBlKSxcbiAgICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDEzKFwic3BhblwiLCB7IGNoaWxkcmVuOiBjdXJyZW50RGV2aWNlLm5hbWUgfSlcbiAgICAgICAgICAgIF0gfSlcbiAgICAgICAgICBdIH0pLFxuICAgICAgICAgICEhb3RoZXJEZXZpY2VzLmxlbmd0aCAmJiAvKiBAX19QVVJFX18gKi8ganN4czMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhcInBcIiwgeyBjaGlsZHJlbjogbG9jYWxlLm90aGVyRGV2aWNlcyB9KSxcbiAgICAgICAgICAgIG90aGVyRGV2aWNlcy5tYXAoKGRldmljZSkgPT4gLyogQF9fUFVSRV9fICovIGpzeHMzKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGRldmljZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJCdXR0b25SU1dQXCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhLWlkXCI6IGRldmljZS5pZCxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBoYW5kbGVDbGlja1NldERldmljZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICBnZXREZXZpY2VJY29uKGRldmljZS50eXBlKSxcbiAgICAgICAgICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhcInNwYW5cIiwgeyBjaGlsZHJlbjogZGV2aWNlLm5hbWUgfSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRldmljZS5pZFxuICAgICAgICAgICAgKSlcbiAgICAgICAgICBdIH0pLFxuICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhcInNwYW5cIiwge30pXG4gICAgICAgIF0gfSksXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBsb2NhbGUuZGV2aWNlcyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJCdXR0b25SU1dQXCIsXG4gICAgICAgICAgICBvbkNsaWNrOiBoYW5kbGVDbGlja1RvZ2dsZUxpc3QsXG4gICAgICAgICAgICB0aXRsZTogbG9jYWxlLmRldmljZXMsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IGljb25cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIF0gfSlcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL0Vycm9yTWVzc2FnZS50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxNCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFdyYXBwZXI1ID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXG4gICAgd2lkdGg6IFwiMTAwJVwiXG4gIH0sXG4gICh7IHN0eWxlIH0pID0+ICh7XG4gICAgYmFja2dyb3VuZENvbG9yOiBzdHlsZS5iZ0NvbG9yLFxuICAgIGJvcmRlclRvcDogYDFweCBzb2xpZCAke3N0eWxlLmVycm9yQ29sb3J9YCxcbiAgICBjb2xvcjogc3R5bGUuZXJyb3JDb2xvcixcbiAgICBoZWlnaHQ6IHB4KHN0eWxlLmgpXG4gIH0pLFxuICBcIkVycm9yUlNXUFwiXG4pO1xuZnVuY3Rpb24gRXJyb3JNZXNzYWdlKHtcbiAgY2hpbGRyZW4sXG4gIHN0eWxlczogeyBiZ0NvbG9yLCBlcnJvckNvbG9yLCBoZWlnaHQgfVxufSkge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDE0KFdyYXBwZXI1LCB7IFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIkVycm9yTWVzc2FnZVwiLCBzdHlsZTogeyBiZ0NvbG9yLCBlcnJvckNvbG9yLCBoOiBoZWlnaHQgfSwgY2hpbGRyZW4gfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL0luZm8udHN4XG5pbXBvcnQgeyBtZW1vIGFzIG1lbW81LCB1c2VFZmZlY3QgYXMgdXNlRWZmZWN0MywgdXNlUmVmIGFzIHVzZVJlZjMsIHVzZVN0YXRlIGFzIHVzZVN0YXRlMyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZmFkZSB9IGZyb20gXCJjb2xvcml6clwiO1xuXG4vLyBzcmMvbW9kdWxlcy9ob29rcy50c1xuaW1wb3J0IHsgdXNlRWZmZWN0IGFzIHVzZUVmZmVjdDIsIHVzZVJlZiBhcyB1c2VSZWYyLCB1c2VTdGF0ZSBhcyB1c2VTdGF0ZTIgfSBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHVzZU1lZGlhUXVlcnkoaW5wdXQpIHtcbiAgY29uc3QgZ2V0TWF0Y2hlcyA9IChxdWVyeSkgPT4ge1xuICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcbiAgfTtcbiAgY29uc3QgW21hdGNoZXMsIHNldE1hdGNoZXNdID0gdXNlU3RhdGUyKGdldE1hdGNoZXMoaW5wdXQpKTtcbiAgZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKCkge1xuICAgIHNldE1hdGNoZXMoZ2V0TWF0Y2hlcyhpbnB1dCkpO1xuICB9XG4gIHVzZUVmZmVjdDIoKCkgPT4ge1xuICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShpbnB1dCk7XG4gICAgaGFuZGxlQ2hhbmdlKCk7XG4gICAgdHJ5IHtcbiAgICAgIG1hdGNoTWVkaWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBoYW5kbGVDaGFuZ2UpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgbWF0Y2hNZWRpYS5hZGRMaXN0ZW5lcihoYW5kbGVDaGFuZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWF0Y2hNZWRpYS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGhhbmRsZUNoYW5nZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgbWF0Y2hNZWRpYS5yZW1vdmVMaXN0ZW5lcihoYW5kbGVDaGFuZ2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtpbnB1dF0pO1xuICByZXR1cm4gbWF0Y2hlcztcbn1cbmZ1bmN0aW9uIHVzZVByZXZpb3VzKHZhbHVlKSB7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZjIoKTtcbiAgdXNlRWZmZWN0MigoKSA9PiB7XG4gICAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgfSwgW3ZhbHVlXSk7XG4gIHJldHVybiByZWYuY3VycmVudDtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvRmF2b3JpdGUudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MTUgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIEZhdm9yaXRlKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTUoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE1KFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTYzLjY3MyAxNi41MkExNy42NzYgMTcuNjc2IDAgMCAwIDQ5LjE5NyAyLjU2M2MtNS40LS44NjEtMTAuODkxLjg1Mi0xNC44NDQgNC42M2EzLjQzIDMuNDMgMCAwIDEtNC42NzIgMEMyMi45NTYuNjg5IDEyLjMwNS42MiA1LjQ5OCA3LjAzOWMtNi44MDggNi40MTktNy4zNjYgMTcuMDU1LTEuMjY4IDI0LjE1bDI0LjI0NiAyOC44OTRhNC42MjMgNC42MjMgMCAwIDAgNy4wNzggMEw1OS44IDMxLjE5YTE3LjMyOCAxNy4zMjggMCAwIDAgMy44NzMtMTQuNjZ2LS4wMDhaXCIsXG4gICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgfVxuICApIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9GYXZvcml0ZU91dGxpbmUudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MTYgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIEZhdm9yaXRlT3V0bGluZShwcm9wcykge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDE2KFwic3ZnXCIsIHsgaGVpZ2h0OiBcIjFlbVwiLCBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsIHdpZHRoOiBcIjFlbVwiLCAuLi5wcm9wcywgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gxNihcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk01Ljk0NCA3LjIwNkMxMy4yNzEuMyAyNC43MjMuMzQgMzEuOTk5IDcuM0ExOC45MjQgMTguOTI0IDAgMCAxIDQ4LjAyIDIuMzJoLjAwOGExOS4wNjggMTkuMDY4IDAgMCAxIDE1LjYxNyAxNS4wNzF2LjAxM0ExOC43NTkgMTguNzU5IDAgMCAxIDU5LjQ3IDMzLjI2TDM3LjU3MyA1OS4zNTNhNy4yODggNy4yODggMCAwIDEtOC42NDIgMS45MTYgNy4yNzYgNy4yNzYgMCAwIDEtMi40OTgtMS45MTJsLTIxLjkwMS0yNi4xYy02LjU1LTcuNjcxLTUuOTMtMTkuMTMxIDEuNDA4LTI2LjA1MWguMDA0Wm0xMy4wNCAxLjA0YTEyLjcyNiAxMi43MjYgMCAwIDAtOS43MzcgMjAuOTk3bC4wMjEuMDIgMjEuOTA1IDI2LjEwNWMuMzE2LjM3Mi44NC40ODggMS4yODQuMjg1LjE0My0uMDY2LjI3LS4xNjQuMzcyLS4yODVsMjEuOTM0LTI2LjEzN2ExMi41NjUgMTIuNTY1IDAgMCAwIDIuODA4LTEwLjYyNSAxMi44NzUgMTIuODc1IDAgMCAwLTEwLjUzNC0xMC4xNyAxMi43MTQgMTIuNzE0IDAgMCAwLTEwLjc4NSAzLjM3bC0uMDI5LjAyOWE2LjE5OCA2LjE5OCAwIDAgMS04LjQ0NCAwbC0uMDM3LS4wMzNhMTIuNzI3IDEyLjcyNyAwIDAgMC04Ljc1OC0zLjU1NlpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL1Nwb3RpZnlMb2dvLnRzeFxuaW1wb3J0IHsgdGV4dENvbG9yIH0gZnJvbSBcImNvbG9yaXpyXCI7XG5pbXBvcnQgeyBqc3ggYXMganN4MTcgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIFNwb3RpZnlMb2dvKHsgYmdDb2xvciwgLi4ucmVzdCB9KSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTcoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNTEyIDE2MFwiLCB3aWR0aDogXCIzLjJlbVwiLCAuLi5yZXN0LCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE3KFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTc5LjY1NSAwQzM1LjY2NCAwIDAgMzUuNjYzIDAgNzkuNjU0YzAgNDMuOTkzIDM1LjY2NCA3OS42NTMgNzkuNjU1IDc5LjY1MyA0My45OTYgMCA3OS42NTYtMzUuNjYgNzkuNjU2LTc5LjY1MyAwLTQzLjk4OC0zNS42Ni03OS42NS03OS42NTctNzkuNjVMNzkuNjU1IDBabTM2LjUzIDExNC44ODRhNC45NjMgNC45NjMgMCAwIDEtNi44MyAxLjY0NmMtMTguNzAyLTExLjQyNC00Mi4yNDYtMTQuMDExLTY5Ljk3My03LjY3NmE0Ljk2NyA0Ljk2NyAwIDAgMS01Ljk0NC0zLjczOCA0Ljk1OCA0Ljk1OCAwIDAgMSAzLjczNC01Ljk0NWMzMC4zNDMtNi45MzMgNTYuMzctMy45NDggNzcuMzY3IDguODg0YTQuOTY1IDQuOTY1IDAgMCAxIDEuNjQ1IDYuODNabTkuNzUtMjEuNjg5Yy0xLjc5OSAyLjkyMi01LjYyMiAzLjg0NS04LjU0MyAyLjA0Ny0yMS40MS0xMy4xNi01NC4wNDktMTYuOTcyLTc5LjM3NC05LjI4NGE2LjIxOSA2LjIxOSAwIDAgMS03Ljc1LTQuMTM4IDYuMjIgNi4yMiAwIDAgMSA0LjE0MS03Ljc0NWMyOC45MjktOC43NzggNjQuODkyLTQuNTI2IDg5LjQ4IDEwLjU4MyAyLjkyIDEuNzk4IDMuODQzIDUuNjIyIDIuMDQ1IDguNTM4Wm0uODM2LTIyLjU4NUMxMDEuMSA1NS4zNjIgNTguNzQyIDUzLjk2IDM0LjIzMSA2MS40Yy0zLjkzNiAxLjE5NC04LjA5OC0xLjAyOC05LjI5LTQuOTY0YTcuNDUzIDcuNDUzIDAgMCAxIDQuOTY1LTkuMjk0YzI4LjEzNy04LjU0MiA3NC45MTItNi44OTIgMTA0LjQ2OSAxMC42NTVhNy40NDEgNy40NDEgMCAwIDEgMi42MDYgMTAuMjA5Yy0yLjA5MiAzLjU0LTYuNjc3IDQuNzA3LTEwLjIwNiAyLjYwNWgtLjAwNFptODkuOTQ0IDIuOTIyYy0xMy43NTQtMy4yOC0xNi4xOTgtNS41ODEtMTYuMTk4LTEwLjQxOCAwLTQuNTcgNC4yOTktNy42NDUgMTAuNy03LjY0NSA2LjIwMiAwIDEyLjM0NyAyLjMzNiAxOC43OTYgNy4xNDMuMTkuMTQ1LjQzNy4yMDMuNjc1LjE2NWEuODg4Ljg4OCAwIDAgMCAuNi0uMzY3bDYuNzE1LTkuNDY2YS45MDMuOTAzIDAgMCAwLS4xNzEtMS4yMjVjLTcuNjc2LTYuMTU3LTE2LjMxMy05LjE1LTI2LjQxNS05LjE1LTE0Ljg0OCAwLTI1LjIyNSA4LjkxMS0yNS4yMjUgMjEuNjYyIDAgMTMuNjczIDguOTUgMTguNTE1IDI0LjQxNyAyMi4yNTIgMTMuMTU1IDMuMDMxIDE1LjM4IDUuNTcgMTUuMzggMTAuMTEgMCA1LjAzMi00LjQ5IDguMTYxLTExLjcxOCA4LjE2MS04LjAyOCAwLTE0LjU4Mi0yLjcxLTIxLjkwNi05LjA0NmEuOTMyLjkzMiAwIDAgMC0uNjU2LS4yMTguODkuODkgMCAwIDAtLjYxOS4zMTNsLTcuNTMzIDguOTZhLjkwNi45MDYgMCAwIDAgLjA4NiAxLjI1NmM4LjUyMiA3LjYxIDE5LjAwNCAxMS42MjQgMzAuMzIzIDExLjYyNCAxNiAwIDI2LjMzOS04Ljc0MiAyNi4zMzktMjIuMjc3LjAyOC0xMS40MjEtNi44MS0xNy43NDYtMjMuNTYxLTIxLjgyMWwtLjAyOS0uMDEzWm01OS43OTItMTMuNTY0Yy02LjkzNCAwLTEyLjYyMiAyLjczMi0xNy4zMjEgOC4zM3YtNi4zYzAtLjQ5OC0uNC0uOTAzLS44OTQtLjkwM2gtMTIuMzE4YS44OTkuODk5IDAgMCAwLS44OTQuOTAydjcwLjAwOWMwIC40OTQuNC45MDMuODk0LjkwM2gxMi4zMThhLjkwMS45MDEgMCAwIDAgLjg5NC0uOTAzdi0yMi4wOTdjNC42OTkgNS4yNiAxMC4zODcgNy44MzggMTcuMzIgNy44MzggMTIuODkgMCAyNS45NC05LjkyIDI1Ljk0LTI4Ljg4Ni4wMTktMTguOTctMTMuMDMyLTI4Ljg5NC0yNS45My0yOC44OTRsLS4wMS4wMDFabTExLjYxNCAyOC44OTNjMCA5LjY1My01Ljk0NSAxNi4zOTctMTQuNDY4IDE2LjM5Ny04LjQxOCAwLTE0Ljc3Mi03LjA0OC0xNC43NzItMTYuMzk3IDAtOS4zNSA2LjM1NC0xNi4zOTcgMTQuNzcyLTE2LjM5NyA4LjM4IDAgMTQuNDY4IDYuODkzIDE0LjQ2OCAxNi4zOTZabTQ3Ljc1OS0yOC44OTNjLTE2LjU5OCAwLTI5LjYwMSAxMi43OC0yOS42MDEgMjkuMSAwIDE2LjE0MyAxMi45MTcgMjguNzg0IDI5LjQwMSAyOC43ODQgMTYuNjU1IDAgMjkuNjk2LTEyLjczNiAyOS42OTYtMjguOTkxIDAtMTYuMi0xMi45NTUtMjguODktMjkuNDk2LTI4Ljg5di0uMDAzWm0wIDQ1LjM4NWMtOC44MjcgMC0xNS40ODUtNy4wOTYtMTUuNDg1LTE2LjQ5NyAwLTkuNDQ0IDYuNDMtMTYuMjk4IDE1LjI4NS0xNi4yOTggOC44ODQgMCAxNS41OCA3LjA5MyAxNS41OCAxNi41MDQgMCA5LjQ0My02LjQ2OCAxNi4yOTEtMTUuMzggMTYuMjkxWm02NC45MzctNDQuMjU4aC0xMy41NTRWNDcuMjRjMC0uNDk3LS40LS45MDItLjg5NC0uOTAySDM3NC4wNWEuOTA2LjkwNiAwIDAgMC0uOTA0LjkwMnYxMy44NTVoLTUuOTE2YS44OTkuODk5IDAgMCAwLS44OTQuOTAydjEwLjU4NGEuOS45IDAgMCAwIC44OTQuOTAzaDUuOTE2djI3LjM5YzAgMTEuMDYyIDUuNTA4IDE2LjY3NCAxNi4zOCAxNi42NzQgNC40MTMgMCA4LjA3NS0uOTE0IDExLjUyOC0yLjg3M2EuODguODggMCAwIDAgLjQ1Ny0uNzh2LTEwLjA4M2EuODk2Ljg5NiAwIDAgMC0uNDI4LS43Ni44NzMuODczIDAgMCAwLS44NzYtLjAzOWMtMi4zNjggMS4xOS00LjY2IDEuNzQxLTcuMjI5IDEuNzQxLTMuOTQ3IDAtNS43MTYtMS43OTgtNS43MTYtNS44MTJWNzMuNDloMTMuNTU0YS44OTkuODk5IDAgMCAwIC44OTQtLjkwM1Y2Mi4wMDNhLjg3My44NzMgMCAwIDAtLjg4NC0uOTAzbC0uMDEtLjAwNVptNDcuMjE3LjA1NHYtMS43MDJjMC01LjAwNiAxLjkyMS03LjIzOCA2LjIyLTcuMjM4IDIuNTcgMCA0LjYzMy41MSA2Ljk0NSAxLjI4YS44OTUuODk1IDAgMCAwIDEuMTgtLjg1OGwtLjAwMS0xMC4zNzdhLjg5MS44OTEgMCAwIDAtLjYzNy0uODY1Yy0yLjQzNS0uNzI2LTUuNTU1LTEuNDctMTAuMjM1LTEuNDctMTEuMzY3IDAtMTcuMzg4IDYuNDA1LTE3LjM4OCAxOC41MTZ2Mi42MDZoLTUuOTE2YS45MDYuOTA2IDAgMCAwLS45MDQuOTAydjEwLjYzOGMwIC40OTcuNDEuOTAzLjkwNC45MDNoNS45MTZ2NDIuMjM3YzAgLjUwNC40MS45MDQuOTA0LjkwNGgxMi4zMDhjLjUwNCAwIC45MDQtLjQuOTA0LS45MDRWNzMuNDg3aDExLjVsMTcuNjE2IDQyLjIzNGMtMS45OTggNC40MzMtMy45NjcgNS4zMTctNi42NSA1LjMxNy0yLjE2OCAwLTQuNDYtLjY0Ni02Ljc5LTEuOTNhLjk4Ljk4IDAgMCAwLS43MTQtLjA2Ny44OTYuODk2IDAgMCAwLS41MzMuNDg1bC00LjE3NSA5LjE2YS45LjkgMCAwIDAgLjM5IDEuMTdjNC4zNTYgMi4zNTkgOC4yODQgMy4zNjcgMTMuMTQ1IDMuMzY3IDkuMDkzIDAgMTQuMTI1LTQuMjQyIDE4LjU0OC0xNS42MzdsMjEuMzY0LTU1LjIwNGEuODguODggMCAwIDAtLjA5NS0uODM4Ljg3OC44NzggMCAwIDAtLjczMy0uMzkyaC0xMi44MjJhLjkwMS45MDEgMCAwIDAtLjg1Ni42MDVsLTEzLjEzNiAzNy41MDktMTQuMzgyLTM3LjUzNGEuODk4Ljg5OCAwIDAgMC0uODM3LS41OGgtMjEuMDR2LS4wMDNabS0yNy4zNzUtLjA1NGgtMTIuMzE4YS45MDcuOTA3IDAgMCAwLS45MDMuOTAydjUzLjcyNGMwIC41MDQuNDA5LjkwNC45MDMuOTA0aDEyLjMxOGMuNDk1IDAgLjkwNC0uNC45MDQtLjkwNHYtNTMuNzJhLjkuOSAwIDAgMC0uOTA0LS45MDN2LS4wMDNabS02LjA4OC0yNC40NjRjLTQuODggMC04LjgzNiAzLjk1LTguODM2IDguODI4YTguODM1IDguODM1IDAgMCAwIDguODM2IDguODM2YzQuODggMCA4LjgyNy0zLjk1NCA4LjgyNy04LjgzNmE4LjgzIDguODMgMCAwIDAtOC44MjctOC44MjhaXCIsXG4gICAgICBmaWxsOiB0ZXh0Q29sb3IoYmdDb2xvcilcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL0luZm8udHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MTgsIGpzeHMgYXMganN4czQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBpbWFnZVNpemUgPSA2NDtcbnZhciBpY29uU2l6ZSA9IDMyO1xudmFyIFdyYXBwZXI2ID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgdGV4dEFsaWduOiBcImxlZnRcIixcbiAgICBcIj4gYVwiOiB7XG4gICAgICBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIsXG4gICAgICB0ZXh0RGVjb3JhdGlvbjogXCJub25lXCIsXG4gICAgICBtaW5IZWlnaHQ6IHB4KDY0KSxcbiAgICAgIG1pbldpZHRoOiBweCg2NCksXG4gICAgICBcIiY6aG92ZXJcIjoge1xuICAgICAgICB0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgYnV0dG9uOiB7XG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBmb250U2l6ZTogcHgoMTYpLFxuICAgICAgaGVpZ2h0OiBweChpY29uU2l6ZSArIDgpLFxuICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICB3aWR0aDogcHgoaWNvblNpemUpXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgaXNDb21wYWN0TGF5b3V0ID0gc3R5bGUubGF5b3V0ID09PSBcImNvbXBhY3RcIjtcbiAgICBjb25zdCBzdHlsZXMgPSB7fTtcbiAgICBpZiAoaXNDb21wYWN0TGF5b3V0KSB7XG4gICAgICBzdHlsZXMuYm9yZGVyQm90dG9tID0gYDFweCBzb2xpZCAke2ZhZGUoc3R5bGUuYywgNDApfWA7XG4gICAgICBzdHlsZXNbXCI+IGFcIl0gPSB7XG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBtYXJnaW46IFwiMCBhdXRvXCIsXG4gICAgICAgIG1heFdpZHRoOiBweCg2NDApLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiBcIjEwMCVcIixcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgaW1nOiB7XG4gICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIG1heFdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgIHRvcDogMFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XG4gICAgICBzdHlsZXMuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgc3R5bGVzLm1pbkhlaWdodCA9IHB4KDgwKTtcbiAgICAgIHN0eWxlc1tcIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweClcIl0gPSB7XG4gICAgICAgIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke2ZhZGUoc3R5bGUuYywgNDApfWAsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiBweCg4KSxcbiAgICAgICAgZGlzcGxheTogXCJub25lXCIsXG4gICAgICAgIHdpZHRoOiBcIjEwMCVcIlxuICAgICAgfTtcbiAgICAgIHN0eWxlcy5pbWcgPSB7XG4gICAgICAgIGhlaWdodDogcHgoaW1hZ2VTaXplKSxcbiAgICAgICAgd2lkdGg6IHB4KGltYWdlU2l6ZSlcbiAgICAgIH07XG4gICAgICBzdHlsZXNbXCImLnJzd3BfX2FjdGl2ZVwiXSA9IHtcbiAgICAgICAgXCJAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpXCI6IHtcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIlxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYnV0dG9uOiB7XG4gICAgICAgIGNvbG9yOiBzdHlsZS5jLFxuICAgICAgICBcIiYucnN3cF9fYWN0aXZlXCI6IHtcbiAgICAgICAgICBjb2xvcjogc3R5bGUuYWN0aXZlQ29sb3JcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC4uLnN0eWxlc1xuICAgIH07XG4gIH0sXG4gIFwiSW5mb1JTV1BcIlxuKTtcbnZhciBDb250ZW50V3JhcHBlciA9IHN0eWxlZChcImRpdlwiKShcbiAge1xuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgXCI+IGFcIjoge1xuICAgICAgZm9udFNpemU6IHB4KDIyKSxcbiAgICAgIG1hcmdpblRvcDogcHgoNClcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+IHtcbiAgICBjb25zdCBpc0NvbXBhY3RMYXlvdXQgPSBzdHlsZS5sYXlvdXQgPT09IFwiY29tcGFjdFwiO1xuICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgIGlmIChpc0NvbXBhY3RMYXlvdXQpIHtcbiAgICAgIHN0eWxlcy5wYWRkaW5nID0gcHgoOCk7XG4gICAgICBzdHlsZXMud2lkdGggPSBcIjEwMCVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzLm1pbkhlaWdodCA9IHB4KGltYWdlU2l6ZSk7XG4gICAgICBpZiAoIXN0eWxlLmhpZGVDb3ZlckFydCkge1xuICAgICAgICBzdHlsZXMubWFyZ2luTGVmdCA9IHB4KDgpO1xuICAgICAgICBzdHlsZXMud2lkdGggPSBgY2FsYygxMDAlIC0gJHtweChpbWFnZVNpemUgKyA4KX0pYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlcy53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBcIkNvbnRlbnRXcmFwcGVyUlNXUFwiXG4pO1xudmFyIENvbnRlbnQgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJzdGFydFwiLFxuICAgICdbZGF0YS10eXBlPVwidGl0bGUtYXJ0aXN0LXdyYXBwZXJcIl0nOiB7XG4gICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICAgIGRpdjoge1xuICAgICAgICBtYXJnaW5MZWZ0OiBgLSR7cHgoOCl9YCxcbiAgICAgICAgd2hpdGVTcGFjZTogXCJub3dyYXBcIlxuICAgICAgfVxuICAgIH0sXG4gICAgcDoge1xuICAgICAgZm9udFNpemU6IHB4KDE0KSxcbiAgICAgIGxpbmVIZWlnaHQ6IDEuMyxcbiAgICAgIHBhZGRpbmdMZWZ0OiBweCg4KSxcbiAgICAgIHBhZGRpbmdSaWdodDogcHgoOCksXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBcIiY6bnRoLW9mLXR5cGUoMSlcIjoge1xuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBkaXNwbGF5OiBcImlubGluZS1mbGV4XCJcbiAgICAgIH0sXG4gICAgICBcIiY6bnRoLW9mLXR5cGUoMilcIjoge1xuICAgICAgICBmb250U2l6ZTogcHgoMTIpXG4gICAgICB9XG4gICAgfSxcbiAgICBzcGFuOiB7XG4gICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgbWFza0ltYWdlQ29sb3IgPSBnZXRCZ0NvbG9yKHN0eWxlLmJnQ29sb3IsIHN0eWxlLnRyYWNrTmFtZUNvbG9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgJ1tkYXRhLXR5cGU9XCJ0aXRsZS1hcnRpc3Qtd3JhcHBlclwiXSc6IHtcbiAgICAgICAgY29sb3I6IHN0eWxlLnRyYWNrTmFtZUNvbG9yLFxuICAgICAgICBtYXhXaWR0aDogYGNhbGMoMTAwJSAtICR7cHgoc3R5bGUuc2hvd1NhdmVJY29uID8gaWNvblNpemUgOiAwKX0pYCxcbiAgICAgICAgZGl2OiB7XG4gICAgICAgICAgXCItd2Via2l0LW1hc2staW1hZ2VcIjogYGxpbmVhci1ncmFkaWVudCg5MGRlZyx0cmFuc3BhcmVudCAwLCAke21hc2tJbWFnZUNvbG9yfSA2cHgsICR7bWFza0ltYWdlQ29sb3J9IGNhbGMoMTAwJSAtIDEycHgpLHRyYW5zcGFyZW50KWBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHA6IHtcbiAgICAgICAgXCImOm50aC1vZi10eXBlKDEpXCI6IHtcbiAgICAgICAgICBjb2xvcjogc3R5bGUudHJhY2tOYW1lQ29sb3IsXG4gICAgICAgICAgYToge1xuICAgICAgICAgICAgY29sb3I6IHN0eWxlLnRyYWNrTmFtZUNvbG9yXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIiY6bnRoLW9mLXR5cGUoMilcIjoge1xuICAgICAgICAgIGNvbG9yOiBzdHlsZS50cmFja0FydGlzdENvbG9yLFxuICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgIGNvbG9yOiBzdHlsZS50cmFja0FydGlzdENvbG9yXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgXCJDb250ZW50UlNXUFwiXG4pO1xuZnVuY3Rpb24gSW5mbyhwcm9wcykge1xuICBjb25zdCB7XG4gICAgaGlkZUF0dHJpYnV0aW9uLFxuICAgIGhpZGVDb3ZlckFydCxcbiAgICBpc0FjdGl2ZSxcbiAgICBsYXlvdXQsXG4gICAgbG9jYWxlLFxuICAgIG9uRmF2b3JpdGVTdGF0dXNDaGFuZ2UsXG4gICAgc2hvd1NhdmVJY29uLFxuICAgIHN0eWxlczogeyBhY3RpdmVDb2xvciwgYmdDb2xvciwgY29sb3IsIGhlaWdodCwgdHJhY2tBcnRpc3RDb2xvciwgdHJhY2tOYW1lQ29sb3IgfSxcbiAgICB0b2tlbixcbiAgICB0cmFjazogeyBhcnRpc3RzID0gW10sIGlkLCBpbWFnZSwgbmFtZSwgdXJpIH0sXG4gICAgdXBkYXRlU2F2ZWRTdGF0dXNcbiAgfSA9IHByb3BzO1xuICBjb25zdCBbaXNTYXZlZCwgc2V0SXNTYXZlZF0gPSB1c2VTdGF0ZTMoZmFsc2UpO1xuICBjb25zdCBpc01vdW50ZWQgPSB1c2VSZWYzKGZhbHNlKTtcbiAgY29uc3QgcHJldmlvdXNJZCA9IHVzZVByZXZpb3VzKGlkKTtcbiAgY29uc3QgaXNDb21wYWN0TGF5b3V0ID0gbGF5b3V0ID09PSBcImNvbXBhY3RcIjtcbiAgY29uc3QgdXBkYXRlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgICBpZiAoIWlzTW91bnRlZC5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldElzU2F2ZWQoc3RhdGUpO1xuICB9O1xuICBjb25zdCBzZXRTdGF0dXMgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc01vdW50ZWQuY3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodXBkYXRlU2F2ZWRTdGF0dXMgJiYgaWQpIHtcbiAgICAgIHVwZGF0ZVNhdmVkU3RhdHVzKChuZXdTdGF0dXMpID0+IHtcbiAgICAgICAgdXBkYXRlU3RhdGUobmV3U3RhdHVzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBjaGVja1RyYWNrc1N0YXR1cyh0b2tlbiwgaWQpO1xuICAgIGNvbnN0IFtpc0Zhdm9yaXRlXSA9IHN0YXR1cyB8fCBbZmFsc2VdO1xuICAgIHVwZGF0ZVN0YXRlKGlzRmF2b3JpdGUpO1xuICAgIG9uRmF2b3JpdGVTdGF0dXNDaGFuZ2UoaXNTYXZlZCk7XG4gIH07XG4gIHVzZUVmZmVjdDMoKCkgPT4ge1xuICAgIGlzTW91bnRlZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBpZiAoc2hvd1NhdmVJY29uICYmIGlkKSB7XG4gICAgICBzZXRTdGF0dXMoKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzTW91bnRlZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW10pO1xuICB1c2VFZmZlY3QzKCgpID0+IHtcbiAgICBpZiAoc2hvd1NhdmVJY29uICYmIHByZXZpb3VzSWQgIT09IGlkICYmIGlkKSB7XG4gICAgICB1cGRhdGVTdGF0ZShmYWxzZSk7XG4gICAgICBzZXRTdGF0dXMoKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBoYW5kbGVDbGlja0ljb24gPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGlzU2F2ZWQpIHtcbiAgICAgIGF3YWl0IHJlbW92ZVRyYWNrcyh0b2tlbiwgaWQpO1xuICAgICAgdXBkYXRlU3RhdGUoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBzYXZlVHJhY2tzKHRva2VuLCBpZCk7XG4gICAgICB1cGRhdGVTdGF0ZSh0cnVlKTtcbiAgICB9XG4gICAgb25GYXZvcml0ZVN0YXR1c0NoYW5nZSghaXNTYXZlZCk7XG4gIH07XG4gIGNvbnN0IHRpdGxlID0gZ2V0U3BvdGlmeUxpbmtUaXRsZShuYW1lLCBsb2NhbGUudGl0bGUpO1xuICBsZXQgZmF2b3JpdGU7XG4gIGlmIChzaG93U2F2ZUljb24gJiYgaWQpIHtcbiAgICBmYXZvcml0ZSA9IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcbiAgICAgIFwiYnV0dG9uXCIsXG4gICAgICB7XG4gICAgICAgIFwiYXJpYS1sYWJlbFwiOiBpc1NhdmVkID8gbG9jYWxlLnJlbW92ZVRyYWNrIDogbG9jYWxlLnNhdmVUcmFjayxcbiAgICAgICAgY2xhc3NOYW1lOiBgQnV0dG9uUlNXUCR7aXNTYXZlZCA/IFwiIHJzd3BfX2FjdGl2ZVwiIDogXCJcIn1gLFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVDbGlja0ljb24sXG4gICAgICAgIHRpdGxlOiBpc1NhdmVkID8gbG9jYWxlLnJlbW92ZVRyYWNrIDogbG9jYWxlLnNhdmVUcmFjayxcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgY2hpbGRyZW46IGlzU2F2ZWQgPyAvKiBAX19QVVJFX18gKi8ganN4MTgoRmF2b3JpdGUsIHt9KSA6IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChGYXZvcml0ZU91dGxpbmUsIHt9KVxuICAgICAgfVxuICAgICk7XG4gIH1cbiAgY29uc3QgY29udGVudCA9IHt9O1xuICBjb25zdCBjbGFzc2VzID0gW107XG4gIGlmIChpc0FjdGl2ZSkge1xuICAgIGNsYXNzZXMucHVzaChcInJzd3BfX2FjdGl2ZVwiKTtcbiAgfVxuICBpZiAoaXNDb21wYWN0TGF5b3V0KSB7XG4gICAgY29udGVudC5pbWFnZSA9IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcImltZ1wiLCB7IGFsdDogbmFtZSwgc3JjOiBpbWFnZSB9KTtcbiAgfVxuICBpZiAoIWlkKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcImRpdlwiLCB7fSk7XG4gIH1cbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3hzNChcbiAgICBXcmFwcGVyNixcbiAgICB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzZXMuam9pbihcIiBcIiksXG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJJbmZvXCIsXG4gICAgICBzdHlsZToge1xuICAgICAgICBhY3RpdmVDb2xvcixcbiAgICAgICAgYzogY29sb3IsXG4gICAgICAgIGg6IGhlaWdodCxcbiAgICAgICAgbGF5b3V0LFxuICAgICAgICBzaG93U2F2ZUljb25cbiAgICAgIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICAhaGlkZUNvdmVyQXJ0ICYmIC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcbiAgICAgICAgICBcImFcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogdGl0bGUsXG4gICAgICAgICAgICBocmVmOiBnZXRTcG90aWZ5TGluayh1cmkpLFxuICAgICAgICAgICAgcmVsOiBcIm5vcmVmZXJyZXJcIixcbiAgICAgICAgICAgIHRhcmdldDogXCJfYmxhbmtcIixcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcImltZ1wiLCB7IGFsdDogbmFtZSwgc3JjOiBpbWFnZSB9KVxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeHM0KFxuICAgICAgICAgIENvbnRlbnRXcmFwcGVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGhpZGVDb3ZlckFydCxcbiAgICAgICAgICAgICAgbGF5b3V0LFxuICAgICAgICAgICAgICBzaG93U2F2ZUljb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAhIW5hbWUgJiYgLyogQF9fUFVSRV9fICovIGpzeHM0KFxuICAgICAgICAgICAgICAgIENvbnRlbnQsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYmdDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LFxuICAgICAgICAgICAgICAgICAgICBzaG93U2F2ZUljb24sXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQXJ0aXN0Q29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrTmFtZUNvbG9yXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDE4KFwiZGl2XCIsIHsgXCJkYXRhLXR5cGVcIjogXCJ0aXRsZS1hcnRpc3Qtd3JhcHBlclwiLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeHM0KFwiZGl2XCIsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4MTgoXCJwXCIsIHsgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcInNwYW5cIiwgeyBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE4KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogZ2V0U3BvdGlmeUxpbmsodXJpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsOiBcIm5vcmVmZXJyZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICApIH0pIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcInBcIiwgeyB0aXRsZTogYXJ0aXN0cy5tYXAoKGQpID0+IGQubmFtZSkuam9pbihcIiwgXCIpLCBjaGlsZHJlbjogYXJ0aXN0cy5tYXAoKGFydGlzdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFydGlzdFRpdGxlID0gZ2V0U3BvdGlmeUxpbmtUaXRsZShhcnRpc3QubmFtZSwgbG9jYWxlLnRpdGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4czQoXCJzcGFuXCIsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPyBcIiwgXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4MTgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGFydGlzdFRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogZ2V0U3BvdGlmeUxpbmsoYXJ0aXN0LnVyaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGFydGlzdFRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IGFydGlzdC5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdIH0sIGFydGlzdC51cmkpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pIH0pXG4gICAgICAgICAgICAgICAgICAgIF0gfSkgfSksXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAhaGlkZUF0dHJpYnV0aW9uICYmIC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcbiAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogXCJQbGF5IG9uIFNwb3RpZnlcIixcbiAgICAgICAgICAgICAgICAgIGhyZWY6IGdldFNwb3RpZnlMaW5rKHVyaSksXG4gICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChTcG90aWZ5TG9nbywgeyBiZ0NvbG9yIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICBdXG4gICAgfVxuICApO1xufVxudmFyIEluZm9fZGVmYXVsdCA9IG1lbW81KEluZm8pO1xuXG4vLyBzcmMvY29tcG9uZW50cy9Mb2FkZXIudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MTkgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBXcmFwcGVyNyA9IHN0eWxlZChcImRpdlwiKShcbiAge1xuICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAganN1dGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICBcIj4gZGl2XCI6IHtcbiAgICAgIGJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICAgIGJvcmRlclN0eWxlOiBcInNvbGlkXCIsXG4gICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICBsZWZ0OiBcIjUwJVwiLFxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHRvcDogXCI1MCVcIixcbiAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIixcbiAgICAgIHdpZHRoOiAwXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgcHVsc2UgPSBrZXlmcmFtZXMoe1xuICAgICAgXCIwJVwiOiB7XG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgd2lkdGg6IDBcbiAgICAgIH0sXG4gICAgICBcIjMwJVwiOiB7XG4gICAgICAgIGJvcmRlcldpZHRoOiBweCg4KSxcbiAgICAgICAgaGVpZ2h0OiBweChzdHlsZS5sb2FkZXJTaXplKSxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgd2lkdGg6IHB4KHN0eWxlLmxvYWRlclNpemUpXG4gICAgICB9LFxuICAgICAgXCIxMDAlXCI6IHtcbiAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogcHgoc3R5bGUubG9hZGVyU2l6ZSksXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHdpZHRoOiBweChzdHlsZS5sb2FkZXJTaXplKVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IHB4KHN0eWxlLmgpLFxuICAgICAgXCI+IGRpdlwiOiB7XG4gICAgICAgIGFuaW1hdGlvbjogYCR7cHVsc2V9IDEuMTVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjIxNSwgMC42MSwgMC4zNTUsIDEpYCxcbiAgICAgICAgYm9yZGVyQ29sb3I6IHN0eWxlLmxvYWRlckNvbG9yLFxuICAgICAgICBoZWlnaHQ6IHB4KHN0eWxlLmxvYWRlclNpemUpLFxuICAgICAgICB3aWR0aDogcHgoc3R5bGUubG9hZGVyU2l6ZSlcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBcIkxvYWRlclJTV1BcIlxuKTtcbmZ1bmN0aW9uIExvYWRlcih7IHN0eWxlczogeyBoZWlnaHQsIGxvYWRlckNvbG9yLCBsb2FkZXJTaXplIH0gfSkge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDE5KFdyYXBwZXI3LCB7IFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIkxvYWRlclwiLCBzdHlsZTogeyBoOiBoZWlnaHQsIGxvYWRlckNvbG9yLCBsb2FkZXJTaXplIH0sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTkoXCJkaXZcIiwge30pIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9QbGF5ZXIudHN4XG5pbXBvcnQgeyBmb3J3YXJkUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBqc3ggYXMganN4MjAgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBQbGF5ZXIgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjaGlsZHJlbixcbiAgICBzdHlsZXM6IHsgYmdDb2xvciwgaGVpZ2h0IH0sXG4gICAgLi4ucmVzdFxuICB9ID0gcHJvcHM7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjAoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICByZWYsXG4gICAgICBjbGFzc05hbWU6IFwiUGxheWVyUlNXUFwiLFxuICAgICAgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiUGxheWVyXCIsXG4gICAgICBzdHlsZTogeyBiYWNrZ3JvdW5kOiBiZ0NvbG9yLCBtaW5IZWlnaHQ6IHB4KGhlaWdodCkgfSxcbiAgICAgIC4uLnJlc3QsXG4gICAgICBjaGlsZHJlblxuICAgIH1cbiAgKTtcbn0pO1xudmFyIFBsYXllcl9kZWZhdWx0ID0gUGxheWVyO1xuXG4vLyBzcmMvY29tcG9uZW50cy9Wb2x1bWUudHN4XG5pbXBvcnQgeyB1c2VDYWxsYmFjayBhcyB1c2VDYWxsYmFjazIsIHVzZUVmZmVjdCBhcyB1c2VFZmZlY3Q0LCB1c2VSZWYgYXMgdXNlUmVmNCwgdXNlU3RhdGUgYXMgdXNlU3RhdGU0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmFuZ2VTbGlkZXIyIGZyb20gXCJAZ2lsYmFyYmFyYS9yZWFjdC1yYW5nZS1zbGlkZXJcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvVm9sdW1lSGlnaC50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gyMSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gVm9sdW1lSGlnaChwcm9wcykge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDIxKFxuICAgIFwic3ZnXCIsXG4gICAge1xuICAgICAgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiVm9sdW1lSGlnaFwiLFxuICAgICAgaGVpZ2h0OiBcIjFlbVwiLFxuICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLFxuICAgICAgdmlld0JveDogXCIwIDAgNjQgNjRcIixcbiAgICAgIHdpZHRoOiBcIjFlbVwiLFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDIxKFxuICAgICAgICBcInBhdGhcIixcbiAgICAgICAge1xuICAgICAgICAgIGQ6IFwiTTM3Ljk2MyAzLjQwMmEyLjk4OSAyLjk4OSAwIDAgMSAxLjUgMi41OTZ2NTJhMyAzIDAgMCAxLTQuNSAyLjZsLTI3LjctMTZDLjMyIDQwLjU3Mi0yLjA2IDMxLjY4OCAxLjk0MyAyNC43M2ExNC41NTYgMTQuNTU2IDAgMCAxIDUuMzItNS4zMjhsMjcuNy0xNmEzIDMgMCAwIDEgMyAwWk00NSA5LjU0MmEyMy4wMDggMjMuMDA4IDAgMCAxIDAgNDQuOTEyVjQ4LjI1YTE3LjAwOCAxNy4wMDggMCAwIDAgMC0zMi41MDhabS0xMS41MzIgMS42NTYtMjMuMiAxMy40YTguNTU2IDguNTU2IDAgMCAwIDAgMTQuOGwyMy4yIDEzLjR2LTQxLjZaTTQ1IDIyLjIzOGExMSAxMSAwIDAgMSAwIDE5LjUydi0xOS41MlpcIixcbiAgICAgICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL1ZvbHVtZUxvdy50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gyMiB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gVm9sdW1lTG93KHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjIoXG4gICAgXCJzdmdcIixcbiAgICB7XG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJWb2x1bWVMb3dcIixcbiAgICAgIGhlaWdodDogXCIxZW1cIixcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIixcbiAgICAgIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsXG4gICAgICB3aWR0aDogXCIxZW1cIixcbiAgICAgIC4uLnByb3BzLFxuICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gyMihcbiAgICAgICAgXCJwYXRoXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkOiBcIk0zNy45NjMgMy4zOThhMyAzIDAgMCAxIDEuNSAyLjZ2NTJhMyAzIDAgMCAxLTQuNSAyLjZsLTI3LjctMTZDLjMyIDQwLjU3Mi0yLjA2IDMxLjY4OCAxLjk0MyAyNC43M2ExNC41NTYgMTQuNTU2IDAgMCAxIDUuMzItNS4zMjhsMjcuNy0xNmEzIDMgMCAwIDEgMyAwdi0uMDA0Wm0tMjcuNjk2IDIxLjJhOC41NTYgOC41NTYgMCAwIDAgMCAxNC44bDIzLjIgMTMuNHYtNDEuNmwtMjMuMiAxMy40Wk00NSA0MS43NTh2LTE5LjUyYTExIDExIDAgMCAxIDAgMTkuNTJaXCIsXG4gICAgICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICApO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9Wb2x1bWVNaWQudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MjMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIFZvbHVtZUhpZ2gyKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjMoXG4gICAgXCJzdmdcIixcbiAgICB7XG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJWb2x1bWVNaWRcIixcbiAgICAgIGhlaWdodDogXCIxZW1cIixcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIixcbiAgICAgIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsXG4gICAgICB3aWR0aDogXCIxZW1cIixcbiAgICAgIC4uLnByb3BzLFxuICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gyMyhcbiAgICAgICAgXCJwYXRoXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkOiBcIk0zNy45NjMgMy4zOThhMyAzIDAgMCAxIDEuNSAyLjZ2NTJhMyAzIDAgMCAxLTQuNSAyLjZsLTI3LjctMTZDLjMyIDQwLjU3Mi0yLjA2IDMxLjY4OCAxLjk0MyAyNC43M2ExNC41NTYgMTQuNTU2IDAgMCAxIDUuMzItNS4zMjhsMjcuNy0xNmEzIDMgMCAwIDEgMyAwdi0uMDA0Wm0tMjcuNjk2IDIxLjJhOC41NTYgOC41NTYgMCAwIDAgMCAxNC44bDIzLjIgMTMuNHYtNDEuNmwtMjMuMiAxMy40Wk00NSA0OC45NDZhMTguMDA4IDE4LjAwOCAwIDAgMCAwLTMzLjg5NnY2LjZhMTEuOTk2IDExLjk5NiAwIDAgMSAwIDIwLjd2Ni41OTZaXCIsXG4gICAgICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICApO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9Wb2x1bWVNdXRlLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDI0IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBWb2x1bWVNdXRlKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjQoXG4gICAgXCJzdmdcIixcbiAgICB7XG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJWb2x1bWVNdXRlXCIsXG4gICAgICBoZWlnaHQ6IFwiMWVtXCIsXG4gICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsXG4gICAgICB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLFxuICAgICAgd2lkdGg6IFwiMWVtXCIsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MjQoXG4gICAgICAgIFwicGF0aFwiLFxuICAgICAgICB7XG4gICAgICAgICAgZDogXCJNMzQuOTYzIDMuNDAyYTMgMyAwIDAgMSA0LjUgMi42djcuNjI0YTE5LjAzIDE5LjAzIDAgMCAwLTYgMi43NzZ2LTUuMmwtMjMuMiAxMy40YTguNTcgOC41NyAwIDAgMC0zLjEyIDMuMTI4IDguNTY0IDguNTY0IDAgMCAwIDMuMTI0IDExLjY4bDIzLjE5NiAxMy4zOTJ2LTUuMmExOC45MiAxOC45MiAwIDAgMCA2IDIuNzc2djcuNjI0YTMgMyAwIDAgMS00LjUgMi41OTZsLTI3LjctMTZhMTQuNTU2IDE0LjU1NiAwIDAgMS01LjMyLTUuMzI4Qy0yLjA2IDMyLjMxMy4zMiAyMy40MjggNy4yNjMgMTkuNDAybDI3LjctMTZabTE3LjM1NCAxNy42YTMgMyAwIDAgMSAyLjEyMiA1LjEybC01Ljg4IDUuODggNS44NzYgNS44OGEzIDMgMCAwIDEtNC4yNCA0LjI0bC01Ljg4LTUuODgtNS44OCA1Ljg4YTMgMyAwIDEgMS00LjM4NS00LjA5NWw2LjAyNS02LjAyNS01Ljg3Ni01Ljg4YTMgMyAwIDAgMSA0LjIzNi00LjI0bDUuODggNS44OCA1Ljg4LTUuODhhMyAzIDAgMCAxIDIuMTIyLS44OFpcIixcbiAgICAgICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL1ZvbHVtZS50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gyNSwganN4cyBhcyBqc3hzNSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFdyYXBwZXJXaXRoVG9nZ2xlID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgZGlzcGxheTogXCJub25lXCIsXG4gICAgXCJwb2ludGVyLWV2ZW50c1wiOiBcImFsbFwiLFxuICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgekluZGV4OiAyMCxcbiAgICBcIj4gZGl2XCI6IHtcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBweCg0KSxcbiAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgZmlsdGVyOiBcImRyb3Atc2hhZG93KDFweCAxcHggNnB4IHJnYmEoMCwgMCwgMCwgMC41KSlcIixcbiAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICBsZWZ0OiBcIi00cHhcIixcbiAgICAgIHBhZGRpbmc6IHB4KDE2KSxcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICBcIj4gc3BhblwiOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgYm9yZGVyTGVmdDogYDZweCBzb2xpZCB0cmFuc3BhcmVudGAsXG4gICAgICAgIGJvcmRlclJpZ2h0OiBgNnB4IHNvbGlkIHRyYW5zcGFyZW50YCxcbiAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgd2lkdGg6IDBcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiPiBidXR0b25cIjoge1xuICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgZm9udFNpemU6IHB4KDI0KSxcbiAgICAgIGhlaWdodDogcHgoMzIpLFxuICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICB3aWR0aDogcHgoMzIpXG4gICAgfSxcbiAgICBcIkBtZWRpYSAoYW55LXBvaW50ZXI6IGZpbmUpXCI6IHtcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxuICAgIH1cbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4ge1xuICAgIGNvbnN0IGlzQ29tcGFjdCA9IHN0eWxlLmxheW91dCA9PT0gXCJjb21wYWN0XCI7XG4gICAgY29uc3Qgc3BhblN0eWxlcyA9IGlzQ29tcGFjdCA/IHtcbiAgICAgIGJvdHRvbTogYC0ke3B4KDYpfWAsXG4gICAgICBib3JkZXJUb3A6IGA2cHggc29saWQgIzAwMGBcbiAgICB9IDoge1xuICAgICAgW3N0eWxlLnAgPT09IFwidG9wXCIgPyBcImJvcmRlci1ib3R0b21cIiA6IFwiYm9yZGVyLXRvcFwiXTogYDZweCBzb2xpZCAjMDAwYCxcbiAgICAgIFtzdHlsZS5wXTogXCItNnB4XCJcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBcIj4gYnV0dG9uXCI6IHtcbiAgICAgICAgY29sb3I6IHN0eWxlLmNcbiAgICAgIH0sXG4gICAgICBcIj4gZGl2XCI6IHtcbiAgICAgICAgW2lzQ29tcGFjdCA/IFwiYm90dG9tXCIgOiBzdHlsZS5wXTogXCIxMzAlXCIsXG4gICAgICAgIFwiPiBzcGFuXCI6IHNwYW5TdHlsZXNcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBcIlZvbHVtZVJTV1BcIlxuKTtcbnZhciBXcmFwcGVySW5saW5lID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgZGlzcGxheTogXCJub25lXCIsXG4gICAgcGFkZGluZzogYDAgJHtweCg4KX1gLFxuICAgIFwicG9pbnRlci1ldmVudHNcIjogXCJhbGxcIixcbiAgICBcIj4gZGl2XCI6IHtcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgcGFkZGluZzogYDAgJHtweCg1KX1gLFxuICAgICAgd2lkdGg6IHB4KDEwMClcbiAgICB9LFxuICAgIFwiPiBzcGFuXCI6IHtcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgZm9udFNpemU6IHB4KDI0KVxuICAgIH0sXG4gICAgXCJAbWVkaWEgKGFueS1wb2ludGVyOiBmaW5lKVwiOiB7XG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgZGlzcGxheTogXCJmbGV4XCJcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+ICh7XG4gICAgY29sb3I6IHN0eWxlLmNcbiAgfSksXG4gIFwiVm9sdW1lSW5saW5lUlNXUFwiXG4pO1xuZnVuY3Rpb24gVm9sdW1lKHByb3BzKSB7XG4gIGNvbnN0IHsgaW5saW5lVm9sdW1lLCBsYXlvdXQsIGxvY2FsZSwgcGxheWVyUG9zaXRpb24sIHNldFZvbHVtZTogc2V0Vm9sdW1lMiwgc3R5bGVzLCB2b2x1bWUgfSA9IHByb3BzO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGU0KGZhbHNlKTtcbiAgY29uc3QgW3ZvbHVtZVN0YXRlLCBzZXRWb2x1bWVTdGF0ZV0gPSB1c2VTdGF0ZTQodm9sdW1lKTtcbiAgY29uc3QgdGltZW91dFJlZiA9IHVzZVJlZjQoKTtcbiAgY29uc3QgcHJldmlvdXNWb2x1bWUgPSB1c2VQcmV2aW91cyh2b2x1bWUpO1xuICBjb25zdCBpc01lZGl1bVNjcmVlbiA9IHVzZU1lZGlhUXVlcnkoXCIobWluLXdpZHRoOiA3NjhweClcIik7XG4gIGNvbnN0IGlzSW5saW5lID0gbGF5b3V0ID09PSBcInJlc3BvbnNpdmVcIiAmJiBpbmxpbmVWb2x1bWUgJiYgaXNNZWRpdW1TY3JlZW47XG4gIHVzZUVmZmVjdDQoKCkgPT4ge1xuICAgIGlmIChwcmV2aW91c1ZvbHVtZSAhPT0gdm9sdW1lICYmIHZvbHVtZSAhPT0gdm9sdW1lU3RhdGUpIHtcbiAgICAgIHNldFZvbHVtZVN0YXRlKHZvbHVtZSk7XG4gICAgfVxuICB9LCBbcHJldmlvdXNWb2x1bWUsIHZvbHVtZSwgdm9sdW1lU3RhdGVdKTtcbiAgY29uc3QgaGFuZGxlQ2xpY2tUb2dnbGVMaXN0ID0gdXNlQ2FsbGJhY2syKCgpID0+IHtcbiAgICBzZXRJc09wZW4oKHMpID0+ICFzKTtcbiAgfSwgW10pO1xuICBjb25zdCBoYW5kbGVDaGFuZ2VTbGlkZXIgPSAoeyB4LCB5IH0pID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGlzSW5saW5lID8geCA6IHk7XG4gICAgY29uc3QgY3VycmVudHZvbHVtZSA9IE1hdGgucm91bmQodmFsdWUpIC8gMTAwO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgIHRpbWVvdXRSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFZvbHVtZTIoY3VycmVudHZvbHVtZSk7XG4gICAgfSwgMjUwKTtcbiAgICBzZXRWb2x1bWVTdGF0ZShjdXJyZW50dm9sdW1lKTtcbiAgfTtcbiAgY29uc3QgaGFuZGxlQWZ0ZXJFbmQgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgIH0sIDEwMCk7XG4gIH07XG4gIGxldCBpY29uID0gLyogQF9fUFVSRV9fICovIGpzeDI1KFZvbHVtZUhpZ2gsIHt9KTtcbiAgaWYgKHZvbHVtZSA9PT0gMCkge1xuICAgIGljb24gPSAvKiBAX19QVVJFX18gKi8ganN4MjUoVm9sdW1lTXV0ZSwge30pO1xuICB9IGVsc2UgaWYgKHZvbHVtZSA8PSAwLjQpIHtcbiAgICBpY29uID0gLyogQF9fUFVSRV9fICovIGpzeDI1KFZvbHVtZUxvdywge30pO1xuICB9IGVsc2UgaWYgKHZvbHVtZSA8PSAwLjcpIHtcbiAgICBpY29uID0gLyogQF9fUFVSRV9fICovIGpzeDI1KFZvbHVtZUhpZ2gyLCB7fSk7XG4gIH1cbiAgaWYgKGlzSW5saW5lKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3hzNShXcmFwcGVySW5saW5lLCB7IFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIlZvbHVtZVwiLCBcImRhdGEtdmFsdWVcIjogdm9sdW1lLCBzdHlsZTogeyBjOiBzdHlsZXMuY29sb3IgfSwgY2hpbGRyZW46IFtcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gyNShcInNwYW5cIiwgeyBjaGlsZHJlbjogaWNvbiB9KSxcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gyNShcImRpdlwiLCB7IGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MjUoXG4gICAgICAgIFJhbmdlU2xpZGVyMixcbiAgICAgICAge1xuICAgICAgICAgIGF4aXM6IFwieFwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJ2b2x1bWVcIixcbiAgICAgICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJ2b2x1bWUtYmFyXCIsXG4gICAgICAgICAgb25BZnRlckVuZDogaGFuZGxlQWZ0ZXJFbmQsXG4gICAgICAgICAgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZVNsaWRlcixcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgdGh1bWJCb3JkZXI6IDAsXG4gICAgICAgICAgICAgIHRodW1iQm9yZGVyUmFkaXVzOiBzdHlsZXMuc2xpZGVySGFuZGxlQm9yZGVyUmFkaXVzLFxuICAgICAgICAgICAgICB0aHVtYkNvbG9yOiBzdHlsZXMuc2xpZGVySGFuZGxlQ29sb3IsXG4gICAgICAgICAgICAgIGhlaWdodDogNCxcbiAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgcmFuZ2VDb2xvcjogc3R5bGVzLnNsaWRlckNvbG9yLFxuICAgICAgICAgICAgICB0cmFja0JvcmRlclJhZGl1czogc3R5bGVzLnNsaWRlclRyYWNrQm9yZGVyUmFkaXVzLFxuICAgICAgICAgICAgICB0cmFja0NvbG9yOiBzdHlsZXMuc2xpZGVyVHJhY2tDb2xvclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgeDogdm9sdW1lICogMTAwLFxuICAgICAgICAgIHhNYXg6IDEwMCxcbiAgICAgICAgICB4TWluOiAwXG4gICAgICAgIH1cbiAgICAgICkgfSlcbiAgICBdIH0pO1xuICB9XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjUoQ2xpY2tPdXRzaWRlX2RlZmF1bHQsIHsgaXNBY3RpdmU6IGlzT3Blbiwgb25DbGljazogaGFuZGxlQ2xpY2tUb2dnbGVMaXN0LCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeHM1KFxuICAgIFdyYXBwZXJXaXRoVG9nZ2xlLFxuICAgIHtcbiAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIlZvbHVtZVwiLFxuICAgICAgXCJkYXRhLXZhbHVlXCI6IHZvbHVtZSxcbiAgICAgIHN0eWxlOiB7IGM6IHN0eWxlcy5jb2xvciwgbGF5b3V0LCBwOiBwbGF5ZXJQb3NpdGlvbiB9LFxuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgaXNPcGVuICYmIC8qIEBfX1BVUkVfXyAqLyBqc3hzNShcImRpdlwiLCB7IGNoaWxkcmVuOiBbXG4gICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDI1KFxuICAgICAgICAgICAgUmFuZ2VTbGlkZXIyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBheGlzOiBcInlcIixcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInZvbHVtZVwiLFxuICAgICAgICAgICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJ2b2x1bWUtYmFyXCIsXG4gICAgICAgICAgICAgIG9uQWZ0ZXJFbmQ6IGhhbmRsZUFmdGVyRW5kLFxuICAgICAgICAgICAgICBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlU2xpZGVyLFxuICAgICAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgcmFuZ2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICB0aHVtYkJvcmRlcjogMCxcbiAgICAgICAgICAgICAgICAgIHRodW1iQm9yZGVyUmFkaXVzOiAxMixcbiAgICAgICAgICAgICAgICAgIHRodW1iQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgICAgdGh1bWJTaXplOiAxMixcbiAgICAgICAgICAgICAgICAgIHRyYWNrQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpXCIsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeTogdm9sdW1lICogMTAwLFxuICAgICAgICAgICAgICB5TWF4OiAxMDAsXG4gICAgICAgICAgICAgIHlNaW46IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLFxuICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gyNShcInNwYW5cIiwge30pXG4gICAgICAgIF0gfSksXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gyNShcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBsb2NhbGUudm9sdW1lLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIkJ1dHRvblJTV1BcIixcbiAgICAgICAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrVG9nZ2xlTGlzdCxcbiAgICAgICAgICAgIHRpdGxlOiBsb2NhbGUudm9sdW1lLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBpY29uXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICBdXG4gICAgfVxuICApIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9XcmFwcGVyLnRzeFxuaW1wb3J0IHsgbWVtbyBhcyBtZW1vNiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsganN4IGFzIGpzeDI2IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgU3R5bGVkV3JhcHBlciA9IHN0eWxlZChcImRpdlwiKShcbiAge1xuICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICBcIj4gKlwiOiB7XG4gICAgICB3aWR0aDogXCIxMDAlXCJcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+IHtcbiAgICBsZXQgc3R5bGVzID0ge307XG4gICAgaWYgKHN0eWxlLmxheW91dCA9PT0gXCJyZXNwb25zaXZlXCIpIHtcbiAgICAgIHN0eWxlcyA9IHtcbiAgICAgICAgXCI+ICpcIjoge1xuICAgICAgICAgIFwiQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KVwiOiB7XG4gICAgICAgICAgICB3aWR0aDogXCIzMy4zMzMzJVwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkBtZWRpYSAobWluLXdpZHRoOiA3NjhweClcIjoge1xuICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwicm93XCIsXG4gICAgICAgICAgcGFkZGluZzogYDAgJHtweCg4KX1gXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBtaW5IZWlnaHQ6IHB4KHN0eWxlLmgpLFxuICAgICAgLi4uc3R5bGVzXG4gICAgfTtcbiAgfSxcbiAgXCJXcmFwcGVyUlNXUFwiXG4pO1xuZnVuY3Rpb24gV3JhcHBlcjgocHJvcHMpIHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgbGF5b3V0LCBzdHlsZXMgfSA9IHByb3BzO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDI2KFN0eWxlZFdyYXBwZXIsIHsgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiV3JhcHBlclwiLCBzdHlsZTogeyBoOiBzdHlsZXMuaGVpZ2h0LCBsYXlvdXQgfSwgY2hpbGRyZW4gfSk7XG59XG52YXIgV3JhcHBlcl9kZWZhdWx0ID0gbWVtbzYoV3JhcHBlcjgpO1xuXG4vLyBzcmMvaW5kZXgudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MjcsIGpzeHMgYXMganN4czYgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnB1dChcIi5QbGF5ZXJSU1dQXCIsIHtcbiAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgZm9udFNpemU6IFwiaW5oZXJpdFwiLFxuICB3aWR0aDogXCIxMDAlXCIsXG4gIFwiKlwiOiB7XG4gICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuICB9LFxuICBwOiB7XG4gICAgbWFyZ2luOiAwXG4gIH1cbn0pO1xucHV0KFwiLkJ1dHRvblJTV1BcIiwge1xuICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICBib3JkZXI6IDAsXG4gIGJvcmRlclJhZGl1czogMCxcbiAgY29sb3I6IFwiaW5oZXJpdFwiLFxuICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIHBhZGRpbmc6IDAsXG4gIFwiOmZvY3VzXCI6IHtcbiAgICBvdXRsaW5lQ29sb3I6IFwiIzAwMFwiLFxuICAgIG91dGxpbmVPZmZzZXQ6IDNcbiAgfVxufSk7XG52YXIgU3BvdGlmeVdlYlBsYXllciA9IGNsYXNzIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIGlzTW91bnRlZCA9IGZhbHNlO1xuICBlbXB0eVRyYWNrID0ge1xuICAgIGFydGlzdHM6IFtdLFxuICAgIGR1cmF0aW9uTXM6IDAsXG4gICAgaWQ6IFwiXCIsXG4gICAgaW1hZ2U6IFwiXCIsXG4gICAgbmFtZTogXCJcIixcbiAgICB1cmk6IFwiXCJcbiAgfTtcbiAgbG9jYWxlO1xuICBwbGF5ZXI7XG4gIHBsYXllclByb2dyZXNzSW50ZXJ2YWw7XG4gIHBsYXllclN5bmNJbnRlcnZhbDtcbiAgcmVmID0gY3JlYXRlUmVmKCk7XG4gIHJlbmRlcklubGluZUFjdGlvbnMgPSBmYWxzZTtcbiAgcmVzaXplVGltZW91dDtcbiAgc2Vla1VwZGF0ZUludGVydmFsID0gMTAwO1xuICBzdHlsZXM7XG4gIHN5bmNUaW1lb3V0O1xuICBnZXRQbGF5T3B0aW9ucyA9IG1lbW9pemUoKGlkcykgPT4ge1xuICAgIGNvbnN0IHBsYXlPcHRpb25zID0ge1xuICAgICAgY29udGV4dF91cmk6IHZvaWQgMCxcbiAgICAgIHVyaXM6IHZvaWQgMFxuICAgIH07XG4gICAgaWYgKGlkcykge1xuICAgICAgaWYgKCFpZHMuZXZlcnkoKGQpID0+IHZhbGlkYXRlVVJJKGQpKSkge1xuICAgICAgICByZXR1cm4gcGxheU9wdGlvbnM7XG4gICAgICB9XG4gICAgICBpZiAoaWRzLnNvbWUoKGQpID0+IGdldFNwb3RpZnlVUklUeXBlKGQpID09PSBcInRyYWNrXCIpKSB7XG4gICAgICAgIGlmICghaWRzLmV2ZXJ5KChkKSA9PiBnZXRTcG90aWZ5VVJJVHlwZShkKSA9PT0gXCJ0cmFja1wiKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIllvdSBjYW4ndCBtaXggdHJhY2tzIFVSSXMgd2l0aCBvdGhlciB0eXBlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBwbGF5T3B0aW9ucy51cmlzID0gaWRzLmZpbHRlcigoZCkgPT4gdmFsaWRhdGVVUkkoZCkgJiYgZ2V0U3BvdGlmeVVSSVR5cGUoZCkgPT09IFwidHJhY2tcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJBbGJ1bXMsIEFydGlzdHMsIFBsYXlsaXN0cyBhbmQgUG9kY2FzdHMgY2FuJ3QgaGF2ZSBtdWx0aXBsZSBVUklzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHBsYXlPcHRpb25zLmNvbnRleHRfdXJpID0gaWRzWzBdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGxheU9wdGlvbnM7XG4gIH0pO1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudERldmljZUlkOiBcIlwiLFxuICAgICAgZGV2aWNlSWQ6IFwiXCIsXG4gICAgICBkZXZpY2VzOiBbXSxcbiAgICAgIGVycm9yOiBcIlwiLFxuICAgICAgZXJyb3JUeXBlOiBudWxsLFxuICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgaXNJbml0aWFsaXppbmc6IGZhbHNlLFxuICAgICAgaXNNYWduaWZpZWQ6IGZhbHNlLFxuICAgICAgaXNQbGF5aW5nOiBmYWxzZSxcbiAgICAgIGlzU2F2ZWQ6IGZhbHNlLFxuICAgICAgaXNVbnN1cHBvcnRlZDogZmFsc2UsXG4gICAgICBuZWVkc1VwZGF0ZTogZmFsc2UsXG4gICAgICBuZXh0VHJhY2tzOiBbXSxcbiAgICAgIHBsYXllclBvc2l0aW9uOiBcImJvdHRvbVwiLFxuICAgICAgcG9zaXRpb246IDAsXG4gICAgICBwcmV2aW91c1RyYWNrczogW10sXG4gICAgICBwcm9ncmVzc01zOiAwLFxuICAgICAgcmVwZWF0OiBcIm9mZlwiLFxuICAgICAgc2h1ZmZsZTogZmFsc2UsXG4gICAgICBzdGF0dXM6IFNUQVRVUy5JRExFLFxuICAgICAgdHJhY2s6IHRoaXMuZW1wdHlUcmFjayxcbiAgICAgIHZvbHVtZTogcGFyc2VWb2x1bWUocHJvcHMuaW5pdGlhbFZvbHVtZSkgfHwgMVxuICAgIH07XG4gICAgdGhpcy5sb2NhbGUgPSBnZXRMb2NhbGUocHJvcHMubG9jYWxlKTtcbiAgICB0aGlzLnN0eWxlcyA9IGdldE1lcmdlZFN0eWxlcyhwcm9wcy5zdHlsZXMpO1xuICB9XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYXV0b1BsYXk6IGZhbHNlLFxuICAgIGluaXRpYWxWb2x1bWU6IDEsXG4gICAgbWFnbmlmeVNsaWRlck9uSG92ZXI6IGZhbHNlLFxuICAgIG5hbWU6IFwiU3BvdGlmeSBXZWIgUGxheWVyXCIsXG4gICAgcGVyc2lzdERldmljZVNlbGVjdGlvbjogZmFsc2UsXG4gICAgc2hvd1NhdmVJY29uOiBmYWxzZSxcbiAgICBzeW5jRXh0ZXJuYWxEZXZpY2VJbnRlcnZhbDogNSxcbiAgICBzeW5jRXh0ZXJuYWxEZXZpY2U6IGZhbHNlXG4gIH07XG4gIGFzeW5jIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaXNNb3VudGVkID0gdHJ1ZTtcbiAgICBjb25zdCB7IHRvcCA9IDAgfSA9IHRoaXMucmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpID8/IHt9O1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgcGxheWVyUG9zaXRpb246IHRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgPyBcImJvdHRvbVwiIDogXCJ0b3BcIixcbiAgICAgIHN0YXR1czogU1RBVFVTLklOSVRJQUxJWklOR1xuICAgIH0pO1xuICAgIGlmICghd2luZG93Lm9uU3BvdGlmeVdlYlBsYXliYWNrU0RLUmVhZHkpIHtcbiAgICAgIHdpbmRvdy5vblNwb3RpZnlXZWJQbGF5YmFja1NES1JlYWR5ID0gdGhpcy5pbml0aWFsaXplUGxheWVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVQbGF5ZXIoKTtcbiAgICB9XG4gICAgYXdhaXQgbG9hZFNwb3RpZnlQbGF5ZXIoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgdGhpcy5oYW5kbGVSZXNpemUoKTtcbiAgfVxuICBhc3luYyBjb21wb25lbnREaWRVcGRhdGUocHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZSkge1xuICAgIGNvbnN0IHsgY3VycmVudERldmljZUlkLCBkZXZpY2VJZCwgaXNJbml0aWFsaXppbmcsIGlzUGxheWluZywgcmVwZWF0OiByZXBlYXQyLCBzaHVmZmxlOiBzaHVmZmxlMiwgc3RhdHVzLCB0cmFjayB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBhdXRvUGxheSxcbiAgICAgIGxheW91dCxcbiAgICAgIGxvY2FsZSxcbiAgICAgIG9mZnNldCxcbiAgICAgIHBsYXk6IHBsYXlQcm9wLFxuICAgICAgc2hvd1NhdmVJY29uLFxuICAgICAgc3R5bGVzLFxuICAgICAgc3luY0V4dGVybmFsRGV2aWNlLFxuICAgICAgdXJpc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzUmVhZHkgPSBwcmV2aW91c1N0YXRlLnN0YXR1cyAhPT0gU1RBVFVTLlJFQURZICYmIHN0YXR1cyA9PT0gU1RBVFVTLlJFQURZO1xuICAgIGNvbnN0IHBsYXlPcHRpb25zID0gdGhpcy5nZXRQbGF5T3B0aW9ucyhnZXRVUklzKHVyaXMpKTtcbiAgICBjb25zdCBjYW5QbGF5ID0gISFjdXJyZW50RGV2aWNlSWQgJiYgISEocGxheU9wdGlvbnMuY29udGV4dF91cmkgPz8gcGxheU9wdGlvbnMudXJpcyk7XG4gICAgY29uc3Qgc2hvdWxkUGxheSA9IGlzUmVhZHkgJiYgKGF1dG9QbGF5IHx8IHBsYXlQcm9wKTtcbiAgICBpZiAoY2FuUGxheSAmJiBzaG91bGRQbGF5KSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZVBsYXkodHJ1ZSk7XG4gICAgICBpZiAoIWlzUGxheWluZykge1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaXNQbGF5aW5nOiB0cnVlIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNFeHRlcm5hbFBsYXllcikge1xuICAgICAgICB0aGlzLnN5bmNUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3luY0RldmljZSgpO1xuICAgICAgICB9LCA2MDApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzRXF1YWwocHJldmlvdXNQcm9wcy51cmlzLCB1cmlzKSkge1xuICAgICAgaWYgKGlzUGxheWluZyB8fCBwbGF5UHJvcCkge1xuICAgICAgICBhd2FpdCB0aGlzLnRvZ2dsZVBsYXkodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgbmVlZHNVcGRhdGU6IHRydWUgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcmV2aW91c1Byb3BzLnBsYXkgIT09IHBsYXlQcm9wICYmIHBsYXlQcm9wICE9PSBpc1BsYXlpbmcpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUGxheSghdHJhY2suaWQpO1xuICAgIH1cbiAgICBpZiAocHJldmlvdXNTdGF0ZS5zdGF0dXMgIT09IHN0YXR1cykge1xuICAgICAgdGhpcy5oYW5kbGVDYWxsYmFjayh7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgIHR5cGU6IFRZUEUuU1RBVFVTXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHByZXZpb3VzU3RhdGUuY3VycmVudERldmljZUlkICE9PSBjdXJyZW50RGV2aWNlSWQgJiYgY3VycmVudERldmljZUlkKSB7XG4gICAgICBpZiAoIWlzUmVhZHkpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVDYWxsYmFjayh7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICB0eXBlOiBUWVBFLkRFVklDRVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlU3luY0ludGVydmFsKHRoaXMuaXNFeHRlcm5hbFBsYXllcik7XG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVNlZWtCYXIoKTtcbiAgICB9XG4gICAgaWYgKHByZXZpb3VzU3RhdGUudHJhY2suaWQgIT09IHRyYWNrLmlkICYmIHRyYWNrLmlkKSB7XG4gICAgICB0aGlzLmhhbmRsZUNhbGxiYWNrKHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgdHlwZTogVFlQRS5UUkFDS1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvd1NhdmVJY29uKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpc1NhdmVkOiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByZXZpb3VzU3RhdGUuaXNQbGF5aW5nICE9PSBpc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMudG9nZ2xlUHJvZ3Jlc3NCYXIoKTtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlU3luY0ludGVydmFsKHRoaXMuaXNFeHRlcm5hbFBsYXllcik7XG4gICAgICB0aGlzLmhhbmRsZUNhbGxiYWNrKHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgdHlwZTogVFlQRS5QTEFZRVJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJldmlvdXNTdGF0ZS5yZXBlYXQgIT09IHJlcGVhdDIgfHwgcHJldmlvdXNTdGF0ZS5zaHVmZmxlICE9PSBzaHVmZmxlMikge1xuICAgICAgdGhpcy5oYW5kbGVDYWxsYmFjayh7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgIHR5cGU6IFRZUEUuUExBWUVSXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHByZXZpb3VzUHJvcHMub2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlT2Zmc2V0KCk7XG4gICAgfVxuICAgIGlmIChwcmV2aW91c1N0YXRlLmlzSW5pdGlhbGl6aW5nICYmICFpc0luaXRpYWxpemluZykge1xuICAgICAgaWYgKHN5bmNFeHRlcm5hbERldmljZSAmJiAhdXJpcykge1xuICAgICAgICBjb25zdCBwbGF5ZXJTdGF0ZSA9IGF3YWl0IGdldFBsYXliYWNrU3RhdGUodGhpcy50b2tlbik7XG4gICAgICAgIGlmIChwbGF5ZXJTdGF0ZT8uaXNfcGxheWluZyAmJiBwbGF5ZXJTdGF0ZS5kZXZpY2UuaWQgIT09IGRldmljZUlkKSB7XG4gICAgICAgICAgdGhpcy5zZXRFeHRlcm5hbERldmljZShwbGF5ZXJTdGF0ZS5kZXZpY2UuaWQgPz8gXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByZXZpb3VzUHJvcHMubGF5b3V0ICE9PSBsYXlvdXQpIHtcbiAgICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gICAgfVxuICAgIGlmICghaXNFcXVhbChwcmV2aW91c1Byb3BzLmxvY2FsZSwgbG9jYWxlKSkge1xuICAgICAgdGhpcy5sb2NhbGUgPSBnZXRMb2NhbGUobG9jYWxlKTtcbiAgICB9XG4gICAgaWYgKCFpc0VxdWFsKHByZXZpb3VzUHJvcHMuc3R5bGVzLCBzdHlsZXMpKSB7XG4gICAgICB0aGlzLnN0eWxlcyA9IGdldE1lcmdlZFN0eWxlcyhzdHlsZXMpO1xuICAgIH1cbiAgfVxuICBhc3luYyBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgdGhpcy5wbGF5ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICBjbGVhckludGVydmFsKHRoaXMucGxheWVyU3luY0ludGVydmFsKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMucGxheWVyUHJvZ3Jlc3NJbnRlcnZhbCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc3luY1RpbWVvdXQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgfVxuICBoYW5kbGVDYWxsYmFjayhzdGF0ZSkge1xuICAgIGNvbnN0IHsgY2FsbGJhY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhzdGF0ZSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUNoYW5nZVJhbmdlID0gYXN5bmMgKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3QgeyB0cmFjayB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGNhbGxiYWNrIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBwcm9ncmVzcyA9IDA7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBwb3NpdGlvbiAvIDEwMDtcbiAgICAgIGxldCBzdGF0ZUNoYW5nZXMgPSB7fTtcbiAgICAgIGlmICh0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIpIHtcbiAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKHRyYWNrLmR1cmF0aW9uTXMgKiBwZXJjZW50YWdlKTtcbiAgICAgICAgYXdhaXQgc2Vlayh0aGlzLnRva2VuLCBwcm9ncmVzcyk7XG4gICAgICAgIHN0YXRlQ2hhbmdlcyA9IHtcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBwcm9ncmVzc01zOiBwcm9ncmVzc1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHRoaXMucGxheWVyLmdldEN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICBwcm9ncmVzcyA9IE1hdGgucm91bmQoc3RhdGUudHJhY2tfd2luZG93LmN1cnJlbnRfdHJhY2suZHVyYXRpb25fbXMgKiBwZXJjZW50YWdlKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsYXllci5zZWVrKHByb2dyZXNzKTtcbiAgICAgICAgICBzdGF0ZUNoYW5nZXMgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIHByb2dyZXNzTXM6IHByb2dyZXNzXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZUNoYW5nZXMgPSB7IHBvc2l0aW9uOiAwIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU3RhdGUoc3RhdGVDaGFuZ2VzKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICAuLi5zdGF0ZUNoYW5nZXMsXG4gICAgICAgICAgdHlwZTogVFlQRS5QUk9HUkVTU1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9O1xuICBoYW5kbGVDbGlja1RvZ2dsZVBsYXkgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBpc0FjdGl2ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGVQbGF5KCF0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIgJiYgIWlzQWN0aXZlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9O1xuICBoYW5kbGVDbGlja1ByZXZpb3VzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5pc0V4dGVybmFsUGxheWVyKSB7XG4gICAgICAgIGF3YWl0IHByZXZpb3VzKHRoaXMudG9rZW4pO1xuICAgICAgICB0aGlzLnN5bmNUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3luY0RldmljZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgICBhd2FpdCB0aGlzLnBsYXllci5wcmV2aW91c1RyYWNrKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlQ2xpY2tOZXh0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5pc0V4dGVybmFsUGxheWVyKSB7XG4gICAgICAgIGF3YWl0IG5leHQodGhpcy50b2tlbik7XG4gICAgICAgIHRoaXMuc3luY1RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGxheWVyLm5leHRUcmFjaygpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGhhbmRsZUNsaWNrRGV2aWNlID0gYXN5bmMgKGRldmljZUlkKSA9PiB7XG4gICAgY29uc3QgeyBpc1Vuc3VwcG9ydGVkIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgYXV0b1BsYXksIHBlcnNpc3REZXZpY2VTZWxlY3Rpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGN1cnJlbnREZXZpY2VJZDogZGV2aWNlSWQgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNldERldmljZSh0aGlzLnRva2VuLCBkZXZpY2VJZCk7XG4gICAgICBpZiAocGVyc2lzdERldmljZVNlbGVjdGlvbikge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwicnN3cERldmljZUlkXCIsIGRldmljZUlkKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1Vuc3VwcG9ydGVkKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY0RldmljZSgpO1xuICAgICAgICBjb25zdCBwbGF5ZXJTdGF0ZSA9IGF3YWl0IGdldFBsYXliYWNrU3RhdGUodGhpcy50b2tlbik7XG4gICAgICAgIGlmIChwbGF5ZXJTdGF0ZSAmJiAhcGxheWVyU3RhdGUuaXNfcGxheWluZyAmJiBhdXRvUGxheSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUGxheSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGhhbmRsZUZhdm9yaXRlU3RhdHVzQ2hhbmdlID0gKHN0YXR1cykgPT4ge1xuICAgIGNvbnN0IHsgaXNTYXZlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgaXNTYXZlZDogc3RhdHVzIH0pO1xuICAgIGlmIChpc1NhdmVkICE9PSBzdGF0dXMpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2FsbGJhY2soe1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICBpc1NhdmVkOiBzdGF0dXMsXG4gICAgICAgIHR5cGU6IFRZUEUuRkFWT1JJVEVcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlUGxheWVyRXJyb3JzID0gYXN5bmMgKHR5cGUsIG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc1BsYXliYWNrRXJyb3IgPSB0eXBlID09PSBFUlJPUl9UWVBFLlBMQVlCQUNLO1xuICAgIGNvbnN0IGlzSW5pdGlhbGl6YXRpb25FcnJvciA9IHR5cGUgPT09IEVSUk9SX1RZUEUuSU5JVElBTElaQVRJT047XG4gICAgbGV0IG5leHRTdGF0dXMgPSBzdGF0dXM7XG4gICAgbGV0IGRldmljZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wbGF5ZXIgJiYgIWlzUGxheWJhY2tFcnJvcikge1xuICAgICAgdGhpcy5wbGF5ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5wbGF5ZXIgPSB2b2lkIDA7XG4gICAgfVxuICAgIGlmIChpc0luaXRpYWxpemF0aW9uRXJyb3IpIHtcbiAgICAgIG5leHRTdGF0dXMgPSBTVEFUVVMuVU5TVVBQT1JURUQ7XG4gICAgICAoeyBkZXZpY2VzID0gW10gfSA9IGF3YWl0IGdldERldmljZXModGhpcy50b2tlbikpO1xuICAgIH0gZWxzZSBpZiAoIWlzUGxheWJhY2tFcnJvcikge1xuICAgICAgbmV4dFN0YXR1cyA9IFNUQVRVUy5FUlJPUjtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBkZXZpY2VzLFxuICAgICAgZXJyb3I6IG1lc3NhZ2UsXG4gICAgICBlcnJvclR5cGU6IHR5cGUsXG4gICAgICBpc0luaXRpYWxpemluZzogZmFsc2UsXG4gICAgICBpc1Vuc3VwcG9ydGVkOiBpc0luaXRpYWxpemF0aW9uRXJyb3IsXG4gICAgICBzdGF0dXM6IG5leHRTdGF0dXNcbiAgICB9KTtcbiAgfTtcbiAgaGFuZGxlUGxheWVyU3RhdGVDaGFuZ2VzID0gYXN5bmMgKHN0YXRlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcGF1c2VkLFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHJlcGVhdF9tb2RlLFxuICAgICAgICAgIHNodWZmbGU6IHNodWZmbGUyLFxuICAgICAgICAgIHRyYWNrX3dpbmRvdzogeyBjdXJyZW50X3RyYWNrLCBuZXh0X3RyYWNrcywgcHJldmlvdXNfdHJhY2tzIH1cbiAgICAgICAgfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBpc1BsYXlpbmcgPSAhcGF1c2VkO1xuICAgICAgICBjb25zdCB2b2x1bWUgPSBhd2FpdCB0aGlzLnBsYXllcj8uZ2V0Vm9sdW1lKCkgPz8gMTAwO1xuICAgICAgICBsZXQgdHJhY2tTdGF0ZSA9IHt9O1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IDAgJiYgY3VycmVudF90cmFjaykge1xuICAgICAgICAgIHRyYWNrU3RhdGUgPSB7XG4gICAgICAgICAgICBuZXh0VHJhY2tzOiBuZXh0X3RyYWNrcy5tYXAoY29udmVydFRyYWNrKSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgcHJldmlvdXNUcmFja3M6IHByZXZpb3VzX3RyYWNrcy5tYXAoY29udmVydFRyYWNrKSxcbiAgICAgICAgICAgIHRyYWNrOiBjb252ZXJ0VHJhY2soY3VycmVudF90cmFjaylcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgICAgIGVycm9yOiBcIlwiLFxuICAgICAgICAgIGVycm9yVHlwZTogbnVsbCxcbiAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICBpc1BsYXlpbmcsXG4gICAgICAgICAgcHJvZ3Jlc3NNczogcG9zaXRpb24sXG4gICAgICAgICAgcmVwZWF0OiBnZXRSZXBlYXRTdGF0ZShyZXBlYXRfbW9kZSksXG4gICAgICAgICAgc2h1ZmZsZTogc2h1ZmZsZTIsXG4gICAgICAgICAgdm9sdW1lOiByb3VuZCh2b2x1bWUpLFxuICAgICAgICAgIC4uLnRyYWNrU3RhdGVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNFeHRlcm5hbFBsYXllcikge1xuICAgICAgICBhd2FpdCB0aGlzLnN5bmNEZXZpY2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICBpc1BsYXlpbmc6IGZhbHNlLFxuICAgICAgICAgIG5leHRUcmFja3M6IFtdLFxuICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgIHByZXZpb3VzVHJhY2tzOiBbXSxcbiAgICAgICAgICB0cmFjazoge1xuICAgICAgICAgICAgYXJ0aXN0czogW10sXG4gICAgICAgICAgICBkdXJhdGlvbk1zOiAwLFxuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgICAgIG5hbWU6IFwiXCIsXG4gICAgICAgICAgICB1cmk6IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGhhbmRsZVBsYXllclN0YXR1cyA9IGFzeW5jICh7IGRldmljZV9pZCB9KSA9PiB7XG4gICAgY29uc3QgeyBjdXJyZW50RGV2aWNlSWQsIGRldmljZXMgfSA9IGF3YWl0IHRoaXMuaW5pdGlhbGl6ZURldmljZXMoZGV2aWNlX2lkKTtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGN1cnJlbnREZXZpY2VJZCxcbiAgICAgIGRldmljZUlkOiBkZXZpY2VfaWQsXG4gICAgICBkZXZpY2VzLFxuICAgICAgaXNJbml0aWFsaXppbmc6IGZhbHNlLFxuICAgICAgc3RhdHVzOiBkZXZpY2VfaWQgPyBTVEFUVVMuUkVBRFkgOiBTVEFUVVMuSURMRVxuICAgIH0pO1xuICB9O1xuICBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsYXlvdXQgPSBcInJlc3BvbnNpdmVcIiB9ID0gdGhpcy5wcm9wcztcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcklubGluZUFjdGlvbnMgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjggJiYgbGF5b3V0ID09PSBcInJlc3BvbnNpdmVcIjtcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICB9LCAxMDApO1xuICB9O1xuICBoYW5kbGVUb2dnbGVNYWduaWZ5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbWFnbmlmeVNsaWRlck9uSG92ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG1hZ25pZnlTbGlkZXJPbkhvdmVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKChwcmV2aW91c1N0YXRlKSA9PiB7XG4gICAgICAgIHJldHVybiB7IGlzTWFnbmlmaWVkOiAhcHJldmlvdXNTdGF0ZS5pc01hZ25pZmllZCB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBnZXQgdG9rZW4oKSB7XG4gICAgY29uc3QgeyB0b2tlbiB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbiAgYXN5bmMgaW5pdGlhbGl6ZURldmljZXMoaWQpIHtcbiAgICBjb25zdCB7IHBlcnNpc3REZXZpY2VTZWxlY3Rpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkZXZpY2VzIH0gPSBhd2FpdCBnZXREZXZpY2VzKHRoaXMudG9rZW4pO1xuICAgIGxldCBjdXJyZW50RGV2aWNlSWQgPSBpZDtcbiAgICBpZiAocGVyc2lzdERldmljZVNlbGVjdGlvbikge1xuICAgICAgY29uc3Qgc2F2ZWREZXZpY2VJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJyc3dwRGV2aWNlSWRcIik7XG4gICAgICBpZiAoIXNhdmVkRGV2aWNlSWQgfHwgIWRldmljZXMuc29tZSgoZCkgPT4gZC5pZCA9PT0gc2F2ZWREZXZpY2VJZCkpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInJzd3BEZXZpY2VJZFwiLCBjdXJyZW50RGV2aWNlSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudERldmljZUlkID0gc2F2ZWREZXZpY2VJZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgY3VycmVudERldmljZUlkLCBkZXZpY2VzIH07XG4gIH1cbiAgaW5pdGlhbGl6ZVBsYXllciA9ICgpID0+IHtcbiAgICBjb25zdCB7IHZvbHVtZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7XG4gICAgICBnZXRPQXV0aFRva2VuID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMudG9rZW4pO1xuICAgICAgfSxcbiAgICAgIGdldFBsYXllcixcbiAgICAgIG5hbWUgPSBcIlNwb3RpZnkgV2ViIFBsYXllclwiXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF3aW5kb3cuU3BvdGlmeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGVycm9yOiBcIlwiLFxuICAgICAgZXJyb3JUeXBlOiBudWxsLFxuICAgICAgaXNJbml0aWFsaXppbmc6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyB3aW5kb3cuU3BvdGlmeS5QbGF5ZXIoe1xuICAgICAgZ2V0T0F1dGhUb2tlbixcbiAgICAgIG5hbWUsXG4gICAgICB2b2x1bWVcbiAgICB9KTtcbiAgICB0aGlzLnBsYXllci5hZGRMaXN0ZW5lcihcInJlYWR5XCIsIHRoaXMuaGFuZGxlUGxheWVyU3RhdHVzKTtcbiAgICB0aGlzLnBsYXllci5hZGRMaXN0ZW5lcihcIm5vdF9yZWFkeVwiLCB0aGlzLmhhbmRsZVBsYXllclN0YXR1cyk7XG4gICAgdGhpcy5wbGF5ZXIuYWRkTGlzdGVuZXIoXCJwbGF5ZXJfc3RhdGVfY2hhbmdlZFwiLCB0aGlzLmhhbmRsZVBsYXllclN0YXRlQ2hhbmdlcyk7XG4gICAgdGhpcy5wbGF5ZXIuYWRkTGlzdGVuZXIoXG4gICAgICBcImluaXRpYWxpemF0aW9uX2Vycm9yXCIsXG4gICAgICAoZXJyb3IpID0+IHRoaXMuaGFuZGxlUGxheWVyRXJyb3JzKEVSUk9SX1RZUEUuSU5JVElBTElaQVRJT04sIGVycm9yLm1lc3NhZ2UpXG4gICAgKTtcbiAgICB0aGlzLnBsYXllci5hZGRMaXN0ZW5lcihcbiAgICAgIFwiYXV0aGVudGljYXRpb25fZXJyb3JcIixcbiAgICAgIChlcnJvcikgPT4gdGhpcy5oYW5kbGVQbGF5ZXJFcnJvcnMoRVJST1JfVFlQRS5BVVRIRU5USUNBVElPTiwgZXJyb3IubWVzc2FnZSlcbiAgICApO1xuICAgIHRoaXMucGxheWVyLmFkZExpc3RlbmVyKFxuICAgICAgXCJhY2NvdW50X2Vycm9yXCIsXG4gICAgICAoZXJyb3IpID0+IHRoaXMuaGFuZGxlUGxheWVyRXJyb3JzKEVSUk9SX1RZUEUuQUNDT1VOVCwgZXJyb3IubWVzc2FnZSlcbiAgICApO1xuICAgIHRoaXMucGxheWVyLmFkZExpc3RlbmVyKFxuICAgICAgXCJwbGF5YmFja19lcnJvclwiLFxuICAgICAgKGVycm9yKSA9PiB0aGlzLmhhbmRsZVBsYXllckVycm9ycyhFUlJPUl9UWVBFLlBMQVlCQUNLLCBlcnJvci5tZXNzYWdlKVxuICAgICk7XG4gICAgdGhpcy5wbGF5ZXIuYWRkTGlzdGVuZXIoXCJhdXRvcGxheV9mYWlsZWRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJBdXRvcGxheSBpcyBub3QgYWxsb3dlZCBieSB0aGUgYnJvd3NlciBhdXRvcGxheSBydWxlc1wiKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXllci5jb25uZWN0KCk7XG4gICAgaWYgKGdldFBsYXllcikge1xuICAgICAgZ2V0UGxheWVyKHRoaXMucGxheWVyKTtcbiAgICB9XG4gIH07XG4gIGdldCBpc0V4dGVybmFsUGxheWVyKCkge1xuICAgIGNvbnN0IHsgY3VycmVudERldmljZUlkLCBkZXZpY2VJZCwgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBjdXJyZW50RGV2aWNlSWQgJiYgY3VycmVudERldmljZUlkICE9PSBkZXZpY2VJZCB8fCBzdGF0dXMgPT09IFNUQVRVUy5VTlNVUFBPUlRFRDtcbiAgfVxuICBzZXRFeHRlcm5hbERldmljZSA9IChpZCkgPT4ge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoeyBjdXJyZW50RGV2aWNlSWQ6IGlkLCBpc1BsYXlpbmc6IHRydWUgfSk7XG4gIH07XG4gIHNldFZvbHVtZSA9IGFzeW5jICh2b2x1bWUpID0+IHtcbiAgICBpZiAodGhpcy5pc0V4dGVybmFsUGxheWVyKSB7XG4gICAgICBhd2FpdCBzZXRWb2x1bWUodGhpcy50b2tlbiwgTWF0aC5yb3VuZCh2b2x1bWUgKiAxMDApKTtcbiAgICAgIGF3YWl0IHRoaXMuc3luY0RldmljZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMucGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgdm9sdW1lIH0pO1xuICB9O1xuICBzeW5jRGV2aWNlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc01vdW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBkZXZpY2VJZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGxheWVyU3RhdGUgPSBhd2FpdCBnZXRQbGF5YmFja1N0YXRlKHRoaXMudG9rZW4pO1xuICAgICAgbGV0IHRyYWNrID0gdGhpcy5lbXB0eVRyYWNrO1xuICAgICAgaWYgKCFwbGF5ZXJTdGF0ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBwbGF5ZXJcIik7XG4gICAgICB9XG4gICAgICBpZiAocGxheWVyU3RhdGUuaXRlbSkge1xuICAgICAgICB0cmFjayA9IHtcbiAgICAgICAgICBhcnRpc3RzOiBcImFydGlzdHNcIiBpbiBwbGF5ZXJTdGF0ZS5pdGVtID8gcGxheWVyU3RhdGUuaXRlbS5hcnRpc3RzIDogW10sXG4gICAgICAgICAgZHVyYXRpb25NczogcGxheWVyU3RhdGUuaXRlbS5kdXJhdGlvbl9tcyxcbiAgICAgICAgICBpZDogcGxheWVyU3RhdGUuaXRlbS5pZCxcbiAgICAgICAgICBpbWFnZTogXCJhbGJ1bVwiIGluIHBsYXllclN0YXRlLml0ZW0gPyBnZXRBbGJ1bUltYWdlKHBsYXllclN0YXRlLml0ZW0uYWxidW0pIDogXCJcIixcbiAgICAgICAgICBuYW1lOiBwbGF5ZXJTdGF0ZS5pdGVtLm5hbWUsXG4gICAgICAgICAgdXJpOiBwbGF5ZXJTdGF0ZS5pdGVtLnVyaVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICAgIGVycm9yOiBcIlwiLFxuICAgICAgICBlcnJvclR5cGU6IG51bGwsXG4gICAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgICBpc1BsYXlpbmc6IHBsYXllclN0YXRlLmlzX3BsYXlpbmcsXG4gICAgICAgIG5leHRUcmFja3M6IFtdLFxuICAgICAgICBwcmV2aW91c1RyYWNrczogW10sXG4gICAgICAgIHByb2dyZXNzTXM6IHBsYXllclN0YXRlLml0ZW0gPyBwbGF5ZXJTdGF0ZS5wcm9ncmVzc19tcyA/PyAwIDogMCxcbiAgICAgICAgc3RhdHVzOiBTVEFUVVMuUkVBRFksXG4gICAgICAgIHRyYWNrLFxuICAgICAgICB2b2x1bWU6IHBhcnNlVm9sdW1lKHBsYXllclN0YXRlLmRldmljZS52b2x1bWVfcGVyY2VudClcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICBpc1BsYXlpbmc6IGZhbHNlLFxuICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgdHJhY2s6IHRoaXMuZW1wdHlUcmFja1xuICAgICAgfTtcbiAgICAgIGlmIChkZXZpY2VJZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50RGV2aWNlSWQ6IGRldmljZUlkLFxuICAgICAgICAgIC4uLnN0YXRlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIGVycm9yVHlwZTogRVJST1JfVFlQRS5QTEFZRVIsXG4gICAgICAgIHN0YXR1czogU1RBVFVTLkVSUk9SLFxuICAgICAgICAuLi5zdGF0ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBhc3luYyB0b2dnbGVTeW5jSW50ZXJ2YWwoc2hvdWxkU3luYykge1xuICAgIGNvbnN0IHsgc3luY0V4dGVybmFsRGV2aWNlSW50ZXJ2YWwgfSA9IHRoaXMucHJvcHM7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIgJiYgc2hvdWxkU3luYyAmJiAhdGhpcy5wbGF5ZXJTeW5jSW50ZXJ2YWwpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5ZXJTeW5jSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnBsYXllclN5bmNJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbChcbiAgICAgICAgICB0aGlzLnN5bmNEZXZpY2UsXG4gICAgICAgICAgc3luY0V4dGVybmFsRGV2aWNlSW50ZXJ2YWwgKiAxZTNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICgoIXNob3VsZFN5bmMgfHwgIXRoaXMuaXNFeHRlcm5hbFBsYXllcikgJiYgdGhpcy5wbGF5ZXJTeW5jSW50ZXJ2YWwpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBsYXllclN5bmNJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMucGxheWVyU3luY0ludGVydmFsID0gdm9pZCAwO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgY29uc3QgeyBpc1BsYXlpbmcgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKGlzUGxheWluZykge1xuICAgICAgaWYgKCF0aGlzLnBsYXllclByb2dyZXNzSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJQcm9ncmVzc0ludGVydmFsID0gd2luZG93LnNldEludGVydmFsKFxuICAgICAgICAgIHRoaXMudXBkYXRlU2Vla0JhcixcbiAgICAgICAgICB0aGlzLnNlZWtVcGRhdGVJbnRlcnZhbFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXJQcm9ncmVzc0ludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMucGxheWVyUHJvZ3Jlc3NJbnRlcnZhbCk7XG4gICAgICB0aGlzLnBsYXllclByb2dyZXNzSW50ZXJ2YWwgPSB2b2lkIDA7XG4gICAgfVxuICB9XG4gIHRvZ2dsZU9mZnNldCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGN1cnJlbnREZXZpY2VJZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9mZnNldCwgdXJpcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwbGF5T3B0aW9ucyA9IHRoaXMuZ2V0UGxheU9wdGlvbnMoZ2V0VVJJcyh1cmlzKSk7XG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGF3YWl0IHBsYXkodGhpcy50b2tlbiwgeyBkZXZpY2VJZDogY3VycmVudERldmljZUlkLCBvZmZzZXQsIC4uLnBsYXlPcHRpb25zIH0pO1xuICAgIH1cbiAgfTtcbiAgdG9nZ2xlUGxheSA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBjdXJyZW50RGV2aWNlSWQsIGlzUGxheWluZywgbmVlZHNVcGRhdGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBvZmZzZXQsIHVyaXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hvdWxkSW5pdGlhbGl6ZSA9IGZvcmNlIHx8IG5lZWRzVXBkYXRlO1xuICAgIGNvbnN0IHBsYXlPcHRpb25zID0gdGhpcy5nZXRQbGF5T3B0aW9ucyhnZXRVUklzKHVyaXMpKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaXNFeHRlcm5hbFBsYXllcikge1xuICAgICAgICBpZiAoIWlzUGxheWluZykge1xuICAgICAgICAgIGF3YWl0IHBsYXkodGhpcy50b2tlbiwge1xuICAgICAgICAgICAgZGV2aWNlSWQ6IGN1cnJlbnREZXZpY2VJZCxcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIC4uLnNob3VsZEluaXRpYWxpemUgPyBwbGF5T3B0aW9ucyA6IHZvaWQgMFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHBhdXNlKHRoaXMudG9rZW4pO1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpc1BsYXlpbmc6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY1RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGxheWVyLmFjdGl2YXRlRWxlbWVudCgpO1xuICAgICAgICBjb25zdCBwbGF5ZXJTdGF0ZSA9IGF3YWl0IHRoaXMucGxheWVyLmdldEN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICBjb25zdCBzaG91bGRQbGF5ID0gIXBsYXllclN0YXRlICYmICEhKHBsYXlPcHRpb25zLmNvbnRleHRfdXJpID8/IHBsYXlPcHRpb25zLnVyaXMpO1xuICAgICAgICBpZiAoc2hvdWxkUGxheSB8fCBzaG91bGRJbml0aWFsaXplKSB7XG4gICAgICAgICAgYXdhaXQgcGxheSh0aGlzLnRva2VuLCB7XG4gICAgICAgICAgICBkZXZpY2VJZDogY3VycmVudERldmljZUlkLFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgLi4uc2hvdWxkSW5pdGlhbGl6ZSA/IHBsYXlPcHRpb25zIDogdm9pZCAwXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIudG9nZ2xlUGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMucGxheWVyLnRvZ2dsZVBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBuZWVkc1VwZGF0ZTogZmFsc2UgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgdXBkYXRlU2Vla0JhciA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgcHJvZ3Jlc3NNcywgdHJhY2sgfSA9IHRoaXMuc3RhdGU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gcHJvZ3Jlc3NNcyAvIHRyYWNrLmR1cmF0aW9uTXM7XG4gICAgICAgIHBvc2l0aW9uID0gTnVtYmVyKCgoTnVtYmVyLmlzRmluaXRlKHBvc2l0aW9uKSA/IHBvc2l0aW9uIDogMCkgKiAxMDApLnRvRml4ZWQoMSkpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBwcm9ncmVzc01zOiBwcm9ncmVzc01zICsgdGhpcy5zZWVrVXBkYXRlSW50ZXJ2YWxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgdGhpcy5wbGF5ZXIuZ2V0Q3VycmVudFN0YXRlKCk7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gc3RhdGUucG9zaXRpb247XG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBOdW1iZXIoXG4gICAgICAgICAgICAocHJvZ3Jlc3MgLyBzdGF0ZS50cmFja193aW5kb3cuY3VycmVudF90cmFjay5kdXJhdGlvbl9tcyAqIDEwMCkudG9GaXhlZCgxKVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIHByb2dyZXNzTXM6IHByb2dyZXNzICsgdGhpcy5zZWVrVXBkYXRlSW50ZXJ2YWxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIHVwZGF0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzTW91bnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgfTtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1cnJlbnREZXZpY2VJZCxcbiAgICAgIGRldmljZUlkLFxuICAgICAgZGV2aWNlcyxcbiAgICAgIGVycm9yLFxuICAgICAgaXNBY3RpdmUsXG4gICAgICBpc01hZ25pZmllZCxcbiAgICAgIGlzUGxheWluZyxcbiAgICAgIGlzVW5zdXBwb3J0ZWQsXG4gICAgICBuZXh0VHJhY2tzLFxuICAgICAgcGxheWVyUG9zaXRpb24sXG4gICAgICBwb3NpdGlvbixcbiAgICAgIHByb2dyZXNzTXMsXG4gICAgICBzdGF0dXMsXG4gICAgICB0cmFjayxcbiAgICAgIHZvbHVtZVxuICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbXBvbmVudHMsXG4gICAgICBoaWRlQXR0cmlidXRpb24gPSBmYWxzZSxcbiAgICAgIGhpZGVDb3ZlckFydCA9IGZhbHNlLFxuICAgICAgaW5saW5lVm9sdW1lID0gdHJ1ZSxcbiAgICAgIGxheW91dCA9IFwicmVzcG9uc2l2ZVwiLFxuICAgICAgc2hvd1NhdmVJY29uLFxuICAgICAgdXBkYXRlU2F2ZWRTdGF0dXNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc1JlYWR5ID0gW1NUQVRVUy5SRUFEWSwgU1RBVFVTLlVOU1VQUE9SVEVEXS5pbmNsdWRlcyhzdGF0dXMpO1xuICAgIGNvbnN0IG91dHB1dCA9IHtcbiAgICAgIG1haW46IC8qIEBfX1BVUkVfXyAqLyBqc3gyNyhMb2FkZXIsIHsgc3R5bGVzOiB0aGlzLnN0eWxlcyB9KVxuICAgIH07XG4gICAgaWYgKGlzUmVhZHkpIHtcbiAgICAgIGlmICghb3V0cHV0LmluZm8pIHtcbiAgICAgICAgb3V0cHV0LmluZm8gPSAvKiBAX19QVVJFX18gKi8ganN4MjcoXG4gICAgICAgICAgSW5mb19kZWZhdWx0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhpZGVBdHRyaWJ1dGlvbixcbiAgICAgICAgICAgIGhpZGVDb3ZlckFydCxcbiAgICAgICAgICAgIGlzQWN0aXZlLFxuICAgICAgICAgICAgbGF5b3V0LFxuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICAgIG9uRmF2b3JpdGVTdGF0dXNDaGFuZ2U6IHRoaXMuaGFuZGxlRmF2b3JpdGVTdGF0dXNDaGFuZ2UsXG4gICAgICAgICAgICBzaG93U2F2ZUljb24sXG4gICAgICAgICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICB0cmFjayxcbiAgICAgICAgICAgIHVwZGF0ZVNhdmVkU3RhdHVzXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgb3V0cHV0LmRldmljZXMgPSAvKiBAX19QVVJFX18gKi8ganN4MjcoXG4gICAgICAgIERldmljZXMsXG4gICAgICAgIHtcbiAgICAgICAgICBjdXJyZW50RGV2aWNlSWQsXG4gICAgICAgICAgZGV2aWNlSWQsXG4gICAgICAgICAgZGV2aWNlcyxcbiAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICBvbkNsaWNrRGV2aWNlOiB0aGlzLmhhbmRsZUNsaWNrRGV2aWNlLFxuICAgICAgICAgIG9wZW46IGlzVW5zdXBwb3J0ZWQgJiYgIWRldmljZUlkLFxuICAgICAgICAgIHBsYXllclBvc2l0aW9uLFxuICAgICAgICAgIHN0eWxlczogdGhpcy5zdHlsZXNcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIG91dHB1dC52b2x1bWUgPSBjdXJyZW50RGV2aWNlSWQgPyAvKiBAX19QVVJFX18gKi8ganN4MjcoXG4gICAgICAgIFZvbHVtZSxcbiAgICAgICAge1xuICAgICAgICAgIGlubGluZVZvbHVtZSxcbiAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICBwbGF5ZXJQb3NpdGlvbixcbiAgICAgICAgICBzZXRWb2x1bWU6IHRoaXMuc2V0Vm9sdW1lLFxuICAgICAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXG4gICAgICAgICAgdm9sdW1lXG4gICAgICAgIH1cbiAgICAgICkgOiBudWxsO1xuICAgICAgaWYgKHRoaXMucmVuZGVySW5saW5lQWN0aW9ucykge1xuICAgICAgICBvdXRwdXQuYWN0aW9ucyA9IC8qIEBfX1BVUkVfXyAqLyBqc3hzNihBY3Rpb25zX2RlZmF1bHQsIHsgbGF5b3V0LCBzdHlsZXM6IHRoaXMuc3R5bGVzLCBjaGlsZHJlbjogW1xuICAgICAgICAgIG91dHB1dC5kZXZpY2VzLFxuICAgICAgICAgIG91dHB1dC52b2x1bWVcbiAgICAgICAgXSB9KTtcbiAgICAgIH1cbiAgICAgIG91dHB1dC5jb250cm9scyA9IC8qIEBfX1BVUkVfXyAqLyBqc3gyNyhcbiAgICAgICAgQ29udHJvbHNfZGVmYXVsdCxcbiAgICAgICAge1xuICAgICAgICAgIGNvbXBvbmVudHMsXG4gICAgICAgICAgZGV2aWNlczogdGhpcy5yZW5kZXJJbmxpbmVBY3Rpb25zID8gbnVsbCA6IG91dHB1dC5kZXZpY2VzLFxuICAgICAgICAgIGR1cmF0aW9uTXM6IHRyYWNrLmR1cmF0aW9uTXMsXG4gICAgICAgICAgaXNBY3RpdmUsXG4gICAgICAgICAgaXNFeHRlcm5hbERldmljZTogdGhpcy5pc0V4dGVybmFsUGxheWVyLFxuICAgICAgICAgIGlzTWFnbmlmaWVkLFxuICAgICAgICAgIGlzUGxheWluZyxcbiAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICBuZXh0VHJhY2tzLFxuICAgICAgICAgIG9uQ2hhbmdlUmFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlUmFuZ2UsXG4gICAgICAgICAgb25DbGlja05leHQ6IHRoaXMuaGFuZGxlQ2xpY2tOZXh0LFxuICAgICAgICAgIG9uQ2xpY2tQcmV2aW91czogdGhpcy5oYW5kbGVDbGlja1ByZXZpb3VzLFxuICAgICAgICAgIG9uQ2xpY2tUb2dnbGVQbGF5OiB0aGlzLmhhbmRsZUNsaWNrVG9nZ2xlUGxheSxcbiAgICAgICAgICBvblRvZ2dsZU1hZ25pZnk6IHRoaXMuaGFuZGxlVG9nZ2xlTWFnbmlmeSxcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBwcm9ncmVzc01zLFxuICAgICAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXG4gICAgICAgICAgdm9sdW1lOiB0aGlzLnJlbmRlcklubGluZUFjdGlvbnMgPyBudWxsIDogb3V0cHV0LnZvbHVtZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgb3V0cHV0Lm1haW4gPSAvKiBAX19QVVJFX18gKi8ganN4czYoV3JhcHBlcl9kZWZhdWx0LCB7IGxheW91dCwgc3R5bGVzOiB0aGlzLnN0eWxlcywgY2hpbGRyZW46IFtcbiAgICAgICAgb3V0cHV0LmluZm8sXG4gICAgICAgIG91dHB1dC5jb250cm9scyxcbiAgICAgICAgb3V0cHV0LmFjdGlvbnNcbiAgICAgIF0gfSk7XG4gICAgfSBlbHNlIGlmIChvdXRwdXQuaW5mbykge1xuICAgICAgb3V0cHV0Lm1haW4gPSBvdXRwdXQuaW5mbztcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gU1RBVFVTLkVSUk9SKSB7XG4gICAgICBvdXRwdXQubWFpbiA9IC8qIEBfX1BVUkVfXyAqLyBqc3gyNyhFcnJvck1lc3NhZ2UsIHsgc3R5bGVzOiB0aGlzLnN0eWxlcywgY2hpbGRyZW46IGVycm9yIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDI3KFBsYXllcl9kZWZhdWx0LCB7IHJlZjogdGhpcy5yZWYsIFwiZGF0YS1yZWFkeVwiOiBpc1JlYWR5LCBzdHlsZXM6IHRoaXMuc3R5bGVzLCBjaGlsZHJlbjogb3V0cHV0Lm1haW4gfSk7XG4gIH1cbn07XG52YXIgc3JjX2RlZmF1bHQgPSBTcG90aWZ5V2ViUGxheWVyO1xuZXhwb3J0IHtcbiAgRVJST1JfVFlQRSxcbiAgU1RBVFVTLFxuICBUWVBFLFxuICBzcmNfZGVmYXVsdCBhcyBkZWZhdWx0LFxuICBzcG90aWZ5X2V4cG9ydHMgYXMgc3BvdGlmeUFwaVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IFNwb3RpZnlQbGF5ZXIgZnJvbSAncmVhY3Qtc3BvdGlmeS13ZWItcGxheWJhY2snO1xuXG5cbmltcG9ydCB7IFNwb3RpZnlXZWJQbGF5ZXJDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1Nwb3RpZnlXZWJQbGF5ZXJQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL1Nwb3RpZnlXZWJQbGF5ZXIuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBTcG90aWZ5V2ViUGxheWVyKHsgdG9rZW4sIHVyaSB9OiBTcG90aWZ5V2ViUGxheWVyQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiAoXG4gICAgPFNwb3RpZnlQbGF5ZXJcbiAgICAgICAgdG9rZW49e3Rva2VuLmRpc3BsYXlWYWx1ZX1cbiAgICAgICAgdXJpcz17dXJpLmRpc3BsYXlWYWx1ZX1cbiAgICAvPlxuICAgICk7XG59XG4iXSwibmFtZXMiOlsiaXNPZlR5cGUiLCJ0eXBlIiwidmFsdWUiLCJpc0Z1bmN0aW9uIiwiaXNOdWxsIiwiaXNSZWdleCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInNsaWNlIiwiaXNPYmplY3QiLCJpc1VuZGVmaW5lZCIsInNhZmVJc05hTiIsIk51bWJlciIsImlzTmFOIiwicG9ueWZpbGwiLCJpc0VxdWFsIiwiZmlyc3QiLCJzZWNvbmQiLCJhcmVJbnB1dHNFcXVhbCIsIm5ld0lucHV0cyIsImxhc3RJbnB1dHMiLCJsZW5ndGgiLCJpIiwibWVtb2l6ZU9uZSIsInJlc3VsdEZuIiwiY2FjaGUiLCJtZW1vaXplZCIsIm5ld0FyZ3MiLCJfaSIsImFyZ3VtZW50cyIsImxhc3RUaGlzIiwibGFzdEFyZ3MiLCJsYXN0UmVzdWx0IiwiYXBwbHkiLCJjbGVhciIsIktFQkFCX1JFR0VYIiwiaGFzaCIsInN0ciIsImgiLCJjaGFyQ29kZUF0IiwiZXhwb3J0cyIsImNvbmZpZyIsImFzc2lnbiIsImNsaWVudCIsIndpbmRvdyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjb25zb2xlIiwiZXJyb3IiLCJyZW5kZXJlciIsInJhdyIsInBmeCIsInN0cmluZ2lmeSIsIkpTT04iLCJrZWJhYiIsInByb3AiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJkZWNsIiwia2V5Iiwib2JqIiwic2VsZWN0b3IiLCJwYXJlbnQiLCJwdXRSYXciLCJyYXdDc3NSdWxlIiwic2giLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwic2hUZXN0Iiwic2hlZXQiLCJpbnNlcnRSdWxlIiwiY3NzUnVsZXMiLCJ2ZXJib3NlIiwiY3JlYXRlVGV4dE5vZGUiLCJwdXQiLCJkZWNscyIsImF0cnVsZSIsInBvc3Rwb25lZCIsIkFycmF5IiwicHVzaCIsInNvdXJjZW1hcHMiLCJwdXRBdCIsImNzcyIsInJ1bGUiLCJwa2dOYW1lIiwibW9kdWxlIiwid2Fybk9uTWlzc2luZ0RlcGVuZGVuY2llcyIsImFkZG9uIiwiZGVwcyIsIm1pc3NpbmciLCJuYW1lIiwiaiIsIkVycm9yIiwiYWRkb25DYWNoZSIsInJlcXVpcmUiLCJqc3giLCJmbiIsInN0eWxlcyIsImJsb2NrIiwiY2xhc3NOYW1lIiwiaXNFbGVtZW50IiwiQ29tcG9uZW50IiwicHJvcHMiLCJjb3B5IiwiJGFzIiwiJHJlZiIsImR5bmFtaWNDbGFzc05hbWUiLCJyZWYiLCJkaXNwbGF5TmFtZSIsInByZWZpeGVzIiwia3NoIiwiX18iLCJrZXlmcmFtZXMiLCJwcmVsdWRlIiwia2V5ZnJhbWUiLCJzdHJEZWNscyIsInByZWZpeCIsInJhd0tleWZyYW1lcyIsInBhcmVudFNlbGVjdG9ycyIsInBhcmVudHMiLCJzcGxpdCIsInJlc3VsdCIsInNlbGVjdG9ycyIsImxlbjEiLCJsZW4yIiwic2VsIiwicG9zIiwicmVwbGFjZWRTZWxlY3RvciIsImluZGV4T2YiLCJqb2luIiwiYmxvY2tzIiwiVHlwZUVycm9yIiwic3R5bGUiLCJkeW5hbWljVGVtcGxhdGUiLCJqc3hDb21wb25lbnQiLCJ0YWdzIiwic3R5bGVkIiwidGFnIiwiYWN0aW9ucyIsImRlZmF1bHRNZXJnZSIsIlN5bWJvbCIsInNraXAiLCJkZWZhdWx0TWV0YURhdGFVcGRhdGVyIiwicHJldmlvdXNNZXRhIiwibWV0YU1ldGEiLCJnZXRPYmplY3RUeXBlIiwib2JqZWN0IiwiaXNBcnJheSIsImlzUmVjb3JkIiwiU2V0IiwiTWFwIiwiZ2V0S2V5cyIsIm9iamVjdHMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiYWRkIiwib2JqZWN0SGFzUHJvcGVydHkiLCJwcm9wZXJ0eSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiZ2V0SXRlcmFibGVPZkl0ZXJhYmxlcyIsIml0ZXJhYmxlcyIsIml0ZXJhdG9yIiwiaXRlcmFibGUiLCJ2YWxpZFJlY29yZFRvU3RyaW5nVmFsdWVzIiwiaGFzIiwiY29uc3RydWN0b3IiLCJ1bmRlZmluZWQiLCJoYXNPd25Qcm9wZXJ0eSIsIm1lcmdlUmVjb3JkcyQyIiwidmFsdWVzIiwidXRpbHMiLCJtZXRhIiwicHJvcFZhbHVlcyIsInVwZGF0ZWRNZXRhIiwibWV0YURhdGFVcGRhdGVyIiwicHJvcGVydHlSZXN1bHQiLCJtZXJnZVVua25vd25zIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJtZXJnZUFycmF5cyQyIiwiZmxhdCIsIm1lcmdlU2V0cyQyIiwibWVyZ2VNYXBzJDIiLCJtZXJnZU90aGVycyQyIiwiZGVmYXVsdE1lcmdlRnVuY3Rpb25zIiwiZnJlZXplIiwiX19wcm90b19fIiwibWVyZ2VSZWNvcmRzIiwibWVyZ2VBcnJheXMiLCJtZXJnZVNldHMiLCJtZXJnZU1hcHMiLCJtZXJnZU90aGVycyIsImRlZXBtZXJnZSIsImRlZXBtZXJnZUN1c3RvbSIsIm9wdGlvbnMiLCJyb290TWV0YURhdGEiLCJnZXRVdGlscyIsImN1c3RvbWl6ZWREZWVwbWVyZ2UiLCJfYSIsIl9iIiwibWVyZ2VGdW5jdGlvbnMiLCJmcm9tRW50cmllcyIsImVudHJpZXMiLCJmaWx0ZXIiLCJvcHRpb24iLCJtYXAiLCJ1c2VJbXBsaWNpdERlZmF1bHRNZXJnaW5nIiwiZW5hYmxlSW1wbGljaXREZWZhdWx0TWVyZ2luZyIsIm1lcmdlT3RoZXJzJDEiLCJtX2luZGV4IiwibWVyZ2VSZWNvcmRzJDEiLCJtZXJnZUFycmF5cyQxIiwibWVyZ2VTZXRzJDEiLCJtZXJnZU1hcHMkMSIsImdldEJhc2VQcm9wcyIsImF4aXMiLCJ4TWF4IiwieE1pbiIsIl9jIiwieFN0ZXAiLCJfZCIsInlNYXgiLCJfZSIsInlNaW4iLCJfZiIsInlTdGVwIiwiX2ciLCJnZXRDb29yZGluYXRlcyIsImV2ZW50IiwibGFzdFBvc2l0aW9uIiwiX19yZWFkIiwiX19zcHJlYWRBcnJheSIsImZyb20iLCJ0b3VjaGVzIiwidG91Y2giLCJ4IiwiY2xpZW50WCIsInkiLCJjbGllbnRZIiwiZ2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsImVsIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0Iiwid2lkdGgiLCJkeCIsImR5IiwiTWF0aCIsInJvdW5kIiwiZ2V0Tm9ybWFsaXplZFZhbHVlIiwibWluIiwibWF4IiwiaXNOdW1iZXIiLCJwYXJzZU51bWJlciIsInBhcnNlSW50IiwicmVtb3ZlUHJvcGVydGllcyIsImlucHV0Iiwib3V0cHV0IiwiaW5jbHVkZXMiLCJpbmNyZW1lbnQiLCJjZWlsIiwiZGVmYXVsdE9wdGlvbnMiLCJwYWRkaW5nIiwicmFuZ2VDb2xvciIsInRodW1iQm9yZGVyIiwidGh1bWJCb3JkZXJSYWRpdXMiLCJ0aHVtYkJvcmRlclJhZGl1c1hZIiwidGh1bWJDb2xvciIsInRodW1iU2l6ZSIsInRodW1iU2l6ZVhZIiwidGh1bWJTcGFjZSIsInRyYWNrQm9yZGVyUmFkaXVzIiwidHJhY2tDb2xvciIsImdldFN0eWxlcyIsInNsaWRlciIsImJveFNpemluZyIsImRpc3BsYXkiLCJ0cmFuc2l0aW9uIiwidHJhY2siLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJSYWRpdXMiLCJyYW5nZSIsInJhaWwiLCJ0aHVtYiIsImJvcmRlciIsImRlZmF1bHRTdHlsZXMiLCJyYW5nZVgiLCJfX2Fzc2lnbiIsInRvcCIsInJhbmdlWFkiLCJib3R0b20iLCJyYW5nZVkiLCJsZWZ0Iiwic2xpZGVyWCIsInNsaWRlclhZIiwic2xpZGVyWSIsInRodW1iWCIsInRodW1iWFkiLCJ0aHVtYlkiLCJ0cmFja1giLCJ0cmFja1hZIiwibWluSGVpZ2h0IiwidHJhY2tZIiwiUmFuZ2VTbGlkZXIiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJfdGhpcyIsImxhc3RDb29yZGluYXRlcyIsIm1vdW50ZWQiLCJvZmZzZXQiLCJzdGFydCIsImdldERyYWdQb3NpdGlvbiIsInVwZGF0ZU9wdGlvbnMiLCJfayIsImN1cnJlbnQiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiX2oiLCJfaCIsInVwZGF0ZVBvc2l0aW9uIiwic2V0U3RhdGUiLCJoYW5kbGVCbHVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZUtleWRvd24iLCJoYW5kbGVDbGlja1RyYWNrIiwib25BZnRlckVuZCIsImlzRHJhZ2dpbmciLCJzdGF0ZSIsImVsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwibmV4dFBvc2l0aW9uIiwiaGFuZGxlRHJhZyIsInByZXZlbnREZWZhdWx0IiwiY29vcmRpbmF0ZXMiLCJoYW5kbGVEcmFnRW5kIiwib25EcmFnRW5kIiwiaGFuZGxlRm9jdXMiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImlubmVyWCIsImlubmVyWSIsImNvZGVzIiwiZG93biIsInVwIiwicmlnaHQiLCJjb2RlIiwieE1pbnVzIiwieFBsdXMiLCJ5TWludXMiLCJ5UGx1cyIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZVRvdWNoU3RhcnQiLCJSZWFjdCIsImNyZWF0ZVJlZiIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiXyIsInByZXZpb3VzU3RhdGUiLCJvbkNoYW5nZSIsInByZXZpb3VzWCIsInByZXZpb3VzWSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVuZGVyIiwicmVzdCIsInhQb3MiLCJ5UG9zIiwiY29uY2F0Iiwic2l6ZSIsIm9yaWVudGF0aW9uIiwidmFsdWVtYXgiLCJ2YWx1ZW1pbiIsInZhbHVlbm93Iiwib25DbGljayIsInJvbGUiLCJvbk1vdXNlRG93biIsIm9uVG91Y2hTdGFydCIsIm9uQmx1ciIsIm9uRm9jdXMiLCJ0YWJJbmRleCIsImRlZmF1bHRQcm9wcyIsIkhTTEtleXMiLCJSR0JLZXlzIiwiaW52YXJpYW50IiwiY29uZGl0aW9uIiwibWVzc2FnZSIsImlzSFNMIiwiaXNQbGFpbk9iamVjdCIsImV2ZXJ5IiwiZ2V0UHJvdG90eXBlT2YiLCJpc1JHQiIsImlzUkdCQXJyYXkiLCJkIiwiaXNTdHJpbmciLCJsaW1pdCIsIm1lc3NhZ2VzIiwiYW1vdW50IiwiaW5wdXRTdHJpbmciLCJpbnZhbGlkIiwiZGlnaXRzIiwiZmFjdG9yIiwiaXNWYWxpZEhleCIsImFscGhhIiwidGVzdCIsImZvcm1hdEhleCIsImNvbG9yIiwiaGV4IiwiZm9yRWFjaCIsImhleDJyZ2IiLCJzdWJzdHIiLCJyIiwiU3RyaW5nIiwiY2hhckF0IiwiZyIsImIiLCJyZ2IyaHNsIiwicmdiIiwickxpbWl0IiwiZ0xpbWl0IiwiYkxpbWl0IiwiZGVsdGEiLCJzIiwibCIsInJhdGUiLCJhYnMiLCJ0b0ZpeGVkIiwiaGV4MmhzbCIsImh1ZTJyZ2IiLCJwb2ludCIsImNocm9tYSIsImh1ZSIsImhzbDJyZ2IiLCJyZ2IyaGV4IiwiaHNsMmhleCIsImNzc0NvbG9ycyIsImFsaWNlYmx1ZSIsImFudGlxdWV3aGl0ZSIsImFxdWEiLCJhcXVhbWFyaW5lIiwiYXp1cmUiLCJiZWlnZSIsImJpc3F1ZSIsImJsYWNrIiwiYmxhbmNoZWRhbG1vbmQiLCJibHVlIiwiYmx1ZXZpb2xldCIsImJyb3duIiwiYnVybHl3b29kIiwiY2FkZXRibHVlIiwiY2hhcnRyZXVzZSIsImNob2NvbGF0ZSIsImNvcmFsIiwiY29ybmZsb3dlcmJsdWUiLCJjb3Juc2lsayIsImNyaW1zb24iLCJjeWFuIiwiZGFya2JsdWUiLCJkYXJrY3lhbiIsImRhcmtnb2xkZW5yb2QiLCJkYXJrZ3JheSIsImRhcmtncmV5IiwiZGFya2dyZWVuIiwiZGFya2toYWtpIiwiZGFya21hZ2VudGEiLCJkYXJrb2xpdmVncmVlbiIsImRhcmtvcmFuZ2UiLCJkYXJrb3JjaGlkIiwiZGFya3JlZCIsImRhcmtzYWxtb24iLCJkYXJrc2VhZ3JlZW4iLCJkYXJrc2xhdGVibHVlIiwiZGFya3NsYXRlZ3JheSIsImRhcmtzbGF0ZWdyZXkiLCJkYXJrdHVycXVvaXNlIiwiZGFya3Zpb2xldCIsImRlZXBwaW5rIiwiZGVlcHNreWJsdWUiLCJkaW1ncmF5IiwiZGltZ3JleSIsImRvZGdlcmJsdWUiLCJmaXJlYnJpY2siLCJmbG9yYWx3aGl0ZSIsImZvcmVzdGdyZWVuIiwiZnVjaHNpYSIsImdhaW5zYm9ybyIsImdob3N0d2hpdGUiLCJnb2xkIiwiZ29sZGVucm9kIiwiZ3JheSIsImdyZXkiLCJncmVlbiIsImdyZWVueWVsbG93IiwiaG9uZXlkZXciLCJob3RwaW5rIiwiaW5kaWFucmVkIiwiaW5kaWdvIiwiaXZvcnkiLCJraGFraSIsImxhdmVuZGVyIiwibGF2ZW5kZXJibHVzaCIsImxhd25ncmVlbiIsImxlbW9uY2hpZmZvbiIsImxpZ2h0Ymx1ZSIsImxpZ2h0Y29yYWwiLCJsaWdodGN5YW4iLCJsaWdodGdvbGRlbnJvZHllbGxvdyIsImxpZ2h0Z3JheSIsImxpZ2h0Z3JleSIsImxpZ2h0Z3JlZW4iLCJsaWdodHBpbmsiLCJsaWdodHNhbG1vbiIsImxpZ2h0c2VhZ3JlZW4iLCJsaWdodHNreWJsdWUiLCJsaWdodHNsYXRlZ3JheSIsImxpZ2h0c2xhdGVncmV5IiwibGlnaHRzdGVlbGJsdWUiLCJsaWdodHllbGxvdyIsImxpbWUiLCJsaW1lZ3JlZW4iLCJsaW5lbiIsIm1hZ2VudGEiLCJtYXJvb24iLCJtZWRpdW1hcXVhbWFyaW5lIiwibWVkaXVtYmx1ZSIsIm1lZGl1bW9yY2hpZCIsIm1lZGl1bXB1cnBsZSIsIm1lZGl1bXNlYWdyZWVuIiwibWVkaXVtc2xhdGVibHVlIiwibWVkaXVtc3ByaW5nZ3JlZW4iLCJtZWRpdW10dXJxdW9pc2UiLCJtZWRpdW12aW9sZXRyZWQiLCJtaWRuaWdodGJsdWUiLCJtaW50Y3JlYW0iLCJtaXN0eXJvc2UiLCJtb2NjYXNpbiIsIm5hdmFqb3doaXRlIiwibmF2eSIsIm9sZGxhY2UiLCJvbGl2ZSIsIm9saXZlZHJhYiIsIm9yYW5nZSIsIm9yYW5nZXJlZCIsIm9yY2hpZCIsInBhbGVnb2xkZW5yb2QiLCJwYWxlZ3JlZW4iLCJwYWxldHVycXVvaXNlIiwicGFsZXZpb2xldHJlZCIsInBhcGF5YXdoaXAiLCJwZWFjaHB1ZmYiLCJwZXJ1IiwicGluayIsInBsdW0iLCJwb3dkZXJibHVlIiwicHVycGxlIiwicmVkIiwicm9zeWJyb3duIiwicm95YWxibHVlIiwic2FkZGxlYnJvd24iLCJzYWxtb24iLCJzYW5keWJyb3duIiwic2VhZ3JlZW4iLCJzZWFzaGVsbCIsInNpZW5uYSIsInNpbHZlciIsInNreWJsdWUiLCJzbGF0ZWJsdWUiLCJzbGF0ZWdyYXkiLCJzbGF0ZWdyZXkiLCJzbm93Iiwic3ByaW5nZ3JlZW4iLCJzdGVlbGJsdWUiLCJ0YW4iLCJ0ZWFsIiwidGhpc3RsZSIsInRvbWF0byIsInR1cnF1b2lzZSIsInZpb2xldCIsIndoZWF0Iiwid2hpdGUiLCJ3aGl0ZXNtb2tlIiwieWVsbG93IiwieWVsbG93Z3JlZW4iLCJwYXJzZUNTUyIsInBhcnNlZElucHV0IiwibWF0Y2hlcyIsIm1hdGNoIiwibW9kZWwiLCJoT1JyIiwic09SZyIsImxPUmIiLCJoc2wiLCJmYWRlIiwicGVyY2VudGFnZSIsInRleHRDb2xvciIsInlpcSIsImZvbnRTaXplIiwicCIsIm1hcmdpbiIsImFwcGVhcmFuY2UiLCJiYWNrZ3JvdW5kIiwiY3Vyc29yIiwibGluZUhlaWdodCIsIm91dGxpbmVDb2xvciIsIm91dGxpbmVPZmZzZXQiLCJTcG90aWZ5V2ViUGxheWVyIiwiX0NsYXNzIiwiUHVyZUNvbXBvbmVudCIsIl9kZWZpbmVQcm9wZXJ0eSIsImFydGlzdHMiLCJkdXJhdGlvbk1zIiwiaWQiLCJpbWFnZSIsInVyaSIsIm1lbW9pemUiLCJpZHMiLCJwbGF5T3B0aW9ucyIsImNvbnRleHRfdXJpIiwidXJpcyIsInZhbGlkYXRlVVJJIiwic29tZSIsImdldFNwb3RpZnlVUklUeXBlIiwid2FybiIsImNhbGxiYWNrIiwicHJvZ3Jlc3MiLCJzdGF0ZUNoYW5nZXMiLCJpc0V4dGVybmFsUGxheWVyIiwic2VlayIsInRva2VuIiwicHJvZ3Jlc3NNcyIsInBsYXllciIsImdldEN1cnJlbnRTdGF0ZSIsInRyYWNrX3dpbmRvdyIsImN1cnJlbnRfdHJhY2siLCJkdXJhdGlvbl9tcyIsInVwZGF0ZVN0YXRlIiwiVFlQRSIsIlBST0dSRVNTIiwiaXNBY3RpdmUiLCJ0b2dnbGVQbGF5IiwicHJldmlvdXMiLCJzeW5jVGltZW91dCIsInNldFRpbWVvdXQiLCJzeW5jRGV2aWNlIiwicHJldmlvdXNUcmFjayIsIm5leHQiLCJuZXh0VHJhY2siLCJkZXZpY2VJZCIsImlzVW5zdXBwb3J0ZWQiLCJhdXRvUGxheSIsInBlcnNpc3REZXZpY2VTZWxlY3Rpb24iLCJjdXJyZW50RGV2aWNlSWQiLCJzZXREZXZpY2UiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJwbGF5ZXJTdGF0ZSIsImdldFBsYXliYWNrU3RhdGUiLCJpc19wbGF5aW5nIiwic3RhdHVzIiwiaXNTYXZlZCIsImhhbmRsZUNhbGxiYWNrIiwiRkFWT1JJVEUiLCJpc1BsYXliYWNrRXJyb3IiLCJFUlJPUl9UWVBFIiwiUExBWUJBQ0siLCJpc0luaXRpYWxpemF0aW9uRXJyb3IiLCJJTklUSUFMSVpBVElPTiIsIm5leHRTdGF0dXMiLCJkZXZpY2VzIiwiZGlzY29ubmVjdCIsIlNUQVRVUyIsIlVOU1VQUE9SVEVEIiwiZ2V0RGV2aWNlcyIsIkVSUk9SIiwiZXJyb3JUeXBlIiwiaXNJbml0aWFsaXppbmciLCJwYXVzZWQiLCJyZXBlYXRfbW9kZSIsInNodWZmbGUiLCJzaHVmZmxlMiIsIm5leHRfdHJhY2tzIiwicHJldmlvdXNfdHJhY2tzIiwiaXNQbGF5aW5nIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwidHJhY2tTdGF0ZSIsIm5leHRUcmFja3MiLCJjb252ZXJ0VHJhY2siLCJwcmV2aW91c1RyYWNrcyIsInJlcGVhdCIsImdldFJlcGVhdFN0YXRlIiwiZGV2aWNlX2lkIiwiaW5pdGlhbGl6ZURldmljZXMiLCJSRUFEWSIsIklETEUiLCJsYXlvdXQiLCJjbGVhclRpbWVvdXQiLCJyZXNpemVUaW1lb3V0IiwicmVuZGVySW5saW5lQWN0aW9ucyIsImlubmVyV2lkdGgiLCJmb3JjZVVwZGF0ZSIsIm1hZ25pZnlTbGlkZXJPbkhvdmVyIiwiaXNNYWduaWZpZWQiLCJnZXRPQXV0aFRva2VuIiwiZ2V0UGxheWVyIiwiU3BvdGlmeSIsIlBsYXllciIsImFkZExpc3RlbmVyIiwiaGFuZGxlUGxheWVyU3RhdHVzIiwiaGFuZGxlUGxheWVyU3RhdGVDaGFuZ2VzIiwiaGFuZGxlUGxheWVyRXJyb3JzIiwiQVVUSEVOVElDQVRJT04iLCJBQ0NPVU5UIiwibG9nIiwiY29ubmVjdCIsInNldFZvbHVtZSIsImlzTW91bnRlZCIsImVtcHR5VHJhY2siLCJpdGVtIiwiZ2V0QWxidW1JbWFnZSIsImFsYnVtIiwicHJvZ3Jlc3NfbXMiLCJwYXJzZVZvbHVtZSIsImRldmljZSIsInZvbHVtZV9wZXJjZW50IiwiUExBWUVSIiwiZ2V0UGxheU9wdGlvbnMiLCJnZXRVUklzIiwicGxheSIsImZvcmNlIiwibmVlZHNVcGRhdGUiLCJzaG91bGRJbml0aWFsaXplIiwicGF1c2UiLCJhY3RpdmF0ZUVsZW1lbnQiLCJzaG91bGRQbGF5IiwiaXNGaW5pdGUiLCJzZWVrVXBkYXRlSW50ZXJ2YWwiLCJwbGF5ZXJQb3NpdGlvbiIsImluaXRpYWxWb2x1bWUiLCJsb2NhbGUiLCJnZXRMb2NhbGUiLCJnZXRNZXJnZWRTdHlsZXMiLCJpbm5lckhlaWdodCIsIklOSVRJQUxJWklORyIsIm9uU3BvdGlmeVdlYlBsYXliYWNrU0RLUmVhZHkiLCJpbml0aWFsaXplUGxheWVyIiwibG9hZFNwb3RpZnlQbGF5ZXIiLCJoYW5kbGVSZXNpemUiLCJwcmV2aW91c1Byb3BzIiwicmVwZWF0MiIsInBsYXlQcm9wIiwic2hvd1NhdmVJY29uIiwic3luY0V4dGVybmFsRGV2aWNlIiwiaXNSZWFkeSIsImNhblBsYXkiLCJERVZJQ0UiLCJ0b2dnbGVTeW5jSW50ZXJ2YWwiLCJ1cGRhdGVTZWVrQmFyIiwiVFJBQ0siLCJ0b2dnbGVQcm9ncmVzc0JhciIsInRvZ2dsZU9mZnNldCIsInNldEV4dGVybmFsRGV2aWNlIiwiY2xlYXJJbnRlcnZhbCIsInBsYXllclN5bmNJbnRlcnZhbCIsInBsYXllclByb2dyZXNzSW50ZXJ2YWwiLCJzYXZlZERldmljZUlkIiwiZ2V0SXRlbSIsInNob3VsZFN5bmMiLCJzeW5jRXh0ZXJuYWxEZXZpY2VJbnRlcnZhbCIsInNldEludGVydmFsIiwiY29tcG9uZW50cyIsImhpZGVBdHRyaWJ1dGlvbiIsImhpZGVDb3ZlckFydCIsImlubGluZVZvbHVtZSIsInVwZGF0ZVNhdmVkU3RhdHVzIiwibWFpbiIsImpzeDI3IiwiTG9hZGVyIiwiaW5mbyIsIkluZm9fZGVmYXVsdCIsIm9uRmF2b3JpdGVTdGF0dXNDaGFuZ2UiLCJoYW5kbGVGYXZvcml0ZVN0YXR1c0NoYW5nZSIsIkRldmljZXMiLCJvbkNsaWNrRGV2aWNlIiwiaGFuZGxlQ2xpY2tEZXZpY2UiLCJvcGVuIiwiVm9sdW1lIiwianN4czYiLCJBY3Rpb25zX2RlZmF1bHQiLCJjaGlsZHJlbiIsImNvbnRyb2xzIiwiQ29udHJvbHNfZGVmYXVsdCIsImlzRXh0ZXJuYWxEZXZpY2UiLCJvbkNoYW5nZVJhbmdlIiwiaGFuZGxlQ2hhbmdlUmFuZ2UiLCJvbkNsaWNrTmV4dCIsImhhbmRsZUNsaWNrTmV4dCIsIm9uQ2xpY2tQcmV2aW91cyIsImhhbmRsZUNsaWNrUHJldmlvdXMiLCJvbkNsaWNrVG9nZ2xlUGxheSIsImhhbmRsZUNsaWNrVG9nZ2xlUGxheSIsIm9uVG9nZ2xlTWFnbmlmeSIsImhhbmRsZVRvZ2dsZU1hZ25pZnkiLCJXcmFwcGVyX2RlZmF1bHQiLCJFcnJvck1lc3NhZ2UiLCJQbGF5ZXJfZGVmYXVsdCIsInNyY19kZWZhdWx0IiwiU3BvdGlmeVBsYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsU0FBU0EsUUFBQUEsQ0FBeUNDLElBQUEsRUFBYztBQUU5RCxFQUFBLE9BQVFDLEtBQUEsSUFBK0IsT0FBT0EsS0FBQSxLQUFVRCxJQUFBLENBQUE7QUFDMUQsQ0FBQTtBQU1PLElBQU1FLFVBQUEsR0FBYUgsUUFBQSxDQUFtQixVQUFVLENBQUEsQ0FBQTtBQUtoRCxJQUFNSSxNQUFBLEdBQVVGLEtBQUEsSUFBa0M7QUFDdkQsRUFBQSxPQUFPQSxLQUFBLEtBQVUsSUFBQSxDQUFBO0FBQ25CLENBQUEsQ0FBQTtBQUtPLElBQU1HLE9BQUEsR0FBV0gsS0FBQSxJQUFvQztBQUMxRCxFQUFBLE9BQU9JLE1BQUEsQ0FBT0MsU0FBQSxDQUFVQyxRQUFBLENBQVNDLElBQUEsQ0FBS1AsS0FBSyxDQUFFUSxDQUFBQSxLQUFBLENBQU0sQ0FBQSxFQUFHLEVBQUUsQ0FBTSxLQUFBLFFBQUEsQ0FBQTtBQUNoRSxDQUFBLENBQUE7QUFLTyxJQUFNQyxRQUFBLEdBQVlULEtBQUEsSUFBdUM7QUFDOUQsRUFBQSxPQUFPLENBQUNVLGFBQUEsQ0FBWVYsS0FBSyxDQUFBLElBQUssQ0FBQ0UsTUFBQSxDQUFPRixLQUFLLENBQUEsS0FBTUMs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QUcsR0FBR0csQ0FBQyxHQUFHLEdBQUcsR0FBR0MsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUE7QUFFaEQsRUFBQSxPQUFPb0wsR0FBRyxJQUFJLEdBQUcsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFBO0FBQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
