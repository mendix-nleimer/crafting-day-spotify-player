
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
define(['exports', 'react', 'react/jsx-runtime'], (function (exports, React, jsxRuntime) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

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
      _this.slider = React__namespace.createRef();
      _this.rail = React__namespace.createRef();
      _this.track = React__namespace.createRef();
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
      return React__namespace.createElement("div", __assign({
        ref: this.slider,
        className: className,
        style: slider
      }, rest), React__namespace.createElement("div", {
        ref: this.track,
        className: className && "".concat(className, "__track"),
        onClick: this.handleClickTrack,
        role: "presentation",
        // @ts-ignore We can't use React's events because the listeners
        style: track
      }, React__namespace.createElement("div", {
        className: className && "".concat(className, "__range"),
        style: __assign(__assign({}, size), range)
      }), React__namespace.createElement("div", {
        ref: this.rail,
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleTouchStart,
        // @ts-ignore We can't use React's events because the listeners
        role: "presentation",
        // @ts-ignore We can't use React's events because the listeners
        style: __assign(__assign({}, this.styles.rail), position)
      }, React__namespace.createElement("span", {
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
  }(React__namespace.Component);

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
    h: React.createElement
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
    return /* @__PURE__ */jsxRuntime.jsx(Wrapper, {
      "data-component-name": "Actions",
      style: {
        h: styles.height,
        layout
      },
      children
    });
  }
  var Actions_default = React.memo(Actions);
  function Next(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M53.486 0a3.2 3.2 0 0 0-3.2 3.2v23.543L4.8.489A3.2 3.2 0 0 0 0 3.255V60.74a3.2 3.2 0 0 0 4.8 2.774l45.486-26.262V60.8a3.2 3.2 0 0 0 3.2 3.2H60.8a3.2 3.2 0 0 0 3.2-3.2V3.2A3.2 3.2 0 0 0 60.8 0h-7.314Z",
        fill: "currentColor"
      })
    });
  }
  function Pause(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm-5.4 18h-5.2a1.4 1.4 0 0 0-1.4 1.4v25.2a1.4 1.4 0 0 0 1.4 1.4h5.2a1.4 1.4 0 0 0 1.4-1.4V19.4a1.4 1.4 0 0 0-1.4-1.4Zm16 0h-5.2a1.4 1.4 0 0 0-1.4 1.4v25.2a1.4 1.4 0 0 0 1.4 1.4h5.2a1.4 1.4 0 0 0 1.4-1.4V19.4a1.4 1.4 0 0 0-1.4-1.4Z",
        fill: "currentColor"
      })
    });
  }
  function Play(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm-7.61 18.188c-.435.251-.702.715-.701 1.216v25.194a1.402 1.402 0 0 0 2.104 1.214L47.61 33.214a1.402 1.402 0 0 0 0-2.428L25.793 18.188c-.435-.25-.97-.25-1.404 0Z",
        fill: "currentColor"
      })
    });
  }
  function Previous(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
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
    return /* @__PURE__ */jsxRuntime.jsxs(Wrapper2, {
      "data-component-name": "Slider",
      "data-position": position,
      onMouseEnter: onToggleMagnify,
      onMouseLeave: onToggleMagnify,
      style: {
        c: styles.color,
        sliderHeight: styles.sliderHeight
      },
      children: [/* @__PURE__ */jsxRuntime.jsx("div", {
        className: "rswp_progress",
        children: millisecondsToTime(progressMs)
      }), /* @__PURE__ */jsxRuntime.jsx(RangeSlider, {
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
      }), /* @__PURE__ */jsxRuntime.jsx("div", {
        className: "rswp_duration",
        children: millisecondsToTime(durationMs)
      })]
    });
  }
  var Slider_default = React.memo(Slider);
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
    return /* @__PURE__ */jsxRuntime.jsxs(Wrapper3, {
      "data-component-name": "Controls",
      "data-playing": isPlaying,
      style: {
        layout
      },
      children: [/* @__PURE__ */jsxRuntime.jsxs(Buttons, {
        style: {
          c: color
        },
        children: [devices && /* @__PURE__ */jsxRuntime.jsx("div", {
          className: "rswp__devices",
          children: devices
        }), /* @__PURE__ */jsxRuntime.jsx("div", {
          children: leftButton
        }), /* @__PURE__ */jsxRuntime.jsx("div", {
          children: /* @__PURE__ */jsxRuntime.jsx(Button, {
            "aria-label": locale.previous,
            className: "ButtonRSWP",
            disabled: !isActive && !isExternalDevice,
            onClick: onClickPrevious,
            title: locale.previous,
            type: "button",
            children: /* @__PURE__ */jsxRuntime.jsx(Previous, {})
          })
        }), /* @__PURE__ */jsxRuntime.jsx("div", {
          children: /* @__PURE__ */jsxRuntime.jsx(Button, {
            "aria-label": isPlaying ? locale.pause : locale.play,
            className: "ButtonRSWP rswp__toggle",
            onClick: onClickTogglePlay,
            title: isPlaying ? locale.pause : locale.play,
            type: "button",
            children: isPlaying ? /* @__PURE__ */jsxRuntime.jsx(Pause, {}) : /* @__PURE__ */jsxRuntime.jsx(Play, {})
          })
        }), /* @__PURE__ */jsxRuntime.jsx("div", {
          children: /* @__PURE__ */jsxRuntime.jsx(Button, {
            "aria-label": locale.next,
            className: "ButtonRSWP",
            disabled: !nextTracks.length && !isActive && !isExternalDevice,
            onClick: onClickNext,
            title: locale.next,
            type: "button",
            children: /* @__PURE__ */jsxRuntime.jsx(Next, {})
          })
        }), /* @__PURE__ */jsxRuntime.jsx("div", {
          children: rightButton
        }), volume && /* @__PURE__ */jsxRuntime.jsx("div", {
          className: "rswp__volume",
          children: volume
        })]
      }), /* @__PURE__ */jsxRuntime.jsx(Slider_default, {
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
  var Controls_default = React.memo(Controls);
  function ClickOutside(props) {
    const {
      children,
      isActive,
      onClick,
      ...rest
    } = props;
    const containerRef = React.useRef(null);
    const isTouch = React.useRef(false);
    const handleClick = React.useRef(event => {
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
    React.useEffect(() => {
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
    return /* @__PURE__ */jsxRuntime.jsx("div", {
      ref: containerRef,
      ...rest,
      children
    });
  }
  var ClickOutside_default = React.memo(ClickOutside);
  function DevicesIcon(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M57 4c3.864 0 7 3.136 7 7v42a7 7 0 0 1-7 7H31a7 7 0 0 1-7-7V11c0-3.864 3.136-7 7-7h26ZM16 54v6H8v-6h8Zm41-44H31a1 1 0 0 0-1 1v42a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1ZM44 32a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM16 4v6H7a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h9v6H7a7 7 0 0 1-7-7V11c0-3.864 3.136-7 7-7h9Zm28 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
        fill: "currentColor"
      })
    });
  }
  function DevicesComputerIcon(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M7.226 10.323a7.228 7.228 0 0 1 7.226-7.226h35.096a7.228 7.228 0 0 1 7.226 7.226V37.16a7.226 7.226 0 0 1-7.226 7.226H14.452a7.226 7.226 0 0 1-7.226-7.226V10.323Zm7.226-1.033c-.57 0-1.033.462-1.033 1.033V37.16c0 .57.463 1.033 1.033 1.033h35.096c.57 0 1.033-.463 1.033-1.033V10.323c0-.57-.463-1.033-1.033-1.033H14.452ZM0 57.806a3.097 3.097 0 0 1 3.097-3.096h57.806a3.097 3.097 0 0 1 0 6.193H3.097A3.097 3.097 0 0 1 0 57.806Z",
        fill: "currentColor"
      })
    });
  }
  function DevicesMobileIcon(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M44.8 0a9.6 9.6 0 0 1 9.6 9.6v44.8a9.6 9.6 0 0 1-9.6 9.6H19.2a9.6 9.6 0 0 1-9.6-9.6V9.6A9.6 9.6 0 0 1 19.2 0h25.6Zm0 6.4H19.2A3.2 3.2 0 0 0 16 9.6v44.8a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V9.6a3.2 3.2 0 0 0-3.2-3.2ZM32 43.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
        fill: "currentColor"
      })
    });
  }
  function DevicesSpeakerIcon(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
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
      return /* @__PURE__ */jsxRuntime.jsx(DevicesSpeakerIcon, {});
    }
    if (type.toLowerCase().includes("computer")) {
      return /* @__PURE__ */jsxRuntime.jsx(DevicesComputerIcon, {});
    }
    return /* @__PURE__ */jsxRuntime.jsx(DevicesMobileIcon, {});
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
    const [isOpen, setOpen] = React.useState(open);
    const handleClickSetDevice = event => {
      const {
        dataset
      } = event.currentTarget;
      if (dataset.id) {
        onClickDevice(dataset.id);
        setOpen(false);
      }
    };
    const handleClickToggleList = React.useCallback(() => {
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
    let icon = /* @__PURE__ */jsxRuntime.jsx(DevicesIcon, {});
    if (deviceId && currentDevice && currentDevice.id !== deviceId) {
      icon = getDeviceIcon(currentDevice.type);
    }
    return /* @__PURE__ */jsxRuntime.jsx(ClickOutside_default, {
      isActive: isOpen,
      onClick: handleClickToggleList,
      children: /* @__PURE__ */jsxRuntime.jsx(Wrapper4, {
        "data-component-name": "Devices",
        "data-device-id": currentDeviceId,
        style: {
          c: color,
          layout,
          p: playerPosition
        },
        children: !!devices.length && /* @__PURE__ */jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [isOpen && /* @__PURE__ */jsxRuntime.jsxs("div", {
            children: [currentDevice && /* @__PURE__ */jsxRuntime.jsxs(ListHeader, {
              children: [/* @__PURE__ */jsxRuntime.jsx("p", {
                children: locale.currentDevice
              }), /* @__PURE__ */jsxRuntime.jsxs("p", {
                children: [getDeviceIcon(currentDevice.type), /* @__PURE__ */jsxRuntime.jsx("span", {
                  children: currentDevice.name
                })]
              })]
            }), !!otherDevices.length && /* @__PURE__ */jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [/* @__PURE__ */jsxRuntime.jsx("p", {
                children: locale.otherDevices
              }), otherDevices.map(device => /* @__PURE__ */jsxRuntime.jsxs("button", {
                "aria-label": device.name,
                className: "ButtonRSWP",
                "data-id": device.id,
                onClick: handleClickSetDevice,
                type: "button",
                children: [getDeviceIcon(device.type), /* @__PURE__ */jsxRuntime.jsx("span", {
                  children: device.name
                })]
              }, device.id))]
            }), /* @__PURE__ */jsxRuntime.jsx("span", {})]
          }), /* @__PURE__ */jsxRuntime.jsx("button", {
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
    return /* @__PURE__ */jsxRuntime.jsx(Wrapper5, {
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
    const [matches, setMatches] = React.useState(getMatches(input));
    function handleChange() {
      setMatches(getMatches(input));
    }
    React.useEffect(() => {
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
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  function Favorite(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M63.673 16.52A17.676 17.676 0 0 0 49.197 2.563c-5.4-.861-10.891.852-14.844 4.63a3.43 3.43 0 0 1-4.672 0C22.956.689 12.305.62 5.498 7.039c-6.808 6.419-7.366 17.055-1.268 24.15l24.246 28.894a4.623 4.623 0 0 0 7.078 0L59.8 31.19a17.328 17.328 0 0 0 3.873-14.66v-.008Z",
        fill: "currentColor"
      })
    });
  }
  function FavoriteOutline(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M5.944 7.206C13.271.3 24.723.34 31.999 7.3A18.924 18.924 0 0 1 48.02 2.32h.008a19.068 19.068 0 0 1 15.617 15.071v.013A18.759 18.759 0 0 1 59.47 33.26L37.573 59.353a7.288 7.288 0 0 1-8.642 1.916 7.276 7.276 0 0 1-2.498-1.912l-21.901-26.1c-6.55-7.671-5.93-19.131 1.408-26.051h.004Zm13.04 1.04a12.726 12.726 0 0 0-9.737 20.997l.021.02 21.905 26.105c.316.372.84.488 1.284.285.143-.066.27-.164.372-.285l21.934-26.137a12.565 12.565 0 0 0 2.808-10.625 12.875 12.875 0 0 0-10.534-10.17 12.714 12.714 0 0 0-10.785 3.37l-.029.029a6.198 6.198 0 0 1-8.444 0l-.037-.033a12.727 12.727 0 0 0-8.758-3.556Z",
        fill: "currentColor"
      })
    });
  }
  function SpotifyLogo({
    bgColor,
    ...rest
  }) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 512 160",
      width: "3.2em",
      ...rest,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
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
    const [isSaved, setIsSaved] = React.useState(false);
    const isMounted = React.useRef(false);
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
    React.useEffect(() => {
      isMounted.current = true;
      if (showSaveIcon && id) {
        setStatus();
      }
      return () => {
        isMounted.current = false;
      };
    }, []);
    React.useEffect(() => {
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
      favorite = /* @__PURE__ */jsxRuntime.jsx("button", {
        "aria-label": isSaved ? locale.removeTrack : locale.saveTrack,
        className: `ButtonRSWP${isSaved ? " rswp__active" : ""}`,
        onClick: handleClickIcon,
        title: isSaved ? locale.removeTrack : locale.saveTrack,
        type: "button",
        children: isSaved ? /* @__PURE__ */jsxRuntime.jsx(Favorite, {}) : /* @__PURE__ */jsxRuntime.jsx(FavoriteOutline, {})
      });
    }
    const classes = [];
    if (isActive) {
      classes.push("rswp__active");
    }
    if (!id) {
      return /* @__PURE__ */jsxRuntime.jsx("div", {});
    }
    return /* @__PURE__ */jsxRuntime.jsxs(Wrapper6, {
      className: classes.join(" "),
      "data-component-name": "Info",
      style: {
        activeColor,
        c: color,
        h: height,
        layout,
        showSaveIcon
      },
      children: [!hideCoverArt && /* @__PURE__ */jsxRuntime.jsx("a", {
        "aria-label": title,
        href: getSpotifyLink(uri),
        rel: "noreferrer",
        target: "_blank",
        title,
        children: /* @__PURE__ */jsxRuntime.jsx("img", {
          alt: name,
          src: image
        })
      }), /* @__PURE__ */jsxRuntime.jsxs(ContentWrapper, {
        style: {
          hideCoverArt,
          layout,
          showSaveIcon
        },
        children: [!!name && /* @__PURE__ */jsxRuntime.jsxs(Content, {
          style: {
            bgColor,
            layout,
            showSaveIcon,
            trackArtistColor,
            trackNameColor
          },
          children: [/* @__PURE__ */jsxRuntime.jsx("div", {
            "data-type": "title-artist-wrapper",
            children: /* @__PURE__ */jsxRuntime.jsxs("div", {
              children: [/* @__PURE__ */jsxRuntime.jsx("p", {
                children: /* @__PURE__ */jsxRuntime.jsx("span", {
                  children: /* @__PURE__ */jsxRuntime.jsx("a", {
                    "aria-label": title,
                    href: getSpotifyLink(uri),
                    rel: "noreferrer",
                    target: "_blank",
                    title,
                    children: name
                  })
                })
              }), /* @__PURE__ */jsxRuntime.jsx("p", {
                title: artists.map(d => d.name).join(", "),
                children: artists.map((artist, index) => {
                  const artistTitle = getSpotifyLinkTitle(artist.name, locale.title);
                  return /* @__PURE__ */jsxRuntime.jsxs("span", {
                    children: [index ? ", " : "", /* @__PURE__ */jsxRuntime.jsx("a", {
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
        }), !hideAttribution && /* @__PURE__ */jsxRuntime.jsx("a", {
          "aria-label": "Play on Spotify",
          href: getSpotifyLink(uri),
          rel: "noreferrer",
          target: "_blank",
          children: /* @__PURE__ */jsxRuntime.jsx(SpotifyLogo, {
            bgColor
          })
        })]
      })]
    });
  }
  var Info_default = React.memo(Info);
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
    return /* @__PURE__ */jsxRuntime.jsx(Wrapper7, {
      "data-component-name": "Loader",
      style: {
        h: height,
        loaderColor,
        loaderSize
      },
      children: /* @__PURE__ */jsxRuntime.jsx("div", {})
    });
  }
  var Player = React.forwardRef((props, ref) => {
    const {
      children,
      styles: {
        bgColor,
        height
      },
      ...rest
    } = props;
    return /* @__PURE__ */jsxRuntime.jsx("div", {
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
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      "data-component-name": "VolumeHigh",
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M37.963 3.402a2.989 2.989 0 0 1 1.5 2.596v52a3 3 0 0 1-4.5 2.6l-27.7-16C.32 40.572-2.06 31.688 1.943 24.73a14.556 14.556 0 0 1 5.32-5.328l27.7-16a3 3 0 0 1 3 0ZM45 9.542a23.008 23.008 0 0 1 0 44.912V48.25a17.008 17.008 0 0 0 0-32.508Zm-11.532 1.656-23.2 13.4a8.556 8.556 0 0 0 0 14.8l23.2 13.4v-41.6ZM45 22.238a11 11 0 0 1 0 19.52v-19.52Z",
        fill: "currentColor"
      })
    });
  }
  function VolumeLow(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      "data-component-name": "VolumeLow",
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M37.963 3.398a3 3 0 0 1 1.5 2.6v52a3 3 0 0 1-4.5 2.6l-27.7-16C.32 40.572-2.06 31.688 1.943 24.73a14.556 14.556 0 0 1 5.32-5.328l27.7-16a3 3 0 0 1 3 0v-.004Zm-27.696 21.2a8.556 8.556 0 0 0 0 14.8l23.2 13.4v-41.6l-23.2 13.4ZM45 41.758v-19.52a11 11 0 0 1 0 19.52Z",
        fill: "currentColor"
      })
    });
  }
  function VolumeHigh2(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      "data-component-name": "VolumeMid",
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
        d: "M37.963 3.398a3 3 0 0 1 1.5 2.6v52a3 3 0 0 1-4.5 2.6l-27.7-16C.32 40.572-2.06 31.688 1.943 24.73a14.556 14.556 0 0 1 5.32-5.328l27.7-16a3 3 0 0 1 3 0v-.004Zm-27.696 21.2a8.556 8.556 0 0 0 0 14.8l23.2 13.4v-41.6l-23.2 13.4ZM45 48.946a18.008 18.008 0 0 0 0-33.896v6.6a11.996 11.996 0 0 1 0 20.7v6.596Z",
        fill: "currentColor"
      })
    });
  }
  function VolumeMute(props) {
    return /* @__PURE__ */jsxRuntime.jsx("svg", {
      "data-component-name": "VolumeMute",
      height: "1em",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 64 64",
      width: "1em",
      ...props,
      children: /* @__PURE__ */jsxRuntime.jsx("path", {
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
    const [isOpen, setIsOpen] = React.useState(false);
    const [volumeState, setVolumeState] = React.useState(volume);
    const timeoutRef = React.useRef();
    const previousVolume = usePrevious(volume);
    const isMediumScreen = useMediaQuery("(min-width: 768px)");
    const isInline = layout === "responsive" && inlineVolume && isMediumScreen;
    React.useEffect(() => {
      if (previousVolume !== volume && volume !== volumeState) {
        setVolumeState(volume);
      }
    }, [previousVolume, volume, volumeState]);
    const handleClickToggleList = React.useCallback(() => {
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
    let icon = /* @__PURE__ */jsxRuntime.jsx(VolumeHigh, {});
    if (volume === 0) {
      icon = /* @__PURE__ */jsxRuntime.jsx(VolumeMute, {});
    } else if (volume <= 0.4) {
      icon = /* @__PURE__ */jsxRuntime.jsx(VolumeLow, {});
    } else if (volume <= 0.7) {
      icon = /* @__PURE__ */jsxRuntime.jsx(VolumeHigh2, {});
    }
    if (isInline) {
      return /* @__PURE__ */jsxRuntime.jsxs(WrapperInline, {
        "data-component-name": "Volume",
        "data-value": volume,
        style: {
          c: styles.color
        },
        children: [/* @__PURE__ */jsxRuntime.jsx("span", {
          children: icon
        }), /* @__PURE__ */jsxRuntime.jsx("div", {
          children: /* @__PURE__ */jsxRuntime.jsx(RangeSlider, {
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
    return /* @__PURE__ */jsxRuntime.jsx(ClickOutside_default, {
      isActive: isOpen,
      onClick: handleClickToggleList,
      children: /* @__PURE__ */jsxRuntime.jsxs(WrapperWithToggle, {
        "data-component-name": "Volume",
        "data-value": volume,
        style: {
          c: styles.color,
          layout,
          p: playerPosition
        },
        children: [isOpen && /* @__PURE__ */jsxRuntime.jsxs("div", {
          children: [/* @__PURE__ */jsxRuntime.jsx(RangeSlider, {
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
          }), /* @__PURE__ */jsxRuntime.jsx("span", {})]
        }), /* @__PURE__ */jsxRuntime.jsx("button", {
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
    return /* @__PURE__ */jsxRuntime.jsx(StyledWrapper, {
      "data-component-name": "Wrapper",
      style: {
        h: styles.height,
        layout
      },
      children
    });
  }
  var Wrapper_default = React.memo(Wrapper8);
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
  var SpotifyWebPlayer$1 = (_Class = class SpotifyWebPlayer extends React.PureComponent {
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
      _defineProperty(this, "ref", React.createRef());
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
        main: /* @__PURE__ */jsxRuntime.jsx(Loader, {
          styles: this.styles
        })
      };
      if (isReady) {
        if (!output.info) {
          output.info = /* @__PURE__ */jsxRuntime.jsx(Info_default, {
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
        output.devices = /* @__PURE__ */jsxRuntime.jsx(Devices, {
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
        output.volume = currentDeviceId ? /* @__PURE__ */jsxRuntime.jsx(Volume, {
          inlineVolume,
          layout,
          locale: this.locale,
          playerPosition,
          setVolume: this.setVolume,
          styles: this.styles,
          volume
        }) : null;
        if (this.renderInlineActions) {
          output.actions = /* @__PURE__ */jsxRuntime.jsxs(Actions_default, {
            layout,
            styles: this.styles,
            children: [output.devices, output.volume]
          });
        }
        output.controls = /* @__PURE__ */jsxRuntime.jsx(Controls_default, {
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
        output.main = /* @__PURE__ */jsxRuntime.jsxs(Wrapper_default, {
          layout,
          styles: this.styles,
          children: [output.info, output.controls, output.actions]
        });
      } else if (output.info) {
        output.main = output.info;
      }
      if (status === STATUS.ERROR) {
        output.main = /* @__PURE__ */jsxRuntime.jsx(ErrorMessage, {
          styles: this.styles,
          children: error
        });
      }
      return /* @__PURE__ */jsxRuntime.jsx(Player_default, {
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
      return (React.createElement(src_default, { token: token.displayValue, uris: uri.displayValue }));
  }

  exports.SpotifyWebPlayer = SpotifyWebPlayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVdlYlBsYXllci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BnaWxiYXJiYXJhL2RlZXAtZXF1YWwvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3BvdGlmeS13ZWItcGxheWJhY2svbm9kZV9tb2R1bGVzL21lbW9pemUtb25lL2Rpc3QvbWVtb2l6ZS1vbmUuZXNtLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25hbm8tY3NzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25hbm8tY3NzL2FkZG9uL2NhY2hlLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25hbm8tY3NzL2FkZG9uL19fZGV2X18vd2Fybk9uTWlzc2luZ0RlcGVuZGVuY2llcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9hZGRvbi9qc3guanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmFuby1jc3MvYWRkb24va2V5ZnJhbWVzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25hbm8tY3NzL2FkZG9uL25lc3RpbmcuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbmFuby1jc3MvYWRkb24vcnVsZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9hZGRvbi9zdHlsZS5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLWNzcy9hZGRvbi9zdHlsZWQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVlcG1lcmdlLXRzL2Rpc3Qvbm9kZS9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGdpbGJhcmJhcmEvcmVhY3QtcmFuZ2Utc2xpZGVyL2VzbS91dGlscy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZ2lsYmFyYmFyYS9yZWFjdC1yYW5nZS1zbGlkZXIvZXNtL3N0eWxlcy5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZ2lsYmFyYmFyYS9yZWFjdC1yYW5nZS1zbGlkZXIvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9tb2R1bGVzL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9pcy12YWxpZC1oZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL2Zvcm1hdC1oZXguanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL2hleDJyZ2IuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL3JnYjJoc2wuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL2hleDJoc2wuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL21vZHVsZXMvaHVlMnJnYi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vaHNsMnJnYi5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vcmdiMmhleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vaHNsMmhleC5qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jb2xvcml6ci9lc20vbW9kdWxlcy9jc3MtY29sb3JzLmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NvbG9yaXpyL2VzbS9wYXJzZS1jc3MuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL2ZhZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY29sb3JpenIvZXNtL3RleHQtY29sb3IuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3BvdGlmeS13ZWItcGxheWJhY2svZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvU3BvdGlmeVdlYlBsYXllci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2hlbHBlcnMudHNcbmZ1bmN0aW9uIGlzT2ZUeXBlKHR5cGUpIHtcbiAgcmV0dXJuICh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSB0eXBlO1xufVxudmFyIGlzRnVuY3Rpb24gPSBpc09mVHlwZShcImZ1bmN0aW9uXCIpO1xudmFyIGlzTnVsbCA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG59O1xudmFyIGlzUmVnZXggPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpID09PSBcIlJlZ0V4cFwiO1xufTtcbnZhciBpc09iamVjdCA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gIWlzVW5kZWZpbmVkKHZhbHVlKSAmJiAhaXNOdWxsKHZhbHVlKSAmJiAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKTtcbn07XG52YXIgaXNVbmRlZmluZWQgPSBpc09mVHlwZShcInVuZGVmaW5lZFwiKTtcblxuLy8gc3JjL2luZGV4LnRzXG5mdW5jdGlvbiBlcXVhbEFycmF5KGxlZnQsIHJpZ2h0KSB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBsZWZ0O1xuICBpZiAobGVuZ3RoICE9PSByaWdodC5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaW5kZXggPSBsZW5ndGg7IGluZGV4LS0gIT09IDA7ICkge1xuICAgIGlmICghZXF1YWwobGVmdFtpbmRleF0sIHJpZ2h0W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBlcXVhbEFycmF5QnVmZmVyKGxlZnQsIHJpZ2h0KSB7XG4gIGlmIChsZWZ0LmJ5dGVMZW5ndGggIT09IHJpZ2h0LmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdmlldzEgPSBuZXcgRGF0YVZpZXcobGVmdC5idWZmZXIpO1xuICBjb25zdCB2aWV3MiA9IG5ldyBEYXRhVmlldyhyaWdodC5idWZmZXIpO1xuICBsZXQgaW5kZXggPSBsZWZ0LmJ5dGVMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgaWYgKHZpZXcxLmdldFVpbnQ4KGluZGV4KSAhPT0gdmlldzIuZ2V0VWludDgoaW5kZXgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gZXF1YWxNYXAobGVmdCwgcmlnaHQpIHtcbiAgaWYgKGxlZnQuc2l6ZSAhPT0gcmlnaHQuc2l6ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGNvbnN0IGluZGV4IG9mIGxlZnQuZW50cmllcygpKSB7XG4gICAgaWYgKCFyaWdodC5oYXMoaW5kZXhbMF0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgaW5kZXggb2YgbGVmdC5lbnRyaWVzKCkpIHtcbiAgICBpZiAoIWVxdWFsKGluZGV4WzFdLCByaWdodC5nZXQoaW5kZXhbMF0pKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVxdWFsU2V0KGxlZnQsIHJpZ2h0KSB7XG4gIGlmIChsZWZ0LnNpemUgIT09IHJpZ2h0LnNpemUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChjb25zdCBpbmRleCBvZiBsZWZ0LmVudHJpZXMoKSkge1xuICAgIGlmICghcmlnaHQuaGFzKGluZGV4WzBdKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVxdWFsKGxlZnQsIHJpZ2h0KSB7XG4gIGlmIChsZWZ0ID09PSByaWdodCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChsZWZ0ICYmIGlzT2JqZWN0KGxlZnQpICYmIHJpZ2h0ICYmIGlzT2JqZWN0KHJpZ2h0KSkge1xuICAgIGlmIChsZWZ0LmNvbnN0cnVjdG9yICE9PSByaWdodC5jb25zdHJ1Y3Rvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShsZWZ0KSAmJiBBcnJheS5pc0FycmF5KHJpZ2h0KSkge1xuICAgICAgcmV0dXJuIGVxdWFsQXJyYXkobGVmdCwgcmlnaHQpO1xuICAgIH1cbiAgICBpZiAobGVmdCBpbnN0YW5jZW9mIE1hcCAmJiByaWdodCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgcmV0dXJuIGVxdWFsTWFwKGxlZnQsIHJpZ2h0KTtcbiAgICB9XG4gICAgaWYgKGxlZnQgaW5zdGFuY2VvZiBTZXQgJiYgcmlnaHQgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIHJldHVybiBlcXVhbFNldChsZWZ0LCByaWdodCk7XG4gICAgfVxuICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcobGVmdCkgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KHJpZ2h0KSkge1xuICAgICAgcmV0dXJuIGVxdWFsQXJyYXlCdWZmZXIobGVmdCwgcmlnaHQpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdleChsZWZ0KSAmJiBpc1JlZ2V4KHJpZ2h0KSkge1xuICAgICAgcmV0dXJuIGxlZnQuc291cmNlID09PSByaWdodC5zb3VyY2UgJiYgbGVmdC5mbGFncyA9PT0gcmlnaHQuZmxhZ3M7XG4gICAgfVxuICAgIGlmIChsZWZ0LnZhbHVlT2YgIT09IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZikge1xuICAgICAgcmV0dXJuIGxlZnQudmFsdWVPZigpID09PSByaWdodC52YWx1ZU9mKCk7XG4gICAgfVxuICAgIGlmIChsZWZ0LnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSB7XG4gICAgICByZXR1cm4gbGVmdC50b1N0cmluZygpID09PSByaWdodC50b1N0cmluZygpO1xuICAgIH1cbiAgICBjb25zdCBsZWZ0S2V5cyA9IE9iamVjdC5rZXlzKGxlZnQpO1xuICAgIGNvbnN0IHJpZ2h0S2V5cyA9IE9iamVjdC5rZXlzKHJpZ2h0KTtcbiAgICBpZiAobGVmdEtleXMubGVuZ3RoICE9PSByaWdodEtleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGluZGV4ID0gbGVmdEtleXMubGVuZ3RoOyBpbmRleC0tICE9PSAwOyApIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJpZ2h0LCBsZWZ0S2V5c1tpbmRleF0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaW5kZXggPSBsZWZ0S2V5cy5sZW5ndGg7IGluZGV4LS0gIT09IDA7ICkge1xuICAgICAgY29uc3Qga2V5ID0gbGVmdEtleXNbaW5kZXhdO1xuICAgICAgaWYgKGtleSA9PT0gXCJfb3duZXJcIiAmJiBsZWZ0LiQkdHlwZW9mKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFlcXVhbChsZWZ0W2tleV0sIHJpZ2h0W2tleV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKE51bWJlci5pc05hTihsZWZ0KSAmJiBOdW1iZXIuaXNOYU4ocmlnaHQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0O1xufVxuZXhwb3J0IHtcbiAgZXF1YWwgYXMgZGVmYXVsdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCJ2YXIgc2FmZUlzTmFOID0gTnVtYmVyLmlzTmFOIHx8XG4gICAgZnVuY3Rpb24gcG9ueWZpbGwodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUgIT09IHZhbHVlO1xuICAgIH07XG5mdW5jdGlvbiBpc0VxdWFsKGZpcnN0LCBzZWNvbmQpIHtcbiAgICBpZiAoZmlyc3QgPT09IHNlY29uZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHNhZmVJc05hTihmaXJzdCkgJiYgc2FmZUlzTmFOKHNlY29uZCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGFyZUlucHV0c0VxdWFsKG5ld0lucHV0cywgbGFzdElucHV0cykge1xuICAgIGlmIChuZXdJbnB1dHMubGVuZ3RoICE9PSBsYXN0SW5wdXRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3SW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghaXNFcXVhbChuZXdJbnB1dHNbaV0sIGxhc3RJbnB1dHNbaV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG1lbW9pemVPbmUocmVzdWx0Rm4sIGlzRXF1YWwpIHtcbiAgICBpZiAoaXNFcXVhbCA9PT0gdm9pZCAwKSB7IGlzRXF1YWwgPSBhcmVJbnB1dHNFcXVhbDsgfVxuICAgIHZhciBjYWNoZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gbWVtb2l6ZWQoKSB7XG4gICAgICAgIHZhciBuZXdBcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBuZXdBcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlICYmIGNhY2hlLmxhc3RUaGlzID09PSB0aGlzICYmIGlzRXF1YWwobmV3QXJncywgY2FjaGUubGFzdEFyZ3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGUubGFzdFJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGFzdFJlc3VsdCA9IHJlc3VsdEZuLmFwcGx5KHRoaXMsIG5ld0FyZ3MpO1xuICAgICAgICBjYWNoZSA9IHtcbiAgICAgICAgICAgIGxhc3RSZXN1bHQ6IGxhc3RSZXN1bHQsXG4gICAgICAgICAgICBsYXN0QXJnczogbmV3QXJncyxcbiAgICAgICAgICAgIGxhc3RUaGlzOiB0aGlzLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG4gICAgbWVtb2l6ZWQuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgY2FjaGUgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG5leHBvcnQgeyBtZW1vaXplT25lIGFzIGRlZmF1bHQgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEtFQkFCX1JFR0VYID0gL1tBLVpdL2c7XG5cbnZhciBoYXNoID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBoID0gNTM4MSwgaSA9IHN0ci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSkgaCA9IChoICogMzMpIF4gc3RyLmNoYXJDb2RlQXQoLS1pKTtcblxuICAgIHJldHVybiAnXycgKyAoaCA+Pj4gMCkudG9TdHJpbmcoMzYpO1xufTtcblxuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIHZhciBhc3NpZ24gPSBjb25maWcuYXNzaWduIHx8IE9iamVjdC5hc3NpZ247XG4gICAgdmFyIGNsaWVudCA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnO1xuXG4gICAgLy8gQ2hlY2sgaWYgd2UgYXJlIHJlYWxseSBpbiBicm93c2VyIGVudmlyb25tZW50LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChjbGllbnQpIHtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIGRvY3VtZW50ICE9PSAnb2JqZWN0JykgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdIVE1MJykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnbmFuby1jc3MgZGV0ZWN0ZWQgYnJvd3NlciBlbnZpcm9ubWVudCBiZWNhdXNlIG9mIFwid2luZG93XCIgZ2xvYmFsLCBidXQgJyArXG4gICAgICAgICAgICAgICAgICAgICdcImRvY3VtZW50XCIgZ2xvYmFsIHNlZW1zIHRvIGJlIGRlZmVjdGl2ZS4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZW5kZXJlciA9IGFzc2lnbih7XG4gICAgICAgIHJhdzogJycsXG4gICAgICAgIHBmeDogJ18nLFxuICAgICAgICBjbGllbnQ6IGNsaWVudCxcbiAgICAgICAgYXNzaWduOiBhc3NpZ24sXG4gICAgICAgIHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnksXG4gICAgICAgIGtlYmFiOiBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AucmVwbGFjZShLRUJBQl9SRUdFWCwgJy0kJicpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlY2w6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBrZXkgPSByZW5kZXJlci5rZWJhYihrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGtleSArICc6JyArIHZhbHVlICsgJzsnO1xuICAgICAgICB9LFxuICAgICAgICBoYXNoOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzaChyZW5kZXJlci5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdG9yOiBmdW5jdGlvbiAocGFyZW50LCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudCArIChzZWxlY3RvclswXSA9PT0gJzonID8gJycgIDogJyAnKSArIHNlbGVjdG9yO1xuICAgICAgICB9LFxuICAgICAgICBwdXRSYXc6IGZ1bmN0aW9uIChyYXdDc3NSdWxlKSB7XG4gICAgICAgICAgICByZW5kZXJlci5yYXcgKz0gcmF3Q3NzUnVsZTtcbiAgICAgICAgfVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICBpZiAocmVuZGVyZXIuY2xpZW50KSB7XG4gICAgICAgIGlmICghcmVuZGVyZXIuc2gpXG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHJlbmRlcmVyLnNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSk7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLnNoLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW5vLWNzcy1kZXYnLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIFRlc3Qgc3R5bGUgc2hlZXQgdXNlZCBpbiBERVYgbW9kZSB0byB0ZXN0IGlmIC5pbnNldFJ1bGUoKSB3b3VsZCB0aHJvdy5cbiAgICAgICAgICAgIHJlbmRlcmVyLnNoVGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICByZW5kZXJlci5zaFRlc3Quc2V0QXR0cmlidXRlKCdkYXRhLW5hbm8tY3NzLWRldi10ZXN0cycsICcnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocmVuZGVyZXIuc2hUZXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlcmVyLnB1dFJhdyA9IGZ1bmN0aW9uIChyYXdDc3NSdWxlKSB7XG4gICAgICAgICAgICAvLyAuaW5zZXJ0UnVsZSgpIGlzIGZhc3RlciB0aGFuIC5hcHBlbmRDaGlsZCgpLCB0aGF0J3Mgd2h5IHdlIHVzZSBpdCBpbiBQUk9ELlxuICAgICAgICAgICAgLy8gQnV0IENTUyBpbmplY3RlZCB1c2luZyAuaW5zZXJ0UnVsZSgpIGlzIG5vdCBkaXNwbGF5ZWQgaW4gQ2hyb21lIERldnRvb2xzLFxuICAgICAgICAgICAgLy8gdGhhdCdzIHdoeSB3ZSB1c2UgLmFwcGVuZENoaWxkIGluIERFVi5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNoZWV0ID0gcmVuZGVyZXIuc2guc2hlZXQ7XG5cbiAgICAgICAgICAgICAgICAvLyBVbmtub3duIHBzZXVkby1zZWxlY3RvcnMgd2lsbCB0aHJvdywgdGhpcyB0cnkvY2F0Y2ggc3dhbGxvd3MgYWxsIGVycm9ycy5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzaGVldC5pbnNlcnRSdWxlKHJhd0Nzc1J1bGUsIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRlc3QgaWYgLmluc2VydFJ1bGUoKSB3b3JrcyBpbiBkZXYgbW9kZS4gVW5rbm93biBwc2V1ZG8tc2VsZWN0b3JzIHdpbGwgdGhyb3cgd2hlblxuICAgICAgICAgICAgICAgIC8vIC5pbnNlcnRSdWxlKCkgaXMgdXNlZCwgYnV0IC5hcHBlbmRDaGlsZCgpIHdpbGwgbm90IHRocm93LlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLnNoVGVzdC5zaGVldC5pbnNlcnRSdWxlKHJhd0Nzc1J1bGUsIHJlbmRlcmVyLnNoVGVzdC5zaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcudmVyYm9zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgcHJldHR5LXByaW50ZWQgQ1NTIGZvciBkZXYgbW9kZS5cbiAgICAgICAgICAgICAgICByZW5kZXJlci5zaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShyYXdDc3NSdWxlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyZXIucHV0ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBkZWNscywgYXRydWxlKSB7XG4gICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgdmFyIHByb3AsIHZhbHVlO1xuICAgICAgICB2YXIgcG9zdHBvbmVkID0gW107XG5cbiAgICAgICAgZm9yIChwcm9wIGluIGRlY2xzKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGRlY2xzW3Byb3BdO1xuXG4gICAgICAgICAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgcG9zdHBvbmVkLnB1c2gocHJvcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgIXJlbmRlcmVyLnNvdXJjZW1hcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICcgICAgJyArIHJlbmRlcmVyLmRlY2wocHJvcCwgdmFsdWUsIHNlbGVjdG9yLCBhdHJ1bGUpICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IHJlbmRlcmVyLmRlY2wocHJvcCwgdmFsdWUsIHNlbGVjdG9yLCBhdHJ1bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHIpIHtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgIXJlbmRlcmVyLnNvdXJjZW1hcHMpIHtcbiAgICAgICAgICAgICAgICBzdHIgPSAnXFxuJyArIHNlbGVjdG9yICsgJyB7XFxuJyArIHN0ciArICd9XFxuJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyID0gc2VsZWN0b3IgKyAneycgKyBzdHIgKyAnfSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW5kZXJlci5wdXRSYXcoYXRydWxlID8gYXRydWxlICsgJ3snICsgc3RyICsgJ30nIDogc3RyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zdHBvbmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9wID0gcG9zdHBvbmVkW2ldO1xuXG4gICAgICAgICAgICBpZiAocHJvcFswXSA9PT0gJ0AnICYmIHByb3AgIT09ICdAZm9udC1mYWNlJykge1xuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnB1dEF0KHNlbGVjdG9yLCBkZWNsc1twcm9wXSwgcHJvcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnB1dChyZW5kZXJlci5zZWxlY3RvcihzZWxlY3RvciwgcHJvcCksIGRlY2xzW3Byb3BdLCBhdHJ1bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlcmVyLnB1dEF0ID0gcmVuZGVyZXIucHV0O1xuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5hZGRvbiA9IGZ1bmN0aW9uIChyZW5kZXJlcikge1xuICAgIHZhciBjYWNoZSA9IHt9O1xuXG4gICAgcmVuZGVyZXIuY2FjaGUgPSBmdW5jdGlvbiAoY3NzKSB7XG4gICAgICAgIGlmICghY3NzKSByZXR1cm4gJyc7XG5cbiAgICAgICAgdmFyIGtleSA9IHJlbmRlcmVyLmhhc2goY3NzKTtcblxuICAgICAgICBpZiAoIWNhY2hlW2tleV0pIHtcbiAgICAgICAgICAgIGNhY2hlW2tleV0gPSByZW5kZXJlci5ydWxlKGNzcywga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWNoZVtrZXldO1xuICAgIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcGtnTmFtZSA9ICduYW5vLWNzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2Fybk9uTWlzc2luZ0RlcGVuZGVuY2llcyAoYWRkb24sIHJlbmRlcmVyLCBkZXBzKSB7XG4gICAgdmFyIG1pc3NpbmcgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmFtZSA9IGRlcHNbaV07XG5cbiAgICAgICAgaWYgKCFyZW5kZXJlcltuYW1lXSkge1xuICAgICAgICAgICAgbWlzc2luZy5wdXNoKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1pc3NpbmcubGVuZ3RoKSB7XG4gICAgICAgIHZhciBzdHIgPSAnQWRkb24gXCInICsgYWRkb24gKyAnXCIgaXMgbWlzc2luZyB0aGUgZm9sbG93aW5nIGRlcGVuZGVuY2llczonO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWlzc2luZy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgc3RyICs9ICdcXG4gcmVxdWlyZShcIicgKyBwa2dOYW1lICsgJy9hZGRvbi8nICsgbWlzc2luZ1tqXSArICdcIikuYWRkb24obmFubyk7JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzdHIpO1xuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhZGRvbkNhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpLmFkZG9uO1xuXG5leHBvcnRzLmFkZG9uID0gZnVuY3Rpb24gKHJlbmRlcmVyKSB7XG4gICAgaWYgKCFyZW5kZXJlci5jYWNoZSkge1xuICAgICAgICBhZGRvbkNhY2hlKHJlbmRlcmVyKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICByZXF1aXJlKCcuL19fZGV2X18vd2Fybk9uTWlzc2luZ0RlcGVuZGVuY2llcycpKCdqc3gnLCByZW5kZXJlciwgWydydWxlJywgJ2NhY2hlJ10pO1xuICAgIH1cblxuICAgIHJlbmRlcmVyLmpzeCA9IGZ1bmN0aW9uIChmbiwgc3R5bGVzLCBibG9jaykge1xuICAgICAgICB2YXIgY2xhc3NOYW1lO1xuICAgICAgICB2YXIgaXNFbGVtZW50ID0gdHlwZW9mIGZuID09PSAnc3RyaW5nJztcblxuICAgICAgICAvLyBJbiBkZXYgbW9kZSBlbWl0IENTUyBpbW1lZGlhdGVseSBzbyBjb3JyZWN0IHNvdXJjZW1hcHMgY2FuIGJlIGdlbmVyYXRlZC5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IHJlbmRlcmVyLnJ1bGUoc3R5bGVzLCBibG9jayk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgQ29tcG9uZW50ID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHJlbmRlcmVyLnJ1bGUoc3R5bGVzLCBibG9jayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb3B5ID0gcHJvcHM7XG4gICAgICAgICAgICB2YXIgJGFzID0gY29weS4kYXM7XG4gICAgICAgICAgICB2YXIgJHJlZiA9IGNvcHkuJHJlZjtcblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb3B5ID0gcmVuZGVyZXIuYXNzaWduKHt9LCBwcm9wcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeW5hbWljQ2xhc3NOYW1lID0gcmVuZGVyZXIuY2FjaGUocHJvcHMuY3NzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjb3B5LmNzcztcbiAgICAgICAgICAgIGRlbGV0ZSBjb3B5LiRhcztcblxuICAgICAgICAgICAgaWYgKGlzRWxlbWVudCB8fCAkYXMpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgY29weS4kcmVmO1xuICAgICAgICAgICAgICAgIGNvcHkucmVmID0gJHJlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29weS5jbGFzc05hbWUgPSAocHJvcHMuY2xhc3NOYW1lIHx8ICcnKSArIGNsYXNzTmFtZSArIGR5bmFtaWNDbGFzc05hbWU7XG5cbiAgICAgICAgICAgIHJldHVybiAoaXNFbGVtZW50IHx8ICRhcylcbiAgICAgICAgICAgICAgICA/IHJlbmRlcmVyLmgoJGFzIHx8IGZuLCBjb3B5KVxuICAgICAgICAgICAgICAgIDogZm4oY29weSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChibG9jaykge1xuICAgICAgICAgICAgICAgIENvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdqc3goJyArIGJsb2NrICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcbiAgICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5hZGRvbiA9IGZ1bmN0aW9uIChyZW5kZXJlciwgY29uZmlnKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9fX2Rldl9fL3dhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMnKSgna2V5ZnJhbWVzJywgcmVuZGVyZXIsIFsncHV0UmF3JywgJ3B1dCddKTtcbiAgICB9XG5cbiAgICBjb25maWcgPSByZW5kZXJlci5hc3NpZ24oe1xuICAgICAgICBwcmVmaXhlczogWyctd2Via2l0LScsICctbW96LScsICctby0nLCAnJ10sXG4gICAgfSwgY29uZmlnIHx8IHt9KTtcblxuICAgIHZhciBwcmVmaXhlcyA9IGNvbmZpZy5wcmVmaXhlcztcblxuICAgIGlmIChyZW5kZXJlci5jbGllbnQpIHtcbiAgICAgICAgLy8gQ3JhZXRlIEBrZXlmcmFtZSBTdHlsZXNoZWV0IGBrc2hgLlxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHJlbmRlcmVyLmtzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJykpO1xuICAgIH1cblxuICAgIHZhciBwdXRBdCA9IHJlbmRlcmVyLnB1dEF0O1xuXG4gICAgcmVuZGVyZXIucHV0QXQgPSBmdW5jdGlvbiAoX18sIGtleWZyYW1lcywgcHJlbHVkZSkge1xuICAgICAgICAvLyBAa2V5ZnJhbWVzXG4gICAgICAgIGlmIChwcmVsdWRlWzFdID09PSAnaycpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcblxuICAgICAgICAgICAgZm9yICh2YXIga2V5ZnJhbWUgaW4ga2V5ZnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY2xzID0ga2V5ZnJhbWVzW2tleWZyYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgc3RyRGVjbHMgPSAnJztcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZGVjbHMpXG4gICAgICAgICAgICAgICAgICAgIHN0ckRlY2xzICs9IHJlbmRlcmVyLmRlY2wocHJvcCwgZGVjbHNbcHJvcF0pO1xuXG4gICAgICAgICAgICAgICAgc3RyICs9IGtleWZyYW1lICsgJ3snICsgc3RyRGVjbHMgKyAnfSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHJhd0tleWZyYW1lcyA9IHByZWx1ZGUucmVwbGFjZSgnQGtleWZyYW1lcycsICdAJyArIHByZWZpeCArICdrZXlmcmFtZXMnKSArICd7JyArIHN0ciArICd9JztcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlci5jbGllbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXIua3NoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHJhd0tleWZyYW1lcykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLnB1dFJhdyhyYXdLZXlmcmFtZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHV0QXQoX18sIGtleWZyYW1lcywgcHJlbHVkZSk7XG4gICAgfTtcblxuICAgIHJlbmRlcmVyLmtleWZyYW1lcyA9IGZ1bmN0aW9uIChrZXlmcmFtZXMsIGJsb2NrKSB7XG4gICAgICAgIGlmICghYmxvY2spIGJsb2NrID0gcmVuZGVyZXIuaGFzaChrZXlmcmFtZXMpO1xuICAgICAgICBibG9jayA9IHJlbmRlcmVyLnBmeCArIGJsb2NrO1xuXG4gICAgICAgIHJlbmRlcmVyLnB1dEF0KCcnLCBrZXlmcmFtZXMsICdAa2V5ZnJhbWVzICcgKyBibG9jayk7XG5cbiAgICAgICAgcmV0dXJuIGJsb2NrO1xuICAgIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmFkZG9uID0gZnVuY3Rpb24gKHJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIuc2VsZWN0b3IgPSBmdW5jdGlvbiAocGFyZW50U2VsZWN0b3JzLCBzZWxlY3Rvcikge1xuICAgICAgICB2YXIgcGFyZW50cyA9IHBhcmVudFNlbGVjdG9ycy5zcGxpdCgnLCcpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBzZWxlY3RvcnMgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuICAgICAgICB2YXIgbGVuMSA9IHBhcmVudHMubGVuZ3RoO1xuICAgICAgICB2YXIgbGVuMiA9IHNlbGVjdG9ycy5sZW5ndGg7XG4gICAgICAgIHZhciBpLCBqLCBzZWwsIHBvcywgcGFyZW50LCByZXBsYWNlZFNlbGVjdG9yO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW4yOyBpKyspIHtcbiAgICAgICAgICAgIHNlbCA9IHNlbGVjdG9yc1tpXTtcbiAgICAgICAgICAgIHBvcyA9IHNlbC5pbmRleE9mKCcmJyk7XG5cbiAgICAgICAgICAgIGlmIChwb3MgPiAtMSkge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZWRTZWxlY3RvciA9IHNlbC5yZXBsYWNlKC8mL2csIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJlcGxhY2VkU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnRzW2pdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcmVudCArICcgJyArIHNlbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcsJyk7XG4gICAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuYWRkb24gPSBmdW5jdGlvbiAocmVuZGVyZXIpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICByZXF1aXJlKCcuL19fZGV2X18vd2Fybk9uTWlzc2luZ0RlcGVuZGVuY2llcycpKCdydWxlJywgcmVuZGVyZXIsIFsncHV0J10pO1xuICAgIH1cblxuICAgIHZhciBibG9ja3M7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBibG9ja3MgPSB7fTtcbiAgICB9XG5cbiAgICByZW5kZXJlci5ydWxlID0gZnVuY3Rpb24gKGNzcywgYmxvY2spIHtcbiAgICAgICAgLy8gV2FybiB1c2VyIGlmIENTUyBzZWxlY3RvcnMgY2xhc2guXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBpZiAoYmxvY2spIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2NrICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbm8tY3NzIGJsb2NrIG5hbWUgbXVzdCBiZSBhIHN0cmluZy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnRm9yIGV4YW1wbGUsIHVzZSBuYW5vLnJ1bGUoe2NvbG9yOiBcInJlZFwiLCBcIlJlZFRleHRcIikuJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChibG9ja3NbYmxvY2tdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Jsb2NrIG5hbWUgXCInICsgYmxvY2sgKyAnXCIgdXNlZCBtb3JlIHRoYW4gb25jZS4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBibG9ja3NbYmxvY2tdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJsb2NrID0gYmxvY2sgfHwgcmVuZGVyZXIuaGFzaChjc3MpO1xuICAgICAgICBibG9jayA9IHJlbmRlcmVyLnBmeCArIGJsb2NrO1xuICAgICAgICByZW5kZXJlci5wdXQoJy4nICsgYmxvY2ssIGNzcyk7XG5cbiAgICAgICAgcmV0dXJuICcgJyArIGJsb2NrO1xuICAgIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmFkZG9uID0gZnVuY3Rpb24gKHJlbmRlcmVyKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9fX2Rldl9fL3dhcm5Pbk1pc3NpbmdEZXBlbmRlbmNpZXMnKSgnc3R5bGUnLCByZW5kZXJlciwgWydqc3gnXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyZXIuc3R5bGUgPSBmdW5jdGlvbiAoZm4sIHN0eWxlcywgZHluYW1pY1RlbXBsYXRlLCBibG9jaykge1xuICAgICAgICB2YXIganN4Q29tcG9uZW50ID0gcmVuZGVyZXIuanN4KGZuLCBzdHlsZXMsIGJsb2NrKTtcblxuICAgICAgICB2YXIgQ29tcG9uZW50ID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBjb3B5ID0gcHJvcHM7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29weSA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGR5bmFtaWNUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvcHkuY3NzID0gZHluYW1pY1RlbXBsYXRlKHByb3BzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGpzeENvbXBvbmVudChjb3B5KTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGJsb2NrIHx8ICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gJ3N0eWxlKCcgKyAoYmxvY2sgfHwgZm4uZGlzcGxheU5hbWUgfHwgZm4ubmFtZSkgKyAnKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ29tcG9uZW50O1xuICAgIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGFncyA9IFtcbiAgICAnYScsXG4gICAgJ2FiYnInLFxuICAgICdhZGRyZXNzJyxcbiAgICAnYXJlYScsXG4gICAgJ2FydGljbGUnLFxuICAgICdhc2lkZScsXG4gICAgJ2F1ZGlvJyxcbiAgICAnYicsXG4gICAgJ2Jhc2UnLFxuICAgICdiZGknLFxuICAgICdiZG8nLFxuICAgICdiaWcnLFxuICAgICdibG9ja3F1b3RlJyxcbiAgICAnYm9keScsXG4gICAgJ2JyJyxcbiAgICAnYnV0dG9uJyxcbiAgICAnY2FudmFzJyxcbiAgICAnY2FwdGlvbicsXG4gICAgJ2NpdGUnLFxuICAgICdjb2RlJyxcbiAgICAnY29sJyxcbiAgICAnY29sZ3JvdXAnLFxuICAgICdkYXRhJyxcbiAgICAnZGF0YWxpc3QnLFxuICAgICdkZCcsXG4gICAgJ2RlbCcsXG4gICAgJ2RldGFpbHMnLFxuICAgICdkZm4nLFxuICAgICdkaWFsb2cnLFxuICAgICdkaXYnLFxuICAgICdkbCcsXG4gICAgJ2R0JyxcbiAgICAnZW0nLFxuICAgICdlbWJlZCcsXG4gICAgJ2ZpZWxkc2V0JyxcbiAgICAnZmlnY2FwdGlvbicsXG4gICAgJ2ZpZ3VyZScsXG4gICAgJ2Zvb3RlcicsXG4gICAgJ2Zvcm0nLFxuICAgICdoMScsXG4gICAgJ2gyJyxcbiAgICAnaDMnLFxuICAgICdoNCcsXG4gICAgJ2g1JyxcbiAgICAnaDYnLFxuICAgICdoZWFkJyxcbiAgICAnaGVhZGVyJyxcbiAgICAnaGdyb3VwJyxcbiAgICAnaHInLFxuICAgICdodG1sJyxcbiAgICAnaScsXG4gICAgJ2lmcmFtZScsXG4gICAgJ2ltZycsXG4gICAgJ2lucHV0JyxcbiAgICAnaW5zJyxcbiAgICAna2JkJyxcbiAgICAna2V5Z2VuJyxcbiAgICAnbGFiZWwnLFxuICAgICdsZWdlbmQnLFxuICAgICdsaScsXG4gICAgJ2xpbmsnLFxuICAgICdtYWluJyxcbiAgICAnbWFwJyxcbiAgICAnbWFyaycsXG4gICAgJ21hcnF1ZWUnLFxuICAgICdtZW51JyxcbiAgICAnbWVudWl0ZW0nLFxuICAgICdtZXRhJyxcbiAgICAnbWV0ZXInLFxuICAgICduYXYnLFxuICAgICdub3NjcmlwdCcsXG4gICAgJ29iamVjdCcsXG4gICAgJ29sJyxcbiAgICAnb3B0Z3JvdXAnLFxuICAgICdvcHRpb24nLFxuICAgICdvdXRwdXQnLFxuICAgICdwJyxcbiAgICAncGFyYW0nLFxuICAgICdwaWN0dXJlJyxcbiAgICAncHJlJyxcbiAgICAncHJvZ3Jlc3MnLFxuICAgICdxJyxcbiAgICAncnAnLFxuICAgICdydCcsXG4gICAgJ3J1YnknLFxuICAgICdzJyxcbiAgICAnc2FtcCcsXG4gICAgJ3NjcmlwdCcsXG4gICAgJ3NlY3Rpb24nLFxuICAgICdzZWxlY3QnLFxuICAgICdzbWFsbCcsXG4gICAgJ3NvdXJjZScsXG4gICAgJ3NwYW4nLFxuICAgICdzdHJvbmcnLFxuICAgICdzdHlsZScsXG4gICAgJ3N1YicsXG4gICAgJ3N1bW1hcnknLFxuICAgICdzdXAnLFxuICAgICd0YWJsZScsXG4gICAgJ3Rib2R5JyxcbiAgICAndGQnLFxuICAgICd0ZXh0YXJlYScsXG4gICAgJ3Rmb290JyxcbiAgICAndGgnLFxuICAgICd0aGVhZCcsXG4gICAgJ3RpbWUnLFxuICAgICd0aXRsZScsXG4gICAgJ3RyJyxcbiAgICAndHJhY2snLFxuICAgICd1JyxcbiAgICAndWwnLFxuICAgICd2YXInLFxuICAgICd2aWRlbycsXG4gICAgJ3dicicsXG5cbiAgICAvLyBTVkdcbiAgICAnY2lyY2xlJyxcbiAgICAnY2xpcFBhdGgnLFxuICAgICdkZWZzJyxcbiAgICAnZWxsaXBzZScsXG4gICAgJ2ZvcmVpZ25PYmplY3QnLFxuICAgICdnJyxcbiAgICAnaW1hZ2UnLFxuICAgICdsaW5lJyxcbiAgICAnbGluZWFyR3JhZGllbnQnLFxuICAgICdtYXNrJyxcbiAgICAncGF0aCcsXG4gICAgJ3BhdHRlcm4nLFxuICAgICdwb2x5Z29uJyxcbiAgICAncG9seWxpbmUnLFxuICAgICdyYWRpYWxHcmFkaWVudCcsXG4gICAgJ3JlY3QnLFxuICAgICdzdG9wJyxcbiAgICAnc3ZnJyxcbiAgICAndGV4dCcsXG4gICAgJ3RzcGFuJyxcbl07XG5cbmV4cG9ydHMuYWRkb24gPSBmdW5jdGlvbiAocmVuZGVyZXIpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICByZXF1aXJlKCcuL19fZGV2X18vd2Fybk9uTWlzc2luZ0RlcGVuZGVuY2llcycpKCdzdHlsZWQnLCByZW5kZXJlciwgWydzdHlsZSddKTtcbiAgICB9XG5cbiAgICB2YXIgc3R5bGVkID0gZnVuY3Rpb24gKHRhZykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0eWxlcywgZHluYW1pY1RlbXBsYXRlLCBibG9jaykge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcmVyLnN0eWxlKHRhZywgc3R5bGVzLCBkeW5hbWljVGVtcGxhdGUsIGJsb2NrKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIHRhZztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YWcgPSB0YWdzW2ldO1xuICAgICAgICBzdHlsZWRbdGFnXSA9IHN0eWxlZCh0YWcpO1xuICAgIH1cblxuICAgIHJlbmRlcmVyLnN0eWxlZCA9IHN0eWxlZDtcbn07XG4iLCIvKipcbiAqIFNwZWNpYWwgdmFsdWVzIHRoYXQgdGVsbCBkZWVwbWVyZ2UgdG8gcGVyZm9ybSBhIGNlcnRhaW4gYWN0aW9uLlxuICovXG5jb25zdCBhY3Rpb25zID0ge1xuICAgIGRlZmF1bHRNZXJnZTogU3ltYm9sKFwiZGVlcG1lcmdlLXRzOiBkZWZhdWx0IG1lcmdlXCIpLFxuICAgIHNraXA6IFN5bWJvbChcImRlZXBtZXJnZS10czogc2tpcFwiKSxcbn07XG4vKipcbiAqIFNwZWNpYWwgdmFsdWVzIHRoYXQgdGVsbCBkZWVwbWVyZ2VJbnRvIHRvIHBlcmZvcm0gYSBjZXJ0YWluIGFjdGlvbi5cbiAqL1xuY29uc3QgYWN0aW9uc0ludG8gPSB7XG4gICAgZGVmYXVsdE1lcmdlOiBhY3Rpb25zLmRlZmF1bHRNZXJnZSxcbn07XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgZnVuY3Rpb24gdG8gdXBkYXRlIG1ldGEgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdE1ldGFEYXRhVXBkYXRlcihwcmV2aW91c01ldGEsIG1ldGFNZXRhKSB7XG4gICAgcmV0dXJuIG1ldGFNZXRhO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGdldCB0aGUgdHlwZSBvZi5cbiAqIEByZXR1cm5zIFRoZSB0eXBlIG9mIHRoZSBnaXZlbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGdldE9iamVjdFR5cGUob2JqZWN0KSB7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAwIC8qIE9iamVjdFR5cGUuTk9UICovO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiAyIC8qIE9iamVjdFR5cGUuQVJSQVkgKi87XG4gICAgfVxuICAgIGlmIChpc1JlY29yZChvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiAxIC8qIE9iamVjdFR5cGUuUkVDT1JEICovO1xuICAgIH1cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIHJldHVybiAzIC8qIE9iamVjdFR5cGUuU0VUICovO1xuICAgIH1cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJldHVybiA0IC8qIE9iamVjdFR5cGUuTUFQICovO1xuICAgIH1cbiAgICByZXR1cm4gNSAvKiBPYmplY3RUeXBlLk9USEVSICovO1xufVxuLyoqXG4gKiBHZXQgdGhlIGtleXMgb2YgdGhlIGdpdmVuIG9iamVjdHMgaW5jbHVkaW5nIHN5bWJvbCBrZXlzLlxuICpcbiAqIE5vdGU6IE9ubHkga2V5cyB0byBlbnVtZXJhYmxlIHByb3BlcnRpZXMgYXJlIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSBvYmplY3RzIC0gQW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBnZXQgdGhlIGtleXMgb2YuXG4gKiBAcmV0dXJucyBBIHNldCBjb250YWluaW5nIGFsbCB0aGUga2V5cyBvZiBhbGwgdGhlIGdpdmVuIG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGdldEtleXMob2JqZWN0cykge1xuICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KCk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgZnVuY3Rpb25hbC9uby1sb29wLXN0YXRlbWVudHMgLS0gdXNpbmcgYSBsb29wIGhlcmUgaXMgbW9yZSBlZmZpY2llbnQuICovXG4gICAgZm9yIChjb25zdCBvYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBbXG4gICAgICAgICAgICAuLi5PYmplY3Qua2V5cyhvYmplY3QpLFxuICAgICAgICAgICAgLi4uT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpLFxuICAgICAgICBdKSB7XG4gICAgICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgZnVuY3Rpb25hbC9uby1sb29wLXN0YXRlbWVudHMgKi9cbiAgICByZXR1cm4ga2V5cztcbn1cbi8qKlxuICogRG9lcyB0aGUgZ2l2ZW4gb2JqZWN0IGhhdmUgdGhlIGdpdmVuIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcGFyYW0gcHJvcGVydHkgLSBUaGUgcHJvcGVydHkgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG9iamVjdCBoYXMgdGhlIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBvYmplY3RIYXNQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHByb3BlcnR5KSk7XG59XG4vKipcbiAqIEdldCBhbiBpdGVyYWJsZSBvYmplY3QgdGhhdCBpdGVyYXRlcyBvdmVyIHRoZSBnaXZlbiBpdGVyYWJsZXMuXG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhYmxlT2ZJdGVyYWJsZXMoaXRlcmFibGVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZXJhYmxlIG9mIGl0ZXJhYmxlcykge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50c1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5jb25zdCB2YWxpZFJlY29yZFRvU3RyaW5nVmFsdWVzID0gbmV3IFNldChbXG4gICAgXCJbb2JqZWN0IE9iamVjdF1cIixcbiAgICBcIltvYmplY3QgTW9kdWxlXVwiLFxuXSk7XG4vKipcbiAqIERvZXMgdGhlIGdpdmVuIG9iamVjdCBhcHBlYXIgdG8gYmUgYSByZWNvcmQuXG4gKi9cbmZ1bmN0aW9uIGlzUmVjb3JkKHZhbHVlKSB7XG4gICAgLy8gQWxsIHJlY29yZHMgYXJlIG9iamVjdHMuXG4gICAgaWYgKCF2YWxpZFJlY29yZFRvU3RyaW5nVmFsdWVzLmhhcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHsgY29uc3RydWN0b3IgfSA9IHZhbHVlO1xuICAgIC8vIElmIGhhcyBtb2RpZmllZCBjb25zdHJ1Y3Rvci5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVubmVjZXNzYXJ5LWNvbmRpdGlvblxuICAgIGlmIChjb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICBjb25zdCBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgLy8gSWYgaGFzIG1vZGlmaWVkIHByb3RvdHlwZS5cbiAgICBpZiAocHJvdG90eXBlID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBwcm90b3R5cGUgIT09IFwib2JqZWN0XCIgfHxcbiAgICAgICAgIXZhbGlkUmVjb3JkVG9TdHJpbmdWYWx1ZXMuaGFzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm90b3R5cGUpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIElmIGNvbnN0cnVjdG9yIGRvZXMgbm90IGhhdmUgYW4gT2JqZWN0LXNwZWNpZmljIG1ldGhvZC5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc29uYXJqcy9wcmVmZXItc2luZ2xlLWJvb2xlYW4tcmV0dXJuLCBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICBpZiAoIXByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShcImlzUHJvdG90eXBlT2ZcIikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBNb3N0IGxpa2VseSBhIHJlY29yZC5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSByZWNvcmRzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgcmVjb3Jkcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VSZWNvcmRzJDIodmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzLCBmdW5jdGlvbmFsL25vLWNvbmRpdGlvbmFsLXN0YXRlbWVudHMgLS0gdXNpbmcgYSBsb29wIGhlcmUgaXMgbW9yZSBwZXJmb3JtYW50LiAqL1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGdldEtleXModmFsdWVzKSkge1xuICAgICAgICBjb25zdCBwcm9wVmFsdWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0SGFzUHJvcGVydHkodmFsdWUsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWVzLnB1c2godmFsdWVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGRhdGVkTWV0YSA9IHV0aWxzLm1ldGFEYXRhVXBkYXRlcihtZXRhLCB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBwYXJlbnRzOiB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eVJlc3VsdCA9IG1lcmdlVW5rbm93bnMocHJvcFZhbHVlcywgdXRpbHMsIHVwZGF0ZWRNZXRhKTtcbiAgICAgICAgaWYgKHByb3BlcnR5UmVzdWx0ID09PSBhY3Rpb25zLnNraXApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgPT09IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wZXJ0eVJlc3VsdCxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBwcm9wZXJ0eVJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzLCBmdW5jdGlvbmFsL25vLWNvbmRpdGlvbmFsLXN0YXRlbWVudHMgKi9cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSBhcnJheXMuXG4gKlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBhcnJheXMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXlzJDIodmFsdWVzKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5mbGF0KCk7XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0cmF0ZWd5IHRvIG1lcmdlIHNldHMuXG4gKlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBzZXRzLlxuICovXG5mdW5jdGlvbiBtZXJnZVNldHMkMih2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFNldChnZXRJdGVyYWJsZU9mSXRlcmFibGVzKHZhbHVlcykpO1xufVxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzdHJhdGVneSB0byBtZXJnZSBtYXBzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgbWFwcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VNYXBzJDIodmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAoZ2V0SXRlcmFibGVPZkl0ZXJhYmxlcyh2YWx1ZXMpKTtcbn1cbi8qKlxuICogR2V0IHRoZSBsYXN0IHZhbHVlIGluIHRoZSBnaXZlbiBhcnJheS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPdGhlcnMkMih2YWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbn1cblxudmFyIGRlZmF1bHRNZXJnZUZ1bmN0aW9ucyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgbWVyZ2VSZWNvcmRzOiBtZXJnZVJlY29yZHMkMixcbiAgICBtZXJnZUFycmF5czogbWVyZ2VBcnJheXMkMixcbiAgICBtZXJnZVNldHM6IG1lcmdlU2V0cyQyLFxuICAgIG1lcmdlTWFwczogbWVyZ2VNYXBzJDIsXG4gICAgbWVyZ2VPdGhlcnM6IG1lcmdlT3RoZXJzJDJcbn0pO1xuXG4vKipcbiAqIERlZXBseSBtZXJnZSBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSBvYmplY3RzIC0gVGhlIG9iamVjdHMgdG8gbWVyZ2UuXG4gKi9cbmZ1bmN0aW9uIGRlZXBtZXJnZSguLi5vYmplY3RzKSB7XG4gICAgcmV0dXJuIGRlZXBtZXJnZUN1c3RvbSh7fSkoLi4ub2JqZWN0cyk7XG59XG5mdW5jdGlvbiBkZWVwbWVyZ2VDdXN0b20ob3B0aW9ucywgcm9vdE1ldGFEYXRhKSB7XG4gICAgY29uc3QgdXRpbHMgPSBnZXRVdGlscyhvcHRpb25zLCBjdXN0b21pemVkRGVlcG1lcmdlKTtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VzdG9taXplZCBkZWVwbWVyZ2UgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3VzdG9taXplZERlZXBtZXJnZSguLi5vYmplY3RzKSB7XG4gICAgICAgIHJldHVybiBtZXJnZVVua25vd25zKG9iamVjdHMsIHV0aWxzLCByb290TWV0YURhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gY3VzdG9taXplZERlZXBtZXJnZTtcbn1cbi8qKlxuICogVGhlIHRoZSB1dGlscyB0aGF0IGFyZSBhdmFpbGFibGUgdG8gdGhlIG1lcmdlIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHRoZSB1c2VyIHNwZWNpZmllZFxuICovXG5mdW5jdGlvbiBnZXRVdGlscyhvcHRpb25zLCBjdXN0b21pemVkRGVlcG1lcmdlKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWZhdWx0TWVyZ2VGdW5jdGlvbnMsXG4gICAgICAgIG1lcmdlRnVuY3Rpb25zOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMsXG4gICAgICAgICAgICAuLi5PYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXMob3B0aW9ucylcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChba2V5LCBvcHRpb25dKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVmYXVsdE1lcmdlRnVuY3Rpb25zLCBrZXkpKVxuICAgICAgICAgICAgICAgIC5tYXAoKFtrZXksIG9wdGlvbl0pID0+IG9wdGlvbiA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICA/IFtrZXksIG1lcmdlT3RoZXJzJDJdXG4gICAgICAgICAgICAgICAgOiBba2V5LCBvcHRpb25dKSksXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGFEYXRhVXBkYXRlcjogKChfYSA9IG9wdGlvbnMubWV0YURhdGFVcGRhdGVyKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkZWZhdWx0TWV0YURhdGFVcGRhdGVyKSxcbiAgICAgICAgZGVlcG1lcmdlOiBjdXN0b21pemVkRGVlcG1lcmdlLFxuICAgICAgICB1c2VJbXBsaWNpdERlZmF1bHRNZXJnaW5nOiAoX2IgPSBvcHRpb25zLmVuYWJsZUltcGxpY2l0RGVmYXVsdE1lcmdpbmcpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGZhbHNlLFxuICAgICAgICBhY3Rpb25zLFxuICAgIH07XG59XG4vKipcbiAqIE1lcmdlIHVua25vd24gdGhpbmdzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBtZXJnZVVua25vd25zKHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VPdGhlcnMkMSh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGdldE9iamVjdFR5cGUodmFsdWVzWzBdKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuY3Rpb25hbC9uby1jb25kaXRpb25hbC1zdGF0ZW1lbnRzIC0tIGFkZCBhbiBlYXJseSBlc2NhcGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgICBpZiAodHlwZSAhPT0gMCAvKiBPYmplY3RUeXBlLk5PVCAqLyAmJiB0eXBlICE9PSA1IC8qIE9iamVjdFR5cGUuT1RIRVIgKi8pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzIC0tIHVzaW5nIGEgbG9vcCBoZXJlIGlzIG1vcmUgcGVyZm9ybWFudCB0aGFuIG1hcHBpbmcgZXZlcnkgdmFsdWUgYW5kIHRoZW4gdGVzdGluZyBldmVyeSB2YWx1ZS5cbiAgICAgICAgZm9yIChsZXQgbV9pbmRleCA9IDE7IG1faW5kZXggPCB2YWx1ZXMubGVuZ3RoOyBtX2luZGV4KyspIHtcbiAgICAgICAgICAgIGlmIChnZXRPYmplY3RUeXBlKHZhbHVlc1ttX2luZGV4XSkgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXJnZU90aGVycyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIDEgLyogT2JqZWN0VHlwZS5SRUNPUkQgKi86IHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZVJlY29yZHMkMSh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDIgLyogT2JqZWN0VHlwZS5BUlJBWSAqLzoge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlQXJyYXlzJDEodmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAzIC8qIE9iamVjdFR5cGUuU0VUICovOiB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VTZXRzJDEodmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA0IC8qIE9iamVjdFR5cGUuTUFQICovOiB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VNYXBzJDEodmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlT3RoZXJzJDEodmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIE1lcmdlIHJlY29yZHMuXG4gKlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSByZWNvcmRzLlxuICovXG5mdW5jdGlvbiBtZXJnZVJlY29yZHMkMSh2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VSZWNvcmRzKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChyZXN1bHQgPT09IGFjdGlvbnMuZGVmYXVsdE1lcmdlIHx8XG4gICAgICAgICh1dGlscy51c2VJbXBsaWNpdERlZmF1bHRNZXJnaW5nICYmXG4gICAgICAgICAgICByZXN1bHQgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VSZWNvcmRzICE9PVxuICAgICAgICAgICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZVJlY29yZHMpKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VSZWNvcmRzKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBNZXJnZSBhcnJheXMuXG4gKlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBhcnJheXMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXlzJDEodmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlQXJyYXlzKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChyZXN1bHQgPT09IGFjdGlvbnMuZGVmYXVsdE1lcmdlIHx8XG4gICAgICAgICh1dGlscy51c2VJbXBsaWNpdERlZmF1bHRNZXJnaW5nICYmXG4gICAgICAgICAgICByZXN1bHQgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VBcnJheXMgIT09XG4gICAgICAgICAgICAgICAgdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlQXJyYXlzKSkge1xuICAgICAgICByZXR1cm4gdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlQXJyYXlzKHZhbHVlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIE1lcmdlIHNldHMuXG4gKlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBzZXRzLlxuICovXG5mdW5jdGlvbiBtZXJnZVNldHMkMSh2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VTZXRzKHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChyZXN1bHQgPT09IGFjdGlvbnMuZGVmYXVsdE1lcmdlIHx8XG4gICAgICAgICh1dGlscy51c2VJbXBsaWNpdERlZmF1bHRNZXJnaW5nICYmXG4gICAgICAgICAgICByZXN1bHQgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VTZXRzICE9PSB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VTZXRzKSkge1xuICAgICAgICByZXR1cm4gdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlU2V0cyh2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBNZXJnZSBtYXBzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgbWFwcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VNYXBzJDEodmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlTWFwcyh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAocmVzdWx0ID09PSBhY3Rpb25zLmRlZmF1bHRNZXJnZSB8fFxuICAgICAgICAodXRpbHMudXNlSW1wbGljaXREZWZhdWx0TWVyZ2luZyAmJlxuICAgICAgICAgICAgcmVzdWx0ID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlTWFwcyAhPT0gdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlTWFwcykpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZU1hcHModmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogTWVyZ2Ugb3RoZXIgdGhpbmdzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgb3RoZXIgdGhpbmdzLlxuICovXG5mdW5jdGlvbiBtZXJnZU90aGVycyQxKHZhbHVlcywgdXRpbHMsIG1ldGEpIHtcbiAgICBjb25zdCByZXN1bHQgPSB1dGlscy5tZXJnZUZ1bmN0aW9ucy5tZXJnZU90aGVycyh2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAocmVzdWx0ID09PSBhY3Rpb25zLmRlZmF1bHRNZXJnZSB8fFxuICAgICAgICAodXRpbHMudXNlSW1wbGljaXREZWZhdWx0TWVyZ2luZyAmJlxuICAgICAgICAgICAgcmVzdWx0ID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlT3RoZXJzICE9PVxuICAgICAgICAgICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZU90aGVycykpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZU90aGVycyh2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0cmF0ZWd5IHRvIG1lcmdlIHJlY29yZHMgaW50byBhIHRhcmdldCByZWNvcmQuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHJlc3VsdCB3aWxsIGJlIG11dGF0ZWQgaW50byB0aGlzIHJlY29yZFxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSByZWNvcmRzIChpbmNsdWRpbmcgdGhlIHRhcmdldCdzIHZhbHVlIGlmIHRoZXJlIGlzIG9uZSkuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlUmVjb3JkcyhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzLCBmdW5jdGlvbmFsL25vLWNvbmRpdGlvbmFsLXN0YXRlbWVudHMgLS0gdXNpbmcgYSBsb29wIGhlcmUgaXMgbW9yZSBwZXJmb3JtYW50LiAqL1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGdldEtleXModmFsdWVzKSkge1xuICAgICAgICBjb25zdCBwcm9wVmFsdWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0SGFzUHJvcGVydHkodmFsdWUsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWVzLnB1c2godmFsdWVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGRhdGVkTWV0YSA9IHV0aWxzLm1ldGFEYXRhVXBkYXRlcihtZXRhLCB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBwYXJlbnRzOiB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eVRhcmdldCA9IHsgdmFsdWU6IHByb3BWYWx1ZXNbMF0gfTtcbiAgICAgICAgbWVyZ2VVbmtub3duc0ludG8ocHJvcGVydHlUYXJnZXQsIHByb3BWYWx1ZXMsIHV0aWxzLCB1cGRhdGVkTWV0YSk7XG4gICAgICAgIGlmIChrZXkgPT09IFwiX19wcm90b19fXCIpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtX3RhcmdldCwga2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHByb3BlcnR5VGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtX3RhcmdldC52YWx1ZVtrZXldID0gcHJvcGVydHlUYXJnZXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBmdW5jdGlvbmFsL25vLWxvb3Atc3RhdGVtZW50cywgZnVuY3Rpb25hbC9uby1jb25kaXRpb25hbC1zdGF0ZW1lbnRzICovXG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0cmF0ZWd5IHRvIG1lcmdlIGFycmF5cyBpbnRvIGEgdGFyZ2V0IGFycmF5LlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSByZXN1bHQgd2lsbCBiZSBtdXRhdGVkIGludG8gdGhpcyBhcnJheVxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBhcnJheXMgKGluY2x1ZGluZyB0aGUgdGFyZ2V0J3MgdmFsdWUgaWYgdGhlcmUgaXMgb25lKS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheXMobV90YXJnZXQsIHZhbHVlcykge1xuICAgIG1fdGFyZ2V0LnZhbHVlLnB1c2goLi4udmFsdWVzLnNsaWNlKDEpLmZsYXQoKSk7XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0cmF0ZWd5IHRvIG1lcmdlIHNldHMgaW50byBhIHRhcmdldCBzZXQuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHJlc3VsdCB3aWxsIGJlIG11dGF0ZWQgaW50byB0aGlzIHNldFxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBzZXRzIChpbmNsdWRpbmcgdGhlIHRhcmdldCdzIHZhbHVlIGlmIHRoZXJlIGlzIG9uZSkuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlU2V0cyhtX3RhcmdldCwgdmFsdWVzKSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBnZXRJdGVyYWJsZU9mSXRlcmFibGVzKHZhbHVlcy5zbGljZSgxKSkpIHtcbiAgICAgICAgbV90YXJnZXQudmFsdWUuYWRkKHZhbHVlKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0cmF0ZWd5IHRvIG1lcmdlIG1hcHMgaW50byBhIHRhcmdldCBtYXAuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHJlc3VsdCB3aWxsIGJlIG11dGF0ZWQgaW50byB0aGlzIG1hcFxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSBtYXBzIChpbmNsdWRpbmcgdGhlIHRhcmdldCdzIHZhbHVlIGlmIHRoZXJlIGlzIG9uZSkuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlTWFwcyhtX3RhcmdldCwgdmFsdWVzKSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZ2V0SXRlcmFibGVPZkl0ZXJhYmxlcyh2YWx1ZXMuc2xpY2UoMSkpKSB7XG4gICAgICAgIG1fdGFyZ2V0LnZhbHVlLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG59XG4vKipcbiAqIFNldCB0aGUgdGFyZ2V0IHRvIHRoZSBsYXN0IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtZXJnZU90aGVycyhtX3RhcmdldCwgdmFsdWVzKSB7XG4gICAgbV90YXJnZXQudmFsdWUgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdO1xufVxuXG52YXIgZGVmYXVsdE1lcmdlSW50b0Z1bmN0aW9ucyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgbWVyZ2VSZWNvcmRzOiBtZXJnZVJlY29yZHMsXG4gICAgbWVyZ2VBcnJheXM6IG1lcmdlQXJyYXlzLFxuICAgIG1lcmdlU2V0czogbWVyZ2VTZXRzLFxuICAgIG1lcmdlTWFwczogbWVyZ2VNYXBzLFxuICAgIG1lcmdlT3RoZXJzOiBtZXJnZU90aGVyc1xufSk7XG5cbmZ1bmN0aW9uIGRlZXBtZXJnZUludG8odGFyZ2V0LCAuLi5vYmplY3RzKSB7XG4gICAgcmV0dXJuIHZvaWQgZGVlcG1lcmdlSW50b0N1c3RvbSh7fSkodGFyZ2V0LCAuLi5vYmplY3RzKTtcbn1cbmZ1bmN0aW9uIGRlZXBtZXJnZUludG9DdXN0b20ob3B0aW9ucywgcm9vdE1ldGFEYXRhKSB7XG4gICAgY29uc3QgdXRpbHMgPSBnZXRJbnRvVXRpbHMob3B0aW9ucywgY3VzdG9taXplZERlZXBtZXJnZUludG8pO1xuICAgIC8qKlxuICAgICAqIFRoZSBjdXN0b21pemVkIGRlZXBtZXJnZSBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjdXN0b21pemVkRGVlcG1lcmdlSW50byh0YXJnZXQsIC4uLm9iamVjdHMpIHtcbiAgICAgICAgbWVyZ2VVbmtub3duc0ludG8oeyB2YWx1ZTogdGFyZ2V0IH0sIFt0YXJnZXQsIC4uLm9iamVjdHNdLCB1dGlscywgcm9vdE1ldGFEYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGN1c3RvbWl6ZWREZWVwbWVyZ2VJbnRvO1xufVxuLyoqXG4gKiBUaGUgdGhlIHV0aWxzIHRoYXQgYXJlIGF2YWlsYWJsZSB0byB0aGUgbWVyZ2UgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdGhlIHVzZXIgc3BlY2lmaWVkXG4gKi9cbmZ1bmN0aW9uIGdldEludG9VdGlscyhvcHRpb25zLCBjdXN0b21pemVkRGVlcG1lcmdlSW50bykge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWZhdWx0TWVyZ2VGdW5jdGlvbnM6IGRlZmF1bHRNZXJnZUludG9GdW5jdGlvbnMsXG4gICAgICAgIG1lcmdlRnVuY3Rpb25zOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0TWVyZ2VJbnRvRnVuY3Rpb25zLFxuICAgICAgICAgICAgLi4uT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW2tleSwgb3B0aW9uXSkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRNZXJnZUludG9GdW5jdGlvbnMsIGtleSkpXG4gICAgICAgICAgICAgICAgLm1hcCgoW2tleSwgb3B0aW9uXSkgPT4gb3B0aW9uID09PSBmYWxzZVxuICAgICAgICAgICAgICAgID8gW2tleSwgbWVyZ2VPdGhlcnNdXG4gICAgICAgICAgICAgICAgOiBba2V5LCBvcHRpb25dKSksXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGFEYXRhVXBkYXRlcjogKChfYSA9IG9wdGlvbnMubWV0YURhdGFVcGRhdGVyKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkZWZhdWx0TWV0YURhdGFVcGRhdGVyKSxcbiAgICAgICAgZGVlcG1lcmdlSW50bzogY3VzdG9taXplZERlZXBtZXJnZUludG8sXG4gICAgICAgIGFjdGlvbnM6IGFjdGlvbnNJbnRvLFxuICAgIH07XG59XG4vKipcbiAqIE1lcmdlIHVua25vd24gdGhpbmdzIGludG8gYSB0YXJnZXQuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBtZXJnZSBpbnRvLlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlVW5rbm93bnNJbnRvKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWludmFsaWQtdm9pZC10eXBlXG4pIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB2b2lkIG1lcmdlT3RoZXJzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSBnZXRPYmplY3RUeXBlKG1fdGFyZ2V0LnZhbHVlKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuY3Rpb25hbC9uby1jb25kaXRpb25hbC1zdGF0ZW1lbnRzIC0tIGFkZCBhbiBlYXJseSBlc2NhcGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgICBpZiAodHlwZSAhPT0gMCAvKiBPYmplY3RUeXBlLk5PVCAqLyAmJiB0eXBlICE9PSA1IC8qIE9iamVjdFR5cGUuT1RIRVIgKi8pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmN0aW9uYWwvbm8tbG9vcC1zdGF0ZW1lbnRzIC0tIHVzaW5nIGEgbG9vcCBoZXJlIGlzIG1vcmUgcGVyZm9ybWFudCB0aGFuIG1hcHBpbmcgZXZlcnkgdmFsdWUgYW5kIHRoZW4gdGVzdGluZyBldmVyeSB2YWx1ZS5cbiAgICAgICAgZm9yIChsZXQgbV9pbmRleCA9IDE7IG1faW5kZXggPCB2YWx1ZXMubGVuZ3RoOyBtX2luZGV4KyspIHtcbiAgICAgICAgICAgIGlmIChnZXRPYmplY3RUeXBlKHZhbHVlc1ttX2luZGV4XSkgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2b2lkIG1lcmdlT3RoZXJzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgMSAvKiBPYmplY3RUeXBlLlJFQ09SRCAqLzoge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgbWVyZ2VSZWNvcmRzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAyIC8qIE9iamVjdFR5cGUuQVJSQVkgKi86IHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIG1lcmdlQXJyYXlzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAzIC8qIE9iamVjdFR5cGUuU0VUICovOiB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBtZXJnZVNldHNJbnRvKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDQgLyogT2JqZWN0VHlwZS5NQVAgKi86IHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIG1lcmdlTWFwc0ludG8obV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIG1lcmdlT3RoZXJzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIE1lcmdlIHJlY29yZHMgaW50byBhIHRhcmdldCByZWNvcmQuXG4gKlxuICogQHBhcmFtIG1fdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBtZXJnZSBpbnRvLlxuICogQHBhcmFtIHZhbHVlcyAtIFRoZSByZWNvcmRzLlxuICovXG5mdW5jdGlvbiBtZXJnZVJlY29yZHNJbnRvKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgY29uc3QgYWN0aW9uID0gdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VSZWNvcmRzKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKTtcbiAgICBpZiAoYWN0aW9uID09PSBhY3Rpb25zSW50by5kZWZhdWx0TWVyZ2UpIHtcbiAgICAgICAgdXRpbHMuZGVmYXVsdE1lcmdlRnVuY3Rpb25zLm1lcmdlUmVjb3JkcyhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgfVxufVxuLyoqXG4gKiBNZXJnZSBhcnJheXMgaW50byBhIHRhcmdldCBhcnJheS5cbiAqXG4gKiBAcGFyYW0gbV90YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIG1lcmdlIGludG8uXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIGFycmF5cy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheXNJbnRvKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgY29uc3QgYWN0aW9uID0gdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VBcnJheXMobV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChhY3Rpb24gPT09IGFjdGlvbnNJbnRvLmRlZmF1bHRNZXJnZSkge1xuICAgICAgICB1dGlscy5kZWZhdWx0TWVyZ2VGdW5jdGlvbnMubWVyZ2VBcnJheXMobV90YXJnZXQsIHZhbHVlcyk7XG4gICAgfVxufVxuLyoqXG4gKiBNZXJnZSBzZXRzIGludG8gYSB0YXJnZXQgc2V0LlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSB0YXJnZXQgdG8gbWVyZ2UgaW50by5cbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgc2V0cy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VTZXRzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlU2V0cyhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgaWYgKGFjdGlvbiA9PT0gYWN0aW9uc0ludG8uZGVmYXVsdE1lcmdlKSB7XG4gICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZVNldHMobV90YXJnZXQsIHZhbHVlcyk7XG4gICAgfVxufVxuLyoqXG4gKiBNZXJnZSBtYXBzIGludG8gYSB0YXJnZXQgbWFwLlxuICpcbiAqIEBwYXJhbSBtX3RhcmdldCAtIFRoZSB0YXJnZXQgdG8gbWVyZ2UgaW50by5cbiAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgbWFwcy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VNYXBzSW50byhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHV0aWxzLm1lcmdlRnVuY3Rpb25zLm1lcmdlTWFwcyhtX3RhcmdldCwgdmFsdWVzLCB1dGlscywgbWV0YSk7XG4gICAgaWYgKGFjdGlvbiA9PT0gYWN0aW9uc0ludG8uZGVmYXVsdE1lcmdlKSB7XG4gICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZU1hcHMobV90YXJnZXQsIHZhbHVlcyk7XG4gICAgfVxufVxuLyoqXG4gKiBNZXJnZSBvdGhlciB0aGluZ3MgaW50byBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0gbV90YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIG1lcmdlIGludG8uXG4gKiBAcGFyYW0gdmFsdWVzIC0gVGhlIG90aGVyIHRoaW5ncy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPdGhlcnNJbnRvKG1fdGFyZ2V0LCB2YWx1ZXMsIHV0aWxzLCBtZXRhKSB7XG4gICAgY29uc3QgYWN0aW9uID0gdXRpbHMubWVyZ2VGdW5jdGlvbnMubWVyZ2VPdGhlcnMobV90YXJnZXQsIHZhbHVlcywgdXRpbHMsIG1ldGEpO1xuICAgIGlmIChhY3Rpb24gPT09IGFjdGlvbnNJbnRvLmRlZmF1bHRNZXJnZSB8fFxuICAgICAgICBtX3RhcmdldC52YWx1ZSA9PT0gYWN0aW9uc0ludG8uZGVmYXVsdE1lcmdlKSB7XG4gICAgICAgIHV0aWxzLmRlZmF1bHRNZXJnZUZ1bmN0aW9ucy5tZXJnZU90aGVycyhtX3RhcmdldCwgdmFsdWVzKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IGRlZXBtZXJnZSwgZGVlcG1lcmdlQ3VzdG9tLCBkZWVwbWVyZ2VJbnRvLCBkZWVwbWVyZ2VJbnRvQ3VzdG9tIH07XG4iLCJ2YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFzZVByb3BzKHByb3BzKSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xuICAgIHJldHVybiB7XG4gICAgICAgIGF4aXM6IChfYSA9IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy5heGlzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAneCcsXG4gICAgICAgIHhNYXg6IChfYiA9IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy54TWF4KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAxMDAsXG4gICAgICAgIHhNaW46IChfYyA9IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy54TWluKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAwLFxuICAgICAgICB4U3RlcDogKF9kID0gcHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnhTdGVwKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAxLFxuICAgICAgICB5TWF4OiAoX2UgPSBwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMueU1heCkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogMTAwLFxuICAgICAgICB5TWluOiAoX2YgPSBwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMueU1pbikgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogMCxcbiAgICAgICAgeVN0ZXA6IChfZyA9IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy55U3RlcCkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogMSxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzKGV2ZW50LCBsYXN0UG9zaXRpb24pIHtcbiAgICBpZiAoJ3RvdWNoZXMnIGluIGV2ZW50KSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1zcHJlYWRcbiAgICAgICAgdmFyIF9hID0gX19yZWFkKF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChBcnJheS5mcm9tKGV2ZW50LnRvdWNoZXMpKSwgZmFsc2UpLCAxKSwgdG91Y2ggPSBfYVswXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRvdWNoID8gdG91Y2guY2xpZW50WCA6IGxhc3RQb3NpdGlvbi54LFxuICAgICAgICAgICAgeTogdG91Y2ggPyB0b3VjaC5jbGllbnRZIDogbGFzdFBvc2l0aW9uLnksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgIHk6IGV2ZW50LmNsaWVudFksXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3NpdGlvbihwb3NpdGlvbiwgcHJvcHMsIGVsKSB7XG4gICAgdmFyIF9hID0gZ2V0QmFzZVByb3BzKHByb3BzKSwgYXhpcyA9IF9hLmF4aXMsIHhNYXggPSBfYS54TWF4LCB4TWluID0gX2EueE1pbiwgeFN0ZXAgPSBfYS54U3RlcCwgeU1heCA9IF9hLnlNYXgsIHlNaW4gPSBfYS55TWluLCB5U3RlcCA9IF9hLnlTdGVwO1xuICAgIHZhciBfYiA9IChlbCA9PT0gbnVsbCB8fCBlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpIHx8IHt9LCBfYyA9IF9iLmhlaWdodCwgaGVpZ2h0ID0gX2MgPT09IHZvaWQgMCA/IHhNYXggOiBfYywgX2QgPSBfYi53aWR0aCwgd2lkdGggPSBfZCA9PT0gdm9pZCAwID8geU1heCA6IF9kO1xuICAgIHZhciB4ID0gcG9zaXRpb24ueCwgeSA9IHBvc2l0aW9uLnk7XG4gICAgdmFyIGR4ID0gMDtcbiAgICB2YXIgZHkgPSAwO1xuICAgIGlmICh4IDwgMCkge1xuICAgICAgICB4ID0gMDtcbiAgICB9XG4gICAgaWYgKHggPiB3aWR0aCkge1xuICAgICAgICB4ID0gd2lkdGg7XG4gICAgfVxuICAgIGlmICh5IDwgMCkge1xuICAgICAgICB5ID0gMDtcbiAgICB9XG4gICAgaWYgKHkgPiBoZWlnaHQpIHtcbiAgICAgICAgeSA9IGhlaWdodDtcbiAgICB9XG4gICAgaWYgKGF4aXMgPT09ICd4JyB8fCBheGlzID09PSAneHknKSB7XG4gICAgICAgIGR4ID0gTWF0aC5yb3VuZCgoeCAvIHdpZHRoKSAqICh4TWF4IC0geE1pbikpO1xuICAgIH1cbiAgICBpZiAoYXhpcyA9PT0gJ3knIHx8IGF4aXMgPT09ICd4eScpIHtcbiAgICAgICAgZHkgPSBNYXRoLnJvdW5kKCh5IC8gaGVpZ2h0KSAqICh5TWF4IC0geU1pbikpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiByb3VuZChkeCwgeFN0ZXApLFxuICAgICAgICB5OiByb3VuZChkeSwgeVN0ZXApLFxuICAgIH07XG59XG4vKipcbiAqIEdldCBhIG5vcm1hbGl6ZWQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRWYWx1ZShuYW1lLCBwcm9wcykge1xuICAgIHZhciB2YWx1ZSA9IHByb3BzW25hbWVdIHx8IDA7XG4gICAgdmFyIG1pbiA9IG5hbWUgPT09ICd4JyA/IHByb3BzLnhNaW4gOiBwcm9wcy55TWluO1xuICAgIHZhciBtYXggPSBuYW1lID09PSAneCcgPyBwcm9wcy54TWF4IDogcHJvcHMueU1heDtcbiAgICBpZiAoaXNOdW1iZXIobWluKSAmJiB2YWx1ZSA8IG1pbikge1xuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIobWF4KSAmJiB2YWx1ZSA+IG1heCkge1xuICAgICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn1cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgaW50byBhIG51bWJlciBvciByZXR1cm4gaXQgaWYgaXQncyBhbHJlYWR5IGEgbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU51bWJlcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG59XG4vKipcbiAqICBSZW1vdmUgcHJvcGVydGllcyBmcm9tIGFuIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUHJvcGVydGllcyhpbnB1dCkge1xuICAgIHZhciBmaWx0ZXIgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmaWx0ZXJbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBvdXRwdXQgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gaW5wdXQpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoaW5wdXQsIGtleSkpIHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IGlucHV0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByb3VuZCh2YWx1ZSwgaW5jcmVtZW50KSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSAvIGluY3JlbWVudCkgKiBpbmNyZW1lbnQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsgZGVlcG1lcmdlIH0gZnJvbSAnZGVlcG1lcmdlLXRzJztcbmltcG9ydCB7IHBhcnNlTnVtYmVyIH0gZnJvbSAnLi91dGlscyc7XG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgcGFkZGluZzogJzZweCcsXG4gICAgcmFuZ2VDb2xvcjogJyMwMDdiZmYnLFxuICAgIHRodW1iQm9yZGVyOiAnMnB4IHNvbGlkICMwMDAnLFxuICAgIHRodW1iQm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICB0aHVtYkJvcmRlclJhZGl1c1hZOiAnNTAlJyxcbiAgICB0aHVtYkNvbG9yOiAnI2ZmZicsXG4gICAgdGh1bWJTaXplOiAnMTBweCcsXG4gICAgdGh1bWJTaXplWFk6ICcyMHB4JyxcbiAgICB0aHVtYlNwYWNlOiAnNnB4JyxcbiAgICB0cmFja0JvcmRlclJhZGl1czogJzNweCcsXG4gICAgdHJhY2tDb2xvcjogJyNjY2MnLFxuICAgIHdpZHRoOiAnMjBweCcsXG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U3R5bGVzKHN0eWxlcykge1xuICAgIHZhciBvcHRpb25zID0gZGVlcG1lcmdlKGRlZmF1bHRPcHRpb25zLCBzdHlsZXMgPyBzdHlsZXMub3B0aW9ucyA6IHt9KTtcbiAgICB2YXIgc2xpZGVyID0ge1xuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgIHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZyxcbiAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjRzLCB3aWR0aCAwLjRzJyxcbiAgICB9O1xuICAgIHZhciB0cmFjayA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLnRyYWNrQ29sb3IsXG4gICAgICAgIGJvcmRlclJhZGl1czogb3B0aW9ucy50cmFja0JvcmRlclJhZGl1cyxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICB9O1xuICAgIHZhciByYW5nZSA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLnJhbmdlQ29sb3IsXG4gICAgICAgIGJvcmRlclJhZGl1czogb3B0aW9ucy50cmFja0JvcmRlclJhZGl1cyxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgfTtcbiAgICB2YXIgcmFpbCA9IHtcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGhlaWdodDogb3B0aW9ucy5oZWlnaHQsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNHMsIHdpZHRoIDAuNHMnLFxuICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCxcbiAgICB9O1xuICAgIHZhciB0aHVtYiA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLnRodW1iQ29sb3IsXG4gICAgICAgIGJvcmRlcjogb3B0aW9ucy50aHVtYkJvcmRlcixcbiAgICAgICAgYm9yZGVyUmFkaXVzOiBvcHRpb25zLnRodW1iQm9yZGVyUmFkaXVzLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC40cywgd2lkdGggMC40cycsXG4gICAgfTtcbiAgICB2YXIgZGVmYXVsdFN0eWxlcyA9IHtcbiAgICAgICAgcmFpbDogcmFpbCxcbiAgICAgICAgcmFuZ2VYOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmFuZ2UpLCB7IGhlaWdodDogJzEwMCUnLCB0b3A6IDAgfSksXG4gICAgICAgIHJhbmdlWFk6IF9fYXNzaWduKF9fYXNzaWduKHt9LCByYW5nZSksIHsgYm90dG9tOiAwIH0pLFxuICAgICAgICByYW5nZVk6IF9fYXNzaWduKF9fYXNzaWduKHt9LCByYW5nZSksIHsgYm90dG9tOiAwLCBsZWZ0OiAwLCB3aWR0aDogJzEwMCUnIH0pLFxuICAgICAgICBzbGlkZXJYOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2xpZGVyKSwgeyBoZWlnaHQ6IHBhcnNlTnVtYmVyKG9wdGlvbnMuaGVpZ2h0KSArIHBhcnNlTnVtYmVyKG9wdGlvbnMucGFkZGluZykgKiAyLCB3aWR0aDogJzEwMCUnIH0pLFxuICAgICAgICBzbGlkZXJYWTogX19hc3NpZ24oX19hc3NpZ24oe30sIHNsaWRlciksIHsgaGVpZ2h0OiAnMTAwJScsIHdpZHRoOiAnMTAwJScgfSksXG4gICAgICAgIHNsaWRlclk6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzbGlkZXIpLCB7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogcGFyc2VOdW1iZXIob3B0aW9ucy53aWR0aCkgKyBwYXJzZU51bWJlcihvcHRpb25zLnBhZGRpbmcpICogMiB9KSxcbiAgICAgICAgdGh1bWJYOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGh1bWIpLCB7IGhlaWdodDogcGFyc2VOdW1iZXIob3B0aW9ucy5oZWlnaHQpICsgcGFyc2VOdW1iZXIob3B0aW9ucy50aHVtYlNwYWNlKSwgbGVmdDogLShwYXJzZU51bWJlcihvcHRpb25zLnRodW1iU2l6ZSkgLyAyKSwgdG9wOiAtKHBhcnNlTnVtYmVyKG9wdGlvbnMudGh1bWJTcGFjZSkgLyAyKSwgd2lkdGg6IG9wdGlvbnMudGh1bWJTaXplIH0pLFxuICAgICAgICB0aHVtYlhZOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGh1bWIpLCB7IGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JywgYm9yZGVyOiBvcHRpb25zLnRodW1iQm9yZGVyLCBib3JkZXJSYWRpdXM6IG9wdGlvbnMudGh1bWJCb3JkZXJSYWRpdXNYWSwgYm90dG9tOiAtKHBhcnNlTnVtYmVyKG9wdGlvbnMudGh1bWJTaXplWFkpIC8gMiksIGhlaWdodDogb3B0aW9ucy50aHVtYlNpemVYWSwgbGVmdDogLShwYXJzZU51bWJlcihvcHRpb25zLnRodW1iU2l6ZVhZKSAvIDIpLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgd2lkdGg6IG9wdGlvbnMudGh1bWJTaXplWFkgfSksXG4gICAgICAgIHRodW1iWTogX19hc3NpZ24oX19hc3NpZ24oe30sIHRodW1iKSwgeyBib3R0b206IC0ocGFyc2VOdW1iZXIob3B0aW9ucy50aHVtYlNpemUpIC8gMiksIGhlaWdodDogb3B0aW9ucy50aHVtYlNpemUsIGxlZnQ6IC0ocGFyc2VOdW1iZXIob3B0aW9ucy50aHVtYlNwYWNlKSAvIDIpLCB3aWR0aDogcGFyc2VOdW1iZXIob3B0aW9ucy53aWR0aCkgKyBwYXJzZU51bWJlcihvcHRpb25zLnRodW1iU3BhY2UpIH0pLFxuICAgICAgICB0cmFja1g6IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0cmFjayksIHsgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCB9KSxcbiAgICAgICAgdHJhY2tYWTogX19hc3NpZ24oX19hc3NpZ24oe30sIHRyYWNrKSwgeyBoZWlnaHQ6ICcxMDAlJywgbWluSGVpZ2h0OiAnNTBweCcsIHdpZHRoOiAnMTAwJScgfSksXG4gICAgICAgIHRyYWNrWTogX19hc3NpZ24oX19hc3NpZ24oe30sIHRyYWNrKSwgeyBoZWlnaHQ6ICcxMDAlJywgbWluSGVpZ2h0OiAnNTBweCcsIHdpZHRoOiBvcHRpb25zLndpZHRoIH0pLFxuICAgIH07XG4gICAgcmV0dXJuIGRlZXBtZXJnZShkZWZhdWx0U3R5bGVzLCBzdHlsZXMgfHwge30pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3R5bGVzLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGdldFN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBnZXRCYXNlUHJvcHMsIGdldENvb3JkaW5hdGVzLCBnZXROb3JtYWxpemVkVmFsdWUsIGdldFBvc2l0aW9uLCBpc1VuZGVmaW5lZCwgcmVtb3ZlUHJvcGVydGllcywgfSBmcm9tICcuL3V0aWxzJztcbnZhciBSYW5nZVNsaWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmFuZ2VTbGlkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmFuZ2VTbGlkZXIocHJvcHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmxhc3RDb29yZGluYXRlcyA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBfdGhpcy5tb3VudGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLm9mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBfdGhpcy5zdGFydCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICBfdGhpcy5nZXREcmFnUG9zaXRpb24gPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciB4ID0gX2EueCwgeSA9IF9hLnk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHggKyBfdGhpcy5zdGFydC54IC0gX3RoaXMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgeTogX3RoaXMub2Zmc2V0LnkgKyBfdGhpcy5zdGFydC55IC0geSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLnVwZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2o7XG4gICAgICAgICAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55O1xuICAgICAgICAgICAgdmFyIF9rID0gX3RoaXMsIHJhaWwgPSBfay5yYWlsLCB0cmFjayA9IF9rLnRyYWNrO1xuICAgICAgICAgICAgX3RoaXMuc3RhcnQgPSB7XG4gICAgICAgICAgICAgICAgeDogKF9jID0gKF9iID0gcmFpbC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iub2Zmc2V0TGVmdCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMCxcbiAgICAgICAgICAgICAgICB5OiAoKF9lID0gKF9kID0gdHJhY2suY3VycmVudCkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLm9mZnNldEhlaWdodCkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogMCkgLVxuICAgICAgICAgICAgICAgICAgICAoKF9nID0gKF9mID0gcmFpbC5jdXJyZW50KSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yub2Zmc2V0VG9wKSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiAwKSAtXG4gICAgICAgICAgICAgICAgICAgICgoX2ogPSAoX2ggPSByYWlsLmN1cnJlbnQpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5vZmZzZXRIZWlnaHQpICE9PSBudWxsICYmIF9qICE9PSB2b2lkIDAgPyBfaiA6IDApLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIF90aGlzLmxhc3RDb29yZGluYXRlcyA9IHsgeDogeCwgeTogeSB9O1xuICAgICAgICAgICAgX3RoaXMub2Zmc2V0ID0geyB4OiB4LCB5OiB5IH07XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLnVwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZShnZXRQb3NpdGlvbihwb3NpdGlvbiwgX3RoaXMucHJvcHMsIF90aGlzLnNsaWRlci5jdXJyZW50KSk7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZUJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgX3RoaXMuaGFuZGxlS2V5ZG93bik7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZUNsaWNrVHJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBvbkFmdGVyRW5kID0gX3RoaXMucHJvcHMub25BZnRlckVuZDtcbiAgICAgICAgICAgIHZhciBpc0RyYWdnaW5nID0gX3RoaXMuc3RhdGUuaXNEcmFnZ2luZztcbiAgICAgICAgICAgIGlmICghaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSBnZXRDb29yZGluYXRlcyhldmVudCwgX3RoaXMubGFzdENvb3JkaW5hdGVzKSwgeCA9IF9hLngsIHkgPSBfYS55O1xuICAgICAgICAgICAgICAgIHZhciBfYiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGJvdHRvbSA9IF9iLmJvdHRvbSwgbGVmdCA9IF9iLmxlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogeCAtIGxlZnQsXG4gICAgICAgICAgICAgICAgICAgIHk6IGJvdHRvbSAtIHksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfdGhpcy5sYXN0Q29vcmRpbmF0ZXMgPSB7IHg6IHgsIHk6IHkgfTtcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVQb3NpdGlvbihuZXh0UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGlmIChvbkFmdGVyRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJFbmQoZ2V0UG9zaXRpb24obmV4dFBvc2l0aW9uLCBfdGhpcy5wcm9wcywgX3RoaXMuc2xpZGVyLmN1cnJlbnQpLCBfdGhpcy5wcm9wcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMubW91bnRlZCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgaXNEcmFnZ2luZzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZURyYWcgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBnZXRDb29yZGluYXRlcyhldmVudCwgX3RoaXMubGFzdENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZVBvc2l0aW9uKF90aGlzLmdldERyYWdQb3NpdGlvbihjb29yZGluYXRlcykpO1xuICAgICAgICAgICAgX3RoaXMubGFzdENvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZURyYWdFbmQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5wcm9wcywgb25BZnRlckVuZCA9IF9hLm9uQWZ0ZXJFbmQsIG9uRHJhZ0VuZCA9IF9hLm9uRHJhZ0VuZDtcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGdldFBvc2l0aW9uKF90aGlzLmdldERyYWdQb3NpdGlvbihnZXRDb29yZGluYXRlcyhldmVudCwgX3RoaXMubGFzdENvb3JkaW5hdGVzKSksIF90aGlzLnByb3BzLCBfdGhpcy5zbGlkZXIuY3VycmVudCk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBfdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfdGhpcy5oYW5kbGVEcmFnRW5kKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIF90aGlzLmhhbmRsZURyYWcpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBfdGhpcy5oYW5kbGVEcmFnRW5kKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgX3RoaXMuaGFuZGxlRHJhZ0VuZCk7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgICAgaWYgKG9uRHJhZ0VuZCkge1xuICAgICAgICAgICAgICAgIG9uRHJhZ0VuZChwb3NpdGlvbiwgX3RoaXMucHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICAgIGlmIChvbkFmdGVyRW5kKSB7XG4gICAgICAgICAgICAgICAgb25BZnRlckVuZChwb3NpdGlvbiwgX3RoaXMucHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBfdGhpcy5oYW5kbGVLZXlkb3duLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVLZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5zdGF0ZSwgaW5uZXJYID0gX2EueCwgaW5uZXJZID0gX2EueTtcbiAgICAgICAgICAgIHZhciBfYiA9IF90aGlzLnByb3BzLCB4ID0gX2IueCwgeSA9IF9iLnk7XG4gICAgICAgICAgICB2YXIgX2MgPSBnZXRCYXNlUHJvcHMoX3RoaXMucHJvcHMpLCBheGlzID0gX2MuYXhpcywgeE1heCA9IF9jLnhNYXgsIHhNaW4gPSBfYy54TWluLCB4U3RlcCA9IF9jLnhTdGVwLCB5TWF4ID0gX2MueU1heCwgeU1pbiA9IF9jLnlNaW4sIHlTdGVwID0gX2MueVN0ZXA7XG4gICAgICAgICAgICB2YXIgY29kZXMgPSB7IGRvd246ICdBcnJvd0Rvd24nLCBsZWZ0OiAnQXJyb3dMZWZ0JywgdXA6ICdBcnJvd1VwJywgcmlnaHQ6ICdBcnJvd1JpZ2h0JyB9O1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICAgIGlmIChPYmplY3QudmFsdWVzKGNvZGVzKS5pbmNsdWRlcyhldmVudC5jb2RlKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBpc1VuZGVmaW5lZCh4KSA/IGlubmVyWCA6IGdldE5vcm1hbGl6ZWRWYWx1ZSgneCcsIF90aGlzLnByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgeTogaXNVbmRlZmluZWQoeSkgPyBpbm5lclkgOiBnZXROb3JtYWxpemVkVmFsdWUoJ3knLCBfdGhpcy5wcm9wcyksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgeE1pbnVzID0gcG9zaXRpb24ueCAtIHhTdGVwIDw9IHhNaW4gPyB4TWluIDogcG9zaXRpb24ueCAtIHhTdGVwO1xuICAgICAgICAgICAgICAgIHZhciB4UGx1cyA9IHBvc2l0aW9uLnggKyB4U3RlcCA+PSB4TWF4ID8geE1heCA6IHBvc2l0aW9uLnggKyB4U3RlcDtcbiAgICAgICAgICAgICAgICB2YXIgeU1pbnVzID0gcG9zaXRpb24ueSAtIHlTdGVwIDw9IHlNaW4gPyB5TWluIDogcG9zaXRpb24ueSAtIHlTdGVwO1xuICAgICAgICAgICAgICAgIHZhciB5UGx1cyA9IHBvc2l0aW9uLnkgKyB5U3RlcCA+PSB5TWF4ID8geU1heCA6IHBvc2l0aW9uLnkgKyB5U3RlcDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb2Rlcy51cDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggPSB4UGx1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgPSB5UGx1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY29kZXMuZG93bjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggPSB4TWludXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0geU1pbnVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjb2Rlcy5sZWZ0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSA9IHlNaW51cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggPSB4TWludXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNvZGVzLnJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSA9IHlQbHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCA9IHhQbHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUocG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBfdGhpcy51cGRhdGVPcHRpb25zKGdldENvb3JkaW5hdGVzKGV2ZW50LCBfdGhpcy5sYXN0Q29vcmRpbmF0ZXMpKTtcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgaXNEcmFnZ2luZzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIF90aGlzLmhhbmRsZURyYWcpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIF90aGlzLmhhbmRsZURyYWdFbmQpO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlT3B0aW9ucyhnZXRDb29yZGluYXRlcyhldmVudCwgX3RoaXMubGFzdENvb3JkaW5hdGVzKSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBfdGhpcy5oYW5kbGVEcmFnLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBfdGhpcy5oYW5kbGVEcmFnRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBfdGhpcy5oYW5kbGVEcmFnRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5zbGlkZXIgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgX3RoaXMucmFpbCA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgICAgICBfdGhpcy50cmFjayA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgeDogZ2V0Tm9ybWFsaXplZFZhbHVlKCd4JywgcHJvcHMpLFxuICAgICAgICAgICAgeTogZ2V0Tm9ybWFsaXplZFZhbHVlKCd5JywgcHJvcHMpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJhbmdlU2xpZGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIFJhbmdlU2xpZGVyLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiAoXywgcHJldmlvdXNTdGF0ZSkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLnN0YXRlLCB4ID0gX2EueCwgeSA9IF9hLnk7XG4gICAgICAgIHZhciBvbkNoYW5nZSA9IHRoaXMucHJvcHMub25DaGFuZ2U7XG4gICAgICAgIHZhciBwcmV2aW91c1ggPSBwcmV2aW91c1N0YXRlLngsIHByZXZpb3VzWSA9IHByZXZpb3VzU3RhdGUueTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKG9uQ2hhbmdlICYmICh4ICE9PSBwcmV2aW91c1ggfHwgeSAhPT0gcHJldmlvdXNZKSkge1xuICAgICAgICAgICAgb25DaGFuZ2UoeyB4OiB4LCB5OiB5IH0sIHRoaXMucHJvcHMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSYW5nZVNsaWRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubW91bnRlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmdlU2xpZGVyLnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hID0gZ2V0QmFzZVByb3BzKHRoaXMucHJvcHMpLCBheGlzID0gX2EuYXhpcywgeE1heCA9IF9hLnhNYXgsIHhNaW4gPSBfYS54TWluLCB5TWF4ID0gX2EueU1heCwgeU1pbiA9IF9hLnlNaW47XG4gICAgICAgICAgICB2YXIgYm90dG9tID0gKCh0aGlzLnkgLSB5TWluKSAvICh5TWF4IC0geU1pbikpICogMTAwO1xuICAgICAgICAgICAgdmFyIGxlZnQgPSAoKHRoaXMueCAtIHhNaW4pIC8gKHhNYXggLSB4TWluKSkgKiAxMDA7XG4gICAgICAgICAgICBpZiAoYm90dG9tID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgYm90dG9tID0gMTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJvdHRvbSA8IDApIHtcbiAgICAgICAgICAgICAgICBib3R0b20gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYm90dG9tIHNob3VsZG4ndCBiZSBzZXQgd2l0aCBYIGF4aXNcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgYm90dG9tID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZWZ0ID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IDEwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZWZ0IDwgMCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbGVmdCBzaG91bGRuJ3QgYmUgc2V0IHdpdGggWSBheGlzXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgIGxlZnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgeDogbGVmdCwgeTogYm90dG9tIH07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmFuZ2VTbGlkZXIucHJvdG90eXBlLCBcInN0eWxlc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHRoaXMucHJvcHMuc3R5bGVzO1xuICAgICAgICAgICAgcmV0dXJuIGdldFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmdlU2xpZGVyLnByb3RvdHlwZSwgXCJ4XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5uZXJYID0gdGhpcy5zdGF0ZS54O1xuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnByb3BzLng7XG4gICAgICAgICAgICByZXR1cm4gaXNVbmRlZmluZWQoeCkgPyBpbm5lclggOiB4O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmdlU2xpZGVyLnByb3RvdHlwZSwgXCJ5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5uZXJZID0gdGhpcy5zdGF0ZS55O1xuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLnByb3BzLnk7XG4gICAgICAgICAgICByZXR1cm4gaXNVbmRlZmluZWQoeSkgPyBpbm5lclkgOiB5O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgUmFuZ2VTbGlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5wcm9wcywgYXhpcyA9IF9hLmF4aXMsIGNsYXNzTmFtZSA9IF9hLmNsYXNzTmFtZSwgeE1heCA9IF9hLnhNYXgsIHhNaW4gPSBfYS54TWluLCB5TWF4ID0gX2EueU1heCwgeU1pbiA9IF9hLnlNaW47XG4gICAgICAgIHZhciByZXN0ID0gcmVtb3ZlUHJvcGVydGllcyh0aGlzLnByb3BzLCAnYXhpcycsICdjbGFzc05hbWUnLCAnb25BZnRlckVuZCcsICdvbkNoYW5nZScsICdvbkRyYWdFbmQnLCAnc3R5bGVzJywgJ3gnLCAneE1pbicsICd4TWF4JywgJ3hTdGVwJywgJ3knLCAneU1pbicsICd5TWF4JywgJ3lTdGVwJyk7XG4gICAgICAgIHZhciBfYiA9IHRoaXMucG9zaXRpb24sIHhQb3MgPSBfYi54LCB5UG9zID0gX2IueTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0geyBsZWZ0OiBcIlwiLmNvbmNhdCh4UG9zLCBcIiVcIiksIGJvdHRvbTogXCJcIi5jb25jYXQoeVBvcywgXCIlXCIpIH07XG4gICAgICAgIHZhciBzaXplID0ge307XG4gICAgICAgIHZhciBvcmllbnRhdGlvbjtcbiAgICAgICAgdmFyIHJhbmdlO1xuICAgICAgICB2YXIgc2xpZGVyO1xuICAgICAgICB2YXIgdGh1bWI7XG4gICAgICAgIHZhciB0cmFjaztcbiAgICAgICAgdmFyIHZhbHVlbWF4ID0geE1heDtcbiAgICAgICAgdmFyIHZhbHVlbWluID0geE1pbjtcbiAgICAgICAgdmFyIHZhbHVlbm93ID0gdGhpcy54O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgICAgICBzaXplLndpZHRoID0gXCJcIi5jb25jYXQoeFBvcywgXCIlXCIpO1xuICAgICAgICAgICAgc2xpZGVyID0gdGhpcy5zdHlsZXMuc2xpZGVyWDtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLnN0eWxlcy5yYW5nZVg7XG4gICAgICAgICAgICB0cmFjayA9IHRoaXMuc3R5bGVzLnRyYWNrWDtcbiAgICAgICAgICAgIHRodW1iID0gdGhpcy5zdHlsZXMudGh1bWJYO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChheGlzID09PSAneScpIHtcbiAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gXCJcIi5jb25jYXQoeVBvcywgXCIlXCIpO1xuICAgICAgICAgICAgc2xpZGVyID0gdGhpcy5zdHlsZXMuc2xpZGVyWTtcbiAgICAgICAgICAgIHJhbmdlID0gdGhpcy5zdHlsZXMucmFuZ2VZO1xuICAgICAgICAgICAgdHJhY2sgPSB0aGlzLnN0eWxlcy50cmFja1k7XG4gICAgICAgICAgICB0aHVtYiA9IHRoaXMuc3R5bGVzLnRodW1iWTtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgICAgICAgIHZhbHVlbWF4ID0geU1heDtcbiAgICAgICAgICAgIHZhbHVlbWluID0geU1pbjtcbiAgICAgICAgICAgIHZhbHVlbm93ID0gdGhpcy55O1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChheGlzID09PSAneHknKSB7XG4gICAgICAgICAgICBzaXplLmhlaWdodCA9IFwiXCIuY29uY2F0KHlQb3MsIFwiJVwiKTtcbiAgICAgICAgICAgIHNpemUud2lkdGggPSBcIlwiLmNvbmNhdCh4UG9zLCBcIiVcIik7XG4gICAgICAgICAgICBzbGlkZXIgPSB0aGlzLnN0eWxlcy5zbGlkZXJYWTtcbiAgICAgICAgICAgIHJhbmdlID0gdGhpcy5zdHlsZXMucmFuZ2VYWTtcbiAgICAgICAgICAgIHRyYWNrID0gdGhpcy5zdHlsZXMudHJhY2tYWTtcbiAgICAgICAgICAgIHRodW1iID0gdGhpcy5zdHlsZXMudGh1bWJYWTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX19hc3NpZ24oeyByZWY6IHRoaXMuc2xpZGVyLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwgc3R5bGU6IHNsaWRlciB9LCByZXN0KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByZWY6IHRoaXMudHJhY2ssIGNsYXNzTmFtZTogY2xhc3NOYW1lICYmIFwiXCIuY29uY2F0KGNsYXNzTmFtZSwgXCJfX3RyYWNrXCIpLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrVHJhY2ssIHJvbGU6IFwicHJlc2VudGF0aW9uXCIsIFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgV2UgY2FuJ3QgdXNlIFJlYWN0J3MgZXZlbnRzIGJlY2F1c2UgdGhlIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIHN0eWxlOiB0cmFjayB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSAmJiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX19yYW5nZVwiKSwgc3R5bGU6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzaXplKSwgcmFuZ2UpIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyByZWY6IHRoaXMucmFpbCwgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duLCBvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCwgXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgV2UgY2FuJ3QgdXNlIFJlYWN0J3MgZXZlbnRzIGJlY2F1c2UgdGhlIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgICAgICByb2xlOiBcInByZXNlbnRhdGlvblwiLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBXZSBjYW4ndCB1c2UgUmVhY3QncyBldmVudHMgYmVjYXVzZSB0aGUgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5zdHlsZXMucmFpbCksIHBvc2l0aW9uKSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IFwiYXJpYS1sYWJlbFwiOiBcInNsaWRlciBoYW5kbGVcIiwgXCJhcmlhLW9yaWVudGF0aW9uXCI6IG9yaWVudGF0aW9uLCBcImFyaWEtdmFsdWVtYXhcIjogdmFsdWVtYXgsIFwiYXJpYS12YWx1ZW1pblwiOiB2YWx1ZW1pbiwgXCJhcmlhLXZhbHVlbm93XCI6IHZhbHVlbm93LCBjbGFzc05hbWU6IGNsYXNzTmFtZSAmJiBcIlwiLmNvbmNhdChjbGFzc05hbWUsIFwiX190aHVtYlwiKSwgb25CbHVyOiB0aGlzLmhhbmRsZUJsdXIsIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsIHJvbGU6IFwic2xpZGVyXCIsIHN0eWxlOiB0aHVtYiwgdGFiSW5kZXg6IDAgfSkpKSkpO1xuICAgIH07XG4gICAgUmFuZ2VTbGlkZXIuZGVmYXVsdFByb3BzID0gZ2V0QmFzZVByb3BzKCk7XG4gICAgcmV0dXJuIFJhbmdlU2xpZGVyO1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGRlZmF1bHQgUmFuZ2VTbGlkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgY29uc3QgSFNMS2V5cyA9IFsnaCcsICdzJywgJ2wnXTtcbmV4cG9ydCBjb25zdCBSR0JLZXlzID0gWydyJywgJ2cnLCAnYiddO1xuLyoqXG4gKiBDb25zdHJhaW4gdmFsdWUgaW50byB0aGUgcmFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cmFpbihpbnB1dCwgYW1vdW50LCByYW5nZSwgc2lnbikge1xuICAgIGludmFyaWFudChhcmd1bWVudHMubGVuZ3RoID09PSA0LCAnQWxsIHBhcmFtZXRlcnMgYXJlIHJlcXVpcmVkJyk7XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IHJhbmdlO1xuICAgIGxldCB2YWx1ZSA9IGV4cHIoaW5wdXQgKyBzaWduICsgYW1vdW50KTtcbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgICAgdmFsdWUgPSBtaW47XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgIHZhbHVlID0gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5hYnModmFsdWUpO1xufVxuLyoqXG4gKiBDb25zdHJhaW4gYW4gYW5nbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cmFpbkRlZ3JlZXMoaW5wdXQsIGFtb3VudCkge1xuICAgIGludmFyaWFudChpc051bWJlcihpbnB1dCksICdpbnB1dCBpcyByZXF1aXJlZCcpO1xuICAgIGxldCB2YWx1ZSA9IGlucHV0ICsgYW1vdW50O1xuICAgIGlmICh2YWx1ZSA+IDM2MCkge1xuICAgICAgICB2YWx1ZSAlPSAzNjA7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgdmFsdWUgKz0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5hYnModmFsdWUpO1xufVxuLyoqXG4gKiBQYXJzZSBtYXRoIHN0cmluZyBleHByZXNzaW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwcihpbnB1dCkge1xuICAgIGNvbnN0IGNoYXJzID0gWy4uLmlucHV0XTtcbiAgICBjb25zdCBuID0gW107XG4gICAgY29uc3Qgb3AgPSBbXTtcbiAgICBsZXQgcGFyc2VkO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGxhc3QgPSB0cnVlO1xuICAgIG5baW5kZXhdID0gJyc7XG4gICAgLy8gUGFyc2UgdGhlIHN0cmluZ1xuICAgIGZvciAoY29uc3QgY2hhciBvZiBjaGFycykge1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlSW50KGNoYXIsIDEwKSkgJiYgY2hhciAhPT0gJy4nICYmICFsYXN0KSB7XG4gICAgICAgICAgICBvcFtpbmRleF0gPSBjaGFyO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIG5baW5kZXhdID0gJyc7XG4gICAgICAgICAgICBsYXN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5baW5kZXhdICs9IGNoYXI7XG4gICAgICAgICAgICBsYXN0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBleHByZXNzaW9uXG4gICAgcGFyc2VkID0gcGFyc2VGbG9hdChuWzBdKTtcbiAgICBmb3IgKGNvbnN0IFtvLCBlbGVtZW50XSBvZiBvcC5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KG5bbyArIDFdKTtcbiAgICAgICAgc3dpdGNoIChlbGVtZW50KSB7XG4gICAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgICAgICBwYXJzZWQgKz0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICAgICAgICBwYXJzZWQgLT0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcqJzpcbiAgICAgICAgICAgICAgICBwYXJzZWQgKj0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICBwYXJzZWQgLz0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZXJyb3I7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICBlcnJvci5uYW1lID0gJ2NvbG9yaXpyJztcbiAgICB0aHJvdyBlcnJvcjtcbn1cbi8qKlxuICogQ2hlY2sgaWYgYW4gb2JqZWN0IGNvbnRhaW5zIEhTTCB2YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSFNMKGlucHV0KSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhpbnB1dCk7XG4gICAgcmV0dXJuICghIWVudHJpZXMubGVuZ3RoICYmXG4gICAgICAgIGVudHJpZXMuZXZlcnkoKFtrZXksIHZhbHVlXSkgPT4gSFNMS2V5cy5pbmNsdWRlcyhrZXkpICYmIHZhbHVlID49IDAgJiYgdmFsdWUgPD0gKGtleSA9PT0gJ2gnID8gMzYwIDogMTAwKSkpO1xufVxuLyoqXG4gKiBDaGVjayBpZiB0aGUgaW5wdXQgaXMgYSBudW1iZXIgYW5kIG5vdCBOYU5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicgJiYgIU51bWJlci5pc05hTihpbnB1dCk7XG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSBpbnB1dCBpcyBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QoaW5wdXQpIHtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgeyB0b1N0cmluZyB9ID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgICBjb25zdCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpO1xuICAgIHJldHVybiAodG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmXG4gICAgICAgIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pKSk7XG59XG4vKipcbiAqIENoZWNrIGlmIGFuIG9iamVjdCBjb250YWlucyBSR0IgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSR0IoaW5wdXQpIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGlucHV0KTtcbiAgICByZXR1cm4gKCEhZW50cmllcy5sZW5ndGggJiZcbiAgICAgICAgZW50cmllcy5ldmVyeSgoW2tleSwgdmFsdWVdKSA9PiBSR0JLZXlzLmluY2x1ZGVzKGtleSkgJiYgdmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSAyNTUpKTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgYW4gYXJyYXkgY29udGFpbnMgUkdCIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUkdCQXJyYXkoaW5wdXQpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID09PSAzICYmIGlucHV0LmV2ZXJ5KGQgPT4gZCA+PSAwICYmIGQgPD0gMjU1KTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGlucHV0IGlzIGEgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhpbnB1dCkge1xuICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnO1xufVxuLyoqXG4gKiBMaW1pdCB2YWx1ZXMgcGVyIHR5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW1pdChpbnB1dCwgdHlwZSkge1xuICAgIGludmFyaWFudChpc051bWJlcihpbnB1dCksICdJbnB1dCBpcyBub3QgYSBudW1iZXInKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChSR0JLZXlzLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihpbnB1dCwgMjU1KSwgMCk7XG4gICAgfVxuICAgIGlmIChbJ3MnLCAnbCddLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihpbnB1dCwgMTAwKSwgMCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnaCcpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGlucHV0LCAzNjApLCAwKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHR5cGUnKTtcbn1cbmV4cG9ydCBjb25zdCBtZXNzYWdlcyA9IHtcbiAgICBhbW91bnQ6ICdhbW91bnQgbXVzdCBiZSBhIG51bWJlcicsXG4gICAgbGVmdDogJ2xlZnQgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgYSBzdHJpbmcnLFxuICAgIHJpZ2h0OiAncmlnaHQgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgYSBzdHJpbmcnLFxuICAgIGlucHV0OiAnaW5wdXQgaXMgcmVxdWlyZWQnLFxuICAgIGlucHV0U3RyaW5nOiAnaW5wdXQgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgYSBzdHJpbmcnLFxuICAgIGludmFsaWQ6ICdpbnZhbGlkIGlucHV0JyxcbiAgICBvcHRpb25zOiAnaW52YWxpZCBvcHRpb25zJyxcbn07XG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgc291cmNlIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaWNrKGlucHV0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uc1xuICAgICAgICAuZmlsdGVyKGQgPT4gdHlwZW9mIGlucHV0W2RdICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBkKSA9PiB7XG4gICAgICAgIGFjY1tkXSA9IGlucHV0W2RdO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn1cbi8qKlxuICogUm91bmQgZGVjaW1hbCBudW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQoaW5wdXQsIGRpZ2l0cyA9IDIpIHtcbiAgICBjb25zdCBmYWN0b3IgPSAxMCAqKiBkaWdpdHM7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoaW5wdXQgKiBmYWN0b3IpIC8gZmFjdG9yO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNWYWxpZEhleChpbnB1dCwgYWxwaGEgPSB0cnVlKSB7XG4gICAgaWYgKCFpc1N0cmluZyhpbnB1dCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgcmV0dXJuIC9eIyhbXFxkYS1mXXszLDR9fFtcXGRhLWZdezYsOH0pJC9pLnRlc3QoaW5wdXQpO1xuICAgIH1cbiAgICByZXR1cm4gL14jKFtcXGRhLWZdezN9fFtcXGRhLWZdezZ9KSQvaS50ZXN0KGlucHV0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLXZhbGlkLWhleC5qcy5tYXAiLCJpbXBvcnQgaXNWYWxpZEhleCBmcm9tICcuL2lzLXZhbGlkLWhleCc7XG5pbXBvcnQgeyBpbnZhcmlhbnQsIGlzU3RyaW5nLCBtZXNzYWdlcyB9IGZyb20gJy4vbW9kdWxlcy91dGlscyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXRIZXgoaW5wdXQpIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoaW5wdXQpLCBtZXNzYWdlcy5pbnB1dFN0cmluZyk7XG4gICAgY29uc3QgY29sb3IgPSBpbnB1dC5yZXBsYWNlKCcjJywgJycpO1xuICAgIGxldCBoZXggPSBjb2xvcjtcbiAgICBpZiAoY29sb3IubGVuZ3RoID09PSAzIHx8IGNvbG9yLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBoZXggPSAnJztcbiAgICAgICAgWy4uLmNvbG9yXS5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgaGV4ICs9IGQgKyBkO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGV4ID0gYCMke2hleH1gO1xuICAgIGludmFyaWFudChpc1ZhbGlkSGV4KGhleCksICdpbnZhbGlkIGhleCcpO1xuICAgIHJldHVybiBoZXg7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JtYXQtaGV4LmpzLm1hcCIsImltcG9ydCBmb3JtYXRIZXggZnJvbSAnLi9mb3JtYXQtaGV4JztcbmltcG9ydCB7IGludmFyaWFudCwgaXNTdHJpbmcsIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhleDJyZ2IoaW5wdXQpIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoaW5wdXQpLCBtZXNzYWdlcy5pbnB1dFN0cmluZyk7XG4gICAgY29uc3QgaGV4ID0gZm9ybWF0SGV4KGlucHV0KS5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogcGFyc2VJbnQoU3RyaW5nKGhleC5jaGFyQXQoMCkpICsgaGV4LmNoYXJBdCgxKSwgMTYpLFxuICAgICAgICBnOiBwYXJzZUludChTdHJpbmcoaGV4LmNoYXJBdCgyKSkgKyBoZXguY2hhckF0KDMpLCAxNiksXG4gICAgICAgIGI6IHBhcnNlSW50KFN0cmluZyhoZXguY2hhckF0KDQpKSArIGhleC5jaGFyQXQoNSksIDE2KSxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGV4MnJnYi5qcy5tYXAiLCJpbXBvcnQgeyBpbnZhcmlhbnQsIGlzUkdCLCBsaW1pdCwgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmdiMmhzbChpbnB1dCkge1xuICAgIGludmFyaWFudCghIWlucHV0LCBtZXNzYWdlcy5pbnB1dCk7XG4gICAgbGV0IHJnYiA9IGlucHV0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgICByZ2IgPSB7IHI6IGlucHV0WzBdLCBnOiBpbnB1dFsxXSwgYjogaW5wdXRbMl0gfTtcbiAgICB9XG4gICAgaW52YXJpYW50KGlzUkdCKHJnYiksIG1lc3NhZ2VzLmludmFsaWQpO1xuICAgIGNvbnN0IHJMaW1pdCA9IGxpbWl0KHJnYi5yLCAncicpIC8gMjU1O1xuICAgIGNvbnN0IGdMaW1pdCA9IGxpbWl0KHJnYi5nLCAnZycpIC8gMjU1O1xuICAgIGNvbnN0IGJMaW1pdCA9IGxpbWl0KHJnYi5iLCAnYicpIC8gMjU1O1xuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHJMaW1pdCwgZ0xpbWl0LCBiTGltaXQpO1xuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHJMaW1pdCwgZ0xpbWl0LCBiTGltaXQpO1xuICAgIGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuICAgIGxldCBoID0gMDtcbiAgICBsZXQgcztcbiAgICBjb25zdCBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGxldCByYXRlO1xuICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgIGNhc2UgckxpbWl0OlxuICAgICAgICAgICAgcmF0ZSA9ICFkZWx0YSA/IDAgOiAoZ0xpbWl0IC0gYkxpbWl0KSAvIGRlbHRhO1xuICAgICAgICAgICAgaCA9IDYwICogcmF0ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGdMaW1pdDpcbiAgICAgICAgICAgIHJhdGUgPSAoYkxpbWl0IC0gckxpbWl0KSAvIGRlbHRhO1xuICAgICAgICAgICAgaCA9IDYwICogcmF0ZSArIDEyMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGJMaW1pdDpcbiAgICAgICAgICAgIHJhdGUgPSAockxpbWl0IC0gZ0xpbWl0KSAvIGRlbHRhO1xuICAgICAgICAgICAgaCA9IDYwICogcmF0ZSArIDI0MDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoID0gMzYwICsgaDtcbiAgICB9XG4gICAgaWYgKG1pbiA9PT0gbWF4KSB7XG4gICAgICAgIHMgPSAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcyA9IGwgPCAwLjUgPyBkZWx0YSAvICgyICogbCkgOiBkZWx0YSAvICgyIC0gMiAqIGwpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBoOiBNYXRoLmFicygrKGggJSAzNjApLnRvRml4ZWQoMikpLFxuICAgICAgICBzOiArKHMgKiAxMDApLnRvRml4ZWQoMiksXG4gICAgICAgIGw6ICsobCAqIDEwMCkudG9GaXhlZCgyKSxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmdiMmhzbC5qcy5tYXAiLCJpbXBvcnQgaGV4MnJnYiBmcm9tICcuL2hleDJyZ2InO1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc1N0cmluZywgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0IHJnYjJoc2wgZnJvbSAnLi9yZ2IyaHNsJztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhleDJoc2woaW5wdXQpIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoaW5wdXQpLCBtZXNzYWdlcy5pbnB1dFN0cmluZyk7XG4gICAgcmV0dXJuIHJnYjJoc2woaGV4MnJnYihpbnB1dCkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGV4MmhzbC5qcy5tYXAiLCJpbXBvcnQgeyBpbnZhcmlhbnQsIGlzTnVtYmVyLCByb3VuZCB9IGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiBDb252ZXJ0IGh1ZSB0byBSR0IgdXNpbmcgY2hyb21hIGFuZCBtZWRpYW4gcG9pbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHVlMnJnYihwb2ludCwgY2hyb21hLCBoKSB7XG4gICAgaW52YXJpYW50KGlzTnVtYmVyKHBvaW50KSAmJiBpc051bWJlcihjaHJvbWEpICYmIGlzTnVtYmVyKGgpLCAncG9pbnQsIGNocm9tYSBhbmQgaCBhcmUgcmVxdWlyZWQnKTtcbiAgICBsZXQgaHVlID0gaDtcbiAgICBpZiAoaHVlIDwgMCkge1xuICAgICAgICBodWUgKz0gMTtcbiAgICB9XG4gICAgaWYgKGh1ZSA+IDEpIHtcbiAgICAgICAgaHVlIC09IDE7XG4gICAgfVxuICAgIGlmIChodWUgPCAxIC8gNikge1xuICAgICAgICByZXR1cm4gcm91bmQocG9pbnQgKyAoY2hyb21hIC0gcG9pbnQpICogNiAqIGh1ZSwgNCk7XG4gICAgfVxuICAgIGlmIChodWUgPCAxIC8gMikge1xuICAgICAgICByZXR1cm4gcm91bmQoY2hyb21hLCA0KTtcbiAgICB9XG4gICAgaWYgKGh1ZSA8IDIgLyAzKSB7XG4gICAgICAgIHJldHVybiByb3VuZChwb2ludCArIChjaHJvbWEgLSBwb2ludCkgKiAoMiAvIDMgLSBodWUpICogNiwgNCk7XG4gICAgfVxuICAgIHJldHVybiByb3VuZChwb2ludCwgNCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odWUycmdiLmpzLm1hcCIsImltcG9ydCBodWUycmdiIGZyb20gJy4vbW9kdWxlcy9odWUycmdiJztcbmltcG9ydCB7IGludmFyaWFudCwgaXNIU0wsIG1lc3NhZ2VzLCByb3VuZCB9IGZyb20gJy4vbW9kdWxlcy91dGlscyc7XG4vKipcbiAqIENvbnZlcnQgYW4gSFNMIG9iamVjdCB0byBSR0IuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhzbDJyZ2IoaW5wdXQpIHtcbiAgICBpbnZhcmlhbnQoISFpbnB1dCwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIGludmFyaWFudChpc0hTTChpbnB1dCksICdpbnZhbGlkIGlucHV0Jyk7XG4gICAgY29uc3QgaCA9IHJvdW5kKGlucHV0LmgpIC8gMzYwO1xuICAgIGNvbnN0IHMgPSByb3VuZChpbnB1dC5zKSAvIDEwMDtcbiAgICBjb25zdCBsID0gcm91bmQoaW5wdXQubCkgLyAxMDA7XG4gICAgbGV0IHI7XG4gICAgbGV0IGc7XG4gICAgbGV0IGI7XG4gICAgbGV0IHBvaW50O1xuICAgIGxldCBjaHJvbWE7XG4gICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgciA9IGw7XG4gICAgICAgIGcgPSBsO1xuICAgICAgICBiID0gbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNocm9tYSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgICAgIHBvaW50ID0gMiAqIGwgLSBjaHJvbWE7XG4gICAgICAgIHIgPSBodWUycmdiKHBvaW50LCBjaHJvbWEsIGggKyAxIC8gMyk7XG4gICAgICAgIGcgPSBodWUycmdiKHBvaW50LCBjaHJvbWEsIGgpO1xuICAgICAgICBiID0gaHVlMnJnYihwb2ludCwgY2hyb21hLCBoIC0gMSAvIDMpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByOiBNYXRoLnJvdW5kKHIgKiAyNTUpLFxuICAgICAgICBnOiBNYXRoLnJvdW5kKGcgKiAyNTUpLFxuICAgICAgICBiOiBNYXRoLnJvdW5kKGIgKiAyNTUpLFxuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oc2wycmdiLmpzLm1hcCIsImltcG9ydCB7IGludmFyaWFudCwgaXNSR0IsIGlzUkdCQXJyYXksIG1lc3NhZ2VzIH0gZnJvbSAnLi9tb2R1bGVzL3V0aWxzJztcbi8qKlxuICogQ29udmVydCBhbiBSR0Egb2JqZWN0IHRvIGhleC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmdiMmhleChpbnB1dCkge1xuICAgIGludmFyaWFudCghIWlucHV0LCBtZXNzYWdlcy5pbnB1dCk7XG4gICAgaW52YXJpYW50KGlzUkdCQXJyYXkoaW5wdXQpIHx8IGlzUkdCKGlucHV0KSwgbWVzc2FnZXMuaW52YWxpZCk7XG4gICAgbGV0IHI7XG4gICAgbGV0IGc7XG4gICAgbGV0IGI7XG4gICAgaWYgKGlzUkdCQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgIFtyLCBnLCBiXSA9IGlucHV0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgKHsgciwgZywgYiB9ID0gaW5wdXQpO1xuICAgIH1cbiAgICBjb25zdCBvdXRwdXQgPSBbci50b1N0cmluZygxNiksIGcudG9TdHJpbmcoMTYpLCBiLnRvU3RyaW5nKDE2KV07XG4gICAgcmV0dXJuIGAjJHtvdXRwdXQubWFwKGQgPT4gKGQubGVuZ3RoID09PSAxID8gYDAke2R9YCA6IGQpKS5qb2luKCcnKX1gO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmdiMmhleC5qcy5tYXAiLCJpbXBvcnQgaHNsMnJnYiBmcm9tICcuL2hzbDJyZ2InO1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc0hTTCwgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0IHJnYjJoZXggZnJvbSAnLi9yZ2IyaGV4Jztcbi8qKlxuICogQ29udmVydCBhIEhTTCBvYmplY3QgdG8gSEVYLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoc2wyaGV4KGlucHV0KSB7XG4gICAgaW52YXJpYW50KGlzSFNMKGlucHV0KSwgbWVzc2FnZXMuaW52YWxpZCk7XG4gICAgcmV0dXJuIHJnYjJoZXgoaHNsMnJnYihpbnB1dCkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHNsMmhleC5qcy5tYXAiLCIvKipcbiAqIENTUyBuYW1lZCBjb2xvcnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNzc0NvbG9ycyA9IHtcbiAgICBhbGljZWJsdWU6ICcjZjBmOGZmJyxcbiAgICBhbnRpcXVld2hpdGU6ICcjZmFlYmQ3JyxcbiAgICBhcXVhOiAnIzAwZmZmZicsXG4gICAgYXF1YW1hcmluZTogJyM3ZmZmZDQnLFxuICAgIGF6dXJlOiAnI2YwZmZmZicsXG4gICAgYmVpZ2U6ICcjZjVmNWRjJyxcbiAgICBiaXNxdWU6ICcjZmZlNGM0JyxcbiAgICBibGFjazogJyMwMDAwMDAnLFxuICAgIGJsYW5jaGVkYWxtb25kOiAnI2ZmZWJjZCcsXG4gICAgYmx1ZTogJyMwMDAwZmYnLFxuICAgIGJsdWV2aW9sZXQ6ICcjOGEyYmUyJyxcbiAgICBicm93bjogJyNhNTJhMmEnLFxuICAgIGJ1cmx5d29vZDogJyNkZWI4ODcnLFxuICAgIGNhZGV0Ymx1ZTogJyM1ZjllYTAnLFxuICAgIGNoYXJ0cmV1c2U6ICcjN2ZmZjAwJyxcbiAgICBjaG9jb2xhdGU6ICcjZDI2OTFlJyxcbiAgICBjb3JhbDogJyNmZjdmNTAnLFxuICAgIGNvcm5mbG93ZXJibHVlOiAnIzY0OTVlZCcsXG4gICAgY29ybnNpbGs6ICcjZmZmOGRjJyxcbiAgICBjcmltc29uOiAnI2RjMTQzYycsXG4gICAgY3lhbjogJyMwMGZmZmYnLFxuICAgIGRhcmtibHVlOiAnIzAwMDA4YicsXG4gICAgZGFya2N5YW46ICcjMDA4YjhiJyxcbiAgICBkYXJrZ29sZGVucm9kOiAnI2I4ODYwYicsXG4gICAgZGFya2dyYXk6ICcjYTlhOWE5JyxcbiAgICBkYXJrZ3JleTogJyNhOWE5YTknLFxuICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgIGRhcmtraGFraTogJyNiZGI3NmInLFxuICAgIGRhcmttYWdlbnRhOiAnIzhiMDA4YicsXG4gICAgZGFya29saXZlZ3JlZW46ICcjNTU2YjJmJyxcbiAgICBkYXJrb3JhbmdlOiAnI2ZmOGMwMCcsXG4gICAgZGFya29yY2hpZDogJyM5OTMyY2MnLFxuICAgIGRhcmtyZWQ6ICcjOGIwMDAwJyxcbiAgICBkYXJrc2FsbW9uOiAnI2U5OTY3YScsXG4gICAgZGFya3NlYWdyZWVuOiAnIzhmYmM4ZicsXG4gICAgZGFya3NsYXRlYmx1ZTogJyM0ODNkOGInLFxuICAgIGRhcmtzbGF0ZWdyYXk6ICcjMmY0ZjRmJyxcbiAgICBkYXJrc2xhdGVncmV5OiAnIzJmNGY0ZicsXG4gICAgZGFya3R1cnF1b2lzZTogJyMwMGNlZDEnLFxuICAgIGRhcmt2aW9sZXQ6ICcjOTQwMGQzJyxcbiAgICBkZWVwcGluazogJyNmZjE0OTMnLFxuICAgIGRlZXBza3libHVlOiAnIzAwYmZmZicsXG4gICAgZGltZ3JheTogJyM2OTY5NjknLFxuICAgIGRpbWdyZXk6ICcjNjk2OTY5JyxcbiAgICBkb2RnZXJibHVlOiAnIzFlOTBmZicsXG4gICAgZmlyZWJyaWNrOiAnI2IyMjIyMicsXG4gICAgZmxvcmFsd2hpdGU6ICcjZmZmYWYwJyxcbiAgICBmb3Jlc3RncmVlbjogJyMyMjhiMjInLFxuICAgIGZ1Y2hzaWE6ICcjZmYwMGZmJyxcbiAgICBnYWluc2Jvcm86ICcjZGNkY2RjJyxcbiAgICBnaG9zdHdoaXRlOiAnI2Y4ZjhmZicsXG4gICAgZ29sZDogJyNmZmQ3MDAnLFxuICAgIGdvbGRlbnJvZDogJyNkYWE1MjAnLFxuICAgIGdyYXk6ICcjODA4MDgwJyxcbiAgICBncmV5OiAnIzgwODA4MCcsXG4gICAgZ3JlZW46ICcjMDA4MDAwJyxcbiAgICBncmVlbnllbGxvdzogJyNhZGZmMmYnLFxuICAgIGhvbmV5ZGV3OiAnI2YwZmZmMCcsXG4gICAgaG90cGluazogJyNmZjY5YjQnLFxuICAgIGluZGlhbnJlZDogJyNjZDVjNWMnLFxuICAgIGluZGlnbzogJyM0YjAwODInLFxuICAgIGl2b3J5OiAnI2ZmZmZmMCcsXG4gICAga2hha2k6ICcjZjBlNjhjJyxcbiAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgIGxhdmVuZGVyYmx1c2g6ICcjZmZmMGY1JyxcbiAgICBsYXduZ3JlZW46ICcjN2NmYzAwJyxcbiAgICBsZW1vbmNoaWZmb246ICcjZmZmYWNkJyxcbiAgICBsaWdodGJsdWU6ICcjYWRkOGU2JyxcbiAgICBsaWdodGNvcmFsOiAnI2YwODA4MCcsXG4gICAgbGlnaHRjeWFuOiAnI2UwZmZmZicsXG4gICAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6ICcjRkFGQUQyJyxcbiAgICBsaWdodGdyYXk6ICcjZDNkM2QzJyxcbiAgICBsaWdodGdyZXk6ICcjZDNkM2QzJyxcbiAgICBsaWdodGdyZWVuOiAnIzkwZWU5MCcsXG4gICAgbGlnaHRwaW5rOiAnI2ZmYjZjMScsXG4gICAgbGlnaHRzYWxtb246ICcjZmZhMDdhJyxcbiAgICBsaWdodHNlYWdyZWVuOiAnIzIwYjJhYScsXG4gICAgbGlnaHRza3libHVlOiAnIzg3Y2VmYScsXG4gICAgbGlnaHRzbGF0ZWdyYXk6ICcjNzc4ODk5JyxcbiAgICBsaWdodHNsYXRlZ3JleTogJyM3Nzg4OTknLFxuICAgIGxpZ2h0c3RlZWxibHVlOiAnI2IwYzRkZScsXG4gICAgbGlnaHR5ZWxsb3c6ICcjZmZmZmUwJyxcbiAgICBsaW1lOiAnIzAwZmYwMCcsXG4gICAgbGltZWdyZWVuOiAnIzMyY2QzMicsXG4gICAgbGluZW46ICcjZmFmMGU2JyxcbiAgICBtYWdlbnRhOiAnI2ZmMDBmZicsXG4gICAgbWFyb29uOiAnIzgwMDAwMCcsXG4gICAgbWVkaXVtYXF1YW1hcmluZTogJyM2NmNkYWEnLFxuICAgIG1lZGl1bWJsdWU6ICcjMDAwMGNkJyxcbiAgICBtZWRpdW1vcmNoaWQ6ICcjYmE1NWQzJyxcbiAgICBtZWRpdW1wdXJwbGU6ICcjOTM3MGQ4JyxcbiAgICBtZWRpdW1zZWFncmVlbjogJyMzY2IzNzEnLFxuICAgIG1lZGl1bXNsYXRlYmx1ZTogJyM3YjY4ZWUnLFxuICAgIG1lZGl1bXNwcmluZ2dyZWVuOiAnIzAwZmE5YScsXG4gICAgbWVkaXVtdHVycXVvaXNlOiAnIzQ4ZDFjYycsXG4gICAgbWVkaXVtdmlvbGV0cmVkOiAnI2M3MTU4NScsXG4gICAgbWlkbmlnaHRibHVlOiAnIzE5MTk3MCcsXG4gICAgbWludGNyZWFtOiAnI2Y1ZmZmYScsXG4gICAgbWlzdHlyb3NlOiAnI2ZmZTRlMScsXG4gICAgbW9jY2FzaW46ICcjZmZlNGI1JyxcbiAgICBuYXZham93aGl0ZTogJyNmZmRlYWQnLFxuICAgIG5hdnk6ICcjMDAwMDgwJyxcbiAgICBvbGRsYWNlOiAnI2ZkZjVlNicsXG4gICAgb2xpdmU6ICcjODA4MDAwJyxcbiAgICBvbGl2ZWRyYWI6ICcjNmI4ZTIzJyxcbiAgICBvcmFuZ2U6ICcjZmZhNTAwJyxcbiAgICBvcmFuZ2VyZWQ6ICcjZmY0NTAwJyxcbiAgICBvcmNoaWQ6ICcjZGE3MGQ2JyxcbiAgICBwYWxlZ29sZGVucm9kOiAnI2VlZThhYScsXG4gICAgcGFsZWdyZWVuOiAnIzk4ZmI5OCcsXG4gICAgcGFsZXR1cnF1b2lzZTogJyNhZmVlZWUnLFxuICAgIHBhbGV2aW9sZXRyZWQ6ICcjZDg3MDkzJyxcbiAgICBwYXBheWF3aGlwOiAnI2ZmZWZkNScsXG4gICAgcGVhY2hwdWZmOiAnI2ZmZGFiOScsXG4gICAgcGVydTogJyNjZDg1M2YnLFxuICAgIHBpbms6ICcjZmZjMGNiJyxcbiAgICBwbHVtOiAnI2RkYTBkZCcsXG4gICAgcG93ZGVyYmx1ZTogJyNiMGUwZTYnLFxuICAgIHB1cnBsZTogJyM4MDAwODAnLFxuICAgIHJlZDogJyNmZjAwMDAnLFxuICAgIHJvc3licm93bjogJyNiYzhmOGYnLFxuICAgIHJveWFsYmx1ZTogJyM0MTY5ZTEnLFxuICAgIHNhZGRsZWJyb3duOiAnIzhiNDUxMycsXG4gICAgc2FsbW9uOiAnI2ZhODA3MicsXG4gICAgc2FuZHlicm93bjogJyNmNGE0NjAnLFxuICAgIHNlYWdyZWVuOiAnIzJlOGI1NycsXG4gICAgc2Vhc2hlbGw6ICcjZmZmNWVlJyxcbiAgICBzaWVubmE6ICcjYTA1MjJkJyxcbiAgICBzaWx2ZXI6ICcjYzBjMGMwJyxcbiAgICBza3libHVlOiAnIzg3Y2VlYicsXG4gICAgc2xhdGVibHVlOiAnIzZhNWFjZCcsXG4gICAgc2xhdGVncmF5OiAnIzcwODA5MCcsXG4gICAgc2xhdGVncmV5OiAnIzcwODA5MCcsXG4gICAgc25vdzogJyNmZmZhZmEnLFxuICAgIHNwcmluZ2dyZWVuOiAnIzAwZmY3ZicsXG4gICAgc3RlZWxibHVlOiAnIzQ2ODJiNCcsXG4gICAgdGFuOiAnI2QyYjQ4YycsXG4gICAgdGVhbDogJyMwMDgwODAnLFxuICAgIHRoaXN0bGU6ICcjZDhiZmQ4JyxcbiAgICB0b21hdG86ICcjZmY2MzQ3JyxcbiAgICB0dXJxdW9pc2U6ICcjNDBlMGQwJyxcbiAgICB2aW9sZXQ6ICcjZWU4MmVlJyxcbiAgICB3aGVhdDogJyNmNWRlYjMnLFxuICAgIHdoaXRlOiAnI2ZmZmZmZicsXG4gICAgd2hpdGVzbW9rZTogJyNmNWY1ZjUnLFxuICAgIHllbGxvdzogJyNmZmZmMDAnLFxuICAgIHllbGxvd2dyZWVuOiAnIzlhY2QzMicsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3NzLWNvbG9ycy5qcy5tYXAiLCJpbXBvcnQgaGV4MmhzbCBmcm9tICcuL2hleDJoc2wnO1xuaW1wb3J0IGhleDJyZ2IgZnJvbSAnLi9oZXgycmdiJztcbmltcG9ydCBoc2wyaGV4IGZyb20gJy4vaHNsMmhleCc7XG5pbXBvcnQgaHNsMnJnYiBmcm9tICcuL2hzbDJyZ2InO1xuaW1wb3J0IGlzVmFsaWRIZXggZnJvbSAnLi9pcy12YWxpZC1oZXgnO1xuaW1wb3J0IHsgY3NzQ29sb3JzIH0gZnJvbSAnLi9tb2R1bGVzL2Nzcy1jb2xvcnMnO1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc1N0cmluZywgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0IHJnYjJoZXggZnJvbSAnLi9yZ2IyaGV4JztcbmltcG9ydCByZ2IyaHNsIGZyb20gJy4vcmdiMmhzbCc7XG4vKipcbiAqIFBhcnNlIENTUyBjb2xvclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUNTUyhpbnB1dCwgb3V0cHV0KSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGlucHV0KSwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgY29uc3QgcGFyc2VkSW5wdXQgPSBjc3NDb2xvcnNbaW5wdXQudG9Mb3dlckNhc2UoKV0gfHwgaW5wdXQ7XG4gICAgaWYgKGlzVmFsaWRIZXgocGFyc2VkSW5wdXQpKSB7XG4gICAgICAgIHN3aXRjaCAob3V0cHV0KSB7XG4gICAgICAgICAgICBjYXNlICdoc2wnOiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaGV4MmhzbChwYXJzZWRJbnB1dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdyZ2InOiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaGV4MnJnYihwYXJzZWRJbnB1dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcGFyc2VkSW5wdXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIFRPRE86IGltcHJvdmUgdGhlIHBhdHRlcm4gdG8gcmVxdWlyZSAzIGdyb3Vwc1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gcGFyc2VkSW5wdXQubWF0Y2goLyhoc2x8cmdiKWE/XFwoKFxcZCspKD86LFxccyp8XFxzKykoXFxkKyklPyg/OixcXHMqfFxccyspKFxcZCspJT9bXildKlxcKS9pKTtcbiAgICAgICAgaW52YXJpYW50KEFycmF5LmlzQXJyYXkobWF0Y2hlcyksICdpbnZhbGlkIENTUyBzdHJpbmcnKTtcbiAgICAgICAgaW52YXJpYW50KG1hdGNoZXMubGVuZ3RoID09PSA1LCAnaW52YWxpZCBDU1Mgc3RyaW5nJyk7XG4gICAgICAgIGNvbnN0IFssIG1vZGVsLCBoT1JyLCBzT1JnLCBsT1JiXSA9IG1hdGNoZXM7XG4gICAgICAgIGxldCBoZXg7XG4gICAgICAgIGxldCBoc2w7XG4gICAgICAgIGxldCByZ2I7XG4gICAgICAgIGlmIChtb2RlbCA9PT0gJ2hzbCcpIHtcbiAgICAgICAgICAgIGhzbCA9IHtcbiAgICAgICAgICAgICAgICBoOiBwYXJzZUludChoT1JyLCAxMCksXG4gICAgICAgICAgICAgICAgczogcGFyc2VJbnQoc09SZywgMTApLFxuICAgICAgICAgICAgICAgIGw6IHBhcnNlSW50KGxPUmIsIDEwKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBoZXggPSBoc2wyaGV4KGhzbCk7XG4gICAgICAgICAgICByZ2IgPSBoc2wycmdiKGhzbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZ2IgPSB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoaE9SciwgMTApLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHNPUmcsIDEwKSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChsT1JiLCAxMCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaGV4ID0gcmdiMmhleChyZ2IpO1xuICAgICAgICAgICAgaHNsID0gcmdiMmhzbChyZ2IpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAob3V0cHV0KSB7XG4gICAgICAgICAgICBjYXNlICdoc2wnOiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHNsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAncmdiJzoge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJnYjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaGV4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJzZS1jc3MuanMubWFwIiwiaW1wb3J0IGhleDJoc2wgZnJvbSAnLi9oZXgyaHNsJztcbmltcG9ydCBoZXgycmdiIGZyb20gJy4vaGV4MnJnYic7XG5pbXBvcnQgeyBpbnZhcmlhbnQsIGlzTnVtYmVyLCBpc1N0cmluZywgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0IHBhcnNlQ1NTIGZyb20gJy4vcGFyc2UtY3NzJztcbi8qKlxuICogRmFkZSB0aGUgY29sb3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFkZShpbnB1dCwgYW1vdW50ID0gMTAsIG91dHB1dCA9ICdyZ2InKSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGlucHV0KSwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIGludmFyaWFudChpc051bWJlcihhbW91bnQpLCBtZXNzYWdlcy5hbW91bnQpO1xuICAgIGNvbnN0IGhleCA9IHBhcnNlQ1NTKGlucHV0KTtcbiAgICBjb25zdCBwZXJjZW50YWdlID0gKDEwMCAtIGFtb3VudCkgLyAxMDA7XG4gICAgaWYgKG91dHB1dCA9PT0gJ3JnYicpIHtcbiAgICAgICAgY29uc3QgeyByLCBnLCBiIH0gPSBoZXgycmdiKGhleCk7XG4gICAgICAgIHJldHVybiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAke3BlcmNlbnRhZ2V9KWA7XG4gICAgfVxuICAgIGlmIChvdXRwdXQgPT09ICdoc2wnKSB7XG4gICAgICAgIGNvbnN0IHsgaCwgcywgbCB9ID0gaGV4MmhzbChoZXgpO1xuICAgICAgICByZXR1cm4gYGhzbGEoJHtofSwgJHtzfSUsICR7bH0lLCAke3BlcmNlbnRhZ2V9KWA7XG4gICAgfVxuICAgIHJldHVybiBgJHtoZXh9JHtNYXRoLnJvdW5kKHBlcmNlbnRhZ2UgKiAyNTUpLnRvU3RyaW5nKDE2KX1gO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFkZS5qcy5tYXAiLCJpbXBvcnQgaGV4MnJnYiBmcm9tICcuL2hleDJyZ2InO1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc1N0cmluZywgbWVzc2FnZXMgfSBmcm9tICcuL21vZHVsZXMvdXRpbHMnO1xuaW1wb3J0IHBhcnNlQ1NTIGZyb20gJy4vcGFyc2UtY3NzJztcbi8qKlxuICogR2V0IHRoZSBjb250cmFzdGVkIGNvbG9yIGZvciBhIGdpdmVuIGhleC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGV4dENvbG9yKGlucHV0KSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGlucHV0KSwgbWVzc2FnZXMuaW5wdXRTdHJpbmcpO1xuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gaGV4MnJnYihwYXJzZUNTUyhpbnB1dCkpO1xuICAgIGNvbnN0IHlpcSA9IChyICogMjk5ICsgZyAqIDU4NyArIGIgKiAxMTQpIC8gMTAwMDtcbiAgICByZXR1cm4geWlxID49IDEyOCA/ICcjMDAwMDAwJyA6ICcjZmZmZmZmJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRleHQtY29sb3IuanMubWFwIiwidmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcblxuLy8gc3JjL2luZGV4LnRzeFxuaW1wb3J0IHsgY3JlYXRlUmVmLCBQdXJlQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgaXNFcXVhbCBmcm9tIFwiQGdpbGJhcmJhcmEvZGVlcC1lcXVhbFwiO1xuaW1wb3J0IG1lbW9pemUgZnJvbSBcIm1lbW9pemUtb25lXCI7XG5cbi8vIHNyYy9jb25zdGFudHMudHNcbnZhciBFUlJPUl9UWVBFID0ge1xuICBBQ0NPVU5UOiBcImFjY291bnRcIixcbiAgQVVUSEVOVElDQVRJT046IFwiYXV0aGVudGljYXRpb25cIixcbiAgSU5JVElBTElaQVRJT046IFwiaW5pdGlhbGl6YXRpb25cIixcbiAgUExBWUJBQ0s6IFwicGxheWJhY2tcIixcbiAgUExBWUVSOiBcInBsYXllclwiXG59O1xudmFyIFNUQVRVUyA9IHtcbiAgRVJST1I6IFwiRVJST1JcIixcbiAgSURMRTogXCJJRExFXCIsXG4gIElOSVRJQUxJWklORzogXCJJTklUSUFMSVpJTkdcIixcbiAgUkVBRFk6IFwiUkVBRFlcIixcbiAgUlVOTklORzogXCJSVU5OSU5HXCIsXG4gIFVOU1VQUE9SVEVEOiBcIlVOU1VQUE9SVEVEXCJcbn07XG52YXIgVFJBTlNQQVJFTlRfQ09MT1IgPSBcInJnYmEoMCwgMCwgMCwgMClcIjtcbnZhciBUWVBFID0ge1xuICBERVZJQ0U6IFwiZGV2aWNlX3VwZGF0ZVwiLFxuICBGQVZPUklURTogXCJmYXZvcml0ZV91cGRhdGVcIixcbiAgUExBWUVSOiBcInBsYXllcl91cGRhdGVcIixcbiAgUFJPR1JFU1M6IFwicHJvZ3Jlc3NfdXBkYXRlXCIsXG4gIFNUQVRVUzogXCJzdGF0dXNfdXBkYXRlXCIsXG4gIFRSQUNLOiBcInRyYWNrX3VwZGF0ZVwiXG59O1xuXG4vLyBzcmMvbW9kdWxlcy9nZXR0ZXJzLnRzXG5mdW5jdGlvbiBnZXRCZ0NvbG9yKGJnQ29sb3IsIGZhbGxiYWNrQ29sb3IpIHtcbiAgaWYgKGZhbGxiYWNrQ29sb3IpIHtcbiAgICByZXR1cm4gYmdDb2xvciA9PT0gVFJBTlNQQVJFTlRfQ09MT1IgPyBmYWxsYmFja0NvbG9yIDogYmdDb2xvcjtcbiAgfVxuICByZXR1cm4gYmdDb2xvciA9PT0gXCJ0cmFuc3BhcmVudFwiID8gVFJBTlNQQVJFTlRfQ09MT1IgOiBiZ0NvbG9yO1xufVxuZnVuY3Rpb24gZ2V0TG9jYWxlKGxvY2FsZSkge1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnREZXZpY2U6IFwiQ3VycmVudCBkZXZpY2VcIixcbiAgICBkZXZpY2VzOiBcIkRldmljZXNcIixcbiAgICBuZXh0OiBcIk5leHRcIixcbiAgICBvdGhlckRldmljZXM6IFwiU2VsZWN0IG90aGVyIGRldmljZVwiLFxuICAgIHBhdXNlOiBcIlBhdXNlXCIsXG4gICAgcGxheTogXCJQbGF5XCIsXG4gICAgcHJldmlvdXM6IFwiUHJldmlvdXNcIixcbiAgICByZW1vdmVUcmFjazogXCJSZW1vdmUgZnJvbSB5b3VyIGZhdm9yaXRlc1wiLFxuICAgIHNhdmVUcmFjazogXCJTYXZlIHRvIHlvdXIgZmF2b3JpdGVzXCIsXG4gICAgdGl0bGU6IFwie25hbWV9IG9uIFNQT1RJRllcIixcbiAgICB2b2x1bWU6IFwiVm9sdW1lXCIsXG4gICAgLi4ubG9jYWxlXG4gIH07XG59XG5mdW5jdGlvbiBnZXRNZXJnZWRTdHlsZXMoc3R5bGVzKSB7XG4gIGNvbnN0IG1lcmdlZFN0eWxlcyA9IHtcbiAgICBhY3RpdmVDb2xvcjogXCIjMWNiOTU0XCIsXG4gICAgYWx0Q29sb3I6IFwiI2NjY1wiLFxuICAgIGJnQ29sb3I6IFwiI2ZmZlwiLFxuICAgIGNvbG9yOiBcIiMzMzNcIixcbiAgICBlcnJvckNvbG9yOiBcIiNmZjAwMjZcIixcbiAgICBoZWlnaHQ6IDgwLFxuICAgIGxvYWRlckNvbG9yOiBcIiNjY2NcIixcbiAgICBsb2FkZXJTaXplOiAzMixcbiAgICBzbGlkZXJDb2xvcjogXCIjNjY2XCIsXG4gICAgc2xpZGVySGFuZGxlQm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgIHNsaWRlckhhbmRsZUNvbG9yOiBcIiMwMDBcIixcbiAgICBzbGlkZXJIZWlnaHQ6IDQsXG4gICAgc2xpZGVyVHJhY2tCb3JkZXJSYWRpdXM6IDQsXG4gICAgc2xpZGVyVHJhY2tDb2xvcjogXCIjY2NjXCIsXG4gICAgdHJhY2tBcnRpc3RDb2xvcjogXCIjNjY2XCIsXG4gICAgdHJhY2tOYW1lQ29sb3I6IFwiIzMzM1wiLFxuICAgIC4uLnN0eWxlc1xuICB9O1xuICBtZXJnZWRTdHlsZXMuYmdDb2xvciA9IGdldEJnQ29sb3IobWVyZ2VkU3R5bGVzLmJnQ29sb3IpO1xuICByZXR1cm4gbWVyZ2VkU3R5bGVzO1xufVxuZnVuY3Rpb24gZ2V0U3BvdGlmeUxpbmsodXJpKSB7XG4gIGNvbnN0IFssIHR5cGUgPSBcIlwiLCBpZCA9IFwiXCJdID0gdXJpLnNwbGl0KFwiOlwiKTtcbiAgcmV0dXJuIGBodHRwczovL29wZW4uc3BvdGlmeS5jb20vJHt0eXBlfS8ke2lkfWA7XG59XG5mdW5jdGlvbiBnZXRTcG90aWZ5TGlua1RpdGxlKG5hbWUsIGxvY2FsZSkge1xuICByZXR1cm4gbG9jYWxlLnJlcGxhY2UoXCJ7bmFtZX1cIiwgbmFtZSk7XG59XG5mdW5jdGlvbiBnZXRTcG90aWZ5VVJJVHlwZSh1cmkpIHtcbiAgY29uc3QgWywgdHlwZSA9IFwiXCJdID0gdXJpLnNwbGl0KFwiOlwiKTtcbiAgcmV0dXJuIHR5cGU7XG59XG5cbi8vIHNyYy9tb2R1bGVzL2hlbHBlcnMudHNcbmZ1bmN0aW9uIGNvbnZlcnRUcmFjayh0cmFjaykge1xuICBjb25zdCB7IGFsYnVtLCBhcnRpc3RzLCBkdXJhdGlvbl9tcywgaWQsIG5hbWUsIHVyaSB9ID0gdHJhY2s7XG4gIHJldHVybiB7XG4gICAgYXJ0aXN0cyxcbiAgICBkdXJhdGlvbk1zOiBkdXJhdGlvbl9tcyxcbiAgICBpZDogaWQgPz8gXCJcIixcbiAgICBpbWFnZTogZ2V0QWxidW1JbWFnZShhbGJ1bSksXG4gICAgbmFtZSxcbiAgICB1cmlcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEFsYnVtSW1hZ2UoYWxidW0pIHtcbiAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heCguLi5hbGJ1bS5pbWFnZXMubWFwKChkKSA9PiBkLndpZHRoIHx8IDApKTtcbiAgcmV0dXJuIGFsYnVtLmltYWdlcy5maW5kKChkKSA9PiBkLndpZHRoID09PSBtYXhXaWR0aCk/LnVybCB8fCBcIlwiO1xufVxuZnVuY3Rpb24gZ2V0UmVwZWF0U3RhdGUobW9kZSkge1xuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gXCJjb250ZXh0XCI7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIFwidHJhY2tcIjtcbiAgICBjYXNlIDA6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm9mZlwiO1xuICB9XG59XG5mdW5jdGlvbiBnZXRVUklzKHVyaXMpIHtcbiAgaWYgKCF1cmlzKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHVyaXMpID8gdXJpcyA6IFt1cmlzXTtcbn1cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5mdW5jdGlvbiBsb2FkU3BvdGlmeVBsYXllcigpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBzY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwb3RpZnktcGxheWVyXCIpO1xuICAgIGlmICghc2NyaXB0VGFnKSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgc2NyaXB0LmlkID0gXCJzcG90aWZ5LXBsYXllclwiO1xuICAgICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgc2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly9zZGsuc2Nkbi5jby9zcG90aWZ5LXBsYXllci5qc1wiO1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gKGVycm9yKSA9PiByZWplY3QobmV3IEVycm9yKGBsb2FkU2NyaXB0OiAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG1pbGxpc2Vjb25kc1RvVGltZShpbnB1dCkge1xuICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcihpbnB1dCAvIDFlMyAlIDYwKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoaW5wdXQgLyAoMWUzICogNjApICUgNjApO1xuICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoaW5wdXQgLyAoMWUzICogNjAgKiA2MCkgJSAyNCk7XG4gIGNvbnN0IHBhcnRzID0gW107XG4gIGlmIChob3VycyA+IDApIHtcbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgYCR7aG91cnN9YC5wYWRTdGFydCgyLCBcIjBcIiksXG4gICAgICBgJHttaW51dGVzfWAucGFkU3RhcnQoMiwgXCIwXCIpLFxuICAgICAgYCR7c2Vjb25kc31gLnBhZFN0YXJ0KDIsIFwiMFwiKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMucHVzaChgJHttaW51dGVzfWAsIGAke3NlY29uZHN9YC5wYWRTdGFydCgyLCBcIjBcIikpO1xuICB9XG4gIHJldHVybiBwYXJ0cy5qb2luKFwiOlwiKTtcbn1cbmZ1bmN0aW9uIHBhcnNlVm9sdW1lKHZhbHVlKSB7XG4gIGlmICghaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKHZhbHVlID4gMSkge1xuICAgIHJldHVybiB2YWx1ZSAvIDEwMDtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiByb3VuZChudW1iZXIsIGRpZ2l0cyA9IDIpIHtcbiAgY29uc3QgZmFjdG9yID0gMTAgKiogZGlnaXRzO1xuICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIgKiBmYWN0b3IpIC8gZmFjdG9yO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVVUkkoaW5wdXQpIHtcbiAgY29uc3QgdmFsaWRUeXBlcyA9IFtcImFsYnVtXCIsIFwiYXJ0aXN0XCIsIFwicGxheWxpc3RcIiwgXCJzaG93XCIsIFwidHJhY2tcIl07XG4gIGlmIChpbnB1dCAmJiBpbnB1dC5pbmRleE9mKFwiOlwiKSA+IC0xKSB7XG4gICAgY29uc3QgW2tleSwgdHlwZSwgaWRdID0gaW5wdXQuc3BsaXQoXCI6XCIpO1xuICAgIGlmIChrZXkgPT09IFwic3BvdGlmeVwiICYmIHZhbGlkVHlwZXMuaW5kZXhPZih0eXBlKSA+PSAwICYmIGlkLmxlbmd0aCA9PT0gMjIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHNyYy9tb2R1bGVzL3Nwb3RpZnkudHNcbnZhciBzcG90aWZ5X2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KHNwb3RpZnlfZXhwb3J0cywge1xuICBjaGVja1RyYWNrc1N0YXR1czogKCkgPT4gY2hlY2tUcmFja3NTdGF0dXMsXG4gIGdldERldmljZXM6ICgpID0+IGdldERldmljZXMsXG4gIGdldFBsYXliYWNrU3RhdGU6ICgpID0+IGdldFBsYXliYWNrU3RhdGUsXG4gIGdldFF1ZXVlOiAoKSA9PiBnZXRRdWV1ZSxcbiAgbmV4dDogKCkgPT4gbmV4dCxcbiAgcGF1c2U6ICgpID0+IHBhdXNlLFxuICBwbGF5OiAoKSA9PiBwbGF5LFxuICBwcmV2aW91czogKCkgPT4gcHJldmlvdXMsXG4gIHJlbW92ZVRyYWNrczogKCkgPT4gcmVtb3ZlVHJhY2tzLFxuICByZXBlYXQ6ICgpID0+IHJlcGVhdCxcbiAgc2F2ZVRyYWNrczogKCkgPT4gc2F2ZVRyYWNrcyxcbiAgc2VlazogKCkgPT4gc2VlayxcbiAgc2V0RGV2aWNlOiAoKSA9PiBzZXREZXZpY2UsXG4gIHNldFZvbHVtZTogKCkgPT4gc2V0Vm9sdW1lLFxuICBzaHVmZmxlOiAoKSA9PiBzaHVmZmxlXG59KTtcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrVHJhY2tzU3RhdHVzKHRva2VuLCB0cmFja3MpIHtcbiAgY29uc3QgaWRzID0gQXJyYXkuaXNBcnJheSh0cmFja3MpID8gdHJhY2tzIDogW3RyYWNrc107XG4gIHJldHVybiBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvdHJhY2tzL2NvbnRhaW5zP2lkcz0ke2lkc31gLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIkdFVFwiXG4gIH0pLnRoZW4oKGQpID0+IGQuanNvbigpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldERldmljZXModG9rZW4pIHtcbiAgcmV0dXJuIGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS9wbGF5ZXIvZGV2aWNlc2AsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiR0VUXCJcbiAgfSkudGhlbigoZCkgPT4gZC5qc29uKCkpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0UGxheWJhY2tTdGF0ZSh0b2tlbikge1xuICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllcmAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiR0VUXCJcbiAgfSkudGhlbigoZCkgPT4ge1xuICAgIGlmIChkLnN0YXR1cyA9PT0gMjA0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGQuanNvbigpO1xuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFF1ZXVlKHRva2VuKSB7XG4gIHJldHVybiBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3F1ZXVlYCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJHRVRcIlxuICB9KS50aGVuKChkKSA9PiBkLmpzb24oKSk7XG59XG5hc3luYyBmdW5jdGlvbiBuZXh0KHRva2VuLCBkZXZpY2VJZCkge1xuICBsZXQgcXVlcnkgPSBcIlwiO1xuICBpZiAoZGV2aWNlSWQpIHtcbiAgICBxdWVyeSArPSBgP2RldmljZV9pZD0ke2RldmljZUlkfWA7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9uZXh0JHtxdWVyeX1gLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHBhdXNlKHRva2VuLCBkZXZpY2VJZCkge1xuICBsZXQgcXVlcnkgPSBcIlwiO1xuICBpZiAoZGV2aWNlSWQpIHtcbiAgICBxdWVyeSArPSBgP2RldmljZV9pZD0ke2RldmljZUlkfWA7XG4gIH1cbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3BsYXllci9wYXVzZSR7cXVlcnl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQVVRcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHBsYXkodG9rZW4sIHsgY29udGV4dF91cmksIGRldmljZUlkLCBvZmZzZXQgPSAwLCB1cmlzIH0pIHtcbiAgbGV0IGJvZHk7XG4gIGlmIChjb250ZXh0X3VyaSkge1xuICAgIGNvbnN0IGlzQXJ0aXN0ID0gY29udGV4dF91cmkuaW5kZXhPZihcImFydGlzdFwiKSA+PSAwO1xuICAgIGxldCBwb3NpdGlvbjtcbiAgICBpZiAoIWlzQXJ0aXN0KSB7XG4gICAgICBwb3NpdGlvbiA9IHsgcG9zaXRpb246IG9mZnNldCB9O1xuICAgIH1cbiAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBjb250ZXh0X3VyaSwgb2Zmc2V0OiBwb3NpdGlvbiB9KTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHVyaXMpICYmIHVyaXMubGVuZ3RoKSB7XG4gICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgdXJpcywgb2Zmc2V0OiB7IHBvc2l0aW9uOiBvZmZzZXQgfSB9KTtcbiAgfVxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3BsYXk/ZGV2aWNlX2lkPSR7ZGV2aWNlSWR9YCwge1xuICAgIGJvZHksXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBVVFwiXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gcHJldmlvdXModG9rZW4sIGRldmljZUlkKSB7XG4gIGxldCBxdWVyeSA9IFwiXCI7XG4gIGlmIChkZXZpY2VJZCkge1xuICAgIHF1ZXJ5ICs9IGA/ZGV2aWNlX2lkPSR7ZGV2aWNlSWR9YDtcbiAgfVxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3ByZXZpb3VzJHtxdWVyeX1gLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRyYWNrcyh0b2tlbiwgdHJhY2tzKSB7XG4gIGNvbnN0IGlkcyA9IEFycmF5LmlzQXJyYXkodHJhY2tzKSA/IHRyYWNrcyA6IFt0cmFja3NdO1xuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvdHJhY2tzYCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGlkcyksXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVwZWF0KHRva2VuLCBzdGF0ZSwgZGV2aWNlSWQpIHtcbiAgbGV0IHF1ZXJ5ID0gYD9zdGF0ZT0ke3N0YXRlfWA7XG4gIGlmIChkZXZpY2VJZCkge1xuICAgIHF1ZXJ5ICs9IGAmZGV2aWNlX2lkPSR7ZGV2aWNlSWR9YDtcbiAgfVxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3JlcGVhdCR7cXVlcnl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQVVRcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNhdmVUcmFja3ModG9rZW4sIHRyYWNrcykge1xuICBjb25zdCBpZHMgPSBBcnJheS5pc0FycmF5KHRyYWNrcykgPyB0cmFja3MgOiBbdHJhY2tzXTtcbiAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL21lL3RyYWNrc2AsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGlkcyB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBzZWVrKHRva2VuLCBwb3NpdGlvbiwgZGV2aWNlSWQpIHtcbiAgbGV0IHF1ZXJ5ID0gYD9wb3NpdGlvbl9tcz0ke3Bvc2l0aW9ufWA7XG4gIGlmIChkZXZpY2VJZCkge1xuICAgIHF1ZXJ5ICs9IGAmZGV2aWNlX2lkPSR7ZGV2aWNlSWR9YDtcbiAgfVxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3NlZWske3F1ZXJ5fWAsIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUFVUXCJcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBzZXREZXZpY2UodG9rZW4sIGRldmljZUlkLCBzaG91bGRQbGF5KSB7XG4gIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS9wbGF5ZXJgLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBkZXZpY2VfaWRzOiBbZGV2aWNlSWRdLCBwbGF5OiBzaG91bGRQbGF5IH0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQVVRcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldFZvbHVtZSh0b2tlbiwgdm9sdW1lLCBkZXZpY2VJZCkge1xuICBsZXQgcXVlcnkgPSBgP3ZvbHVtZV9wZXJjZW50PSR7dm9sdW1lfWA7XG4gIGlmIChkZXZpY2VJZCkge1xuICAgIHF1ZXJ5ICs9IGAmZGV2aWNlX2lkPSR7ZGV2aWNlSWR9YDtcbiAgfVxuICBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvbWUvcGxheWVyL3ZvbHVtZSR7cXVlcnl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQVVRcIlxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNodWZmbGUodG9rZW4sIHN0YXRlLCBkZXZpY2VJZCkge1xuICBsZXQgcXVlcnkgPSBgP3N0YXRlPSR7c3RhdGV9YDtcbiAgaWYgKGRldmljZUlkKSB7XG4gICAgcXVlcnkgKz0gYCZkZXZpY2VfaWQ9JHtkZXZpY2VJZH1gO1xuICB9XG4gIGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9tZS9wbGF5ZXIvc2h1ZmZsZSR7cXVlcnl9YCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQVVRcIlxuICB9KTtcbn1cblxuLy8gc3JjL21vZHVsZXMvc3R5bGVkLnRzeFxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSBcIm5hbm8tY3NzXCI7XG5pbXBvcnQgeyBhZGRvbiBhcyBhZGRvbkpTWCB9IGZyb20gXCJuYW5vLWNzcy9hZGRvbi9qc3guanNcIjtcbmltcG9ydCB7IGFkZG9uIGFzIGFkZG9uS2V5ZnJhbWVzIH0gZnJvbSBcIm5hbm8tY3NzL2FkZG9uL2tleWZyYW1lcy5qc1wiO1xuaW1wb3J0IHsgYWRkb24gYXMgYWRkb25OZXN0aW5nIH0gZnJvbSBcIm5hbm8tY3NzL2FkZG9uL25lc3RpbmcuanNcIjtcbmltcG9ydCB7IGFkZG9uIGFzIGFkZG9uUnVsZSB9IGZyb20gXCJuYW5vLWNzcy9hZGRvbi9ydWxlLmpzXCI7XG5pbXBvcnQgeyBhZGRvbiBhcyBhZGRvblN0eWxlIH0gZnJvbSBcIm5hbm8tY3NzL2FkZG9uL3N0eWxlLmpzXCI7XG5pbXBvcnQgeyBhZGRvbiBhcyBhZGRvblN0eWxlZCB9IGZyb20gXCJuYW5vLWNzcy9hZGRvbi9zdHlsZWQuanNcIjtcbnZhciBuYW5vID0gY3JlYXRlKHsgaDogY3JlYXRlRWxlbWVudCB9KTtcbmFkZG9uUnVsZShuYW5vKTtcbmFkZG9uS2V5ZnJhbWVzKG5hbm8pO1xuYWRkb25KU1gobmFubyk7XG5hZGRvblN0eWxlKG5hbm8pO1xuYWRkb25TdHlsZWQobmFubyk7XG5hZGRvbk5lc3RpbmcobmFubyk7XG52YXIgeyBrZXlmcmFtZXMsIHB1dCwgc3R5bGVkIH0gPSBuYW5vO1xudmFyIHB4ID0gKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgPyBgJHt2YWx1ZX1weGAgOiB2YWx1ZTtcblxuLy8gc3JjL2NvbXBvbmVudHMvQWN0aW9ucy50c3hcbmltcG9ydCB7IG1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFdyYXBwZXIgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcImZsZXgtZW5kXCIsXG4gICAgXCJwb2ludGVyLWV2ZW50c1wiOiBcIm5vbmVcIlxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgbGV0IHN0eWxlcyA9IHtcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICByaWdodDogMCxcbiAgICAgIHdpZHRoOiBcImF1dG9cIlxuICAgIH07XG4gICAgaWYgKHN0eWxlLmxheW91dCA9PT0gXCJyZXNwb25zaXZlXCIpIHtcbiAgICAgIHN0eWxlcyA9IHtcbiAgICAgICAgXCJAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpXCI6IHN0eWxlcyxcbiAgICAgICAgXCJAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpXCI6IHtcbiAgICAgICAgICBoZWlnaHQ6IHB4KHN0eWxlLmgpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IHB4KDMyKSxcbiAgICAgIC4uLnN0eWxlc1xuICAgIH07XG4gIH0sXG4gIFwiQWN0aW9uc1JTV1BcIlxuKTtcbmZ1bmN0aW9uIEFjdGlvbnMocHJvcHMpIHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgbGF5b3V0LCBzdHlsZXMgfSA9IHByb3BzO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChXcmFwcGVyLCB7IFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIkFjdGlvbnNcIiwgc3R5bGU6IHsgaDogc3R5bGVzLmhlaWdodCwgbGF5b3V0IH0sIGNoaWxkcmVuIH0pO1xufVxudmFyIEFjdGlvbnNfZGVmYXVsdCA9IG1lbW8oQWN0aW9ucyk7XG5cbi8vIHNyYy9jb21wb25lbnRzL0NvbnRyb2xzLnRzeFxuaW1wb3J0IHsgbWVtbyBhcyBtZW1vMyB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9OZXh0LnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDIgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIE5leHQocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gyKFwic3ZnXCIsIHsgaGVpZ2h0OiBcIjFlbVwiLCBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsIHdpZHRoOiBcIjFlbVwiLCAuLi5wcm9wcywgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gyKFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTUzLjQ4NiAwYTMuMiAzLjIgMCAwIDAtMy4yIDMuMnYyMy41NDNMNC44LjQ4OUEzLjIgMy4yIDAgMCAwIDAgMy4yNTVWNjAuNzRhMy4yIDMuMiAwIDAgMCA0LjggMi43NzRsNDUuNDg2LTI2LjI2MlY2MC44YTMuMiAzLjIgMCAwIDAgMy4yIDMuMkg2MC44YTMuMiAzLjIgMCAwIDAgMy4yLTMuMlYzLjJBMy4yIDMuMiAwIDAgMCA2MC44IDBoLTcuMzE0WlwiLFxuICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvUGF1c2UudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gUGF1c2UocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gzKFwic3ZnXCIsIHsgaGVpZ2h0OiBcIjFlbVwiLCBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsIHdpZHRoOiBcIjFlbVwiLCAuLi5wcm9wcywgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gzKFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTMyIDBjMTcuNjczIDAgMzIgMTQuMzI3IDMyIDMyIDAgMTcuNjczLTE0LjMyNyAzMi0zMiAzMkMxNC4zMjcgNjQgMCA0OS42NzMgMCAzMiAwIDE0LjMyNyAxNC4zMjcgMCAzMiAwWm0tNS40IDE4aC01LjJhMS40IDEuNCAwIDAgMC0xLjQgMS40djI1LjJhMS40IDEuNCAwIDAgMCAxLjQgMS40aDUuMmExLjQgMS40IDAgMCAwIDEuNC0xLjRWMTkuNGExLjQgMS40IDAgMCAwLTEuNC0xLjRabTE2IDBoLTUuMmExLjQgMS40IDAgMCAwLTEuNCAxLjR2MjUuMmExLjQgMS40IDAgMCAwIDEuNCAxLjRoNS4yYTEuNCAxLjQgMCAwIDAgMS40LTEuNFYxOS40YTEuNCAxLjQgMCAwIDAtMS40LTEuNFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL1BsYXkudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4NCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gUGxheShwcm9wcykge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDQoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDQoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMzIgMGMxNy42NzMgMCAzMiAxNC4zMjcgMzIgMzIgMCAxNy42NzMtMTQuMzI3IDMyLTMyIDMyQzE0LjMyNyA2NCAwIDQ5LjY3MyAwIDMyIDAgMTQuMzI3IDE0LjMyNyAwIDMyIDBabS03LjYxIDE4LjE4OGMtLjQzNS4yNTEtLjcwMi43MTUtLjcwMSAxLjIxNnYyNS4xOTRhMS40MDIgMS40MDIgMCAwIDAgMi4xMDQgMS4yMTRMNDcuNjEgMzMuMjE0YTEuNDAyIDEuNDAyIDAgMCAwIDAtMi40MjhMMjUuNzkzIDE4LjE4OGMtLjQzNS0uMjUtLjk3LS4yNS0xLjQwNCAwWlwiLFxuICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvUHJldmlvdXMudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4NSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gUHJldmlvdXMocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3g1KFwic3ZnXCIsIHsgaGVpZ2h0OiBcIjFlbVwiLCBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsIHdpZHRoOiBcIjFlbVwiLCAuLi5wcm9wcywgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3g1KFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTEwLjUxNCAwYTMuMiAzLjIgMCAwIDEgMy4yIDMuMnYyMy41NDNMNTkuMi40ODlBMy4yIDMuMiAwIDAgMSA2NCAzLjI1NVY2MC43NGEzLjIgMy4yIDAgMCAxLTQuOCAyLjc3NEwxMy43MTQgMzcuMjUzVjYwLjhhMy4yIDMuMiAwIDAgMS0zLjIgMy4ySDMuMkEzLjIgMy4yIDAgMCAxIDAgNjAuOFYzLjJBMy4yIDMuMiAwIDAgMSAzLjIgMGg3LjMxNFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL1NsaWRlci50c3hcbmltcG9ydCB7IG1lbW8gYXMgbWVtbzIgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tIFwiQGdpbGJhcmJhcmEvcmVhY3QtcmFuZ2Utc2xpZGVyXCI7XG5pbXBvcnQgeyBqc3ggYXMganN4NiwganN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFdyYXBwZXIyID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBmb250U2l6ZTogcHgoMTIpLFxuICAgIHRyYW5zaXRpb246IFwiaGVpZ2h0IDAuM3NcIixcbiAgICB6SW5kZXg6IDEwXG4gIH0sXG4gICh7IHN0eWxlIH0pID0+ICh7XG4gICAgJ1tjbGFzc149XCJyc3dwX1wiXSc6IHtcbiAgICAgIGNvbG9yOiBzdHlsZS5jLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIG1pbldpZHRoOiBweCgzMilcbiAgICB9LFxuICAgIFwiLnJzd3BfcHJvZ3Jlc3NcIjoge1xuICAgICAgbWFyZ2luUmlnaHQ6IHB4KHN0eWxlLnNsaWRlckhlaWdodCArIDYpLFxuICAgICAgdGV4dEFsaWduOiBcInJpZ2h0XCJcbiAgICB9LFxuICAgIFwiLnJzd3BfZHVyYXRpb25cIjoge1xuICAgICAgbWFyZ2luTGVmdDogcHgoc3R5bGUuc2xpZGVySGVpZ2h0ICsgNiksXG4gICAgICB0ZXh0QWxpZ246IFwibGVmdFwiXG4gICAgfVxuICB9KSxcbiAgXCJTbGlkZXJSU1dQXCJcbik7XG5mdW5jdGlvbiBTbGlkZXIocHJvcHMpIHtcbiAgY29uc3QgeyBkdXJhdGlvbk1zLCBpc01hZ25pZmllZCwgb25DaGFuZ2VSYW5nZSwgb25Ub2dnbGVNYWduaWZ5LCBwb3NpdGlvbiwgcHJvZ3Jlc3NNcywgc3R5bGVzIH0gPSBwcm9wcztcbiAgY29uc3QgaGFuZGxlQ2hhbmdlUmFuZ2UgPSBhc3luYyAoeyB4IH0pID0+IHtcbiAgICBvbkNoYW5nZVJhbmdlKHgpO1xuICB9O1xuICBjb25zdCBoYW5kbGVTaXplID0gc3R5bGVzLnNsaWRlckhlaWdodCArIDY7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4cyhcbiAgICBXcmFwcGVyMixcbiAgICB7XG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJTbGlkZXJcIixcbiAgICAgIFwiZGF0YS1wb3NpdGlvblwiOiBwb3NpdGlvbixcbiAgICAgIG9uTW91c2VFbnRlcjogb25Ub2dnbGVNYWduaWZ5LFxuICAgICAgb25Nb3VzZUxlYXZlOiBvblRvZ2dsZU1hZ25pZnksXG4gICAgICBzdHlsZToge1xuICAgICAgICBjOiBzdHlsZXMuY29sb3IsXG4gICAgICAgIHNsaWRlckhlaWdodDogc3R5bGVzLnNsaWRlckhlaWdodFxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3g2KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJzd3BfcHJvZ3Jlc3NcIiwgY2hpbGRyZW46IG1pbGxpc2Vjb25kc1RvVGltZShwcm9ncmVzc01zKSB9KSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDYoXG4gICAgICAgICAgUmFuZ2VTbGlkZXIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXhpczogXCJ4XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2xpZGVyXCIsXG4gICAgICAgICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJwcm9ncmVzcy1iYXJcIixcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2VSYW5nZSxcbiAgICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgdGh1bWJCb3JkZXI6IDAsXG4gICAgICAgICAgICAgICAgdGh1bWJCb3JkZXJSYWRpdXM6IHN0eWxlcy5zbGlkZXJIYW5kbGVCb3JkZXJSYWRpdXMsXG4gICAgICAgICAgICAgICAgdGh1bWJDb2xvcjogc3R5bGVzLnNsaWRlckhhbmRsZUNvbG9yLFxuICAgICAgICAgICAgICAgIHRodW1iU2l6ZTogaXNNYWduaWZpZWQgPyBoYW5kbGVTaXplICsgNCA6IGhhbmRsZVNpemUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBpc01hZ25pZmllZCA/IHN0eWxlcy5zbGlkZXJIZWlnaHQgKyA0IDogc3R5bGVzLnNsaWRlckhlaWdodCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIHJhbmdlQ29sb3I6IHN0eWxlcy5zbGlkZXJDb2xvcixcbiAgICAgICAgICAgICAgICB0cmFja0JvcmRlclJhZGl1czogc3R5bGVzLnNsaWRlclRyYWNrQm9yZGVyUmFkaXVzLFxuICAgICAgICAgICAgICAgIHRyYWNrQ29sb3I6IHN0eWxlcy5zbGlkZXJUcmFja0NvbG9yXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4OiBwb3NpdGlvbixcbiAgICAgICAgICAgIHhNYXg6IDEwMCxcbiAgICAgICAgICAgIHhNaW46IDAsXG4gICAgICAgICAgICB4U3RlcDogMC4xXG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4NihcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyc3dwX2R1cmF0aW9uXCIsIGNoaWxkcmVuOiBtaWxsaXNlY29uZHNUb1RpbWUoZHVyYXRpb25NcykgfSlcbiAgICAgIF1cbiAgICB9XG4gICk7XG59XG52YXIgU2xpZGVyX2RlZmF1bHQgPSBtZW1vMihTbGlkZXIpO1xuXG4vLyBzcmMvY29tcG9uZW50cy9Db250cm9scy50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3g3LCBqc3hzIGFzIGpzeHMyIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgV3JhcHBlcjMgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBcIi5yc3dwX192b2x1bWVcIjoge1xuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHJpZ2h0OiAwLFxuICAgICAgdG9wOiAwXG4gICAgfSxcbiAgICBcIi5yc3dwX19kZXZpY2VzXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgaXNDb21wYWN0TGF5b3V0ID0gc3R5bGUubGF5b3V0ID09PSBcImNvbXBhY3RcIjtcbiAgICBjb25zdCBzdHlsZXMgPSB7fTtcbiAgICBpZiAoaXNDb21wYWN0TGF5b3V0KSB7XG4gICAgICBzdHlsZXMucGFkZGluZyA9IHB4KDgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMucGFkZGluZyA9IGAke3B4KDQpfSAwYDtcbiAgICAgIHN0eWxlc1tcIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweClcIl0gPSB7XG4gICAgICAgIHBhZGRpbmc6IHB4KDgpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9LFxuICBcIkNvbnRyb2xzUlNXUFwiXG4pO1xudmFyIEJ1dHRvbnMgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgIG1hcmdpbkJvdHRvbTogcHgoOCksXG4gICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICBcIj4gZGl2XCI6IHtcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgIG1pbldpZHRoOiBweCgzMiksXG4gICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCJcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+ICh7XG4gICAgY29sb3I6IHN0eWxlLmNcbiAgfSksXG4gIFwiQ29udHJvbHNCdXR0b25zUlNXUFwiXG4pO1xudmFyIEJ1dHRvbiA9IHN0eWxlZChcImJ1dHRvblwiKShcbiAge1xuICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgZGlzcGxheTogXCJpbmxpbmUtZmxleFwiLFxuICAgIGZvbnRTaXplOiBweCgxNiksXG4gICAgaGVpZ2h0OiBweCgzMiksXG4gICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgd2lkdGg6IHB4KDMyKSxcbiAgICBcIiY6ZGlzYWJsZWRcIjoge1xuICAgICAgY3Vyc29yOiBcImRlZmF1bHRcIixcbiAgICAgIG9wYWNpdHk6IDAuNlxuICAgIH0sXG4gICAgXCImLnJzd3BfX3RvZ2dsZVwiOiB7XG4gICAgICBmb250U2l6ZTogcHgoMzIpLFxuICAgICAgd2lkdGg6IHB4KDQ4KVxuICAgIH1cbiAgfSxcbiAgKCkgPT4gKHt9KSxcbiAgXCJDb250cm9sc0J1dHRvblJTV1BcIlxuKTtcbmZ1bmN0aW9uIENvbnRyb2xzKHByb3BzKSB7XG4gIGNvbnN0IHtcbiAgICBjb21wb25lbnRzOiB7IGxlZnRCdXR0b24sIHJpZ2h0QnV0dG9uIH0gPSB7fSxcbiAgICBkZXZpY2VzLFxuICAgIGR1cmF0aW9uTXMsXG4gICAgaXNBY3RpdmUsXG4gICAgaXNFeHRlcm5hbERldmljZSxcbiAgICBpc01hZ25pZmllZCxcbiAgICBpc1BsYXlpbmcsXG4gICAgbGF5b3V0LFxuICAgIGxvY2FsZSxcbiAgICBuZXh0VHJhY2tzLFxuICAgIG9uQ2hhbmdlUmFuZ2UsXG4gICAgb25DbGlja05leHQsXG4gICAgb25DbGlja1ByZXZpb3VzLFxuICAgIG9uQ2xpY2tUb2dnbGVQbGF5LFxuICAgIG9uVG9nZ2xlTWFnbmlmeSxcbiAgICBwb3NpdGlvbixcbiAgICBwcm9ncmVzc01zLFxuICAgIHN0eWxlcyxcbiAgICB2b2x1bWVcbiAgfSA9IHByb3BzO1xuICBjb25zdCB7IGNvbG9yIH0gPSBzdHlsZXM7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4czIoV3JhcHBlcjMsIHsgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiQ29udHJvbHNcIiwgXCJkYXRhLXBsYXlpbmdcIjogaXNQbGF5aW5nLCBzdHlsZTogeyBsYXlvdXQgfSwgY2hpbGRyZW46IFtcbiAgICAvKiBAX19QVVJFX18gKi8ganN4czIoQnV0dG9ucywgeyBzdHlsZTogeyBjOiBjb2xvciB9LCBjaGlsZHJlbjogW1xuICAgICAgZGV2aWNlcyAmJiAvKiBAX19QVVJFX18gKi8ganN4NyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyc3dwX19kZXZpY2VzXCIsIGNoaWxkcmVuOiBkZXZpY2VzIH0pLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeDcoXCJkaXZcIiwgeyBjaGlsZHJlbjogbGVmdEJ1dHRvbiB9KSxcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3g3KFwiZGl2XCIsIHsgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3g3KFxuICAgICAgICBCdXR0b24sXG4gICAgICAgIHtcbiAgICAgICAgICBcImFyaWEtbGFiZWxcIjogbG9jYWxlLnByZXZpb3VzLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJCdXR0b25SU1dQXCIsXG4gICAgICAgICAgZGlzYWJsZWQ6ICFpc0FjdGl2ZSAmJiAhaXNFeHRlcm5hbERldmljZSxcbiAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrUHJldmlvdXMsXG4gICAgICAgICAgdGl0bGU6IGxvY2FsZS5wcmV2aW91cyxcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4NyhQcmV2aW91cywge30pXG4gICAgICAgIH1cbiAgICAgICkgfSksXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4NyhcImRpdlwiLCB7IGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4NyhcbiAgICAgICAgQnV0dG9uLFxuICAgICAgICB7XG4gICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGlzUGxheWluZyA/IGxvY2FsZS5wYXVzZSA6IGxvY2FsZS5wbGF5LFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJCdXR0b25SU1dQIHJzd3BfX3RvZ2dsZVwiLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uQ2xpY2tUb2dnbGVQbGF5LFxuICAgICAgICAgIHRpdGxlOiBpc1BsYXlpbmcgPyBsb2NhbGUucGF1c2UgOiBsb2NhbGUucGxheSxcbiAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBpc1BsYXlpbmcgPyAvKiBAX19QVVJFX18gKi8ganN4NyhQYXVzZSwge30pIDogLyogQF9fUFVSRV9fICovIGpzeDcoUGxheSwge30pXG4gICAgICAgIH1cbiAgICAgICkgfSksXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4NyhcImRpdlwiLCB7IGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4NyhcbiAgICAgICAgQnV0dG9uLFxuICAgICAgICB7XG4gICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGxvY2FsZS5uZXh0LFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJCdXR0b25SU1dQXCIsXG4gICAgICAgICAgZGlzYWJsZWQ6ICFuZXh0VHJhY2tzLmxlbmd0aCAmJiAhaXNBY3RpdmUgJiYgIWlzRXh0ZXJuYWxEZXZpY2UsXG4gICAgICAgICAgb25DbGljazogb25DbGlja05leHQsXG4gICAgICAgICAgdGl0bGU6IGxvY2FsZS5uZXh0LFxuICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3g3KE5leHQsIHt9KVxuICAgICAgICB9XG4gICAgICApIH0pLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeDcoXCJkaXZcIiwgeyBjaGlsZHJlbjogcmlnaHRCdXR0b24gfSksXG4gICAgICB2b2x1bWUgJiYgLyogQF9fUFVSRV9fICovIGpzeDcoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicnN3cF9fdm9sdW1lXCIsIGNoaWxkcmVuOiB2b2x1bWUgfSlcbiAgICBdIH0pLFxuICAgIC8qIEBfX1BVUkVfXyAqLyBqc3g3KFxuICAgICAgU2xpZGVyX2RlZmF1bHQsXG4gICAgICB7XG4gICAgICAgIGR1cmF0aW9uTXMsXG4gICAgICAgIGlzTWFnbmlmaWVkLFxuICAgICAgICBvbkNoYW5nZVJhbmdlLFxuICAgICAgICBvblRvZ2dsZU1hZ25pZnksXG4gICAgICAgIHBvc2l0aW9uLFxuICAgICAgICBwcm9ncmVzc01zLFxuICAgICAgICBzdHlsZXNcbiAgICAgIH1cbiAgICApXG4gIF0gfSk7XG59XG52YXIgQ29udHJvbHNfZGVmYXVsdCA9IG1lbW8zKENvbnRyb2xzKTtcblxuLy8gc3JjL2NvbXBvbmVudHMvRGV2aWNlcy50c3hcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9DbGlja091dHNpZGUudHN4XG5pbXBvcnQgeyBtZW1vIGFzIG1lbW80LCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsganN4IGFzIGpzeDggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIENsaWNrT3V0c2lkZShwcm9wcykge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpc0FjdGl2ZSwgb25DbGljaywgLi4ucmVzdCB9ID0gcHJvcHM7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgaXNUb3VjaCA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gdXNlUmVmKChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoZW5kXCIpIHtcbiAgICAgIGlzVG91Y2guY3VycmVudCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgaXNUb3VjaC5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250YWluZXIgJiYgIWNvbnRhaW5lci5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgfVxuICB9KTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB7IGN1cnJlbnQgfSA9IGhhbmRsZUNsaWNrO1xuICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGN1cnJlbnQsIHRydWUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGN1cnJlbnQsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGN1cnJlbnQsIHRydWUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGN1cnJlbnQsIHRydWUpO1xuICAgIH07XG4gIH0sIFtpc0FjdGl2ZV0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDgoXCJkaXZcIiwgeyByZWY6IGNvbnRhaW5lclJlZiwgLi4ucmVzdCwgY2hpbGRyZW4gfSk7XG59XG52YXIgQ2xpY2tPdXRzaWRlX2RlZmF1bHQgPSBtZW1vNChDbGlja091dHNpZGUpO1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9EZXZpY2VzLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDkgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIERldmljZXNJY29uKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4OShcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4OShcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk01NyA0YzMuODY0IDAgNyAzLjEzNiA3IDd2NDJhNyA3IDAgMCAxLTcgN0gzMWE3IDcgMCAwIDEtNy03VjExYzAtMy44NjQgMy4xMzYtNyA3LTdoMjZaTTE2IDU0djZIOHYtNmg4Wm00MS00NEgzMWExIDEgMCAwIDAtMSAxdjQyYTEgMSAwIDAgMCAxIDFoMjZhMSAxIDAgMCAwIDEtMVYxMWExIDEgMCAwIDAtMS0xWk00NCAzMmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNlpNMTYgNHY2SDdhMSAxIDAgMCAwLTEgMXYyNmExIDEgMCAwIDAgMSAxaDl2Nkg3YTcgNyAwIDAgMS03LTdWMTFjMC0zLjg2NCAzLjEzNi03IDctN2g5Wm0yOCAxMmE0IDQgMCAxIDEgMCA4IDQgNCAwIDAgMSAwLThaXCIsXG4gICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgfVxuICApIH0pO1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9EZXZpY2VzQ29tcHV0ZXIudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MTAgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIERldmljZXNDb21wdXRlckljb24ocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxMChcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTAoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNy4yMjYgMTAuMzIzYTcuMjI4IDcuMjI4IDAgMCAxIDcuMjI2LTcuMjI2aDM1LjA5NmE3LjIyOCA3LjIyOCAwIDAgMSA3LjIyNiA3LjIyNlYzNy4xNmE3LjIyNiA3LjIyNiAwIDAgMS03LjIyNiA3LjIyNkgxNC40NTJhNy4yMjYgNy4yMjYgMCAwIDEtNy4yMjYtNy4yMjZWMTAuMzIzWm03LjIyNi0xLjAzM2MtLjU3IDAtMS4wMzMuNDYyLTEuMDMzIDEuMDMzVjM3LjE2YzAgLjU3LjQ2MyAxLjAzMyAxLjAzMyAxLjAzM2gzNS4wOTZjLjU3IDAgMS4wMzMtLjQ2MyAxLjAzMy0xLjAzM1YxMC4zMjNjMC0uNTctLjQ2My0xLjAzMy0xLjAzMy0xLjAzM0gxNC40NTJaTTAgNTcuODA2YTMuMDk3IDMuMDk3IDAgMCAxIDMuMDk3LTMuMDk2aDU3LjgwNmEzLjA5NyAzLjA5NyAwIDAgMSAwIDYuMTkzSDMuMDk3QTMuMDk3IDMuMDk3IDAgMCAxIDAgNTcuODA2WlwiLFxuICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvRGV2aWNlc01vYmlsZS50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxMSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gRGV2aWNlc01vYmlsZUljb24ocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxMShcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTEoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNDQuOCAwYTkuNiA5LjYgMCAwIDEgOS42IDkuNnY0NC44YTkuNiA5LjYgMCAwIDEtOS42IDkuNkgxOS4yYTkuNiA5LjYgMCAwIDEtOS42LTkuNlY5LjZBOS42IDkuNiAwIDAgMSAxOS4yIDBoMjUuNlptMCA2LjRIMTkuMkEzLjIgMy4yIDAgMCAwIDE2IDkuNnY0NC44YTMuMiAzLjIgMCAwIDAgMy4yIDMuMmgyNS42YTMuMiAzLjIgMCAwIDAgMy4yLTMuMlY5LjZhMy4yIDMuMiAwIDAgMC0zLjItMy4yWk0zMiA0My4yYTQgNCAwIDEgMSAwIDggNCA0IDAgMCAxIDAtOFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL0RldmljZXNTcGVha2VyLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDEyIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBEZXZpY2VzU3BlYWtlckljb24ocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxMihcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTIoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNDUgNGMzLjg2NCAwIDcgMy4xMzYgNyA3djQyYTcgNyAwIDAgMS03IDdIMTlhNyA3IDAgMCAxLTctN1YxMWMwLTMuODY0IDMuMTM2LTcgNy03aDI2Wm0wIDZIMTlhMSAxIDAgMCAwLTEgMXY0MmExIDEgMCAwIDAgMSAxaDI2YTEgMSAwIDAgMCAxLTFWMTFhMSAxIDAgMCAwLTEtMVpNMzIgMzJhOCA4IDAgMSAxIDAgMTYgOCA4IDAgMCAxIDAtMTZabTAtMTZhNCA0IDAgMSAxIDAgOCA0IDQgMCAwIDEgMC04WlwiLFxuICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvRGV2aWNlcy50c3hcbmltcG9ydCB7IEZyYWdtZW50LCBqc3ggYXMganN4MTMsIGpzeHMgYXMganN4czMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBXcmFwcGVyNCA9IHN0eWxlZChcImRpdlwiKShcbiAge1xuICAgIFwicG9pbnRlci1ldmVudHNcIjogXCJhbGxcIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgekluZGV4OiAyMCxcbiAgICBcIj4gZGl2XCI6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIsXG4gICAgICBib3JkZXJSYWRpdXM6IHB4KDgpLFxuICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgZmlsdGVyOiBcImRyb3Atc2hhZG93KDFweCAxcHggNnB4IHJnYmEoMCwgMCwgMCwgMC41KSlcIixcbiAgICAgIGZvbnRTaXplOiBweCgxNCksXG4gICAgICBwYWRkaW5nOiBweCgxNiksXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgdGV4dEFsaWduOiBcImxlZnRcIixcbiAgICAgIFwiPiBwXCI6IHtcbiAgICAgICAgZm9udFdlaWdodDogXCJib2xkXCIsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogcHgoOCksXG4gICAgICAgIG1hcmdpblRvcDogcHgoMTYpLFxuICAgICAgICB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiXG4gICAgICB9LFxuICAgICAgYnV0dG9uOiB7XG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIFwiJjpub3QoOmxhc3Qtb2YtdHlwZSlcIjoge1xuICAgICAgICAgIG1hcmdpbkJvdHRvbTogcHgoMTIpXG4gICAgICAgIH0sXG4gICAgICAgIHNwYW46IHtcbiAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IHB4KDQpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIj4gc3BhblwiOiB7XG4gICAgICAgIGJhY2tncm91bmQ6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgYm9yZGVyTGVmdDogYDZweCBzb2xpZCB0cmFuc3BhcmVudGAsXG4gICAgICAgIGJvcmRlclJpZ2h0OiBgNnB4IHNvbGlkIHRyYW5zcGFyZW50YCxcbiAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgd2lkdGg6IDBcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiPiBidXR0b25cIjoge1xuICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgZm9udFNpemU6IHB4KDI0KSxcbiAgICAgIGhlaWdodDogcHgoMzIpLFxuICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICB3aWR0aDogcHgoMzIpXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgaXNDb21wYWN0ID0gc3R5bGUubGF5b3V0ID09PSBcImNvbXBhY3RcIjtcbiAgICBjb25zdCBkaXZTdHlsZXMgPSBpc0NvbXBhY3QgPyB7XG4gICAgICBib3R0b206IFwiMTIwJVwiLFxuICAgICAgbGVmdDogMFxuICAgIH0gOiB7XG4gICAgICBbc3R5bGUucF06IFwiMTIwJVwiLFxuICAgICAgbGVmdDogMCxcbiAgICAgIFwiQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KVwiOiB7XG4gICAgICAgIGxlZnQ6IFwiYXV0b1wiLFxuICAgICAgICByaWdodDogMFxuICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgc3BhblN0eWxlcyA9IGlzQ29tcGFjdCA/IHtcbiAgICAgIGJvdHRvbTogYC0ke3B4KDYpfWAsXG4gICAgICBib3JkZXJUb3A6IGA2cHggc29saWQgIzAwMGAsXG4gICAgICBsZWZ0OiBweCgxMClcbiAgICB9IDoge1xuICAgICAgW3N0eWxlLnAgPT09IFwidG9wXCIgPyBcImJvcmRlci1ib3R0b21cIiA6IFwiYm9yZGVyLXRvcFwiXTogYDZweCBzb2xpZCAjMDAwYCxcbiAgICAgIFtzdHlsZS5wXTogXCItNnB4XCIsXG4gICAgICBsZWZ0OiBweCgxMCksXG4gICAgICBcIkBtZWRpYSAobWluLXdpZHRoOiA3NjhweClcIjoge1xuICAgICAgICBsZWZ0OiBcImF1dG9cIixcbiAgICAgICAgcmlnaHQ6IHB4KDEwKVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiPiBidXR0b25cIjoge1xuICAgICAgICBjb2xvcjogc3R5bGUuY1xuICAgICAgfSxcbiAgICAgIFwiPiBkaXZcIjoge1xuICAgICAgICAuLi5kaXZTdHlsZXMsXG4gICAgICAgIFwiPiBzcGFuXCI6IHNwYW5TdHlsZXNcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBcIkRldmljZXNSU1dQXCJcbik7XG52YXIgTGlzdEhlYWRlciA9IHN0eWxlZChcImRpdlwiKSh7XG4gIHA6IHtcbiAgICB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiLFxuICAgIFwiJjpudGgtb2YtdHlwZSgxKVwiOiB7XG4gICAgICBmb250V2VpZ2h0OiBcImJvbGRcIixcbiAgICAgIG1hcmdpbkJvdHRvbTogcHgoOClcbiAgICB9LFxuICAgIFwiJjpudGgtb2YtdHlwZSgyKVwiOiB7XG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBzcGFuOiB7XG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICAgIG1hcmdpbkxlZnQ6IHB4KDQpXG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbmZ1bmN0aW9uIGdldERldmljZUljb24odHlwZSkge1xuICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwic3BlYWtlclwiKSkge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTMoRGV2aWNlc1NwZWFrZXJJY29uLCB7fSk7XG4gIH1cbiAgaWYgKHR5cGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImNvbXB1dGVyXCIpKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhEZXZpY2VzQ29tcHV0ZXJJY29uLCB7fSk7XG4gIH1cbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhEZXZpY2VzTW9iaWxlSWNvbiwge30pO1xufVxuZnVuY3Rpb24gRGV2aWNlcyhwcm9wcykge1xuICBjb25zdCB7XG4gICAgY3VycmVudERldmljZUlkLFxuICAgIGRldmljZUlkLFxuICAgIGRldmljZXMgPSBbXSxcbiAgICBsYXlvdXQsXG4gICAgbG9jYWxlLFxuICAgIG9uQ2xpY2tEZXZpY2UsXG4gICAgb3BlbixcbiAgICBwbGF5ZXJQb3NpdGlvbixcbiAgICBzdHlsZXM6IHsgY29sb3IgfVxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtpc09wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUob3Blbik7XG4gIGNvbnN0IGhhbmRsZUNsaWNrU2V0RGV2aWNlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyBkYXRhc2V0IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGlmIChkYXRhc2V0LmlkKSB7XG4gICAgICBvbkNsaWNrRGV2aWNlKGRhdGFzZXQuaWQpO1xuICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBoYW5kbGVDbGlja1RvZ2dsZUxpc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0T3BlbigocykgPT4gIXMpO1xuICB9LCBbXSk7XG4gIGNvbnN0IHsgY3VycmVudERldmljZSwgb3RoZXJEZXZpY2VzIH0gPSBkZXZpY2VzLnJlZHVjZShcbiAgICAoYWNjLCBkZXZpY2UpID0+IHtcbiAgICAgIGlmIChkZXZpY2UuaWQgPT09IGN1cnJlbnREZXZpY2VJZCkge1xuICAgICAgICBhY2MuY3VycmVudERldmljZSA9IGRldmljZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjYy5vdGhlckRldmljZXMucHVzaChkZXZpY2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LFxuICAgIHsgY3VycmVudERldmljZTogbnVsbCwgb3RoZXJEZXZpY2VzOiBbXSB9XG4gICk7XG4gIGxldCBpY29uID0gLyogQF9fUFVSRV9fICovIGpzeDEzKERldmljZXNJY29uLCB7fSk7XG4gIGlmIChkZXZpY2VJZCAmJiBjdXJyZW50RGV2aWNlICYmIGN1cnJlbnREZXZpY2UuaWQgIT09IGRldmljZUlkKSB7XG4gICAgaWNvbiA9IGdldERldmljZUljb24oY3VycmVudERldmljZS50eXBlKTtcbiAgfVxuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDEzKENsaWNrT3V0c2lkZV9kZWZhdWx0LCB7IGlzQWN0aXZlOiBpc09wZW4sIG9uQ2xpY2s6IGhhbmRsZUNsaWNrVG9nZ2xlTGlzdCwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhcbiAgICBXcmFwcGVyNCxcbiAgICB7XG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJEZXZpY2VzXCIsXG4gICAgICBcImRhdGEtZGV2aWNlLWlkXCI6IGN1cnJlbnREZXZpY2VJZCxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGM6IGNvbG9yLFxuICAgICAgICBsYXlvdXQsXG4gICAgICAgIHA6IHBsYXllclBvc2l0aW9uXG4gICAgICB9LFxuICAgICAgY2hpbGRyZW46ICEhZGV2aWNlcy5sZW5ndGggJiYgLyogQF9fUFVSRV9fICovIGpzeHMzKEZyYWdtZW50LCB7IGNoaWxkcmVuOiBbXG4gICAgICAgIGlzT3BlbiAmJiAvKiBAX19QVVJFX18gKi8ganN4czMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW1xuICAgICAgICAgIGN1cnJlbnREZXZpY2UgJiYgLyogQF9fUFVSRV9fICovIGpzeHMzKExpc3RIZWFkZXIsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxMyhcInBcIiwgeyBjaGlsZHJlbjogbG9jYWxlLmN1cnJlbnREZXZpY2UgfSksXG4gICAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4czMoXCJwXCIsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgZ2V0RGV2aWNlSWNvbihjdXJyZW50RGV2aWNlLnR5cGUpLFxuICAgICAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4MTMoXCJzcGFuXCIsIHsgY2hpbGRyZW46IGN1cnJlbnREZXZpY2UubmFtZSB9KVxuICAgICAgICAgICAgXSB9KVxuICAgICAgICAgIF0gfSksXG4gICAgICAgICAgISFvdGhlckRldmljZXMubGVuZ3RoICYmIC8qIEBfX1BVUkVfXyAqLyBqc3hzMyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDEzKFwicFwiLCB7IGNoaWxkcmVuOiBsb2NhbGUub3RoZXJEZXZpY2VzIH0pLFxuICAgICAgICAgICAgb3RoZXJEZXZpY2VzLm1hcCgoZGV2aWNlKSA9PiAvKiBAX19QVVJFX18gKi8ganN4czMoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogZGV2aWNlLm5hbWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIkJ1dHRvblJTV1BcIixcbiAgICAgICAgICAgICAgICBcImRhdGEtaWRcIjogZGV2aWNlLmlkLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrU2V0RGV2aWNlLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgIGdldERldmljZUljb24oZGV2aWNlLnR5cGUpLFxuICAgICAgICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDEzKFwic3BhblwiLCB7IGNoaWxkcmVuOiBkZXZpY2UubmFtZSB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZGV2aWNlLmlkXG4gICAgICAgICAgICApKVxuICAgICAgICAgIF0gfSksXG4gICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDEzKFwic3BhblwiLCB7fSlcbiAgICAgICAgXSB9KSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDEzKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGxvY2FsZS5kZXZpY2VzLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIkJ1dHRvblJTV1BcIixcbiAgICAgICAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrVG9nZ2xlTGlzdCxcbiAgICAgICAgICAgIHRpdGxlOiBsb2NhbGUuZGV2aWNlcyxcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogaWNvblxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgXSB9KVxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvRXJyb3JNZXNzYWdlLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDE0IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgV3JhcHBlcjUgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICB3aWR0aDogXCIxMDAlXCJcbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4gKHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHN0eWxlLmJnQ29sb3IsXG4gICAgYm9yZGVyVG9wOiBgMXB4IHNvbGlkICR7c3R5bGUuZXJyb3JDb2xvcn1gLFxuICAgIGNvbG9yOiBzdHlsZS5lcnJvckNvbG9yLFxuICAgIGhlaWdodDogcHgoc3R5bGUuaClcbiAgfSksXG4gIFwiRXJyb3JSU1dQXCJcbik7XG5mdW5jdGlvbiBFcnJvck1lc3NhZ2Uoe1xuICBjaGlsZHJlbixcbiAgc3R5bGVzOiB7IGJnQ29sb3IsIGVycm9yQ29sb3IsIGhlaWdodCB9XG59KSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTQoV3JhcHBlcjUsIHsgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiRXJyb3JNZXNzYWdlXCIsIHN0eWxlOiB7IGJnQ29sb3IsIGVycm9yQ29sb3IsIGg6IGhlaWdodCB9LCBjaGlsZHJlbiB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvSW5mby50c3hcbmltcG9ydCB7IG1lbW8gYXMgbWVtbzUsIHVzZUVmZmVjdCBhcyB1c2VFZmZlY3QzLCB1c2VSZWYgYXMgdXNlUmVmMywgdXNlU3RhdGUgYXMgdXNlU3RhdGUzIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmYWRlIH0gZnJvbSBcImNvbG9yaXpyXCI7XG5cbi8vIHNyYy9tb2R1bGVzL2hvb2tzLnRzXG5pbXBvcnQgeyB1c2VFZmZlY3QgYXMgdXNlRWZmZWN0MiwgdXNlUmVmIGFzIHVzZVJlZjIsIHVzZVN0YXRlIGFzIHVzZVN0YXRlMiB9IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlTWVkaWFRdWVyeShpbnB1dCkge1xuICBjb25zdCBnZXRNYXRjaGVzID0gKHF1ZXJ5KSA9PiB7XG4gICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICB9O1xuICBjb25zdCBbbWF0Y2hlcywgc2V0TWF0Y2hlc10gPSB1c2VTdGF0ZTIoZ2V0TWF0Y2hlcyhpbnB1dCkpO1xuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgc2V0TWF0Y2hlcyhnZXRNYXRjaGVzKGlucHV0KSk7XG4gIH1cbiAgdXNlRWZmZWN0MigoKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhKGlucHV0KTtcbiAgICBoYW5kbGVDaGFuZ2UoKTtcbiAgICB0cnkge1xuICAgICAgbWF0Y2hNZWRpYS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGhhbmRsZUNoYW5nZSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBtYXRjaE1lZGlhLmFkZExpc3RlbmVyKGhhbmRsZUNoYW5nZSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBtYXRjaE1lZGlhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgaGFuZGxlQ2hhbmdlKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBtYXRjaE1lZGlhLnJlbW92ZUxpc3RlbmVyKGhhbmRsZUNoYW5nZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2lucHV0XSk7XG4gIHJldHVybiBtYXRjaGVzO1xufVxuZnVuY3Rpb24gdXNlUHJldmlvdXModmFsdWUpIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmMigpO1xuICB1c2VFZmZlY3QyKCgpID0+IHtcbiAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICB9LCBbdmFsdWVdKTtcbiAgcmV0dXJuIHJlZi5jdXJyZW50O1xufVxuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9GYXZvcml0ZS50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxNSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gRmF2b3JpdGUocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxNShcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLCB3aWR0aDogXCIxZW1cIiwgLi4ucHJvcHMsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTUoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNjMuNjczIDE2LjUyQTE3LjY3NiAxNy42NzYgMCAwIDAgNDkuMTk3IDIuNTYzYy01LjQtLjg2MS0xMC44OTEuODUyLTE0Ljg0NCA0LjYzYTMuNDMgMy40MyAwIDAgMS00LjY3MiAwQzIyLjk1Ni42ODkgMTIuMzA1LjYyIDUuNDk4IDcuMDM5Yy02LjgwOCA2LjQxOS03LjM2NiAxNy4wNTUtMS4yNjggMjQuMTVsMjQuMjQ2IDI4Ljg5NGE0LjYyMyA0LjYyMyAwIDAgMCA3LjA3OCAwTDU5LjggMzEuMTlhMTcuMzI4IDE3LjMyOCAwIDAgMCAzLjg3My0xNC42NnYtLjAwOFpcIixcbiAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL0Zhdm9yaXRlT3V0bGluZS50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxNiB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gRmF2b3JpdGVPdXRsaW5lKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTYoXCJzdmdcIiwgeyBoZWlnaHQ6IFwiMWVtXCIsIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIiwgdmlld0JveDogXCIwIDAgNjQgNjRcIiwgd2lkdGg6IFwiMWVtXCIsIC4uLnByb3BzLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE2KFxuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTUuOTQ0IDcuMjA2QzEzLjI3MS4zIDI0LjcyMy4zNCAzMS45OTkgNy4zQTE4LjkyNCAxOC45MjQgMCAwIDEgNDguMDIgMi4zMmguMDA4YTE5LjA2OCAxOS4wNjggMCAwIDEgMTUuNjE3IDE1LjA3MXYuMDEzQTE4Ljc1OSAxOC43NTkgMCAwIDEgNTkuNDcgMzMuMjZMMzcuNTczIDU5LjM1M2E3LjI4OCA3LjI4OCAwIDAgMS04LjY0MiAxLjkxNiA3LjI3NiA3LjI3NiAwIDAgMS0yLjQ5OC0xLjkxMmwtMjEuOTAxLTI2LjFjLTYuNTUtNy42NzEtNS45My0xOS4xMzEgMS40MDgtMjYuMDUxaC4wMDRabTEzLjA0IDEuMDRhMTIuNzI2IDEyLjcyNiAwIDAgMC05LjczNyAyMC45OTdsLjAyMS4wMiAyMS45MDUgMjYuMTA1Yy4zMTYuMzcyLjg0LjQ4OCAxLjI4NC4yODUuMTQzLS4wNjYuMjctLjE2NC4zNzItLjI4NWwyMS45MzQtMjYuMTM3YTEyLjU2NSAxMi41NjUgMCAwIDAgMi44MDgtMTAuNjI1IDEyLjg3NSAxMi44NzUgMCAwIDAtMTAuNTM0LTEwLjE3IDEyLjcxNCAxMi43MTQgMCAwIDAtMTAuNzg1IDMuMzdsLS4wMjkuMDI5YTYuMTk4IDYuMTk4IDAgMCAxLTguNDQ0IDBsLS4wMzctLjAzM2ExMi43MjcgMTIuNzI3IDAgMCAwLTguNzU4LTMuNTU2WlwiLFxuICAgICAgZmlsbDogXCJjdXJyZW50Q29sb3JcIlxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvU3BvdGlmeUxvZ28udHN4XG5pbXBvcnQgeyB0ZXh0Q29sb3IgfSBmcm9tIFwiY29sb3JpenJcIjtcbmltcG9ydCB7IGpzeCBhcyBqc3gxNyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gU3BvdGlmeUxvZ28oeyBiZ0NvbG9yLCAuLi5yZXN0IH0pIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gxNyhcInN2Z1wiLCB7IGhlaWdodDogXCIxZW1cIiwgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLCB2aWV3Qm94OiBcIjAgMCA1MTIgMTYwXCIsIHdpZHRoOiBcIjMuMmVtXCIsIC4uLnJlc3QsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTcoXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNzkuNjU1IDBDMzUuNjY0IDAgMCAzNS42NjMgMCA3OS42NTRjMCA0My45OTMgMzUuNjY0IDc5LjY1MyA3OS42NTUgNzkuNjUzIDQzLjk5NiAwIDc5LjY1Ni0zNS42NiA3OS42NTYtNzkuNjUzIDAtNDMuOTg4LTM1LjY2LTc5LjY1LTc5LjY1Ny03OS42NUw3OS42NTUgMFptMzYuNTMgMTE0Ljg4NGE0Ljk2MyA0Ljk2MyAwIDAgMS02LjgzIDEuNjQ2Yy0xOC43MDItMTEuNDI0LTQyLjI0Ni0xNC4wMTEtNjkuOTczLTcuNjc2YTQuOTY3IDQuOTY3IDAgMCAxLTUuOTQ0LTMuNzM4IDQuOTU4IDQuOTU4IDAgMCAxIDMuNzM0LTUuOTQ1YzMwLjM0My02LjkzMyA1Ni4zNy0zLjk0OCA3Ny4zNjcgOC44ODRhNC45NjUgNC45NjUgMCAwIDEgMS42NDUgNi44M1ptOS43NS0yMS42ODljLTEuNzk5IDIuOTIyLTUuNjIyIDMuODQ1LTguNTQzIDIuMDQ3LTIxLjQxLTEzLjE2LTU0LjA0OS0xNi45NzItNzkuMzc0LTkuMjg0YTYuMjE5IDYuMjE5IDAgMCAxLTcuNzUtNC4xMzggNi4yMiA2LjIyIDAgMCAxIDQuMTQxLTcuNzQ1YzI4LjkyOS04Ljc3OCA2NC44OTItNC41MjYgODkuNDggMTAuNTgzIDIuOTIgMS43OTggMy44NDMgNS42MjIgMi4wNDUgOC41MzhabS44MzYtMjIuNTg1QzEwMS4xIDU1LjM2MiA1OC43NDIgNTMuOTYgMzQuMjMxIDYxLjRjLTMuOTM2IDEuMTk0LTguMDk4LTEuMDI4LTkuMjktNC45NjRhNy40NTMgNy40NTMgMCAwIDEgNC45NjUtOS4yOTRjMjguMTM3LTguNTQyIDc0LjkxMi02Ljg5MiAxMDQuNDY5IDEwLjY1NWE3LjQ0MSA3LjQ0MSAwIDAgMSAyLjYwNiAxMC4yMDljLTIuMDkyIDMuNTQtNi42NzcgNC43MDctMTAuMjA2IDIuNjA1aC0uMDA0Wm04OS45NDQgMi45MjJjLTEzLjc1NC0zLjI4LTE2LjE5OC01LjU4MS0xNi4xOTgtMTAuNDE4IDAtNC41NyA0LjI5OS03LjY0NSAxMC43LTcuNjQ1IDYuMjAyIDAgMTIuMzQ3IDIuMzM2IDE4Ljc5NiA3LjE0My4xOS4xNDUuNDM3LjIwMy42NzUuMTY1YS44ODguODg4IDAgMCAwIC42LS4zNjdsNi43MTUtOS40NjZhLjkwMy45MDMgMCAwIDAtLjE3MS0xLjIyNWMtNy42NzYtNi4xNTctMTYuMzEzLTkuMTUtMjYuNDE1LTkuMTUtMTQuODQ4IDAtMjUuMjI1IDguOTExLTI1LjIyNSAyMS42NjIgMCAxMy42NzMgOC45NSAxOC41MTUgMjQuNDE3IDIyLjI1MiAxMy4xNTUgMy4wMzEgMTUuMzggNS41NyAxNS4zOCAxMC4xMSAwIDUuMDMyLTQuNDkgOC4xNjEtMTEuNzE4IDguMTYxLTguMDI4IDAtMTQuNTgyLTIuNzEtMjEuOTA2LTkuMDQ2YS45MzIuOTMyIDAgMCAwLS42NTYtLjIxOC44OS44OSAwIDAgMC0uNjE5LjMxM2wtNy41MzMgOC45NmEuOTA2LjkwNiAwIDAgMCAuMDg2IDEuMjU2YzguNTIyIDcuNjEgMTkuMDA0IDExLjYyNCAzMC4zMjMgMTEuNjI0IDE2IDAgMjYuMzM5LTguNzQyIDI2LjMzOS0yMi4yNzcuMDI4LTExLjQyMS02LjgxLTE3Ljc0Ni0yMy41NjEtMjEuODIxbC0uMDI5LS4wMTNabTU5Ljc5Mi0xMy41NjRjLTYuOTM0IDAtMTIuNjIyIDIuNzMyLTE3LjMyMSA4LjMzdi02LjNjMC0uNDk4LS40LS45MDMtLjg5NC0uOTAzaC0xMi4zMThhLjg5OS44OTkgMCAwIDAtLjg5NC45MDJ2NzAuMDA5YzAgLjQ5NC40LjkwMy44OTQuOTAzaDEyLjMxOGEuOTAxLjkwMSAwIDAgMCAuODk0LS45MDN2LTIyLjA5N2M0LjY5OSA1LjI2IDEwLjM4NyA3LjgzOCAxNy4zMiA3LjgzOCAxMi44OSAwIDI1Ljk0LTkuOTIgMjUuOTQtMjguODg2LjAxOS0xOC45Ny0xMy4wMzItMjguODk0LTI1LjkzLTI4Ljg5NGwtLjAxLjAwMVptMTEuNjE0IDI4Ljg5M2MwIDkuNjUzLTUuOTQ1IDE2LjM5Ny0xNC40NjggMTYuMzk3LTguNDE4IDAtMTQuNzcyLTcuMDQ4LTE0Ljc3Mi0xNi4zOTcgMC05LjM1IDYuMzU0LTE2LjM5NyAxNC43NzItMTYuMzk3IDguMzggMCAxNC40NjggNi44OTMgMTQuNDY4IDE2LjM5NlptNDcuNzU5LTI4Ljg5M2MtMTYuNTk4IDAtMjkuNjAxIDEyLjc4LTI5LjYwMSAyOS4xIDAgMTYuMTQzIDEyLjkxNyAyOC43ODQgMjkuNDAxIDI4Ljc4NCAxNi42NTUgMCAyOS42OTYtMTIuNzM2IDI5LjY5Ni0yOC45OTEgMC0xNi4yLTEyLjk1NS0yOC44OS0yOS40OTYtMjguODl2LS4wMDNabTAgNDUuMzg1Yy04LjgyNyAwLTE1LjQ4NS03LjA5Ni0xNS40ODUtMTYuNDk3IDAtOS40NDQgNi40My0xNi4yOTggMTUuMjg1LTE2LjI5OCA4Ljg4NCAwIDE1LjU4IDcuMDkzIDE1LjU4IDE2LjUwNCAwIDkuNDQzLTYuNDY4IDE2LjI5MS0xNS4zOCAxNi4yOTFabTY0LjkzNy00NC4yNThoLTEzLjU1NFY0Ny4yNGMwLS40OTctLjQtLjkwMi0uODk0LS45MDJIMzc0LjA1YS45MDYuOTA2IDAgMCAwLS45MDQuOTAydjEzLjg1NWgtNS45MTZhLjg5OS44OTkgMCAwIDAtLjg5NC45MDJ2MTAuNTg0YS45LjkgMCAwIDAgLjg5NC45MDNoNS45MTZ2MjcuMzljMCAxMS4wNjIgNS41MDggMTYuNjc0IDE2LjM4IDE2LjY3NCA0LjQxMyAwIDguMDc1LS45MTQgMTEuNTI4LTIuODczYS44OC44OCAwIDAgMCAuNDU3LS43OHYtMTAuMDgzYS44OTYuODk2IDAgMCAwLS40MjgtLjc2Ljg3My44NzMgMCAwIDAtLjg3Ni0uMDM5Yy0yLjM2OCAxLjE5LTQuNjYgMS43NDEtNy4yMjkgMS43NDEtMy45NDcgMC01LjcxNi0xLjc5OC01LjcxNi01LjgxMlY3My40OWgxMy41NTRhLjg5OS44OTkgMCAwIDAgLjg5NC0uOTAzVjYyLjAwM2EuODczLjg3MyAwIDAgMC0uODg0LS45MDNsLS4wMS0uMDA1Wm00Ny4yMTcuMDU0di0xLjcwMmMwLTUuMDA2IDEuOTIxLTcuMjM4IDYuMjItNy4yMzggMi41NyAwIDQuNjMzLjUxIDYuOTQ1IDEuMjhhLjg5NS44OTUgMCAwIDAgMS4xOC0uODU4bC0uMDAxLTEwLjM3N2EuODkxLjg5MSAwIDAgMC0uNjM3LS44NjVjLTIuNDM1LS43MjYtNS41NTUtMS40Ny0xMC4yMzUtMS40Ny0xMS4zNjcgMC0xNy4zODggNi40MDUtMTcuMzg4IDE4LjUxNnYyLjYwNmgtNS45MTZhLjkwNi45MDYgMCAwIDAtLjkwNC45MDJ2MTAuNjM4YzAgLjQ5Ny40MS45MDMuOTA0LjkwM2g1LjkxNnY0Mi4yMzdjMCAuNTA0LjQxLjkwNC45MDQuOTA0aDEyLjMwOGMuNTA0IDAgLjkwNC0uNC45MDQtLjkwNFY3My40ODdoMTEuNWwxNy42MTYgNDIuMjM0Yy0xLjk5OCA0LjQzMy0zLjk2NyA1LjMxNy02LjY1IDUuMzE3LTIuMTY4IDAtNC40Ni0uNjQ2LTYuNzktMS45M2EuOTguOTggMCAwIDAtLjcxNC0uMDY3Ljg5Ni44OTYgMCAwIDAtLjUzMy40ODVsLTQuMTc1IDkuMTZhLjkuOSAwIDAgMCAuMzkgMS4xN2M0LjM1NiAyLjM1OSA4LjI4NCAzLjM2NyAxMy4xNDUgMy4zNjcgOS4wOTMgMCAxNC4xMjUtNC4yNDIgMTguNTQ4LTE1LjYzN2wyMS4zNjQtNTUuMjA0YS44OC44OCAwIDAgMC0uMDk1LS44MzguODc4Ljg3OCAwIDAgMC0uNzMzLS4zOTJoLTEyLjgyMmEuOTAxLjkwMSAwIDAgMC0uODU2LjYwNWwtMTMuMTM2IDM3LjUwOS0xNC4zODItMzcuNTM0YS44OTguODk4IDAgMCAwLS44MzctLjU4aC0yMS4wNHYtLjAwM1ptLTI3LjM3NS0uMDU0aC0xMi4zMThhLjkwNy45MDcgMCAwIDAtLjkwMy45MDJ2NTMuNzI0YzAgLjUwNC40MDkuOTA0LjkwMy45MDRoMTIuMzE4Yy40OTUgMCAuOTA0LS40LjkwNC0uOTA0di01My43MmEuOS45IDAgMCAwLS45MDQtLjkwM3YtLjAwM1ptLTYuMDg4LTI0LjQ2NGMtNC44OCAwLTguODM2IDMuOTUtOC44MzYgOC44MjhhOC44MzUgOC44MzUgMCAwIDAgOC44MzYgOC44MzZjNC44OCAwIDguODI3LTMuOTU0IDguODI3LTguODM2YTguODMgOC44MyAwIDAgMC04LjgyNy04LjgyOFpcIixcbiAgICAgIGZpbGw6IHRleHRDb2xvcihiZ0NvbG9yKVxuICAgIH1cbiAgKSB9KTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvSW5mby50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxOCwganN4cyBhcyBqc3hzNCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIGltYWdlU2l6ZSA9IDY0O1xudmFyIGljb25TaXplID0gMzI7XG52YXIgV3JhcHBlcjYgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICB0ZXh0QWxpZ246IFwibGVmdFwiLFxuICAgIFwiPiBhXCI6IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgICAgIHRleHREZWNvcmF0aW9uOiBcIm5vbmVcIixcbiAgICAgIG1pbkhlaWdodDogcHgoNjQpLFxuICAgICAgbWluV2lkdGg6IHB4KDY0KSxcbiAgICAgIFwiJjpob3ZlclwiOiB7XG4gICAgICAgIHRleHREZWNvcmF0aW9uOiBcInVuZGVybGluZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBidXR0b246IHtcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgIGZvbnRTaXplOiBweCgxNiksXG4gICAgICBoZWlnaHQ6IHB4KGljb25TaXplICsgOCksXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgIHdpZHRoOiBweChpY29uU2l6ZSlcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+IHtcbiAgICBjb25zdCBpc0NvbXBhY3RMYXlvdXQgPSBzdHlsZS5sYXlvdXQgPT09IFwiY29tcGFjdFwiO1xuICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgIGlmIChpc0NvbXBhY3RMYXlvdXQpIHtcbiAgICAgIHN0eWxlcy5ib3JkZXJCb3R0b20gPSBgMXB4IHNvbGlkICR7ZmFkZShzdHlsZS5jLCA0MCl9YDtcbiAgICAgIHN0eWxlc1tcIj4gYVwiXSA9IHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIG1hcmdpbjogXCIwIGF1dG9cIixcbiAgICAgICAgbWF4V2lkdGg6IHB4KDY0MCksXG4gICAgICAgIHBhZGRpbmdCb3R0b206IFwiMTAwJVwiLFxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICBpbWc6IHtcbiAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgbWF4V2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgdG9wOiAwXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcy5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcbiAgICAgIHN0eWxlcy5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICBzdHlsZXMubWluSGVpZ2h0ID0gcHgoODApO1xuICAgICAgc3R5bGVzW1wiQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KVwiXSA9IHtcbiAgICAgICAgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7ZmFkZShzdHlsZS5jLCA0MCl9YCxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IHB4KDgpLFxuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICB9O1xuICAgICAgc3R5bGVzLmltZyA9IHtcbiAgICAgICAgaGVpZ2h0OiBweChpbWFnZVNpemUpLFxuICAgICAgICB3aWR0aDogcHgoaW1hZ2VTaXplKVxuICAgICAgfTtcbiAgICAgIHN0eWxlc1tcIiYucnN3cF9fYWN0aXZlXCJdID0ge1xuICAgICAgICBcIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweClcIjoge1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBidXR0b246IHtcbiAgICAgICAgY29sb3I6IHN0eWxlLmMsXG4gICAgICAgIFwiJi5yc3dwX19hY3RpdmVcIjoge1xuICAgICAgICAgIGNvbG9yOiBzdHlsZS5hY3RpdmVDb2xvclxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLi4uc3R5bGVzXG4gICAgfTtcbiAgfSxcbiAgXCJJbmZvUlNXUFwiXG4pO1xudmFyIENvbnRlbnRXcmFwcGVyID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBcIj4gYVwiOiB7XG4gICAgICBmb250U2l6ZTogcHgoMjIpLFxuICAgICAgbWFyZ2luVG9wOiBweCg0KVxuICAgIH1cbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4ge1xuICAgIGNvbnN0IGlzQ29tcGFjdExheW91dCA9IHN0eWxlLmxheW91dCA9PT0gXCJjb21wYWN0XCI7XG4gICAgY29uc3Qgc3R5bGVzID0ge307XG4gICAgaWYgKGlzQ29tcGFjdExheW91dCkge1xuICAgICAgc3R5bGVzLnBhZGRpbmcgPSBweCg4KTtcbiAgICAgIHN0eWxlcy53aWR0aCA9IFwiMTAwJVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMubWluSGVpZ2h0ID0gcHgoaW1hZ2VTaXplKTtcbiAgICAgIGlmICghc3R5bGUuaGlkZUNvdmVyQXJ0KSB7XG4gICAgICAgIHN0eWxlcy5tYXJnaW5MZWZ0ID0gcHgoOCk7XG4gICAgICAgIHN0eWxlcy53aWR0aCA9IGBjYWxjKDEwMCUgLSAke3B4KGltYWdlU2l6ZSArIDgpfSlgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVzLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXM7XG4gIH0sXG4gIFwiQ29udGVudFdyYXBwZXJSU1dQXCJcbik7XG52YXIgQ29udGVudCA9IHN0eWxlZChcImRpdlwiKShcbiAge1xuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgIGp1c3RpZnlDb250ZW50OiBcInN0YXJ0XCIsXG4gICAgJ1tkYXRhLXR5cGU9XCJ0aXRsZS1hcnRpc3Qtd3JhcHBlclwiXSc6IHtcbiAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgICAgZGl2OiB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IGAtJHtweCg4KX1gLFxuICAgICAgICB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiXG4gICAgICB9XG4gICAgfSxcbiAgICBwOiB7XG4gICAgICBmb250U2l6ZTogcHgoMTQpLFxuICAgICAgbGluZUhlaWdodDogMS4zLFxuICAgICAgcGFkZGluZ0xlZnQ6IHB4KDgpLFxuICAgICAgcGFkZGluZ1JpZ2h0OiBweCg4KSxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIFwiJjpudGgtb2YtdHlwZSgxKVwiOiB7XG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIlxuICAgICAgfSxcbiAgICAgIFwiJjpudGgtb2YtdHlwZSgyKVwiOiB7XG4gICAgICAgIGZvbnRTaXplOiBweCgxMilcbiAgICAgIH1cbiAgICB9LFxuICAgIHNwYW46IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+IHtcbiAgICBjb25zdCBtYXNrSW1hZ2VDb2xvciA9IGdldEJnQ29sb3Ioc3R5bGUuYmdDb2xvciwgc3R5bGUudHJhY2tOYW1lQ29sb3IpO1xuICAgIHJldHVybiB7XG4gICAgICAnW2RhdGEtdHlwZT1cInRpdGxlLWFydGlzdC13cmFwcGVyXCJdJzoge1xuICAgICAgICBjb2xvcjogc3R5bGUudHJhY2tOYW1lQ29sb3IsXG4gICAgICAgIG1heFdpZHRoOiBgY2FsYygxMDAlIC0gJHtweChzdHlsZS5zaG93U2F2ZUljb24gPyBpY29uU2l6ZSA6IDApfSlgLFxuICAgICAgICBkaXY6IHtcbiAgICAgICAgICBcIi13ZWJraXQtbWFzay1pbWFnZVwiOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLHRyYW5zcGFyZW50IDAsICR7bWFza0ltYWdlQ29sb3J9IDZweCwgJHttYXNrSW1hZ2VDb2xvcn0gY2FsYygxMDAlIC0gMTJweCksdHJhbnNwYXJlbnQpYFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcDoge1xuICAgICAgICBcIiY6bnRoLW9mLXR5cGUoMSlcIjoge1xuICAgICAgICAgIGNvbG9yOiBzdHlsZS50cmFja05hbWVDb2xvcixcbiAgICAgICAgICBhOiB7XG4gICAgICAgICAgICBjb2xvcjogc3R5bGUudHJhY2tOYW1lQ29sb3JcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiJjpudGgtb2YtdHlwZSgyKVwiOiB7XG4gICAgICAgICAgY29sb3I6IHN0eWxlLnRyYWNrQXJ0aXN0Q29sb3IsXG4gICAgICAgICAgYToge1xuICAgICAgICAgICAgY29sb3I6IHN0eWxlLnRyYWNrQXJ0aXN0Q29sb3JcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBcIkNvbnRlbnRSU1dQXCJcbik7XG5mdW5jdGlvbiBJbmZvKHByb3BzKSB7XG4gIGNvbnN0IHtcbiAgICBoaWRlQXR0cmlidXRpb24sXG4gICAgaGlkZUNvdmVyQXJ0LFxuICAgIGlzQWN0aXZlLFxuICAgIGxheW91dCxcbiAgICBsb2NhbGUsXG4gICAgb25GYXZvcml0ZVN0YXR1c0NoYW5nZSxcbiAgICBzaG93U2F2ZUljb24sXG4gICAgc3R5bGVzOiB7IGFjdGl2ZUNvbG9yLCBiZ0NvbG9yLCBjb2xvciwgaGVpZ2h0LCB0cmFja0FydGlzdENvbG9yLCB0cmFja05hbWVDb2xvciB9LFxuICAgIHRva2VuLFxuICAgIHRyYWNrOiB7IGFydGlzdHMgPSBbXSwgaWQsIGltYWdlLCBuYW1lLCB1cmkgfSxcbiAgICB1cGRhdGVTYXZlZFN0YXR1c1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtpc1NhdmVkLCBzZXRJc1NhdmVkXSA9IHVzZVN0YXRlMyhmYWxzZSk7XG4gIGNvbnN0IGlzTW91bnRlZCA9IHVzZVJlZjMoZmFsc2UpO1xuICBjb25zdCBwcmV2aW91c0lkID0gdXNlUHJldmlvdXMoaWQpO1xuICBjb25zdCBpc0NvbXBhY3RMYXlvdXQgPSBsYXlvdXQgPT09IFwiY29tcGFjdFwiO1xuICBjb25zdCB1cGRhdGVTdGF0ZSA9IChzdGF0ZSkgPT4ge1xuICAgIGlmICghaXNNb3VudGVkLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNTYXZlZChzdGF0ZSk7XG4gIH07XG4gIGNvbnN0IHNldFN0YXR1cyA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWlzTW91bnRlZC5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1cGRhdGVTYXZlZFN0YXR1cyAmJiBpZCkge1xuICAgICAgdXBkYXRlU2F2ZWRTdGF0dXMoKG5ld1N0YXR1cykgPT4ge1xuICAgICAgICB1cGRhdGVTdGF0ZShuZXdTdGF0dXMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IGNoZWNrVHJhY2tzU3RhdHVzKHRva2VuLCBpZCk7XG4gICAgY29uc3QgW2lzRmF2b3JpdGVdID0gc3RhdHVzIHx8IFtmYWxzZV07XG4gICAgdXBkYXRlU3RhdGUoaXNGYXZvcml0ZSk7XG4gICAgb25GYXZvcml0ZVN0YXR1c0NoYW5nZShpc1NhdmVkKTtcbiAgfTtcbiAgdXNlRWZmZWN0MygoKSA9PiB7XG4gICAgaXNNb3VudGVkLmN1cnJlbnQgPSB0cnVlO1xuICAgIGlmIChzaG93U2F2ZUljb24gJiYgaWQpIHtcbiAgICAgIHNldFN0YXR1cygpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNNb3VudGVkLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUVmZmVjdDMoKCkgPT4ge1xuICAgIGlmIChzaG93U2F2ZUljb24gJiYgcHJldmlvdXNJZCAhPT0gaWQgJiYgaWQpIHtcbiAgICAgIHVwZGF0ZVN0YXRlKGZhbHNlKTtcbiAgICAgIHNldFN0YXR1cygpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrSWNvbiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoaXNTYXZlZCkge1xuICAgICAgYXdhaXQgcmVtb3ZlVHJhY2tzKHRva2VuLCBpZCk7XG4gICAgICB1cGRhdGVTdGF0ZShmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHNhdmVUcmFja3ModG9rZW4sIGlkKTtcbiAgICAgIHVwZGF0ZVN0YXRlKHRydWUpO1xuICAgIH1cbiAgICBvbkZhdm9yaXRlU3RhdHVzQ2hhbmdlKCFpc1NhdmVkKTtcbiAgfTtcbiAgY29uc3QgdGl0bGUgPSBnZXRTcG90aWZ5TGlua1RpdGxlKG5hbWUsIGxvY2FsZS50aXRsZSk7XG4gIGxldCBmYXZvcml0ZTtcbiAgaWYgKHNob3dTYXZlSWNvbiAmJiBpZCkge1xuICAgIGZhdm9yaXRlID0gLyogQF9fUFVSRV9fICovIGpzeDE4KFxuICAgICAgXCJidXR0b25cIixcbiAgICAgIHtcbiAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGlzU2F2ZWQgPyBsb2NhbGUucmVtb3ZlVHJhY2sgOiBsb2NhbGUuc2F2ZVRyYWNrLFxuICAgICAgICBjbGFzc05hbWU6IGBCdXR0b25SU1dQJHtpc1NhdmVkID8gXCIgcnN3cF9fYWN0aXZlXCIgOiBcIlwifWAsXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZUNsaWNrSWNvbixcbiAgICAgICAgdGl0bGU6IGlzU2F2ZWQgPyBsb2NhbGUucmVtb3ZlVHJhY2sgOiBsb2NhbGUuc2F2ZVRyYWNrLFxuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICBjaGlsZHJlbjogaXNTYXZlZCA/IC8qIEBfX1BVUkVfXyAqLyBqc3gxOChGYXZvcml0ZSwge30pIDogLyogQF9fUFVSRV9fICovIGpzeDE4KEZhdm9yaXRlT3V0bGluZSwge30pXG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBjb25zdCBjb250ZW50ID0ge307XG4gIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgaWYgKGlzQWN0aXZlKSB7XG4gICAgY2xhc3Nlcy5wdXNoKFwicnN3cF9fYWN0aXZlXCIpO1xuICB9XG4gIGlmIChpc0NvbXBhY3RMYXlvdXQpIHtcbiAgICBjb250ZW50LmltYWdlID0gLyogQF9fUFVSRV9fICovIGpzeDE4KFwiaW1nXCIsIHsgYWx0OiBuYW1lLCBzcmM6IGltYWdlIH0pO1xuICB9XG4gIGlmICghaWQpIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeDE4KFwiZGl2XCIsIHt9KTtcbiAgfVxuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHM0KFxuICAgIFdyYXBwZXI2LFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5qb2luKFwiIFwiKSxcbiAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIkluZm9cIixcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGFjdGl2ZUNvbG9yLFxuICAgICAgICBjOiBjb2xvcixcbiAgICAgICAgaDogaGVpZ2h0LFxuICAgICAgICBsYXlvdXQsXG4gICAgICAgIHNob3dTYXZlSWNvblxuICAgICAgfSxcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICFoaWRlQ292ZXJBcnQgJiYgLyogQF9fUFVSRV9fICovIGpzeDE4KFxuICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0aXRsZSxcbiAgICAgICAgICAgIGhyZWY6IGdldFNwb3RpZnlMaW5rKHVyaSksXG4gICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiLFxuICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE4KFwiaW1nXCIsIHsgYWx0OiBuYW1lLCBzcmM6IGltYWdlIH0pXG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4czQoXG4gICAgICAgICAgQ29udGVudFdyYXBwZXIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgaGlkZUNvdmVyQXJ0LFxuICAgICAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgICAgIHNob3dTYXZlSWNvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICEhbmFtZSAmJiAvKiBAX19QVVJFX18gKi8ganN4czQoXG4gICAgICAgICAgICAgICAgQ29udGVudCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBiZ0NvbG9yLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgICAgICAgICAgIHNob3dTYXZlSWNvbixcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tBcnRpc3RDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOYW1lQ29sb3JcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4MTgoXCJkaXZcIiwgeyBcImRhdGEtdHlwZVwiOiBcInRpdGxlLWFydGlzdC13cmFwcGVyXCIsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4czQoXCJkaXZcIiwgeyBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcInBcIiwgeyBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE4KFwic3BhblwiLCB7IGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MTgoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBnZXRTcG90aWZ5TGluayh1cmkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWw6IFwibm9yZWZlcnJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICkgfSkgfSksXG4gICAgICAgICAgICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDE4KFwicFwiLCB7IHRpdGxlOiBhcnRpc3RzLm1hcCgoZCkgPT4gZC5uYW1lKS5qb2luKFwiLCBcIiksIGNoaWxkcmVuOiBhcnRpc3RzLm1hcCgoYXJ0aXN0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJ0aXN0VGl0bGUgPSBnZXRTcG90aWZ5TGlua1RpdGxlKGFydGlzdC5uYW1lLCBsb2NhbGUudGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3hzNChcInNwYW5cIiwgeyBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA/IFwiLCBcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3gxOChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogYXJ0aXN0VGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBnZXRTcG90aWZ5TGluayhhcnRpc3QudXJpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbDogXCJub3JlZmVycmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYXJ0aXN0VGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogYXJ0aXN0Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0gfSwgYXJ0aXN0LnVyaSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSkgfSlcbiAgICAgICAgICAgICAgICAgICAgXSB9KSB9KSxcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICFoaWRlQXR0cmlidXRpb24gJiYgLyogQF9fUFVSRV9fICovIGpzeDE4KFxuICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBcIlBsYXkgb24gU3BvdGlmeVwiLFxuICAgICAgICAgICAgICAgICAgaHJlZjogZ2V0U3BvdGlmeUxpbmsodXJpKSxcbiAgICAgICAgICAgICAgICAgIHJlbDogXCJub3JlZmVycmVyXCIsXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDE4KFNwb3RpZnlMb2dvLCB7IGJnQ29sb3IgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG4gICk7XG59XG52YXIgSW5mb19kZWZhdWx0ID0gbWVtbzUoSW5mbyk7XG5cbi8vIHNyYy9jb21wb25lbnRzL0xvYWRlci50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gxOSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFdyYXBwZXI3ID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBqc3V0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgIFwiPiBkaXZcIjoge1xuICAgICAgYm9yZGVyUmFkaXVzOiBcIjUwJVwiLFxuICAgICAgYm9yZGVyU3R5bGU6IFwic29saWRcIixcbiAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIGxlZnQ6IFwiNTAlXCIsXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgdG9wOiBcIjUwJVwiLFxuICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiLFxuICAgICAgd2lkdGg6IDBcbiAgICB9XG4gIH0sXG4gICh7IHN0eWxlIH0pID0+IHtcbiAgICBjb25zdCBwdWxzZSA9IGtleWZyYW1lcyh7XG4gICAgICBcIjAlXCI6IHtcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICB3aWR0aDogMFxuICAgICAgfSxcbiAgICAgIFwiMzAlXCI6IHtcbiAgICAgICAgYm9yZGVyV2lkdGg6IHB4KDgpLFxuICAgICAgICBoZWlnaHQ6IHB4KHN0eWxlLmxvYWRlclNpemUpLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB3aWR0aDogcHgoc3R5bGUubG9hZGVyU2l6ZSlcbiAgICAgIH0sXG4gICAgICBcIjEwMCVcIjoge1xuICAgICAgICBib3JkZXJXaWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiBweChzdHlsZS5sb2FkZXJTaXplKSxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgd2lkdGg6IHB4KHN0eWxlLmxvYWRlclNpemUpXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogcHgoc3R5bGUuaCksXG4gICAgICBcIj4gZGl2XCI6IHtcbiAgICAgICAgYW5pbWF0aW9uOiBgJHtwdWxzZX0gMS4xNXMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSlgLFxuICAgICAgICBib3JkZXJDb2xvcjogc3R5bGUubG9hZGVyQ29sb3IsXG4gICAgICAgIGhlaWdodDogcHgoc3R5bGUubG9hZGVyU2l6ZSksXG4gICAgICAgIHdpZHRoOiBweChzdHlsZS5sb2FkZXJTaXplKVxuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIFwiTG9hZGVyUlNXUFwiXG4pO1xuZnVuY3Rpb24gTG9hZGVyKHsgc3R5bGVzOiB7IGhlaWdodCwgbG9hZGVyQ29sb3IsIGxvYWRlclNpemUgfSB9KSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MTkoV3JhcHBlcjcsIHsgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiTG9hZGVyXCIsIHN0eWxlOiB7IGg6IGhlaWdodCwgbG9hZGVyQ29sb3IsIGxvYWRlclNpemUgfSwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gxOShcImRpdlwiLCB7fSkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL1BsYXllci50c3hcbmltcG9ydCB7IGZvcndhcmRSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCBhcyBqc3gyMCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFBsYXllciA9IGZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIGNoaWxkcmVuLFxuICAgIHN0eWxlczogeyBiZ0NvbG9yLCBoZWlnaHQgfSxcbiAgICAuLi5yZXN0XG4gIH0gPSBwcm9wcztcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gyMChcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIHJlZixcbiAgICAgIGNsYXNzTmFtZTogXCJQbGF5ZXJSU1dQXCIsXG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJQbGF5ZXJcIixcbiAgICAgIHN0eWxlOiB7IGJhY2tncm91bmQ6IGJnQ29sb3IsIG1pbkhlaWdodDogcHgoaGVpZ2h0KSB9LFxuICAgICAgLi4ucmVzdCxcbiAgICAgIGNoaWxkcmVuXG4gICAgfVxuICApO1xufSk7XG52YXIgUGxheWVyX2RlZmF1bHQgPSBQbGF5ZXI7XG5cbi8vIHNyYy9jb21wb25lbnRzL1ZvbHVtZS50c3hcbmltcG9ydCB7IHVzZUNhbGxiYWNrIGFzIHVzZUNhbGxiYWNrMiwgdXNlRWZmZWN0IGFzIHVzZUVmZmVjdDQsIHVzZVJlZiBhcyB1c2VSZWY0LCB1c2VTdGF0ZSBhcyB1c2VTdGF0ZTQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSYW5nZVNsaWRlcjIgZnJvbSBcIkBnaWxiYXJiYXJhL3JlYWN0LXJhbmdlLXNsaWRlclwiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29ucy9Wb2x1bWVIaWdoLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDIxIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBWb2x1bWVIaWdoKHByb3BzKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjEoXG4gICAgXCJzdmdcIixcbiAgICB7XG4gICAgICBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJWb2x1bWVIaWdoXCIsXG4gICAgICBoZWlnaHQ6IFwiMWVtXCIsXG4gICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiBcInhNaWRZTWlkXCIsXG4gICAgICB2aWV3Qm94OiBcIjAgMCA2NCA2NFwiLFxuICAgICAgd2lkdGg6IFwiMWVtXCIsXG4gICAgICAuLi5wcm9wcyxcbiAgICAgIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4MjEoXG4gICAgICAgIFwicGF0aFwiLFxuICAgICAgICB7XG4gICAgICAgICAgZDogXCJNMzcuOTYzIDMuNDAyYTIuOTg5IDIuOTg5IDAgMCAxIDEuNSAyLjU5NnY1MmEzIDMgMCAwIDEtNC41IDIuNmwtMjcuNy0xNkMuMzIgNDAuNTcyLTIuMDYgMzEuNjg4IDEuOTQzIDI0LjczYTE0LjU1NiAxNC41NTYgMCAwIDEgNS4zMi01LjMyOGwyNy43LTE2YTMgMyAwIDAgMSAzIDBaTTQ1IDkuNTQyYTIzLjAwOCAyMy4wMDggMCAwIDEgMCA0NC45MTJWNDguMjVhMTcuMDA4IDE3LjAwOCAwIDAgMCAwLTMyLjUwOFptLTExLjUzMiAxLjY1Ni0yMy4yIDEzLjRhOC41NTYgOC41NTYgMCAwIDAgMCAxNC44bDIzLjIgMTMuNHYtNDEuNlpNNDUgMjIuMjM4YTExIDExIDAgMCAxIDAgMTkuNTJ2LTE5LjUyWlwiLFxuICAgICAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgKTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbnMvVm9sdW1lTG93LnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDIyIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBWb2x1bWVMb3cocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gyMihcbiAgICBcInN2Z1wiLFxuICAgIHtcbiAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIlZvbHVtZUxvd1wiLFxuICAgICAgaGVpZ2h0OiBcIjFlbVwiLFxuICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLFxuICAgICAgdmlld0JveDogXCIwIDAgNjQgNjRcIixcbiAgICAgIHdpZHRoOiBcIjFlbVwiLFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDIyKFxuICAgICAgICBcInBhdGhcIixcbiAgICAgICAge1xuICAgICAgICAgIGQ6IFwiTTM3Ljk2MyAzLjM5OGEzIDMgMCAwIDEgMS41IDIuNnY1MmEzIDMgMCAwIDEtNC41IDIuNmwtMjcuNy0xNkMuMzIgNDAuNTcyLTIuMDYgMzEuNjg4IDEuOTQzIDI0LjczYTE0LjU1NiAxNC41NTYgMCAwIDEgNS4zMi01LjMyOGwyNy43LTE2YTMgMyAwIDAgMSAzIDB2LS4wMDRabS0yNy42OTYgMjEuMmE4LjU1NiA4LjU1NiAwIDAgMCAwIDE0LjhsMjMuMiAxMy40di00MS42bC0yMy4yIDEzLjRaTTQ1IDQxLjc1OHYtMTkuNTJhMTEgMTEgMCAwIDEgMCAxOS41MlpcIixcbiAgICAgICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL1ZvbHVtZU1pZC50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gyMyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gVm9sdW1lSGlnaDIocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gyMyhcbiAgICBcInN2Z1wiLFxuICAgIHtcbiAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIlZvbHVtZU1pZFwiLFxuICAgICAgaGVpZ2h0OiBcIjFlbVwiLFxuICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogXCJ4TWlkWU1pZFwiLFxuICAgICAgdmlld0JveDogXCIwIDAgNjQgNjRcIixcbiAgICAgIHdpZHRoOiBcIjFlbVwiLFxuICAgICAgLi4ucHJvcHMsXG4gICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeDIzKFxuICAgICAgICBcInBhdGhcIixcbiAgICAgICAge1xuICAgICAgICAgIGQ6IFwiTTM3Ljk2MyAzLjM5OGEzIDMgMCAwIDEgMS41IDIuNnY1MmEzIDMgMCAwIDEtNC41IDIuNmwtMjcuNy0xNkMuMzIgNDAuNTcyLTIuMDYgMzEuNjg4IDEuOTQzIDI0LjczYTE0LjU1NiAxNC41NTYgMCAwIDEgNS4zMi01LjMyOGwyNy43LTE2YTMgMyAwIDAgMSAzIDB2LS4wMDRabS0yNy42OTYgMjEuMmE4LjU1NiA4LjU1NiAwIDAgMCAwIDE0LjhsMjMuMiAxMy40di00MS42bC0yMy4yIDEzLjRaTTQ1IDQ4Ljk0NmExOC4wMDggMTguMDA4IDAgMCAwIDAtMzMuODk2djYuNmExMS45OTYgMTEuOTk2IDAgMCAxIDAgMjAuN3Y2LjU5NlpcIixcbiAgICAgICAgICBmaWxsOiBcImN1cnJlbnRDb2xvclwiXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb25zL1ZvbHVtZU11dGUudHN4XG5pbXBvcnQgeyBqc3ggYXMganN4MjQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIFZvbHVtZU11dGUocHJvcHMpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gyNChcbiAgICBcInN2Z1wiLFxuICAgIHtcbiAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcIlZvbHVtZU11dGVcIixcbiAgICAgIGhlaWdodDogXCIxZW1cIixcbiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IFwieE1pZFlNaWRcIixcbiAgICAgIHZpZXdCb3g6IFwiMCAwIDY0IDY0XCIsXG4gICAgICB3aWR0aDogXCIxZW1cIixcbiAgICAgIC4uLnByb3BzLFxuICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gyNChcbiAgICAgICAgXCJwYXRoXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBkOiBcIk0zNC45NjMgMy40MDJhMyAzIDAgMCAxIDQuNSAyLjZ2Ny42MjRhMTkuMDMgMTkuMDMgMCAwIDAtNiAyLjc3NnYtNS4ybC0yMy4yIDEzLjRhOC41NyA4LjU3IDAgMCAwLTMuMTIgMy4xMjggOC41NjQgOC41NjQgMCAwIDAgMy4xMjQgMTEuNjhsMjMuMTk2IDEzLjM5MnYtNS4yYTE4LjkyIDE4LjkyIDAgMCAwIDYgMi43NzZ2Ny42MjRhMyAzIDAgMCAxLTQuNSAyLjU5NmwtMjcuNy0xNmExNC41NTYgMTQuNTU2IDAgMCAxLTUuMzItNS4zMjhDLTIuMDYgMzIuMzEzLjMyIDIzLjQyOCA3LjI2MyAxOS40MDJsMjcuNy0xNlptMTcuMzU0IDE3LjZhMyAzIDAgMCAxIDIuMTIyIDUuMTJsLTUuODggNS44OCA1Ljg3NiA1Ljg4YTMgMyAwIDAgMS00LjI0IDQuMjRsLTUuODgtNS44OC01Ljg4IDUuODhhMyAzIDAgMSAxLTQuMzg1LTQuMDk1bDYuMDI1LTYuMDI1LTUuODc2LTUuODhhMyAzIDAgMCAxIDQuMjM2LTQuMjRsNS44OCA1Ljg4IDUuODgtNS44OGEzIDMgMCAwIDEgMi4xMjItLjg4WlwiLFxuICAgICAgICAgIGZpbGw6IFwiY3VycmVudENvbG9yXCJcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgKTtcbn1cblxuLy8gc3JjL2NvbXBvbmVudHMvVm9sdW1lLnRzeFxuaW1wb3J0IHsganN4IGFzIGpzeDI1LCBqc3hzIGFzIGpzeHM1IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgV3JhcHBlcldpdGhUb2dnbGUgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwiYWxsXCIsXG4gICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICB6SW5kZXg6IDIwLFxuICAgIFwiPiBkaXZcIjoge1xuICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIsXG4gICAgICBib3JkZXJSYWRpdXM6IHB4KDQpLFxuICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBmaWx0ZXI6IFwiZHJvcC1zaGFkb3coMXB4IDFweCA2cHggcmdiYSgwLCAwLCAwLCAwLjUpKVwiLFxuICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgIGxlZnQ6IFwiLTRweFwiLFxuICAgICAgcGFkZGluZzogcHgoMTYpLFxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIFwiPiBzcGFuXCI6IHtcbiAgICAgICAgYmFja2dyb3VuZDogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICBib3JkZXJMZWZ0OiBgNnB4IHNvbGlkIHRyYW5zcGFyZW50YCxcbiAgICAgICAgYm9yZGVyUmlnaHQ6IGA2cHggc29saWQgdHJhbnNwYXJlbnRgLFxuICAgICAgICBjb250ZW50OiAnXCJcIicsXG4gICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB3aWR0aDogMFxuICAgICAgfVxuICAgIH0sXG4gICAgXCI+IGJ1dHRvblwiOiB7XG4gICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBmb250U2l6ZTogcHgoMjQpLFxuICAgICAgaGVpZ2h0OiBweCgzMiksXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICAgIHdpZHRoOiBweCgzMilcbiAgICB9LFxuICAgIFwiQG1lZGlhIChhbnktcG9pbnRlcjogZmluZSlcIjoge1xuICAgICAgZGlzcGxheTogXCJibG9ja1wiXG4gICAgfVxuICB9LFxuICAoeyBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgaXNDb21wYWN0ID0gc3R5bGUubGF5b3V0ID09PSBcImNvbXBhY3RcIjtcbiAgICBjb25zdCBzcGFuU3R5bGVzID0gaXNDb21wYWN0ID8ge1xuICAgICAgYm90dG9tOiBgLSR7cHgoNil9YCxcbiAgICAgIGJvcmRlclRvcDogYDZweCBzb2xpZCAjMDAwYFxuICAgIH0gOiB7XG4gICAgICBbc3R5bGUucCA9PT0gXCJ0b3BcIiA/IFwiYm9yZGVyLWJvdHRvbVwiIDogXCJib3JkZXItdG9wXCJdOiBgNnB4IHNvbGlkICMwMDBgLFxuICAgICAgW3N0eWxlLnBdOiBcIi02cHhcIlxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIFwiPiBidXR0b25cIjoge1xuICAgICAgICBjb2xvcjogc3R5bGUuY1xuICAgICAgfSxcbiAgICAgIFwiPiBkaXZcIjoge1xuICAgICAgICBbaXNDb21wYWN0ID8gXCJib3R0b21cIiA6IHN0eWxlLnBdOiBcIjEzMCVcIixcbiAgICAgICAgXCI+IHNwYW5cIjogc3BhblN0eWxlc1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIFwiVm9sdW1lUlNXUFwiXG4pO1xudmFyIFdyYXBwZXJJbmxpbmUgPSBzdHlsZWQoXCJkaXZcIikoXG4gIHtcbiAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICBwYWRkaW5nOiBgMCAke3B4KDgpfWAsXG4gICAgXCJwb2ludGVyLWV2ZW50c1wiOiBcImFsbFwiLFxuICAgIFwiPiBkaXZcIjoge1xuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBwYWRkaW5nOiBgMCAke3B4KDUpfWAsXG4gICAgICB3aWR0aDogcHgoMTAwKVxuICAgIH0sXG4gICAgXCI+IHNwYW5cIjoge1xuICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICBmb250U2l6ZTogcHgoMjQpXG4gICAgfSxcbiAgICBcIkBtZWRpYSAoYW55LXBvaW50ZXI6IGZpbmUpXCI6IHtcbiAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICBkaXNwbGF5OiBcImZsZXhcIlxuICAgIH1cbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4gKHtcbiAgICBjb2xvcjogc3R5bGUuY1xuICB9KSxcbiAgXCJWb2x1bWVJbmxpbmVSU1dQXCJcbik7XG5mdW5jdGlvbiBWb2x1bWUocHJvcHMpIHtcbiAgY29uc3QgeyBpbmxpbmVWb2x1bWUsIGxheW91dCwgbG9jYWxlLCBwbGF5ZXJQb3NpdGlvbiwgc2V0Vm9sdW1lOiBzZXRWb2x1bWUyLCBzdHlsZXMsIHZvbHVtZSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZTQoZmFsc2UpO1xuICBjb25zdCBbdm9sdW1lU3RhdGUsIHNldFZvbHVtZVN0YXRlXSA9IHVzZVN0YXRlNCh2b2x1bWUpO1xuICBjb25zdCB0aW1lb3V0UmVmID0gdXNlUmVmNCgpO1xuICBjb25zdCBwcmV2aW91c1ZvbHVtZSA9IHVzZVByZXZpb3VzKHZvbHVtZSk7XG4gIGNvbnN0IGlzTWVkaXVtU2NyZWVuID0gdXNlTWVkaWFRdWVyeShcIihtaW4td2lkdGg6IDc2OHB4KVwiKTtcbiAgY29uc3QgaXNJbmxpbmUgPSBsYXlvdXQgPT09IFwicmVzcG9uc2l2ZVwiICYmIGlubGluZVZvbHVtZSAmJiBpc01lZGl1bVNjcmVlbjtcbiAgdXNlRWZmZWN0NCgoKSA9PiB7XG4gICAgaWYgKHByZXZpb3VzVm9sdW1lICE9PSB2b2x1bWUgJiYgdm9sdW1lICE9PSB2b2x1bWVTdGF0ZSkge1xuICAgICAgc2V0Vm9sdW1lU3RhdGUodm9sdW1lKTtcbiAgICB9XG4gIH0sIFtwcmV2aW91c1ZvbHVtZSwgdm9sdW1lLCB2b2x1bWVTdGF0ZV0pO1xuICBjb25zdCBoYW5kbGVDbGlja1RvZ2dsZUxpc3QgPSB1c2VDYWxsYmFjazIoKCkgPT4ge1xuICAgIHNldElzT3BlbigocykgPT4gIXMpO1xuICB9LCBbXSk7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZVNsaWRlciA9ICh7IHgsIHkgfSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gaXNJbmxpbmUgPyB4IDogeTtcbiAgICBjb25zdCBjdXJyZW50dm9sdW1lID0gTWF0aC5yb3VuZCh2YWx1ZSkgLyAxMDA7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgdGltZW91dFJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0Vm9sdW1lMihjdXJyZW50dm9sdW1lKTtcbiAgICB9LCAyNTApO1xuICAgIHNldFZvbHVtZVN0YXRlKGN1cnJlbnR2b2x1bWUpO1xuICB9O1xuICBjb25zdCBoYW5kbGVBZnRlckVuZCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgfSwgMTAwKTtcbiAgfTtcbiAgbGV0IGljb24gPSAvKiBAX19QVVJFX18gKi8ganN4MjUoVm9sdW1lSGlnaCwge30pO1xuICBpZiAodm9sdW1lID09PSAwKSB7XG4gICAgaWNvbiA9IC8qIEBfX1BVUkVfXyAqLyBqc3gyNShWb2x1bWVNdXRlLCB7fSk7XG4gIH0gZWxzZSBpZiAodm9sdW1lIDw9IDAuNCkge1xuICAgIGljb24gPSAvKiBAX19QVVJFX18gKi8ganN4MjUoVm9sdW1lTG93LCB7fSk7XG4gIH0gZWxzZSBpZiAodm9sdW1lIDw9IDAuNykge1xuICAgIGljb24gPSAvKiBAX19QVVJFX18gKi8ganN4MjUoVm9sdW1lSGlnaDIsIHt9KTtcbiAgfVxuICBpZiAoaXNJbmxpbmUpIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHM1KFdyYXBwZXJJbmxpbmUsIHsgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiVm9sdW1lXCIsIFwiZGF0YS12YWx1ZVwiOiB2b2x1bWUsIHN0eWxlOiB7IGM6IHN0eWxlcy5jb2xvciB9LCBjaGlsZHJlbjogW1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeDI1KFwic3BhblwiLCB7IGNoaWxkcmVuOiBpY29uIH0pLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeDI1KFwiZGl2XCIsIHsgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3gyNShcbiAgICAgICAgUmFuZ2VTbGlkZXIyLFxuICAgICAgICB7XG4gICAgICAgICAgYXhpczogXCJ4XCIsXG4gICAgICAgICAgY2xhc3NOYW1lOiBcInZvbHVtZVwiLFxuICAgICAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcInZvbHVtZS1iYXJcIixcbiAgICAgICAgICBvbkFmdGVyRW5kOiBoYW5kbGVBZnRlckVuZCxcbiAgICAgICAgICBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlU2xpZGVyLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICB0aHVtYkJvcmRlcjogMCxcbiAgICAgICAgICAgICAgdGh1bWJCb3JkZXJSYWRpdXM6IHN0eWxlcy5zbGlkZXJIYW5kbGVCb3JkZXJSYWRpdXMsXG4gICAgICAgICAgICAgIHRodW1iQ29sb3I6IHN0eWxlcy5zbGlkZXJIYW5kbGVDb2xvcixcbiAgICAgICAgICAgICAgaGVpZ2h0OiA0LFxuICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICByYW5nZUNvbG9yOiBzdHlsZXMuc2xpZGVyQ29sb3IsXG4gICAgICAgICAgICAgIHRyYWNrQm9yZGVyUmFkaXVzOiBzdHlsZXMuc2xpZGVyVHJhY2tCb3JkZXJSYWRpdXMsXG4gICAgICAgICAgICAgIHRyYWNrQ29sb3I6IHN0eWxlcy5zbGlkZXJUcmFja0NvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB4OiB2b2x1bWUgKiAxMDAsXG4gICAgICAgICAgeE1heDogMTAwLFxuICAgICAgICAgIHhNaW46IDBcbiAgICAgICAgfVxuICAgICAgKSB9KVxuICAgIF0gfSk7XG4gIH1cbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3gyNShDbGlja091dHNpZGVfZGVmYXVsdCwgeyBpc0FjdGl2ZTogaXNPcGVuLCBvbkNsaWNrOiBoYW5kbGVDbGlja1RvZ2dsZUxpc3QsIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4czUoXG4gICAgV3JhcHBlcldpdGhUb2dnbGUsXG4gICAge1xuICAgICAgXCJkYXRhLWNvbXBvbmVudC1uYW1lXCI6IFwiVm9sdW1lXCIsXG4gICAgICBcImRhdGEtdmFsdWVcIjogdm9sdW1lLFxuICAgICAgc3R5bGU6IHsgYzogc3R5bGVzLmNvbG9yLCBsYXlvdXQsIHA6IHBsYXllclBvc2l0aW9uIH0sXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICBpc09wZW4gJiYgLyogQF9fUFVSRV9fICovIGpzeHM1KFwiZGl2XCIsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4MjUoXG4gICAgICAgICAgICBSYW5nZVNsaWRlcjIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF4aXM6IFwieVwiLFxuICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidm9sdW1lXCIsXG4gICAgICAgICAgICAgIFwiZGF0YS1jb21wb25lbnQtbmFtZVwiOiBcInZvbHVtZS1iYXJcIixcbiAgICAgICAgICAgICAgb25BZnRlckVuZDogaGFuZGxlQWZ0ZXJFbmQsXG4gICAgICAgICAgICAgIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2VTbGlkZXIsXG4gICAgICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgICByYW5nZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgIHRodW1iQm9yZGVyOiAwLFxuICAgICAgICAgICAgICAgICAgdGh1bWJCb3JkZXJSYWRpdXM6IDEyLFxuICAgICAgICAgICAgICAgICAgdGh1bWJDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICB0aHVtYlNpemU6IDEyLFxuICAgICAgICAgICAgICAgICAgdHJhY2tDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSlcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiA2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB5OiB2b2x1bWUgKiAxMDAsXG4gICAgICAgICAgICAgIHlNYXg6IDEwMCxcbiAgICAgICAgICAgICAgeU1pbjogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICksXG4gICAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDI1KFwic3BhblwiLCB7fSlcbiAgICAgICAgXSB9KSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeDI1KFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGxvY2FsZS52b2x1bWUsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiQnV0dG9uUlNXUFwiLFxuICAgICAgICAgICAgb25DbGljazogaGFuZGxlQ2xpY2tUb2dnbGVMaXN0LFxuICAgICAgICAgICAgdGl0bGU6IGxvY2FsZS52b2x1bWUsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IGljb25cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG4gICkgfSk7XG59XG5cbi8vIHNyYy9jb21wb25lbnRzL1dyYXBwZXIudHN4XG5pbXBvcnQgeyBtZW1vIGFzIG1lbW82IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBqc3ggYXMganN4MjYgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBTdHlsZWRXcmFwcGVyID0gc3R5bGVkKFwiZGl2XCIpKFxuICB7XG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgIGZsZXhXcmFwOiBcIndyYXBcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgIFwiPiAqXCI6IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIlxuICAgIH1cbiAgfSxcbiAgKHsgc3R5bGUgfSkgPT4ge1xuICAgIGxldCBzdHlsZXMgPSB7fTtcbiAgICBpZiAoc3R5bGUubGF5b3V0ID09PSBcInJlc3BvbnNpdmVcIikge1xuICAgICAgc3R5bGVzID0ge1xuICAgICAgICBcIj4gKlwiOiB7XG4gICAgICAgICAgXCJAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpXCI6IHtcbiAgICAgICAgICAgIHdpZHRoOiBcIjMzLjMzMzMlXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KVwiOiB7XG4gICAgICAgICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcbiAgICAgICAgICBwYWRkaW5nOiBgMCAke3B4KDgpfWBcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG1pbkhlaWdodDogcHgoc3R5bGUuaCksXG4gICAgICAuLi5zdHlsZXNcbiAgICB9O1xuICB9LFxuICBcIldyYXBwZXJSU1dQXCJcbik7XG5mdW5jdGlvbiBXcmFwcGVyOChwcm9wcykge1xuICBjb25zdCB7IGNoaWxkcmVuLCBsYXlvdXQsIHN0eWxlcyB9ID0gcHJvcHM7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjYoU3R5bGVkV3JhcHBlciwgeyBcImRhdGEtY29tcG9uZW50LW5hbWVcIjogXCJXcmFwcGVyXCIsIHN0eWxlOiB7IGg6IHN0eWxlcy5oZWlnaHQsIGxheW91dCB9LCBjaGlsZHJlbiB9KTtcbn1cbnZhciBXcmFwcGVyX2RlZmF1bHQgPSBtZW1vNihXcmFwcGVyOCk7XG5cbi8vIHNyYy9pbmRleC50c3hcbmltcG9ydCB7IGpzeCBhcyBqc3gyNywganN4cyBhcyBqc3hzNiB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xucHV0KFwiLlBsYXllclJTV1BcIiwge1xuICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICBmb250U2l6ZTogXCJpbmhlcml0XCIsXG4gIHdpZHRoOiBcIjEwMCVcIixcbiAgXCIqXCI6IHtcbiAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiXG4gIH0sXG4gIHA6IHtcbiAgICBtYXJnaW46IDBcbiAgfVxufSk7XG5wdXQoXCIuQnV0dG9uUlNXUFwiLCB7XG4gIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICBiYWNrZ3JvdW5kOiBcInRyYW5zcGFyZW50XCIsXG4gIGJvcmRlcjogMCxcbiAgYm9yZGVyUmFkaXVzOiAwLFxuICBjb2xvcjogXCJpbmhlcml0XCIsXG4gIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gIGRpc3BsYXk6IFwiaW5saW5lLWZsZXhcIixcbiAgbGluZUhlaWdodDogMSxcbiAgcGFkZGluZzogMCxcbiAgXCI6Zm9jdXNcIjoge1xuICAgIG91dGxpbmVDb2xvcjogXCIjMDAwXCIsXG4gICAgb3V0bGluZU9mZnNldDogM1xuICB9XG59KTtcbnZhciBTcG90aWZ5V2ViUGxheWVyID0gY2xhc3MgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHtcbiAgaXNNb3VudGVkID0gZmFsc2U7XG4gIGVtcHR5VHJhY2sgPSB7XG4gICAgYXJ0aXN0czogW10sXG4gICAgZHVyYXRpb25NczogMCxcbiAgICBpZDogXCJcIixcbiAgICBpbWFnZTogXCJcIixcbiAgICBuYW1lOiBcIlwiLFxuICAgIHVyaTogXCJcIlxuICB9O1xuICBsb2NhbGU7XG4gIHBsYXllcjtcbiAgcGxheWVyUHJvZ3Jlc3NJbnRlcnZhbDtcbiAgcGxheWVyU3luY0ludGVydmFsO1xuICByZWYgPSBjcmVhdGVSZWYoKTtcbiAgcmVuZGVySW5saW5lQWN0aW9ucyA9IGZhbHNlO1xuICByZXNpemVUaW1lb3V0O1xuICBzZWVrVXBkYXRlSW50ZXJ2YWwgPSAxMDA7XG4gIHN0eWxlcztcbiAgc3luY1RpbWVvdXQ7XG4gIGdldFBsYXlPcHRpb25zID0gbWVtb2l6ZSgoaWRzKSA9PiB7XG4gICAgY29uc3QgcGxheU9wdGlvbnMgPSB7XG4gICAgICBjb250ZXh0X3VyaTogdm9pZCAwLFxuICAgICAgdXJpczogdm9pZCAwXG4gICAgfTtcbiAgICBpZiAoaWRzKSB7XG4gICAgICBpZiAoIWlkcy5ldmVyeSgoZCkgPT4gdmFsaWRhdGVVUkkoZCkpKSB7XG4gICAgICAgIHJldHVybiBwbGF5T3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGlmIChpZHMuc29tZSgoZCkgPT4gZ2V0U3BvdGlmeVVSSVR5cGUoZCkgPT09IFwidHJhY2tcIikpIHtcbiAgICAgICAgaWYgKCFpZHMuZXZlcnkoKGQpID0+IGdldFNwb3RpZnlVUklUeXBlKGQpID09PSBcInRyYWNrXCIpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiWW91IGNhbid0IG1peCB0cmFja3MgVVJJcyB3aXRoIG90aGVyIHR5cGVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHBsYXlPcHRpb25zLnVyaXMgPSBpZHMuZmlsdGVyKChkKSA9PiB2YWxpZGF0ZVVSSShkKSAmJiBnZXRTcG90aWZ5VVJJVHlwZShkKSA9PT0gXCJ0cmFja1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIkFsYnVtcywgQXJ0aXN0cywgUGxheWxpc3RzIGFuZCBQb2RjYXN0cyBjYW4ndCBoYXZlIG11bHRpcGxlIFVSSXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgcGxheU9wdGlvbnMuY29udGV4dF91cmkgPSBpZHNbMF07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwbGF5T3B0aW9ucztcbiAgfSk7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50RGV2aWNlSWQ6IFwiXCIsXG4gICAgICBkZXZpY2VJZDogXCJcIixcbiAgICAgIGRldmljZXM6IFtdLFxuICAgICAgZXJyb3I6IFwiXCIsXG4gICAgICBlcnJvclR5cGU6IG51bGwsXG4gICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICBpc0luaXRpYWxpemluZzogZmFsc2UsXG4gICAgICBpc01hZ25pZmllZDogZmFsc2UsXG4gICAgICBpc1BsYXlpbmc6IGZhbHNlLFxuICAgICAgaXNTYXZlZDogZmFsc2UsXG4gICAgICBpc1Vuc3VwcG9ydGVkOiBmYWxzZSxcbiAgICAgIG5lZWRzVXBkYXRlOiBmYWxzZSxcbiAgICAgIG5leHRUcmFja3M6IFtdLFxuICAgICAgcGxheWVyUG9zaXRpb246IFwiYm90dG9tXCIsXG4gICAgICBwb3NpdGlvbjogMCxcbiAgICAgIHByZXZpb3VzVHJhY2tzOiBbXSxcbiAgICAgIHByb2dyZXNzTXM6IDAsXG4gICAgICByZXBlYXQ6IFwib2ZmXCIsXG4gICAgICBzaHVmZmxlOiBmYWxzZSxcbiAgICAgIHN0YXR1czogU1RBVFVTLklETEUsXG4gICAgICB0cmFjazogdGhpcy5lbXB0eVRyYWNrLFxuICAgICAgdm9sdW1lOiBwYXJzZVZvbHVtZShwcm9wcy5pbml0aWFsVm9sdW1lKSB8fCAxXG4gICAgfTtcbiAgICB0aGlzLmxvY2FsZSA9IGdldExvY2FsZShwcm9wcy5sb2NhbGUpO1xuICAgIHRoaXMuc3R5bGVzID0gZ2V0TWVyZ2VkU3R5bGVzKHByb3BzLnN0eWxlcyk7XG4gIH1cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBhdXRvUGxheTogZmFsc2UsXG4gICAgaW5pdGlhbFZvbHVtZTogMSxcbiAgICBtYWduaWZ5U2xpZGVyT25Ib3ZlcjogZmFsc2UsXG4gICAgbmFtZTogXCJTcG90aWZ5IFdlYiBQbGF5ZXJcIixcbiAgICBwZXJzaXN0RGV2aWNlU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBzaG93U2F2ZUljb246IGZhbHNlLFxuICAgIHN5bmNFeHRlcm5hbERldmljZUludGVydmFsOiA1LFxuICAgIHN5bmNFeHRlcm5hbERldmljZTogZmFsc2VcbiAgfTtcbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5pc01vdW50ZWQgPSB0cnVlO1xuICAgIGNvbnN0IHsgdG9wID0gMCB9ID0gdGhpcy5yZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgPz8ge307XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBwbGF5ZXJQb3NpdGlvbjogdG9wID4gd2luZG93LmlubmVySGVpZ2h0IC8gMiA/IFwiYm90dG9tXCIgOiBcInRvcFwiLFxuICAgICAgc3RhdHVzOiBTVEFUVVMuSU5JVElBTElaSU5HXG4gICAgfSk7XG4gICAgaWYgKCF3aW5kb3cub25TcG90aWZ5V2ViUGxheWJhY2tTREtSZWFkeSkge1xuICAgICAgd2luZG93Lm9uU3BvdGlmeVdlYlBsYXliYWNrU0RLUmVhZHkgPSB0aGlzLmluaXRpYWxpemVQbGF5ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVBsYXllcigpO1xuICAgIH1cbiAgICBhd2FpdCBsb2FkU3BvdGlmeVBsYXllcigpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuICB9XG4gIGFzeW5jIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2aW91c1Byb3BzLCBwcmV2aW91c1N0YXRlKSB7XG4gICAgY29uc3QgeyBjdXJyZW50RGV2aWNlSWQsIGRldmljZUlkLCBpc0luaXRpYWxpemluZywgaXNQbGF5aW5nLCByZXBlYXQ6IHJlcGVhdDIsIHNodWZmbGU6IHNodWZmbGUyLCBzdGF0dXMsIHRyYWNrIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGF1dG9QbGF5LFxuICAgICAgbGF5b3V0LFxuICAgICAgbG9jYWxlLFxuICAgICAgb2Zmc2V0LFxuICAgICAgcGxheTogcGxheVByb3AsXG4gICAgICBzaG93U2F2ZUljb24sXG4gICAgICBzdHlsZXMsXG4gICAgICBzeW5jRXh0ZXJuYWxEZXZpY2UsXG4gICAgICB1cmlzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNSZWFkeSA9IHByZXZpb3VzU3RhdGUuc3RhdHVzICE9PSBTVEFUVVMuUkVBRFkgJiYgc3RhdHVzID09PSBTVEFUVVMuUkVBRFk7XG4gICAgY29uc3QgcGxheU9wdGlvbnMgPSB0aGlzLmdldFBsYXlPcHRpb25zKGdldFVSSXModXJpcykpO1xuICAgIGNvbnN0IGNhblBsYXkgPSAhIWN1cnJlbnREZXZpY2VJZCAmJiAhIShwbGF5T3B0aW9ucy5jb250ZXh0X3VyaSA/PyBwbGF5T3B0aW9ucy51cmlzKTtcbiAgICBjb25zdCBzaG91bGRQbGF5ID0gaXNSZWFkeSAmJiAoYXV0b1BsYXkgfHwgcGxheVByb3ApO1xuICAgIGlmIChjYW5QbGF5ICYmIHNob3VsZFBsYXkpIHtcbiAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUGxheSh0cnVlKTtcbiAgICAgIGlmICghaXNQbGF5aW5nKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpc1BsYXlpbmc6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc0V4dGVybmFsUGxheWVyKSB7XG4gICAgICAgIHRoaXMuc3luY1RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgICAgIH0sIDYwMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNFcXVhbChwcmV2aW91c1Byb3BzLnVyaXMsIHVyaXMpKSB7XG4gICAgICBpZiAoaXNQbGF5aW5nIHx8IHBsYXlQcm9wKSB7XG4gICAgICAgIGF3YWl0IHRoaXMudG9nZ2xlUGxheSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoeyBuZWVkc1VwZGF0ZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByZXZpb3VzUHJvcHMucGxheSAhPT0gcGxheVByb3AgJiYgcGxheVByb3AgIT09IGlzUGxheWluZykge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGVQbGF5KCF0cmFjay5pZCk7XG4gICAgfVxuICAgIGlmIChwcmV2aW91c1N0YXRlLnN0YXR1cyAhPT0gc3RhdHVzKSB7XG4gICAgICB0aGlzLmhhbmRsZUNhbGxiYWNrKHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgdHlwZTogVFlQRS5TVEFUVVNcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJldmlvdXNTdGF0ZS5jdXJyZW50RGV2aWNlSWQgIT09IGN1cnJlbnREZXZpY2VJZCAmJiBjdXJyZW50RGV2aWNlSWQpIHtcbiAgICAgIGlmICghaXNSZWFkeSkge1xuICAgICAgICB0aGlzLmhhbmRsZUNhbGxiYWNrKHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIHR5cGU6IFRZUEUuREVWSUNFXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy50b2dnbGVTeW5jSW50ZXJ2YWwodGhpcy5pc0V4dGVybmFsUGxheWVyKTtcbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlU2Vla0JhcigpO1xuICAgIH1cbiAgICBpZiAocHJldmlvdXNTdGF0ZS50cmFjay5pZCAhPT0gdHJhY2suaWQgJiYgdHJhY2suaWQpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2FsbGJhY2soe1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICB0eXBlOiBUWVBFLlRSQUNLXG4gICAgICB9KTtcbiAgICAgIGlmIChzaG93U2F2ZUljb24pIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGlzU2F2ZWQ6IGZhbHNlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJldmlvdXNTdGF0ZS5pc1BsYXlpbmcgIT09IGlzUGxheWluZykge1xuICAgICAgdGhpcy50b2dnbGVQcm9ncmVzc0JhcigpO1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGVTeW5jSW50ZXJ2YWwodGhpcy5pc0V4dGVybmFsUGxheWVyKTtcbiAgICAgIHRoaXMuaGFuZGxlQ2FsbGJhY2soe1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICB0eXBlOiBUWVBFLlBMQVlFUlxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwcmV2aW91c1N0YXRlLnJlcGVhdCAhPT0gcmVwZWF0MiB8fCBwcmV2aW91c1N0YXRlLnNodWZmbGUgIT09IHNodWZmbGUyKSB7XG4gICAgICB0aGlzLmhhbmRsZUNhbGxiYWNrKHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgdHlwZTogVFlQRS5QTEFZRVJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJldmlvdXNQcm9wcy5vZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgYXdhaXQgdGhpcy50b2dnbGVPZmZzZXQoKTtcbiAgICB9XG4gICAgaWYgKHByZXZpb3VzU3RhdGUuaXNJbml0aWFsaXppbmcgJiYgIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICBpZiAoc3luY0V4dGVybmFsRGV2aWNlICYmICF1cmlzKSB7XG4gICAgICAgIGNvbnN0IHBsYXllclN0YXRlID0gYXdhaXQgZ2V0UGxheWJhY2tTdGF0ZSh0aGlzLnRva2VuKTtcbiAgICAgICAgaWYgKHBsYXllclN0YXRlPy5pc19wbGF5aW5nICYmIHBsYXllclN0YXRlLmRldmljZS5pZCAhPT0gZGV2aWNlSWQpIHtcbiAgICAgICAgICB0aGlzLnNldEV4dGVybmFsRGV2aWNlKHBsYXllclN0YXRlLmRldmljZS5pZCA/PyBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJldmlvdXNQcm9wcy5sYXlvdXQgIT09IGxheW91dCkge1xuICAgICAgdGhpcy5oYW5kbGVSZXNpemUoKTtcbiAgICB9XG4gICAgaWYgKCFpc0VxdWFsKHByZXZpb3VzUHJvcHMubG9jYWxlLCBsb2NhbGUpKSB7XG4gICAgICB0aGlzLmxvY2FsZSA9IGdldExvY2FsZShsb2NhbGUpO1xuICAgIH1cbiAgICBpZiAoIWlzRXF1YWwocHJldmlvdXNQcm9wcy5zdHlsZXMsIHN0eWxlcykpIHtcbiAgICAgIHRoaXMuc3R5bGVzID0gZ2V0TWVyZ2VkU3R5bGVzKHN0eWxlcyk7XG4gICAgfVxuICB9XG4gIGFzeW5jIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuaXNNb3VudGVkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICB0aGlzLnBsYXllci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5ZXJTeW5jSW50ZXJ2YWwpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5ZXJQcm9ncmVzc0ludGVydmFsKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zeW5jVGltZW91dCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5oYW5kbGVSZXNpemUpO1xuICB9XG4gIGhhbmRsZUNhbGxiYWNrKHN0YXRlKSB7XG4gICAgY29uc3QgeyBjYWxsYmFjayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKHN0YXRlKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlQ2hhbmdlUmFuZ2UgPSBhc3luYyAocG9zaXRpb24pID0+IHtcbiAgICBjb25zdCB7IHRyYWNrIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgY2FsbGJhY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHByb2dyZXNzID0gMDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGVyY2VudGFnZSA9IHBvc2l0aW9uIC8gMTAwO1xuICAgICAgbGV0IHN0YXRlQ2hhbmdlcyA9IHt9O1xuICAgICAgaWYgKHRoaXMuaXNFeHRlcm5hbFBsYXllcikge1xuICAgICAgICBwcm9ncmVzcyA9IE1hdGgucm91bmQodHJhY2suZHVyYXRpb25NcyAqIHBlcmNlbnRhZ2UpO1xuICAgICAgICBhd2FpdCBzZWVrKHRoaXMudG9rZW4sIHByb2dyZXNzKTtcbiAgICAgICAgc3RhdGVDaGFuZ2VzID0ge1xuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHByb2dyZXNzTXM6IHByb2dyZXNzXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgdGhpcy5wbGF5ZXIuZ2V0Q3VycmVudFN0YXRlKCk7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5yb3VuZChzdGF0ZS50cmFja193aW5kb3cuY3VycmVudF90cmFjay5kdXJhdGlvbl9tcyAqIHBlcmNlbnRhZ2UpO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGxheWVyLnNlZWsocHJvZ3Jlc3MpO1xuICAgICAgICAgIHN0YXRlQ2hhbmdlcyA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgcHJvZ3Jlc3NNczogcHJvZ3Jlc3NcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlQ2hhbmdlcyA9IHsgcG9zaXRpb246IDAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZShzdGF0ZUNoYW5nZXMpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIC4uLnN0YXRlQ2hhbmdlcyxcbiAgICAgICAgICB0eXBlOiBUWVBFLlBST0dSRVNTXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGhhbmRsZUNsaWNrVG9nZ2xlUGxheSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGlzQWN0aXZlIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnRvZ2dsZVBsYXkoIXRoaXMuaXNFeHRlcm5hbFBsYXllciAmJiAhaXNBY3RpdmUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGhhbmRsZUNsaWNrUHJldmlvdXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIpIHtcbiAgICAgICAgYXdhaXQgcHJldmlvdXModGhpcy50b2tlbik7XG4gICAgICAgIHRoaXMuc3luY1RpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGxheWVyLnByZXZpb3VzVHJhY2soKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9O1xuICBoYW5kbGVDbGlja05leHQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIpIHtcbiAgICAgICAgYXdhaXQgbmV4dCh0aGlzLnRva2VuKTtcbiAgICAgICAgdGhpcy5zeW5jVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnN5bmNEZXZpY2UoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIubmV4dFRyYWNrKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlQ2xpY2tEZXZpY2UgPSBhc3luYyAoZGV2aWNlSWQpID0+IHtcbiAgICBjb25zdCB7IGlzVW5zdXBwb3J0ZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBhdXRvUGxheSwgcGVyc2lzdERldmljZVNlbGVjdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHsgY3VycmVudERldmljZUlkOiBkZXZpY2VJZCB9KTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgc2V0RGV2aWNlKHRoaXMudG9rZW4sIGRldmljZUlkKTtcbiAgICAgIGlmIChwZXJzaXN0RGV2aWNlU2VsZWN0aW9uKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJyc3dwRGV2aWNlSWRcIiwgZGV2aWNlSWQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVW5zdXBwb3J0ZWQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgICAgIGNvbnN0IHBsYXllclN0YXRlID0gYXdhaXQgZ2V0UGxheWJhY2tTdGF0ZSh0aGlzLnRva2VuKTtcbiAgICAgICAgaWYgKHBsYXllclN0YXRlICYmICFwbGF5ZXJTdGF0ZS5pc19wbGF5aW5nICYmIGF1dG9QbGF5KSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy50b2dnbGVQbGF5KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlRmF2b3JpdGVTdGF0dXNDaGFuZ2UgPSAoc3RhdHVzKSA9PiB7XG4gICAgY29uc3QgeyBpc1NhdmVkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMudXBkYXRlU3RhdGUoeyBpc1NhdmVkOiBzdGF0dXMgfSk7XG4gICAgaWYgKGlzU2F2ZWQgIT09IHN0YXR1cykge1xuICAgICAgdGhpcy5oYW5kbGVDYWxsYmFjayh7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgIGlzU2F2ZWQ6IHN0YXR1cyxcbiAgICAgICAgdHlwZTogVFlQRS5GQVZPUklURVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBoYW5kbGVQbGF5ZXJFcnJvcnMgPSBhc3luYyAodHlwZSwgbWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzUGxheWJhY2tFcnJvciA9IHR5cGUgPT09IEVSUk9SX1RZUEUuUExBWUJBQ0s7XG4gICAgY29uc3QgaXNJbml0aWFsaXphdGlvbkVycm9yID0gdHlwZSA9PT0gRVJST1JfVFlQRS5JTklUSUFMSVpBVElPTjtcbiAgICBsZXQgbmV4dFN0YXR1cyA9IHN0YXR1cztcbiAgICBsZXQgZGV2aWNlcyA9IFtdO1xuICAgIGlmICh0aGlzLnBsYXllciAmJiAhaXNQbGF5YmFja0Vycm9yKSB7XG4gICAgICB0aGlzLnBsYXllci5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLnBsYXllciA9IHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKGlzSW5pdGlhbGl6YXRpb25FcnJvcikge1xuICAgICAgbmV4dFN0YXR1cyA9IFNUQVRVUy5VTlNVUFBPUlRFRDtcbiAgICAgICh7IGRldmljZXMgPSBbXSB9ID0gYXdhaXQgZ2V0RGV2aWNlcyh0aGlzLnRva2VuKSk7XG4gICAgfSBlbHNlIGlmICghaXNQbGF5YmFja0Vycm9yKSB7XG4gICAgICBuZXh0U3RhdHVzID0gU1RBVFVTLkVSUk9SO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGRldmljZXMsXG4gICAgICBlcnJvcjogbWVzc2FnZSxcbiAgICAgIGVycm9yVHlwZTogdHlwZSxcbiAgICAgIGlzSW5pdGlhbGl6aW5nOiBmYWxzZSxcbiAgICAgIGlzVW5zdXBwb3J0ZWQ6IGlzSW5pdGlhbGl6YXRpb25FcnJvcixcbiAgICAgIHN0YXR1czogbmV4dFN0YXR1c1xuICAgIH0pO1xuICB9O1xuICBoYW5kbGVQbGF5ZXJTdGF0ZUNoYW5nZXMgPSBhc3luYyAoc3RhdGUpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXVzZWQsXG4gICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgcmVwZWF0X21vZGUsXG4gICAgICAgICAgc2h1ZmZsZTogc2h1ZmZsZTIsXG4gICAgICAgICAgdHJhY2tfd2luZG93OiB7IGN1cnJlbnRfdHJhY2ssIG5leHRfdHJhY2tzLCBwcmV2aW91c190cmFja3MgfVxuICAgICAgICB9ID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IGlzUGxheWluZyA9ICFwYXVzZWQ7XG4gICAgICAgIGNvbnN0IHZvbHVtZSA9IGF3YWl0IHRoaXMucGxheWVyPy5nZXRWb2x1bWUoKSA/PyAxMDA7XG4gICAgICAgIGxldCB0cmFja1N0YXRlID0ge307XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMCAmJiBjdXJyZW50X3RyYWNrKSB7XG4gICAgICAgICAgdHJhY2tTdGF0ZSA9IHtcbiAgICAgICAgICAgIG5leHRUcmFja3M6IG5leHRfdHJhY2tzLm1hcChjb252ZXJ0VHJhY2spLFxuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICBwcmV2aW91c1RyYWNrczogcHJldmlvdXNfdHJhY2tzLm1hcChjb252ZXJ0VHJhY2spLFxuICAgICAgICAgICAgdHJhY2s6IGNvbnZlcnRUcmFjayhjdXJyZW50X3RyYWNrKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICAgICAgZXJyb3I6IFwiXCIsXG4gICAgICAgICAgZXJyb3JUeXBlOiBudWxsLFxuICAgICAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgICAgIGlzUGxheWluZyxcbiAgICAgICAgICBwcm9ncmVzc01zOiBwb3NpdGlvbixcbiAgICAgICAgICByZXBlYXQ6IGdldFJlcGVhdFN0YXRlKHJlcGVhdF9tb2RlKSxcbiAgICAgICAgICBzaHVmZmxlOiBzaHVmZmxlMixcbiAgICAgICAgICB2b2x1bWU6IHJvdW5kKHZvbHVtZSksXG4gICAgICAgICAgLi4udHJhY2tTdGF0ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0V4dGVybmFsUGxheWVyKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3luY0RldmljZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIGlzUGxheWluZzogZmFsc2UsXG4gICAgICAgICAgbmV4dFRyYWNrczogW10sXG4gICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgcHJldmlvdXNUcmFja3M6IFtdLFxuICAgICAgICAgIHRyYWNrOiB7XG4gICAgICAgICAgICBhcnRpc3RzOiBbXSxcbiAgICAgICAgICAgIGR1cmF0aW9uTXM6IDAsXG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGltYWdlOiBcIlwiLFxuICAgICAgICAgICAgbmFtZTogXCJcIixcbiAgICAgICAgICAgIHVyaTogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlUGxheWVyU3RhdHVzID0gYXN5bmMgKHsgZGV2aWNlX2lkIH0pID0+IHtcbiAgICBjb25zdCB7IGN1cnJlbnREZXZpY2VJZCwgZGV2aWNlcyB9ID0gYXdhaXQgdGhpcy5pbml0aWFsaXplRGV2aWNlcyhkZXZpY2VfaWQpO1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgY3VycmVudERldmljZUlkLFxuICAgICAgZGV2aWNlSWQ6IGRldmljZV9pZCxcbiAgICAgIGRldmljZXMsXG4gICAgICBpc0luaXRpYWxpemluZzogZmFsc2UsXG4gICAgICBzdGF0dXM6IGRldmljZV9pZCA/IFNUQVRVUy5SRUFEWSA6IFNUQVRVUy5JRExFXG4gICAgfSk7XG4gIH07XG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxheW91dCA9IFwicmVzcG9uc2l2ZVwiIH0gPSB0aGlzLnByb3BzO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpO1xuICAgIHRoaXMucmVzaXplVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVySW5saW5lQWN0aW9ucyA9IHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCAmJiBsYXlvdXQgPT09IFwicmVzcG9uc2l2ZVwiO1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH0sIDEwMCk7XG4gIH07XG4gIGhhbmRsZVRvZ2dsZU1hZ25pZnkgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBtYWduaWZ5U2xpZGVyT25Ib3ZlciB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobWFnbmlmeVNsaWRlck9uSG92ZXIpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUoKHByZXZpb3VzU3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHsgaXNNYWduaWZpZWQ6ICFwcmV2aW91c1N0YXRlLmlzTWFnbmlmaWVkIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGdldCB0b2tlbigpIHtcbiAgICBjb25zdCB7IHRva2VuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuICBhc3luYyBpbml0aWFsaXplRGV2aWNlcyhpZCkge1xuICAgIGNvbnN0IHsgcGVyc2lzdERldmljZVNlbGVjdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGRldmljZXMgfSA9IGF3YWl0IGdldERldmljZXModGhpcy50b2tlbik7XG4gICAgbGV0IGN1cnJlbnREZXZpY2VJZCA9IGlkO1xuICAgIGlmIChwZXJzaXN0RGV2aWNlU2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBzYXZlZERldmljZUlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInJzd3BEZXZpY2VJZFwiKTtcbiAgICAgIGlmICghc2F2ZWREZXZpY2VJZCB8fCAhZGV2aWNlcy5zb21lKChkKSA9PiBkLmlkID09PSBzYXZlZERldmljZUlkKSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwicnN3cERldmljZUlkXCIsIGN1cnJlbnREZXZpY2VJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50RGV2aWNlSWQgPSBzYXZlZERldmljZUlkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBjdXJyZW50RGV2aWNlSWQsIGRldmljZXMgfTtcbiAgfVxuICBpbml0aWFsaXplUGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdm9sdW1lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGdldE9BdXRoVG9rZW4gPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy50b2tlbik7XG4gICAgICB9LFxuICAgICAgZ2V0UGxheWVyLFxuICAgICAgbmFtZSA9IFwiU3BvdGlmeSBXZWIgUGxheWVyXCJcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXdpbmRvdy5TcG90aWZ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgZXJyb3I6IFwiXCIsXG4gICAgICBlcnJvclR5cGU6IG51bGwsXG4gICAgICBpc0luaXRpYWxpemluZzogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMucGxheWVyID0gbmV3IHdpbmRvdy5TcG90aWZ5LlBsYXllcih7XG4gICAgICBnZXRPQXV0aFRva2VuLFxuICAgICAgbmFtZSxcbiAgICAgIHZvbHVtZVxuICAgIH0pO1xuICAgIHRoaXMucGxheWVyLmFkZExpc3RlbmVyKFwicmVhZHlcIiwgdGhpcy5oYW5kbGVQbGF5ZXJTdGF0dXMpO1xuICAgIHRoaXMucGxheWVyLmFkZExpc3RlbmVyKFwibm90X3JlYWR5XCIsIHRoaXMuaGFuZGxlUGxheWVyU3RhdHVzKTtcbiAgICB0aGlzLnBsYXllci5hZGRMaXN0ZW5lcihcInBsYXllcl9zdGF0ZV9jaGFuZ2VkXCIsIHRoaXMuaGFuZGxlUGxheWVyU3RhdGVDaGFuZ2VzKTtcbiAgICB0aGlzLnBsYXllci5hZGRMaXN0ZW5lcihcbiAgICAgIFwiaW5pdGlhbGl6YXRpb25fZXJyb3JcIixcbiAgICAgIChlcnJvcikgPT4gdGhpcy5oYW5kbGVQbGF5ZXJFcnJvcnMoRVJST1JfVFlQRS5JTklUSUFMSVpBVElPTiwgZXJyb3IubWVzc2FnZSlcbiAgICApO1xuICAgIHRoaXMucGxheWVyLmFkZExpc3RlbmVyKFxuICAgICAgXCJhdXRoZW50aWNhdGlvbl9lcnJvclwiLFxuICAgICAgKGVycm9yKSA9PiB0aGlzLmhhbmRsZVBsYXllckVycm9ycyhFUlJPUl9UWVBFLkFVVEhFTlRJQ0FUSU9OLCBlcnJvci5tZXNzYWdlKVxuICAgICk7XG4gICAgdGhpcy5wbGF5ZXIuYWRkTGlzdGVuZXIoXG4gICAgICBcImFjY291bnRfZXJyb3JcIixcbiAgICAgIChlcnJvcikgPT4gdGhpcy5oYW5kbGVQbGF5ZXJFcnJvcnMoRVJST1JfVFlQRS5BQ0NPVU5ULCBlcnJvci5tZXNzYWdlKVxuICAgICk7XG4gICAgdGhpcy5wbGF5ZXIuYWRkTGlzdGVuZXIoXG4gICAgICBcInBsYXliYWNrX2Vycm9yXCIsXG4gICAgICAoZXJyb3IpID0+IHRoaXMuaGFuZGxlUGxheWVyRXJyb3JzKEVSUk9SX1RZUEUuUExBWUJBQ0ssIGVycm9yLm1lc3NhZ2UpXG4gICAgKTtcbiAgICB0aGlzLnBsYXllci5hZGRMaXN0ZW5lcihcImF1dG9wbGF5X2ZhaWxlZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkF1dG9wbGF5IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSBicm93c2VyIGF1dG9wbGF5IHJ1bGVzXCIpO1xuICAgIH0pO1xuICAgIHRoaXMucGxheWVyLmNvbm5lY3QoKTtcbiAgICBpZiAoZ2V0UGxheWVyKSB7XG4gICAgICBnZXRQbGF5ZXIodGhpcy5wbGF5ZXIpO1xuICAgIH1cbiAgfTtcbiAgZ2V0IGlzRXh0ZXJuYWxQbGF5ZXIoKSB7XG4gICAgY29uc3QgeyBjdXJyZW50RGV2aWNlSWQsIGRldmljZUlkLCBzdGF0dXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIGN1cnJlbnREZXZpY2VJZCAmJiBjdXJyZW50RGV2aWNlSWQgIT09IGRldmljZUlkIHx8IHN0YXR1cyA9PT0gU1RBVFVTLlVOU1VQUE9SVEVEO1xuICB9XG4gIHNldEV4dGVybmFsRGV2aWNlID0gKGlkKSA9PiB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7IGN1cnJlbnREZXZpY2VJZDogaWQsIGlzUGxheWluZzogdHJ1ZSB9KTtcbiAgfTtcbiAgc2V0Vm9sdW1lID0gYXN5bmMgKHZvbHVtZSkgPT4ge1xuICAgIGlmICh0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIpIHtcbiAgICAgIGF3YWl0IHNldFZvbHVtZSh0aGlzLnRva2VuLCBNYXRoLnJvdW5kKHZvbHVtZSAqIDEwMCkpO1xuICAgICAgYXdhaXQgdGhpcy5zeW5jRGV2aWNlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlU3RhdGUoeyB2b2x1bWUgfSk7XG4gIH07XG4gIHN5bmNEZXZpY2UgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLmlzTW91bnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGRldmljZUlkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwbGF5ZXJTdGF0ZSA9IGF3YWl0IGdldFBsYXliYWNrU3RhdGUodGhpcy50b2tlbik7XG4gICAgICBsZXQgdHJhY2sgPSB0aGlzLmVtcHR5VHJhY2s7XG4gICAgICBpZiAoIXBsYXllclN0YXRlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHBsYXllclwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGF5ZXJTdGF0ZS5pdGVtKSB7XG4gICAgICAgIHRyYWNrID0ge1xuICAgICAgICAgIGFydGlzdHM6IFwiYXJ0aXN0c1wiIGluIHBsYXllclN0YXRlLml0ZW0gPyBwbGF5ZXJTdGF0ZS5pdGVtLmFydGlzdHMgOiBbXSxcbiAgICAgICAgICBkdXJhdGlvbk1zOiBwbGF5ZXJTdGF0ZS5pdGVtLmR1cmF0aW9uX21zLFxuICAgICAgICAgIGlkOiBwbGF5ZXJTdGF0ZS5pdGVtLmlkLFxuICAgICAgICAgIGltYWdlOiBcImFsYnVtXCIgaW4gcGxheWVyU3RhdGUuaXRlbSA/IGdldEFsYnVtSW1hZ2UocGxheWVyU3RhdGUuaXRlbS5hbGJ1bSkgOiBcIlwiLFxuICAgICAgICAgIG5hbWU6IHBsYXllclN0YXRlLml0ZW0ubmFtZSxcbiAgICAgICAgICB1cmk6IHBsYXllclN0YXRlLml0ZW0udXJpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgZXJyb3I6IFwiXCIsXG4gICAgICAgIGVycm9yVHlwZTogbnVsbCxcbiAgICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICAgIGlzUGxheWluZzogcGxheWVyU3RhdGUuaXNfcGxheWluZyxcbiAgICAgICAgbmV4dFRyYWNrczogW10sXG4gICAgICAgIHByZXZpb3VzVHJhY2tzOiBbXSxcbiAgICAgICAgcHJvZ3Jlc3NNczogcGxheWVyU3RhdGUuaXRlbSA/IHBsYXllclN0YXRlLnByb2dyZXNzX21zID8/IDAgOiAwLFxuICAgICAgICBzdGF0dXM6IFNUQVRVUy5SRUFEWSxcbiAgICAgICAgdHJhY2ssXG4gICAgICAgIHZvbHVtZTogcGFyc2VWb2x1bWUocGxheWVyU3RhdGUuZGV2aWNlLnZvbHVtZV9wZXJjZW50KVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIGlzUGxheWluZzogZmFsc2UsXG4gICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICB0cmFjazogdGhpcy5lbXB0eVRyYWNrXG4gICAgICB9O1xuICAgICAgaWYgKGRldmljZUlkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnREZXZpY2VJZDogZGV2aWNlSWQsXG4gICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgZXJyb3JUeXBlOiBFUlJPUl9UWVBFLlBMQVlFUixcbiAgICAgICAgc3RhdHVzOiBTVEFUVVMuRVJST1IsXG4gICAgICAgIC4uLnN0YXRlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGFzeW5jIHRvZ2dsZVN5bmNJbnRlcnZhbChzaG91bGRTeW5jKSB7XG4gICAgY29uc3QgeyBzeW5jRXh0ZXJuYWxEZXZpY2VJbnRlcnZhbCB9ID0gdGhpcy5wcm9wcztcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaXNFeHRlcm5hbFBsYXllciAmJiBzaG91bGRTeW5jICYmICF0aGlzLnBsYXllclN5bmNJbnRlcnZhbCkge1xuICAgICAgICBhd2FpdCB0aGlzLnN5bmNEZXZpY2UoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBsYXllclN5bmNJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMucGxheWVyU3luY0ludGVydmFsID0gd2luZG93LnNldEludGVydmFsKFxuICAgICAgICAgIHRoaXMuc3luY0RldmljZSxcbiAgICAgICAgICBzeW5jRXh0ZXJuYWxEZXZpY2VJbnRlcnZhbCAqIDFlM1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCghc2hvdWxkU3luYyB8fCAhdGhpcy5pc0V4dGVybmFsUGxheWVyKSAmJiB0aGlzLnBsYXllclN5bmNJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMucGxheWVyU3luY0ludGVydmFsKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTeW5jSW50ZXJ2YWwgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuICB0b2dnbGVQcm9ncmVzc0JhcigpIHtcbiAgICBjb25zdCB7IGlzUGxheWluZyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoaXNQbGF5aW5nKSB7XG4gICAgICBpZiAoIXRoaXMucGxheWVyUHJvZ3Jlc3NJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnBsYXllclByb2dyZXNzSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgdGhpcy51cGRhdGVTZWVrQmFyLFxuICAgICAgICAgIHRoaXMuc2Vla1VwZGF0ZUludGVydmFsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnBsYXllclByb2dyZXNzSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wbGF5ZXJQcm9ncmVzc0ludGVydmFsKTtcbiAgICAgIHRoaXMucGxheWVyUHJvZ3Jlc3NJbnRlcnZhbCA9IHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlT2Zmc2V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgY3VycmVudERldmljZUlkIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgb2Zmc2V0LCB1cmlzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHBsYXlPcHRpb25zID0gdGhpcy5nZXRQbGF5T3B0aW9ucyhnZXRVUklzKHVyaXMpKTtcbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgYXdhaXQgcGxheSh0aGlzLnRva2VuLCB7IGRldmljZUlkOiBjdXJyZW50RGV2aWNlSWQsIG9mZnNldCwgLi4ucGxheU9wdGlvbnMgfSk7XG4gICAgfVxuICB9O1xuICB0b2dnbGVQbGF5ID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGN1cnJlbnREZXZpY2VJZCwgaXNQbGF5aW5nLCBuZWVkc1VwZGF0ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IG9mZnNldCwgdXJpcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzaG91bGRJbml0aWFsaXplID0gZm9yY2UgfHwgbmVlZHNVcGRhdGU7XG4gICAgY29uc3QgcGxheU9wdGlvbnMgPSB0aGlzLmdldFBsYXlPcHRpb25zKGdldFVSSXModXJpcykpO1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5pc0V4dGVybmFsUGxheWVyKSB7XG4gICAgICAgIGlmICghaXNQbGF5aW5nKSB7XG4gICAgICAgICAgYXdhaXQgcGxheSh0aGlzLnRva2VuLCB7XG4gICAgICAgICAgICBkZXZpY2VJZDogY3VycmVudERldmljZUlkLFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgLi4uc2hvdWxkSW5pdGlhbGl6ZSA/IHBsYXlPcHRpb25zIDogdm9pZCAwXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgcGF1c2UodGhpcy50b2tlbik7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IGlzUGxheWluZzogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnN5bmNEZXZpY2UoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIuYWN0aXZhdGVFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IHBsYXllclN0YXRlID0gYXdhaXQgdGhpcy5wbGF5ZXIuZ2V0Q3VycmVudFN0YXRlKCk7XG4gICAgICAgIGNvbnN0IHNob3VsZFBsYXkgPSAhcGxheWVyU3RhdGUgJiYgISEocGxheU9wdGlvbnMuY29udGV4dF91cmkgPz8gcGxheU9wdGlvbnMudXJpcyk7XG4gICAgICAgIGlmIChzaG91bGRQbGF5IHx8IHNob3VsZEluaXRpYWxpemUpIHtcbiAgICAgICAgICBhd2FpdCBwbGF5KHRoaXMudG9rZW4sIHtcbiAgICAgICAgICAgIGRldmljZUlkOiBjdXJyZW50RGV2aWNlSWQsXG4gICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICAuLi5zaG91bGRJbml0aWFsaXplID8gcGxheU9wdGlvbnMgOiB2b2lkIDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsYXllci50b2dnbGVQbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIudG9nZ2xlUGxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh7IG5lZWRzVXBkYXRlOiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9O1xuICB1cGRhdGVTZWVrQmFyID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghdGhpcy5pc01vdW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBwcm9ncmVzc01zLCB0cmFjayB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuaXNFeHRlcm5hbFBsYXllcikge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBwcm9ncmVzc01zIC8gdHJhY2suZHVyYXRpb25NcztcbiAgICAgICAgcG9zaXRpb24gPSBOdW1iZXIoKChOdW1iZXIuaXNGaW5pdGUocG9zaXRpb24pID8gcG9zaXRpb24gOiAwKSAqIDEwMCkudG9GaXhlZCgxKSk7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHByb2dyZXNzTXM6IHByb2dyZXNzTXMgKyB0aGlzLnNlZWtVcGRhdGVJbnRlcnZhbFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB0aGlzLnBsYXllci5nZXRDdXJyZW50U3RhdGUoKTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IE51bWJlcihcbiAgICAgICAgICAgIChwcm9ncmVzcyAvIHN0YXRlLnRyYWNrX3dpbmRvdy5jdXJyZW50X3RyYWNrLmR1cmF0aW9uX21zICogMTAwKS50b0ZpeGVkKDEpXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgcHJvZ3Jlc3NNczogcHJvZ3Jlc3MgKyB0aGlzLnNlZWtVcGRhdGVJbnRlcnZhbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgdXBkYXRlU3RhdGUgPSAoc3RhdGUpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICB9O1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY3VycmVudERldmljZUlkLFxuICAgICAgZGV2aWNlSWQsXG4gICAgICBkZXZpY2VzLFxuICAgICAgZXJyb3IsXG4gICAgICBpc0FjdGl2ZSxcbiAgICAgIGlzTWFnbmlmaWVkLFxuICAgICAgaXNQbGF5aW5nLFxuICAgICAgaXNVbnN1cHBvcnRlZCxcbiAgICAgIG5leHRUcmFja3MsXG4gICAgICBwbGF5ZXJQb3NpdGlvbixcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgcHJvZ3Jlc3NNcyxcbiAgICAgIHN0YXR1cyxcbiAgICAgIHRyYWNrLFxuICAgICAgdm9sdW1lXG4gICAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgY29tcG9uZW50cyxcbiAgICAgIGhpZGVBdHRyaWJ1dGlvbiA9IGZhbHNlLFxuICAgICAgaGlkZUNvdmVyQXJ0ID0gZmFsc2UsXG4gICAgICBpbmxpbmVWb2x1bWUgPSB0cnVlLFxuICAgICAgbGF5b3V0ID0gXCJyZXNwb25zaXZlXCIsXG4gICAgICBzaG93U2F2ZUljb24sXG4gICAgICB1cGRhdGVTYXZlZFN0YXR1c1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzUmVhZHkgPSBbU1RBVFVTLlJFQURZLCBTVEFUVVMuVU5TVVBQT1JURURdLmluY2x1ZGVzKHN0YXR1cyk7XG4gICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgbWFpbjogLyogQF9fUFVSRV9fICovIGpzeDI3KExvYWRlciwgeyBzdHlsZXM6IHRoaXMuc3R5bGVzIH0pXG4gICAgfTtcbiAgICBpZiAoaXNSZWFkeSkge1xuICAgICAgaWYgKCFvdXRwdXQuaW5mbykge1xuICAgICAgICBvdXRwdXQuaW5mbyA9IC8qIEBfX1BVUkVfXyAqLyBqc3gyNyhcbiAgICAgICAgICBJbmZvX2RlZmF1bHQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgaGlkZUF0dHJpYnV0aW9uLFxuICAgICAgICAgICAgaGlkZUNvdmVyQXJ0LFxuICAgICAgICAgICAgaXNBY3RpdmUsXG4gICAgICAgICAgICBsYXlvdXQsXG4gICAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgICAgb25GYXZvcml0ZVN0YXR1c0NoYW5nZTogdGhpcy5oYW5kbGVGYXZvcml0ZVN0YXR1c0NoYW5nZSxcbiAgICAgICAgICAgIHNob3dTYXZlSWNvbixcbiAgICAgICAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXG4gICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgIHRyYWNrLFxuICAgICAgICAgICAgdXBkYXRlU2F2ZWRTdGF0dXNcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBvdXRwdXQuZGV2aWNlcyA9IC8qIEBfX1BVUkVfXyAqLyBqc3gyNyhcbiAgICAgICAgRGV2aWNlcyxcbiAgICAgICAge1xuICAgICAgICAgIGN1cnJlbnREZXZpY2VJZCxcbiAgICAgICAgICBkZXZpY2VJZCxcbiAgICAgICAgICBkZXZpY2VzLFxuICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgIG9uQ2xpY2tEZXZpY2U6IHRoaXMuaGFuZGxlQ2xpY2tEZXZpY2UsXG4gICAgICAgICAgb3BlbjogaXNVbnN1cHBvcnRlZCAmJiAhZGV2aWNlSWQsXG4gICAgICAgICAgcGxheWVyUG9zaXRpb24sXG4gICAgICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlc1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgb3V0cHV0LnZvbHVtZSA9IGN1cnJlbnREZXZpY2VJZCA/IC8qIEBfX1BVUkVfXyAqLyBqc3gyNyhcbiAgICAgICAgVm9sdW1lLFxuICAgICAgICB7XG4gICAgICAgICAgaW5saW5lVm9sdW1lLFxuICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgIHBsYXllclBvc2l0aW9uLFxuICAgICAgICAgIHNldFZvbHVtZTogdGhpcy5zZXRWb2x1bWUsXG4gICAgICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICAgICAgICB2b2x1bWVcbiAgICAgICAgfVxuICAgICAgKSA6IG51bGw7XG4gICAgICBpZiAodGhpcy5yZW5kZXJJbmxpbmVBY3Rpb25zKSB7XG4gICAgICAgIG91dHB1dC5hY3Rpb25zID0gLyogQF9fUFVSRV9fICovIGpzeHM2KEFjdGlvbnNfZGVmYXVsdCwgeyBsYXlvdXQsIHN0eWxlczogdGhpcy5zdHlsZXMsIGNoaWxkcmVuOiBbXG4gICAgICAgICAgb3V0cHV0LmRldmljZXMsXG4gICAgICAgICAgb3V0cHV0LnZvbHVtZVxuICAgICAgICBdIH0pO1xuICAgICAgfVxuICAgICAgb3V0cHV0LmNvbnRyb2xzID0gLyogQF9fUFVSRV9fICovIGpzeDI3KFxuICAgICAgICBDb250cm9sc19kZWZhdWx0LFxuICAgICAgICB7XG4gICAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgICBkZXZpY2VzOiB0aGlzLnJlbmRlcklubGluZUFjdGlvbnMgPyBudWxsIDogb3V0cHV0LmRldmljZXMsXG4gICAgICAgICAgZHVyYXRpb25NczogdHJhY2suZHVyYXRpb25NcyxcbiAgICAgICAgICBpc0FjdGl2ZSxcbiAgICAgICAgICBpc0V4dGVybmFsRGV2aWNlOiB0aGlzLmlzRXh0ZXJuYWxQbGF5ZXIsXG4gICAgICAgICAgaXNNYWduaWZpZWQsXG4gICAgICAgICAgaXNQbGF5aW5nLFxuICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgIG5leHRUcmFja3MsXG4gICAgICAgICAgb25DaGFuZ2VSYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2VSYW5nZSxcbiAgICAgICAgICBvbkNsaWNrTmV4dDogdGhpcy5oYW5kbGVDbGlja05leHQsXG4gICAgICAgICAgb25DbGlja1ByZXZpb3VzOiB0aGlzLmhhbmRsZUNsaWNrUHJldmlvdXMsXG4gICAgICAgICAgb25DbGlja1RvZ2dsZVBsYXk6IHRoaXMuaGFuZGxlQ2xpY2tUb2dnbGVQbGF5LFxuICAgICAgICAgIG9uVG9nZ2xlTWFnbmlmeTogdGhpcy5oYW5kbGVUb2dnbGVNYWduaWZ5LFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHByb2dyZXNzTXMsXG4gICAgICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICAgICAgICB2b2x1bWU6IHRoaXMucmVuZGVySW5saW5lQWN0aW9ucyA/IG51bGwgOiBvdXRwdXQudm9sdW1lXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBvdXRwdXQubWFpbiA9IC8qIEBfX1BVUkVfXyAqLyBqc3hzNihXcmFwcGVyX2RlZmF1bHQsIHsgbGF5b3V0LCBzdHlsZXM6IHRoaXMuc3R5bGVzLCBjaGlsZHJlbjogW1xuICAgICAgICBvdXRwdXQuaW5mbyxcbiAgICAgICAgb3V0cHV0LmNvbnRyb2xzLFxuICAgICAgICBvdXRwdXQuYWN0aW9uc1xuICAgICAgXSB9KTtcbiAgICB9IGVsc2UgaWYgKG91dHB1dC5pbmZvKSB7XG4gICAgICBvdXRwdXQubWFpbiA9IG91dHB1dC5pbmZvO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSBTVEFUVVMuRVJST1IpIHtcbiAgICAgIG91dHB1dC5tYWluID0gLyogQF9fUFVSRV9fICovIGpzeDI3KEVycm9yTWVzc2FnZSwgeyBzdHlsZXM6IHRoaXMuc3R5bGVzLCBjaGlsZHJlbjogZXJyb3IgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4MjcoUGxheWVyX2RlZmF1bHQsIHsgcmVmOiB0aGlzLnJlZiwgXCJkYXRhLXJlYWR5XCI6IGlzUmVhZHksIHN0eWxlczogdGhpcy5zdHlsZXMsIGNoaWxkcmVuOiBvdXRwdXQubWFpbiB9KTtcbiAgfVxufTtcbnZhciBzcmNfZGVmYXVsdCA9IFNwb3RpZnlXZWJQbGF5ZXI7XG5leHBvcnQge1xuICBFUlJPUl9UWVBFLFxuICBTVEFUVVMsXG4gIFRZUEUsXG4gIHNyY19kZWZhdWx0IGFzIGRlZmF1bHQsXG4gIHNwb3RpZnlfZXhwb3J0cyBhcyBzcG90aWZ5QXBpXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgU3BvdGlmeVBsYXllciBmcm9tICdyZWFjdC1zcG90aWZ5LXdlYi1wbGF5YmFjayc7XG5cblxuaW1wb3J0IHsgU3BvdGlmeVdlYlBsYXllckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvU3BvdGlmeVdlYlBsYXllclByb3BzXCI7XG5cbmltcG9ydCBcIi4vdWkvU3BvdGlmeVdlYlBsYXllci5jc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFNwb3RpZnlXZWJQbGF5ZXIoeyB0b2tlbiwgdXJpIH06IFNwb3RpZnlXZWJQbGF5ZXJDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIChcbiAgICA8U3BvdGlmeVBsYXllclxuICAgICAgICB0b2tlbj17dG9rZW4uZGlzcGxheVZhbHVlfVxuICAgICAgICB1cmlzPXt1cmkuZGlzcGxheVZhbHVlfVxuICAgIC8+XG4gICAgKTtcbn1cbiJdLCJuYW1lcyI6WyJpc09mVHlwZSIsInR5cGUiLCJ2YWx1ZSIsImlzRnVuY3Rpb24iLCJpc051bGwiLCJpc1JlZ2V4IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwic2xpY2UiLCJpc09iamVjdCIsImlzVW5kZWZpbmVkIiwic2FmZUlzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJwb255ZmlsbCIsImlzRXF1YWwiLCJmaXJzdCIsInNlY29uZCIsImFyZUlucHV0c0VxdWFsIiwibmV3SW5wdXRzIiwibGFzdElucHV0cyIsImxlbmd0aCIsImkiLCJtZW1vaXplT25lIiwicmVzdWx0Rm4iLCJjYWNoZSIsIm1lbW9pemVkIiwibmV3QXJncyIsIl9pIiwiYXJndW1lbnRzIiwibGFzdFRoaXMiLCJsYXN0QXJncyIsImxhc3RSZXN1bHQiLCJhcHBseSIsImNsZWFyIiwiS0VCQUJfUkVHRVgiLCJoYXNoIiwic3RyIiwiaCIsImNoYXJDb2RlQXQiLCJleHBvcnRzIiwiY29uZmlnIiwiYXNzaWduIiwiY2xpZW50Iiwid2luZG93IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNvbnNvbGUiLCJlcnJvciIsInJlbmRlcmVyIiwicmF3IiwicGZ4Iiwic3RyaW5naWZ5IiwiSlNPTiIsImtlYmFiIiwicHJvcCIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsImRlY2wiLCJrZXkiLCJvYmoiLCJzZWxlY3RvciIsInBhcmVudCIsInB1dFJhdyIsInJhd0Nzc1J1bGUiLCJzaCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJzaFRlc3QiLCJzaGVldCIsImluc2VydFJ1bGUiLCJjc3NSdWxlcyIsInZlcmJvc2UiLCJjcmVhdGVUZXh0Tm9kZSIsInB1dCIsImRlY2xzIiwiYXRydWxlIiwicG9zdHBvbmVkIiwiQXJyYXkiLCJwdXNoIiwic291cmNlbWFwcyIsInB1dEF0IiwiY3NzIiwicnVsZSIsInBrZ05hbWUiLCJtb2R1bGUiLCJ3YXJuT25NaXNzaW5nRGVwZW5kZW5jaWVzIiwiYWRkb24iLCJkZXBzIiwibWlzc2luZyIsIm5hbWUiLCJqIiwiRXJyb3IiLCJhZGRvbkNhY2hlIiwicmVxdWlyZSIsImpzeCIsImZuIiwic3R5bGVzIiwiYmxvY2siLCJjbGFzc05hbWUiLCJpc0VsZW1lbnQiLCJDb21wb25lbnQiLCJwcm9wcyIsImNvcHkiLCIkYXMiLCIkcmVmIiwiZHluYW1pY0NsYXNzTmFtZSIsInJlZiIsImRpc3BsYXlOYW1lIiwicHJlZml4ZXMiLCJrc2giLCJfXyIsImtleWZyYW1lcyIsInByZWx1ZGUiLCJrZXlmcmFtZSIsInN0ckRlY2xzIiwicHJlZml4IiwicmF3S2V5ZnJhbWVzIiwicGFyZW50U2VsZWN0b3JzIiwicGFyZW50cyIsInNwbGl0IiwicmVzdWx0Iiwic2VsZWN0b3JzIiwibGVuMSIsImxlbjIiLCJzZWwiLCJwb3MiLCJyZXBsYWNlZFNlbGVjdG9yIiwiaW5kZXhPZiIsImpvaW4iLCJibG9ja3MiLCJUeXBlRXJyb3IiLCJzdHlsZSIsImR5bmFtaWNUZW1wbGF0ZSIsImpzeENvbXBvbmVudCIsInRhZ3MiLCJzdHlsZWQiLCJ0YWciLCJhY3Rpb25zIiwiZGVmYXVsdE1lcmdlIiwiU3ltYm9sIiwic2tpcCIsImRlZmF1bHRNZXRhRGF0YVVwZGF0ZXIiLCJwcmV2aW91c01ldGEiLCJtZXRhTWV0YSIsImdldE9iamVjdFR5cGUiLCJvYmplY3QiLCJpc0FycmF5IiwiaXNSZWNvcmQiLCJTZXQiLCJNYXAiLCJnZXRLZXlzIiwib2JqZWN0cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJhZGQiLCJvYmplY3RIYXNQcm9wZXJ0eSIsInByb3BlcnR5IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJnZXRJdGVyYWJsZU9mSXRlcmFibGVzIiwiaXRlcmFibGVzIiwiaXRlcmF0b3IiLCJpdGVyYWJsZSIsInZhbGlkUmVjb3JkVG9TdHJpbmdWYWx1ZXMiLCJoYXMiLCJjb25zdHJ1Y3RvciIsInVuZGVmaW5lZCIsImhhc093blByb3BlcnR5IiwibWVyZ2VSZWNvcmRzJDIiLCJ2YWx1ZXMiLCJ1dGlscyIsIm1ldGEiLCJwcm9wVmFsdWVzIiwidXBkYXRlZE1ldGEiLCJtZXRhRGF0YVVwZGF0ZXIiLCJwcm9wZXJ0eVJlc3VsdCIsIm1lcmdlVW5rbm93bnMiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsIm1lcmdlQXJyYXlzJDIiLCJmbGF0IiwibWVyZ2VTZXRzJDIiLCJtZXJnZU1hcHMkMiIsIm1lcmdlT3RoZXJzJDIiLCJkZWZhdWx0TWVyZ2VGdW5jdGlvbnMiLCJmcmVlemUiLCJfX3Byb3RvX18iLCJtZXJnZVJlY29yZHMiLCJtZXJnZUFycmF5cyIsIm1lcmdlU2V0cyIsIm1lcmdlTWFwcyIsIm1lcmdlT3RoZXJzIiwiZGVlcG1lcmdlIiwiZGVlcG1lcmdlQ3VzdG9tIiwib3B0aW9ucyIsInJvb3RNZXRhRGF0YSIsImdldFV0aWxzIiwiY3VzdG9taXplZERlZXBtZXJnZSIsIl9hIiwiX2IiLCJtZXJnZUZ1bmN0aW9ucyIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsImZpbHRlciIsIm9wdGlvbiIsIm1hcCIsInVzZUltcGxpY2l0RGVmYXVsdE1lcmdpbmciLCJlbmFibGVJbXBsaWNpdERlZmF1bHRNZXJnaW5nIiwibWVyZ2VPdGhlcnMkMSIsIm1faW5kZXgiLCJtZXJnZVJlY29yZHMkMSIsIm1lcmdlQXJyYXlzJDEiLCJtZXJnZVNldHMkMSIsIm1lcmdlTWFwcyQxIiwiZ2V0QmFzZVByb3BzIiwiYXhpcyIsInhNYXgiLCJ4TWluIiwiX2MiLCJ4U3RlcCIsIl9kIiwieU1heCIsIl9lIiwieU1pbiIsIl9mIiwieVN0ZXAiLCJfZyIsImdldENvb3JkaW5hdGVzIiwiZXZlbnQiLCJsYXN0UG9zaXRpb24iLCJfX3JlYWQiLCJfX3NwcmVhZEFycmF5IiwiZnJvbSIsInRvdWNoZXMiLCJ0b3VjaCIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJnZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsImR4IiwiZHkiLCJNYXRoIiwicm91bmQiLCJnZXROb3JtYWxpemVkVmFsdWUiLCJtaW4iLCJtYXgiLCJpc051bWJlciIsInBhcnNlTnVtYmVyIiwicGFyc2VJbnQiLCJyZW1vdmVQcm9wZXJ0aWVzIiwiaW5wdXQiLCJvdXRwdXQiLCJpbmNsdWRlcyIsImluY3JlbWVudCIsImNlaWwiLCJkZWZhdWx0T3B0aW9ucyIsInBhZGRpbmciLCJyYW5nZUNvbG9yIiwidGh1bWJCb3JkZXIiLCJ0aHVtYkJvcmRlclJhZGl1cyIsInRodW1iQm9yZGVyUmFkaXVzWFkiLCJ0aHVtYkNvbG9yIiwidGh1bWJTaXplIiwidGh1bWJTaXplWFkiLCJ0aHVtYlNwYWNlIiwidHJhY2tCb3JkZXJSYWRpdXMiLCJ0cmFja0NvbG9yIiwiZ2V0U3R5bGVzIiwic2xpZGVyIiwiYm94U2l6aW5nIiwiZGlzcGxheSIsInRyYW5zaXRpb24iLCJ0cmFjayIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclJhZGl1cyIsInJhbmdlIiwicmFpbCIsInRodW1iIiwiYm9yZGVyIiwiZGVmYXVsdFN0eWxlcyIsInJhbmdlWCIsIl9fYXNzaWduIiwidG9wIiwicmFuZ2VYWSIsImJvdHRvbSIsInJhbmdlWSIsImxlZnQiLCJzbGlkZXJYIiwic2xpZGVyWFkiLCJzbGlkZXJZIiwidGh1bWJYIiwidGh1bWJYWSIsInRodW1iWSIsInRyYWNrWCIsInRyYWNrWFkiLCJtaW5IZWlnaHQiLCJ0cmFja1kiLCJSYW5nZVNsaWRlciIsIl9zdXBlciIsIl9fZXh0ZW5kcyIsIl90aGlzIiwibGFzdENvb3JkaW5hdGVzIiwibW91bnRlZCIsIm9mZnNldCIsInN0YXJ0IiwiZ2V0RHJhZ1Bvc2l0aW9uIiwidXBkYXRlT3B0aW9ucyIsIl9rIiwiY3VycmVudCIsIm9mZnNldExlZnQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRUb3AiLCJfaiIsIl9oIiwidXBkYXRlUG9zaXRpb24iLCJzZXRTdGF0ZSIsImhhbmRsZUJsdXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlS2V5ZG93biIsImhhbmRsZUNsaWNrVHJhY2siLCJvbkFmdGVyRW5kIiwiaXNEcmFnZ2luZyIsInN0YXRlIiwiZWxlbWVudCIsImN1cnJlbnRUYXJnZXQiLCJuZXh0UG9zaXRpb24iLCJoYW5kbGVEcmFnIiwicHJldmVudERlZmF1bHQiLCJjb29yZGluYXRlcyIsImhhbmRsZURyYWdFbmQiLCJvbkRyYWdFbmQiLCJoYW5kbGVGb2N1cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiaW5uZXJYIiwiaW5uZXJZIiwiY29kZXMiLCJkb3duIiwidXAiLCJyaWdodCIsImNvZGUiLCJ4TWludXMiLCJ4UGx1cyIsInlNaW51cyIsInlQbHVzIiwiaGFuZGxlTW91c2VEb3duIiwiaGFuZGxlVG91Y2hTdGFydCIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJfIiwicHJldmlvdXNTdGF0ZSIsIm9uQ2hhbmdlIiwicHJldmlvdXNYIiwicHJldmlvdXNZIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJyZXN0IiwieFBvcyIsInlQb3MiLCJjb25jYXQiLCJzaXplIiwib3JpZW50YXRpb24iLCJ2YWx1ZW1heCIsInZhbHVlbWluIiwidmFsdWVub3ciLCJvbkNsaWNrIiwicm9sZSIsIm9uTW91c2VEb3duIiwib25Ub3VjaFN0YXJ0Iiwib25CbHVyIiwib25Gb2N1cyIsInRhYkluZGV4IiwiZGVmYXVsdFByb3BzIiwiSFNMS2V5cyIsIlJHQktleXMiLCJpbnZhcmlhbnQiLCJjb25kaXRpb24iLCJtZXNzYWdlIiwiaXNIU0wiLCJpc1BsYWluT2JqZWN0IiwiZXZlcnkiLCJnZXRQcm90b3R5cGVPZiIsImlzUkdCIiwiaXNSR0JBcnJheSIsImQiLCJpc1N0cmluZyIsImxpbWl0IiwibWVzc2FnZXMiLCJhbW91bnQiLCJpbnB1dFN0cmluZyIsImludmFsaWQiLCJkaWdpdHMiLCJmYWN0b3IiLCJpc1ZhbGlkSGV4IiwiYWxwaGEiLCJ0ZXN0IiwiZm9ybWF0SGV4IiwiY29sb3IiLCJoZXgiLCJmb3JFYWNoIiwiaGV4MnJnYiIsInN1YnN0ciIsInIiLCJTdHJpbmciLCJjaGFyQXQiLCJnIiwiYiIsInJnYjJoc2wiLCJyZ2IiLCJyTGltaXQiLCJnTGltaXQiLCJiTGltaXQiLCJkZWx0YSIsInMiLCJsIiwicmF0ZSIsImFicyIsInRvRml4ZWQiLCJoZXgyaHNsIiwiaHVlMnJnYiIsInBvaW50IiwiY2hyb21hIiwiaHVlIiwiaHNsMnJnYiIsInJnYjJoZXgiLCJoc2wyaGV4IiwiY3NzQ29sb3JzIiwiYWxpY2VibHVlIiwiYW50aXF1ZXdoaXRlIiwiYXF1YSIsImFxdWFtYXJpbmUiLCJhenVyZSIsImJlaWdlIiwiYmlzcXVlIiwiYmxhY2siLCJibGFuY2hlZGFsbW9uZCIsImJsdWUiLCJibHVldmlvbGV0IiwiYnJvd24iLCJidXJseXdvb2QiLCJjYWRldGJsdWUiLCJjaGFydHJldXNlIiwiY2hvY29sYXRlIiwiY29yYWwiLCJjb3JuZmxvd2VyYmx1ZSIsImNvcm5zaWxrIiwiY3JpbXNvbiIsImN5YW4iLCJkYXJrYmx1ZSIsImRhcmtjeWFuIiwiZGFya2dvbGRlbnJvZCIsImRhcmtncmF5IiwiZGFya2dyZXkiLCJkYXJrZ3JlZW4iLCJkYXJra2hha2kiLCJkYXJrbWFnZW50YSIsImRhcmtvbGl2ZWdyZWVuIiwiZGFya29yYW5nZSIsImRhcmtvcmNoaWQiLCJkYXJrcmVkIiwiZGFya3NhbG1vbiIsImRhcmtzZWFncmVlbiIsImRhcmtzbGF0ZWJsdWUiLCJkYXJrc2xhdGVncmF5IiwiZGFya3NsYXRlZ3JleSIsImRhcmt0dXJxdW9pc2UiLCJkYXJrdmlvbGV0IiwiZGVlcHBpbmsiLCJkZWVwc2t5Ymx1ZSIsImRpbWdyYXkiLCJkaW1ncmV5IiwiZG9kZ2VyYmx1ZSIsImZpcmVicmljayIsImZsb3JhbHdoaXRlIiwiZm9yZXN0Z3JlZW4iLCJmdWNoc2lhIiwiZ2FpbnNib3JvIiwiZ2hvc3R3aGl0ZSIsImdvbGQiLCJnb2xkZW5yb2QiLCJncmF5IiwiZ3JleSIsImdyZWVuIiwiZ3JlZW55ZWxsb3ciLCJob25leWRldyIsImhvdHBpbmsiLCJpbmRpYW5yZWQiLCJpbmRpZ28iLCJpdm9yeSIsImtoYWtpIiwibGF2ZW5kZXIiLCJsYXZlbmRlcmJsdXNoIiwibGF3bmdyZWVuIiwibGVtb25jaGlmZm9uIiwibGlnaHRibHVlIiwibGlnaHRjb3JhbCIsImxpZ2h0Y3lhbiIsImxpZ2h0Z29sZGVucm9keWVsbG93IiwibGlnaHRncmF5IiwibGlnaHRncmV5IiwibGlnaHRncmVlbiIsImxpZ2h0cGluayIsImxpZ2h0c2FsbW9uIiwibGlnaHRzZWFncmVlbiIsImxpZ2h0c2t5Ymx1ZSIsImxpZ2h0c2xhdGVncmF5IiwibGlnaHRzbGF0ZWdyZXkiLCJsaWdodHN0ZWVsYmx1ZSIsImxpZ2h0eWVsbG93IiwibGltZSIsImxpbWVncmVlbiIsImxpbmVuIiwibWFnZW50YSIsIm1hcm9vbiIsIm1lZGl1bWFxdWFtYXJpbmUiLCJtZWRpdW1ibHVlIiwibWVkaXVtb3JjaGlkIiwibWVkaXVtcHVycGxlIiwibWVkaXVtc2VhZ3JlZW4iLCJtZWRpdW1zbGF0ZWJsdWUiLCJtZWRpdW1zcHJpbmdncmVlbiIsIm1lZGl1bXR1cnF1b2lzZSIsIm1lZGl1bXZpb2xldHJlZCIsIm1pZG5pZ2h0Ymx1ZSIsIm1pbnRjcmVhbSIsIm1pc3R5cm9zZSIsIm1vY2Nhc2luIiwibmF2YWpvd2hpdGUiLCJuYXZ5Iiwib2xkbGFjZSIsIm9saXZlIiwib2xpdmVkcmFiIiwib3JhbmdlIiwib3JhbmdlcmVkIiwib3JjaGlkIiwicGFsZWdvbGRlbnJvZCIsInBhbGVncmVlbiIsInBhbGV0dXJxdW9pc2UiLCJwYWxldmlvbGV0cmVkIiwicGFwYXlhd2hpcCIsInBlYWNocHVmZiIsInBlcnUiLCJwaW5rIiwicGx1bSIsInBvd2RlcmJsdWUiLCJwdXJwbGUiLCJyZWQiLCJyb3N5YnJvd24iLCJyb3lhbGJsdWUiLCJzYWRkbGVicm93biIsInNhbG1vbiIsInNhbmR5YnJvd24iLCJzZWFncmVlbiIsInNlYXNoZWxsIiwic2llbm5hIiwic2lsdmVyIiwic2t5Ymx1ZSIsInNsYXRlYmx1ZSIsInNsYXRlZ3JheSIsInNsYXRlZ3JleSIsInNub3ciLCJzcHJpbmdncmVlbiIsInN0ZWVsYmx1ZSIsInRhbiIsInRlYWwiLCJ0aGlzdGxlIiwidG9tYXRvIiwidHVycXVvaXNlIiwidmlvbGV0Iiwid2hlYXQiLCJ3aGl0ZSIsIndoaXRlc21va2UiLCJ5ZWxsb3ciLCJ5ZWxsb3dncmVlbiIsInBhcnNlQ1NTIiwicGFyc2VkSW5wdXQiLCJtYXRjaGVzIiwibWF0Y2giLCJtb2RlbCIsImhPUnIiLCJzT1JnIiwibE9SYiIsImhzbCIsImZhZGUiLCJwZXJjZW50YWdlIiwidGV4dENvbG9yIiwieWlxIiwiZm9udFNpemUiLCJwIiwibWFyZ2luIiwiYXBwZWFyYW5jZSIsImJhY2tncm91bmQiLCJjdXJzb3IiLCJsaW5lSGVpZ2h0Iiwib3V0bGluZUNvbG9yIiwib3V0bGluZU9mZnNldCIsIlNwb3RpZnlXZWJQbGF5ZXIiLCJfQ2xhc3MiLCJQdXJlQ29tcG9uZW50IiwiX2RlZmluZVByb3BlcnR5IiwiYXJ0aXN0cyIsImR1cmF0aW9uTXMiLCJpZCIsImltYWdlIiwidXJpIiwibWVtb2l6ZSIsImlkcyIsInBsYXlPcHRpb25zIiwiY29udGV4dF91cmkiLCJ1cmlzIiwidmFsaWRhdGVVUkkiLCJzb21lIiwiZ2V0U3BvdGlmeVVSSVR5cGUiLCJ3YXJuIiwiY2FsbGJhY2siLCJwcm9ncmVzcyIsInN0YXRlQ2hhbmdlcyIsImlzRXh0ZXJuYWxQbGF5ZXIiLCJzZWVrIiwidG9rZW4iLCJwcm9ncmVzc01zIiwicGxheWVyIiwiZ2V0Q3VycmVudFN0YXRlIiwidHJhY2tfd2luZG93IiwiY3VycmVudF90cmFjayIsImR1cmF0aW9uX21zIiwidXBkYXRlU3RhdGUiLCJUWVBFIiwiUFJPR1JFU1MiLCJpc0FjdGl2ZSIsInRvZ2dsZVBsYXkiLCJwcmV2aW91cyIsInN5bmNUaW1lb3V0Iiwic2V0VGltZW91dCIsInN5bmNEZXZpY2UiLCJwcmV2aW91c1RyYWNrIiwibmV4dCIsIm5leHRUcmFjayIsImRldmljZUlkIiwiaXNVbnN1cHBvcnRlZCIsImF1dG9QbGF5IiwicGVyc2lzdERldmljZVNlbGVjdGlvbiIsImN1cnJlbnREZXZpY2VJZCIsInNldERldmljZSIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsInBsYXllclN0YXRlIiwiZ2V0UGxheWJhY2tTdGF0ZSIsImlzX3BsYXlpbmciLCJzdGF0dXMiLCJpc1NhdmVkIiwiaGFuZGxlQ2FsbGJhY2siLCJGQVZPUklURSIsImlzUGxheWJhY2tFcnJvciIsIkVSUk9SX1RZUEUiLCJQTEFZQkFDSyIsImlzSW5pdGlhbGl6YXRpb25FcnJvciIsIklOSVRJQUxJWkFUSU9OIiwibmV4dFN0YXR1cyIsImRldmljZXMiLCJkaXNjb25uZWN0IiwiU1RBVFVTIiwiVU5TVVBQT1JURUQiLCJnZXREZXZpY2VzIiwiRVJST1IiLCJlcnJvclR5cGUiLCJpc0luaXRpYWxpemluZyIsInBhdXNlZCIsInJlcGVhdF9tb2RlIiwic2h1ZmZsZSIsInNodWZmbGUyIiwibmV4dF90cmFja3MiLCJwcmV2aW91c190cmFja3MiLCJpc1BsYXlpbmciLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJ0cmFja1N0YXRlIiwibmV4dFRyYWNrcyIsImNvbnZlcnRUcmFjayIsInByZXZpb3VzVHJhY2tzIiwicmVwZWF0IiwiZ2V0UmVwZWF0U3RhdGUiLCJkZXZpY2VfaWQiLCJpbml0aWFsaXplRGV2aWNlcyIsIlJFQURZIiwiSURMRSIsImxheW91dCIsImNsZWFyVGltZW91dCIsInJlc2l6ZVRpbWVvdXQiLCJyZW5kZXJJbmxpbmVBY3Rpb25zIiwiaW5uZXJXaWR0aCIsImZvcmNlVXBkYXRlIiwibWFnbmlmeVNsaWRlck9uSG92ZXIiLCJpc01hZ25pZmllZCIsImdldE9BdXRoVG9rZW4iLCJnZXRQbGF5ZXIiLCJTcG90aWZ5IiwiUGxheWVyIiwiYWRkTGlzdGVuZXIiLCJoYW5kbGVQbGF5ZXJTdGF0dXMiLCJoYW5kbGVQbGF5ZXJTdGF0ZUNoYW5nZXMiLCJoYW5kbGVQbGF5ZXJFcnJvcnMiLCJBVVRIRU5USUNBVElPTiIsIkFDQ09VTlQiLCJsb2ciLCJjb25uZWN0Iiwic2V0Vm9sdW1lIiwiaXNNb3VudGVkIiwiZW1wdHlUcmFjayIsIml0ZW0iLCJnZXRBbGJ1bUltYWdlIiwiYWxidW0iLCJwcm9ncmVzc19tcyIsInBhcnNlVm9sdW1lIiwiZGV2aWNlIiwidm9sdW1lX3BlcmNlbnQiLCJQTEFZRVIiLCJnZXRQbGF5T3B0aW9ucyIsImdldFVSSXMiLCJwbGF5IiwiZm9yY2UiLCJuZWVkc1VwZGF0ZSIsInNob3VsZEluaXRpYWxpemUiLCJwYXVzZSIsImFjdGl2YXRlRWxlbWVudCIsInNob3VsZFBsYXkiLCJpc0Zpbml0ZSIsInNlZWtVcGRhdGVJbnRlcnZhbCIsInBsYXllclBvc2l0aW9uIiwiaW5pdGlhbFZvbHVtZSIsImxvY2FsZSIsImdldExvY2FsZSIsImdldE1lcmdlZFN0eWxlcyIsImlubmVySGVpZ2h0IiwiSU5JVElBTElaSU5HIiwib25TcG90aWZ5V2ViUGxheWJhY2tTREtSZWFkeSIsImluaXRpYWxpemVQbGF5ZXIiLCJsb2FkU3BvdGlmeVBsYXllciIsImhhbmRsZVJlc2l6ZSIsInByZXZpb3VzUHJvcHMiLCJyZXBlYXQyIiwicGxheVByb3AiLCJzaG93U2F2ZUljb24iLCJzeW5jRXh0ZXJuYWxEZXZpY2UiLCJpc1JlYWR5IiwiY2FuUGxheSIsIkRFVklDRSIsInRvZ2dsZVN5bmNJbnRlcnZhbCIsInVwZGF0ZVNlZWtCYXIiLCJUUkFDSyIsInRvZ2dsZVByb2dyZXNzQmFyIiwidG9nZ2xlT2Zmc2V0Iiwic2V0RXh0ZXJuYWxEZXZpY2UiLCJjbGVhckludGVydmFsIiwicGxheWVyU3luY0ludGVydmFsIiwicGxheWVyUHJvZ3Jlc3NJbnRlcnZhbCIsInNhdmVkRGV2aWNlSWQiLCJnZXRJdGVtIiwic2hvdWxkU3luYyIsInN5bmNFeHRlcm5hbERldmljZUludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjb21wb25lbnRzIiwiaGlkZUF0dHJpYnV0aW9uIiwiaGlkZUNvdmVyQXJ0IiwiaW5saW5lVm9sdW1lIiwidXBkYXRlU2F2ZWRTdGF0dXMiLCJtYWluIiwianN4MjciLCJMb2FkZXIiLCJpbmZvIiwiSW5mb19kZWZhdWx0Iiwib25GYXZvcml0ZVN0YXR1c0NoYW5nZSIsImhhbmRsZUZhdm9yaXRlU3RhdHVzQ2hhbmdlIiwiRGV2aWNlcyIsIm9uQ2xpY2tEZXZpY2UiLCJoYW5kbGVDbGlja0RldmljZSIsIm9wZW4iLCJWb2x1bWUiLCJqc3hzNiIsIkFjdGlvbnNfZGVmYXVsdCIsImNoaWxkcmVuIiwiY29udHJvbHMiLCJDb250cm9sc19kZWZhdWx0IiwiaXNFeHRlcm5hbERldmljZSIsIm9uQ2hhbmdlUmFuZ2UiLCJoYW5kbGVDaGFuZ2VSYW5nZSIsIm9uQ2xpY2tOZXh0IiwiaGFuZGxlQ2xpY2tOZXh0Iiwib25DbGlja1ByZXZpb3VzIiwiaGFuZGxlQ2xpY2tQcmV2aW91cyIsIm9uQ2xpY2tUb2dnbGVQbGF5IiwiaGFuZGxlQ2xpY2tUb2dnbGVQbGF5Iiwib25Ub2dnbGVNYWduaWZ5IiwiaGFuZGxlVG9nZ2xlTWFnbmlmeSIsIldyYXBwZXJfZGVmYXVsdCIsIkVycm9yTWVzc2FnZSIsIlBsYXllcl9kZWZhdWx0Iiwic3JjX2RlZmF1bHQiLCJTcG90aWZ5UGxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFNQSxTQUFTQSxRQUFBQSxDQUF5Q0MsSUFBQSxFQUFjO0VBRTlELEVBQUEsT0FBUUMsS0FBQSxJQUErQixPQUFPQSxLQUFBLEtBQVVELElBQUEsQ0FBQTtFQUMxRCxDQUFBO0VBTU8sSUFBTUUsVUFBQSxHQUFhSCxRQUFBLENBQW1CLFVBQVUsQ0FBQSxDQUFBO0VBS2hELElBQU1JLE1BQUEsR0FBVUYsS0FBQSxJQUFrQztFQUN2RCxFQUFBLE9BQU9BLEtBQUEsS0FBVSxJQUFBLENBQUE7RUFDbkIsQ0FBQSxDQUFBO0VBS08sSUFBTUcsT0FBQSxHQUFXSCxLQUFBLElBQW9DO0VBQzFELEVBQUEsT0FBT0ksTUFBQSxDQUFPQyxTQUFBLENBQVVDLFFBQUEsQ0FBU0MsSUFBQSxDQUFLUCxLQUFLLENBQUVRLENBQUFBLEtBQUEsQ0FBTSxDQUFBLEVBQUcsRUFBRSxDQUFNLEtBQUEsUUFBQSxDQUFBO0VBQ2hFLENBQUEsQ0FBQTtFQUtPLElBQU1DLFFBQUEsR0FBWVQsS0FBQSxJQUF1QztFQUM5RCxFQUFBLE9BQU8sQ0FBQ1UsYUFBQSxDQUFZVixLQUFLLENBQUEsSUFBSyxDQUFDRSxNQUFBLENBQU9G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QU1rVixHQUFHLEdBQUcsQ0FBQ3hMLENBQUMsR0FBRyxHQUFHLEdBQUdHLENBQUMsR0FBRyxHQUFHLEdBQUdDLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFBO0VBRWhELEVBQUEsT0FBT29MLEdBQUcsSUFBSSxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQTtFQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VDeUNBMWdCLEdBQUEsQ0FBSSxhQUFlLEVBQUE7RUFDakIyTSxFQUFBQSxTQUFBLEVBQVcsWUFBQTtFQUNYZ1UsRUFBQUEsUUFBQSxFQUFVLFNBQUE7RUFDVi9WLEVBQUFBLEtBQUEsRUFBTyxNQUFBO0lBRVAsR0FBSyxFQUFBO0VBQ0grQixJQUFBQSxTQUFBLEVBQVcsWUFBQTtFQUNiLEdBQUE7RUFFQWlVLEVBQUFBLENBQUEsRUFBRztFQUNEQyxJQUFBQSxNQUFBLEVBQVEsQ0FBQTtFQUNWLEdBQUE7RUFDRixDQUFDLENBQUEsQ0FBQTtFQUVEN2dCLEdBQUEsQ0FBSSxhQUFlLEVBQUE7RUFDakI4Z0IsRUFBQUEsVUFBQSxFQUFZLE1BQUE7RUFDWkMsRUFBQUEsVUFBQSxFQUFZLGFBQUE7RUFDWjNULEVBQUFBLE1BQUEsRUFBUSxDQUFBO0VBQ1JKLEVBQUFBLFlBQUEsRUFBYyxDQUFBO0VBQ2Q2SCxFQUFBQSxLQUFBLEVBQU8sU0FBQTtFQUNQbU0sRUFBQUEsTUFBQSxFQUFRLFNBQUE7RUFDUnBVLEVBQUFBLE9BQUEsRUFBUyxhQUFBO0VBQ1RxVSxFQUFBQSxVQUFBLEVBQVksQ0FBQTtFQUNablYsRUFBQUEsT0FBQSxFQUFTLENBQUE7SUFFVCxRQUFVLEVBQUE7RUFDUm9WLElBQUFBLFlBQUEsRUFBYyxNQUFBO0VBQ2RDLElBQUFBLGFBQUEsRUFBZSxDQUFBO0VBQ2pCLEdBQUE7RUFDRixDQUFDLENBQUEsQ0FBQTtFQUVELElBQU1DLGtCQUFBLElBQUFDLE1BQUEsR0FBTixNQUFNRCxnQkFBQSxTQUF5QkUsbUJBQUEsQ0FBNEI7RUF1RHpEM2IsRUFBQUEsV0FBQUEsQ0FBWS9ELEtBQUEsRUFBYztFQUN4QixJQUFBLEtBQUEsQ0FBTUEsS0FBSyxDQUFBLENBQUE7RUFBQTJmLElBQUFBLGVBQUEsQ0F2RE8sSUFBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQTtFQUFBQSxJQUFBQSxlQUFBLENBQ0MsSUFBQSxFQUFBLFlBQUEsRUFBQTtFQUNuQkMsTUFBQUEsT0FBQSxFQUFTLEVBQUM7RUFDVkMsTUFBQUEsVUFBQSxFQUFZLENBQUE7RUFDWkMsTUFBQUEsRUFBQSxFQUFJLEVBQUE7RUFDSkMsTUFBQUEsS0FBQSxFQUFPLEVBQUE7RUFDUDNnQixNQUFBQSxJQUFBLEVBQU0sRUFBQTtFQUNONGdCLE1BQUFBLEdBQUEsRUFBSyxFQUFBO0VBQ1AsS0FBQSxDQUFBLENBQUE7TUFBQUwsZUFBQSxDQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtNQUFBQSxlQUFBLENBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFBLGVBQUEsQ0FBQSxJQUFBLEVBQUEsd0JBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFBLGVBQUEsQ0FBQSxJQUFBLEVBQUEsb0JBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFBLGVBQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQSxFQU1jN1AsZUFBQSxFQUEwQixDQUFBLENBQUE7RUFBQTZQLElBQUFBLGVBQUEsQ0FDVixJQUFBLEVBQUEscUJBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQTtNQUFBQSxlQUFBLENBQUEsSUFBQSxFQUFBLGVBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0VBQUFBLElBQUFBLGVBQUEsQ0FFRCxJQUFBLEVBQUEsb0JBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQTtNQUFBQSxlQUFBLENBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO01BQUFBLGVBQUEsQ0FBQSxJQUFBLEVBQUEsYUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7RUFBQUEsSUFBQUEsZUFBQSxDQUlKTSxJQUFBQSxFQUFBQSxnQkFBQUEsRUFBQUEsVUFBQSxDQUFTQyxHQUFBLElBQStCO0VBQy9ELE1BQUEsTUFBTUMsV0FBQSxHQUEyQjtFQUMvQkMsUUFBQUEsV0FBQSxFQUFhLEtBQUEsQ0FBQTtFQUNiQyxRQUFBQSxJQUFBLEVBQU0sS0FBQSxDQUFBO0VBQ1IsT0FBQSxDQUFBO0VBR0EsTUFBQSxJQUFJSCxHQUFBLEVBQUs7VUFDUCxJQUFJLENBQUNBLEdBQUEsQ0FBSWxPLEtBQUEsQ0FBTUksQ0FBQSxJQUFLa08sV0FBQSxDQUFZbE8sQ0FBQyxDQUFDLENBQUcsRUFBQTtFQUNuQyxVQUFBLE9BQU8rTixXQUFBLENBQUE7RUFDVCxTQUFBO1VBRUEsSUFBSUQsR0FBQSxDQUFJSyxJQUFBLENBQUtuTyxDQUFBLElBQUtvTyxpQkFBQSxDQUFrQnBPLENBQUMsQ0FBTSxLQUFBLE9BQU8sQ0FBRyxFQUFBO0VBQ25ELFVBQUEsSUFBSSxDQUFDOE4sR0FBQSxDQUFJbE8sS0FBQSxDQUFNSSxDQUFBLElBQUtvTyxpQkFBQSxDQUFrQnBPLENBQUMsQ0FBTSxLQUFBLE9BQU8sQ0FBRyxFQUFBO2NBRXJEN1YsT0FBQSxDQUFRa2tCLElBQUEsQ0FBSyw0Q0FBNEMsQ0FBQSxDQUFBO0VBQzNELFdBQUE7RUFFQU4sVUFBQUEsV0FBQSxDQUFZRSxJQUFBLEdBQU9ILEdBQUEsQ0FBSTNaLE1BQUEsQ0FBTzZMLENBQUEsSUFBS2tPLFdBQUEsQ0FBWWxPLENBQUMsQ0FBQSxJQUFLb08saUJBQUEsQ0FBa0JwTyxDQUFDLE1BQU0sT0FBTyxDQUFBLENBQUE7V0FDaEYsTUFBQTtFQUNMLFVBQUEsSUFBSThOLEdBQUEsQ0FBSXJsQixNQUFBLEdBQVMsQ0FBRyxFQUFBO2NBRWxCMEIsT0FBQSxDQUFRa2tCLElBQUEsQ0FBSyxrRUFBa0UsQ0FBQSxDQUFBO0VBQ2pGLFdBQUE7RUFHQU4sVUFBQUEsV0FBQSxDQUFZQyxXQUFBLEdBQWNGLEdBQUEsQ0FBSSxDQUFDLENBQUEsQ0FBQTtFQUNqQyxTQUFBO0VBQ0YsT0FBQTtFQUVBLE1BQUEsT0FBT0MsV0FBQSxDQUFBO09BQ1IsQ0FBQSxDQUFBLENBQUE7TUFBQVIsZUFBQSxDQUFBLElBQUEsRUFBQSxtQkFBQSxFQWdOMkIsTUFBTy9XLFFBQUEsSUFBcUI7UUFDdEQsTUFBTTtFQUFFc0MsUUFBQUEsS0FBQUE7RUFBTSxPQUFBLEdBQUksS0FBS2tELEtBQUEsQ0FBQTtRQUN2QixNQUFNO0VBQUVzUyxRQUFBQSxRQUFBQTtFQUFTLE9BQUEsR0FBSSxLQUFLMWdCLEtBQUEsQ0FBQTtFQUMxQixNQUFBLElBQUkyZ0IsUUFBQSxHQUFXLENBQUEsQ0FBQTtRQUVmLElBQUk7VUFDRixNQUFNL0IsVUFBQSxHQUFhaFcsUUFBQSxHQUFXLEdBQUEsQ0FBQTtVQUU5QixJQUFJZ1ksWUFBQSxHQUFlLEVBQUMsQ0FBQTtVQUVwQixJQUFJLElBQUEsQ0FBS0MsZ0JBQUEsRUFBa0I7WUFDekJGLFFBQUEsR0FBV3hYLElBQUEsQ0FBS0MsS0FBQSxDQUFNOEIsS0FBQSxDQUFNMlUsVUFBQSxHQUFhakIsVUFBVSxDQUFBLENBQUE7RUFFbkQsVUFBQSxNQUFNa0MsSUFBQSxDQUFLLElBQUtDLENBQUFBLEtBQUEsRUFBT0osUUFBUSxDQUFBLENBQUE7RUFFL0JDLFVBQUFBLFlBQUEsR0FBZTtjQUNiaFksUUFBQTtFQUNBb1ksWUFBQUEsVUFBQSxFQUFZTCxRQUFBQTtFQUNkLFdBQUEsQ0FBQTtXQUNTLE1BQUEsSUFBQSxJQUFBLENBQUtNLE1BQUEsRUFBUTtFQUN0QixVQUFBLE1BQU03UyxLQUFBLEdBQVEsTUFBTSxLQUFLNlMsTUFBQSxDQUFPQyxlQUFBLEVBQWdCLENBQUE7RUFFaEQsVUFBQSxJQUFJOVMsS0FBQSxFQUFPO0VBQ1R1UyxZQUFBQSxRQUFBLEdBQVd4WCxJQUFBLENBQUtDLEtBQUEsQ0FBTWdGLEtBQUEsQ0FBTStTLFlBQUEsQ0FBYUMsYUFBQSxDQUFjQyxXQUFBLEdBQWN6QyxVQUFVLENBQUEsQ0FBQTtFQUMvRSxZQUFBLE1BQU0sSUFBS3FDLENBQUFBLE1BQUEsQ0FBT0gsSUFBQSxDQUFLSCxRQUFRLENBQUEsQ0FBQTtFQUUvQkMsWUFBQUEsWUFBQSxHQUFlO2dCQUNiaFksUUFBQTtFQUNBb1ksY0FBQUEsVUFBQSxFQUFZTCxRQUFBQTtFQUNkLGFBQUEsQ0FBQTthQUNLLE1BQUE7RUFDTEMsWUFBQUEsWUFBQSxHQUFlO0VBQUVoWSxjQUFBQSxRQUFBLEVBQVUsQ0FBQTtFQUFFLGFBQUEsQ0FBQTtFQUMvQixXQUFBO0VBQ0YsU0FBQTtVQUVBLElBQUswWSxDQUFBQSxXQUFBLENBQVlWLFlBQVksQ0FBQSxDQUFBO0VBRTdCLFFBQUEsSUFBSUYsUUFBQSxFQUFVO0VBQ1pBLFVBQUFBLFFBQUEsQ0FBUztFQUNQLFlBQUEsR0FBRyxLQUFLdFMsS0FBQTtFQUNSLFlBQUEsR0FBR3dTLFlBQUE7Y0FDSHJuQixJQUFBLEVBQU1nb0IsSUFBQSxDQUFLQyxRQUFBQTthQUNaLENBQUEsQ0FBQTtFQUNILFNBQUE7RUFDRixPQUFBLENBQUEsT0FBU2hsQixLQUFBLEVBQU87VUFFZEQsT0FBQSxDQUFRQyxLQUFBLENBQU1BLEtBQUssQ0FBQSxDQUFBO0VBQ3JCLE9BQUE7RUFDRixLQUFBLENBQUEsQ0FBQTtFQUFBbWpCLElBQUFBLGVBQUEsZ0NBRWdDLFlBQVk7UUFDMUMsTUFBTTtFQUFFOEIsUUFBQUEsUUFBQUE7RUFBUyxPQUFBLEdBQUksS0FBS3JULEtBQUEsQ0FBQTtRQUUxQixJQUFJO1VBQ0YsTUFBTSxJQUFBLENBQUtzVCxVQUFBLENBQVcsQ0FBQyxLQUFLYixnQkFBQSxJQUFvQixDQUFDWSxRQUFRLENBQUEsQ0FBQTtFQUMzRCxPQUFBLENBQUEsT0FBU2psQixLQUFBLEVBQU87VUFFZEQsT0FBQSxDQUFRQyxLQUFBLENBQU1BLEtBQUssQ0FBQSxDQUFBO0VBQ3JCLE9BQUE7RUFDRixLQUFBLENBQUEsQ0FBQTtFQUFBbWpCLElBQUFBLGVBQUEsOEJBRThCLFlBQVk7UUFDeEMsSUFBSTtVQUVGLElBQUksSUFBQSxDQUFLa0IsZ0JBQUEsRUFBa0I7WUFDekIsTUFBTWMsUUFBQSxDQUFTLElBQUEsQ0FBS1osS0FBSyxDQUFBLENBQUE7RUFDekIsVUFBQSxJQUFBLENBQUthLFdBQUEsR0FBY3hsQixNQUFBLENBQU95bEIsVUFBQSxDQUFXLE1BQU07RUFDekMsWUFBQSxJQUFBLENBQUtDLFVBQUEsRUFBVyxDQUFBO0VBQ2xCLFdBQUEsRUFBRyxHQUFHLENBQUEsQ0FBQTtXQUNHLE1BQUEsSUFBQSxJQUFBLENBQUtiLE1BQUEsRUFBUTtFQUN0QixVQUFBLE1BQU0sSUFBS0EsQ0FBQUEsTUFBQSxDQUFPYyxhQUFBLEVBQWMsQ0FBQTtFQUNsQyxTQUFBO0VBQ0YsT0FBQSxDQUFBLE9BQVN2bEIsS0FBQSxFQUFPO1VBRWRELE9BQUEsQ0FBUUMsS0FBQSxDQUFNQSxLQUFLLENBQUEsQ0FBQTtFQUNyQixPQUFBO0VBQ0YsS0FBQSxDQUFBLENBQUE7RUFBQW1qQixJQUFBQSxlQUFBLDBCQUUwQixZQUFZO1FBQ3BDLElBQUk7VUFFRixJQUFJLElBQUEsQ0FBS2tCLGdCQUFBLEVBQWtCO1lBQ3pCLE1BQU1tQixJQUFBLENBQUssSUFBQSxDQUFLakIsS0FBSyxDQUFBLENBQUE7RUFDckIsVUFBQSxJQUFBLENBQUthLFdBQUEsR0FBY3hsQixNQUFBLENBQU95bEIsVUFBQSxDQUFXLE1BQU07RUFDekMsWUFBQSxJQUFBLENBQUtDLFVBQUEsRUFBVyxDQUFBO0VBQ2xCLFdBQUEsRUFBRyxHQUFHLENBQUEsQ0FBQTtXQUNHLE1BQUEsSUFBQSxJQUFBLENBQUtiLE1BQUEsRUFBUTtFQUN0QixVQUFBLE1BQU0sSUFBS0EsQ0FBQUEsTUFBQSxDQUFPZ0IsU0FBQSxFQUFVLENBQUE7RUFDOUIsU0FBQTtFQUNGLE9BQUEsQ0FBQSxPQUFTemxCLEtBQUEsRUFBTztVQUVkRCxPQUFBLENBQVFDLEtBQUEsQ0FBTUEsS0FBSyxDQUFBLENBQUE7RUFDckIsT0FBQTtFQUNGLEtBQUEsQ0FBQSxDQUFBO01BQUFtakIsZUFBQSxDQUFBLElBQUEsRUFBQSxtQkFBQSxFQUU0QixNQUFPdUMsUUFBQSxJQUFxQjtRQUN0RCxNQUFNO0VBQUVDLFFBQUFBLGFBQUFBO0VBQWMsT0FBQSxHQUFJLEtBQUsvVCxLQUFBLENBQUE7UUFDL0IsTUFBTTtVQUFFZ1UsUUFBQTtFQUFVQyxRQUFBQSxzQkFBQUE7RUFBdUIsT0FBQSxHQUFJLEtBQUtyaUIsS0FBQSxDQUFBO0VBRWxELE1BQUEsSUFBQSxDQUFLc2hCLFdBQUEsQ0FBWTtFQUFFZ0IsUUFBQUEsZUFBQSxFQUFpQkosUUFBQUE7U0FBVSxDQUFBLENBQUE7UUFFOUMsSUFBSTtFQUNGLFFBQUEsTUFBTUssU0FBQSxDQUFVLElBQUt4QixDQUFBQSxLQUFBLEVBQU9tQixRQUFRLENBQUEsQ0FBQTtFQUdwQyxRQUFBLElBQUlHLHNCQUFBLEVBQXdCO0VBQzFCRyxVQUFBQSxjQUFBLENBQWVDLE9BQUEsQ0FBUSxjQUFBLEVBQWdCUCxRQUFRLENBQUEsQ0FBQTtFQUNqRCxTQUFBO0VBR0EsUUFBQSxJQUFJQyxhQUFBLEVBQWU7WUFDakIsTUFBTSxJQUFBLENBQUtMLFVBQUEsRUFBVyxDQUFBO0VBRXRCLFVBQUEsTUFBTVksV0FBQSxHQUFjLE1BQU1DLGdCQUFBLENBQWlCLEtBQUs1QixLQUFLLENBQUEsQ0FBQTtZQUVyRCxJQUFJMkIsV0FBQSxJQUFlLENBQUNBLFdBQUEsQ0FBWUUsVUFBQSxJQUFjUixRQUFBLEVBQVU7Y0FDdEQsTUFBTSxJQUFBLENBQUtWLFVBQUEsQ0FBVyxJQUFJLENBQUEsQ0FBQTtFQUM1QixXQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUEsQ0FBQSxPQUFTbGxCLEtBQUEsRUFBTztVQUVkRCxPQUFBLENBQVFDLEtBQUEsQ0FBTUEsS0FBSyxDQUFBLENBQUE7RUFDckIsT0FBQTtFQUNGLEtBQUEsQ0FBQSxDQUFBO01BQUFtakIsZUFBQSxDQUFBLElBQUEsRUFBQSw0QkFBQSxFQUVzQ2tELE1BQUEsSUFBb0I7UUFDeEQsTUFBTTtFQUFFQyxRQUFBQSxPQUFBQTtFQUFRLE9BQUEsR0FBSSxLQUFLMVUsS0FBQSxDQUFBO0VBRXpCLE1BQUEsSUFBQSxDQUFLa1QsV0FBQSxDQUFZO0VBQUV3QixRQUFBQSxPQUFBLEVBQVNELE1BQUFBO1NBQVEsQ0FBQSxDQUFBO1FBR3BDLElBQUlDLE9BQUEsS0FBWUQsTUFBQSxFQUFRO0VBQ3RCLFFBQUEsSUFBQSxDQUFLRSxjQUFBLENBQWU7RUFDbEIsVUFBQSxHQUFHLEtBQUszVSxLQUFBO0VBQ1IwVSxVQUFBQSxPQUFBLEVBQVNELE1BQUE7WUFDVHRwQixJQUFBLEVBQU1nb0IsSUFBQSxDQUFLeUIsUUFBQUE7V0FDWixDQUFBLENBQUE7RUFDSCxPQUFBO0VBQ0YsS0FBQSxDQUFBLENBQUE7RUFBQXJELElBQUFBLGVBQUEsQ0FFNkIsSUFBQSxFQUFBLG9CQUFBLEVBQUEsT0FBT3BtQixJQUFBLEVBQWlCc1ksT0FBQSxLQUFvQjtRQUN2RSxNQUFNO0VBQUVnUixRQUFBQSxNQUFBQTtFQUFPLE9BQUEsR0FBSSxLQUFLelUsS0FBQSxDQUFBO0VBQ3hCLE1BQUEsTUFBTTZVLGVBQUEsR0FBa0IxcEIsSUFBQSxLQUFTMnBCLFVBQUEsQ0FBV0MsUUFBQSxDQUFBO0VBQzVDLE1BQUEsTUFBTUMscUJBQUEsR0FBd0I3cEIsSUFBQSxLQUFTMnBCLFVBQUEsQ0FBV0csY0FBQSxDQUFBO1FBRWxELElBQUlDLFVBQUEsR0FBYVQsTUFBQSxDQUFBO1FBQ2pCLElBQUlVLE9BQUEsR0FBMkIsRUFBQyxDQUFBO0VBRWhDLE1BQUEsSUFBSSxJQUFLdEMsQ0FBQUEsTUFBQSxJQUFVLENBQUNnQyxlQUFBLEVBQWlCO1VBQ25DLElBQUtoQyxDQUFBQSxNQUFBLENBQU91QyxVQUFBLEVBQVcsQ0FBQTtFQUN2QixRQUFBLElBQUEsQ0FBS3ZDLE1BQUEsR0FBUyxLQUFBLENBQUEsQ0FBQTtFQUNoQixPQUFBO0VBRUEsTUFBQSxJQUFJbUMscUJBQUEsRUFBdUI7VUFDekJFLFVBQUEsR0FBYUcsTUFBQSxDQUFPQyxXQUFBLENBQUE7VUFFcEIsQ0FBQztFQUFFSCxVQUFBQSxPQUFBLEdBQVUsRUFBQTtFQUFHLFNBQUEsR0FBSSxNQUFNSSxVQUFBLENBQVcsSUFBQSxDQUFLNUMsS0FBSyxDQUFBLEVBQUE7U0FDdEMsTUFBQSxJQUFBLENBQUNrQyxlQUFBLEVBQWlCO1VBQzNCSyxVQUFBLEdBQWFHLE1BQUEsQ0FBT0csS0FBQSxDQUFBO0VBQ3RCLE9BQUE7RUFFQSxNQUFBLElBQUEsQ0FBS3RDLFdBQUEsQ0FBWTtVQUNmaUMsT0FBQTtFQUNBL21CLFFBQUFBLEtBQUEsRUFBT3FWLE9BQUE7RUFDUGdTLFFBQUFBLFNBQUEsRUFBV3RxQixJQUFBO0VBQ1h1cUIsUUFBQUEsY0FBQSxFQUFnQixLQUFBO0VBQ2hCM0IsUUFBQUEsYUFBQSxFQUFlaUIscUJBQUE7RUFDZlAsUUFBQUEsTUFBQSxFQUFRUyxVQUFBQTtTQUNULENBQUEsQ0FBQTtFQUNILEtBQUEsQ0FBQSxDQUFBO01BQUEzRCxlQUFBLENBQUEsSUFBQSxFQUFBLDBCQUFBLEVBRW1DLE1BQU92UixLQUFBLElBQWlDO1FBQ3pFLElBQUk7RUFFRixRQUFBLElBQUlBLEtBQUEsRUFBTztZQUNULE1BQU07Y0FDSjJWLE1BQUE7Y0FDQW5iLFFBQUE7Y0FDQW9iLFdBQUE7RUFDQUMsWUFBQUEsT0FBQSxFQUFBQyxRQUFBO0VBQ0EvQyxZQUFBQSxZQUFBLEVBQWM7Z0JBQUVDLGFBQUE7Z0JBQWUrQyxXQUFBO0VBQWFDLGNBQUFBLGVBQUFBO0VBQWdCLGFBQUE7RUFDOUQsV0FBQSxHQUFJaFcsS0FBQSxDQUFBO1lBRUosTUFBTWlXLFNBQUEsR0FBWSxDQUFDTixNQUFBLENBQUE7WUFDbkIsTUFBTU8sTUFBQSxHQUFVLENBQU0sTUFBQSxJQUFBLENBQUtyRCxNQUFBLEVBQVFzRCxTQUFBLEVBQWdCLEtBQUEsR0FBQSxDQUFBO1lBQ25ELElBQUlDLFVBQUEsR0FBYSxFQUFDLENBQUE7RUFFbEIsVUFBQSxJQUFJNWIsUUFBQSxLQUFhLENBQUt3WSxJQUFBQSxhQUFBLEVBQWU7RUFDbkNvRCxZQUFBQSxVQUFBLEdBQWE7RUFDWEMsY0FBQUEsVUFBQSxFQUFZTixXQUFBLENBQVkxZCxHQUFBLENBQUlpZSxZQUFZLENBQUE7RUFDeEM5YixjQUFBQSxRQUFBLEVBQVUsQ0FBQTtFQUNWK2IsY0FBQUEsY0FBQSxFQUFnQlAsZUFBQSxDQUFnQjNkLEdBQUEsQ0FBSWllLFlBQVksQ0FBQTtnQkFDaER4WixLQUFBLEVBQU93WixZQUFBLENBQWF0RCxhQUFhLENBQUE7RUFDbkMsYUFBQSxDQUFBO0VBQ0YsV0FBQTtFQUVBLFVBQUEsSUFBQSxDQUFLRSxXQUFBLENBQVk7RUFDZjlrQixZQUFBQSxLQUFBLEVBQU8sRUFBQTtFQUNQcW5CLFlBQUFBLFNBQUEsRUFBVyxJQUFBO0VBQ1hwQyxZQUFBQSxRQUFBLEVBQVUsSUFBQTtjQUNWNEMsU0FBQTtFQUNBckQsWUFBQUEsVUFBQSxFQUFZcFksUUFBQTtjQUNaZ2MsTUFBQSxFQUFRQyxjQUFBLENBQWViLFdBQVcsQ0FBQTtFQUNsQ0MsWUFBQUEsT0FBQSxFQUFBQyxRQUFBO2NBQ0FJLE1BQUEsRUFBUWxiLEtBQUEsQ0FBTWtiLE1BQU0sQ0FBQTtjQUNwQixHQUFHRSxVQUFBQTthQUNKLENBQUEsQ0FBQTtXQUNRLE1BQUEsSUFBQSxJQUFBLENBQUszRCxnQkFBQSxFQUFrQjtZQUNoQyxNQUFNLElBQUEsQ0FBS2lCLFVBQUEsRUFBVyxDQUFBO1dBQ2pCLE1BQUE7RUFDTCxVQUFBLElBQUEsQ0FBS1IsV0FBQSxDQUFZO0VBQ2ZHLFlBQUFBLFFBQUEsRUFBVSxLQUFBO0VBQ1Y0QyxZQUFBQSxTQUFBLEVBQVcsS0FBQTtFQUNYSSxZQUFBQSxVQUFBLEVBQVksRUFBQztFQUNiN2IsWUFBQUEsUUFBQSxFQUFVLENBQUE7RUFDVitiLFlBQUFBLGNBQUEsRUFBZ0IsRUFBQztFQUNqQnpaLFlBQUFBLEtBQUEsRUFBTztFQUNMMFUsY0FBQUEsT0FBQSxFQUFTLEVBQUM7RUFDVkMsY0FBQUEsVUFBQSxFQUFZLENBQUE7RUFDWkMsY0FBQUEsRUFBQSxFQUFJLEVBQUE7RUFDSkMsY0FBQUEsS0FBQSxFQUFPLEVBQUE7RUFDUDNnQixjQUFBQSxJQUFBLEVBQU0sRUFBQTtFQUNONGdCLGNBQUFBLEdBQUEsRUFBSyxFQUFBO0VBQ1AsYUFBQTthQUNELENBQUEsQ0FBQTtFQUNILFNBQUE7RUFDRixPQUFBLENBQUEsT0FBU3hqQixLQUFBLEVBQU87VUFFZEQsT0FBQSxDQUFRQyxLQUFBLENBQU1BLEtBQUssQ0FBQSxDQUFBO0VBQ3JCLE9BQUE7RUFDRixLQUFBLENBQUEsQ0FBQTtFQUFBbWpCLElBQUFBLGVBQUEsNkJBRTZCLE9BQU87RUFBRW1GLE1BQUFBLFNBQUFBO09BQTZDLEtBQUE7UUFDakYsTUFBTTtVQUFFeEMsZUFBQTtFQUFpQmlCLFFBQUFBLE9BQUFBO0VBQVEsT0FBQSxHQUFJLE1BQU0sSUFBQSxDQUFLd0IsaUJBQUEsQ0FBa0JELFNBQVMsQ0FBQSxDQUFBO0VBRTNFLE1BQUEsSUFBQSxDQUFLeEQsV0FBQSxDQUFZO1VBQ2ZnQixlQUFBO0VBQ0FKLFFBQUFBLFFBQUEsRUFBVTRDLFNBQUE7VUFDVnZCLE9BQUE7RUFDQU8sUUFBQUEsY0FBQSxFQUFnQixLQUFBO1VBQ2hCakIsTUFBQSxFQUFRaUMsU0FBQSxHQUFZckIsTUFBQSxDQUFPdUIsS0FBQSxHQUFRdkIsTUFBQSxDQUFPd0IsSUFBQUE7U0FDM0MsQ0FBQSxDQUFBO0VBQ0gsS0FBQSxDQUFBLENBQUE7RUFBQXRGLElBQUFBLGVBQUEsdUJBRXVCLE1BQU07UUFDM0IsTUFBTTtFQUFFdUYsUUFBQUEsTUFBQSxHQUFTLFlBQUE7RUFBYSxPQUFBLEdBQUksS0FBS2xsQixLQUFBLENBQUE7UUFFdkNtbEIsWUFBQSxDQUFhLEtBQUtDLGFBQWEsQ0FBQSxDQUFBO0VBRS9CLE1BQUEsSUFBQSxDQUFLQSxhQUFBLEdBQWdCaHBCLE1BQUEsQ0FBT3lsQixVQUFBLENBQVcsTUFBTTtVQUMzQyxJQUFLd0QsQ0FBQUEsbUJBQUEsR0FBc0JqcEIsTUFBQSxDQUFPa3BCLFVBQUEsSUFBYyxHQUFBLElBQU9KLE1BQUEsS0FBVyxZQUFBLENBQUE7RUFDbEUsUUFBQSxJQUFBLENBQUtLLFdBQUEsRUFBWSxDQUFBO0VBQ25CLE9BQUEsRUFBRyxHQUFHLENBQUEsQ0FBQTtFQUNSLEtBQUEsQ0FBQSxDQUFBO0VBQUE1RixJQUFBQSxlQUFBLDhCQUU4QixNQUFNO1FBQ2xDLE1BQU07RUFBRTZGLFFBQUFBLG9CQUFBQTtFQUFxQixPQUFBLEdBQUksS0FBS3hsQixLQUFBLENBQUE7RUFFdEMsTUFBQSxJQUFJd2xCLG9CQUFBLEVBQXNCO1VBQ3hCLElBQUtsRSxDQUFBQSxXQUFBLENBQVlwUixhQUFBLElBQWlCO1lBQ2hDLE9BQU87Y0FBRXVWLFdBQUEsRUFBYSxDQUFDdlYsYUFBQSxDQUFjdVYsV0FBQUE7RUFBWSxXQUFBLENBQUE7V0FDbEQsQ0FBQSxDQUFBO0VBQ0gsT0FBQTtFQUNGLEtBQUEsQ0FBQSxDQUFBO0VBQUE5RixJQUFBQSxlQUFBLDJCQTJCMkIsTUFBTTtRQUMvQixNQUFNO0VBQUUyRSxRQUFBQSxNQUFBQTtFQUFPLE9BQUEsR0FBSSxLQUFLbFcsS0FBQSxDQUFBO1FBQ3hCLE1BQU07VUFDSnNYLGFBQUEsR0FBaUJoRixRQUFBLElBQW9DO1lBQ25EQSxRQUFBLENBQVMsS0FBS0ssS0FBSyxDQUFBLENBQUE7RUFDckIsU0FBQTtVQUNBNEUsU0FBQTtFQUNBdm1CLFFBQUFBLElBQUEsR0FBTyxvQkFBQTtFQUNULE9BQUEsR0FBSSxLQUFLWSxLQUFBLENBQUE7RUFFVCxNQUFBLElBQUksQ0FBQzVELE1BQUEsQ0FBT3dwQixPQUFBLEVBQVM7RUFDbkIsUUFBQSxPQUFBO0VBQ0YsT0FBQTtFQUVBLE1BQUEsSUFBQSxDQUFLdEUsV0FBQSxDQUFZO0VBQ2Y5a0IsUUFBQUEsS0FBQSxFQUFPLEVBQUE7RUFDUHFuQixRQUFBQSxTQUFBLEVBQVcsSUFBQTtFQUNYQyxRQUFBQSxjQUFBLEVBQWdCLElBQUE7U0FDakIsQ0FBQSxDQUFBO1FBRUQsSUFBSzdDLENBQUFBLE1BQUEsR0FBUyxJQUFJN2tCLE1BQUEsQ0FBT3dwQixPQUFBLENBQVFDLE1BQUEsQ0FBTztVQUN0Q0gsYUFBQTtVQUNBdG1CLElBQUE7RUFDQWtsQixRQUFBQSxNQUFBQTtTQUNELENBQUEsQ0FBQTtFQUVELE1BQUEsSUFBQSxDQUFLckQsTUFBQSxDQUFPNkUsV0FBQSxDQUFZLE9BQUEsRUFBUyxLQUFLQyxrQkFBa0IsQ0FBQSxDQUFBO0VBQ3hELE1BQUEsSUFBQSxDQUFLOUUsTUFBQSxDQUFPNkUsV0FBQSxDQUFZLFdBQUEsRUFBYSxLQUFLQyxrQkFBa0IsQ0FBQSxDQUFBO0VBQzVELE1BQUEsSUFBQSxDQUFLOUUsTUFBQSxDQUFPNkUsV0FBQSxDQUFZLHNCQUFBLEVBQXdCLEtBQUtFLHdCQUF3QixDQUFBLENBQUE7RUFDN0UsTUFBQSxJQUFBLENBQUsvRSxNQUFBLENBQU82RSxXQUFBLENBQVksc0JBQUEsRUFBd0J0cEIsS0FBQSxJQUM5QyxJQUFBLENBQUt5cEIsa0JBQUEsQ0FBbUIvQyxVQUFBLENBQVdHLGNBQUEsRUFBZ0I3bUIsS0FBQSxDQUFNcVYsT0FBTyxDQUNsRSxDQUFBLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS29QLE1BQUEsQ0FBTzZFLFdBQUEsQ0FBWSxzQkFBQSxFQUF3QnRwQixLQUFBLElBQzlDLElBQUEsQ0FBS3lwQixrQkFBQSxDQUFtQi9DLFVBQUEsQ0FBV2dELGNBQUEsRUFBZ0IxcEIsS0FBQSxDQUFNcVYsT0FBTyxDQUNsRSxDQUFBLENBQUE7RUFDQSxNQUFBLElBQUEsQ0FBS29QLE1BQUEsQ0FBTzZFLFdBQUEsQ0FBWSxlQUFBLEVBQWlCdHBCLEtBQUEsSUFDdkMsSUFBQSxDQUFLeXBCLGtCQUFBLENBQW1CL0MsVUFBQSxDQUFXaUQsT0FBQSxFQUFTM3BCLEtBQUEsQ0FBTXFWLE9BQU8sQ0FDM0QsQ0FBQSxDQUFBO0VBQ0EsTUFBQSxJQUFBLENBQUtvUCxNQUFBLENBQU82RSxXQUFBLENBQVksZ0JBQUEsRUFBa0J0cEIsS0FBQSxJQUN4QyxJQUFBLENBQUt5cEIsa0JBQUEsQ0FBbUIvQyxVQUFBLENBQVdDLFFBQUEsRUFBVTNtQixLQUFBLENBQU1xVixPQUFPLENBQzVELENBQUEsQ0FBQTtFQUNBLE1BQUEsSUFBQSxDQUFLb1AsTUFBQSxDQUFPNkUsV0FBQSxDQUFZLG1CQUFtQixZQUFZO1VBRXJEdnBCLE9BQUEsQ0FBUTZwQixHQUFBLENBQUksdURBQXVELENBQUEsQ0FBQTtTQUNwRSxDQUFBLENBQUE7UUFFRCxJQUFLbkYsQ0FBQUEsTUFBQSxDQUFPb0YsT0FBQSxFQUFRLENBQUE7RUFFcEIsTUFBQSxJQUFJVixTQUFBLEVBQVc7VUFDYkEsU0FBQSxDQUFVLEtBQUsxRSxNQUFNLENBQUEsQ0FBQTtFQUN2QixPQUFBO0VBQ0YsS0FBQSxDQUFBLENBQUE7TUFBQXRCLGVBQUEsQ0FBQSxJQUFBLEVBQUEsbUJBQUEsRUFRNkJHLEVBQUEsSUFBZTtFQUMxQyxNQUFBLElBQUEsQ0FBS3dCLFdBQUEsQ0FBWTtFQUFFZ0IsUUFBQUEsZUFBQSxFQUFpQnhDLEVBQUE7RUFBSXVFLFFBQUFBLFNBQUEsRUFBVyxJQUFBO1NBQU0sQ0FBQSxDQUFBO0VBQzNELEtBQUEsQ0FBQSxDQUFBO01BQUExRSxlQUFBLENBQUEsSUFBQSxFQUFBLFdBQUEsRUFFb0IsTUFBTzJFLE1BQUEsSUFBbUI7UUFFNUMsSUFBSSxJQUFBLENBQUt6RCxnQkFBQSxFQUFrQjtFQUN6QixRQUFBLE1BQU15RixTQUFBLENBQVUsSUFBS3ZGLENBQUFBLEtBQUEsRUFBTzVYLElBQUEsQ0FBS0MsS0FBQSxDQUFNa2IsTUFBQSxHQUFTLEdBQUcsQ0FBQyxDQUFBLENBQUE7VUFDcEQsTUFBTSxJQUFBLENBQUt4QyxVQUFBLEVBQVcsQ0FBQTtTQUNiLE1BQUEsSUFBQSxJQUFBLENBQUtiLE1BQUEsRUFBUTtFQUN0QixRQUFBLE1BQU0sSUFBS0EsQ0FBQUEsTUFBQSxDQUFPcUYsU0FBQSxDQUFVaEMsTUFBTSxDQUFBLENBQUE7RUFDcEMsT0FBQTtFQUVBLE1BQUEsSUFBQSxDQUFLaEQsV0FBQSxDQUFZO0VBQUVnRCxRQUFBQSxNQUFBQTtTQUFRLENBQUEsQ0FBQTtFQUM3QixLQUFBLENBQUEsQ0FBQTtFQUFBM0UsSUFBQUEsZUFBQSxxQkFFcUIsWUFBWTtRQUMvQixJQUFJLENBQUMsSUFBSzRHLENBQUFBLFNBQUEsRUFBVztFQUNuQixRQUFBLE9BQUE7RUFDRixPQUFBO1FBRUEsTUFBTTtFQUFFckUsUUFBQUEsUUFBQUE7RUFBUyxPQUFBLEdBQUksS0FBSzlULEtBQUEsQ0FBQTtRQUUxQixJQUFJO0VBQ0YsUUFBQSxNQUFNc1UsV0FBQSxHQUFjLE1BQU1DLGdCQUFBLENBQWlCLEtBQUs1QixLQUFLLENBQUEsQ0FBQTtVQUNyRCxJQUFJN1YsS0FBQSxHQUFRLElBQUEsQ0FBS3NiLFVBQUEsQ0FBQTtVQUVqQixJQUFJLENBQUM5RCxXQUFBLEVBQWE7WUFDaEIsTUFBTSxJQUFJcGpCLEtBQUEsQ0FBTSxXQUFXLENBQUEsQ0FBQTtFQUM3QixTQUFBO1VBR0EsSUFBSW9qQixXQUFBLENBQVkrRCxJQUFBLEVBQU07RUFDcEJ2YixVQUFBQSxLQUFBLEdBQVE7RUFDTjBVLFlBQUFBLE9BQUEsRUFBUyxTQUFBLElBQWE4QyxXQUFBLENBQVkrRCxJQUFBLEdBQU8vRCxXQUFBLENBQVkrRCxJQUFBLENBQUs3RyxPQUFBLEdBQVUsRUFBQztFQUNyRUMsWUFBQUEsVUFBQSxFQUFZNkMsV0FBQSxDQUFZK0QsSUFBQSxDQUFLcEYsV0FBQTtFQUM3QnZCLFlBQUFBLEVBQUEsRUFBSTRDLFdBQUEsQ0FBWStELElBQUEsQ0FBSzNHLEVBQUE7RUFDckJDLFlBQUFBLEtBQUEsRUFBTyxPQUFBLElBQVcyQyxXQUFBLENBQVkrRCxJQUFBLEdBQU9DLGFBQUEsQ0FBY2hFLFdBQUEsQ0FBWStELElBQUEsQ0FBS0UsS0FBSyxDQUFJLEdBQUEsRUFBQTtFQUM3RXZuQixZQUFBQSxJQUFBLEVBQU1zakIsV0FBQSxDQUFZK0QsSUFBQSxDQUFLcm5CLElBQUE7RUFDdkI0Z0IsWUFBQUEsR0FBQSxFQUFLMEMsV0FBQSxDQUFZK0QsSUFBQSxDQUFLekcsR0FBQUE7RUFDeEIsV0FBQSxDQUFBO0VBQ0YsU0FBQTtFQUVBLFFBQUEsSUFBQSxDQUFLc0IsV0FBQSxDQUFZO0VBQ2Y5a0IsVUFBQUEsS0FBQSxFQUFPLEVBQUE7RUFDUHFuQixVQUFBQSxTQUFBLEVBQVcsSUFBQTtFQUNYcEMsVUFBQUEsUUFBQSxFQUFVLElBQUE7WUFDVjRDLFNBQUEsRUFBVzNCLFdBQUEsQ0FBWUUsVUFBQTtFQUN2QjZCLFVBQUFBLFVBQUEsRUFBWSxFQUFDO0VBQ2JFLFVBQUFBLGNBQUEsRUFBZ0IsRUFBQztZQUNqQjNELFVBQUEsRUFBWTBCLFdBQUEsQ0FBWStELElBQUEsR0FBTy9ELFdBQUEsQ0FBWWtFLFdBQUEsSUFBZSxDQUFJLEdBQUEsQ0FBQTtZQUM5RC9ELE1BQUEsRUFBUVksTUFBQSxDQUFPdUIsS0FBQTtZQUNmOVosS0FBQTtFQUNBb1osVUFBQUEsTUFBQSxFQUFRdUMsV0FBQSxDQUFZbkUsV0FBQSxDQUFZb0UsTUFBQSxDQUFPQyxjQUFjLENBQUE7V0FDdEQsQ0FBQSxDQUFBO0VBQ0gsT0FBQSxDQUFBLE9BQVN2cUIsS0FBQSxFQUFZO0VBQ25CLFFBQUEsTUFBTTRSLEtBQUEsR0FBUTtFQUNacVQsVUFBQUEsUUFBQSxFQUFVLEtBQUE7RUFDVjRDLFVBQUFBLFNBQUEsRUFBVyxLQUFBO0VBQ1h6YixVQUFBQSxRQUFBLEVBQVUsQ0FBQTtFQUNWc0MsVUFBQUEsS0FBQSxFQUFPLElBQUtzYixDQUFBQSxVQUFBQTtFQUNkLFNBQUEsQ0FBQTtFQUVBLFFBQUEsSUFBSXRFLFFBQUEsRUFBVTtFQUNaLFVBQUEsSUFBQSxDQUFLWixXQUFBLENBQVk7RUFDZmdCLFlBQUFBLGVBQUEsRUFBaUJKLFFBQUE7Y0FDakIsR0FBRzlULEtBQUFBO2FBQ0osQ0FBQSxDQUFBO0VBRUQsVUFBQSxPQUFBO0VBQ0YsU0FBQTtFQUVBLFFBQUEsSUFBQSxDQUFLa1QsV0FBQSxDQUFZO1lBQ2Y5a0IsS0FBQSxFQUFPQSxLQUFBLENBQU1xVixPQUFBO1lBQ2JnUyxTQUFBLEVBQVdYLFVBQUEsQ0FBVzhELE1BQUE7WUFDdEJuRSxNQUFBLEVBQVFZLE1BQUEsQ0FBT0csS0FBQTtZQUNmLEdBQUd4VixLQUFBQTtXQUNKLENBQUEsQ0FBQTtFQUNILE9BQUE7RUFDRixLQUFBLENBQUEsQ0FBQTtFQUFBdVIsSUFBQUEsZUFBQSx1QkE0Q3VCLFlBQVk7UUFDakMsTUFBTTtFQUFFMkMsUUFBQUEsZUFBQUE7RUFBZ0IsT0FBQSxHQUFJLEtBQUtsVSxLQUFBLENBQUE7UUFDakMsTUFBTTtVQUFFbkIsTUFBQTtFQUFRb1QsUUFBQUEsSUFBQUE7RUFBSyxPQUFBLEdBQUksS0FBS3JnQixLQUFBLENBQUE7UUFDOUIsTUFBTW1nQixXQUFBLEdBQWMsSUFBSzhHLENBQUFBLGNBQUEsQ0FBZUMsT0FBQSxDQUFRN0csSUFBSSxDQUFDLENBQUEsQ0FBQTtRQUVyRCxJQUFJLE9BQU9wVCxNQUFBLEtBQVcsUUFBVSxFQUFBO0VBQzlCLFFBQUEsTUFBTWthLElBQUEsQ0FBSyxJQUFLcEcsQ0FBQUEsS0FBQSxFQUFPO0VBQUVtQixVQUFBQSxRQUFBLEVBQVVJLGVBQUE7WUFBaUJyVixNQUFBO1lBQVEsR0FBR2tULFdBQUFBO1dBQWEsQ0FBQSxDQUFBO0VBQzlFLE9BQUE7RUFDRixLQUFBLENBQUEsQ0FBQTtFQUFBUixJQUFBQSxlQUFBLENBRXFCLElBQUEsRUFBQSxZQUFBLEVBQUEsT0FBT3lILEtBQUEsR0FBUSxLQUFVLEtBQUE7UUFDNUMsTUFBTTtVQUFFOUUsZUFBQTtVQUFpQitCLFNBQUE7RUFBV2dELFFBQUFBLFdBQUFBO0VBQVksT0FBQSxHQUFJLEtBQUtqWixLQUFBLENBQUE7UUFDekQsTUFBTTtVQUFFbkIsTUFBQTtFQUFRb1QsUUFBQUEsSUFBQUE7RUFBSyxPQUFBLEdBQUksS0FBS3JnQixLQUFBLENBQUE7RUFDOUIsTUFBQSxNQUFNc25CLGdCQUFBLEdBQW1CRixLQUFBLElBQVNDLFdBQUEsQ0FBQTtRQUNsQyxNQUFNbEgsV0FBQSxHQUFjLElBQUs4RyxDQUFBQSxjQUFBLENBQWVDLE9BQUEsQ0FBUTdHLElBQUksQ0FBQyxDQUFBLENBQUE7UUFFckQsSUFBSTtVQUVGLElBQUksSUFBQSxDQUFLUSxnQkFBQSxFQUFrQjtZQUN6QixJQUFJLENBQUN3RCxTQUFBLEVBQVc7RUFDZCxZQUFBLE1BQU04QyxJQUFBLENBQUssSUFBS3BHLENBQUFBLEtBQUEsRUFBTztFQUNyQm1CLGNBQUFBLFFBQUEsRUFBVUksZUFBQTtnQkFDVnJWLE1BQUE7Z0JBQ0EsSUFBSXFhLGdCQUFBLEdBQW1CbkgsV0FBQSxHQUFjLEtBQUEsQ0FBQSxDQUFBO2VBQ3RDLENBQUEsQ0FBQTthQUNJLE1BQUE7Y0FDTCxNQUFNb0gsS0FBQSxDQUFNLElBQUEsQ0FBS3hHLEtBQUssQ0FBQSxDQUFBO0VBRXRCLFlBQUEsSUFBQSxDQUFLTyxXQUFBLENBQVk7RUFBRStDLGNBQUFBLFNBQUEsRUFBVyxLQUFBO2VBQU8sQ0FBQSxDQUFBO0VBQ3ZDLFdBQUE7RUFFQSxVQUFBLElBQUEsQ0FBS3pDLFdBQUEsR0FBY3hsQixNQUFBLENBQU95bEIsVUFBQSxDQUFXLE1BQU07RUFDekMsWUFBQSxJQUFBLENBQUtDLFVBQUEsRUFBVyxDQUFBO0VBQ2xCLFdBQUEsRUFBRyxHQUFHLENBQUEsQ0FBQTtXQUNHLE1BQUEsSUFBQSxJQUFBLENBQUtiLE1BQUEsRUFBUTtFQUN0QixVQUFBLE1BQU0sSUFBS0EsQ0FBQUEsTUFBQSxDQUFPdUcsZUFBQSxFQUFnQixDQUFBO0VBRWxDLFVBQUEsTUFBTTlFLFdBQUEsR0FBYyxNQUFNLEtBQUt6QixNQUFBLENBQU9DLGVBQUEsRUFBZ0IsQ0FBQTtFQUN0RCxVQUFBLE1BQU11RyxVQUFBLEdBQWEsQ0FBQy9FLFdBQUEsSUFBZSxDQUFDLEVBQUV2QyxXQUFBLENBQVlDLFdBQUEsSUFBZUQsV0FBQSxDQUFZRSxJQUFBLENBQUEsQ0FBQTtZQUU3RSxJQUFJb0gsVUFBQSxJQUFjSCxnQkFBQSxFQUFrQjtFQUNsQyxZQUFBLE1BQU1ILElBQUEsQ0FBSyxJQUFLcEcsQ0FBQUEsS0FBQSxFQUFPO0VBQ3JCbUIsY0FBQUEsUUFBQSxFQUFVSSxlQUFBO2dCQUNWclYsTUFBQTtnQkFDQSxJQUFJcWEsZ0JBQUEsR0FBbUJuSCxXQUFBLEdBQWMsS0FBQSxDQUFBLENBQUE7ZUFDdEMsQ0FBQSxDQUFBO0VBQ0QsWUFBQSxNQUFNLElBQUtjLENBQUFBLE1BQUEsQ0FBT1MsVUFBQSxFQUFXLENBQUE7YUFDeEIsTUFBQTtFQUNMLFlBQUEsTUFBTSxJQUFLVCxDQUFBQSxNQUFBLENBQU9TLFVBQUEsRUFBVyxDQUFBO0VBQy9CLFdBQUE7RUFDRixTQUFBO0VBRUEsUUFBQSxJQUFJMkYsV0FBQSxFQUFhO0VBQ2YsVUFBQSxJQUFBLENBQUsvRixXQUFBLENBQVk7RUFBRStGLFlBQUFBLFdBQUEsRUFBYSxLQUFBO2FBQU8sQ0FBQSxDQUFBO0VBQ3pDLFNBQUE7RUFDRixPQUFBLENBQUEsT0FBUzdxQixLQUFBLEVBQU87VUFFZEQsT0FBQSxDQUFRQyxLQUFBLENBQU1BLEtBQUssQ0FBQSxDQUFBO0VBQ3JCLE9BQUE7RUFDRixLQUFBLENBQUEsQ0FBQTtFQUFBbWpCLElBQUFBLGVBQUEsd0JBRXdCLFlBQVk7UUFDbEMsSUFBSSxDQUFDLElBQUs0RyxDQUFBQSxTQUFBLEVBQVc7RUFDbkIsUUFBQSxPQUFBO0VBQ0YsT0FBQTtRQUVBLE1BQU07VUFBRXZGLFVBQUE7RUFBWTlWLFFBQUFBLEtBQUFBO0VBQU0sT0FBQSxHQUFJLEtBQUtrRCxLQUFBLENBQUE7UUFFbkMsSUFBSTtVQUVGLElBQUksSUFBQSxDQUFLeVMsZ0JBQUEsRUFBa0I7RUFDekIsVUFBQSxJQUFJalksUUFBQSxHQUFXb1ksVUFBQSxHQUFhOVYsS0FBQSxDQUFNMlUsVUFBQSxDQUFBO0VBRWxDalgsVUFBQUEsUUFBQSxHQUFXeE8sTUFBQSxDQUFBLENBQUEsQ0FBU0EsTUFBQSxDQUFPc3RCLFFBQUEsQ0FBUzllLFFBQVEsQ0FBSUEsR0FBQUEsUUFBQSxHQUFXLENBQUssSUFBQSxHQUFBLEVBQUt5TCxPQUFBLENBQVEsQ0FBQyxDQUFDLENBQUEsQ0FBQTtFQUUvRSxVQUFBLElBQUEsQ0FBS2lOLFdBQUEsQ0FBWTtjQUNmMVksUUFBQTtjQUNBb1ksVUFBQSxFQUFZQSxVQUFBLEdBQWEsSUFBSzJHLENBQUFBLGtCQUFBQTthQUMvQixDQUFBLENBQUE7V0FDUSxNQUFBLElBQUEsSUFBQSxDQUFLMUcsTUFBQSxFQUFRO0VBQ3RCLFVBQUEsTUFBTTdTLEtBQUEsR0FBUSxNQUFNLEtBQUs2UyxNQUFBLENBQU9DLGVBQUEsRUFBZ0IsQ0FBQTtFQUdoRCxVQUFBLElBQUk5UyxLQUFBLEVBQU87RUFDVCxZQUFBLE1BQU11UyxRQUFBLEdBQVd2UyxLQUFBLENBQU14RixRQUFBLENBQUE7RUFDdkIsWUFBQSxNQUFNQSxRQUFBLEdBQVd4TyxNQUFBLEVBQ2J1bUIsUUFBQSxHQUFXdlMsS0FBQSxDQUFNK1MsWUFBQSxDQUFhQyxhQUFBLENBQWNDLFdBQUEsR0FBZSxLQUFLaE4sT0FBQSxDQUFRLENBQUMsQ0FDN0UsQ0FBQSxDQUFBO0VBRUEsWUFBQSxJQUFBLENBQUtpTixXQUFBLENBQVk7Z0JBQ2YxWSxRQUFBO2dCQUNBb1ksVUFBQSxFQUFZTCxRQUFBLEdBQVcsSUFBS2dILENBQUFBLGtCQUFBQTtlQUM3QixDQUFBLENBQUE7RUFDSCxXQUFBO0VBQ0YsU0FBQTtFQUNGLE9BQUEsQ0FBQSxPQUFTbnJCLEtBQUEsRUFBTztVQUVkRCxPQUFBLENBQVFDLEtBQUEsQ0FBTUEsS0FBSyxDQUFBLENBQUE7RUFDckIsT0FBQTtFQUNGLEtBQUEsQ0FBQSxDQUFBO01BQUFtakIsZUFBQSxDQUFBLElBQUEsRUFBQSxhQUFBLEVBRTRDdlIsS0FBQSxJQUFTO1FBQ25ELElBQUksQ0FBQyxJQUFLbVksQ0FBQUEsU0FBQSxFQUFXO0VBQ25CLFFBQUEsT0FBQTtFQUNGLE9BQUE7UUFFQSxJQUFLMVksQ0FBQUEsUUFBQSxDQUFTTyxLQUFLLENBQUEsQ0FBQTtFQUNyQixLQUFBLENBQUEsQ0FBQTtFQTl3QkUsSUFBQSxJQUFBLENBQUtBLEtBQUEsR0FBUTtFQUNYa1UsTUFBQUEsZUFBQSxFQUFpQixFQUFBO0VBQ2pCSixNQUFBQSxRQUFBLEVBQVUsRUFBQTtFQUNWcUIsTUFBQUEsT0FBQSxFQUFTLEVBQUM7RUFDVi9tQixNQUFBQSxLQUFBLEVBQU8sRUFBQTtFQUNQcW5CLE1BQUFBLFNBQUEsRUFBVyxJQUFBO0VBQ1hwQyxNQUFBQSxRQUFBLEVBQVUsS0FBQTtFQUNWcUMsTUFBQUEsY0FBQSxFQUFnQixLQUFBO0VBQ2hCMkIsTUFBQUEsV0FBQSxFQUFhLEtBQUE7RUFDYnBCLE1BQUFBLFNBQUEsRUFBVyxLQUFBO0VBQ1h2QixNQUFBQSxPQUFBLEVBQVMsS0FBQTtFQUNUWCxNQUFBQSxhQUFBLEVBQWUsS0FBQTtFQUNma0YsTUFBQUEsV0FBQSxFQUFhLEtBQUE7RUFDYjVDLE1BQUFBLFVBQUEsRUFBWSxFQUFDO0VBQ2JtRCxNQUFBQSxjQUFBLEVBQWdCLFFBQUE7RUFDaEJoZixNQUFBQSxRQUFBLEVBQVUsQ0FBQTtFQUNWK2IsTUFBQUEsY0FBQSxFQUFnQixFQUFDO0VBQ2pCM0QsTUFBQUEsVUFBQSxFQUFZLENBQUE7RUFDWjRELE1BQUFBLE1BQUEsRUFBUSxLQUFBO0VBQ1JYLE1BQUFBLE9BQUEsRUFBUyxLQUFBO1FBQ1RwQixNQUFBLEVBQVFZLE1BQUEsQ0FBT3dCLElBQUE7UUFDZi9aLEtBQUEsRUFBTyxLQUFLc2IsVUFBQTtFQUNabEMsTUFBQUEsTUFBQSxFQUFRdUMsV0FBQSxDQUFZN21CLEtBQUEsQ0FBTTZuQixhQUFhLENBQUssSUFBQSxDQUFBO0VBQzlDLEtBQUEsQ0FBQTtFQUVBLElBQUEsSUFBQSxDQUFLQyxNQUFBLEdBQVNDLFNBQUEsQ0FBVS9uQixLQUFBLENBQU04bkIsTUFBTSxDQUFBLENBQUE7RUFFcEMsSUFBQSxJQUFBLENBQUtub0IsTUFBQSxHQUFTcW9CLGVBQUEsQ0FBZ0Job0IsS0FBQSxDQUFNTCxNQUFNLENBQUEsQ0FBQTtFQUM1QyxHQUFBO0VBYUEsRUFBQSxNQUFhb1Esb0JBQW9CO0VBQy9CLElBQUEsSUFBQSxDQUFLd1csU0FBQSxHQUFZLElBQUEsQ0FBQTtNQUNqQixNQUFNO0VBQUUzYSxNQUFBQSxHQUFBLEdBQU0sQ0FBQTtPQUFNLEdBQUEsSUFBQSxDQUFLdkwsR0FBQSxDQUFJaU4sT0FBQSxFQUFTeEUscUJBQUEsTUFBMkIsRUFBQyxDQUFBO0VBRWxFLElBQUEsSUFBQSxDQUFLd1ksV0FBQSxDQUFZO1FBQ2ZzRyxjQUFBLEVBQWdCaGMsR0FBQSxHQUFNeFAsTUFBQSxDQUFPNnJCLFdBQUEsR0FBYyxJQUFJLFFBQVcsR0FBQSxLQUFBO1FBQzFEcEYsTUFBQSxFQUFRWSxNQUFBLENBQU95RSxZQUFBQTtPQUNoQixDQUFBLENBQUE7RUFFRCxJQUFBLElBQUksQ0FBQzlyQixNQUFBLENBQU8rckIsNEJBQUEsRUFBOEI7RUFDeEMvckIsTUFBQUEsTUFBQSxDQUFPK3JCLDRCQUFBLEdBQStCLElBQUEsQ0FBS0MsZ0JBQUEsQ0FBQTtPQUN0QyxNQUFBO0VBQ0wsTUFBQSxJQUFBLENBQUtBLGdCQUFBLEVBQWlCLENBQUE7RUFDeEIsS0FBQTtFQUVBLElBQUEsTUFBTUMsaUJBQUEsRUFBa0IsQ0FBQTtFQUV4QmpzQixJQUFBQSxNQUFBLENBQU8wUyxnQkFBQSxDQUFpQixRQUFBLEVBQVUsS0FBS3daLFlBQVksQ0FBQSxDQUFBO0VBQ25ELElBQUEsSUFBQSxDQUFLQSxZQUFBLEVBQWEsQ0FBQTtFQUNwQixHQUFBO0VBRUEsRUFBQSxNQUFhdFksa0JBQW1CdVksQ0FBQUEsYUFBQSxFQUFzQnJZLGFBQUEsRUFBc0I7TUFDMUUsTUFBTTtRQUFFb1MsZUFBQTtRQUFpQkosUUFBQTtRQUFVNEIsY0FBQTtRQUFnQk8sU0FBQTtFQUFXTyxNQUFBQSxNQUFBLEVBQUE0RCxPQUFBO0VBQVF2RSxNQUFBQSxPQUFBLEVBQUFDLFFBQUE7UUFBU3JCLE1BQUE7RUFBUTNYLE1BQUFBLEtBQUFBO0VBQU0sS0FBQSxHQUMzRixLQUFLa0QsS0FBQSxDQUFBO01BQ1AsTUFBTTtRQUNKZ1UsUUFBQTtRQUNBOEMsTUFBQTtRQUNBNEMsTUFBQTtRQUNBN2EsTUFBQTtFQUNBa2EsTUFBQUEsSUFBQSxFQUFNc0IsUUFBQTtRQUNOQyxZQUFBO1FBQ0Evb0IsTUFBQTtRQUNBZ3BCLGtCQUFBO0VBQ0F0SSxNQUFBQSxJQUFBQTtFQUNGLEtBQUEsR0FBSSxLQUFLcmdCLEtBQUEsQ0FBQTtFQUNULElBQUEsTUFBTTRvQixPQUFBLEdBQVUxWSxhQUFBLENBQWMyUyxNQUFBLEtBQVdZLE1BQUEsQ0FBT3VCLEtBQUEsSUFBU25DLE1BQUEsS0FBV1ksTUFBQSxDQUFPdUIsS0FBQSxDQUFBO01BQzNFLE1BQU03RSxXQUFBLEdBQWMsSUFBSzhHLENBQUFBLGNBQUEsQ0FBZUMsT0FBQSxDQUFRN0csSUFBSSxDQUFDLENBQUEsQ0FBQTtFQUVyRCxJQUFBLE1BQU13SSxPQUFBLEdBQVUsQ0FBQyxDQUFDdkcsZUFBQSxJQUFtQixDQUFDLEVBQUVuQyxXQUFBLENBQVlDLFdBQUEsSUFBZUQsV0FBQSxDQUFZRSxJQUFBLENBQUEsQ0FBQTtFQUMvRSxJQUFBLE1BQU1vSCxVQUFBLEdBQWFtQixPQUFBLEtBQVl4RyxRQUFBLElBQVlxRyxRQUFBLENBQUEsQ0FBQTtNQUUzQyxJQUFJSSxPQUFBLElBQVdwQixVQUFBLEVBQVk7UUFDekIsTUFBTSxJQUFBLENBQUsvRixVQUFBLENBQVcsSUFBSSxDQUFBLENBQUE7UUFHMUIsSUFBSSxDQUFDMkMsU0FBQSxFQUFXO0VBQ2QsUUFBQSxJQUFBLENBQUsvQyxXQUFBLENBQVk7RUFBRStDLFVBQUFBLFNBQUEsRUFBVyxJQUFBO1dBQU0sQ0FBQSxDQUFBO0VBQ3RDLE9BQUE7UUFFQSxJQUFJLElBQUEsQ0FBS3hELGdCQUFBLEVBQWtCO0VBQ3pCLFFBQUEsSUFBQSxDQUFLZSxXQUFBLEdBQWN4bEIsTUFBQSxDQUFPeWxCLFVBQUEsQ0FBVyxNQUFNO0VBQ3pDLFVBQUEsSUFBQSxDQUFLQyxVQUFBLEVBQVcsQ0FBQTtFQUNsQixTQUFBLEVBQUcsR0FBRyxDQUFBLENBQUE7RUFDUixPQUFBO09BQ1MsTUFBQSxJQUFBLENBQUN2bkIsS0FBQSxDQUFRZ3VCLGFBQUEsQ0FBY2xJLElBQUEsRUFBTUEsSUFBSSxDQUFHLEVBQUE7UUFDN0MsSUFBSWdFLFNBQUEsSUFBYW9FLFFBQUEsRUFBVTtVQUN6QixNQUFNLElBQUEsQ0FBSy9HLFVBQUEsQ0FBVyxJQUFJLENBQUEsQ0FBQTtTQUNyQixNQUFBO0VBQ0wsUUFBQSxJQUFBLENBQUtKLFdBQUEsQ0FBWTtFQUFFK0YsVUFBQUEsV0FBQSxFQUFhLElBQUE7V0FBTSxDQUFBLENBQUE7RUFDeEMsT0FBQTtPQUNTa0IsTUFBQUEsSUFBQUEsYUFBQSxDQUFjcEIsSUFBQSxLQUFTc0IsUUFBQSxJQUFZQSxRQUFBLEtBQWFwRSxTQUFBLEVBQVc7RUFDcEUsTUFBQSxNQUFNLEtBQUszQyxVQUFBLENBQVcsQ0FBQ3hXLEtBQUEsQ0FBTTRVLEVBQUUsQ0FBQSxDQUFBO0VBQ2pDLEtBQUE7RUFFQSxJQUFBLElBQUk1UCxhQUFBLENBQWMyUyxNQUFBLEtBQVdBLE1BQUEsRUFBUTtFQUNuQyxNQUFBLElBQUEsQ0FBS0UsY0FBQSxDQUFlO0VBQ2xCLFFBQUEsR0FBRyxLQUFLM1UsS0FBQTtVQUNSN1UsSUFBQSxFQUFNZ29CLElBQUEsQ0FBS2tDLE1BQUFBO1NBQ1osQ0FBQSxDQUFBO0VBQ0gsS0FBQTtFQUVBLElBQUEsSUFBSXZULGFBQUEsQ0FBY29TLGVBQUEsS0FBb0JBLGVBQUEsSUFBbUJBLGVBQUEsRUFBaUI7UUFDeEUsSUFBSSxDQUFDc0csT0FBQSxFQUFTO0VBQ1osUUFBQSxJQUFBLENBQUs3RixjQUFBLENBQWU7RUFDbEIsVUFBQSxHQUFHLEtBQUszVSxLQUFBO1lBQ1I3VSxJQUFBLEVBQU1nb0IsSUFBQSxDQUFLdUgsTUFBQUE7V0FDWixDQUFBLENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxNQUFNLElBQUtDLENBQUFBLGtCQUFBLENBQW1CLElBQUEsQ0FBS2xJLGdCQUFnQixDQUFBLENBQUE7UUFDbkQsTUFBTSxJQUFBLENBQUttSSxhQUFBLEVBQWMsQ0FBQTtFQUMzQixLQUFBO0VBRUEsSUFBQSxJQUFJOVksYUFBQSxDQUFjaEYsS0FBQSxDQUFNNFUsRUFBQSxLQUFPNVUsS0FBQSxDQUFNNFUsRUFBQSxJQUFNNVUsS0FBQSxDQUFNNFUsRUFBQSxFQUFJO0VBQ25ELE1BQUEsSUFBQSxDQUFLaUQsY0FBQSxDQUFlO0VBQ2xCLFFBQUEsR0FBRyxLQUFLM1UsS0FBQTtVQUNSN1UsSUFBQSxFQUFNZ29CLElBQUEsQ0FBSzBILEtBQUFBO1NBQ1osQ0FBQSxDQUFBO0VBRUQsTUFBQSxJQUFJUCxZQUFBLEVBQWM7RUFDaEIsUUFBQSxJQUFBLENBQUtwSCxXQUFBLENBQVk7RUFBRXdCLFVBQUFBLE9BQUEsRUFBUyxLQUFBO1dBQU8sQ0FBQSxDQUFBO0VBQ3JDLE9BQUE7RUFDRixLQUFBO0VBRUEsSUFBQSxJQUFJNVMsYUFBQSxDQUFjbVUsU0FBQSxLQUFjQSxTQUFBLEVBQVc7RUFDekMsTUFBQSxJQUFBLENBQUs2RSxpQkFBQSxFQUFrQixDQUFBO0VBQ3ZCLE1BQUEsTUFBTSxJQUFLSCxDQUFBQSxrQkFBQSxDQUFtQixJQUFBLENBQUtsSSxnQkFBZ0IsQ0FBQSxDQUFBO0VBRW5ELE1BQUEsSUFBQSxDQUFLa0MsY0FBQSxDQUFlO0VBQ2xCLFFBQUEsR0FBRyxLQUFLM1UsS0FBQTtVQUNSN1UsSUFBQSxFQUFNZ29CLElBQUEsQ0FBS3lGLE1BQUFBO1NBQ1osQ0FBQSxDQUFBO0VBQ0gsS0FBQTtNQUVBLElBQUk5VyxhQUFBLENBQWMwVSxNQUFBLEtBQVc0RCxPQUFBLElBQVV0WSxhQUFBLENBQWMrVCxPQUFBLEtBQVlDLFFBQUEsRUFBUztFQUN4RSxNQUFBLElBQUEsQ0FBS25CLGNBQUEsQ0FBZTtFQUNsQixRQUFBLEdBQUcsS0FBSzNVLEtBQUE7VUFDUjdVLElBQUEsRUFBTWdvQixJQUFBLENBQUt5RixNQUFBQTtTQUNaLENBQUEsQ0FBQTtFQUNILEtBQUE7RUFFQSxJQUFBLElBQUl1QixhQUFBLENBQWN0YixNQUFBLEtBQVdBLE1BQUEsRUFBUTtRQUNuQyxNQUFNLElBQUEsQ0FBS2tjLFlBQUEsRUFBYSxDQUFBO0VBQzFCLEtBQUE7RUFFQSxJQUFBLElBQUlqWixhQUFBLENBQWM0VCxjQUFBLElBQWtCLENBQUNBLGNBQUEsRUFBZ0I7RUFDbkQsTUFBQSxJQUFJNkUsa0JBQUEsSUFBc0IsQ0FBQ3RJLElBQUEsRUFBTTtFQUMvQixRQUFBLE1BQU1xQyxXQUFBLEdBQWMsTUFBTUMsZ0JBQUEsQ0FBaUIsS0FBSzVCLEtBQUssQ0FBQSxDQUFBO1VBR3JELElBQUkyQixXQUFBLEVBQWFFLFVBQUEsSUFBY0YsV0FBQSxDQUFZb0UsTUFBQSxDQUFPaEgsRUFBQSxLQUFPb0MsUUFBQSxFQUFVO1lBQ2pFLElBQUtrSCxDQUFBQSxpQkFBQSxDQUFrQjFHLFdBQUEsQ0FBWW9FLE1BQUEsQ0FBT2hILEVBQUEsSUFBTSxFQUFFLENBQUEsQ0FBQTtFQUNwRCxTQUFBO0VBQ0YsT0FBQTtFQUNGLEtBQUE7RUFFQSxJQUFBLElBQUl5SSxhQUFBLENBQWNyRCxNQUFBLEtBQVdBLE1BQUEsRUFBUTtFQUNuQyxNQUFBLElBQUEsQ0FBS29ELFlBQUEsRUFBYSxDQUFBO0VBQ3BCLEtBQUE7TUFFQSxJQUFJLENBQUMvdEIsS0FBQSxDQUFRZ3VCLGFBQUEsQ0FBY1QsTUFBQSxFQUFRQSxNQUFNLENBQUcsRUFBQTtFQUMxQyxNQUFBLElBQUEsQ0FBS0EsTUFBQSxHQUFTQyxTQUFBLENBQVVELE1BQU0sQ0FBQSxDQUFBO0VBQ2hDLEtBQUE7TUFFQSxJQUFJLENBQUN2dEIsS0FBQSxDQUFRZ3VCLGFBQUEsQ0FBYzVvQixNQUFBLEVBQVFBLE1BQU0sQ0FBRyxFQUFBO0VBQzFDLE1BQUEsSUFBQSxDQUFLQSxNQUFBLEdBQVNxb0IsZUFBQSxDQUFnQnJvQixNQUFNLENBQUEsQ0FBQTtFQUN0QyxLQUFBO0VBQ0YsR0FBQTtFQUVBLEVBQUEsTUFBYTJRLHVCQUF1QjtFQUNsQyxJQUFBLElBQUEsQ0FBS2lXLFNBQUEsR0FBWSxLQUFBLENBQUE7TUFHakIsSUFBSSxJQUFBLENBQUt0RixNQUFBLEVBQVE7UUFDZixJQUFLQSxDQUFBQSxNQUFBLENBQU91QyxVQUFBLEVBQVcsQ0FBQTtFQUN6QixLQUFBO01BRUE2RixhQUFBLENBQWMsS0FBS0Msa0JBQWtCLENBQUEsQ0FBQTtNQUNyQ0QsYUFBQSxDQUFjLEtBQUtFLHNCQUFzQixDQUFBLENBQUE7TUFDekNwRSxZQUFBLENBQWEsS0FBS3ZELFdBQVcsQ0FBQSxDQUFBO0VBRTdCeGxCLElBQUFBLE1BQUEsQ0FBTzJSLG1CQUFBLENBQW9CLFFBQUEsRUFBVSxLQUFLdWEsWUFBWSxDQUFBLENBQUE7RUFDeEQsR0FBQTtFQUVRdkYsRUFBQUEsY0FBQUEsQ0FBZTNVLEtBQUEsRUFBNEI7TUFDakQsTUFBTTtFQUFFc1MsTUFBQUEsUUFBQUE7RUFBUyxLQUFBLEdBQUksS0FBSzFnQixLQUFBLENBQUE7RUFFMUIsSUFBQSxJQUFJMGdCLFFBQUEsRUFBVTtFQUNaQSxNQUFBQSxRQUFBLENBQVN0UyxLQUFLLENBQUEsQ0FBQTtFQUNoQixLQUFBO0VBQ0YsR0FBQTtFQTJRQSxFQUFBLElBQVkyUyxRQUFnQjtNQUMxQixNQUFNO0VBQUVBLE1BQUFBLEtBQUFBO0VBQU0sS0FBQSxHQUFJLEtBQUsvZ0IsS0FBQSxDQUFBO0VBRXZCLElBQUEsT0FBTytnQixLQUFBLENBQUE7RUFDVCxHQUFBO0lBRUEsTUFBY2dFLGlCQUFBQSxDQUFrQmpGLEVBQUEsRUFBWTtNQUMxQyxNQUFNO0VBQUV1QyxNQUFBQSxzQkFBQUE7RUFBdUIsS0FBQSxHQUFJLEtBQUtyaUIsS0FBQSxDQUFBO01BQ3hDLE1BQU07RUFBRXVqQixNQUFBQSxPQUFBQTtFQUFRLEtBQUEsR0FBSSxNQUFNSSxVQUFBLENBQVcsSUFBQSxDQUFLNUMsS0FBSyxDQUFBLENBQUE7TUFDL0MsSUFBSXVCLGVBQUEsR0FBa0J4QyxFQUFBLENBQUE7RUFFdEIsSUFBQSxJQUFJdUMsc0JBQUEsRUFBd0I7RUFDMUIsTUFBQSxNQUFNbUgsYUFBQSxHQUFnQmhILGNBQUEsQ0FBZWlILE9BQUEsQ0FBUSxjQUFjLENBQUEsQ0FBQTtFQUczRCxNQUFBLElBQUksQ0FBQ0QsYUFBQSxJQUFpQixDQUFDakcsT0FBQSxDQUFRaEQsSUFBQSxDQUFNbk8sQ0FBQSxJQUFxQkEsQ0FBQSxDQUFFME4sRUFBQSxLQUFPMEosYUFBYSxDQUFHLEVBQUE7RUFDakZoSCxRQUFBQSxjQUFBLENBQWVDLE9BQUEsQ0FBUSxjQUFBLEVBQWdCSCxlQUFlLENBQUEsQ0FBQTtTQUNqRCxNQUFBO0VBQ0xBLFFBQUFBLGVBQUEsR0FBa0JrSCxhQUFBLENBQUE7RUFDcEIsT0FBQTtFQUNGLEtBQUE7TUFFQSxPQUFPO1FBQUVsSCxlQUFBO0VBQWlCaUIsTUFBQUEsT0FBQUE7RUFBUSxLQUFBLENBQUE7RUFDcEMsR0FBQTtFQXVEQSxFQUFBLElBQVkxQyxtQkFBNEI7TUFDdEMsTUFBTTtRQUFFeUIsZUFBQTtRQUFpQkosUUFBQTtFQUFVVyxNQUFBQSxNQUFBQTtFQUFPLEtBQUEsR0FBSSxLQUFLelUsS0FBQSxDQUFBO01BRW5ELE9BQVFrVSxlQUFBLElBQW1CQSxlQUFBLEtBQW9CSixRQUFBLElBQWFXLE1BQUEsS0FBV1ksTUFBQSxDQUFPQyxXQUFBLENBQUE7RUFDaEYsR0FBQTtJQW1GQSxNQUFjcUYsa0JBQUFBLENBQW1CVyxVQUFBLEVBQXFCO01BQ3BELE1BQU07RUFBRUMsTUFBQUEsMEJBQUFBO0VBQTJCLEtBQUEsR0FBSSxLQUFLM3BCLEtBQUEsQ0FBQTtNQUU1QyxJQUFJO1FBQ0YsSUFBSSxJQUFBLENBQUs2Z0IsZ0JBQUEsSUFBb0I2SSxVQUFBLElBQWMsQ0FBQyxJQUFBLENBQUtKLGtCQUFBLEVBQW9CO1VBQ25FLE1BQU0sSUFBQSxDQUFLeEgsVUFBQSxFQUFXLENBQUE7VUFFdEJ1SCxhQUFBLENBQWMsS0FBS0Msa0JBQWtCLENBQUEsQ0FBQTtVQUNyQyxJQUFLQSxDQUFBQSxrQkFBQSxHQUFxQmx0QixNQUFBLENBQU93dEIsV0FBQSxDQUMvQixJQUFBLENBQUs5SCxVQUFBLEVBQ0w2SCwwQkFBQSxHQUE4QixHQUNoQyxDQUFBLENBQUE7RUFDRixPQUFBO1FBRUEsSUFBSyxDQUFBLENBQUNELFVBQUEsSUFBYyxDQUFDLEtBQUs3SSxnQkFBQSxLQUFxQixJQUFLeUksQ0FBQUEsa0JBQUEsRUFBb0I7VUFDdEVELGFBQUEsQ0FBYyxLQUFLQyxrQkFBa0IsQ0FBQSxDQUFBO0VBQ3JDLFFBQUEsSUFBQSxDQUFLQSxrQkFBQSxHQUFxQixLQUFBLENBQUEsQ0FBQTtFQUM1QixPQUFBO0VBQ0YsS0FBQSxDQUFBLE9BQVM5c0IsS0FBQSxFQUFPO1FBRWRELE9BQUEsQ0FBUUMsS0FBQSxDQUFNQSxLQUFLLENBQUEsQ0FBQTtFQUNyQixLQUFBO0VBQ0YsR0FBQTtFQUVRMHNCLEVBQUFBLGlCQUFBQSxHQUFvQjtNQUMxQixNQUFNO0VBQUU3RSxNQUFBQSxTQUFBQTtFQUFVLEtBQUEsR0FBSSxLQUFLalcsS0FBQSxDQUFBO0VBRzNCLElBQUEsSUFBSWlXLFNBQUEsRUFBVztRQUViLElBQUksQ0FBQyxJQUFLa0YsQ0FBQUEsc0JBQUEsRUFBd0I7VUFDaEMsSUFBS0EsQ0FBQUEsc0JBQUEsR0FBeUJudEIsTUFBQSxDQUFPd3RCLFdBQUEsQ0FDbkMsSUFBS1osQ0FBQUEsYUFBQSxFQUNMLElBQUEsQ0FBS3JCLGtCQUNQLENBQUEsQ0FBQTtFQUNGLE9BQUE7T0FDUyxNQUFBLElBQUEsSUFBQSxDQUFLNEIsc0JBQUEsRUFBd0I7UUFDdENGLGFBQUEsQ0FBYyxLQUFLRSxzQkFBc0IsQ0FBQSxDQUFBO0VBQ3pDLE1BQUEsSUFBQSxDQUFLQSxzQkFBQSxHQUF5QixLQUFBLENBQUEsQ0FBQTtFQUNoQyxLQUFBO0VBQ0YsR0FBQTtFQStHT2haLEVBQUFBLE1BQUFBLEdBQVM7TUFDZCxNQUFNO1FBQ0orUixlQUFBO1FBQ0FKLFFBQUE7UUFDQXFCLE9BQUE7UUFDQS9tQixLQUFBO1FBQ0FpbEIsUUFBQTtRQUNBZ0UsV0FBQTtRQUNBcEIsU0FBQTtRQUNBbEMsYUFBQTtRQUNBc0MsVUFBQTtRQUNBbUQsY0FBQTtRQUNBaGYsUUFBQTtRQUNBb1ksVUFBQTtRQUNBNkIsTUFBQTtRQUNBM1gsS0FBQTtFQUNBb1osTUFBQUEsTUFBQUE7RUFDRixLQUFBLEdBQUksS0FBS2xXLEtBQUEsQ0FBQTtNQUNULE1BQU07UUFDSnliLFVBQUE7RUFDQUMsTUFBQUEsZUFBQSxHQUFrQixLQUFBO0VBQ2xCQyxNQUFBQSxZQUFBLEdBQWUsS0FBQTtFQUNmQyxNQUFBQSxZQUFBLEdBQWUsSUFBQTtFQUNmOUUsTUFBQUEsTUFBQSxHQUFTLFlBQUE7UUFDVHdELFlBQUE7RUFDQXVCLE1BQUFBLGlCQUFBQTtFQUNGLEtBQUEsR0FBSSxLQUFLanFCLEtBQUEsQ0FBQTtFQUNULElBQUEsTUFBTTRvQixPQUFBLEdBQVcsQ0FBQ25GLE1BQUEsQ0FBT3VCLEtBQUEsRUFBT3ZCLE1BQUEsQ0FBT0MsV0FBVyxDQUFlNVosQ0FBQUEsUUFBQSxDQUFTK1ksTUFBTSxDQUFBLENBQUE7RUFFaEYsSUFBQSxNQUFNaFosTUFBQSxHQUFvQztFQUN4Q3FnQixNQUFBQSxJQUFBLGlCQUFNQyxjQUFBLENBQUNDLE1BQUEsRUFBQTtFQUFPenFCLFFBQUFBLE1BQUEsRUFBUSxJQUFLQSxDQUFBQSxNQUFBQTtTQUFRLENBQUE7RUFDckMsS0FBQSxDQUFBO0VBRUEsSUFBQSxJQUFJaXBCLE9BQUEsRUFBUztFQUVYLE1BQUEsSUFBSSxDQUFDL2UsTUFBQSxDQUFPd2dCLElBQUEsRUFBTTtFQUNoQnhnQixRQUFBQSxNQUFBLENBQU93Z0IsSUFBQSxrQkFDTEYsY0FBQSxDQUFDRyxZQUFBLEVBQUE7WUFDQ1IsZUFBQTtZQUNBQyxZQUFBO1lBQ0F0SSxRQUFBO1lBQ0F5RCxNQUFBO1lBQ0E0QyxNQUFBLEVBQVEsS0FBS0EsTUFBQTtZQUNieUMsc0JBQUEsRUFBd0IsS0FBS0MsMEJBQUE7WUFDN0I5QixZQUFBO1lBQ0Evb0IsTUFBQSxFQUFRLEtBQUtBLE1BQUE7WUFDYm9oQixLQUFBLEVBQU8sS0FBS0EsS0FBQTtZQUNaN1YsS0FBQTtFQUNBK2UsVUFBQUEsaUJBQUFBO1dBQ0YsQ0FBQSxDQUFBO0VBRUosT0FBQTtFQUVBcGdCLE1BQUFBLE1BQUEsQ0FBTzBaLE9BQUEsa0JBQ0w0RyxjQUFBLENBQUNNLE9BQUEsRUFBQTtVQUNDbkksZUFBQTtVQUNBSixRQUFBO1VBQ0FxQixPQUFBO1VBQ0EyQixNQUFBO1VBQ0E0QyxNQUFBLEVBQVEsS0FBS0EsTUFBQTtVQUNiNEMsYUFBQSxFQUFlLEtBQUtDLGlCQUFBO0VBQ3BCQyxRQUFBQSxJQUFBLEVBQU16SSxhQUFBLElBQWlCLENBQUNELFFBQUE7VUFDeEIwRixjQUFBO0VBQ0Fqb0IsUUFBQUEsTUFBQSxFQUFRLElBQUtBLENBQUFBLE1BQUFBO1NBQ2YsQ0FBQSxDQUFBO1FBR0ZrSyxNQUFBLENBQU95YSxNQUFBLEdBQVNoQyxlQUFBLGtCQUNkNkgsY0FBQSxDQUFDVSxNQUFBLEVBQUE7VUFDQ2IsWUFBQTtVQUNBOUUsTUFBQTtVQUNBNEMsTUFBQSxFQUFRLEtBQUtBLE1BQUE7VUFDYkYsY0FBQTtVQUNBdEIsU0FBQSxFQUFXLEtBQUtBLFNBQUE7VUFDaEIzbUIsTUFBQSxFQUFRLEtBQUtBLE1BQUE7RUFDYjJrQixRQUFBQSxNQUFBQTtFQUFBLE9BQ0YsQ0FDRSxHQUFBLElBQUEsQ0FBQTtRQUVKLElBQUksSUFBQSxDQUFLZSxtQkFBQSxFQUFxQjtFQUM1QnhiLFFBQUFBLE1BQUEsQ0FBT3pILE9BQUEsa0JBQ0wwb0IsZUFBQSxDQUFDQyxlQUFBLEVBQUE7WUFBUTdGLE1BQUE7WUFBZ0J2bEIsTUFBQSxFQUFRLEtBQUtBLE1BQUE7RUFDbkNxckIsVUFBQUEsUUFBQSxHQUFBbmhCLE1BQUEsQ0FBTzBaLE9BQUEsRUFDUDFaLE1BQUEsQ0FBT3lhLE1BQUEsQ0FBQTtXQUNWLENBQUEsQ0FBQTtFQUVKLE9BQUE7RUFFQXphLE1BQUFBLE1BQUEsQ0FBT29oQixRQUFBLGtCQUNMZCxjQUFBLENBQUNlLGdCQUFBLEVBQUE7VUFDQ3JCLFVBQUE7RUFDQXRHLFFBQUFBLE9BQUEsRUFBUyxJQUFLOEIsQ0FBQUEsbUJBQUEsR0FBc0IsSUFBT3hiLEdBQUFBLE1BQUEsQ0FBTzBaLE9BQUE7VUFDbEQxRCxVQUFBLEVBQVkzVSxLQUFBLENBQU0yVSxVQUFBO1VBQ2xCNEIsUUFBQTtVQUNBMEosZ0JBQUEsRUFBa0IsS0FBS3RLLGdCQUFBO1VBQ3ZCNEUsV0FBQTtVQUNBcEIsU0FBQTtVQUNBYSxNQUFBO1VBQ0E0QyxNQUFBLEVBQVEsS0FBS0EsTUFBQTtVQUNickQsVUFBQTtVQUNBMkcsYUFBQSxFQUFlLEtBQUtDLGlCQUFBO1VBQ3BCQyxXQUFBLEVBQWEsS0FBS0MsZUFBQTtVQUNsQkMsZUFBQSxFQUFpQixLQUFLQyxtQkFBQTtVQUN0QkMsaUJBQUEsRUFBbUIsS0FBS0MscUJBQUE7VUFDeEJDLGVBQUEsRUFBaUIsS0FBS0MsbUJBQUE7VUFDdEJqakIsUUFBQTtVQUNBb1ksVUFBQTtVQUNBcmhCLE1BQUEsRUFBUSxLQUFLQSxNQUFBO0VBQ2Iya0IsUUFBQUEsTUFBQSxFQUFRLElBQUtlLENBQUFBLG1CQUFBLEdBQXNCLElBQUEsR0FBT3hiLE1BQUEsQ0FBT3lhLE1BQUFBO1NBQ25ELENBQUEsQ0FBQTtFQUdGemEsTUFBQUEsTUFBQSxDQUFPcWdCLElBQUEsa0JBQ0xZLGVBQUEsQ0FBQ2dCLGVBQUEsRUFBQTtVQUFRNUcsTUFBQTtVQUFnQnZsQixNQUFBLEVBQVEsS0FBS0EsTUFBQTtVQUNuQ3FyQixRQUFBLEVBQUEsQ0FBQW5oQixNQUFBLENBQU93Z0IsSUFBQSxFQUNQeGdCLE1BQUEsQ0FBT29oQixRQUFBLEVBQ1BwaEIsTUFBQSxDQUFPekgsT0FBQSxDQUFBO1NBQ1YsQ0FBQSxDQUFBO09BRU95SCxNQUFBQSxJQUFBQSxNQUFBLENBQU93Z0IsSUFBQSxFQUFNO0VBQ3RCeGdCLE1BQUFBLE1BQUEsQ0FBT3FnQixJQUFBLEdBQU9yZ0IsTUFBQSxDQUFPd2dCLElBQUEsQ0FBQTtFQUN2QixLQUFBO0VBRUEsSUFBQSxJQUFJeEgsTUFBQSxLQUFXWSxNQUFBLENBQU9HLEtBQUEsRUFBTztFQUMzQi9aLE1BQUFBLE1BQUEsQ0FBT3FnQixJQUFBLGtCQUFPQyxjQUFBLENBQUM0QixZQUFBLEVBQUE7VUFBYXBzQixNQUFBLEVBQVEsS0FBS0EsTUFBQTtFQUFTcXJCLFFBQUFBLFFBQUEsRUFBQXh1QixLQUFBQTtTQUFNLENBQUEsQ0FBQTtFQUMxRCxLQUFBO01BRUEsc0JBQ0UydEIsY0FBQSxDQUFDNkIsY0FBQSxFQUFBO1FBQU8zckIsR0FBQSxFQUFLLEtBQUtBLEdBQUE7RUFBSyxNQUFBLFlBQUEsRUFBWXVvQixPQUFBO1FBQVNqcEIsTUFBQSxFQUFRLEtBQUtBLE1BQUE7UUFDdERxckIsUUFBQSxFQUFBbmhCLE1BQUEsQ0FBT3FnQixJQUFBQTtPQUNWLENBQUEsQ0FBQTtFQUVKLEdBQUE7RUFDRixDQUFBdkssRUFBQUEsZUFBQSxDQUFBRixNQUFBLEVBdjNCd0IsY0FBQSxFQUFBO0VBQ3BCMkMsRUFBQUEsUUFBQSxFQUFVLEtBQUE7RUFDVnlGLEVBQUFBLGFBQUEsRUFBZSxDQUFBO0VBQ2ZyQyxFQUFBQSxvQkFBQSxFQUFzQixLQUFBO0VBQ3RCcG1CLEVBQUFBLElBQUEsRUFBTSxvQkFBQTtFQUNOaWpCLEVBQUFBLHNCQUFBLEVBQXdCLEtBQUE7RUFDeEJxRyxFQUFBQSxZQUFBLEVBQWMsS0FBQTtFQUNkaUIsRUFBQUEsMEJBQUEsRUFBNEIsQ0FBQTtFQUM1QmhCLEVBQUFBLGtCQUFBLEVBQW9CLEtBQUE7RUFDdEIsQ0FBQSxDQUFBLEVBQUFsSixNQUFBLENBODJCRixDQUFBO0VBUUEsSUFBT3dNLFdBQUEsR0FBUXpNLGtCQUFBOztXQ3BpQ0MsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFrQyxFQUFBO0VBQzNFLElBQUEsUUFDQTVoQixtQkFBQyxDQUFBc3VCLFdBQWEsRUFDVixFQUFBLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxFQUN6QixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBQSxDQUN4QixFQUNBO0VBQ047Ozs7Ozs7Ozs7In0=
