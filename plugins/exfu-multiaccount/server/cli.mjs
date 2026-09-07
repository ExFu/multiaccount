#!/usr/bin/env node
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject = function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone3;
      var target = arguments[0];
      var i2 = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i2 = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i2 < length; ++i2) {
        options = arguments[i2];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone3 = src && isArray(src) ? src : [];
                } else {
                  clone3 = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone3, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/google-auth-library/node_modules/gaxios/package.json
var require_package = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/package.json"(exports, module) {
    module.exports = {
      name: "gaxios",
      version: "7.3.1",
      description: "A simple common HTTP client specifically for Google APIs and services.",
      main: "build/cjs/src/index.js",
      types: "build/cjs/src/index.d.ts",
      files: [
        "build/"
      ],
      exports: {
        ".": {
          import: {
            types: "./build/esm/src/index.d.ts",
            default: "./build/esm/src/index.js"
          },
          require: {
            types: "./build/cjs/src/index.d.ts",
            default: "./build/cjs/src/index.js"
          }
        }
      },
      scripts: {
        lint: "gts check --no-inline-config",
        test: "c8 mocha build/esm/test",
        "presystem-test": "npm run compile",
        "system-test": "mocha build/esm/system-test --timeout 80000",
        compile: "tsc -b ./tsconfig.json ./tsconfig.cjs.json && node utils/enable-esm.mjs",
        fix: "gts fix",
        prepare: "npm run compile",
        pretest: "npm run compile",
        webpack: "webpack",
        "prebrowser-test": "npm run compile",
        "browser-test": "node build/browser-test/browser-test-runner.js",
        docs: "jsdoc -c .jsdoc.js",
        "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
        prelint: "cd samples; npm link ../; npm install",
        clean: "gts clean"
      },
      repository: {
        type: "git",
        directory: "core/packages/gaxios",
        url: "https://github.com/googleapis/google-cloud-node.git"
      },
      keywords: [
        "google"
      ],
      engines: {
        node: ">=18"
      },
      author: "Google, LLC",
      license: "Apache-2.0",
      devDependencies: {
        "@babel/plugin-proposal-private-methods": "^7.18.6",
        "@types/cors": "^2.8.6",
        "@types/express": "^5.0.0",
        "@types/extend": "^3.0.1",
        "@types/mocha": "^10.0.10",
        "@types/multiparty": "4.2.1",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.8",
        "@types/node": "^24.0.0",
        "@types/sinon": "^21.0.0",
        "@types/tmp": "^0.2.6",
        assert: "^2.0.0",
        browserify: "^17.0.0",
        c8: "^10.1.3",
        cors: "^2.8.5",
        express: "^5.0.0",
        gts: "^6.0.2",
        "is-docker": "^3.0.0",
        jsdoc: "^4.0.4",
        "jsdoc-fresh": "^5.0.0",
        "jsdoc-region-tag": "^4.0.0",
        karma: "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-remap-coverage": "^0.1.5",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "^5.0.0",
        mocha: "^11.1.0",
        multiparty: "^4.2.1",
        mv: "^2.1.1",
        ncp: "^2.0.0",
        nock: "14.0.5",
        "null-loader": "^4.0.1",
        "pack-n-play": "^4.0.0",
        puppeteer: "^24.0.0",
        sinon: "21.0.3",
        "stream-browserify": "^3.0.0",
        tmp: "0.2.7",
        "ts-loader": "^9.5.2",
        typescript: "5.8.3",
        "undici-types": "^7.24.1",
        webpack: "^5.97.1",
        "webpack-cli": "^6.0.1"
      },
      dependencies: {
        extend: "^3.0.2",
        "https-proxy-agent": "^7.0.1",
        "node-fetch": "^3.3.2"
      },
      homepage: "https://github.com/googleapis/google-cloud-node/tree/main/core/packages/gaxios"
    };
  }
});

// node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/util.cjs
var require_util = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/util.cjs"(exports, module) {
    "use strict";
    var pkg = require_package();
    module.exports = { pkg };
  }
});

// node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/common.js
var require_common = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/common.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    var extend_1 = __importDefault(require_extend());
    var util_cjs_1 = __importDefault(require_util());
    var pkg = util_cjs_1.default.pkg;
    exports.GAXIOS_ERROR_SYMBOL = Symbol.for(`${pkg.name}-gaxios-error`);
    var GaxiosError = class _GaxiosError extends Error {
      config;
      response;
      /**
       * An error code.
       * Can be a system error code, DOMException error name, or any error's 'code' property where it is a `string`.
       *
       * It is only a `number` when the cause is sourced from an API-level error (AIP-193).
       *
       * @see {@link https://nodejs.org/api/errors.html#errorcode error.code}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names DOMException#error_names}
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @example
       * 'ECONNRESET'
       *
       * @example
       * 'TimeoutError'
       *
       * @example
       * 500
       */
      code;
      /**
       * An HTTP Status code.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/status Response#status}
       *
       * @example
       * 500
       */
      status;
      /**
       * @deprecated use {@link GaxiosError.cause} instead.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause Error#cause}
       *
       * @privateRemarks
       *
       * We will want to remove this property later as the modern `cause` property is better suited
       * for displaying and relaying nested errors. Keeping this here makes the resulting
       * error log larger than it needs to be.
       *
       */
      error;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[Symbol.hasInstance]}
       * @see {@link https://github.com/microsoft/TypeScript/issues/13965#issuecomment-278570200}
       * @see {@link https://stackoverflow.com/questions/46618852/require-and-instanceof}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/@@hasInstance#reverting_to_default_instanceof_behavior}
       */
      [exports.GAXIOS_ERROR_SYMBOL] = pkg.version;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [Symbol.hasInstance](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(_GaxiosError, instance);
      }
      constructor(message, config, response, cause) {
        super(message, { cause });
        this.config = config;
        this.response = response;
        this.error = cause instanceof Error ? cause : void 0;
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(
              this.config.responseType,
              // workaround for `node-fetch`'s `.data` deprecation...
              this.response?.bodyUsed ? this.response?.data : void 0
            );
          } catch {
          }
          this.status = this.response.status;
        }
        if (cause instanceof DOMException) {
          this.code = cause.name;
        } else if (cause && typeof cause === "object" && "code" in cause && (typeof cause.code === "string" || typeof cause.code === "number")) {
          this.code = cause.code;
        }
      }
      /**
       * An AIP-193 conforming error extractor.
       *
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @internal
       * @expiremental
       *
       * @param res the response object
       * @returns the extracted error information
       */
      static extractAPIErrorFromResponse(res, defaultErrorMessage = "The request failed") {
        let message = defaultErrorMessage;
        if (typeof res.data === "string") {
          message = res.data;
        }
        if (res.data && typeof res.data === "object" && "error" in res.data && res.data.error && !res.ok) {
          if (typeof res.data.error === "string") {
            return {
              message: res.data.error,
              code: res.status,
              status: res.statusText
            };
          }
          if (typeof res.data.error === "object") {
            message = "message" in res.data.error && typeof res.data.error.message === "string" ? res.data.error.message : message;
            const status = "status" in res.data.error && typeof res.data.error.status === "string" ? res.data.error.status : res.statusText;
            const code = "code" in res.data.error && typeof res.data.error.code === "number" ? res.data.error.code : res.status;
            if ("errors" in res.data.error && Array.isArray(res.data.error.errors)) {
              const errorMessages = [];
              for (const e2 of res.data.error.errors) {
                if (typeof e2 === "object" && "message" in e2 && typeof e2.message === "string") {
                  errorMessages.push(e2.message);
                }
              }
              return Object.assign({
                message: errorMessages.join("\n") || message,
                code,
                status
              }, res.data.error);
            }
            return Object.assign({
              message,
              code,
              status
            }, res.data.error);
          }
        }
        return {
          message,
          code: res.status,
          status: res.statusText
        };
      }
    };
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        headers.forEach((_, key) => {
          if (/^authentication$/i.test(key) || /^authorization$/i.test(key) || /secret/i.test(key))
            headers.set(key, REDACT);
        });
      }
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      function redactObject(obj) {
        if (!obj || typeof obj !== "object") {
          return;
        } else if (obj instanceof FormData || obj instanceof URLSearchParams || // support `node-fetch` FormData/URLSearchParams
        "forEach" in obj && "set" in obj) {
          obj.forEach((_, key) => {
            if (["grant_type", "assertion"].includes(key) || /secret/.test(key)) {
              obj.set(key, REDACT);
            }
          });
        } else {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        if (data.config.url.searchParams.has("token")) {
          data.config.url.searchParams.set("token", REDACT);
        }
        if (data.config.url.searchParams.has("client_secret")) {
          data.config.url.searchParams.set("client_secret", REDACT);
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        if (data.response.bodyUsed) {
          redactString(data.response, "data");
          redactObject(data.response.data);
        }
      }
      return data;
    }
  }
});

// node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/retry.js
var require_retry = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/retry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRetryConfig = getRetryConfig;
    async function getRetryConfig(err) {
      let config = getConfig(err);
      if (!err || !err.config || !config && !err.config.retry) {
        return { shouldRetry: false };
      }
      config = config || {};
      config.currentRetryAttempt = config.currentRetryAttempt || 0;
      config.retry = config.retry === void 0 || config.retry === null ? 3 : config.retry;
      config.httpMethodsToRetry = config.httpMethodsToRetry || [
        "GET",
        "HEAD",
        "PUT",
        "OPTIONS",
        "DELETE"
      ];
      config.noResponseRetries = config.noResponseRetries === void 0 || config.noResponseRetries === null ? 2 : config.noResponseRetries;
      config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
      config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
      config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
      config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
      const retryRanges = [
        // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        // 1xx - Retry (Informational, request still processing)
        // 2xx - Do not retry (Success)
        // 3xx - Do not retry (Redirect)
        // 4xx - Do not retry (Client errors)
        // 408 - Retry ("Request Timeout")
        // 429 - Retry ("Too Many Requests")
        // 5xx - Retry (Server errors)
        [100, 199],
        [408, 408],
        [429, 429],
        [500, 599]
      ];
      config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
      err.config.retryConfig = config;
      const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
      if (!await shouldRetryFn(err)) {
        return { shouldRetry: false, config: err.config };
      }
      const delay = getNextRetryDelay(config);
      err.config.retryConfig.currentRetryAttempt += 1;
      const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve2) => {
        setTimeout(resolve2, delay);
      });
      if (config.onRetryAttempt) {
        await config.onRetryAttempt(err);
      }
      await backoff;
      return { shouldRetry: true, config: err.config };
    }
    function shouldRetryRequest(err) {
      const config = getConfig(err);
      if (err.config.signal?.aborted && err.code !== "TimeoutError" || err.code === "AbortError") {
        return false;
      }
      if (!config || config.retry === 0) {
        return false;
      }
      if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
        return false;
      }
      if (!config.httpMethodsToRetry || !config.httpMethodsToRetry.includes(err.config.method?.toUpperCase() || "GET")) {
        return false;
      }
      if (err.response && err.response.status) {
        let isInRange = false;
        for (const [min, max] of config.statusCodesToRetry) {
          const status = err.response.status;
          if (status >= min && status <= max) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      config.currentRetryAttempt = config.currentRetryAttempt || 0;
      if (config.currentRetryAttempt >= config.retry) {
        return false;
      }
      return true;
    }
    function getConfig(err) {
      if (err && err.config && err.config.retryConfig) {
        return err.config.retryConfig;
      }
      return;
    }
    function getNextRetryDelay(config) {
      const retryDelay = config.currentRetryAttempt ? 0 : config.retryDelay ?? 100;
      const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1e3;
      const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
      return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
    }
  }
});

// node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/interceptor.js
var require_interceptor = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/interceptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosInterceptorManager = void 0;
    var GaxiosInterceptorManager = class extends Set {
    };
    exports.GaxiosInterceptorManager = GaxiosInterceptorManager;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s3 = 1e3;
    var m2 = s3 * 60;
    var h2 = m2 * 60;
    var d = h2 * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s3;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms / h2) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms / m2) + "m";
      }
      if (msAbs >= s3) {
        return Math.round(ms / s3) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h2) {
        return plural(ms, msAbs, h2, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms, msAbs, m2, "minute");
      }
      if (msAbs >= s3) {
        return plural(ms, msAbs, s3, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common2 = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common2()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = __require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug.inspectOpts[keys[i2]] = exports.inspectOpts[keys[i2]];
      }
    }
    module.exports = require_common2()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/agent-base/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/agent-base/dist/helpers.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.req = exports.json = exports.toBuffer = void 0;
    var http5 = __importStar(__require("http"));
    var https3 = __importStar(__require("https"));
    async function toBuffer(stream) {
      let length = 0;
      const chunks = [];
      for await (const chunk of stream) {
        length += chunk.length;
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, length);
    }
    exports.toBuffer = toBuffer;
    async function json(stream) {
      const buf = await toBuffer(stream);
      const str = buf.toString("utf8");
      try {
        return JSON.parse(str);
      } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
      }
    }
    exports.json = json;
    function req(url, opts = {}) {
      const href = typeof url === "string" ? url : url.href;
      const req2 = (href.startsWith("https:") ? https3 : http5).request(url, opts);
      const promise = new Promise((resolve2, reject) => {
        req2.once("response", resolve2).once("error", reject).end();
      });
      req2.then = promise.then.bind(promise);
      return req2;
    }
    exports.req = req;
  }
});

// node_modules/agent-base/dist/index.js
var require_dist = __commonJS({
  "node_modules/agent-base/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Agent = void 0;
    var net = __importStar(__require("net"));
    var http5 = __importStar(__require("http"));
    var https_1 = __require("https");
    __exportStar(require_helpers(), exports);
    var INTERNAL = Symbol("AgentBaseInternalState");
    var Agent = class extends http5.Agent {
      constructor(opts) {
        super(opts);
        this[INTERNAL] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(options) {
        if (options) {
          if (typeof options.secureEndpoint === "boolean") {
            return options.secureEndpoint;
          }
          if (typeof options.protocol === "string") {
            return options.protocol === "https:";
          }
        }
        const { stack } = new Error();
        if (typeof stack !== "string")
          return false;
        return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(name) {
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
          return null;
        }
        if (!this.sockets[name]) {
          this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({ writable: false });
        this.sockets[name].push(fakeSocket);
        this.totalSocketCount++;
        return fakeSocket;
      }
      decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
          return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
          sockets.splice(index, 1);
          this.totalSocketCount--;
          if (sockets.length === 0) {
            delete this.sockets[name];
          }
        }
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
          return https_1.Agent.prototype.getName.call(this, options);
        }
        return super.getName(options);
      }
      createSocket(req, options, cb) {
        const connectOpts = {
          ...options,
          secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
          this.decrementSockets(name, fakeSocket);
          if (socket instanceof http5.Agent) {
            try {
              return socket.addRequest(req, connectOpts);
            } catch (err) {
              return cb(err);
            }
          }
          this[INTERNAL].currentSocket = socket;
          super.createSocket(req, options, cb);
        }, (err) => {
          this.decrementSockets(name, fakeSocket);
          cb(err);
        });
      }
      createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = void 0;
        if (!socket) {
          throw new Error("No socket was returned in the `connect()` function");
        }
        return socket;
      }
      get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].defaultPort = v;
        }
      }
      get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].protocol = v;
        }
      }
    };
    exports.Agent = Agent;
  }
});

// node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseProxyResponse = void 0;
    var debug_1 = __importDefault(require_src());
    var debug = (0, debug_1.default)("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve2, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read() {
          const b = socket.read();
          if (b)
            ondata(b);
          else
            socket.once("readable", read);
        }
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("readable", read);
        }
        function onend() {
          cleanup();
          debug("onend");
          reject(new Error("Proxy connection ended before receiving CONNECT response"));
        }
        function onerror(err) {
          cleanup();
          debug("onerror %o", err);
          reject(err);
        }
        function ondata(b) {
          buffers.push(b);
          buffersLength += b.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug("have not received end of HTTP headers yet...");
            read();
            return;
          }
          const headerParts = buffered.slice(0, endOfHeaders).toString("ascii").split("\r\n");
          const firstLine = headerParts.shift();
          if (!firstLine) {
            socket.destroy();
            return reject(new Error("No header received from proxy CONNECT response"));
          }
          const firstLineParts = firstLine.split(" ");
          const statusCode = +firstLineParts[1];
          const statusText = firstLineParts.slice(2).join(" ");
          const headers = {};
          for (const header of headerParts) {
            if (!header)
              continue;
            const firstColon = header.indexOf(":");
            if (firstColon === -1) {
              socket.destroy();
              return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
            }
            const key = header.slice(0, firstColon).toLowerCase();
            const value = header.slice(firstColon + 1).trimStart();
            const current = headers[key];
            if (typeof current === "string") {
              headers[key] = [current, value];
            } else if (Array.isArray(current)) {
              current.push(value);
            } else {
              headers[key] = value;
            }
          }
          debug("got proxy server response: %o %o", firstLine, headers);
          cleanup();
          resolve2({
            connect: {
              statusCode,
              statusText,
              headers
            },
            buffered
          });
        }
        socket.on("error", onerror);
        socket.on("end", onend);
        read();
      });
    }
    exports.parseProxyResponse = parseProxyResponse;
  }
});

// node_modules/https-proxy-agent/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/https-proxy-agent/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpsProxyAgent = void 0;
    var net = __importStar(__require("net"));
    var tls = __importStar(__require("tls"));
    var assert_1 = __importDefault(__require("assert"));
    var debug_1 = __importDefault(require_src());
    var agent_base_1 = require_dist();
    var url_1 = __require("url");
    var parse_proxy_response_1 = require_parse_proxy_response();
    var debug = (0, debug_1.default)("https-proxy-agent");
    var setServernameFromNonIpHost = (options) => {
      if (options.servername === void 0 && options.host && !net.isIP(options.host)) {
        return {
          ...options,
          servername: options.host
        };
      }
      return options;
    };
    var HttpsProxyAgent = class extends agent_base_1.Agent {
      constructor(proxy, opts) {
        super(opts);
        this.options = { path: void 0 };
        this.proxy = typeof proxy === "string" ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
        this.connectOpts = {
          // Attempt to negotiate http/1.1 for proxy servers that support http/2
          ALPNProtocols: ["http/1.1"],
          ...opts ? omit(opts, "headers") : null,
          host,
          port
        };
      }
      /**
       * Called when the node-core HTTP client library is creating a
       * new HTTP request.
       */
      async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
          throw new TypeError('No "host" provided');
        }
        let socket;
        if (proxy.protocol === "https:") {
          debug("Creating `tls.Socket`: %o", this.connectOpts);
          socket = tls.connect(setServernameFromNonIpHost(this.connectOpts));
        } else {
          debug("Creating `net.Socket`: %o", this.connectOpts);
          socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r
`;
        if (proxy.username || proxy.password) {
          const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
          headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers["Proxy-Connection"]) {
          headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
        }
        for (const name of Object.keys(headers)) {
          payload += `${name}: ${headers[name]}\r
`;
        }
        const proxyResponsePromise = (0, parse_proxy_response_1.parseProxyResponse)(socket);
        socket.write(`${payload}\r
`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit("proxyConnect", connect);
        this.emit("proxyConnect", connect, req);
        if (connect.statusCode === 200) {
          req.once("socket", resume);
          if (opts.secureEndpoint) {
            debug("Upgrading socket connection to TLS");
            return tls.connect({
              ...omit(setServernameFromNonIpHost(opts), "host", "path", "port"),
              socket
            });
          }
          return socket;
        }
        socket.destroy();
        const fakeSocket = new net.Socket({ writable: false });
        fakeSocket.readable = true;
        req.once("socket", (s3) => {
          debug("Replaying proxy buffer for failed request");
          (0, assert_1.default)(s3.listenerCount("data") > 0);
          s3.push(buffered);
          s3.push(null);
        });
        return fakeSocket;
      }
    };
    HttpsProxyAgent.protocols = ["http", "https"];
    exports.HttpsProxyAgent = HttpsProxyAgent;
    function resume(socket) {
      socket.resume();
    }
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else if (meta[i2]) {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default;
var init_dist = __esm({
  "node_modules/data-uri-to-buffer/dist/index.js"() {
    dist_default = dataUriToBuffer;
  }
});

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, function(exports2) {
      "use strict";
      function noop3() {
        return void 0;
      }
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop3;
      function setFunctionName(fn, name) {
        try {
          Object.defineProperty(fn, "name", {
            value: name,
            configurable: true
          });
        } catch (_a2) {
        }
      }
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return newPromise((resolve2) => resolve2(value));
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      let _queueMicrotask = (callback) => {
        if (typeof queueMicrotask === "function") {
          _queueMicrotask = queueMicrotask;
        } else {
          const resolvedPromise = promiseResolvedWith(void 0);
          _queueMicrotask = (cb) => PerformPromiseThen(resolvedPromise, cb);
        }
        return _queueMicrotask(callback);
      };
      function reflectCall(F3, V, args) {
        if (typeof F3 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F3, V, args);
      }
      function promiseCall(F3, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F3, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      const AbortSteps = Symbol("[[AbortSteps]]");
      const ErrorSteps = Symbol("[[ErrorSteps]]");
      const CancelSteps = Symbol("[[CancelSteps]]");
      const PullSteps = Symbol("[[PullSteps]]");
      const ReleaseSteps = Symbol("[[ReleaseSteps]]");
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        const stream = reader._ownerReadableStream;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        stream._readableStreamController[ReleaseSteps]();
        stream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve2, reject) => {
          reader._closedPromise_resolve = resolve2;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve2, reject) => {
            resolvePromise = resolve2;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamDefaultReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamDefaultReader.prototype.read, "read");
      setFunctionName(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function ReadableStreamDefaultReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e2 = new TypeError("Reader was released");
        ReadableStreamDefaultReaderErrorReadRequests(reader, e2);
      }
      function ReadableStreamDefaultReaderErrorReadRequests(reader, e2) {
        const readRequests = reader._readRequests;
        reader._readRequests = new SimpleQueue();
        readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e2);
        });
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve2, reject) => {
            resolvePromise = resolve2;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              _queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a2) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      var _a, _b, _c;
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      let TransferArrayBuffer = (O) => {
        if (typeof O.transfer === "function") {
          TransferArrayBuffer = (buffer) => buffer.transfer();
        } else if (typeof structuredClone === "function") {
          TransferArrayBuffer = (buffer) => structuredClone(buffer, { transfer: [buffer] });
        } else {
          TransferArrayBuffer = (buffer) => buffer;
        }
        return TransferArrayBuffer(O);
      };
      let IsDetachedBuffer = (O) => {
        if (typeof O.detached === "boolean") {
          IsDetachedBuffer = (buffer) => buffer.detached;
        } else {
          IsDetachedBuffer = (buffer) => buffer.byteLength === 0;
        }
        return IsDetachedBuffer(O);
      };
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function GetMethod(receiver, prop) {
        const func = receiver[prop];
        if (func === void 0 || func === null) {
          return void 0;
        }
        if (typeof func !== "function") {
          throw new TypeError(`${String(prop)} is not a function`);
        }
        return func;
      }
      function CreateAsyncFromSyncIterator(syncIteratorRecord) {
        const syncIterable = {
          [Symbol.iterator]: () => syncIteratorRecord.iterator
        };
        const asyncIterator = async function* () {
          return yield* syncIterable;
        }();
        const nextMethod = asyncIterator.next;
        return { iterator: asyncIterator, nextMethod, done: false };
      }
      const SymbolAsyncIterator = (_c = (_a = Symbol.asyncIterator) !== null && _a !== void 0 ? _a : (_b = Symbol.for) === null || _b === void 0 ? void 0 : _b.call(Symbol, "Symbol.asyncIterator")) !== null && _c !== void 0 ? _c : "@@asyncIterator";
      function GetIterator(obj, hint = "sync", method) {
        if (method === void 0) {
          if (hint === "async") {
            method = GetMethod(obj, SymbolAsyncIterator);
            if (method === void 0) {
              const syncMethod = GetMethod(obj, Symbol.iterator);
              const syncIteratorRecord = GetIterator(obj, "sync", syncMethod);
              return CreateAsyncFromSyncIterator(syncIteratorRecord);
            }
          } else {
            method = GetMethod(obj, Symbol.iterator);
          }
        }
        if (method === void 0) {
          throw new TypeError("The object is not iterable");
        }
        const iterator = reflectCall(method, obj, []);
        if (!typeIsObject(iterator)) {
          throw new TypeError("The iterator method must return an object");
        }
        const nextMethod = iterator.next;
        return { iterator, nextMethod, done: false };
      }
      function IteratorNext(iteratorRecord) {
        const result = reflectCall(iteratorRecord.nextMethod, iteratorRecord.iterator, []);
        if (!typeIsObject(result)) {
          throw new TypeError("The iterator.next() method must return an object");
        }
        return result;
      }
      function IteratorComplete(iterResult) {
        return Boolean(iterResult.done);
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      function isDataViewConstructor(ctor) {
        return ctor === DataView;
      }
      function isDataView(view) {
        return isDataViewConstructor(view.constructor);
      }
      function arrayBufferViewElementSize(ctor) {
        if (isDataViewConstructor(ctor)) {
          return 1;
        }
        return ctor.BYTES_PER_ELEMENT;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer)) {
            throw new TypeError(`The BYOB request's buffer has been detached and so cannot be used as a response`);
          }
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer)) {
            throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          }
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBRequest.prototype.respond, "respond");
      setFunctionName(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        /** @internal */
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            ReadableByteStreamControllerFillReadRequestFromQueue(this, readRequest);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              minimumFill: 1,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
        /** @internal */
        [ReleaseSteps]() {
          if (this._pendingPullIntos.length > 0) {
            const firstPullInto = this._pendingPullIntos.peek();
            firstPullInto.readerType = "none";
            this._pendingPullIntos = new SimpleQueue();
            this._pendingPullIntos.push(firstPullInto);
          }
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableByteStreamController.prototype.close, "close");
      setFunctionName(ReadableByteStreamController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableByteStreamController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, Symbol.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
          return null;
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, buffer, byteOffset, byteLength) {
        let clonedChunk;
        try {
          clonedChunk = ArrayBufferSlice(buffer, byteOffset, byteOffset + byteLength);
        } catch (cloneE) {
          ReadableByteStreamControllerError(controller, cloneE);
          throw cloneE;
        }
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, clonedChunk, 0, byteLength);
      }
      function ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstDescriptor) {
        if (firstDescriptor.bytesFilled > 0) {
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, firstDescriptor.buffer, firstDescriptor.byteOffset, firstDescriptor.bytesFilled);
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        const remainderBytes = maxBytesFilled % pullIntoDescriptor.elementSize;
        const maxAlignedBytes = maxBytesFilled - remainderBytes;
        if (maxAlignedBytes >= pullIntoDescriptor.minimumFill) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller) {
        const reader = controller._controlledReadableByteStream._reader;
        while (reader._readRequests.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const readRequest = reader._readRequests.shift();
          ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest);
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, min, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        const ctor = view.constructor;
        const elementSize = arrayBufferViewElementSize(ctor);
        const { byteOffset, byteLength } = view;
        const minimumFill = min * elementSize;
        let buffer;
        try {
          buffer = TransferArrayBuffer(view.buffer);
        } catch (e2) {
          readIntoRequest._errorSteps(e2);
          return;
        }
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset,
          byteLength,
          bytesFilled: 0,
          minimumFill,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        if (firstDescriptor.readerType === "none") {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
        }
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "none") {
          ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          return;
        }
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.minimumFill) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, pullIntoDescriptor.buffer, end - remainderSize, remainderSize);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled % firstPendingPullInto.elementSize !== 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const { buffer, byteOffset, byteLength } = chunk;
        if (IsDetachedBuffer(buffer)) {
          throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        }
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer)) {
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          if (firstPendingPullInto.readerType === "none") {
            ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstPendingPullInto);
          }
        }
        if (ReadableStreamHasDefaultReader(stream)) {
          ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller);
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest) {
        const entry = controller._queue.shift();
        controller._queueTotalSize -= entry.byteLength;
        ReadableByteStreamControllerHandleQueueDrain(controller);
        const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
        readRequest._chunkSteps(view);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
          return null;
        }, (r2) => {
          ReadableByteStreamControllerError(controller, r2);
          return null;
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertByobReadOptions(options, context) {
        var _a2;
        assertDictionary(options, context);
        const min = (_a2 = options === null || options === void 0 ? void 0 : options.min) !== null && _a2 !== void 0 ? _a2 : 1;
        return {
          min: convertUnsignedLongLongWithEnforceRange(min, `${context} has member 'min' that`)
        };
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view, rawOptions = {}) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer)) {
            return promiseRejectedWith(new TypeError("view's buffer has been detached"));
          }
          let options;
          try {
            options = convertByobReadOptions(rawOptions, "options");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const min = options.min;
          if (min === 0) {
            return promiseRejectedWith(new TypeError("options.min must be greater than 0"));
          }
          if (!isDataView(view)) {
            if (min > view.length) {
              return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's length"));
            }
          } else if (min > view.byteLength) {
            return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's byteLength"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve2, reject) => {
            resolvePromise = resolve2;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, min, readIntoRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamBYOBReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamBYOBReader.prototype.read, "read");
      setFunctionName(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, min, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, min, readIntoRequest);
        }
      }
      function ReadableStreamBYOBReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e2 = new TypeError("Reader was released");
        ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2);
      }
      function ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2) {
        const readIntoRequests = reader._readIntoRequests;
        reader._readIntoRequests = new SimpleQueue();
        readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e2);
        });
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal3(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a2) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(WritableStream.prototype.abort, "abort");
      setFunctionName(WritableStream.prototype.close, "close");
      setFunctionName(WritableStream.prototype.getWriter, "getWriter");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, Symbol.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a2;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a2 = stream._writableStreamController._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort(reason);
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve2, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve2,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve2, reject) => {
          const closeRequest = {
            _resolve: resolve2,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve2, reject) => {
          const writeRequest = {
            _resolve: resolve2,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      setFunctionName(WritableStreamDefaultWriter.prototype.abort, "abort");
      setFunctionName(WritableStreamDefaultWriter.prototype.close, "close");
      setFunctionName(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock");
      setFunctionName(WritableStreamDefaultWriter.prototype.write, "write");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         *
         * @deprecated
         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
         */
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        /** @internal */
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r2);
          return null;
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm;
        let writeAlgorithm;
        let closeAlgorithm;
        let abortAlgorithm;
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        } else {
          writeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        } else {
          closeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        } else {
          abortAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
          return null;
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve2, reject) => {
          writer._closedPromise_resolve = resolve2;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve2, reject) => {
          writer._readyPromise_resolve = resolve2;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      function getGlobals() {
        if (typeof globalThis !== "undefined") {
          return globalThis;
        } else if (typeof self !== "undefined") {
          return self;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        if (ctor.name !== "DOMException") {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a2) {
          return false;
        }
      }
      function getFromGlobal() {
        const ctor = globals === null || globals === void 0 ? void 0 : globals.DOMException;
        return isDOMExceptionConstructor(ctor) ? ctor : void 0;
      }
      function createPolyfill() {
        const ctor = function DOMException4(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        setFunctionName(ctor, "DOMException");
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException3 = getFromGlobal() || createPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve2, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = signal.reason !== void 0 ? signal.reason : new DOMException3("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
            return null;
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              return null;
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve2(void 0);
            }
            return null;
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        /** @internal */
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
        /** @internal */
        [ReleaseSteps]() {
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultController.prototype.close, "close");
      setFunctionName(ReadableStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableStreamDefaultController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
          return null;
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(controller, r2);
          return null;
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve2) => {
          resolveCancelPromise = resolve2;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
          return null;
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve2) => {
          resolveCancelPromise = resolve2;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return null;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
            return null;
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, 1, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function isReadableStreamLike(stream) {
        return typeIsObject(stream) && typeof stream.getReader !== "undefined";
      }
      function ReadableStreamFrom(source) {
        if (isReadableStreamLike(source)) {
          return ReadableStreamFromDefaultReader(source.getReader());
        }
        return ReadableStreamFromIterable(source);
      }
      function ReadableStreamFromIterable(asyncIterable) {
        let stream;
        const iteratorRecord = GetIterator(asyncIterable, "async");
        const startAlgorithm = noop3;
        function pullAlgorithm() {
          let nextResult;
          try {
            nextResult = IteratorNext(iteratorRecord);
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const nextPromise = promiseResolvedWith(nextResult);
          return transformPromiseWith(nextPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            }
            const done = IteratorComplete(iterResult);
            if (done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = IteratorValue(iterResult);
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          const iterator = iteratorRecord.iterator;
          let returnMethod;
          try {
            returnMethod = GetMethod(iterator, "return");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (returnMethod === void 0) {
            return promiseResolvedWith(void 0);
          }
          let returnResult;
          try {
            returnResult = reflectCall(returnMethod, iterator, [reason]);
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const returnPromise = promiseResolvedWith(returnResult);
          return transformPromiseWith(returnPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
            }
            return void 0;
          });
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function ReadableStreamFromDefaultReader(reader) {
        let stream;
        const startAlgorithm = noop3;
        function pullAlgorithm() {
          let readPromise;
          try {
            readPromise = reader.read();
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          return transformPromiseWith(readPromise, (readResult) => {
            if (!typeIsObject(readResult)) {
              throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            }
            if (readResult.done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = readResult.value;
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          try {
            return promiseResolvedWith(reader.cancel(reason));
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal3(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
        [SymbolAsyncIterator](options) {
          return this.values(options);
        }
        /**
         * Creates a new ReadableStream wrapping the provided iterable or async iterable.
         *
         * This can be used to adapt various kinds of objects into a readable stream,
         * such as an array, an async generator, or a Node.js readable stream.
         */
        static from(asyncIterable) {
          return ReadableStreamFrom(asyncIterable);
        }
      }
      Object.defineProperties(ReadableStream2, {
        from: { enumerable: true }
      });
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(ReadableStream2.from, "from");
      setFunctionName(ReadableStream2.prototype.cancel, "cancel");
      setFunctionName(ReadableStream2.prototype.getReader, "getReader");
      setFunctionName(ReadableStream2.prototype.pipeThrough, "pipeThrough");
      setFunctionName(ReadableStream2.prototype.pipeTo, "pipeTo");
      setFunctionName(ReadableStream2.prototype.tee, "tee");
      setFunctionName(ReadableStream2.prototype.values, "values");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, Symbol.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      Object.defineProperty(ReadableStream2.prototype, SymbolAsyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          const readIntoRequests = reader._readIntoRequests;
          reader._readIntoRequests = new SimpleQueue();
          readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop3);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          const readRequests = reader._readRequests;
          reader._readRequests = new SimpleQueue();
          readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamDefaultReaderErrorReadRequests(reader, e2);
        } else {
          ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2);
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      setFunctionName(byteLengthSizeFunction, "size");
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      setFunctionName(countSizeFunction, "size");
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          cancel: cancel === void 0 ? void 0 : convertTransformerCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function convertTransformerCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve2) => {
            startPromise_resolve = resolve2;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, Symbol.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          return TransformStreamDefaultSourceCancelAlgorithm(stream, reason);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        TransformStreamUnblockWrite(stream);
      }
      function TransformStreamUnblockWrite(stream) {
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve2) => {
          stream._backpressureChangePromise_resolve = resolve2;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(TransformStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(TransformStreamDefaultController.prototype.error, "error");
      setFunctionName(TransformStreamDefaultController.prototype.terminate, "terminate");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._finishPromise = void 0;
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm;
        let flushAlgorithm;
        let cancelAlgorithm;
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        } else {
          transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        } else {
          flushAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (transformer.cancel !== void 0) {
          cancelAlgorithm = (reason) => transformer.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r2) => {
          TransformStreamError(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve2, reject) => {
          controller._finishPromise_resolve = resolve2;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerError(readable._readableStreamController, reason);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r2);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve2, reject) => {
          controller._finishPromise_resolve = resolve2;
          controller._finishPromise_reject = reject;
        });
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(flushPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r2);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function TransformStreamDefaultSourceCancelAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const writable = stream._writable;
        controller._finishPromise = newPromise((resolve2, reject) => {
          controller._finishPromise_resolve = resolve2;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (writable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, writable._storedError);
          } else {
            WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, reason);
            TransformStreamUnblockWrite(stream);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, r2);
          TransformStreamUnblockWrite(stream);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function defaultControllerFinishPromiseResolve(controller) {
        if (controller._finishPromise_resolve === void 0) {
          return;
        }
        controller._finishPromise_resolve();
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function defaultControllerFinishPromiseReject(controller, reason) {
        if (controller._finishPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(controller._finishPromise);
        controller._finishPromise_reject(reason);
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports2.CountQueuingStrategy = CountQueuingStrategy;
      exports2.ReadableByteStreamController = ReadableByteStreamController;
      exports2.ReadableStream = ReadableStream2;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports2.TransformStream = TransformStream;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController;
      exports2.WritableStream = WritableStream;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    });
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process9 = __require("node:process");
        const { emitWarning } = process9;
        try {
          process9.emitWarning = () => {
          };
          Object.assign(globalThis, __require("node:stream/web"));
          process9.emitWarning = emitWarning;
        } catch (error) {
          process9.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob4 } = __require("buffer");
      if (Blob4 && !Blob4.prototype.stream) {
        Blob4.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone3 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* (
        /** @type {AsyncIterableIterator<Uint8Array>} */
        part.stream()
      );
    } else if (ArrayBuffer.isView(part)) {
      if (clone3) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = (
        /** @type {Blob} */
        part
      );
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob3, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob2 {
      /** @type {Array.<(Blob|Uint8Array)>} */
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      /**
       * The Blob() constructor returns a new Blob object. The content
       * of the blob consists of the concatenation of the values given
       * in the parameter array.
       *
       * @param {*} blobParts
       * @param {{ type?: string, endings?: string }} [options]
       */
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null) options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob2) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      /**
       * The Blob interface's size property returns the
       * size of the Blob in bytes.
       */
      get size() {
        return this.#size;
      }
      /**
       * The type property of a Blob object returns the MIME type of the file.
       */
      get type() {
        return this.#type;
      }
      /**
       * The text() method in the Blob interface returns a Promise
       * that resolves with a string containing the contents of
       * the blob, interpreted as UTF-8.
       *
       * @return {Promise<string>}
       */
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      /**
       * The arrayBuffer() method in the Blob interface returns a
       * Promise that resolves with the contents of the blob as
       * binary data contained in an ArrayBuffer.
       *
       * @return {Promise<ArrayBuffer>}
       */
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          // @ts-ignore
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      /**
       * The Blob interface's slice() method creates and returns a
       * new Blob object which contains data from a subset of the
       * blob on which it's called.
       *
       * @param {number} [start]
       * @param {number} [end]
       * @param {string} [type]
       */
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob2([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob3 = _Blob;
    fetch_blob_default = Blob3;
  }
});

// node_modules/fetch-blob/file.js
var _File, File3, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File2 extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      /**
       * @param {*[]} fileBits
       * @param {string} fileName
       * @param {{lastModified?: number, type?: string}} options
       */
      // @ts-ignore
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null) options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File3 = _File;
    file_default = File3;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F3, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F3.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData2;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f4) => (f4 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData2 = class FormData3 {
      #d = [];
      constructor(...a) {
        if (a.length) throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++) if (b[c][0] === a) return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this) a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this) yield a;
      }
      *values() {
        for (var [, a] of this) yield a;
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/errors/base.js
var FetchBaseError;
var init_base = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/errors/fetch-error.js
var FetchError;
var init_fetch_error = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base();
    FetchError = class extends FetchBaseError {
      /**
       * @param  {string} message -      Error message for human
       * @param  {string} [type] -        Error type for machine
       * @param  {SystemError} [systemError] - For Node.js system error
       */
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/utils/is.js
var NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, isSameProtocol;
var init_is = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/utils/is.js"() {
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    isSameProtocol = (destination, original) => {
      const orig = new URL(original).protocol;
      const dest = new URL(destination).protocol;
      return orig === dest;
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports, module) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = __require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
import { statSync, createReadStream, promises as fs } from "node:fs";
import { basename } from "node:path";
var import_node_domexception, stat, blobFromSync, blobFrom, fileFrom, fileFromSync, fromBlob, fromFile, BlobDataItem;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = fs);
    blobFromSync = (path2, type) => fromBlob(statSync(path2), path2, type);
    blobFrom = (path2, type) => stat(path2).then((stat2) => fromBlob(stat2, path2, type));
    fileFrom = (path2, type) => stat(path2).then((stat2) => fromFile(stat2, path2, type));
    fileFromSync = (path2, type) => fromFile(statSync(path2), path2, type);
    fromBlob = (stat2, path2, type = "") => new fetch_blob_default([new BlobDataItem({
      path: path2,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], { type });
    fromFile = (stat2, path2, type = "") => new file_default([new BlobDataItem({
      path: path2,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], basename(path2), { type, lastModified: stat2.mtimeMs });
    BlobDataItem = class _BlobDataItem {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      /**
       * Slicing arguments is first validated and formatted
       * to not be out of range by Blob.prototype.slice
       */
      slice(start, end) {
        return new _BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* createReadStream(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body3, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData2();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body3) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      /**
       * @param {string} boundary
       */
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      /**
       * @param {Uint8Array} data
       */
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/body.js
import Stream, { PassThrough } from "node:stream";
import { types, deprecate, promisify } from "node:util";
import { Buffer as Buffer2 } from "node:buffer";
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer2.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer2.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer2.from(accum.join(""));
      }
      return Buffer2.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var pipeline, INTERNALS, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream;
var init_body = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/body.js"() {
    init_fetch_blob();
    init_esm_min();
    init_fetch_error();
    init_base();
    init_is();
    pipeline = promisify(Stream.pipeline);
    INTERNALS = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer2.from(body.toString());
        } else if (isBlob(body)) {
        } else if (Buffer2.isBuffer(body)) {
        } else if (types.isAnyArrayBuffer(body)) {
          body = Buffer2.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer2.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof Stream) {
        } else if (body instanceof FormData2) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer2.from(String(body));
        }
        let stream = body;
        if (Buffer2.isBuffer(body)) {
          stream = Stream.Readable.from(body);
        } else if (isBlob(body)) {
          stream = Stream.Readable.from(body.stream());
        }
        this[INTERNALS] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof Stream) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS].stream;
      }
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      }
      /**
       * Decode response as ArrayBuffer
       *
       * @return  Promise
       */
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData2();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData3 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData3(this.body, ct);
      }
      /**
       * Return raw response as Blob
       *
       * @return Promise
       */
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default([buf], {
          type: ct
        });
      }
      /**
       * Decode response as json
       *
       * @return  Promise
       */
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      /**
       * Decode response as text
       *
       * @return  Promise
       */
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      /**
       * Decode response as buffer (non-spec api)
       *
       * @return  Promise
       */
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: deprecate(
        () => {
        },
        "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
        "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
      ) }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream && typeof body.getBoundary !== "function") {
        p1 = new PassThrough({ highWaterMark });
        p2 = new PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = deprecate(
      (body) => body.getBoundary(),
      "form-data doesn't follow the spec and requires special treatment. Use alternative package",
      "https://github.com/node-fetch/node-fetch/issues/1167"
    );
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer2.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData2) {
        return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof Stream) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer2.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/headers.js
import { types as types2 } from "node:util";
import http from "node:http";
function fromRawHeaders(headers = []) {
  return new Headers2(
    headers.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
var validateHeaderName, validateHeaderValue, Headers2;
var init_headers = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/headers.js"() {
    validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers2 = class _Headers extends URLSearchParams {
      /**
       * Headers class
       *
       * @constructor
       * @param {HeadersInit} [init] - Response headers
       */
      constructor(init) {
        let result = [];
        if (init instanceof _Headers) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !types2.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || types2.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase(),
                    String(value)
                  );
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase()
                  );
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      /**
       * @type {() => IterableIterator<[string, string]>}
       */
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * Node-fetch non-spec method
       * returning all headers and their values as array
       * @returns {Record<string, string[]>}
       */
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      /**
       * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
       */
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(
      Headers2.prototype,
      ["get", "entries", "forEach", "values"].reduce((result, property) => {
        result[property] = { enumerable: true };
        return result;
      }, {})
    );
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus, isRedirect;
var init_is_redirect = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/response.js
var INTERNALS2, Response;
var init_response = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/response.js"() {
    init_headers();
    init_body();
    init_is_redirect();
    INTERNALS2 = Symbol("Response internals");
    Response = class _Response extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS2] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS2].type;
      }
      get url() {
        return this[INTERNALS2].url || "";
      }
      get status() {
        return this[INTERNALS2].status;
      }
      /**
       * Convenience property representing if the request ended normally
       */
      get ok() {
        return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
      }
      get redirected() {
        return this[INTERNALS2].counter > 0;
      }
      get statusText() {
        return this[INTERNALS2].statusText;
      }
      get headers() {
        return this[INTERNALS2].headers;
      }
      get highWaterMark() {
        return this[INTERNALS2].highWaterMark;
      }
      /**
       * Clone this response
       *
       * @return  Response
       */
      clone() {
        return new _Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      /**
       * @param {string} url    The URL that the new response is to originate from.
       * @param {number} status An optional status code for the response (e.g., 302.)
       * @returns {Response}    A Response object.
       */
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new _Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new _Response(null, { status: 0, statusText: "" });
        response[INTERNALS2].type = "error";
        return response;
      }
      static json(data = void 0, init = {}) {
        const body = JSON.stringify(data);
        if (body === void 0) {
          throw new TypeError("data is not JSON serializable");
        }
        const headers = new Headers2(init && init.headers);
        if (!headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
        return new _Response(body, {
          ...init,
          headers
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/utils/get-search.js
var getSearch;
var init_get_search = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/utils/referrer.js
import { isIP } from "node:net";
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var ReferrerPolicy, DEFAULT_REFERRER_POLICY;
var init_referrer = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/utils/referrer.js"() {
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/request.js
import { format as formatUrl } from "node:url";
import { deprecate as deprecate2 } from "node:util";
var INTERNALS3, isRequest, doBadDataWarn, Request, getNodeRequestOptions;
var init_request = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/request.js"() {
    init_headers();
    init_body();
    init_is();
    init_get_search();
    init_referrer();
    INTERNALS3 = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS3] === "object";
    };
    doBadDataWarn = deprecate2(
      () => {
      },
      ".data is not a valid RequestInit property, use .body instead",
      "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
    );
    Request = class _Request extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if (!isRequest(init) && "data" in init) {
          doBadDataWarn();
        }
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers2(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS3] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      /** @returns {string} */
      get method() {
        return this[INTERNALS3].method;
      }
      /** @returns {string} */
      get url() {
        return formatUrl(this[INTERNALS3].parsedURL);
      }
      /** @returns {Headers} */
      get headers() {
        return this[INTERNALS3].headers;
      }
      get redirect() {
        return this[INTERNALS3].redirect;
      }
      /** @returns {AbortSignal} */
      get signal() {
        return this[INTERNALS3].signal;
      }
      // https://fetch.spec.whatwg.org/#dom-request-referrer
      get referrer() {
        if (this[INTERNALS3].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS3].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS3].referrer) {
          return this[INTERNALS3].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS3].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      /**
       * Clone this request
       *
       * @return  Request
       */
      clone() {
        return new _Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS3];
      const headers = new Headers2(request[INTERNALS3].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS3].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS3].referrer = "no-referrer";
      }
      if (request[INTERNALS3].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      const search = getSearch(parsedURL);
      const options = {
        // Overwrite search to retain trailing ? (issue #776)
        path: parsedURL.pathname + search,
        // The following options are not expressed in the URL
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        /** @type {URL} */
        parsedURL,
        options
      };
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/errors/abort-error.js
var AbortError;
var init_abort_error = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base();
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// node_modules/google-auth-library/node_modules/node-fetch/src/index.js
var src_exports = {};
__export(src_exports, {
  AbortError: () => AbortError,
  Blob: () => fetch_blob_default,
  FetchError: () => FetchError,
  File: () => file_default,
  FormData: () => FormData2,
  Headers: () => Headers2,
  Request: () => Request,
  Response: () => Response,
  blobFrom: () => blobFrom,
  blobFromSync: () => blobFromSync,
  default: () => fetch,
  fileFrom: () => fileFrom,
  fileFromSync: () => fileFromSync,
  isRedirect: () => isRedirect
});
import http2 from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import Stream2, { PassThrough as PassThrough2, pipeline as pump } from "node:stream";
import { Buffer as Buffer3 } from "node:buffer";
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http2).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream2.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream2.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pump(response_, new PassThrough2(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pump(body, zlib.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pump(response_, new PassThrough2(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pump(body, zlib.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pump(body, zlib.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve2(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pump(body, zlib.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer3.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer3.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer3.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer3.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var supportedSchemas;
var init_src = __esm({
  "node_modules/google-auth-library/node_modules/node-fetch/src/index.js"() {
    init_dist();
    init_body();
    init_response();
    init_headers();
    init_request();
    init_fetch_error();
    init_abort_error();
    init_is_redirect();
    init_esm_min();
    init_is();
    init_referrer();
    init_from();
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/gaxios.js
var require_gaxios = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/gaxios.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gaxios = void 0;
    var extend_1 = __importDefault(require_extend());
    var https_1 = __require("https");
    var common_js_1 = require_common();
    var retry_js_1 = require_retry();
    var stream_1 = __require("stream");
    var interceptor_js_1 = require_interceptor();
    var randomUUID = async () => globalThis.crypto?.randomUUID() || (await import("crypto")).randomUUID();
    var HTTP_STATUS_NO_CONTENT = 204;
    var Gaxios = class {
      agentCache = /* @__PURE__ */ new Map();
      /**
       * Default HTTP options that will be used for every HTTP request.
       */
      defaults;
      /**
       * Interceptors
       */
      interceptors;
      /**
       * The Gaxios class is responsible for making HTTP requests.
       * @param defaults The default set of options to be used for this instance.
       */
      constructor(defaults) {
        this.defaults = defaults || {};
        this.interceptors = {
          request: new interceptor_js_1.GaxiosInterceptorManager(),
          response: new interceptor_js_1.GaxiosInterceptorManager()
        };
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link Gaxios}.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const gaxios = new Gaxios();
       * const myFetch: typeof fetch = (...args) => gaxios.fetch(...args);
       * await myFetch('https://example.com');
       * ```
       *
       * @param args `fetch` API or `Gaxios#request` parameters
       * @returns the {@link Response} with Gaxios-added properties
       */
      fetch(...args) {
        const input = args[0];
        const init = args[1];
        let url = void 0;
        const headers = new Headers();
        if (typeof input === "string") {
          url = new URL(input);
        } else if (input instanceof URL) {
          url = input;
        } else if (input && input.url) {
          url = new URL(input.url);
        }
        if (input && typeof input === "object" && "headers" in input) {
          _a.mergeHeaders(headers, input.headers);
        }
        if (init) {
          _a.mergeHeaders(headers, new Headers(init.headers));
        }
        if (typeof input === "object" && !(input instanceof URL)) {
          return this.request({ ...init, ...input, headers, url });
        } else {
          return this.request({ ...init, headers, url });
        }
      }
      /**
       * Perform an HTTP request with the given options.
       * @param opts Set of HTTP options that will be used for this HTTP request.
       */
      async request(opts = {}) {
        let prepared = await this.#prepareRequest(opts);
        prepared = await this.#applyRequestInterceptors(prepared);
        return this.#applyResponseInterceptors(this._request(prepared));
      }
      async _defaultAdapter(config) {
        const fetchImpl = config.fetchImplementation || this.defaults.fetchImplementation || await _a.#getFetch();
        const preparedOpts = { ...config };
        delete preparedOpts.data;
        const res = await fetchImpl(config.url, preparedOpts);
        const data = await this.getResponseData(config, res);
        if (!Object.getOwnPropertyDescriptor(res, "data")?.configurable) {
          Object.defineProperties(res, {
            data: {
              configurable: true,
              writable: true,
              enumerable: true,
              value: data
            }
          });
        }
        return Object.assign(res, { config, data });
      }
      /**
       * Internal, retryable version of the `request` method.
       * @param opts Set of HTTP options that will be used for this HTTP request.
       */
      async _request(opts) {
        try {
          let translatedResponse;
          if (opts.adapter) {
            translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
          } else {
            translatedResponse = await this._defaultAdapter(opts);
          }
          if (!opts.validateStatus(translatedResponse.status)) {
            if (opts.responseType === "stream") {
              const response = [];
              for await (const chunk of translatedResponse.data) {
                response.push(chunk);
              }
              translatedResponse.data = Buffer.concat(response.map((c) => typeof c === "string" ? Buffer.from(c) : c)).toString("utf8");
            }
            const errorInfo = common_js_1.GaxiosError.extractAPIErrorFromResponse(translatedResponse, `Request failed with status code ${translatedResponse.status}`);
            throw new common_js_1.GaxiosError(errorInfo?.message, opts, translatedResponse, errorInfo);
          }
          return translatedResponse;
        } catch (e2) {
          let err;
          if (e2 instanceof common_js_1.GaxiosError) {
            err = e2;
          } else if (e2 instanceof Error) {
            err = new common_js_1.GaxiosError(e2.message, opts, void 0, e2);
          } else {
            err = new common_js_1.GaxiosError("Unexpected Gaxios Error", opts, void 0, e2);
          }
          const { shouldRetry, config } = await (0, retry_js_1.getRetryConfig)(err);
          if (shouldRetry && config) {
            err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
            opts.retryConfig = err.config?.retryConfig;
            this.#appendTimeoutToSignal(opts);
            return this._request(opts);
          }
          if (opts.errorRedactor) {
            opts.errorRedactor(err);
          }
          throw err;
        }
      }
      async getResponseData(opts, res) {
        if (res.status === HTTP_STATUS_NO_CONTENT) {
          return "";
        }
        if (opts.maxContentLength && res.headers.has("content-length") && opts.maxContentLength < Number.parseInt(res.headers?.get("content-length") || "")) {
          throw new common_js_1.GaxiosError("Response's `Content-Length` is over the limit.", opts, Object.assign(res, { config: opts }));
        }
        switch (opts.responseType) {
          case "stream":
            return res.body;
          case "json": {
            const data = await res.text();
            try {
              return JSON.parse(data);
            } catch {
              return data;
            }
          }
          case "arraybuffer":
            return res.arrayBuffer();
          case "blob":
            return res.blob();
          case "text":
            return res.text();
          default:
            return this.getResponseDataFromContentType(res);
        }
      }
      #urlMayUseProxy(url, noProxy = []) {
        const candidate = new URL(url);
        const noProxyList = [...noProxy];
        const noProxyEnvList = (process.env.NO_PROXY ?? process.env.no_proxy)?.split(",") || [];
        for (const rule of noProxyEnvList) {
          noProxyList.push(rule.trim());
        }
        for (const rule of noProxyList) {
          if (rule instanceof RegExp) {
            if (rule.test(candidate.toString())) {
              return false;
            }
          } else if (rule instanceof URL) {
            if (rule.origin === candidate.origin) {
              return false;
            }
          } else if (rule.startsWith("*.") || rule.startsWith(".")) {
            const cleanedRule = rule.replace(/^\*\./, ".");
            if (candidate.hostname.endsWith(cleanedRule)) {
              return false;
            }
          } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
            return false;
          }
        }
        return true;
      }
      /**
       * Applies the request interceptors. The request interceptors are applied after the
       * call to prepareRequest is completed.
       *
       * @param {GaxiosOptionsPrepared} options The current set of options.
       *
       * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
       */
      async #applyRequestInterceptors(options) {
        let promiseChain = Promise.resolve(options);
        for (const interceptor of this.interceptors.request.values()) {
          if (interceptor) {
            promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
          }
        }
        return promiseChain;
      }
      /**
       * Applies the response interceptors. The response interceptors are applied after the
       * call to request is made.
       *
       * @param {GaxiosOptionsPrepared} options The current set of options.
       *
       * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
       */
      async #applyResponseInterceptors(response) {
        let promiseChain = Promise.resolve(response);
        for (const interceptor of this.interceptors.response.values()) {
          if (interceptor) {
            promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
          }
        }
        return promiseChain;
      }
      /**
       * Validates the options, merges them with defaults, and prepare request.
       *
       * @param options The original options passed from the client.
       * @returns Prepared options, ready to make a request
       */
      async #prepareRequest(options) {
        const preparedHeaders = new Headers(this.defaults.headers);
        _a.mergeHeaders(preparedHeaders, options.headers);
        const opts = (0, extend_1.default)(true, {}, this.defaults, options);
        if (!opts.url) {
          throw new Error("URL is required.");
        }
        if (opts.baseURL) {
          opts.url = new URL(opts.url, opts.baseURL);
        }
        opts.url = new URL(opts.url);
        if (opts.params) {
          if (opts.paramsSerializer) {
            let additionalQueryParams = opts.paramsSerializer(opts.params);
            if (additionalQueryParams.startsWith("?")) {
              additionalQueryParams = additionalQueryParams.slice(1);
            }
            const prefix = opts.url.toString().includes("?") ? "&" : "?";
            opts.url = opts.url + prefix + additionalQueryParams;
          } else {
            const url = opts.url instanceof URL ? opts.url : new URL(opts.url);
            for (const [key, value] of new URLSearchParams(opts.params)) {
              url.searchParams.append(key, value);
            }
            opts.url = url;
          }
        }
        if (typeof options.maxContentLength === "number") {
          opts.size = options.maxContentLength;
        }
        if (typeof options.maxRedirects === "number") {
          opts.follow = options.maxRedirects;
        }
        const shouldDirectlyPassData = typeof opts.data === "string" || opts.data instanceof ArrayBuffer || opts.data instanceof Blob || // Node 18 does not have a global `File` object
        globalThis.File && opts.data instanceof File || opts.data instanceof FormData || opts.data instanceof stream_1.Readable || opts.data instanceof ReadableStream || opts.data instanceof String || opts.data instanceof URLSearchParams || ArrayBuffer.isView(opts.data) || // `Buffer` (Node.js), `DataView`, `TypedArray`
        /**
         * @deprecated `node-fetch` or another third-party's request types
         */
        ["Blob", "File", "FormData"].includes(opts.data?.constructor?.name || "");
        if (opts.multipart?.length) {
          const boundary = await randomUUID();
          preparedHeaders.set("content-type", `multipart/related; boundary=${boundary}`);
          opts.body = stream_1.Readable.from(this.getMultipartRequest(opts.multipart, boundary));
        } else if (shouldDirectlyPassData) {
          opts.body = opts.data;
        } else if (typeof opts.data === "object") {
          if (preparedHeaders.get("Content-Type") === "application/x-www-form-urlencoded") {
            opts.body = opts.paramsSerializer ? opts.paramsSerializer(opts.data) : new URLSearchParams(opts.data);
          } else {
            if (!preparedHeaders.has("content-type")) {
              preparedHeaders.set("content-type", "application/json");
            }
            opts.body = JSON.stringify(opts.data);
          }
        } else if (opts.data) {
          opts.body = opts.data;
        }
        opts.validateStatus = opts.validateStatus || this.validateStatus;
        opts.responseType = opts.responseType || "unknown";
        if (!preparedHeaders.has("accept") && opts.responseType === "json") {
          preparedHeaders.set("accept", "application/json");
        }
        const proxy = opts.proxy || process?.env?.HTTPS_PROXY || process?.env?.https_proxy || process?.env?.HTTP_PROXY || process?.env?.http_proxy;
        if (opts.agent) {
        } else if (proxy && this.#urlMayUseProxy(opts.url, opts.noProxy)) {
          const HttpsProxyAgent = await _a.#getProxyAgent();
          if (this.agentCache.has(proxy)) {
            opts.agent = this.agentCache.get(proxy);
          } else {
            opts.agent = new HttpsProxyAgent(proxy, {
              cert: opts.cert,
              key: opts.key
            });
            this.agentCache.set(proxy, opts.agent);
          }
        } else if (opts.cert && opts.key) {
          if (this.agentCache.has(opts.key)) {
            opts.agent = this.agentCache.get(opts.key);
          } else {
            opts.agent = new https_1.Agent({
              cert: opts.cert,
              key: opts.key
            });
            this.agentCache.set(opts.key, opts.agent);
          }
        }
        if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
          opts.errorRedactor = common_js_1.defaultErrorRedactor;
        }
        if (opts.body && !("duplex" in opts)) {
          opts.duplex = "half";
        }
        this.#appendTimeoutToSignal(opts);
        return Object.assign(opts, {
          headers: preparedHeaders,
          url: opts.url instanceof URL ? opts.url : new URL(opts.url)
        });
      }
      #appendTimeoutToSignal(opts) {
        if (opts.timeout) {
          const timeoutSignal = AbortSignal.timeout(opts.timeout);
          if (opts.signal && !opts.signal.aborted) {
            opts.signal = AbortSignal.any([opts.signal, timeoutSignal]);
          } else {
            opts.signal = timeoutSignal;
          }
        }
      }
      /**
       * By default, throw for any non-2xx status code
       * @param status status code from the HTTP response
       */
      validateStatus(status) {
        return status >= 200 && status < 300;
      }
      /**
       * Attempts to parse a response by looking at the Content-Type header.
       * @param {Response} response the HTTP response.
       * @returns a promise that resolves to the response data.
       */
      async getResponseDataFromContentType(response) {
        let contentType = response.headers.get("Content-Type");
        if (contentType === null) {
          return response.text();
        }
        contentType = contentType.toLowerCase();
        if (contentType.includes("application/json")) {
          let data = await response.text();
          try {
            data = JSON.parse(data);
          } catch {
          }
          return data;
        } else if (contentType.match(/^text\//)) {
          return response.text();
        } else {
          return response.blob();
        }
      }
      /**
       * Creates an async generator that yields the pieces of a multipart/related request body.
       * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
       * multipart/related requests are not currently supported.
       *
       * @param {GaxiosMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
       * @param {string} boundary the boundary string to be placed between each part.
       */
      async *getMultipartRequest(multipartOptions, boundary) {
        const finale = `--${boundary}--`;
        for (const currentPart of multipartOptions) {
          const partContentType = currentPart.headers.get("Content-Type") || "application/octet-stream";
          const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
          yield preamble;
          if (typeof currentPart.content === "string") {
            yield currentPart.content;
          } else {
            yield* currentPart.content;
          }
          yield "\r\n";
        }
        yield finale;
      }
      /**
       * A cache for the lazily-loaded proxy agent.
       *
       * Should use {@link Gaxios[#getProxyAgent]} to retrieve.
       */
      // using `import` to dynamically import the types here
      static #proxyAgent;
      /**
       * A cache for the lazily-loaded fetch library.
       *
       * Should use {@link Gaxios[#getFetch]} to retrieve.
       */
      //
      static #fetch;
      /**
       * Imports, caches, and returns a proxy agent - if not already imported
       *
       * @returns A proxy agent
       */
      static async #getProxyAgent() {
        this.#proxyAgent ||= (await Promise.resolve().then(() => __toESM(require_dist2()))).HttpsProxyAgent;
        return this.#proxyAgent;
      }
      static async #getFetch() {
        const hasWindow = typeof window !== "undefined" && !!window;
        this.#fetch ||= hasWindow ? window.fetch : (await Promise.resolve().then(() => (init_src(), src_exports))).default;
        return this.#fetch;
      }
      /**
       * Merges headers.
       * If the base headers do not exist a new `Headers` object will be returned.
       *
       * @remarks
       *
       * Using this utility can be helpful when the headers are not known to exist:
       * - if they exist as `Headers`, that instance will be used
       *   - it improves performance and allows users to use their existing references to their `Headers`
       * - if they exist in another form (`HeadersInit`), they will be used to create a new `Headers` object
       * - if the base headers do not exist a new `Headers` object will be created
       *
       * @param base headers to append/overwrite to
       * @param append headers to append/overwrite with
       * @returns the base headers instance with merged `Headers`
       */
      static mergeHeaders(base, ...append) {
        base = base instanceof Headers ? base : new Headers(base);
        for (const headers of append) {
          const add = headers instanceof Headers ? headers : new Headers(headers);
          add.forEach((value, key) => {
            key === "set-cookie" ? base.append(key, value) : base.set(key, value);
          });
        }
        return base;
      }
    };
    exports.Gaxios = Gaxios;
    _a = Gaxios;
  }
});

// node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/index.js
var require_src2 = __commonJS({
  "node_modules/google-auth-library/node_modules/gaxios/build/cjs/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request;
    var gaxios_js_1 = require_gaxios();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: function() {
      return gaxios_js_1.Gaxios;
    } });
    var common_js_1 = require_common();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: function() {
      return common_js_1.GaxiosError;
    } });
    __exportStar(require_interceptor(), exports);
    exports.instance = new gaxios_js_1.Gaxios();
    async function request(opts) {
      return exports.instance.request(opts);
    }
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = __require("buffer");
    var Buffer7 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer7.from && Buffer7.alloc && Buffer7.allocUnsafe && Buffer7.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer7(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer7.prototype);
    copyProps(Buffer7, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer7(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer7(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer7(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
    "use strict";
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    module.exports = getParamBytesForAlg;
  }
});

// node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
    "use strict";
    var Buffer7 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function signatureAsBuffer(signature) {
      if (Buffer7.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer7.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer7.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer7.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    module.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node_modules/google-auth-library/build/src/util.js
var require_util2 = __commonJS({
  "node_modules/google-auth-library/build/src/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = void 0;
    exports.snakeToCamel = snakeToCamel;
    exports.originalOrCamelOptions = originalOrCamelOptions;
    exports.removeUndefinedValuesInObject = removeUndefinedValuesInObject;
    exports.isValidFile = isValidFile;
    exports.getWellKnownCertificateConfigFileLocation = getWellKnownCertificateConfigFileLocation;
    var fs7 = __require("fs");
    var os2 = __require("os");
    var path2 = __require("path");
    var WELL_KNOWN_CERTIFICATE_CONFIG_FILE = "certificate_config.json";
    var CLOUDSDK_CONFIG_DIRECTORY = "gcloud";
    function snakeToCamel(str) {
      return str.replace(/([_][^_])/g, (match) => match.slice(1).toUpperCase());
    }
    function originalOrCamelOptions(obj) {
      function get(key) {
        const o = obj || {};
        return o[key] ?? o[snakeToCamel(key)];
      }
      return { get };
    }
    var LRUCache = class {
      capacity;
      /**
       * Maps are in order. Thus, the older item is the first item.
       *
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
       */
      #cache = /* @__PURE__ */ new Map();
      maxAge;
      constructor(options) {
        this.capacity = options.capacity;
        this.maxAge = options.maxAge;
      }
      /**
       * Moves the key to the end of the cache.
       *
       * @param key the key to move
       * @param value the value of the key
       */
      #moveToEnd(key, value) {
        this.#cache.delete(key);
        this.#cache.set(key, {
          value,
          lastAccessed: Date.now()
        });
      }
      /**
       * Add an item to the cache.
       *
       * @param key the key to upsert
       * @param value the value of the key
       */
      set(key, value) {
        this.#moveToEnd(key, value);
        this.#evict();
      }
      /**
       * Get an item from the cache.
       *
       * @param key the key to retrieve
       */
      get(key) {
        const item = this.#cache.get(key);
        if (!item)
          return;
        this.#moveToEnd(key, item.value);
        this.#evict();
        return item.value;
      }
      /**
       * Maintain the cache based on capacity and TTL.
       */
      #evict() {
        const cutoffDate = this.maxAge ? Date.now() - this.maxAge : 0;
        let oldestItem = this.#cache.entries().next();
        while (!oldestItem.done && (this.#cache.size > this.capacity || // too many
        oldestItem.value[1].lastAccessed < cutoffDate)) {
          this.#cache.delete(oldestItem.value[0]);
          oldestItem = this.#cache.entries().next();
        }
      }
    };
    exports.LRUCache = LRUCache;
    function removeUndefinedValuesInObject(object) {
      Object.entries(object).forEach(([key, value]) => {
        if (value === void 0 || value === "undefined") {
          delete object[key];
        }
      });
      return object;
    }
    async function isValidFile(filePath) {
      try {
        const stats = await fs7.promises.lstat(filePath);
        return stats.isFile();
      } catch (e2) {
        return false;
      }
    }
    function getWellKnownCertificateConfigFileLocation() {
      const configDir = process.env.CLOUDSDK_CONFIG || (_isWindows() ? path2.join(process.env.APPDATA || "", CLOUDSDK_CONFIG_DIRECTORY) : path2.join(process.env.HOME || "", ".config", CLOUDSDK_CONFIG_DIRECTORY));
      return path2.join(configDir, WELL_KNOWN_CERTIFICATE_CONFIG_FILE);
    }
    function _isWindows() {
      return os2.platform().startsWith("win");
    }
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i2 = 0, len = code.length; i2 < len; ++i2) {
      lookup[i2] = code[i2];
      revLookup[code.charCodeAt(i2)] = i2;
    }
    var i2;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i3;
      for (i3 = 0; i3 < len2; i3 += 4) {
        tmp = revLookup[b64.charCodeAt(i3)] << 18 | revLookup[b64.charCodeAt(i3 + 1)] << 12 | revLookup[b64.charCodeAt(i3 + 2)] << 6 | revLookup[b64.charCodeAt(i3 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i3)] << 2 | revLookup[b64.charCodeAt(i3 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i3)] << 10 | revLookup[b64.charCodeAt(i3 + 1)] << 4 | revLookup[b64.charCodeAt(i3 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i3 = start; i3 < end; i3 += 3) {
        tmp = (uint8[i3] << 16 & 16711680) + (uint8[i3 + 1] << 8 & 65280) + (uint8[i3 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i3 = 0, len22 = len2 - extraBytes; i3 < len22; i3 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i3, i3 + maxChunkLength > len22 ? len22 : i3 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/google-auth-library/build/src/crypto/shared.js
var require_shared = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/shared.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromArrayBufferToHex = fromArrayBufferToHex;
    function fromArrayBufferToHex(arrayBuffer) {
      const byteArray = Array.from(new Uint8Array(arrayBuffer));
      return byteArray.map((byte) => {
        return byte.toString(16).padStart(2, "0");
      }).join("");
    }
  }
});

// node_modules/google-auth-library/build/src/crypto/browser/crypto.js
var require_crypto = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/browser/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserCrypto = void 0;
    var base64js = require_base64_js();
    var shared_1 = require_shared();
    var BrowserCrypto = class _BrowserCrypto {
      constructor() {
        if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) {
          throw new Error("SubtleCrypto not found. Make sure it's an https:// website.");
        }
      }
      async sha256DigestBase64(str) {
        const inputBuffer = new TextEncoder().encode(str);
        const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
        return base64js.fromByteArray(new Uint8Array(outputBuffer));
      }
      randomBytesBase64(count) {
        const array = new Uint8Array(count);
        window.crypto.getRandomValues(array);
        return base64js.fromByteArray(array);
      }
      static padBase64(base64) {
        while (base64.length % 4 !== 0) {
          base64 += "=";
        }
        return base64;
      }
      async verify(pubkey, data, signature) {
        const algo = {
          name: "RSASSA-PKCS1-v1_5",
          hash: { name: "SHA-256" }
        };
        const dataArray = new TextEncoder().encode(data);
        const signatureArray = base64js.toByteArray(_BrowserCrypto.padBase64(signature));
        const cryptoKey = await window.crypto.subtle.importKey("jwk", pubkey, algo, true, ["verify"]);
        const result = await window.crypto.subtle.verify(algo, cryptoKey, Buffer.from(signatureArray), dataArray);
        return result;
      }
      async sign(privateKey, data) {
        const algo = {
          name: "RSASSA-PKCS1-v1_5",
          hash: { name: "SHA-256" }
        };
        const dataArray = new TextEncoder().encode(data);
        const cryptoKey = await window.crypto.subtle.importKey("jwk", privateKey, algo, true, ["sign"]);
        const result = await window.crypto.subtle.sign(algo, cryptoKey, dataArray);
        return base64js.fromByteArray(new Uint8Array(result));
      }
      decodeBase64StringUtf8(base64) {
        const uint8array = base64js.toByteArray(_BrowserCrypto.padBase64(base64));
        const result = new TextDecoder().decode(uint8array);
        return result;
      }
      encodeBase64StringUtf8(text) {
        const uint8array = new TextEncoder().encode(text);
        const result = base64js.fromByteArray(uint8array);
        return result;
      }
      /**
       * Computes the SHA-256 hash of the provided string.
       * @param str The plain text string to hash.
       * @return A promise that resolves with the SHA-256 hash of the provided
       *   string in hexadecimal encoding.
       */
      async sha256DigestHex(str) {
        const inputBuffer = new TextEncoder().encode(str);
        const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
        return (0, shared_1.fromArrayBufferToHex)(outputBuffer);
      }
      /**
       * Computes the HMAC hash of a message using the provided crypto key and the
       * SHA-256 algorithm.
       * @param key The secret crypto key in utf-8 or ArrayBuffer format.
       * @param msg The plain text message.
       * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
       *   format.
       */
      async signWithHmacSha256(key, msg) {
        const rawKey = typeof key === "string" ? key : String.fromCharCode(...new Uint16Array(key));
        const enc = new TextEncoder();
        const cryptoKey = await window.crypto.subtle.importKey("raw", enc.encode(rawKey), {
          name: "HMAC",
          hash: {
            name: "SHA-256"
          }
        }, false, ["sign"]);
        return window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
      }
    };
    exports.BrowserCrypto = BrowserCrypto;
  }
});

// node_modules/google-auth-library/build/src/crypto/node/crypto.js
var require_crypto2 = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/node/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeCrypto = void 0;
    var crypto = __require("crypto");
    var NodeCrypto = class {
      async sha256DigestBase64(str) {
        return crypto.createHash("sha256").update(str).digest("base64");
      }
      randomBytesBase64(count) {
        return crypto.randomBytes(count).toString("base64");
      }
      async verify(pubkey, data, signature) {
        const verifier = crypto.createVerify("RSA-SHA256");
        verifier.update(data);
        verifier.end();
        return verifier.verify(pubkey, signature, "base64");
      }
      async sign(privateKey, data) {
        const signer = crypto.createSign("RSA-SHA256");
        signer.update(data);
        signer.end();
        return signer.sign(privateKey, "base64");
      }
      decodeBase64StringUtf8(base64) {
        return Buffer.from(base64, "base64").toString("utf-8");
      }
      encodeBase64StringUtf8(text) {
        return Buffer.from(text, "utf-8").toString("base64");
      }
      /**
       * Computes the SHA-256 hash of the provided string.
       * @param str The plain text string to hash.
       * @return A promise that resolves with the SHA-256 hash of the provided
       *   string in hexadecimal encoding.
       */
      async sha256DigestHex(str) {
        return crypto.createHash("sha256").update(str).digest("hex");
      }
      /**
       * Computes the HMAC hash of a message using the provided crypto key and the
       * SHA-256 algorithm.
       * @param key The secret crypto key in utf-8 or ArrayBuffer format.
       * @param msg The plain text message.
       * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
       *   format.
       */
      async signWithHmacSha256(key, msg) {
        const cryptoKey = typeof key === "string" ? key : toBuffer(key);
        return toArrayBuffer(crypto.createHmac("sha256", cryptoKey).update(msg).digest());
      }
    };
    exports.NodeCrypto = NodeCrypto;
    function toArrayBuffer(buffer) {
      const ab = new ArrayBuffer(buffer.length);
      const view = new Uint8Array(ab);
      for (let i2 = 0; i2 < buffer.length; ++i2) {
        view[i2] = buffer[i2];
      }
      return ab;
    }
    function toBuffer(arrayBuffer) {
      return Buffer.from(arrayBuffer);
    }
  }
});

// node_modules/google-auth-library/build/src/crypto/crypto.js
var require_crypto3 = __commonJS({
  "node_modules/google-auth-library/build/src/crypto/crypto.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCrypto = createCrypto;
    exports.hasBrowserCrypto = hasBrowserCrypto;
    var crypto_1 = require_crypto();
    var crypto_2 = require_crypto2();
    __exportStar(require_shared(), exports);
    function createCrypto() {
      if (hasBrowserCrypto()) {
        return new crypto_1.BrowserCrypto();
      }
      return new crypto_2.NodeCrypto();
    }
    function hasBrowserCrypto() {
      return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined";
    }
  }
});

// node_modules/google-logging-utils/build/src/colours.js
var require_colours = __commonJS({
  "node_modules/google-logging-utils/build/src/colours.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Colours = void 0;
    var Colours = class _Colours {
      static enabled = false;
      static reset = "";
      static bright = "";
      static dim = "";
      static red = "";
      static green = "";
      static yellow = "";
      static blue = "";
      static magenta = "";
      static cyan = "";
      static white = "";
      static grey = "";
      /**
       * @param stream The stream (e.g. process.stderr)
       * @returns true if the stream should have colourization enabled
       */
      static isEnabled(stream) {
        return stream && // May happen in browsers.
        stream.isTTY && (typeof stream.getColorDepth === "function" ? stream.getColorDepth() > 2 : true);
      }
      static refresh() {
        _Colours.enabled = _Colours.isEnabled(process?.stderr);
        if (!this.enabled) {
          _Colours.reset = "";
          _Colours.bright = "";
          _Colours.dim = "";
          _Colours.red = "";
          _Colours.green = "";
          _Colours.yellow = "";
          _Colours.blue = "";
          _Colours.magenta = "";
          _Colours.cyan = "";
          _Colours.white = "";
          _Colours.grey = "";
        } else {
          _Colours.reset = "\x1B[0m";
          _Colours.bright = "\x1B[1m";
          _Colours.dim = "\x1B[2m";
          _Colours.red = "\x1B[31m";
          _Colours.green = "\x1B[32m";
          _Colours.yellow = "\x1B[33m";
          _Colours.blue = "\x1B[34m";
          _Colours.magenta = "\x1B[35m";
          _Colours.cyan = "\x1B[36m";
          _Colours.white = "\x1B[37m";
          _Colours.grey = "\x1B[90m";
        }
      }
    };
    exports.Colours = Colours;
    Colours.refresh();
  }
});

// node_modules/google-logging-utils/build/src/types.js
var require_types = __commonJS({
  "node_modules/google-logging-utils/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LogSeverity = void 0;
    var LogSeverity;
    (function(LogSeverity2) {
      LogSeverity2["DEFAULT"] = "DEFAULT";
      LogSeverity2["DEBUG"] = "DEBUG";
      LogSeverity2["INFO"] = "INFO";
      LogSeverity2["WARNING"] = "WARNING";
      LogSeverity2["ERROR"] = "ERROR";
    })(LogSeverity || (exports.LogSeverity = LogSeverity = {}));
  }
});

// node_modules/google-logging-utils/build/src/logging-utils.js
var require_logging_utils = __commonJS({
  "node_modules/google-logging-utils/build/src/logging-utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i2 = 0; i2 < k.length; i2++) if (k[i2] !== "default") __createBinding(result, mod, k[i2]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.env = exports.DebugLogBackendBase = exports.placeholder = exports.AdhocDebugLogger = void 0;
    exports.getNodeBackend = getNodeBackend;
    exports.getDebugBackend = getDebugBackend;
    exports.getStructuredBackend = getStructuredBackend;
    exports.setBackend = setBackend;
    exports.log = log;
    var events_1 = __require("events");
    var process9 = __importStar(__require("process"));
    var util = __importStar(__require("util"));
    var colours_1 = require_colours();
    var types_1 = require_types();
    var AdhocDebugLogger = class extends events_1.EventEmitter {
      // Our namespace (system/subsystem/etc)
      namespace;
      // The function we'll call with new log lines.
      // Should be built in Node util stuff, or the "debug" package, or whatever.
      upstream;
      // Self-referential function wrapper that calls invoke() on us.
      func;
      /**
       * @param upstream The backend will pass a function that will be
       * called whenever our logger function is invoked.
       */
      constructor(namespace, upstream) {
        super();
        this.namespace = namespace;
        this.upstream = upstream;
        this.func = Object.assign(this.invoke.bind(this), {
          // Also add an instance pointer back to us.
          instance: this,
          // And pull over the EventEmitter functionality.
          on: (event, listener) => this.on(event, listener)
        });
        this.func.debug = (...args) => this.invokeSeverity(types_1.LogSeverity.DEBUG, ...args);
        this.func.info = (...args) => this.invokeSeverity(types_1.LogSeverity.INFO, ...args);
        this.func.warn = (...args) => this.invokeSeverity(types_1.LogSeverity.WARNING, ...args);
        this.func.error = (...args) => this.invokeSeverity(types_1.LogSeverity.ERROR, ...args);
        this.func.sublog = (namespace2) => log(namespace2, this.func);
      }
      invoke(fields, ...args) {
        if (this.upstream) {
          try {
            this.upstream(fields, ...args);
          } catch (e2) {
          }
        }
        try {
          this.emit("log", fields, args);
        } catch (e2) {
        }
      }
      invokeSeverity(severity, ...args) {
        this.invoke({ severity }, ...args);
      }
    };
    exports.AdhocDebugLogger = AdhocDebugLogger;
    exports.placeholder = new AdhocDebugLogger("", () => {
    }).func;
    var DebugLogBackendBase = class {
      cached = /* @__PURE__ */ new Map();
      filters = [];
      filtersSet = false;
      constructor() {
        let nodeFlag = process9.env[exports.env.nodeEnables] ?? "*";
        if (nodeFlag === "all") {
          nodeFlag = "*";
        }
        this.filters = nodeFlag.split(",");
      }
      log(namespace, fields, ...args) {
        try {
          if (!this.filtersSet) {
            this.setFilters();
            this.filtersSet = true;
          }
          let logger = this.cached.get(namespace);
          if (!logger) {
            logger = this.makeLogger(namespace);
            this.cached.set(namespace, logger);
          }
          logger(fields, ...args);
        } catch (e2) {
          console.error(e2);
        }
      }
    };
    exports.DebugLogBackendBase = DebugLogBackendBase;
    var NodeBackend = class extends DebugLogBackendBase {
      // Default to allowing all systems, since we gate earlier based on whether the
      // variable is empty.
      enabledRegexp = /.*/g;
      isEnabled(namespace) {
        return this.enabledRegexp.test(namespace);
      }
      makeLogger(namespace) {
        if (!this.enabledRegexp.test(namespace)) {
          return () => {
          };
        }
        return (fields, ...args) => {
          const nscolour = `${colours_1.Colours.green}${namespace}${colours_1.Colours.reset}`;
          const pid = `${colours_1.Colours.yellow}${process9.pid}${colours_1.Colours.reset}`;
          let level;
          switch (fields.severity) {
            case types_1.LogSeverity.ERROR:
              level = `${colours_1.Colours.red}${fields.severity}${colours_1.Colours.reset}`;
              break;
            case types_1.LogSeverity.INFO:
              level = `${colours_1.Colours.magenta}${fields.severity}${colours_1.Colours.reset}`;
              break;
            case types_1.LogSeverity.WARNING:
              level = `${colours_1.Colours.yellow}${fields.severity}${colours_1.Colours.reset}`;
              break;
            default:
              level = fields.severity ?? types_1.LogSeverity.DEFAULT;
              break;
          }
          const msg = util.formatWithOptions({ colors: colours_1.Colours.enabled }, ...args);
          const filteredFields = Object.assign({}, fields);
          delete filteredFields.severity;
          const fieldsJson = Object.getOwnPropertyNames(filteredFields).length ? JSON.stringify(filteredFields) : "";
          const fieldsColour = fieldsJson ? `${colours_1.Colours.grey}${fieldsJson}${colours_1.Colours.reset}` : "";
          console.error("%s [%s|%s] %s%s", pid, nscolour, level, msg, fieldsJson ? ` ${fieldsColour}` : "");
        };
      }
      // Regexp patterns below are from here:
      // https://github.com/nodejs/node/blob/c0aebed4b3395bd65d54b18d1fd00f071002ac20/lib/internal/util/debuglog.js#L36
      setFilters() {
        const totalFilters = this.filters.join(",");
        const regexp = totalFilters.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^");
        this.enabledRegexp = new RegExp(`^${regexp}$`, "i");
      }
    };
    function getNodeBackend() {
      return new NodeBackend();
    }
    var DebugBackend = class extends DebugLogBackendBase {
      debugPkg;
      constructor(pkg) {
        super();
        this.debugPkg = pkg;
      }
      makeLogger(namespace) {
        const debugLogger = this.debugPkg(namespace);
        return (fields, ...args) => {
          debugLogger(args[0], ...args.slice(1));
        };
      }
      setFilters() {
        const existingFilters = process9.env["NODE_DEBUG"] ?? "";
        process9.env["NODE_DEBUG"] = `${existingFilters}${existingFilters ? "," : ""}${this.filters.join(",")}`;
      }
    };
    function getDebugBackend(debugPkg) {
      return new DebugBackend(debugPkg);
    }
    var StructuredBackend = class extends DebugLogBackendBase {
      upstream;
      constructor(upstream) {
        super();
        this.upstream = upstream ?? void 0;
      }
      makeLogger(namespace) {
        const debugLogger = this.upstream?.makeLogger(namespace);
        return (fields, ...args) => {
          const severity = fields.severity ?? types_1.LogSeverity.INFO;
          const json = Object.assign({
            severity,
            message: util.format(...args)
          }, fields);
          const jsonString = JSON.stringify(json);
          if (debugLogger) {
            debugLogger(fields, jsonString);
          } else {
            console.log("%s", jsonString);
          }
        };
      }
      setFilters() {
        this.upstream?.setFilters();
      }
    };
    function getStructuredBackend(upstream) {
      return new StructuredBackend(upstream);
    }
    exports.env = {
      /**
       * Filter wildcards specific to the Node syntax, and similar to the built-in
       * utils.debuglog() environment variable. If missing, disables logging.
       */
      nodeEnables: "GOOGLE_SDK_NODE_LOGGING"
    };
    var loggerCache = /* @__PURE__ */ new Map();
    var cachedBackend = void 0;
    function setBackend(backend) {
      cachedBackend = backend;
      loggerCache.clear();
    }
    function log(namespace, parent) {
      if (!cachedBackend) {
        const enablesFlag = process9.env[exports.env.nodeEnables];
        if (!enablesFlag) {
          return exports.placeholder;
        }
      }
      if (!namespace) {
        return exports.placeholder;
      }
      if (parent) {
        namespace = `${parent.instance.namespace}:${namespace}`;
      }
      const existing = loggerCache.get(namespace);
      if (existing) {
        return existing.func;
      }
      if (cachedBackend === null) {
        return exports.placeholder;
      } else if (cachedBackend === void 0) {
        cachedBackend = getNodeBackend();
      }
      const logger = (() => {
        let previousBackend = void 0;
        const newLogger = new AdhocDebugLogger(namespace, (fields, ...args) => {
          if (previousBackend !== cachedBackend) {
            if (cachedBackend === null) {
              return;
            } else if (cachedBackend === void 0) {
              cachedBackend = getNodeBackend();
            }
            previousBackend = cachedBackend;
          }
          cachedBackend?.log(namespace, fields, ...args);
        });
        return newLogger;
      })();
      loggerCache.set(namespace, logger);
      return logger.func;
    }
  }
});

// node_modules/google-logging-utils/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/google-logging-utils/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_logging_utils(), exports);
  }
});

// node_modules/google-auth-library/package.json
var require_package2 = __commonJS({
  "node_modules/google-auth-library/package.json"(exports, module) {
    module.exports = {
      name: "google-auth-library",
      version: "11.0.2",
      author: "Google Inc.",
      description: "Google APIs Authentication Client Library for Node.js",
      engines: {
        node: ">=22"
      },
      main: "./build/src/index.js",
      types: "./build/src/index.d.ts",
      repository: {
        type: "git",
        directory: "core/packages/google-auth-library-nodejs",
        url: "https://github.com/googleapis/google-cloud-node.git"
      },
      keywords: [
        "google",
        "api",
        "google apis",
        "client",
        "client library"
      ],
      dependencies: {
        "base64-js": "^1.3.0",
        "ecdsa-sig-formatter": "^1.0.11",
        gaxios: "^7.1.4",
        "gcp-metadata": "^9.0.0",
        "google-logging-utils": "^2.0.0",
        jws: "^4.0.0"
      },
      devDependencies: {
        "@types/base64-js": "^1.2.5",
        "@types/jws": "^3.1.0",
        "@types/mocha": "^10.0.10",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.8",
        "@types/node": "^24.0.0",
        "@types/sinon": "^21.0.0",
        "assert-rejects": "^1.0.0",
        c8: "^10.1.3",
        codecov: "^3.8.3",
        gts: "^6.0.2",
        "is-docker": "^3.0.0",
        jsdoc: "^4.0.4",
        "jsdoc-fresh": "^6.0.0",
        "jsdoc-region-tag": "^5.0.0",
        karma: "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "^5.0.0",
        keypair: "^1.0.4",
        mocha: "^11.1.0",
        mv: "^2.1.1",
        ncp: "^2.0.0",
        nock: "^14.0.5",
        "null-loader": "^4.0.1",
        puppeteer: "^24.0.0",
        sinon: "21.0.3",
        "ts-loader": "^9.5.2",
        typescript: "5.8.3",
        webpack: "^5.97.1",
        "webpack-cli": "^6.0.1"
      },
      files: [
        "build/src",
        "!build/src/**/*.map"
      ],
      scripts: {
        test: "c8 mocha build/test",
        clean: "gts clean",
        prepare: "npm run compile",
        lint: "gts check --no-inline-config",
        compile: "tsc -p .",
        fix: "gts fix",
        pretest: "npm run compile -- --sourceMap",
        docs: "jsdoc -c .jsdoc.js",
        "samples-setup": "cd samples/ && npm link ../ && npm run setup && cd ../",
        "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
        "system-test": "mocha build/system-test --timeout 60000",
        "presystem-test": "npm run compile -- --sourceMap",
        webpack: "webpack",
        "browser-test": "karma start",
        prelint: "cd samples; npm link ../; npm install"
      },
      license: "Apache-2.0",
      homepage: "https://github.com/googleapis/google-cloud-node/tree/main/core/packages/google-auth-library-nodejs"
    };
  }
});

// node_modules/google-auth-library/build/src/shared.cjs
var require_shared2 = __commonJS({
  "node_modules/google-auth-library/build/src/shared.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.USER_AGENT = exports.PRODUCT_NAME = exports.pkg = void 0;
    var pkg = require_package2();
    exports.pkg = pkg;
    var PRODUCT_NAME = "google-api-nodejs-client";
    exports.PRODUCT_NAME = PRODUCT_NAME;
    var USER_AGENT = `${PRODUCT_NAME}/${pkg.version}`;
    exports.USER_AGENT = USER_AGENT;
  }
});

// node_modules/google-auth-library/build/src/auth/authclient.js
var require_authclient = __commonJS({
  "node_modules/google-auth-library/build/src/auth/authclient.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthClient = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = exports.DEFAULT_UNIVERSE = void 0;
    var events_1 = __require("events");
    var gaxios_1 = require_src2();
    var util_1 = require_util2();
    var google_logging_utils_1 = require_src3();
    var shared_cjs_1 = require_shared2();
    exports.DEFAULT_UNIVERSE = "googleapis.com";
    exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 5 * 60 * 1e3;
    var AuthClient = class _AuthClient extends events_1.EventEmitter {
      apiKey;
      projectId;
      /**
       * The quota project ID. The quota project can be used by client libraries for the billing purpose.
       * See {@link https://cloud.google.com/docs/quota Working with quotas}
       */
      quotaProjectId;
      /**
       * The {@link Gaxios `Gaxios`} instance used for making requests.
       */
      transporter;
      credentials = {};
      eagerRefreshThresholdMillis = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS;
      forceRefreshOnFailure = false;
      universeDomain = exports.DEFAULT_UNIVERSE;
      /**
       * Symbols that can be added to GaxiosOptions to specify the method name that is
       * making an RPC call, for logging purposes, as well as a string ID that can be
       * used to correlate calls and responses.
       */
      static RequestMethodNameSymbol = Symbol("request method name");
      static RequestLogIdSymbol = Symbol("request log id");
      constructor(opts = {}) {
        super();
        const options = (0, util_1.originalOrCamelOptions)(opts);
        this.apiKey = opts.apiKey;
        this.projectId = options.get("project_id") ?? null;
        this.quotaProjectId = options.get("quota_project_id");
        this.credentials = options.get("credentials") ?? {};
        this.universeDomain = options.get("universe_domain") ?? exports.DEFAULT_UNIVERSE;
        this.transporter = opts.transporter ?? new gaxios_1.Gaxios(opts.transporterOptions);
        if (options.get("useAuthRequestParameters") !== false) {
          this.transporter.interceptors.request.add(_AuthClient.DEFAULT_REQUEST_INTERCEPTOR);
          this.transporter.interceptors.response.add(_AuthClient.DEFAULT_RESPONSE_INTERCEPTOR);
        }
        if (opts.eagerRefreshThresholdMillis) {
          this.eagerRefreshThresholdMillis = opts.eagerRefreshThresholdMillis;
        }
        this.forceRefreshOnFailure = opts.forceRefreshOnFailure ?? false;
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link AuthClient}.
       *
       * @see {@link AuthClient.request} for the classic method.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const authClient = new AuthClient();
       * const fetchWithAuthClient: typeof fetch = (...args) => authClient.fetch(...args);
       * await fetchWithAuthClient('https://example.com');
       * ```
       *
       * @param args `fetch` API or {@link Gaxios.fetch `Gaxios#fetch`} parameters
       * @returns the {@link GaxiosResponse} with Gaxios-added properties
       */
      fetch(...args) {
        const input = args[0];
        const init = args[1];
        let url = void 0;
        const headers = new Headers();
        if (typeof input === "string") {
          url = new URL(input);
        } else if (input instanceof URL) {
          url = input;
        } else if (input && input.url) {
          url = new URL(input.url);
        }
        if (input && typeof input === "object" && "headers" in input) {
          gaxios_1.Gaxios.mergeHeaders(headers, input.headers);
        }
        if (init) {
          gaxios_1.Gaxios.mergeHeaders(headers, new Headers(init.headers));
        }
        if (typeof input === "object" && !(input instanceof URL)) {
          return this.request({ ...init, ...input, headers, url });
        } else {
          return this.request({ ...init, headers, url });
        }
      }
      /**
       * Sets the auth credentials.
       */
      setCredentials(credentials) {
        this.credentials = credentials;
      }
      /**
       * Append additional headers, e.g., x-goog-user-project, shared across the
       * classes inheriting AuthClient. This method should be used by any method
       * that overrides getRequestMetadataAsync(), which is a shared helper for
       * setting request information in both gRPC and HTTP API calls.
       *
       * @param headers object to append additional headers to.
       */
      addSharedMetadataHeaders(headers) {
        if (!headers.has("x-goog-user-project") && // don't override a value the user sets.
        this.quotaProjectId) {
          headers.set("x-goog-user-project", this.quotaProjectId);
        }
        return headers;
      }
      /**
       * Adds the `x-goog-user-project` and `authorization` headers to the target Headers
       * object, if they exist on the source.
       *
       * @param target the headers to target
       * @param source the headers to source from
       * @returns the target headers
       */
      addUserProjectAndAuthHeaders(target, source) {
        const xGoogUserProject = source.get("x-goog-user-project");
        const authorizationHeader = source.get("authorization");
        if (xGoogUserProject) {
          target.set("x-goog-user-project", xGoogUserProject);
        }
        if (authorizationHeader) {
          target.set("authorization", authorizationHeader);
        }
        return target;
      }
      static log = (0, google_logging_utils_1.log)("auth");
      static DEFAULT_REQUEST_INTERCEPTOR = {
        resolved: async (config) => {
          if (!config.headers.has("x-goog-api-client")) {
            const nodeVersion = process.version.replace(/^v/, "");
            config.headers.set("x-goog-api-client", `gl-node/${nodeVersion}`);
          }
          const userAgent = config.headers.get("User-Agent");
          if (!userAgent) {
            config.headers.set("User-Agent", shared_cjs_1.USER_AGENT);
          } else if (!userAgent.includes(`${shared_cjs_1.PRODUCT_NAME}/`)) {
            config.headers.set("User-Agent", `${userAgent} ${shared_cjs_1.USER_AGENT}`);
          }
          try {
            const symbols = config;
            const methodName = symbols[_AuthClient.RequestMethodNameSymbol];
            const logId = `${Math.floor(Math.random() * 1e3)}`;
            symbols[_AuthClient.RequestLogIdSymbol] = logId;
            const logObject = {
              url: config.url,
              headers: config.headers
            };
            if (methodName) {
              _AuthClient.log.info("%s [%s] request %j", methodName, logId, logObject);
            } else {
              _AuthClient.log.info("[%s] request %j", logId, logObject);
            }
          } catch (e2) {
          }
          return config;
        }
      };
      static DEFAULT_RESPONSE_INTERCEPTOR = {
        resolved: async (response) => {
          try {
            const symbols = response.config;
            const methodName = symbols[_AuthClient.RequestMethodNameSymbol];
            const logId = symbols[_AuthClient.RequestLogIdSymbol];
            if (methodName) {
              _AuthClient.log.info("%s [%s] response %j", methodName, logId, response.data);
            } else {
              _AuthClient.log.info("[%s] response %j", logId, response.data);
            }
          } catch (e2) {
          }
          return response;
        },
        rejected: async (error) => {
          try {
            const symbols = error.config;
            const methodName = symbols[_AuthClient.RequestMethodNameSymbol];
            const logId = symbols[_AuthClient.RequestLogIdSymbol];
            if (methodName) {
              _AuthClient.log.info("%s [%s] error %j", methodName, logId, error.response?.data);
            } else {
              _AuthClient.log.error("[%s] error %j", logId, error.response?.data);
            }
          } catch (e2) {
          }
          throw error;
        }
      };
      /**
       * Sets the method name that is making a Gaxios request, so that logging may tag
       * log lines with the operation.
       * @param config A Gaxios request config
       * @param methodName The method name making the call
       */
      static setMethodName(config, methodName) {
        try {
          const symbols = config;
          symbols[_AuthClient.RequestMethodNameSymbol] = methodName;
        } catch (e2) {
        }
      }
      /**
       * Retry config for Auth-related requests.
       *
       * @remarks
       *
       * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
       * config as some downstream APIs would prefer if customers explicitly enable retries,
       * such as GCS.
       */
      static get RETRY_CONFIG() {
        return {
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
          }
        };
      }
    };
    exports.AuthClient = AuthClient;
  }
});

// node_modules/google-auth-library/build/src/auth/loginticket.js
var require_loginticket = __commonJS({
  "node_modules/google-auth-library/build/src/auth/loginticket.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoginTicket = void 0;
    var LoginTicket = class {
      envelope;
      payload;
      /**
       * Create a simple class to extract user ID from an ID Token
       *
       * @param {string} env Envelope of the jwt
       * @param {TokenPayload} pay Payload of the jwt
       * @constructor
       */
      constructor(env, pay) {
        this.envelope = env;
        this.payload = pay;
      }
      getEnvelope() {
        return this.envelope;
      }
      getPayload() {
        return this.payload;
      }
      /**
       * Create a simple class to extract user ID from an ID Token
       *
       * @return The user ID
       */
      getUserId() {
        const payload = this.getPayload();
        if (payload && payload.sub) {
          return payload.sub;
        }
        return null;
      }
      /**
       * Returns attributes from the login ticket.  This can contain
       * various information about the user session.
       *
       * @return The envelope and payload
       */
      getAttributes() {
        return { envelope: this.getEnvelope(), payload: this.getPayload() };
      }
    };
    exports.LoginTicket = LoginTicket;
  }
});

// node_modules/google-auth-library/build/src/auth/oauth2client.js
var require_oauth2client = __commonJS({
  "node_modules/google-auth-library/build/src/auth/oauth2client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OAuth2Client = exports.ClientAuthentication = exports.CertificateFormat = exports.CodeChallengeMethod = void 0;
    var gaxios_1 = require_src2();
    var querystring = __require("querystring");
    var stream = __require("stream");
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util_1 = require_util2();
    var crypto_1 = require_crypto3();
    var authclient_1 = require_authclient();
    var loginticket_1 = require_loginticket();
    var CodeChallengeMethod;
    (function(CodeChallengeMethod2) {
      CodeChallengeMethod2["Plain"] = "plain";
      CodeChallengeMethod2["S256"] = "S256";
    })(CodeChallengeMethod || (exports.CodeChallengeMethod = CodeChallengeMethod = {}));
    var CertificateFormat;
    (function(CertificateFormat2) {
      CertificateFormat2["PEM"] = "PEM";
      CertificateFormat2["JWK"] = "JWK";
    })(CertificateFormat || (exports.CertificateFormat = CertificateFormat = {}));
    var ClientAuthentication;
    (function(ClientAuthentication2) {
      ClientAuthentication2["ClientSecretPost"] = "ClientSecretPost";
      ClientAuthentication2["ClientSecretBasic"] = "ClientSecretBasic";
      ClientAuthentication2["None"] = "None";
    })(ClientAuthentication || (exports.ClientAuthentication = ClientAuthentication = {}));
    var OAuth2Client2 = class _OAuth2Client extends authclient_1.AuthClient {
      redirectUri;
      certificateCache = {};
      certificateExpiry = null;
      certificateCacheFormat = CertificateFormat.PEM;
      refreshTokenPromises = /* @__PURE__ */ new Map();
      endpoints;
      issuers;
      clientAuthentication;
      // TODO: refactor tests to make this private
      _clientId;
      // TODO: refactor tests to make this private
      _clientSecret;
      refreshHandler;
      /**
       * An OAuth2 Client for Google APIs.
       *
       * @param options The OAuth2 Client Options. Passing an `clientId` directly is **@DEPRECATED**.
       * @param clientSecret **@DEPRECATED**. Provide a {@link OAuth2ClientOptions `OAuth2ClientOptions`} object in the first parameter instead.
       * @param redirectUri **@DEPRECATED**. Provide a {@link OAuth2ClientOptions `OAuth2ClientOptions`} object in the first parameter instead.
       */
      constructor(options = {}, clientSecret, redirectUri) {
        super(typeof options === "object" ? options : {});
        if (typeof options !== "object") {
          options = {
            clientId: options,
            clientSecret,
            redirectUri
          };
        }
        this._clientId = options.clientId || options.client_id;
        this._clientSecret = options.clientSecret || options.client_secret;
        this.redirectUri = options.redirectUri || options.redirect_uris?.[0];
        this.endpoints = {
          tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
          oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          oauth2TokenUrl: "https://oauth2.googleapis.com/token",
          oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
          oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
          oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
          oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
          ...options.endpoints
        };
        this.clientAuthentication = options.clientAuthentication || ClientAuthentication.ClientSecretPost;
        this.issuers = options.issuers || [
          "accounts.google.com",
          "https://accounts.google.com",
          this.universeDomain
        ];
      }
      /**
       * @deprecated use instance's {@link OAuth2Client.endpoints}
       */
      static GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
      /**
       * Clock skew - five minutes in seconds
       */
      static CLOCK_SKEW_SECS_ = 300;
      /**
       * The default max Token Lifetime is one day in seconds
       */
      static DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400;
      /**
       * Generates URL for consent page landing.
       * @param opts Options.
       * @return URL to consent page.
       */
      generateAuthUrl(opts = {}) {
        if (opts.code_challenge_method && !opts.code_challenge) {
          throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
        }
        opts.response_type = opts.response_type || "code";
        opts.client_id = opts.client_id || this._clientId;
        opts.redirect_uri = opts.redirect_uri || this.redirectUri;
        if (Array.isArray(opts.scope)) {
          opts.scope = opts.scope.join(" ");
        }
        const rootUrl = this.endpoints.oauth2AuthBaseUrl.toString();
        return rootUrl + "?" + querystring.stringify(opts);
      }
      generateCodeVerifier() {
        throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.");
      }
      /**
       * Convenience method to automatically generate a code_verifier, and its
       * resulting SHA256. If used, this must be paired with a S256
       * code_challenge_method.
       *
       * For a full example see:
       * https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/oauth2-codeVerifier.js
       */
      async generateCodeVerifierAsync() {
        const crypto = (0, crypto_1.createCrypto)();
        const randomString = crypto.randomBytesBase64(96);
        const codeVerifier = randomString.replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-");
        const unencodedCodeChallenge = await crypto.sha256DigestBase64(codeVerifier);
        const codeChallenge = unencodedCodeChallenge.split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
        return { codeVerifier, codeChallenge };
      }
      getToken(codeOrOptions, callback) {
        const options = typeof codeOrOptions === "string" ? { code: codeOrOptions } : codeOrOptions;
        if (callback) {
          this.getTokenAsync(options).then((r2) => callback(null, r2.tokens, r2.res), (e2) => callback(e2, null, e2.response));
        } else {
          return this.getTokenAsync(options);
        }
      }
      async getTokenAsync(options) {
        const url = this.endpoints.oauth2TokenUrl.toString();
        const headers = new Headers();
        const values = {
          client_id: options.client_id || this._clientId,
          code_verifier: options.codeVerifier,
          code: options.code,
          grant_type: "authorization_code",
          redirect_uri: options.redirect_uri || this.redirectUri
        };
        if (this.clientAuthentication === ClientAuthentication.ClientSecretBasic) {
          const basic = Buffer.from(`${this._clientId}:${this._clientSecret}`);
          headers.set("authorization", `Basic ${basic.toString("base64")}`);
        }
        if (this.clientAuthentication === ClientAuthentication.ClientSecretPost) {
          values.client_secret = this._clientSecret;
        }
        const opts = {
          ..._OAuth2Client.RETRY_CONFIG,
          method: "POST",
          url,
          data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(values)),
          headers
        };
        authclient_1.AuthClient.setMethodName(opts, "getTokenAsync");
        const res = await this.transporter.request(opts);
        const tokens = res.data;
        if (res.data && res.data.expires_in) {
          tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
          delete tokens.expires_in;
        }
        this.emit("tokens", tokens);
        return { tokens, res };
      }
      /**
       * Refreshes the access token.
       * @param refresh_token Existing refresh token.
       * @private
       */
      async refreshToken(refreshToken) {
        if (!refreshToken) {
          return this.refreshTokenNoCache(refreshToken);
        }
        if (this.refreshTokenPromises.has(refreshToken)) {
          return this.refreshTokenPromises.get(refreshToken);
        }
        const p = this.refreshTokenNoCache(refreshToken).then((r2) => {
          this.refreshTokenPromises.delete(refreshToken);
          return r2;
        }, (e2) => {
          this.refreshTokenPromises.delete(refreshToken);
          throw e2;
        });
        this.refreshTokenPromises.set(refreshToken, p);
        return p;
      }
      async refreshTokenNoCache(refreshToken) {
        if (!refreshToken) {
          throw new Error("No refresh token is set.");
        }
        const url = this.endpoints.oauth2TokenUrl.toString();
        const data = {
          refresh_token: refreshToken,
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token"
        };
        let res;
        try {
          const opts = {
            ..._OAuth2Client.RETRY_CONFIG,
            method: "POST",
            url,
            data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(data))
          };
          authclient_1.AuthClient.setMethodName(opts, "refreshTokenNoCache");
          res = await this.transporter.request(opts);
        } catch (e2) {
          if (e2 instanceof gaxios_1.GaxiosError && e2.message === "invalid_grant" && e2.response?.data && /ReAuth/i.test(e2.response.data.error_description)) {
            e2.message = JSON.stringify(e2.response.data);
          }
          throw e2;
        }
        const tokens = res.data;
        if (res.data && res.data.expires_in) {
          tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
          delete tokens.expires_in;
        }
        this.emit("tokens", tokens);
        return { tokens, res };
      }
      refreshAccessToken(callback) {
        if (callback) {
          this.refreshAccessTokenAsync().then((r2) => callback(null, r2.credentials, r2.res), callback);
        } else {
          return this.refreshAccessTokenAsync();
        }
      }
      async refreshAccessTokenAsync() {
        const r2 = await this.refreshToken(this.credentials.refresh_token);
        const tokens = r2.tokens;
        tokens.refresh_token = this.credentials.refresh_token;
        this.credentials = tokens;
        return { credentials: this.credentials, res: r2.res };
      }
      getAccessToken(callback) {
        if (callback) {
          this.getAccessTokenAsync().then((r2) => callback(null, r2.token, r2.res), callback);
        } else {
          return this.getAccessTokenAsync();
        }
      }
      async getAccessTokenAsync() {
        const shouldRefresh = !this.credentials.access_token || this.isTokenExpiring();
        if (shouldRefresh) {
          if (!this.credentials.refresh_token) {
            if (this.refreshHandler) {
              const refreshedAccessToken = await this.processAndValidateRefreshHandler();
              if (refreshedAccessToken?.access_token) {
                this.setCredentials(refreshedAccessToken);
                return { token: this.credentials.access_token };
              }
            } else {
              throw new Error("No refresh token or refresh handler callback is set.");
            }
          }
          const r2 = await this.refreshAccessTokenAsync();
          if (!r2.credentials || r2.credentials && !r2.credentials.access_token) {
            throw new Error("Could not refresh access token.");
          }
          return { token: r2.credentials.access_token, res: r2.res };
        } else {
          return { token: this.credentials.access_token };
        }
      }
      /**
       * The main authentication interface.  It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * In OAuth2Client, the result has the form:
       * { authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders(url) {
        const headers = (await this.getRequestMetadataAsync(url)).headers;
        return headers;
      }
      async getRequestMetadataAsync(url) {
        url;
        const thisCreds = this.credentials;
        if (!thisCreds.access_token && !thisCreds.refresh_token && !this.apiKey && !this.refreshHandler) {
          throw new Error("No access, refresh token, API key or refresh handler callback is set.");
        }
        if (thisCreds.access_token && !this.isTokenExpiring()) {
          thisCreds.token_type = thisCreds.token_type || "Bearer";
          const headers2 = new Headers({
            authorization: thisCreds.token_type + " " + thisCreds.access_token
          });
          return { headers: this.addSharedMetadataHeaders(headers2) };
        }
        if (this.refreshHandler) {
          const refreshedAccessToken = await this.processAndValidateRefreshHandler();
          if (refreshedAccessToken?.access_token) {
            this.setCredentials(refreshedAccessToken);
            const headers2 = new Headers({
              authorization: "Bearer " + this.credentials.access_token
            });
            return { headers: this.addSharedMetadataHeaders(headers2) };
          }
        }
        if (this.apiKey) {
          return { headers: new Headers({ "X-Goog-Api-Key": this.apiKey }) };
        }
        let r2 = null;
        let tokens = null;
        try {
          r2 = await this.refreshToken(thisCreds.refresh_token);
          tokens = r2.tokens;
        } catch (err) {
          const e2 = err;
          if (e2.response && (e2.response.status === 403 || e2.response.status === 404)) {
            e2.message = `Could not refresh access token: ${e2.message}`;
          }
          throw e2;
        }
        const credentials = this.credentials;
        credentials.token_type = credentials.token_type || "Bearer";
        tokens.refresh_token = credentials.refresh_token;
        this.credentials = tokens;
        const headers = new Headers({
          authorization: credentials.token_type + " " + tokens.access_token
        });
        return { headers: this.addSharedMetadataHeaders(headers), res: r2.res };
      }
      /**
       * Generates an URL to revoke the given token.
       * @param token The existing token to be revoked.
       *
       * @deprecated use instance method {@link OAuth2Client.getRevokeTokenURL}
       */
      static getRevokeTokenUrl(token) {
        return new _OAuth2Client().getRevokeTokenURL(token).toString();
      }
      /**
       * Generates a URL to revoke the given token.
       *
       * @param token The existing token to be revoked.
       */
      getRevokeTokenURL(token) {
        const url = new URL(this.endpoints.oauth2RevokeUrl);
        url.searchParams.append("token", token);
        return url;
      }
      revokeToken(token, callback) {
        const opts = {
          ..._OAuth2Client.RETRY_CONFIG,
          url: this.getRevokeTokenURL(token).toString(),
          method: "POST"
        };
        authclient_1.AuthClient.setMethodName(opts, "revokeToken");
        if (callback) {
          this.transporter.request(opts).then((r2) => callback(null, r2), callback);
        } else {
          return this.transporter.request(opts);
        }
      }
      revokeCredentials(callback) {
        if (callback) {
          this.revokeCredentialsAsync().then((res) => callback(null, res), callback);
        } else {
          return this.revokeCredentialsAsync();
        }
      }
      async revokeCredentialsAsync() {
        const token = this.credentials.access_token;
        this.credentials = {};
        if (token) {
          return this.revokeToken(token);
        } else {
          throw new Error("No access token to revoke.");
        }
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r2) => callback(null, r2), (e2) => {
            return callback(e2, e2.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      async requestAsync(opts, reAuthRetried = false) {
        try {
          const r2 = await this.getRequestMetadataAsync();
          opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
          this.addUserProjectAndAuthHeaders(opts.headers, r2.headers);
          if (this.apiKey) {
            opts.headers.set("X-Goog-Api-Key", this.apiKey);
          }
          return await this.transporter.request(opts);
        } catch (e2) {
          const res = e2.response;
          if (res) {
            const statusCode = res.status;
            const mayRequireRefresh = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure);
            const mayRequireRefreshWithNoRefreshToken = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefresh) {
              await this.refreshAccessTokenAsync();
              return this.requestAsync(opts, true);
            } else if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefreshWithNoRefreshToken) {
              const refreshedAccessToken = await this.processAndValidateRefreshHandler();
              if (refreshedAccessToken?.access_token) {
                this.setCredentials(refreshedAccessToken);
              }
              return this.requestAsync(opts, true);
            }
          }
          throw e2;
        }
      }
      verifyIdToken(options, callback) {
        if (callback && typeof callback !== "function") {
          throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
        }
        if (callback) {
          this.verifyIdTokenAsync(options).then((r2) => callback(null, r2), callback);
        } else {
          return this.verifyIdTokenAsync(options);
        }
      }
      async verifyIdTokenAsync(options) {
        if (!options.idToken) {
          throw new Error("The verifyIdToken method requires an ID Token");
        }
        const response = await this.getFederatedSignonCertsAsync();
        const login = await this.verifySignedJwtWithCertsAsync(options.idToken, response.certs, options.audience, this.issuers, options.maxExpiry);
        return login;
      }
      /**
       * Obtains information about the provisioned access token.  Especially useful
       * if you want to check the scopes that were provisioned to a given token.
       *
       * @param accessToken Required.  The Access Token for which you want to get
       * user info.
       */
      async getTokenInfo(accessToken) {
        const { data } = await this.transporter.request({
          ..._OAuth2Client.RETRY_CONFIG,
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            authorization: `Bearer ${accessToken}`
          },
          url: this.endpoints.tokenInfoUrl.toString()
        });
        const info = Object.assign({
          expiry_date: (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3,
          scopes: data.scope.split(" ")
        }, data);
        delete info.expires_in;
        delete info.scope;
        return info;
      }
      getFederatedSignonCerts(callback) {
        if (callback) {
          this.getFederatedSignonCertsAsync().then((r2) => callback(null, r2.certs, r2.res), callback);
        } else {
          return this.getFederatedSignonCertsAsync();
        }
      }
      async getFederatedSignonCertsAsync() {
        const nowTime = (/* @__PURE__ */ new Date()).getTime();
        const format = (0, crypto_1.hasBrowserCrypto)() ? CertificateFormat.JWK : CertificateFormat.PEM;
        if (this.certificateExpiry && nowTime < this.certificateExpiry.getTime() && this.certificateCacheFormat === format) {
          return { certs: this.certificateCache, format };
        }
        let res;
        let url;
        switch (format) {
          case CertificateFormat.PEM:
            url = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
            break;
          case CertificateFormat.JWK:
            url = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
            break;
          default:
            throw new Error(`Unsupported certificate format ${format}`);
        }
        try {
          const opts = {
            ..._OAuth2Client.RETRY_CONFIG,
            url
          };
          authclient_1.AuthClient.setMethodName(opts, "getFederatedSignonCertsAsync");
          res = await this.transporter.request(opts);
        } catch (e2) {
          if (e2 instanceof Error) {
            e2.message = `Failed to retrieve verification certificates: ${e2.message}`;
          }
          throw e2;
        }
        const cacheControl = res?.headers.get("cache-control");
        let cacheAge = -1;
        if (cacheControl) {
          const maxAge = /max-age=(?<maxAge>[0-9]+)/.exec(cacheControl)?.groups?.maxAge;
          if (maxAge) {
            cacheAge = Number(maxAge) * 1e3;
          }
        }
        let certificates = {};
        switch (format) {
          case CertificateFormat.PEM:
            certificates = res.data;
            break;
          case CertificateFormat.JWK:
            for (const key of res.data.keys) {
              certificates[key.kid] = key;
            }
            break;
          default:
            throw new Error(`Unsupported certificate format ${format}`);
        }
        const now = /* @__PURE__ */ new Date();
        this.certificateExpiry = cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
        this.certificateCache = certificates;
        this.certificateCacheFormat = format;
        return { certs: certificates, format, res };
      }
      getIapPublicKeys(callback) {
        if (callback) {
          this.getIapPublicKeysAsync().then((r2) => callback(null, r2.pubkeys, r2.res), callback);
        } else {
          return this.getIapPublicKeysAsync();
        }
      }
      async getIapPublicKeysAsync() {
        let res;
        const url = this.endpoints.oauth2IapPublicKeyUrl.toString();
        try {
          const opts = {
            ..._OAuth2Client.RETRY_CONFIG,
            url
          };
          authclient_1.AuthClient.setMethodName(opts, "getIapPublicKeysAsync");
          res = await this.transporter.request(opts);
        } catch (e2) {
          if (e2 instanceof Error) {
            e2.message = `Failed to retrieve verification certificates: ${e2.message}`;
          }
          throw e2;
        }
        return { pubkeys: res.data, res };
      }
      verifySignedJwtWithCerts() {
        throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.");
      }
      /**
       * Verify the id token is signed with the correct certificate
       * and is from the correct audience.
       * @param jwt The jwt to verify (The ID Token in this case).
       * @param certs The array of certs to test the jwt against.
       * @param requiredAudience The audience to test the jwt against.
       * @param issuers The allowed issuers of the jwt (Optional).
       * @param maxExpiry The max expiry the certificate can be (Optional).
       * @return Returns a promise resolving to LoginTicket on verification.
       */
      async verifySignedJwtWithCertsAsync(jwt, certs, requiredAudience, issuers, maxExpiry) {
        const crypto = (0, crypto_1.createCrypto)();
        if (!maxExpiry) {
          maxExpiry = _OAuth2Client.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
        }
        const segments = jwt.split(".");
        if (segments.length !== 3) {
          throw new Error("Wrong number of segments in token: " + jwt);
        }
        const signed = segments[0] + "." + segments[1];
        let signature = segments[2];
        let envelope;
        let payload;
        try {
          envelope = JSON.parse(crypto.decodeBase64StringUtf8(segments[0]));
        } catch (err) {
          if (err instanceof Error) {
            err.message = `Can't parse token envelope: ${segments[0]}': ${err.message}`;
          }
          throw err;
        }
        if (!envelope) {
          throw new Error("Can't parse token envelope: " + segments[0]);
        }
        try {
          payload = JSON.parse(crypto.decodeBase64StringUtf8(segments[1]));
        } catch (err) {
          if (err instanceof Error) {
            err.message = `Can't parse token payload '${segments[0]}`;
          }
          throw err;
        }
        if (!payload) {
          throw new Error("Can't parse token payload: " + segments[1]);
        }
        if (!Object.prototype.hasOwnProperty.call(certs, envelope.kid)) {
          throw new Error("No pem found for envelope: " + JSON.stringify(envelope));
        }
        const cert = certs[envelope.kid];
        if (envelope.alg === "ES256") {
          signature = formatEcdsa.joseToDer(signature, "ES256").toString("base64");
        }
        const verified = await crypto.verify(cert, signed, signature);
        if (!verified) {
          throw new Error("Invalid token signature: " + jwt);
        }
        if (!payload.iat) {
          throw new Error("No issue time in token: " + JSON.stringify(payload));
        }
        if (!payload.exp) {
          throw new Error("No expiration time in token: " + JSON.stringify(payload));
        }
        const iat = Number(payload.iat);
        if (isNaN(iat))
          throw new Error("iat field using invalid format");
        const exp = Number(payload.exp);
        if (isNaN(exp))
          throw new Error("exp field using invalid format");
        const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
        if (exp >= now + maxExpiry) {
          throw new Error("Expiration time too far in future: " + JSON.stringify(payload));
        }
        const earliest = iat - _OAuth2Client.CLOCK_SKEW_SECS_;
        const latest = exp + _OAuth2Client.CLOCK_SKEW_SECS_;
        if (now < earliest) {
          throw new Error("Token used too early, " + now + " < " + earliest + ": " + JSON.stringify(payload));
        }
        if (now > latest) {
          throw new Error("Token used too late, " + now + " > " + latest + ": " + JSON.stringify(payload));
        }
        if (issuers && issuers.indexOf(payload.iss) < 0) {
          throw new Error("Invalid issuer, expected one of [" + issuers + "], but got " + payload.iss);
        }
        if (typeof requiredAudience !== "undefined" && requiredAudience !== null) {
          const aud = payload.aud;
          let audVerified = false;
          if (requiredAudience.constructor === Array) {
            audVerified = requiredAudience.indexOf(aud) > -1;
          } else {
            audVerified = aud === requiredAudience;
          }
          if (!audVerified) {
            throw new Error("Wrong recipient, payload audience != requiredAudience");
          }
        }
        return new loginticket_1.LoginTicket(envelope, payload);
      }
      /**
       * Returns a promise that resolves with AccessTokenResponse type if
       * refreshHandler is defined.
       * If not, nothing is returned.
       */
      async processAndValidateRefreshHandler() {
        if (this.refreshHandler) {
          const accessTokenResponse = await this.refreshHandler();
          if (!accessTokenResponse.access_token) {
            throw new Error("No access token is returned by the refreshHandler callback.");
          }
          return accessTokenResponse;
        }
        return;
      }
      /**
       * Returns true if a token is expired or will expire within
       * eagerRefreshThresholdMillismilliseconds.
       * If there is no expiry time, assumes the token is not expired or expiring.
       */
      isTokenExpiring() {
        const expiryDate = this.credentials.expiry_date;
        return expiryDate ? expiryDate <= (/* @__PURE__ */ new Date()).getTime() + this.eagerRefreshThresholdMillis : false;
      }
    };
    exports.OAuth2Client = OAuth2Client2;
  }
});

// node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/apiIndex.js
var require_apiIndex = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/apiIndex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAPI = getAPI2;
    function getAPI2(api, options, versions5, context) {
      let version;
      if (typeof options === "string") {
        version = options;
        options = {};
      } else if (typeof options === "object") {
        version = options.version;
        delete options.version;
      } else {
        throw new Error("Argument error: Accepts only string or object");
      }
      try {
        const ctr = versions5[version];
        const ep = new ctr(options, context);
        return Object.freeze(ep);
      } catch (e2) {
        throw new Error(`Unable to load endpoint ${api}("${version}"): ${e2.message}`);
      }
    }
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/package.json
var require_package3 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/package.json"(exports, module) {
    module.exports = {
      name: "gaxios",
      version: "7.1.3",
      description: "A simple common HTTP client specifically for Google APIs and services.",
      main: "build/cjs/src/index.js",
      types: "build/cjs/src/index.d.ts",
      files: [
        "build/"
      ],
      exports: {
        ".": {
          import: {
            types: "./build/esm/src/index.d.ts",
            default: "./build/esm/src/index.js"
          },
          require: {
            types: "./build/cjs/src/index.d.ts",
            default: "./build/cjs/src/index.js"
          }
        }
      },
      scripts: {
        lint: "gts check --no-inline-config",
        test: "c8 mocha build/esm/test",
        "presystem-test": "npm run compile",
        "system-test": "mocha build/esm/system-test --timeout 80000",
        compile: "tsc -b ./tsconfig.json ./tsconfig.cjs.json && node utils/enable-esm.mjs",
        fix: "gts fix",
        prepare: "npm run compile",
        pretest: "npm run compile",
        webpack: "webpack",
        "prebrowser-test": "npm run compile",
        "browser-test": "node build/browser-test/browser-test-runner.js",
        docs: "jsdoc -c .jsdoc.js",
        "docs-test": "linkinator docs",
        "predocs-test": "npm run docs",
        "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
        prelint: "cd samples; npm link ../; npm install",
        clean: "gts clean"
      },
      repository: {
        type: "git",
        directory: "packages/gaxios",
        url: "https://github.com/googleapis/google-cloud-node-core.git"
      },
      keywords: [
        "google"
      ],
      engines: {
        node: ">=18"
      },
      author: "Google, LLC",
      license: "Apache-2.0",
      devDependencies: {
        "@babel/plugin-proposal-private-methods": "^7.18.6",
        "@types/cors": "^2.8.6",
        "@types/express": "^5.0.0",
        "@types/extend": "^3.0.1",
        "@types/mocha": "^10.0.10",
        "@types/multiparty": "4.2.1",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.1",
        "@types/node": "^22.0.0",
        "@types/sinon": "^17.0.0",
        "@types/tmp": "0.2.6",
        assert: "^2.0.0",
        browserify: "^17.0.0",
        c8: "^10.0.0",
        cors: "^2.8.5",
        express: "^5.0.0",
        gts: "^6.0.0",
        "is-docker": "^3.0.0",
        jsdoc: "^4.0.0",
        "jsdoc-fresh": "^5.0.0",
        "jsdoc-region-tag": "^4.0.0",
        karma: "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-remap-coverage": "^0.1.5",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "^5.0.1",
        linkinator: "^6.1.2",
        mocha: "^11.1.0",
        multiparty: "^4.2.1",
        mv: "^2.1.1",
        ncp: "^2.0.0",
        nock: "^14.0.0-beta.13",
        "null-loader": "^4.0.0",
        "pack-n-play": "^4.0.0",
        puppeteer: "^24.0.0",
        sinon: "^21.0.0",
        "stream-browserify": "^3.0.0",
        tmp: "0.2.5",
        "ts-loader": "^9.5.2",
        typescript: "^5.8.3",
        webpack: "^5.35.0",
        "webpack-cli": "^6.0.1"
      },
      dependencies: {
        extend: "^3.0.2",
        "https-proxy-agent": "^7.0.1",
        "node-fetch": "^3.3.2",
        rimraf: "^5.0.1"
      },
      homepage: "https://github.com/googleapis/google-cloud-node-core/tree/main/packages/gaxios"
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/util.cjs
var require_util3 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/util.cjs"(exports, module) {
    "use strict";
    var pkg = require_package3();
    module.exports = { pkg };
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/common.js
var require_common3 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/common.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    var extend_1 = __importDefault(require_extend());
    var util_cjs_1 = __importDefault(require_util3());
    var pkg = util_cjs_1.default.pkg;
    exports.GAXIOS_ERROR_SYMBOL = Symbol.for(`${pkg.name}-gaxios-error`);
    var GaxiosError = class _GaxiosError extends Error {
      config;
      response;
      /**
       * An error code.
       * Can be a system error code, DOMException error name, or any error's 'code' property where it is a `string`.
       *
       * It is only a `number` when the cause is sourced from an API-level error (AIP-193).
       *
       * @see {@link https://nodejs.org/api/errors.html#errorcode error.code}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names DOMException#error_names}
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @example
       * 'ECONNRESET'
       *
       * @example
       * 'TimeoutError'
       *
       * @example
       * 500
       */
      code;
      /**
       * An HTTP Status code.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/status Response#status}
       *
       * @example
       * 500
       */
      status;
      /**
       * @deprecated use {@link GaxiosError.cause} instead.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause Error#cause}
       *
       * @privateRemarks
       *
       * We will want to remove this property later as the modern `cause` property is better suited
       * for displaying and relaying nested errors. Keeping this here makes the resulting
       * error log larger than it needs to be.
       *
       */
      error;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[Symbol.hasInstance]}
       * @see {@link https://github.com/microsoft/TypeScript/issues/13965#issuecomment-278570200}
       * @see {@link https://stackoverflow.com/questions/46618852/require-and-instanceof}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/@@hasInstance#reverting_to_default_instanceof_behavior}
       */
      [exports.GAXIOS_ERROR_SYMBOL] = pkg.version;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [Symbol.hasInstance](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(_GaxiosError, instance);
      }
      constructor(message, config, response, cause) {
        super(message, { cause });
        this.config = config;
        this.response = response;
        this.error = cause instanceof Error ? cause : void 0;
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(
              this.config.responseType,
              // workaround for `node-fetch`'s `.data` deprecation...
              this.response?.bodyUsed ? this.response?.data : void 0
            );
          } catch {
          }
          this.status = this.response.status;
        }
        if (cause instanceof DOMException) {
          this.code = cause.name;
        } else if (cause && typeof cause === "object" && "code" in cause && (typeof cause.code === "string" || typeof cause.code === "number")) {
          this.code = cause.code;
        }
      }
      /**
       * An AIP-193 conforming error extractor.
       *
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @internal
       * @expiremental
       *
       * @param res the response object
       * @returns the extracted error information
       */
      static extractAPIErrorFromResponse(res, defaultErrorMessage = "The request failed") {
        let message = defaultErrorMessage;
        if (typeof res.data === "string") {
          message = res.data;
        }
        if (res.data && typeof res.data === "object" && "error" in res.data && res.data.error && !res.ok) {
          if (typeof res.data.error === "string") {
            return {
              message: res.data.error,
              code: res.status,
              status: res.statusText
            };
          }
          if (typeof res.data.error === "object") {
            message = "message" in res.data.error && typeof res.data.error.message === "string" ? res.data.error.message : message;
            const status = "status" in res.data.error && typeof res.data.error.status === "string" ? res.data.error.status : res.statusText;
            const code = "code" in res.data.error && typeof res.data.error.code === "number" ? res.data.error.code : res.status;
            if ("errors" in res.data.error && Array.isArray(res.data.error.errors)) {
              const errorMessages = [];
              for (const e2 of res.data.error.errors) {
                if (typeof e2 === "object" && "message" in e2 && typeof e2.message === "string") {
                  errorMessages.push(e2.message);
                }
              }
              return Object.assign({
                message: errorMessages.join("\n") || message,
                code,
                status
              }, res.data.error);
            }
            return Object.assign({
              message,
              code,
              status
            }, res.data.error);
          }
        }
        return {
          message,
          code: res.status,
          status: res.statusText
        };
      }
    };
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        headers.forEach((_, key) => {
          if (/^authentication$/i.test(key) || /^authorization$/i.test(key) || /secret/i.test(key))
            headers.set(key, REDACT);
        });
      }
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      function redactObject(obj) {
        if (!obj || typeof obj !== "object") {
          return;
        } else if (obj instanceof FormData || obj instanceof URLSearchParams || // support `node-fetch` FormData/URLSearchParams
        "forEach" in obj && "set" in obj) {
          obj.forEach((_, key) => {
            if (["grant_type", "assertion"].includes(key) || /secret/.test(key)) {
              obj.set(key, REDACT);
            }
          });
        } else {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        if (data.config.url.searchParams.has("token")) {
          data.config.url.searchParams.set("token", REDACT);
        }
        if (data.config.url.searchParams.has("client_secret")) {
          data.config.url.searchParams.set("client_secret", REDACT);
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        if (data.response.bodyUsed) {
          redactString(data.response, "data");
          redactObject(data.response.data);
        }
      }
      return data;
    }
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/retry.js
var require_retry2 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/retry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRetryConfig = getRetryConfig;
    async function getRetryConfig(err) {
      let config = getConfig(err);
      if (!err || !err.config || !config && !err.config.retry) {
        return { shouldRetry: false };
      }
      config = config || {};
      config.currentRetryAttempt = config.currentRetryAttempt || 0;
      config.retry = config.retry === void 0 || config.retry === null ? 3 : config.retry;
      config.httpMethodsToRetry = config.httpMethodsToRetry || [
        "GET",
        "HEAD",
        "PUT",
        "OPTIONS",
        "DELETE"
      ];
      config.noResponseRetries = config.noResponseRetries === void 0 || config.noResponseRetries === null ? 2 : config.noResponseRetries;
      config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
      config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
      config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
      config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
      const retryRanges = [
        // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        // 1xx - Retry (Informational, request still processing)
        // 2xx - Do not retry (Success)
        // 3xx - Do not retry (Redirect)
        // 4xx - Do not retry (Client errors)
        // 408 - Retry ("Request Timeout")
        // 429 - Retry ("Too Many Requests")
        // 5xx - Retry (Server errors)
        [100, 199],
        [408, 408],
        [429, 429],
        [500, 599]
      ];
      config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
      err.config.retryConfig = config;
      const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
      if (!await shouldRetryFn(err)) {
        return { shouldRetry: false, config: err.config };
      }
      const delay = getNextRetryDelay(config);
      err.config.retryConfig.currentRetryAttempt += 1;
      const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve2) => {
        setTimeout(resolve2, delay);
      });
      if (config.onRetryAttempt) {
        await config.onRetryAttempt(err);
      }
      await backoff;
      return { shouldRetry: true, config: err.config };
    }
    function shouldRetryRequest(err) {
      const config = getConfig(err);
      if (err.config.signal?.aborted && err.code !== "TimeoutError" || err.code === "AbortError") {
        return false;
      }
      if (!config || config.retry === 0) {
        return false;
      }
      if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
        return false;
      }
      if (!config.httpMethodsToRetry || !config.httpMethodsToRetry.includes(err.config.method?.toUpperCase() || "GET")) {
        return false;
      }
      if (err.response && err.response.status) {
        let isInRange = false;
        for (const [min, max] of config.statusCodesToRetry) {
          const status = err.response.status;
          if (status >= min && status <= max) {
            isInRange = true;
            break;
          }
        }
        if (!isInRange) {
          return false;
        }
      }
      config.currentRetryAttempt = config.currentRetryAttempt || 0;
      if (config.currentRetryAttempt >= config.retry) {
        return false;
      }
      return true;
    }
    function getConfig(err) {
      if (err && err.config && err.config.retryConfig) {
        return err.config.retryConfig;
      }
      return;
    }
    function getNextRetryDelay(config) {
      const retryDelay = config.currentRetryAttempt ? 0 : config.retryDelay ?? 100;
      const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1e3;
      const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
      return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
    }
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/interceptor.js
var require_interceptor2 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/interceptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosInterceptorManager = void 0;
    var GaxiosInterceptorManager = class extends Set {
    };
    exports.GaxiosInterceptorManager = GaxiosInterceptorManager;
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/errors/base.js
var FetchBaseError2;
var init_base2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError2 = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/errors/fetch-error.js
var FetchError2;
var init_fetch_error2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base2();
    FetchError2 = class extends FetchBaseError2 {
      /**
       * @param  {string} message -      Error message for human
       * @param  {string} [type] -        Error type for machine
       * @param  {SystemError} [systemError] - For Node.js system error
       */
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/is.js
var NAME2, isURLSearchParameters2, isBlob2, isAbortSignal2, isDomainOrSubdomain2, isSameProtocol2;
var init_is2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/is.js"() {
    NAME2 = Symbol.toStringTag;
    isURLSearchParameters2 = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME2] === "URLSearchParams";
    };
    isBlob2 = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME2]);
    };
    isAbortSignal2 = (object) => {
      return typeof object === "object" && (object[NAME2] === "AbortSignal" || object[NAME2] === "EventTarget");
    };
    isDomainOrSubdomain2 = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    isSameProtocol2 = (destination, original) => {
      const orig = new URL(original).protocol;
      const dest = new URL(destination).protocol;
      return orig === dest;
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports2 = {};
__export(multipart_parser_exports2, {
  toFormData: () => toFormData2
});
function _fileName2(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData2(Body3, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser2(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData2();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName2(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body3) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s2, S2, f3, F2, LF2, CR2, SPACE2, HYPHEN2, COLON2, A2, Z2, lower2, noop2, MultipartParser2;
var init_multipart_parser2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s2 = 0;
    S2 = {
      START_BOUNDARY: s2++,
      HEADER_FIELD_START: s2++,
      HEADER_FIELD: s2++,
      HEADER_VALUE_START: s2++,
      HEADER_VALUE: s2++,
      HEADER_VALUE_ALMOST_DONE: s2++,
      HEADERS_ALMOST_DONE: s2++,
      PART_DATA_START: s2++,
      PART_DATA: s2++,
      END: s2++
    };
    f3 = 1;
    F2 = {
      PART_BOUNDARY: f3,
      LAST_BOUNDARY: f3 *= 2
    };
    LF2 = 10;
    CR2 = 13;
    SPACE2 = 32;
    HYPHEN2 = 45;
    COLON2 = 58;
    A2 = 97;
    Z2 = 122;
    lower2 = (c) => c | 32;
    noop2 = () => {
    };
    MultipartParser2 = class {
      /**
       * @param {string} boundary
       */
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop2;
        this.onHeaderField = noop2;
        this.onHeadersEnd = noop2;
        this.onHeaderValue = noop2;
        this.onPartBegin = noop2;
        this.onPartData = noop2;
        this.onPartEnd = noop2;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S2.START_BOUNDARY;
      }
      /**
       * @param {Uint8Array} data
       */
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S2.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN2) {
                  flags |= F2.LAST_BOUNDARY;
                } else if (c !== CR2) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F2.LAST_BOUNDARY && c === HYPHEN2) {
                  state = S2.END;
                  flags = 0;
                } else if (!(flags & F2.LAST_BOUNDARY) && c === LF2) {
                  index = 0;
                  callback("onPartBegin");
                  state = S2.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S2.HEADER_FIELD_START:
              state = S2.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S2.HEADER_FIELD:
              if (c === CR2) {
                clear("onHeaderField");
                state = S2.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN2) {
                break;
              }
              if (c === COLON2) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S2.HEADER_VALUE_START;
                break;
              }
              cl = lower2(c);
              if (cl < A2 || cl > Z2) {
                return;
              }
              break;
            case S2.HEADER_VALUE_START:
              if (c === SPACE2) {
                break;
              }
              mark("onHeaderValue");
              state = S2.HEADER_VALUE;
            case S2.HEADER_VALUE:
              if (c === CR2) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S2.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S2.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF2) {
                return;
              }
              state = S2.HEADER_FIELD_START;
              break;
            case S2.HEADERS_ALMOST_DONE:
              if (c !== LF2) {
                return;
              }
              callback("onHeadersEnd");
              state = S2.PART_DATA_START;
              break;
            case S2.PART_DATA_START:
              state = S2.PART_DATA;
              mark("onPartData");
            case S2.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR2) {
                  flags |= F2.PART_BOUNDARY;
                } else if (c === HYPHEN2) {
                  flags |= F2.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F2.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF2) {
                    flags &= ~F2.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S2.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F2.LAST_BOUNDARY) {
                  if (c === HYPHEN2) {
                    callback("onPartEnd");
                    state = S2.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S2.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S2.HEADER_FIELD_START && this.index === 0 || this.state === S2.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S2.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/body.js
import Stream3, { PassThrough as PassThrough3 } from "node:stream";
import { types as types3, deprecate as deprecate3, promisify as promisify7 } from "node:util";
import { Buffer as Buffer5 } from "node:buffer";
async function consumeBody2(data) {
  if (data[INTERNALS4].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS4].disturbed = true;
  if (data[INTERNALS4].error) {
    throw data[INTERNALS4].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer5.alloc(0);
  }
  if (!(body instanceof Stream3)) {
    return Buffer5.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError2(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError2 ? error : new FetchError2(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer5.from(accum.join(""));
      }
      return Buffer5.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError2(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError2(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var pipeline2, INTERNALS4, Body2, clone2, getNonSpecFormDataBoundary2, extractContentType2, getTotalBytes2, writeToStream2;
var init_body2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/body.js"() {
    init_fetch_blob();
    init_esm_min();
    init_fetch_error2();
    init_base2();
    init_is2();
    pipeline2 = promisify7(Stream3.pipeline);
    INTERNALS4 = Symbol("Body internals");
    Body2 = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters2(body)) {
          body = Buffer5.from(body.toString());
        } else if (isBlob2(body)) {
        } else if (Buffer5.isBuffer(body)) {
        } else if (types3.isAnyArrayBuffer(body)) {
          body = Buffer5.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer5.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof Stream3) {
        } else if (body instanceof FormData2) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer5.from(String(body));
        }
        let stream = body;
        if (Buffer5.isBuffer(body)) {
          stream = Stream3.Readable.from(body);
        } else if (isBlob2(body)) {
          stream = Stream3.Readable.from(body.stream());
        }
        this[INTERNALS4] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof Stream3) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError2 ? error_ : new FetchError2(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS4].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS4].stream;
      }
      get bodyUsed() {
        return this[INTERNALS4].disturbed;
      }
      /**
       * Decode response as ArrayBuffer
       *
       * @return  Promise
       */
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody2(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData2();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData3 } = await Promise.resolve().then(() => (init_multipart_parser2(), multipart_parser_exports2));
        return toFormData3(this.body, ct);
      }
      /**
       * Return raw response as Blob
       *
       * @return Promise
       */
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS4].body && this[INTERNALS4].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default([buf], {
          type: ct
        });
      }
      /**
       * Decode response as json
       *
       * @return  Promise
       */
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      /**
       * Decode response as text
       *
       * @return  Promise
       */
      async text() {
        const buffer = await consumeBody2(this);
        return new TextDecoder().decode(buffer);
      }
      /**
       * Decode response as buffer (non-spec api)
       *
       * @return  Promise
       */
      buffer() {
        return consumeBody2(this);
      }
    };
    Body2.prototype.buffer = deprecate3(Body2.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body2.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: deprecate3(
        () => {
        },
        "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
        "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
      ) }
    });
    clone2 = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS4];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream3 && typeof body.getBoundary !== "function") {
        p1 = new PassThrough3({ highWaterMark });
        p2 = new PassThrough3({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS4].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary2 = deprecate3(
      (body) => body.getBoundary(),
      "form-data doesn't follow the spec and requires special treatment. Use alternative package",
      "https://github.com/node-fetch/node-fetch/issues/1167"
    );
    extractContentType2 = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters2(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob2(body)) {
        return body.type || null;
      }
      if (Buffer5.isBuffer(body) || types3.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData2) {
        return `multipart/form-data; boundary=${request[INTERNALS4].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary2(body)}`;
      }
      if (body instanceof Stream3) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes2 = (request) => {
      const { body } = request[INTERNALS4];
      if (body === null) {
        return 0;
      }
      if (isBlob2(body)) {
        return body.size;
      }
      if (Buffer5.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream2 = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline2(body, dest);
      }
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/headers.js
import { types as types4 } from "node:util";
import http3 from "node:http";
function fromRawHeaders2(headers = []) {
  return new Headers3(
    headers.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName2(name);
        validateHeaderValue2(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
var validateHeaderName2, validateHeaderValue2, Headers3;
var init_headers2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/headers.js"() {
    validateHeaderName2 = typeof http3.validateHeaderName === "function" ? http3.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue2 = typeof http3.validateHeaderValue === "function" ? http3.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers3 = class _Headers extends URLSearchParams {
      /**
       * Headers class
       *
       * @constructor
       * @param {HeadersInit} [init] - Response headers
       */
      constructor(init) {
        let result = [];
        if (init instanceof _Headers) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !types4.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || types4.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName2(name);
          validateHeaderValue2(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName2(name);
                  validateHeaderValue2(name, String(value));
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase(),
                    String(value)
                  );
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName2(name);
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase()
                  );
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      /**
       * @type {() => IterableIterator<[string, string]>}
       */
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * Node-fetch non-spec method
       * returning all headers and their values as array
       * @returns {Record<string, string[]>}
       */
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      /**
       * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
       */
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(
      Headers3.prototype,
      ["get", "entries", "forEach", "values"].reduce((result, property) => {
        result[property] = { enumerable: true };
        return result;
      }, {})
    );
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus2, isRedirect2;
var init_is_redirect2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect2 = (code) => {
      return redirectStatus2.has(code);
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/response.js
var INTERNALS5, Response2;
var init_response2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/response.js"() {
    init_headers2();
    init_body2();
    init_is_redirect2();
    INTERNALS5 = Symbol("Response internals");
    Response2 = class _Response extends Body2 {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers3(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType2(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS5] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS5].type;
      }
      get url() {
        return this[INTERNALS5].url || "";
      }
      get status() {
        return this[INTERNALS5].status;
      }
      /**
       * Convenience property representing if the request ended normally
       */
      get ok() {
        return this[INTERNALS5].status >= 200 && this[INTERNALS5].status < 300;
      }
      get redirected() {
        return this[INTERNALS5].counter > 0;
      }
      get statusText() {
        return this[INTERNALS5].statusText;
      }
      get headers() {
        return this[INTERNALS5].headers;
      }
      get highWaterMark() {
        return this[INTERNALS5].highWaterMark;
      }
      /**
       * Clone this response
       *
       * @return  Response
       */
      clone() {
        return new _Response(clone2(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      /**
       * @param {string} url    The URL that the new response is to originate from.
       * @param {number} status An optional status code for the response (e.g., 302.)
       * @returns {Response}    A Response object.
       */
      static redirect(url, status = 302) {
        if (!isRedirect2(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new _Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new _Response(null, { status: 0, statusText: "" });
        response[INTERNALS5].type = "error";
        return response;
      }
      static json(data = void 0, init = {}) {
        const body = JSON.stringify(data);
        if (body === void 0) {
          throw new TypeError("data is not JSON serializable");
        }
        const headers = new Headers3(init && init.headers);
        if (!headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
        return new _Response(body, {
          ...init,
          headers
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/get-search.js
var getSearch2;
var init_get_search2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch2 = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/referrer.js
import { isIP as isIP2 } from "node:net";
function stripURLForUseAsAReferrer2(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy2(referrerPolicy) {
  if (!ReferrerPolicy2.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy2(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP2(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy2(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy2(url);
}
function determineRequestsReferrer2(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer2(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer2(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy2(referrerURL) && !isUrlPotentiallyTrustworthy2(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy2(referrerURL) && !isUrlPotentiallyTrustworthy2(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy2(referrerURL) && !isUrlPotentiallyTrustworthy2(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader2(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy2.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var ReferrerPolicy2, DEFAULT_REFERRER_POLICY2;
var init_referrer2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/utils/referrer.js"() {
    ReferrerPolicy2 = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY2 = "strict-origin-when-cross-origin";
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/request.js
import { format as formatUrl2 } from "node:url";
import { deprecate as deprecate4 } from "node:util";
var INTERNALS6, isRequest2, doBadDataWarn2, Request2, getNodeRequestOptions2;
var init_request2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/request.js"() {
    init_headers2();
    init_body2();
    init_is2();
    init_get_search2();
    init_referrer2();
    INTERNALS6 = Symbol("Request internals");
    isRequest2 = (object) => {
      return typeof object === "object" && typeof object[INTERNALS6] === "object";
    };
    doBadDataWarn2 = deprecate4(
      () => {
      },
      ".data is not a valid RequestInit property, use .body instead",
      "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
    );
    Request2 = class _Request extends Body2 {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest2(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if (!isRequest2(init) && "data" in init) {
          doBadDataWarn2();
        }
        if ((init.body != null || isRequest2(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest2(input) && input.body !== null ? clone2(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers3(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType2(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest2(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal2(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS6] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      /** @returns {string} */
      get method() {
        return this[INTERNALS6].method;
      }
      /** @returns {string} */
      get url() {
        return formatUrl2(this[INTERNALS6].parsedURL);
      }
      /** @returns {Headers} */
      get headers() {
        return this[INTERNALS6].headers;
      }
      get redirect() {
        return this[INTERNALS6].redirect;
      }
      /** @returns {AbortSignal} */
      get signal() {
        return this[INTERNALS6].signal;
      }
      // https://fetch.spec.whatwg.org/#dom-request-referrer
      get referrer() {
        if (this[INTERNALS6].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS6].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS6].referrer) {
          return this[INTERNALS6].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS6].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS6].referrerPolicy = validateReferrerPolicy2(referrerPolicy);
      }
      /**
       * Clone this request
       *
       * @return  Request
       */
      clone() {
        return new _Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions2 = (request) => {
      const { parsedURL } = request[INTERNALS6];
      const headers = new Headers3(request[INTERNALS6].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes2(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY2;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS6].referrer = determineRequestsReferrer2(request);
      } else {
        request[INTERNALS6].referrer = "no-referrer";
      }
      if (request[INTERNALS6].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      const search = getSearch2(parsedURL);
      const options = {
        // Overwrite search to retain trailing ? (issue #776)
        path: parsedURL.pathname + search,
        // The following options are not expressed in the URL
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        /** @type {URL} */
        parsedURL,
        options
      };
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/errors/abort-error.js
var AbortError2;
var init_abort_error2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base2();
    AbortError2 = class extends FetchBaseError2 {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/node-fetch/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  AbortError: () => AbortError2,
  Blob: () => fetch_blob_default,
  FetchError: () => FetchError2,
  File: () => file_default,
  FormData: () => FormData2,
  Headers: () => Headers3,
  Request: () => Request2,
  Response: () => Response2,
  blobFrom: () => blobFrom,
  blobFromSync: () => blobFromSync,
  default: () => fetch2,
  fileFrom: () => fileFrom,
  fileFromSync: () => fileFromSync,
  isRedirect: () => isRedirect2
});
import http4 from "node:http";
import https2 from "node:https";
import zlib2 from "node:zlib";
import Stream4, { PassThrough as PassThrough4, pipeline as pump2 } from "node:stream";
import { Buffer as Buffer6 } from "node:buffer";
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions2(request);
    if (!supportedSchemas2.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https2 : http4).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError2("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream4.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError2(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding2(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders2(response_.rawHeaders);
      if (isRedirect2(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError2(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError2(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError2(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers3(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone2(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain2(request.url, locationURL) || !isSameProtocol2(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream4.Readable) {
              reject(new FetchError2("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader2(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pump2(response_, new PassThrough4(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: zlib2.Z_SYNC_FLUSH,
        finishFlush: zlib2.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pump2(body, zlib2.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pump2(response_, new PassThrough4(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pump2(body, zlib2.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pump2(body, zlib2.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response2(body, responseOptions);
            resolve2(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pump2(body, zlib2.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream2(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding2(request, errorCallback) {
  const LAST_CHUNK = Buffer6.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer6.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer6.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer6.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var supportedSchemas2;
var init_src2 = __esm({
  "node_modules/@googleapis/gmail/node_modules/node-fetch/src/index.js"() {
    init_dist();
    init_body2();
    init_response2();
    init_headers2();
    init_request2();
    init_fetch_error2();
    init_abort_error2();
    init_is_redirect2();
    init_esm_min();
    init_is2();
    init_referrer2();
    init_from();
    supportedSchemas2 = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/gaxios.js
var require_gaxios2 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/gaxios.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Gaxios = void 0;
    var extend_1 = __importDefault(require_extend());
    var https_1 = __require("https");
    var common_js_1 = require_common3();
    var retry_js_1 = require_retry2();
    var stream_1 = __require("stream");
    var interceptor_js_1 = require_interceptor2();
    var randomUUID = async () => globalThis.crypto?.randomUUID() || (await import("crypto")).randomUUID();
    var HTTP_STATUS_NO_CONTENT = 204;
    var Gaxios = class {
      agentCache = /* @__PURE__ */ new Map();
      /**
       * Default HTTP options that will be used for every HTTP request.
       */
      defaults;
      /**
       * Interceptors
       */
      interceptors;
      /**
       * The Gaxios class is responsible for making HTTP requests.
       * @param defaults The default set of options to be used for this instance.
       */
      constructor(defaults) {
        this.defaults = defaults || {};
        this.interceptors = {
          request: new interceptor_js_1.GaxiosInterceptorManager(),
          response: new interceptor_js_1.GaxiosInterceptorManager()
        };
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link Gaxios}.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const gaxios = new Gaxios();
       * const myFetch: typeof fetch = (...args) => gaxios.fetch(...args);
       * await myFetch('https://example.com');
       * ```
       *
       * @param args `fetch` API or `Gaxios#request` parameters
       * @returns the {@link Response} with Gaxios-added properties
       */
      fetch(...args) {
        const input = args[0];
        const init = args[1];
        let url = void 0;
        const headers = new Headers();
        if (typeof input === "string") {
          url = new URL(input);
        } else if (input instanceof URL) {
          url = input;
        } else if (input && input.url) {
          url = new URL(input.url);
        }
        if (input && typeof input === "object" && "headers" in input) {
          _a.mergeHeaders(headers, input.headers);
        }
        if (init) {
          _a.mergeHeaders(headers, new Headers(init.headers));
        }
        if (typeof input === "object" && !(input instanceof URL)) {
          return this.request({ ...init, ...input, headers, url });
        } else {
          return this.request({ ...init, headers, url });
        }
      }
      /**
       * Perform an HTTP request with the given options.
       * @param opts Set of HTTP options that will be used for this HTTP request.
       */
      async request(opts = {}) {
        let prepared = await this.#prepareRequest(opts);
        prepared = await this.#applyRequestInterceptors(prepared);
        return this.#applyResponseInterceptors(this._request(prepared));
      }
      async _defaultAdapter(config) {
        const fetchImpl = config.fetchImplementation || this.defaults.fetchImplementation || await _a.#getFetch();
        const preparedOpts = { ...config };
        delete preparedOpts.data;
        const res = await fetchImpl(config.url, preparedOpts);
        const data = await this.getResponseData(config, res);
        if (!Object.getOwnPropertyDescriptor(res, "data")?.configurable) {
          Object.defineProperties(res, {
            data: {
              configurable: true,
              writable: true,
              enumerable: true,
              value: data
            }
          });
        }
        return Object.assign(res, { config, data });
      }
      /**
       * Internal, retryable version of the `request` method.
       * @param opts Set of HTTP options that will be used for this HTTP request.
       */
      async _request(opts) {
        try {
          let translatedResponse;
          if (opts.adapter) {
            translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
          } else {
            translatedResponse = await this._defaultAdapter(opts);
          }
          if (!opts.validateStatus(translatedResponse.status)) {
            if (opts.responseType === "stream") {
              const response = [];
              for await (const chunk of translatedResponse.data) {
                response.push(chunk);
              }
              translatedResponse.data = response.toString();
            }
            const errorInfo = common_js_1.GaxiosError.extractAPIErrorFromResponse(translatedResponse, `Request failed with status code ${translatedResponse.status}`);
            throw new common_js_1.GaxiosError(errorInfo?.message, opts, translatedResponse, errorInfo);
          }
          return translatedResponse;
        } catch (e2) {
          let err;
          if (e2 instanceof common_js_1.GaxiosError) {
            err = e2;
          } else if (e2 instanceof Error) {
            err = new common_js_1.GaxiosError(e2.message, opts, void 0, e2);
          } else {
            err = new common_js_1.GaxiosError("Unexpected Gaxios Error", opts, void 0, e2);
          }
          const { shouldRetry, config } = await (0, retry_js_1.getRetryConfig)(err);
          if (shouldRetry && config) {
            err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
            opts.retryConfig = err.config?.retryConfig;
            this.#appendTimeoutToSignal(opts);
            return this._request(opts);
          }
          if (opts.errorRedactor) {
            opts.errorRedactor(err);
          }
          throw err;
        }
      }
      async getResponseData(opts, res) {
        if (res.status === HTTP_STATUS_NO_CONTENT) {
          return "";
        }
        if (opts.maxContentLength && res.headers.has("content-length") && opts.maxContentLength < Number.parseInt(res.headers?.get("content-length") || "")) {
          throw new common_js_1.GaxiosError("Response's `Content-Length` is over the limit.", opts, Object.assign(res, { config: opts }));
        }
        switch (opts.responseType) {
          case "stream":
            return res.body;
          case "json": {
            const data = await res.text();
            try {
              return JSON.parse(data);
            } catch {
              return data;
            }
          }
          case "arraybuffer":
            return res.arrayBuffer();
          case "blob":
            return res.blob();
          case "text":
            return res.text();
          default:
            return this.getResponseDataFromContentType(res);
        }
      }
      #urlMayUseProxy(url, noProxy = []) {
        const candidate = new URL(url);
        const noProxyList = [...noProxy];
        const noProxyEnvList = (process.env.NO_PROXY ?? process.env.no_proxy)?.split(",") || [];
        for (const rule of noProxyEnvList) {
          noProxyList.push(rule.trim());
        }
        for (const rule of noProxyList) {
          if (rule instanceof RegExp) {
            if (rule.test(candidate.toString())) {
              return false;
            }
          } else if (rule instanceof URL) {
            if (rule.origin === candidate.origin) {
              return false;
            }
          } else if (rule.startsWith("*.") || rule.startsWith(".")) {
            const cleanedRule = rule.replace(/^\*\./, ".");
            if (candidate.hostname.endsWith(cleanedRule)) {
              return false;
            }
          } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
            return false;
          }
        }
        return true;
      }
      /**
       * Applies the request interceptors. The request interceptors are applied after the
       * call to prepareRequest is completed.
       *
       * @param {GaxiosOptionsPrepared} options The current set of options.
       *
       * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
       */
      async #applyRequestInterceptors(options) {
        let promiseChain = Promise.resolve(options);
        for (const interceptor of this.interceptors.request.values()) {
          if (interceptor) {
            promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
          }
        }
        return promiseChain;
      }
      /**
       * Applies the response interceptors. The response interceptors are applied after the
       * call to request is made.
       *
       * @param {GaxiosOptionsPrepared} options The current set of options.
       *
       * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
       */
      async #applyResponseInterceptors(response) {
        let promiseChain = Promise.resolve(response);
        for (const interceptor of this.interceptors.response.values()) {
          if (interceptor) {
            promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
          }
        }
        return promiseChain;
      }
      /**
       * Validates the options, merges them with defaults, and prepare request.
       *
       * @param options The original options passed from the client.
       * @returns Prepared options, ready to make a request
       */
      async #prepareRequest(options) {
        const preparedHeaders = new Headers(this.defaults.headers);
        _a.mergeHeaders(preparedHeaders, options.headers);
        const opts = (0, extend_1.default)(true, {}, this.defaults, options);
        if (!opts.url) {
          throw new Error("URL is required.");
        }
        if (opts.baseURL) {
          opts.url = new URL(opts.url, opts.baseURL);
        }
        opts.url = new URL(opts.url);
        if (opts.params) {
          if (opts.paramsSerializer) {
            let additionalQueryParams = opts.paramsSerializer(opts.params);
            if (additionalQueryParams.startsWith("?")) {
              additionalQueryParams = additionalQueryParams.slice(1);
            }
            const prefix = opts.url.toString().includes("?") ? "&" : "?";
            opts.url = opts.url + prefix + additionalQueryParams;
          } else {
            const url = opts.url instanceof URL ? opts.url : new URL(opts.url);
            for (const [key, value] of new URLSearchParams(opts.params)) {
              url.searchParams.append(key, value);
            }
            opts.url = url;
          }
        }
        if (typeof options.maxContentLength === "number") {
          opts.size = options.maxContentLength;
        }
        if (typeof options.maxRedirects === "number") {
          opts.follow = options.maxRedirects;
        }
        const shouldDirectlyPassData = typeof opts.data === "string" || opts.data instanceof ArrayBuffer || opts.data instanceof Blob || // Node 18 does not have a global `File` object
        globalThis.File && opts.data instanceof File || opts.data instanceof FormData || opts.data instanceof stream_1.Readable || opts.data instanceof ReadableStream || opts.data instanceof String || opts.data instanceof URLSearchParams || ArrayBuffer.isView(opts.data) || // `Buffer` (Node.js), `DataView`, `TypedArray`
        /**
         * @deprecated `node-fetch` or another third-party's request types
         */
        ["Blob", "File", "FormData"].includes(opts.data?.constructor?.name || "");
        if (opts.multipart?.length) {
          const boundary = await randomUUID();
          preparedHeaders.set("content-type", `multipart/related; boundary=${boundary}`);
          opts.body = stream_1.Readable.from(this.getMultipartRequest(opts.multipart, boundary));
        } else if (shouldDirectlyPassData) {
          opts.body = opts.data;
        } else if (typeof opts.data === "object") {
          if (preparedHeaders.get("Content-Type") === "application/x-www-form-urlencoded") {
            opts.body = opts.paramsSerializer ? opts.paramsSerializer(opts.data) : new URLSearchParams(opts.data);
          } else {
            if (!preparedHeaders.has("content-type")) {
              preparedHeaders.set("content-type", "application/json");
            }
            opts.body = JSON.stringify(opts.data);
          }
        } else if (opts.data) {
          opts.body = opts.data;
        }
        opts.validateStatus = opts.validateStatus || this.validateStatus;
        opts.responseType = opts.responseType || "unknown";
        if (!preparedHeaders.has("accept") && opts.responseType === "json") {
          preparedHeaders.set("accept", "application/json");
        }
        const proxy = opts.proxy || process?.env?.HTTPS_PROXY || process?.env?.https_proxy || process?.env?.HTTP_PROXY || process?.env?.http_proxy;
        if (opts.agent) {
        } else if (proxy && this.#urlMayUseProxy(opts.url, opts.noProxy)) {
          const HttpsProxyAgent = await _a.#getProxyAgent();
          if (this.agentCache.has(proxy)) {
            opts.agent = this.agentCache.get(proxy);
          } else {
            opts.agent = new HttpsProxyAgent(proxy, {
              cert: opts.cert,
              key: opts.key
            });
            this.agentCache.set(proxy, opts.agent);
          }
        } else if (opts.cert && opts.key) {
          if (this.agentCache.has(opts.key)) {
            opts.agent = this.agentCache.get(opts.key);
          } else {
            opts.agent = new https_1.Agent({
              cert: opts.cert,
              key: opts.key
            });
            this.agentCache.set(opts.key, opts.agent);
          }
        }
        if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
          opts.errorRedactor = common_js_1.defaultErrorRedactor;
        }
        if (opts.body && !("duplex" in opts)) {
          opts.duplex = "half";
        }
        this.#appendTimeoutToSignal(opts);
        return Object.assign(opts, {
          headers: preparedHeaders,
          url: opts.url instanceof URL ? opts.url : new URL(opts.url)
        });
      }
      #appendTimeoutToSignal(opts) {
        if (opts.timeout) {
          const timeoutSignal = AbortSignal.timeout(opts.timeout);
          if (opts.signal && !opts.signal.aborted) {
            opts.signal = AbortSignal.any([opts.signal, timeoutSignal]);
          } else {
            opts.signal = timeoutSignal;
          }
        }
      }
      /**
       * By default, throw for any non-2xx status code
       * @param status status code from the HTTP response
       */
      validateStatus(status) {
        return status >= 200 && status < 300;
      }
      /**
       * Attempts to parse a response by looking at the Content-Type header.
       * @param {Response} response the HTTP response.
       * @returns a promise that resolves to the response data.
       */
      async getResponseDataFromContentType(response) {
        let contentType = response.headers.get("Content-Type");
        if (contentType === null) {
          return response.text();
        }
        contentType = contentType.toLowerCase();
        if (contentType.includes("application/json")) {
          let data = await response.text();
          try {
            data = JSON.parse(data);
          } catch {
          }
          return data;
        } else if (contentType.match(/^text\//)) {
          return response.text();
        } else {
          return response.blob();
        }
      }
      /**
       * Creates an async generator that yields the pieces of a multipart/related request body.
       * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
       * multipart/related requests are not currently supported.
       *
       * @param {GaxiosMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
       * @param {string} boundary the boundary string to be placed between each part.
       */
      async *getMultipartRequest(multipartOptions, boundary) {
        const finale = `--${boundary}--`;
        for (const currentPart of multipartOptions) {
          const partContentType = currentPart.headers.get("Content-Type") || "application/octet-stream";
          const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
          yield preamble;
          if (typeof currentPart.content === "string") {
            yield currentPart.content;
          } else {
            yield* currentPart.content;
          }
          yield "\r\n";
        }
        yield finale;
      }
      /**
       * A cache for the lazily-loaded proxy agent.
       *
       * Should use {@link Gaxios[#getProxyAgent]} to retrieve.
       */
      // using `import` to dynamically import the types here
      static #proxyAgent;
      /**
       * A cache for the lazily-loaded fetch library.
       *
       * Should use {@link Gaxios[#getFetch]} to retrieve.
       */
      //
      static #fetch;
      /**
       * Imports, caches, and returns a proxy agent - if not already imported
       *
       * @returns A proxy agent
       */
      static async #getProxyAgent() {
        this.#proxyAgent ||= (await Promise.resolve().then(() => __toESM(require_dist2()))).HttpsProxyAgent;
        return this.#proxyAgent;
      }
      static async #getFetch() {
        const hasWindow = typeof window !== "undefined" && !!window;
        this.#fetch ||= hasWindow ? window.fetch : (await Promise.resolve().then(() => (init_src2(), src_exports2))).default;
        return this.#fetch;
      }
      /**
       * Merges headers.
       * If the base headers do not exist a new `Headers` object will be returned.
       *
       * @remarks
       *
       * Using this utility can be helpful when the headers are not known to exist:
       * - if they exist as `Headers`, that instance will be used
       *   - it improves performance and allows users to use their existing references to their `Headers`
       * - if they exist in another form (`HeadersInit`), they will be used to create a new `Headers` object
       * - if the base headers do not exist a new `Headers` object will be created
       *
       * @param base headers to append/overwrite to
       * @param append headers to append/overwrite with
       * @returns the base headers instance with merged `Headers`
       */
      static mergeHeaders(base, ...append) {
        base = base instanceof Headers ? base : new Headers(base);
        for (const headers of append) {
          const add = headers instanceof Headers ? headers : new Headers(headers);
          add.forEach((value, key) => {
            key === "set-cookie" ? base.append(key, value) : base.set(key, value);
          });
        }
        return base;
      }
    };
    exports.Gaxios = Gaxios;
    _a = Gaxios;
  }
});

// node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/index.js
var require_src4 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/gaxios/build/cjs/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request;
    var gaxios_js_1 = require_gaxios2();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: function() {
      return gaxios_js_1.Gaxios;
    } });
    var common_js_1 = require_common3();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: function() {
      return common_js_1.GaxiosError;
    } });
    __exportStar(require_interceptor2(), exports);
    exports.instance = new gaxios_js_1.Gaxios();
    async function request(opts) {
      return exports.instance.request(opts);
    }
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports, module) {
    "use strict";
    module.exports = TypeError;
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports, module) {
    module.exports = __require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports, module) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s3 = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i2 = 0; i2 < attrs.length; i2++) {
          s3 += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
        }
        s3 += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s3 += "...";
        }
        s3 += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s3;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s3, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s3 + quoteChar;
    }
    function quote(s3) {
      return $replace.call(String(s3), /"/g, "&quot;");
    }
    function canTrustToString(obj) {
      return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e2) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e2) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f4) {
      if (f4.name) {
        return f4.name;
      }
      var m2 = $match.call(functionToString.call(f4), /^function\s*([\w$]+)/);
      if (m2) {
        return m2[1];
      }
      return null;
    }
    function indexOf(xs, x2) {
      if (xs.indexOf) {
        return xs.indexOf(x2);
      }
      for (var i2 = 0, l = xs.length; i2 < l; i2++) {
        if (xs[i2] === x2) {
          return i2;
        }
      }
      return -1;
    }
    function isMap(x2) {
      if (!mapSize || !x2 || typeof x2 !== "object") {
        return false;
      }
      try {
        mapSize.call(x2);
        try {
          setSize.call(x2);
        } catch (s3) {
          return true;
        }
        return x2 instanceof Map;
      } catch (e2) {
      }
      return false;
    }
    function isWeakMap(x2) {
      if (!weakMapHas || !x2 || typeof x2 !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x2, weakMapHas);
        try {
          weakSetHas.call(x2, weakSetHas);
        } catch (s3) {
          return true;
        }
        return x2 instanceof WeakMap;
      } catch (e2) {
      }
      return false;
    }
    function isWeakRef(x2) {
      if (!weakRefDeref || !x2 || typeof x2 !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x2);
        return true;
      } catch (e2) {
      }
      return false;
    }
    function isSet(x2) {
      if (!setSize || !x2 || typeof x2 !== "object") {
        return false;
      }
      try {
        setSize.call(x2);
        try {
          mapSize.call(x2);
        } catch (m2) {
          return true;
        }
        return x2 instanceof Set;
      } catch (e2) {
      }
      return false;
    }
    function isWeakSet(x2) {
      if (!weakSetHas || !x2 || typeof x2 !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x2, weakSetHas);
        try {
          weakMapHas.call(x2, weakMapHas);
        } catch (s3) {
          return true;
        }
        return x2 instanceof WeakSet;
      } catch (e2) {
      }
      return false;
    }
    function isElement(x2) {
      if (!x2 || typeof x2 !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x2 instanceof HTMLElement) {
        return true;
      }
      return typeof x2.nodeName === "string" && typeof x2.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s3 = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s3, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x2 = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x2) {
        return "\\" + x2;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i2 = 0; i2 < xs.length; i2++) {
        if (indexOf(xs[i2], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i2 = 0; i2 < obj.length; i2++) {
          xs[i2] = has(obj, i2) ? inspect(obj[i2], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// node_modules/side-channel-list/index.js
var require_side_channel_list = __commonJS({
  "node_modules/side-channel-list/index.js"(exports, module) {
    "use strict";
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var listGetNode = function(list, key, isDelete) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) != null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = /** @type {NonNullable<typeof list.next>} */
            list.next;
            list.next = curr;
          }
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      if (!objects) {
        return void 0;
      }
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      if (!objects) {
        return false;
      }
      return !!listGetNode(objects, key);
    };
    var listDelete = function(objects, key) {
      if (objects) {
        return listGetNode(objects, key, true);
      }
    };
    module.exports = function getSideChannelList() {
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          var deletedNode = listDelete($o, key);
          if (deletedNode && $o && !$o.next) {
            $o = void 0;
          }
          return !!deletedNode;
        },
        get: function(key) {
          return listGet($o, key);
        },
        has: function(key) {
          return listHas($o, key);
        },
        set: function(key, value) {
          if (!$o) {
            $o = {
              next: void 0
            };
          }
          listSet(
            /** @type {NonNullable<typeof $o>} */
            $o,
            key,
            value
          );
        }
      };
      return channel;
    };
  }
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports, module) {
    "use strict";
    module.exports = Object;
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports, module) {
    "use strict";
    module.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports, module) {
    "use strict";
    module.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports, module) {
    "use strict";
    module.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports, module) {
    "use strict";
    module.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports, module) {
    "use strict";
    module.exports = SyntaxError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports, module) {
    "use strict";
    module.exports = URIError;
  }
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports, module) {
    "use strict";
    module.exports = Math.abs;
  }
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports, module) {
    "use strict";
    module.exports = Math.floor;
  }
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports, module) {
    "use strict";
    module.exports = Math.max;
  }
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports, module) {
    "use strict";
    module.exports = Math.min;
  }
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports, module) {
    "use strict";
    module.exports = Math.pow;
  }
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports, module) {
    "use strict";
    module.exports = Math.round;
  }
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports, module) {
    "use strict";
    module.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports, module) {
    "use strict";
    var $isNaN = require_isNaN();
    module.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports, module) {
    "use strict";
    module.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e2) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports, module) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e2) {
        $defineProperty = false;
      }
    }
    module.exports = $defineProperty;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
    "use strict";
    module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
    "use strict";
    var $Object = require_es_object_atoms();
    module.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i2 = 0; i2 < a.length; i2 += 1) {
        arr[i2] = a[i2];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i2 = offset || 0, j = 0; i2 < arrLike.length; i2 += 1, j += 1) {
        arr[j] = arrLike[i2];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i2 = 0; i2 < arr.length; i2 += 1) {
        str += arr[i2];
        if (i2 + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i2 = 0; i2 < boundLength; i2++) {
        boundArgs[i2] = "$" + i2;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
    "use strict";
    module.exports = Function.prototype.call;
  }
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
    "use strict";
    module.exports = Function.prototype.apply;
  }
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
    "use strict";
    module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports, module) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e2) {
      if (!e2 || typeof e2 !== "object" || !("code" in e2) || e2.code !== "ERR_PROTO_ACCESS") {
        throw e2;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports, module) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e2) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e2) {
        errorProto = getProto(getProto(e2));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
        var part = parts[i2];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i2 + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  }
});

// node_modules/side-channel-map/index.js
var require_side_channel_map = __commonJS({
  "node_modules/side-channel-map/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $Map = GetIntrinsic("%Map%", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapDelete = callBound("Map.prototype.delete", true);
    var $mapSize = callBound("Map.prototype.size", true);
    module.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
    function getSideChannelMap() {
      var $m;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          if ($m) {
            var result = $mapDelete($m, key);
            if ($mapSize($m) === 0) {
              $m = void 0;
            }
            return result;
          }
          return false;
        },
        get: function(key) {
          if ($m) {
            return $mapGet($m, key);
          }
        },
        has: function(key) {
          if ($m) {
            return $mapHas($m, key);
          }
          return false;
        },
        set: function(key, value) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = __commonJS({
  "node_modules/side-channel-weakmap/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var getSideChannelMap = require_side_channel_map();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
    module.exports = $WeakMap ? (
      /** @type {Exclude<import('.'), false>} */
      function getSideChannelWeakMap() {
        var $wm;
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapDelete($wm, key);
              }
            } else if (getSideChannelMap) {
              if ($m) {
                return $m["delete"](key);
              }
            }
            return false;
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            }
            return $m && $m.get(key);
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            }
            return !!$m && $m.has(key);
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if (getSideChannelMap) {
              if (!$m) {
                $m = getSideChannelMap();
              }
              $m.set(key, value);
            }
          }
        };
        return channel;
      }
    ) : getSideChannelMap;
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports, module) {
    "use strict";
    var $TypeError = require_type();
    var inspect = require_object_inspect();
    var getSideChannelList = require_side_channel_list();
    var getSideChannelMap = require_side_channel_map();
    var getSideChannelWeakMap = require_side_channel_weakmap();
    var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    module.exports = function getSideChannel() {
      var $channelData;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            var keyDesc = key && Object(key) === key ? "the given object key" : inspect(key);
            throw new $TypeError("Side channel does not contain " + keyDesc);
          }
        },
        "delete": function(key) {
          return !!$channelData && $channelData["delete"](key);
        },
        get: function(key) {
          return $channelData && $channelData.get(key);
        },
        has: function(key) {
          return !!$channelData && $channelData.has(key);
        },
        set: function(key, value) {
          if (!$channelData) {
            $channelData = makeChannel();
          }
          $channelData.set(key, value);
        }
      };
      return channel;
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module) {
    "use strict";
    var formats = require_formats();
    var getSideChannel = require_side_channel();
    var defineProperty = require_es_define_property();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var overflowChannel = getSideChannel();
    var markOverflow = function markOverflow2(obj, maxIndex) {
      overflowChannel.set(obj, maxIndex);
      return obj;
    };
    var isOverflow = function isOverflow2(obj) {
      return overflowChannel.has(obj);
    };
    var getMaxIndex = function getMaxIndex2(obj) {
      return overflowChannel.get(obj);
    };
    var setMaxIndex = function setMaxIndex2(obj, maxIndex) {
      overflowChannel.set(obj, maxIndex);
    };
    var hexTable = function() {
      var array = [];
      for (var i2 = 0; i2 < 256; ++i2) {
        array[array.length] = "%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase();
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted[compacted.length] = obj[j];
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? { __proto__: null } : {};
      for (var i2 = 0; i2 < source.length; ++i2) {
        if (typeof source[i2] !== "undefined") {
          obj[i2] = source[i2];
        }
      }
      return obj;
    };
    var setProperty = function setProperty2(obj, key, value) {
      if (key === "__proto__" && defineProperty) {
        defineProperty(obj, key, {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      } else {
        obj[key] = value;
      }
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object" && typeof source !== "function") {
        if (isArray(target)) {
          var nextIndex = target.length;
          if (options && typeof options.arrayLimit === "number" && nextIndex >= options.arrayLimit) {
            if (options.throwOnLimitExceeded) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            }
            return markOverflow(arrayToObject(target.concat(source), options), nextIndex);
          }
          target[nextIndex] = source;
        } else if (target && typeof target === "object") {
          if (isOverflow(target)) {
            var newIndex = getMaxIndex(target) + 1;
            target[newIndex] = source;
            setMaxIndex(target, newIndex);
          } else if (options && options.strictMerge) {
            return [target, source];
          } else if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        if (isOverflow(source)) {
          var sourceKeys = Object.keys(source);
          var result = options && options.plainObjects ? { __proto__: null, 0: target } : { 0: target };
          for (var m2 = 0; m2 < sourceKeys.length; m2++) {
            var oldKey = parseInt(sourceKeys[m2], 10);
            result[oldKey + 1] = source[sourceKeys[m2]];
          }
          return markOverflow(result, getMaxIndex(source) + 1);
        }
        var combined = [target].concat(source);
        if (options && typeof options.arrayLimit === "number" && combined.length > options.arrayLimit) {
          if (options.throwOnLimitExceeded) {
            throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
          }
          return markOverflow(arrayToObject(combined, options), combined.length - 1);
        }
        return combined;
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i2) {
          if (has.call(target, i2)) {
            var targetItem = target[i2];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i2] = merge2(targetItem, item, options);
            } else {
              target[target.length] = item;
            }
          } else {
            target[i2] = item;
          }
        });
        if (options && typeof options.arrayLimit === "number" && target.length > options.arrayLimit) {
          if (options.throwOnLimitExceeded) {
            throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
          }
          return markOverflow(arrayToObject(target, options), target.length - 1);
        }
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          setProperty(acc, key, merge2(acc[key], value, options));
        } else {
          setProperty(acc, key, value);
        }
        if (isOverflow(source) && !isOverflow(acc)) {
          markOverflow(acc, getMaxIndex(source));
        }
        if (isOverflow(acc)) {
          var keyNum = parseInt(key, 10);
          if (String(keyNum) === key && keyNum >= 0 && keyNum > getMaxIndex(acc)) {
            setMaxIndex(acc, keyNum);
          }
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        setProperty(acc, key, source[key]);
        return acc;
      }, target);
    };
    var decode = function(str, defaultDecoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e2) {
        return strWithoutPlus;
      }
    };
    var limit = 1024;
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var j = 0; j < string.length; j += limit) {
        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
        if (j + limit < string.length) {
          var last = segment.charCodeAt(segment.length - 1);
          if (last >= 55296 && last <= 56319) {
            segment = segment.slice(0, -1);
            j -= 1;
          }
        }
        var arr = [];
        for (var i2 = 0; i2 < segment.length; ++i2) {
          var c = segment.charCodeAt(i2);
          if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
            arr[arr.length] = segment.charAt(i2);
            continue;
          }
          if (c < 128) {
            arr[arr.length] = hexTable[c];
            continue;
          }
          if (c < 2048) {
            arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
            continue;
          }
          if (c < 55296 || c >= 57344) {
            arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
            continue;
          }
          i2 += 1;
          c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i2) & 1023);
          arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        }
        out += arr.join("");
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = getSideChannel();
      for (var i2 = 0; i2 < queue.length; ++i2) {
        var item = queue[i2];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && !refs.has(val)) {
            queue[queue.length] = { obj, prop: key };
            refs.set(val, true);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b, arrayLimit, plainObjects, throwOnLimitExceeded) {
      if (isOverflow(a)) {
        if (throwOnLimitExceeded) {
          throw new RangeError("Array limit exceeded. Only " + arrayLimit + " element" + (arrayLimit === 1 ? "" : "s") + " allowed in an array.");
        }
        var bValues = isArray(b) ? b : [b];
        var newIndex = getMaxIndex(a);
        for (var i2 = 0; i2 < bValues.length; ++i2) {
          newIndex += 1;
          a[newIndex] = bValues[i2];
        }
        setMaxIndex(a, newIndex);
        return a;
      }
      var result = [].concat(a, b);
      if (result.length > arrayLimit) {
        if (throwOnLimitExceeded) {
          throw new RangeError("Array limit exceeded. Only " + arrayLimit + " element" + (arrayLimit === 1 ? "" : "s") + " allowed in an array.");
        }
        return markOverflow(arrayToObject(result, { plainObjects }), result.length - 1);
      }
      return result;
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i2 = 0; i2 < val.length; i2 += 1) {
          mapped[mapped.length] = fn(val[i2]);
        }
        return mapped;
      }
      return fn(val);
    };
    module.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isOverflow,
      isRegExp,
      markOverflow,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module) {
    "use strict";
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      allowEmptyArrays: false,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: false,
      commaRoundTrip: false,
      delimiter: "&",
      depth: Infinity,
      encode: true,
      encodeDotInKeys: false,
      encoder: utils.encode,
      encodeValuesOnly: false,
      filter: void 0,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var sentinel = {};
    var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel, depth, currentDepth) {
      var obj = object;
      if (currentDepth > depth) {
        throw new RangeError("Input depth exceeded depth option of " + depth);
      }
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      obj = typeof filter === "function" ? filter(prefix, obj) : obj;
      if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return formatter(encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix);
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, function(v) {
            return v == null ? v : encoder(v);
          });
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
      if (allowEmptyArrays && isArray(obj) && obj.length === 0 && Object.keys(obj).length === 0) {
        return adjustedPrefix + "[]";
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          allowEmptyArrays,
          strictNullHandling,
          skipNulls,
          encodeDotInKeys,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel,
          depth,
          currentDepth + 1
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      var arrayFormat;
      if (opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if ("indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = defaults.arrayFormat;
      }
      if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        arrayFormat,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        commaRoundTrip: !!opts.commaRoundTrip,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        depth: typeof opts.depth === "number" ? opts.depth : defaults.depth,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
      var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i2 = 0; i2 < objKeys.length; ++i2) {
        var key = objKeys[i2];
        if (typeof key === "undefined" || key === null) {
          continue;
        }
        var value = obj[key];
        if (options.skipNulls && value === null) {
          continue;
        }
        var encodedKey = options.encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
        pushToArray(keys, stringify(
          value,
          encodedKey,
          generateArrayPrefix,
          commaRoundTrip,
          options.allowEmptyArrays,
          options.strictNullHandling,
          options.skipNulls,
          options.encodeDotInKeys,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel,
          options.depth,
          0
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B" + options.delimiter;
        } else {
          prefix += "utf8=%E2%9C%93" + options.delimiter;
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowEmptyArrays: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decodeDotInKeys: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictDepth: false,
      strictMerge: true,
      strictNullHandling: false,
      throwOnLimitExceeded: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options, currentArrayLength) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        if (options.throwOnLimitExceeded) {
          var commaCount = 0;
          var commaIndex = val.indexOf(",");
          while (commaIndex > -1) {
            commaCount += 1;
            if (commaCount >= options.arrayLimit) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            }
            commaIndex = val.indexOf(",", commaIndex + 1);
          }
        }
        return val.split(",");
      }
      if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
        throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(
        options.delimiter,
        options.throwOnLimitExceeded && typeof limit !== "undefined" ? limit + 1 : limit
      );
      if (options.throwOnLimitExceeded && typeof limit !== "undefined" && parts.length > limit) {
        throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
      }
      var skipIndex = -1;
      var i2;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i2 = 0; i2 < parts.length; ++i2) {
          if (parts[i2].indexOf("utf8=") === 0) {
            if (parts[i2] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i2] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i2;
            i2 = parts.length;
          }
        }
      }
      for (i2 = 0; i2 < parts.length; ++i2) {
        if (i2 === skipIndex) {
          continue;
        }
        var part = parts[i2];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key;
        var val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          if (key !== null) {
            val = utils.maybeMap(
              parseArrayValue(
                part.slice(pos + 1),
                options,
                isArray(obj[key]) ? obj[key].length : 0
              ),
              function(encodedVal) {
                return options.decoder(encodedVal, defaults.decoder, charset, "value");
              }
            );
          }
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(String(val));
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (options.comma && isArray(val) && val.length > options.arrayLimit) {
          val = utils.combine([], val, options.arrayLimit, options.plainObjects, options.throwOnLimitExceeded);
        }
        if (key !== null) {
          var existing = has.call(obj, key);
          if (existing && (options.duplicates === "combine" || part.indexOf("[]=") > -1)) {
            obj[key] = utils.combine(
              obj[key],
              val,
              options.arrayLimit,
              options.plainObjects,
              options.throwOnLimitExceeded
            );
          } else if (!existing || options.duplicates === "last") {
            obj[key] = val;
          }
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var currentArrayLength = 0;
      if (chain.length > 0 && chain[chain.length - 1] === "[]") {
        var parentKey = chain.slice(0, -1).join("");
        currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
      }
      var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
      for (var i2 = chain.length - 1; i2 >= 0; --i2) {
        var obj;
        var root = chain[i2];
        if (root === "[]" && options.parseArrays) {
          if (utils.isOverflow(leaf)) {
            obj = leaf;
          } else {
            obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine(
              [],
              leaf,
              options.arrayLimit,
              options.plainObjects,
              options.throwOnLimitExceeded
            );
          }
        } else {
          obj = options.plainObjects ? { __proto__: null } : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
          var index = parseInt(decodedRoot, 10);
          var isValidArrayIndex = !isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && options.parseArrays;
          if (!options.parseArrays && decodedRoot === "") {
            obj = { 0: leaf };
          } else if (isValidArrayIndex && index < options.arrayLimit) {
            obj = [];
            obj[index] = leaf;
          } else if (isValidArrayIndex && options.throwOnLimitExceeded) {
            throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
          } else if (isValidArrayIndex) {
            obj[index] = leaf;
            utils.markOverflow(obj, index);
          } else if (decodedRoot !== "__proto__") {
            obj[decodedRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var splitKeyIntoSegments = function splitKeyIntoSegments2(originalKey, options) {
      var key = options.allowDots ? originalKey.replace(/\.([^.[]+)/g, "[$1]") : originalKey;
      if (options.depth <= 0) {
        if (!options.plainObjects && has.call(Object.prototype, key)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        return [key];
      }
      var segments = [];
      var first = key.indexOf("[");
      var parent = first >= 0 ? key.slice(0, first) : key;
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        segments[segments.length] = parent;
      }
      var n = key.length;
      var open2 = first;
      var collected = 0;
      while (open2 >= 0 && collected < options.depth) {
        var level = 1;
        var i2 = open2 + 1;
        var close = -1;
        while (i2 < n && close < 0) {
          var cu = key.charCodeAt(i2);
          if (cu === 91) {
            level += 1;
          } else if (cu === 93) {
            level -= 1;
            if (level === 0) {
              close = i2;
            }
          }
          i2 += 1;
        }
        if (close < 0) {
          segments[segments.length] = "[" + key.slice(open2) + "]";
          return segments;
        }
        var seg = key.slice(open2, close + 1);
        var content = seg.slice(1, -1);
        if (!options.plainObjects && has.call(Object.prototype, content) && !options.allowPrototypes) {
          return;
        }
        segments[segments.length] = seg;
        collected += 1;
        open2 = key.indexOf("[", close + 1);
      }
      if (open2 >= 0) {
        if (options.strictDepth === true) {
          throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
        }
        segments[segments.length] = "[" + key.slice(open2) + "]";
      }
      return segments;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var keys = splitKeyIntoSegments(givenKey, options);
      if (!keys) {
        return;
      }
      return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      }
      if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
        throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      }
      if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
        throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
      if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
        throw new TypeError("The duplicates option must be either combine, first, or last");
      }
      var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
      return {
        allowDots,
        allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        duplicates,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
        strictMerge: typeof opts.strictMerge === "boolean" ? !!opts.strictMerge : defaults.strictMerge,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
        throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
      };
    };
    module.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? { __proto__: null } : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? { __proto__: null } : {};
      var keys = Object.keys(tempObj);
      for (var i2 = 0; i2 < keys.length; ++i2) {
        var key = keys[i2];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/url-template/lib/url-template.js
var require_url_template = __commonJS({
  "node_modules/url-template/lib/url-template.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.urltemplate = factory();
      }
    })(exports, function() {
      function UrlTemplate() {
      }
      UrlTemplate.prototype.encodeReserved = function(str) {
        return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
          if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
          }
          return part;
        }).join("");
      };
      UrlTemplate.prototype.encodeUnreserved = function(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
          return "%" + c.charCodeAt(0).toString(16).toUpperCase();
        });
      };
      UrlTemplate.prototype.encodeValue = function(operator, value, key) {
        value = operator === "+" || operator === "#" ? this.encodeReserved(value) : this.encodeUnreserved(value);
        if (key) {
          return this.encodeUnreserved(key) + "=" + value;
        } else {
          return value;
        }
      };
      UrlTemplate.prototype.isDefined = function(value) {
        return value !== void 0 && value !== null;
      };
      UrlTemplate.prototype.isKeyOperator = function(operator) {
        return operator === ";" || operator === "&" || operator === "?";
      };
      UrlTemplate.prototype.getValues = function(context, operator, key, modifier) {
        var value = context[key], result = [];
        if (this.isDefined(value) && value !== "") {
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            value = value.toString();
            if (modifier && modifier !== "*") {
              value = value.substring(0, parseInt(modifier, 10));
            }
            result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));
          } else {
            if (modifier === "*") {
              if (Array.isArray(value)) {
                value.filter(this.isDefined).forEach(function(value2) {
                  result.push(this.encodeValue(operator, value2, this.isKeyOperator(operator) ? key : null));
                }, this);
              } else {
                Object.keys(value).forEach(function(k) {
                  if (this.isDefined(value[k])) {
                    result.push(this.encodeValue(operator, value[k], k));
                  }
                }, this);
              }
            } else {
              var tmp = [];
              if (Array.isArray(value)) {
                value.filter(this.isDefined).forEach(function(value2) {
                  tmp.push(this.encodeValue(operator, value2));
                }, this);
              } else {
                Object.keys(value).forEach(function(k) {
                  if (this.isDefined(value[k])) {
                    tmp.push(this.encodeUnreserved(k));
                    tmp.push(this.encodeValue(operator, value[k].toString()));
                  }
                }, this);
              }
              if (this.isKeyOperator(operator)) {
                result.push(this.encodeUnreserved(key) + "=" + tmp.join(","));
              } else if (tmp.length !== 0) {
                result.push(tmp.join(","));
              }
            }
          }
        } else {
          if (operator === ";") {
            if (this.isDefined(value)) {
              result.push(this.encodeUnreserved(key));
            }
          } else if (value === "" && (operator === "&" || operator === "?")) {
            result.push(this.encodeUnreserved(key) + "=");
          } else if (value === "") {
            result.push("");
          }
        }
        return result;
      };
      UrlTemplate.prototype.parse = function(template) {
        var that = this;
        var operators = ["+", "#", ".", "/", ";", "?", "&"];
        return {
          expand: function(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_, expression, literal) {
              if (expression) {
                var operator = null, values = [];
                if (operators.indexOf(expression.charAt(0)) !== -1) {
                  operator = expression.charAt(0);
                  expression = expression.substr(1);
                }
                expression.split(/,/g).forEach(function(variable) {
                  var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                  values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                });
                if (operator && operator !== "+") {
                  var separator = ",";
                  if (operator === "?") {
                    separator = "&";
                  } else if (operator !== "#") {
                    separator = operator;
                  }
                  return (values.length !== 0 ? operator : "") + values.join(separator);
                } else {
                  return values.join(",");
                }
              } else {
                return that.encodeReserved(literal);
              }
            });
          }
        };
      };
      return new UrlTemplate();
    });
  }
});

// node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/isbrowser.js
var require_isbrowser = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/isbrowser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = isBrowser;
    function isBrowser() {
      return typeof window !== "undefined";
    }
  }
});

// node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/util.js
var require_util4 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.headersToClassicHeaders = headersToClassicHeaders;
    exports.marshallGaxiosResponse = marshallGaxiosResponse;
    function headersToClassicHeaders(headers) {
      let classicHeaders = {};
      if (headers instanceof Headers) {
        headers.forEach((value, key) => {
          classicHeaders[key] = value;
        });
      } else if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          classicHeaders[key] = value;
        }
      } else {
        classicHeaders = headers || {};
      }
      return classicHeaders;
    }
    function marshallGaxiosResponse(res) {
      return Object.defineProperties(res || {}, {
        headers: {
          configurable: true,
          writable: true,
          enumerable: true,
          value: headersToClassicHeaders(res?.headers)
        }
      });
    }
  }
});

// node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/http2.js
var require_http2 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/http2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sessions = void 0;
    exports.request = request;
    exports.closeSession = closeSession;
    var http22 = __require("http2");
    var zlib3 = __require("zlib");
    var url_1 = __require("url");
    var qs = require_lib();
    var extend = require_extend();
    var stream_1 = __require("stream");
    var util = __require("util");
    var process9 = __require("process");
    var util_1 = require_util4();
    var { HTTP2_HEADER_CONTENT_ENCODING, HTTP2_HEADER_CONTENT_TYPE, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_STATUS } = http22.constants;
    var DEBUG = !!process9.env.HTTP2_DEBUG;
    exports.sessions = {};
    async function request(config) {
      const opts = extend(true, {}, config);
      opts.validateStatus = opts.validateStatus || validateStatus;
      opts.responseType = opts.responseType || "json";
      const url = new url_1.URL(opts.url);
      const sessionData = _getClient(url.host);
      if (sessionData.timeoutHandle !== void 0) {
        clearTimeout(sessionData.timeoutHandle);
      }
      let pathWithQs = url.pathname;
      if (config.params && Object.keys(config.params).length > 0) {
        const serializer = config.paramsSerializer || qs.stringify;
        const q = serializer(opts.params);
        pathWithQs += `?${q}`;
      }
      const headers = (0, util_1.headersToClassicHeaders)(opts.headers);
      headers[HTTP2_HEADER_PATH] = pathWithQs;
      headers[HTTP2_HEADER_METHOD] = config.method || "GET";
      opts.headers = headers;
      if (!headers[HTTP2_HEADER_CONTENT_TYPE]) {
        if (opts.responseType !== "text") {
          headers[HTTP2_HEADER_CONTENT_TYPE] = "application/json";
        }
      }
      const res = {
        config,
        headers: {},
        status: 0,
        data: {},
        statusText: ""
      };
      const chunks = [];
      const session = sessionData.session;
      let req;
      return new Promise((resolve2, reject) => {
        try {
          req = session.request(headers).on("response", (responseHeaders) => {
            Object.assign(res, {
              headers: responseHeaders,
              status: responseHeaders[HTTP2_HEADER_STATUS]
            });
            let stream = req;
            if (responseHeaders[HTTP2_HEADER_CONTENT_ENCODING] === "gzip") {
              stream = req.pipe(zlib3.createGunzip());
            }
            if (opts.responseType === "stream") {
              res.data = stream;
              resolve2(res);
              return;
            }
            stream.on("data", (d) => {
              chunks.push(d);
            }).on("error", (err) => {
              reject(err);
              return;
            }).on("end", () => {
              const buf = Buffer.concat(chunks);
              let data = buf;
              if (buf) {
                if (opts.responseType === "json") {
                  try {
                    data = JSON.parse(buf.toString("utf8"));
                  } catch {
                    data = buf.toString("utf8");
                  }
                } else if (opts.responseType === "text") {
                  data = buf.toString("utf8");
                } else if (opts.responseType === "arraybuffer") {
                  data = buf.buffer;
                }
                res.data = data;
              }
              if (!opts.validateStatus(res.status)) {
                let message = `Request failed with status code ${res.status}. `;
                if (res.data && typeof res.data === "object") {
                  const body = util.inspect(res.data, { depth: 5 });
                  message = `${message}
'${body}`;
                }
                reject(new Error(message, { cause: res }));
              }
              resolve2(res);
              return;
            });
          }).on("error", (e2) => {
            reject(e2);
            return;
          });
        } catch (e2) {
          closeSession(url).then(() => reject(e2)).catch(reject);
          return;
        }
        res.request = req;
        if (config.data) {
          if (config.data instanceof stream_1.Stream) {
            config.data.pipe(req);
          } else if (typeof config.data === "string") {
            const data = Buffer.from(config.data);
            req.end(data);
          } else if (typeof config.data === "object") {
            const data = JSON.stringify(config.data);
            req.end(data);
          }
        }
        sessionData.timeoutHandle = setTimeout(() => closeSession(url), 500);
      });
    }
    function validateStatus(status) {
      return status >= 200 && status < 300;
    }
    function _getClient(host) {
      if (!exports.sessions[host]) {
        if (DEBUG) {
          console.log(`Creating client for ${host}`);
        }
        const session = http22.connect(`https://${host}`);
        session.on("error", (e2) => {
          console.error(`*ERROR*: ${e2}`);
          delete exports.sessions[host];
        }).on("goaway", (errorCode, lastStreamId) => {
          console.error(`*GOAWAY*: ${errorCode} : ${lastStreamId}`);
          delete exports.sessions[host];
        });
        exports.sessions[host] = { session };
      } else {
        if (DEBUG) {
          console.log(`Used cached client for ${host}`);
        }
      }
      return exports.sessions[host];
    }
    async function closeSession(url) {
      const sessionData = exports.sessions[url.host];
      if (!sessionData) {
        return;
      }
      const { session } = sessionData;
      delete exports.sessions[url.host];
      if (DEBUG) {
        console.error(`Closing ${url.host}`);
      }
      session.close(() => {
        if (DEBUG) {
          console.error(`Closed ${url.host}`);
        }
      });
      setTimeout(() => {
        if (session && !session.destroyed) {
          if (DEBUG) {
            console.log(`Forcing close ${url.host}`);
          }
          if (session) {
            session.destroy();
          }
        }
      }, 1e3);
    }
  }
});

// node_modules/@googleapis/gmail/node_modules/googleapis-common/package.json
var require_package4 = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/googleapis-common/package.json"(exports, module) {
    module.exports = {
      name: "googleapis-common",
      version: "8.0.3",
      description: "A common tooling library used by the googleapis npm module. You probably don't want to use this directly.",
      repository: {
        type: "git",
        directory: "core/packages/nodejs-googleapis-common",
        url: "https://github.com/googleapis/google-cloud-node.git"
      },
      main: "build/src/index.js",
      types: "build/src/index.d.ts",
      files: [
        "build/src",
        "!build/src/**/*.map"
      ],
      scripts: {
        prebenchmark: "npm run compile",
        benchmark: "node build/benchmark/bench.js",
        compile: "tsc -p .",
        test: "c8 mocha build/test",
        "system-test": "c8 mocha build/system-test --timeout 600000",
        "presystem-test": "npm run compile",
        fix: "gts fix",
        prepare: "npm run compile",
        pretest: "npm run compile",
        lint: "gts check",
        "samples-test": "mocha build/samples-test",
        docs: "jsdoc -c .jsdoc.js",
        webpack: "webpack",
        "browser-test": "karma start",
        prelint: "cd samples; npm link ../; npm install",
        clean: "gts clean",
        precompile: "gts clean"
      },
      keywords: [],
      author: "Google LLC",
      license: "Apache-2.0",
      dependencies: {
        extend: "^3.0.2",
        gaxios: "7.1.3",
        "google-auth-library": "10.5.0",
        "google-logging-utils": "1.1.3",
        qs: "^6.7.0",
        "url-template": "^2.0.8"
      },
      devDependencies: {
        "@babel/plugin-proposal-private-methods": "^7.18.6",
        "@types/extend": "^3.0.1",
        "@types/mocha": "^10.0.10",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.8",
        "@types/nock": "^11.0.0",
        "@types/proxyquire": "^1.3.31",
        "@types/qs": "^6.5.3",
        "@types/sinon": "^21.0.0",
        "@types/tmp": "^0.2.6",
        "@types/url-template": "^2.0.28",
        c8: "^10.1.3",
        codecov: "^3.8.3",
        gts: "^6.0.2",
        http2spy: "^2.0.0",
        "is-docker": "^3.0.0",
        jsdoc: "^4.0.4",
        "jsdoc-fresh": "^5.0.0",
        "jsdoc-region-tag": "^4.0.0",
        karma: "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-remap-coverage": "^0.1.5",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "^5.0.1",
        mocha: "^11.1.0",
        mv: "^2.1.1",
        ncp: "^2.0.0",
        nock: "^14.0.5",
        "null-loader": "^4.0.1",
        "path-to-regexp": "^6.0.0",
        proxyquire: "^2.1.3",
        puppeteer: "^24.0.0",
        sinon: "21.0.3",
        tmp: "0.2.5",
        "ts-loader": "^9.5.2",
        typescript: "5.8.3",
        webpack: "^5.97.1",
        "webpack-cli": "^6.0.1"
      },
      engines: {
        node: ">=18"
      },
      homepage: "https://github.com/googleapis/google-cloud-node/tree/main/core/packages/nodejs-googleapis-common"
    };
  }
});

// node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/apirequest.js
var require_apirequest = __commonJS({
  "node_modules/@googleapis/gmail/node_modules/googleapis-common/build/src/apirequest.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createAPIRequest = createAPIRequest2;
    var gaxios_1 = require_src4();
    var qs = require_lib();
    var stream = __require("stream");
    var urlTemplate = require_url_template();
    var extend = require_extend();
    var isbrowser_1 = require_isbrowser();
    var h2 = require_http2();
    var util_1 = require_util4();
    var pkg = require_package4();
    var randomUUID = () => globalThis.crypto?.randomUUID() || __require("crypto").randomUUID();
    function isReadableStream(obj) {
      return obj !== null && typeof obj === "object" && typeof obj.pipe === "function" && obj.readable !== false && typeof obj._read === "function" && typeof obj._readableState === "object";
    }
    function getMissingParams(params, required) {
      const missing = new Array();
      required.forEach((param) => {
        if (params[param] === void 0) {
          missing.push(param);
        }
      });
      return missing.length > 0 ? missing : null;
    }
    function createAPIRequest2(parameters, callback) {
      if (callback) {
        createAPIRequestAsync(parameters).then((r2) => callback(null, r2), callback);
      } else {
        return createAPIRequestAsync(parameters);
      }
    }
    async function createAPIRequestAsync(parameters) {
      const options = extend(
        true,
        {},
        // Ensure we don't leak settings upstream
        parameters.context.google?._options || {},
        // Google level options
        parameters.context._options || {},
        // Per-API options
        parameters.options
      );
      const params = extend(
        true,
        {},
        // New base object
        options.params,
        // Combined global/per-api params
        parameters.params
      );
      options.userAgentDirectives = options.userAgentDirectives || [];
      const media = params.media || {};
      let resource = params.requestBody;
      if (!params.requestBody && params.resource && (!parameters.requiredParams.includes("resource") || typeof params.resource !== "string")) {
        resource = params.resource;
        delete params.resource;
      }
      delete params.requestBody;
      let authClient = params.auth || options.auth;
      const defaultMime = typeof media.body === "string" ? "text/plain" : "application/octet-stream";
      delete params.media;
      delete params.auth;
      const headers = (0, util_1.headersToClassicHeaders)(params.headers || {});
      populateAPIHeader(headers, options.apiVersion);
      delete params.headers;
      Object.keys(params).forEach((key) => {
        if (key.slice(-1) === "_") {
          const newKey = key.slice(0, -1);
          params[newKey] = params[key];
          delete params[key];
        }
      });
      const missingParams = getMissingParams(params, parameters.requiredParams);
      if (missingParams) {
        throw new Error("Missing required parameters: " + missingParams.join(", "));
      }
      if (options.url) {
        let url = options.url;
        if (typeof url === "object") {
          url = url.toString();
        }
        options.url = urlTemplate.parse(url).expand(params);
      }
      if (parameters.mediaUrl) {
        parameters.mediaUrl = urlTemplate.parse(parameters.mediaUrl).expand(params);
      }
      if (parameters.context._options.rootUrl !== void 0 && options.url !== void 0) {
        const originalUrl = new URL(options.url);
        const path2 = originalUrl.href.substr(originalUrl.origin.length);
        options.url = new URL(path2, parameters.context._options.rootUrl).href;
      }
      options.paramsSerializer = (params2) => {
        return qs.stringify(params2, { arrayFormat: "repeat" });
      };
      parameters.pathParams.forEach((param) => delete params[param]);
      if (typeof authClient === "string") {
        params.key = params.key || authClient;
        authClient = void 0;
      }
      function multipartUpload(multipart) {
        const boundary = randomUUID();
        const finale = `--${boundary}--`;
        const rStream = new stream.PassThrough({
          flush(callback) {
            this.push("\r\n");
            this.push(finale);
            callback();
          }
        });
        const pStream = new ProgressStream();
        const isStream = isReadableStream(multipart[1].body);
        headers["content-type"] = `multipart/related; boundary=${boundary}`;
        for (const part of multipart) {
          const preamble = `--${boundary}\r
content-type: ${part["content-type"]}\r
\r
`;
          rStream.push(preamble);
          if (typeof part.body === "string") {
            rStream.push(part.body);
            rStream.push("\r\n");
          } else {
            pStream.on("progress", (bytesRead) => {
              if (options.onUploadProgress) {
                options.onUploadProgress({ bytesRead });
              }
            });
            part.body.pipe(pStream).pipe(rStream);
          }
        }
        if (!isStream) {
          rStream.push(finale);
          rStream.push(null);
        }
        options.data = rStream;
      }
      function browserMultipartUpload(multipart) {
        const boundary = randomUUID();
        const finale = `--${boundary}--`;
        headers["content-type"] = `multipart/related; boundary=${boundary}`;
        let content = "";
        for (const part of multipart) {
          const preamble = `--${boundary}\r
content-type: ${part["content-type"]}\r
\r
`;
          content += preamble;
          if (typeof part.body === "string") {
            content += part.body;
            content += "\r\n";
          }
        }
        content += finale;
        options.data = content;
      }
      if (parameters.mediaUrl && media.body) {
        options.url = parameters.mediaUrl;
        if (resource) {
          params.uploadType = "multipart";
          const multipart = [
            { "content-type": "application/json", body: JSON.stringify(resource) },
            {
              "content-type": media.mimeType || resource && resource.mimeType || defaultMime,
              body: media.body
            }
          ];
          if (!(0, isbrowser_1.isBrowser)()) {
            multipartUpload(multipart);
          } else {
            browserMultipartUpload(multipart);
          }
        } else {
          params.uploadType = "media";
          Object.assign(headers, { "content-type": media.mimeType || defaultMime });
          options.data = media.body;
        }
      } else {
        options.data = resource || void 0;
      }
      options.headers = gaxios_1.Gaxios.mergeHeaders(options.headers || {}, headers);
      options.params = params;
      if (!(0, isbrowser_1.isBrowser)()) {
        options.headers.set("Accept-Encoding", "gzip");
        options.userAgentDirectives.push({
          product: "google-api-nodejs-client",
          version: pkg.version,
          comment: "gzip"
        });
        const userAgent = options.userAgentDirectives.map((d) => {
          let line = `${d.product}/${d.version}`;
          if (d.comment) {
            line += ` (${d.comment})`;
          }
          return line;
        }).join(" ");
        options.headers.set("User-Agent", userAgent);
      }
      if (!options.validateStatus) {
        options.validateStatus = (status) => {
          return status >= 200 && status < 300 || status === 304;
        };
      }
      options.retry = options.retry === void 0 ? true : options.retry;
      delete options.auth;
      if (options.universeDomain && options.universe_domain && options.universeDomain !== options.universe_domain) {
        throw new Error("Please set either universe_domain or universeDomain, but not both.");
      }
      const universeDomainEnvVar = typeof process === "object" && typeof process.env === "object" ? process.env["GOOGLE_CLOUD_UNIVERSE_DOMAIN"] : void 0;
      const universeDomain = options.universeDomain ?? options.universe_domain ?? universeDomainEnvVar ?? "googleapis.com";
      if (universeDomain !== "googleapis.com" && options.url) {
        const url = new URL(options.url);
        if (url.hostname.endsWith(".googleapis.com")) {
          url.hostname = url.hostname.replace(/googleapis\.com$/, universeDomain);
          options.url = url.toString();
        }
      }
      if (!Object.keys(options.params).length) {
        delete options.params;
        delete options.paramsSerializer;
      }
      if (authClient && typeof authClient === "object") {
        const universeFromAuth = typeof authClient.getUniverseDomain === "function" ? await authClient.getUniverseDomain() : void 0;
        if (universeFromAuth && universeDomain !== universeFromAuth) {
          throw new Error(`The configured universe domain (${universeDomain}) does not match the universe domain found in the credentials (${universeFromAuth}). If you haven't configured the universe domain explicitly, googleapis.com is the default.`);
        }
        if (options.http2) {
          const authHeaders = await authClient.getRequestHeaders(options.url);
          const mooOpts = Object.assign({}, options);
          mooOpts.headers = gaxios_1.Gaxios.mergeHeaders(mooOpts.headers, authHeaders);
          return h2.request(mooOpts);
        } else {
          const res = await authClient.request(options);
          return (0, util_1.marshallGaxiosResponse)(res);
        }
      } else {
        return new gaxios_1.Gaxios().request(options).then((res) => (0, util_1.marshallGaxiosResponse)(res));
      }
    }
    var ProgressStream = class extends stream.Transform {
      bytesRead = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _transform(chunk, encoding, callback) {
        this.bytesRead += chunk.length;
        this.emit("progress", this.bytesRead);
        this.push(chunk);
        callback();
      }
    };
    function populateAPIHeader(headers, apiVersion) {
      if (!(0, isbrowser_1.isBrowser)()) {
        headers["x-goog-api-client"] = `gdcl/${pkg.version} gl-node/${process.versions.node}`;
      }
      if (apiVersion) {
        headers["x-goog-api-version"] = apiVersion;
      }
    }
  }
});

// lean-google-runtime:common
var common_exports = {};
__export(common_exports, {
  createAPIRequest: () => import_apirequest.createAPIRequest,
  getAPI: () => import_apiIndex.getAPI
});
var import_apiIndex, import_apirequest;
var init_common = __esm({
  "lean-google-runtime:common"() {
    import_apiIndex = __toESM(require_apiIndex());
    import_apirequest = __toESM(require_apirequest());
  }
});

// node_modules/@googleapis/calendar/build/v3.js
var require_v3 = __commonJS({
  "node_modules/@googleapis/calendar/build/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.calendar_v3 = void 0;
    var googleapis_common_1 = (init_common(), __toCommonJS(common_exports));
    var calendar_v32;
    (function(calendar_v33) {
      class Calendar {
        context;
        acl;
        calendarList;
        calendars;
        channels;
        colors;
        events;
        freebusy;
        settings;
        constructor(options, google) {
          this.context = {
            _options: options || {},
            google
          };
          this.acl = new Resource$Acl(this.context);
          this.calendarList = new Resource$Calendarlist(this.context);
          this.calendars = new Resource$Calendars(this.context);
          this.channels = new Resource$Channels(this.context);
          this.colors = new Resource$Colors(this.context);
          this.events = new Resource$Events(this.context);
          this.freebusy = new Resource$Freebusy(this.context);
          this.settings = new Resource$Settings(this.context);
        }
      }
      calendar_v33.Calendar = Calendar;
      class Resource$Acl {
        context;
        constructor(context) {
          this.context = context;
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl/{ruleId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "ruleId"],
            pathParams: ["calendarId", "ruleId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl/{ruleId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "ruleId"],
            pathParams: ["calendarId", "ruleId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        insert(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl/{ruleId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "ruleId"],
            pathParams: ["calendarId", "ruleId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl/{ruleId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "ruleId"],
            pathParams: ["calendarId", "ruleId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/acl/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Acl = Resource$Acl;
      class Resource$Calendarlist {
        context;
        constructor(context) {
          this.context = context;
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        insert(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/calendarList/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Calendarlist = Resource$Calendarlist;
      class Resource$Calendars {
        context;
        constructor(context) {
          this.context = context;
        }
        clear(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/clear").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        insert(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        transferOwnership(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/transferOwnership").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "newDataOwner", "useAdminAccess"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Calendars = Resource$Calendars;
      class Resource$Channels {
        context;
        constructor(context) {
          this.context = context;
        }
        stop(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/channels/stop").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Channels = Resource$Channels;
      class Resource$Colors {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/colors").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Colors = Resource$Colors;
      class Resource$Events {
        context;
        constructor(context) {
          this.context = context;
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/{eventId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "eventId"],
            pathParams: ["calendarId", "eventId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/{eventId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "eventId"],
            pathParams: ["calendarId", "eventId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        import(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/import").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        insert(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        instances(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/{eventId}/instances").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "eventId"],
            pathParams: ["calendarId", "eventId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        move(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/{eventId}/move").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "eventId", "destination"],
            pathParams: ["calendarId", "eventId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/{eventId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "eventId"],
            pathParams: ["calendarId", "eventId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        quickAdd(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/quickAdd").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "text"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/{eventId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId", "eventId"],
            pathParams: ["calendarId", "eventId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/calendars/{calendarId}/events/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["calendarId"],
            pathParams: ["calendarId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Events = Resource$Events;
      class Resource$Freebusy {
        context;
        constructor(context) {
          this.context = context;
        }
        query(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/freeBusy").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Freebusy = Resource$Freebusy;
      class Resource$Settings {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/settings/{setting}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["setting"],
            pathParams: ["setting"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/settings").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/calendar/v3/users/me/settings/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      calendar_v33.Resource$Settings = Resource$Settings;
    })(calendar_v32 || (exports.calendar_v3 = calendar_v32 = {}));
  }
});

// node_modules/@googleapis/drive/build/v3.js
var require_v32 = __commonJS({
  "node_modules/@googleapis/drive/build/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drive_v3 = void 0;
    var googleapis_common_1 = (init_common(), __toCommonJS(common_exports));
    var drive_v32;
    (function(drive_v33) {
      class Drive {
        context;
        about;
        accessproposals;
        approvals;
        apps;
        changes;
        channels;
        comments;
        drives;
        files;
        operations;
        permissions;
        replies;
        revisions;
        teamdrives;
        constructor(options, google) {
          this.context = {
            _options: options || {},
            google
          };
          this.about = new Resource$About(this.context);
          this.accessproposals = new Resource$Accessproposals(this.context);
          this.approvals = new Resource$Approvals(this.context);
          this.apps = new Resource$Apps(this.context);
          this.changes = new Resource$Changes(this.context);
          this.channels = new Resource$Channels(this.context);
          this.comments = new Resource$Comments(this.context);
          this.drives = new Resource$Drives(this.context);
          this.files = new Resource$Files(this.context);
          this.operations = new Resource$Operations(this.context);
          this.permissions = new Resource$Permissions(this.context);
          this.replies = new Resource$Replies(this.context);
          this.revisions = new Resource$Revisions(this.context);
          this.teamdrives = new Resource$Teamdrives(this.context);
        }
      }
      drive_v33.Drive = Drive;
      class Resource$About {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/about").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$About = Resource$About;
      class Resource$Accessproposals {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/accessproposals/{proposalId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "proposalId"],
            pathParams: ["fileId", "proposalId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/accessproposals").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        resolve(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/accessproposals/{proposalId}:resolve").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "proposalId"],
            pathParams: ["fileId", "proposalId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Accessproposals = Resource$Accessproposals;
      class Resource$Approvals {
        context;
        constructor(context) {
          this.context = context;
        }
        approve(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals/{approvalId}:approve").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "approvalId"],
            pathParams: ["approvalId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        cancel(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals/{approvalId}:cancel").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "approvalId"],
            pathParams: ["approvalId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        comment(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals/{approvalId}:comment").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "approvalId"],
            pathParams: ["approvalId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        decline(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals/{approvalId}:decline").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "approvalId"],
            pathParams: ["approvalId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals/{approvalId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "approvalId"],
            pathParams: ["approvalId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        reassign(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals/{approvalId}:reassign").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "approvalId"],
            pathParams: ["approvalId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        start(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/approvals:start").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Approvals = Resource$Approvals;
      class Resource$Apps {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/apps/{appId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["appId"],
            pathParams: ["appId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/apps").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Apps = Resource$Apps;
      class Resource$Changes {
        context;
        constructor(context) {
          this.context = context;
        }
        getStartPageToken(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/changes/startPageToken").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/changes").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["pageToken"],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/changes/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["pageToken"],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Changes = Resource$Changes;
      class Resource$Channels {
        context;
        constructor(context) {
          this.context = context;
        }
        stop(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/channels/stop").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Channels = Resource$Channels;
      class Resource$Comments {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId"],
            pathParams: ["commentId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId"],
            pathParams: ["commentId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId"],
            pathParams: ["commentId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Comments = Resource$Comments;
      class Resource$Drives {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["requestId"],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives/{driveId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["driveId"],
            pathParams: ["driveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives/{driveId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["driveId"],
            pathParams: ["driveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        hide(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives/{driveId}/hide").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["driveId"],
            pathParams: ["driveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        unhide(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives/{driveId}/unhide").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["driveId"],
            pathParams: ["driveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/drives/{driveId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["driveId"],
            pathParams: ["driveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Drives = Resource$Drives;
      class Resource$Files {
        context;
        constructor(context) {
          this.context = context;
        }
        copy(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/copy").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/drive/v3/files").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        download(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/download").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        emptyTrash(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/trash").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        export(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/export").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "mimeType"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        generateCseToken(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/generateCseToken").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        generateIds(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/generateIds").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        listLabels(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/listLabels").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        modifyLabels(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/modifyLabels").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/drive/v3/files/{fileId}").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Files = Resource$Files;
      class Resource$Operations {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/operations/{name}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["name"],
            pathParams: ["name"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Operations = Resource$Operations;
      class Resource$Permissions {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/permissions").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/permissions/{permissionId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "permissionId"],
            pathParams: ["fileId", "permissionId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/permissions/{permissionId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "permissionId"],
            pathParams: ["fileId", "permissionId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/permissions").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/permissions/{permissionId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "permissionId"],
            pathParams: ["fileId", "permissionId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Permissions = Resource$Permissions;
      class Resource$Replies {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}/replies").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId"],
            pathParams: ["commentId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}/replies/{replyId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId", "replyId"],
            pathParams: ["commentId", "fileId", "replyId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}/replies/{replyId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId", "replyId"],
            pathParams: ["commentId", "fileId", "replyId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}/replies").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId"],
            pathParams: ["commentId", "fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/comments/{commentId}/replies/{replyId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "commentId", "replyId"],
            pathParams: ["commentId", "fileId", "replyId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Replies = Resource$Replies;
      class Resource$Revisions {
        context;
        constructor(context) {
          this.context = context;
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/revisions/{revisionId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "revisionId"],
            pathParams: ["fileId", "revisionId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/revisions/{revisionId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "revisionId"],
            pathParams: ["fileId", "revisionId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/revisions").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId"],
            pathParams: ["fileId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/files/{fileId}/revisions/{revisionId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["fileId", "revisionId"],
            pathParams: ["fileId", "revisionId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Revisions = Resource$Revisions;
      class Resource$Teamdrives {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/teamdrives").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["requestId"],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/teamdrives/{teamDriveId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["teamDriveId"],
            pathParams: ["teamDriveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/teamdrives/{teamDriveId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["teamDriveId"],
            pathParams: ["teamDriveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/teamdrives").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://www.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/drive/v3/teamdrives/{teamDriveId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["teamDriveId"],
            pathParams: ["teamDriveId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      drive_v33.Resource$Teamdrives = Resource$Teamdrives;
    })(drive_v32 || (exports.drive_v3 = drive_v32 = {}));
  }
});

// node_modules/@googleapis/docs/build/v1.js
var require_v1 = __commonJS({
  "node_modules/@googleapis/docs/build/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.docs_v1 = void 0;
    var googleapis_common_1 = (init_common(), __toCommonJS(common_exports));
    var docs_v12;
    (function(docs_v13) {
      class Docs {
        context;
        documents;
        constructor(options, google) {
          this.context = {
            _options: options || {},
            google
          };
          this.documents = new Resource$Documents(this.context);
        }
      }
      docs_v13.Docs = Docs;
      class Resource$Documents {
        context;
        constructor(context) {
          this.context = context;
        }
        batchUpdate(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://docs.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/v1/documents/{documentId}:batchUpdate").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["documentId"],
            pathParams: ["documentId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://docs.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/v1/documents").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: [],
            pathParams: [],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://docs.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/v1/documents/{documentId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["documentId"],
            pathParams: ["documentId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      docs_v13.Resource$Documents = Resource$Documents;
    })(docs_v12 || (exports.docs_v1 = docs_v12 = {}));
  }
});

// node_modules/@googleapis/gmail/build/v1.js
var require_v12 = __commonJS({
  "node_modules/@googleapis/gmail/build/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gmail_v1 = void 0;
    var googleapis_common_1 = (init_common(), __toCommonJS(common_exports));
    var gmail_v12;
    (function(gmail_v13) {
      class Gmail {
        context;
        users;
        constructor(options, google) {
          this.context = {
            _options: options || {},
            google
          };
          this.users = new Resource$Users(this.context);
        }
      }
      gmail_v13.Gmail = Gmail;
      class Resource$Users {
        context;
        drafts;
        history;
        labels;
        messages;
        settings;
        threads;
        constructor(context) {
          this.context = context;
          this.drafts = new Resource$Users$Drafts(this.context);
          this.history = new Resource$Users$History(this.context);
          this.labels = new Resource$Users$Labels(this.context);
          this.messages = new Resource$Users$Messages(this.context);
          this.settings = new Resource$Users$Settings(this.context);
          this.threads = new Resource$Users$Threads(this.context);
        }
        getProfile(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/profile").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        stop(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/stop").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        watch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/watch").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users = Resource$Users;
      class Resource$Users$Drafts {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/drafts").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/gmail/v1/users/{userId}/drafts").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/drafts/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/drafts/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/drafts").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        send(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/drafts/send").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/gmail/v1/users/{userId}/drafts/send").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/drafts/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/gmail/v1/users/{userId}/drafts/{id}").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Drafts = Resource$Users$Drafts;
      class Resource$Users$History {
        context;
        constructor(context) {
          this.context = context;
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/history").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$History = Resource$Users$History;
      class Resource$Users$Labels {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/labels").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/labels/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/labels/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/labels").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/labels/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/labels/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Labels = Resource$Users$Labels;
      class Resource$Users$Messages {
        context;
        attachments;
        constructor(context) {
          this.context = context;
          this.attachments = new Resource$Users$Messages$Attachments(this.context);
        }
        batchDelete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/batchDelete").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        batchModify(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/batchModify").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        import(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/import").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/gmail/v1/users/{userId}/messages/import").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        insert(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/gmail/v1/users/{userId}/messages").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        modify(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/{id}/modify").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        send(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/send").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            mediaUrl: (rootUrl + "/upload/gmail/v1/users/{userId}/messages/send").replace(/([^:]\/)\/+/g, "$1"),
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        trash(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/{id}/trash").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        untrash(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/{id}/untrash").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Messages = Resource$Users$Messages;
      class Resource$Users$Messages$Attachments {
        context;
        constructor(context) {
          this.context = context;
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/messages/{messageId}/attachments/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "messageId", "id"],
            pathParams: ["id", "messageId", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Messages$Attachments = Resource$Users$Messages$Attachments;
      class Resource$Users$Settings {
        context;
        cse;
        delegates;
        filters;
        forwardingAddresses;
        sendAs;
        constructor(context) {
          this.context = context;
          this.cse = new Resource$Users$Settings$Cse(this.context);
          this.delegates = new Resource$Users$Settings$Delegates(this.context);
          this.filters = new Resource$Users$Settings$Filters(this.context);
          this.forwardingAddresses = new Resource$Users$Settings$Forwardingaddresses(this.context);
          this.sendAs = new Resource$Users$Settings$Sendas(this.context);
        }
        getAutoForwarding(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/autoForwarding").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        getImap(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/imap").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        getLanguage(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/language").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        getPop(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/pop").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        getVacation(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/vacation").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        updateAutoForwarding(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/autoForwarding").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        updateImap(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/imap").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        updateLanguage(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/language").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        updatePop(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/pop").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        updateVacation(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/vacation").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings = Resource$Users$Settings;
      class Resource$Users$Settings$Cse {
        context;
        identities;
        keypairs;
        constructor(context) {
          this.context = context;
          this.identities = new Resource$Users$Settings$Cse$Identities(this.context);
          this.keypairs = new Resource$Users$Settings$Cse$Keypairs(this.context);
        }
      }
      gmail_v13.Resource$Users$Settings$Cse = Resource$Users$Settings$Cse;
      class Resource$Users$Settings$Cse$Identities {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/identities").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "cseEmailAddress"],
            pathParams: ["cseEmailAddress", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "cseEmailAddress"],
            pathParams: ["cseEmailAddress", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/identities").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/identities/{emailAddress}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "emailAddress"],
            pathParams: ["emailAddress", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Cse$Identities = Resource$Users$Settings$Cse$Identities;
      class Resource$Users$Settings$Cse$Keypairs {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/keypairs").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        disable(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:disable").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "keyPairId"],
            pathParams: ["keyPairId", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        enable(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:enable").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "keyPairId"],
            pathParams: ["keyPairId", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "keyPairId"],
            pathParams: ["keyPairId", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/keypairs").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        obliterate(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:obliterate").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "keyPairId"],
            pathParams: ["keyPairId", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Cse$Keypairs = Resource$Users$Settings$Cse$Keypairs;
      class Resource$Users$Settings$Delegates {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/delegates").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/delegates/{delegateEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "delegateEmail"],
            pathParams: ["delegateEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/delegates/{delegateEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "delegateEmail"],
            pathParams: ["delegateEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/delegates").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Delegates = Resource$Users$Settings$Delegates;
      class Resource$Users$Settings$Filters {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/filters").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/filters/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/filters/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/filters").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Filters = Resource$Users$Settings$Filters;
      class Resource$Users$Settings$Forwardingaddresses {
        context;
        constructor(context) {
          this.context = context;
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/forwardingAddresses").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "forwardingEmail"],
            pathParams: ["forwardingEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "forwardingEmail"],
            pathParams: ["forwardingEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/forwardingAddresses").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Forwardingaddresses = Resource$Users$Settings$Forwardingaddresses;
      class Resource$Users$Settings$Sendas {
        context;
        smimeInfo;
        constructor(context) {
          this.context = context;
          this.smimeInfo = new Resource$Users$Settings$Sendas$Smimeinfo(this.context);
        }
        create(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        patch(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PATCH",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        update(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}").replace(/([^:]\/)\/+/g, "$1"),
              method: "PUT",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        verify(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/verify").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Sendas = Resource$Users$Settings$Sendas;
      class Resource$Users$Settings$Sendas$Smimeinfo {
        context;
        constructor(context) {
          this.context = context;
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail", "id"],
            pathParams: ["id", "sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail", "id"],
            pathParams: ["id", "sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        insert(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail"],
            pathParams: ["sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        setDefault(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}/setDefault").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "sendAsEmail", "id"],
            pathParams: ["id", "sendAsEmail", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Settings$Sendas$Smimeinfo = Resource$Users$Settings$Sendas$Smimeinfo;
      class Resource$Users$Threads {
        context;
        constructor(context) {
          this.context = context;
        }
        delete(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/threads/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "DELETE",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        get(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/threads/{id}").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        list(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/threads").replace(/([^:]\/)\/+/g, "$1"),
              method: "GET",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId"],
            pathParams: ["userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        modify(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/threads/{id}/modify").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        trash(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/threads/{id}/trash").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
        untrash(paramsOrCallback, optionsOrCallback, callback) {
          let params = paramsOrCallback || {};
          let options = optionsOrCallback || {};
          if (typeof paramsOrCallback === "function") {
            callback = paramsOrCallback;
            params = {};
            options = {};
          }
          if (typeof optionsOrCallback === "function") {
            callback = optionsOrCallback;
            options = {};
          }
          const rootUrl = options.rootUrl || "https://gmail.googleapis.com/";
          const parameters = {
            options: Object.assign({
              url: (rootUrl + "/gmail/v1/users/{userId}/threads/{id}/untrash").replace(/([^:]\/)\/+/g, "$1"),
              method: "POST",
              apiVersion: ""
            }, options),
            params,
            requiredParams: ["userId", "id"],
            pathParams: ["id", "userId"],
            context: this.context
          };
          if (callback) {
            (0, googleapis_common_1.createAPIRequest)(parameters, callback);
          } else {
            return (0, googleapis_common_1.createAPIRequest)(parameters);
          }
        }
      }
      gmail_v13.Resource$Users$Threads = Resource$Users$Threads;
    })(gmail_v12 || (exports.gmail_v1 = gmail_v12 = {}));
  }
});

// src/accounts/registry.ts
import { readFile as readFile2, rename, writeFile } from "node:fs/promises";
import { join as join2 } from "node:path";

// src/config.ts
import { chmod, mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";
async function resolveHome() {
  const override = process.env.EXFU_MULTIACCOUNT_HOME?.trim();
  const home = override ? resolve(override) : join(homedir(), ".exfu-multiaccount");
  await mkdir(join(home, "tokens"), { recursive: true, mode: 448 });
  await Promise.all([
    chmod(home, 448),
    chmod(join(home, "tokens"), 448)
  ]);
  return home;
}
async function loadConfig() {
  const home = await resolveHome();
  const configPath = join(home, "config.json");
  let parsed;
  try {
    parsed = JSON.parse(await readFile(configPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing config file at ${configPath}.`);
    }
    throw new Error(`Could not read config file at ${configPath}.`);
  }
  if (typeof parsed !== "object" || parsed === null || typeof parsed.googleClientSecretPath !== "string" || !parsed.googleClientSecretPath.trim()) {
    throw new Error("config.json must contain a non-empty googleClientSecretPath string.");
  }
  const configuredPath = parsed.googleClientSecretPath.trim();
  return {
    googleClientSecretPath: isAbsolute(configuredPath) ? configuredPath : resolve(home, configuredPath)
  };
}

// src/accounts/registry.ts
var ALIAS_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function validateAlias(alias) {
  if (!ALIAS_PATTERN.test(alias)) {
    throw new Error(
      `Invalid account alias "${alias}". Use lowercase kebab-case (for example, work or personal-mail).`
    );
  }
}
function metadataOnlyAccount(account) {
  if (typeof account !== "object" || account === null) {
    throw new Error("Invalid account registry entry.");
  }
  validateAlias(account.alias);
  if (account.provider !== "google") {
    throw new Error(`Unsupported provider for account "${account.alias}".`);
  }
  if (typeof account.email !== "string" || !account.email || !Array.isArray(account.scopes) || account.scopes.some((scope) => typeof scope !== "string") || typeof account.addedAt !== "string" || !account.addedAt || account.extraInfo !== void 0 && typeof account.extraInfo !== "string") {
    throw new Error(`Invalid registry entry for account "${account.alias}".`);
  }
  return {
    alias: account.alias,
    provider: account.provider,
    email: account.email,
    scopes: [...account.scopes],
    ...account.extraInfo !== void 0 ? { extraInfo: account.extraInfo } : {},
    addedAt: account.addedAt
  };
}
async function loadAccounts() {
  const home = await resolveHome();
  try {
    const value = JSON.parse(await readFile2(join2(home, "accounts.json"), "utf8"));
    if (!Array.isArray(value)) {
      throw new Error("Account registry must contain an array.");
    }
    const accounts = value.map(metadataOnlyAccount);
    const aliases = /* @__PURE__ */ new Set();
    for (const account of accounts) {
      if (aliases.has(account.alias)) {
        throw new Error(`Duplicate account alias "${account.alias}" in registry.`);
      }
      aliases.add(account.alias);
    }
    return accounts;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    if (error instanceof SyntaxError) {
      throw new Error("Account registry contains invalid JSON.");
    }
    throw error;
  }
}
async function saveAccounts(accounts) {
  const aliases = /* @__PURE__ */ new Set();
  const metadata = accounts.map(metadataOnlyAccount);
  for (const account of metadata) {
    if (aliases.has(account.alias)) {
      throw new Error(`Account alias "${account.alias}" already exists.`);
    }
    aliases.add(account.alias);
  }
  const home = await resolveHome();
  const registryPath = join2(home, "accounts.json");
  const temporaryPath = join2(home, `.accounts-${process.pid}-${Date.now()}.tmp`);
  await writeFile(temporaryPath, `${JSON.stringify(metadata, null, 2)}
`, { mode: 384 });
  await rename(temporaryPath, registryPath);
}
async function addAccount(account) {
  const accounts = await loadAccounts();
  validateAlias(account.alias);
  if (accounts.some((candidate) => candidate.alias === account.alias)) {
    throw new Error(`Account alias "${account.alias}" already exists.`);
  }
  await saveAccounts([...accounts, account]);
  return account;
}
async function updateAccountScopes(alias, scopes) {
  validateAlias(alias);
  const accounts = await loadAccounts();
  if (!accounts.some((account) => account.alias === alias)) {
    return;
  }
  await saveAccounts(
    accounts.map(
      (account) => account.alias === alias ? { ...account, scopes: [...scopes] } : account
    )
  );
}
async function removeAccount(alias) {
  validateAlias(alias);
  const accounts = await loadAccounts();
  const remaining = accounts.filter((account) => account.alias !== alias);
  if (remaining.length === accounts.length) {
    return false;
  }
  await saveAccounts(remaining);
  return true;
}

// src/accounts/encryptedTokens.ts
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { chmod as chmod3, readFile as readFile4, rename as rename3, rm as rm2, writeFile as writeFile3 } from "node:fs/promises";
import { join as join4 } from "node:path";

// src/accounts/tokens.ts
import { chmod as chmod2, readFile as readFile3, rename as rename2, rm, writeFile as writeFile2 } from "node:fs/promises";
import { join as join3 } from "node:path";
var FileTokenStore = class {
  async tokenPath(alias) {
    validateAlias(alias);
    return join3(await resolveHome(), "tokens", `${alias}.json`);
  }
  async get(alias) {
    const path2 = await this.tokenPath(alias);
    try {
      const value = JSON.parse(await readFile3(path2, "utf8"));
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        throw new Error(`Stored credentials for account "${alias}" are invalid.`);
      }
      return value;
    } catch (error) {
      if (error.code === "ENOENT") {
        return null;
      }
      if (error instanceof SyntaxError) {
        throw new Error(`Stored credentials for account "${alias}" are invalid.`);
      }
      throw error;
    }
  }
  async set(alias, tokens) {
    const path2 = await this.tokenPath(alias);
    const temporaryPath = `${path2}.${process.pid}.${Date.now()}.tmp`;
    await writeFile2(temporaryPath, `${JSON.stringify(tokens, null, 2)}
`, { mode: 384 });
    await chmod2(temporaryPath, 384);
    await rename2(temporaryPath, path2);
    await chmod2(path2, 384);
  }
  async delete(alias) {
    await rm(await this.tokenPath(alias), { force: true });
  }
};

// src/accounts/encryptedTokens.ts
var IV_LENGTH = 12;
var AUTH_TAG_LENGTH = 16;
function validateTokens(value, alias) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw decryptionError(alias);
  }
  return value;
}
function decryptionError(alias) {
  return new Error(
    `Encrypted credentials for account "${alias}" could not be authenticated. Re-authorize with add-account ${alias}.`
  );
}
var EncryptedFileTokenStore = class {
  constructor(keyProvider) {
    this.keyProvider = keyProvider;
  }
  async tokenPaths(alias) {
    validateAlias(alias);
    const tokenDirectory = join4(await resolveHome(), "tokens");
    return {
      encrypted: join4(tokenDirectory, `${alias}.json.enc`),
      plaintext: join4(tokenDirectory, `${alias}.json`)
    };
  }
  async key() {
    const key = await this.keyProvider.getKey();
    if (key.length !== 32) {
      throw new Error("The token encryption key must be exactly 32 bytes.");
    }
    return key;
  }
  async readEncrypted(alias, path2) {
    const payload = await readFile4(path2);
    if (payload.length < IV_LENGTH + AUTH_TAG_LENGTH) {
      throw decryptionError(alias);
    }
    const iv = payload.subarray(0, IV_LENGTH);
    const authTag = payload.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const ciphertext = payload.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
    const key = await this.key();
    try {
      const decipher = createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(authTag);
      const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
      return validateTokens(JSON.parse(plaintext.toString("utf8")), alias);
    } catch {
      throw decryptionError(alias);
    }
  }
  async get(alias) {
    const paths = await this.tokenPaths(alias);
    try {
      return await this.readEncrypted(alias, paths.encrypted);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
    const plaintextStore = new FileTokenStore();
    const tokens = await plaintextStore.get(alias);
    if (!tokens) {
      return null;
    }
    await this.set(alias, tokens);
    await rm2(paths.plaintext, { force: true });
    return this.readEncrypted(alias, paths.encrypted);
  }
  async set(alias, tokens) {
    const { encrypted: path2, plaintext } = await this.tokenPaths(alias);
    const key = await this.key();
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const ciphertext = Buffer.concat([
      cipher.update(JSON.stringify(tokens), "utf8"),
      cipher.final()
    ]);
    const payload = Buffer.concat([iv, cipher.getAuthTag(), ciphertext]);
    const temporaryPath = `${path2}.${process.pid}.${Date.now()}.${randomBytes(6).toString("hex")}.tmp`;
    await writeFile3(temporaryPath, payload, { mode: 384 });
    await chmod3(temporaryPath, 384);
    await rename3(temporaryPath, path2);
    await chmod3(path2, 384);
    await rm2(plaintext, { force: true });
  }
  async delete(alias) {
    const paths = await this.tokenPaths(alias);
    await Promise.all([
      rm2(paths.encrypted, { force: true }),
      rm2(paths.plaintext, { force: true })
    ]);
  }
};

// src/accounts/keyProvider.ts
import { execFile } from "node:child_process";
import { randomBytes as randomBytes2 } from "node:crypto";
var SECURITY_PATH = "/usr/bin/security";
var SERVICE = "exfu-multiaccount";
var ACCOUNT = "token-key";
function runSecurity(args) {
  return new Promise((resolve2, reject) => {
    execFile(SECURITY_PATH, args, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve2(stdout);
    });
  });
}
function isNotFound(error) {
  const failure = error;
  const stderr = typeof failure?.stderr === "string" ? failure.stderr.toLowerCase() : "";
  return failure?.code === 44 || stderr.includes("could not be found") || stderr.includes("item not found");
}
function decodeKey(value) {
  const hex = value.trim();
  if (!/^[0-9a-f]{64}$/i.test(hex)) {
    throw new Error("The ExFu token encryption key in macOS Keychain is invalid.");
  }
  return Buffer.from(hex, "hex");
}
var MacKeychainKeyProvider = class {
  keyPromise;
  getKey() {
    this.keyPromise ??= this.loadOrCreateKey();
    return this.keyPromise;
  }
  async loadOrCreateKey() {
    try {
      return decodeKey(
        await runSecurity([
          "find-generic-password",
          "-s",
          SERVICE,
          "-a",
          ACCOUNT,
          "-w"
        ])
      );
    } catch (error) {
      if (!isNotFound(error)) {
        if (error instanceof Error && error.message.includes("Keychain is invalid")) {
          throw error;
        }
        throw new Error("Could not access the ExFu token encryption key in macOS Keychain.");
      }
    }
    const key = randomBytes2(32);
    try {
      await runSecurity([
        "add-generic-password",
        "-U",
        "-s",
        SERVICE,
        "-a",
        ACCOUNT,
        "-w",
        key.toString("hex")
      ]);
    } catch {
      throw new Error("Could not store the ExFu token encryption key in macOS Keychain.");
    }
    return key;
  }
};

// src/accounts/storeFactory.ts
function createTokenStore() {
  if (process.platform !== "darwin" || process.env.EXFU_MULTIACCOUNT_PLAIN_TOKENS === "1") {
    return new FileTokenStore();
  }
  return new EncryptedFileTokenStore(new MacKeychainKeyProvider());
}

// src/providers/google/auth.ts
import { randomBytes as randomBytes3 } from "node:crypto";
import { readFile as readFile5 } from "node:fs/promises";
import { createServer } from "node:http";

// lean-google-runtime:auth
var import_oauth2client = __toESM(require_oauth2client());

// node_modules/open/index.js
import process8 from "node:process";
import { Buffer as Buffer4 } from "node:buffer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify as promisify6 } from "node:util";
import childProcess from "node:child_process";
import fs6, { constants as fsConstants2 } from "node:fs/promises";

// node_modules/wsl-utils/index.js
import process3 from "node:process";
import fs5, { constants as fsConstants } from "node:fs/promises";

// node_modules/is-wsl/index.js
import process2 from "node:process";
import os from "node:os";
import fs4 from "node:fs";

// node_modules/is-inside-container/index.js
import fs3 from "node:fs";

// node_modules/is-docker/index.js
import fs2 from "node:fs";
var isDockerCached;
function hasDockerEnv() {
  try {
    fs2.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
function hasDockerCGroup() {
  try {
    return fs2.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
function isDocker() {
  if (isDockerCached === void 0) {
    isDockerCached = hasDockerEnv() || hasDockerCGroup();
  }
  return isDockerCached;
}

// node_modules/is-inside-container/index.js
var cachedResult;
var hasContainerEnv = () => {
  try {
    fs3.statSync("/run/.containerenv");
    return true;
  } catch {
    return false;
  }
};
function isInsideContainer() {
  if (cachedResult === void 0) {
    cachedResult = hasContainerEnv() || isDocker();
  }
  return cachedResult;
}

// node_modules/is-wsl/index.js
var isWsl = () => {
  if (process2.platform !== "linux") {
    return false;
  }
  if (os.release().toLowerCase().includes("microsoft")) {
    if (isInsideContainer()) {
      return false;
    }
    return true;
  }
  try {
    if (fs4.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft")) {
      return !isInsideContainer();
    }
  } catch {
  }
  if (fs4.existsSync("/proc/sys/fs/binfmt_misc/WSLInterop") || fs4.existsSync("/run/WSL")) {
    return !isInsideContainer();
  }
  return false;
};
var is_wsl_default = process2.env.__IS_WSL_TEST__ ? isWsl : isWsl();

// node_modules/wsl-utils/index.js
var wslDrivesMountPoint = /* @__PURE__ */ (() => {
  const defaultMountPoint = "/mnt/";
  let mountPoint;
  return async function() {
    if (mountPoint) {
      return mountPoint;
    }
    const configFilePath = "/etc/wsl.conf";
    let isConfigFileExists = false;
    try {
      await fs5.access(configFilePath, fsConstants.F_OK);
      isConfigFileExists = true;
    } catch {
    }
    if (!isConfigFileExists) {
      return defaultMountPoint;
    }
    const configContent = await fs5.readFile(configFilePath, { encoding: "utf8" });
    const configMountPoint = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(configContent);
    if (!configMountPoint) {
      return defaultMountPoint;
    }
    mountPoint = configMountPoint.groups.mountPoint.trim();
    mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`;
    return mountPoint;
  };
})();
var powerShellPathFromWsl = async () => {
  const mountPoint = await wslDrivesMountPoint();
  return `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`;
};
var powerShellPath = async () => {
  if (is_wsl_default) {
    return powerShellPathFromWsl();
  }
  return `${process3.env.SYSTEMROOT || process3.env.windir || String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;
};

// node_modules/define-lazy-prop/index.js
function defineLazyProperty(object, propertyName, valueGetter) {
  const define2 = (value) => Object.defineProperty(object, propertyName, { value, enumerable: true, writable: true });
  Object.defineProperty(object, propertyName, {
    configurable: true,
    enumerable: true,
    get() {
      const result = valueGetter();
      define2(result);
      return result;
    },
    set(value) {
      define2(value);
    }
  });
  return object;
}

// node_modules/default-browser/index.js
import { promisify as promisify5 } from "node:util";
import process7 from "node:process";
import { execFile as execFile5 } from "node:child_process";

// node_modules/default-browser-id/index.js
import { promisify as promisify2 } from "node:util";
import process4 from "node:process";
import { execFile as execFile2 } from "node:child_process";
var execFileAsync = promisify2(execFile2);
async function defaultBrowserId() {
  if (process4.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const { stdout } = await execFileAsync("defaults", ["read", "com.apple.LaunchServices/com.apple.launchservices.secure", "LSHandlers"]);
  const match = /LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(stdout);
  const browserId = match?.groups.id ?? "com.apple.Safari";
  if (browserId === "com.apple.safari") {
    return "com.apple.Safari";
  }
  return browserId;
}

// node_modules/run-applescript/index.js
import process5 from "node:process";
import { promisify as promisify3 } from "node:util";
import { execFile as execFile3, execFileSync } from "node:child_process";
var execFileAsync2 = promisify3(execFile3);
async function runAppleScript(script, { humanReadableOutput = true, signal } = {}) {
  if (process5.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const outputArguments = humanReadableOutput ? [] : ["-ss"];
  const execOptions = {};
  if (signal) {
    execOptions.signal = signal;
  }
  const { stdout } = await execFileAsync2("osascript", ["-e", script, outputArguments], execOptions);
  return stdout.trim();
}

// node_modules/bundle-name/index.js
async function bundleName(bundleId) {
  return runAppleScript(`tell application "Finder" to set app_path to application file id "${bundleId}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}

// node_modules/default-browser/windows.js
import process6 from "node:process";
import { promisify as promisify4 } from "node:util";
import { execFile as execFile4 } from "node:child_process";
var execFileAsync3 = promisify4(execFile4);
var windowsBrowserProgIds = {
  MSEdgeHTM: { name: "Edge", id: "com.microsoft.edge" },
  // The missing `L` is correct.
  MSEdgeBHTML: { name: "Edge Beta", id: "com.microsoft.edge.beta" },
  MSEdgeDHTML: { name: "Edge Dev", id: "com.microsoft.edge.dev" },
  AppXq0fevzme2pys62n3e0fbqa7peapykr8v: { name: "Edge", id: "com.microsoft.edge.old" },
  ChromeHTML: { name: "Chrome", id: "com.google.chrome" },
  ChromeBHTML: { name: "Chrome Beta", id: "com.google.chrome.beta" },
  ChromeDHTML: { name: "Chrome Dev", id: "com.google.chrome.dev" },
  ChromiumHTM: { name: "Chromium", id: "org.chromium.Chromium" },
  BraveHTML: { name: "Brave", id: "com.brave.Browser" },
  BraveBHTML: { name: "Brave Beta", id: "com.brave.Browser.beta" },
  BraveDHTML: { name: "Brave Dev", id: "com.brave.Browser.dev" },
  BraveSSHTM: { name: "Brave Nightly", id: "com.brave.Browser.nightly" },
  FirefoxURL: { name: "Firefox", id: "org.mozilla.firefox" },
  OperaStable: { name: "Opera", id: "com.operasoftware.Opera" },
  VivaldiHTM: { name: "Vivaldi", id: "com.vivaldi.Vivaldi" },
  "IE.HTTP": { name: "Internet Explorer", id: "com.microsoft.ie" }
};
var _windowsBrowserProgIdMap = new Map(Object.entries(windowsBrowserProgIds));
var UnknownBrowserError = class extends Error {
};
async function defaultBrowser(_execFileAsync = execFileAsync3) {
  const regPath = `${process6.env.SYSTEMROOT ?? process6.env.windir ?? "C:\\Windows"}\\System32\\reg.exe`;
  const { stdout } = await _execFileAsync(regPath, [
    "QUERY",
    " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
    "/v",
    "ProgId"
  ]);
  const match = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(stdout);
  if (!match) {
    throw new UnknownBrowserError(`Cannot find Windows browser in stdout: ${JSON.stringify(stdout)}`);
  }
  const { id } = match.groups;
  const dotIndex = id.lastIndexOf(".");
  const hyphenIndex = id.lastIndexOf("-");
  const baseIdByDot = dotIndex === -1 ? void 0 : id.slice(0, dotIndex);
  const baseIdByHyphen = hyphenIndex === -1 ? void 0 : id.slice(0, hyphenIndex);
  return windowsBrowserProgIds[id] ?? windowsBrowserProgIds[baseIdByDot] ?? windowsBrowserProgIds[baseIdByHyphen] ?? { name: id, id };
}

// node_modules/default-browser/index.js
var execFileAsync4 = promisify5(execFile5);
var titleize = (string) => string.toLowerCase().replaceAll(/(?:^|\s|-)\S/g, (x2) => x2.toUpperCase());
async function defaultBrowser2() {
  if (process7.platform === "darwin") {
    const id = await defaultBrowserId();
    const name = await bundleName(id);
    return { name, id };
  }
  if (process7.platform === "linux") {
    const { stdout } = await execFileAsync4("xdg-mime", ["query", "default", "x-scheme-handler/http"]);
    const id = stdout.trim();
    const name = titleize(id.replace(/.desktop$/, "").replace("-", " "));
    return { name, id };
  }
  if (process7.platform === "win32") {
    return defaultBrowser();
  }
  throw new Error("Only macOS, Linux, and Windows are supported");
}

// node_modules/open/index.js
var execFile6 = promisify6(childProcess.execFile);
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var localXdgOpenPath = path.join(__dirname, "xdg-open");
var { platform, arch } = process8;
async function getWindowsDefaultBrowserFromWsl() {
  const powershellPath = await powerShellPath();
  const rawCommand = String.raw`(Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice").ProgId`;
  const encodedCommand = Buffer4.from(rawCommand, "utf16le").toString("base64");
  const { stdout } = await execFile6(
    powershellPath,
    [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand",
      encodedCommand
    ],
    { encoding: "utf8" }
  );
  const progId = stdout.trim();
  const browserMap = {
    ChromeHTML: "com.google.chrome",
    BraveHTML: "com.brave.Browser",
    MSEdgeHTM: "com.microsoft.edge",
    FirefoxURL: "org.mozilla.firefox"
  };
  return browserMap[progId] ? { id: browserMap[progId] } : {};
}
var pTryEach = async (array, mapper) => {
  let latestError;
  for (const item of array) {
    try {
      return await mapper(item);
    } catch (error) {
      latestError = error;
    }
  }
  throw latestError;
};
var baseOpen = async (options) => {
  options = {
    wait: false,
    background: false,
    newInstance: false,
    allowNonzeroExitCode: false,
    ...options
  };
  if (Array.isArray(options.app)) {
    return pTryEach(options.app, (singleApp) => baseOpen({
      ...options,
      app: singleApp
    }));
  }
  let { name: app, arguments: appArguments = [] } = options.app ?? {};
  appArguments = [...appArguments];
  if (Array.isArray(app)) {
    return pTryEach(app, (appName) => baseOpen({
      ...options,
      app: {
        name: appName,
        arguments: appArguments
      }
    }));
  }
  if (app === "browser" || app === "browserPrivate") {
    const ids = {
      "com.google.chrome": "chrome",
      "google-chrome.desktop": "chrome",
      "com.brave.Browser": "brave",
      "org.mozilla.firefox": "firefox",
      "firefox.desktop": "firefox",
      "com.microsoft.msedge": "edge",
      "com.microsoft.edge": "edge",
      "com.microsoft.edgemac": "edge",
      "microsoft-edge.desktop": "edge"
    };
    const flags = {
      chrome: "--incognito",
      brave: "--incognito",
      firefox: "--private-window",
      edge: "--inPrivate"
    };
    const browser = is_wsl_default ? await getWindowsDefaultBrowserFromWsl() : await defaultBrowser2();
    if (browser.id in ids) {
      const browserName = ids[browser.id];
      if (app === "browserPrivate") {
        appArguments.push(flags[browserName]);
      }
      return baseOpen({
        ...options,
        app: {
          name: apps[browserName],
          arguments: appArguments
        }
      });
    }
    throw new Error(`${browser.name} is not supported as a default browser`);
  }
  let command;
  const cliArguments = [];
  const childProcessOptions = {};
  if (platform === "darwin") {
    command = "open";
    if (options.wait) {
      cliArguments.push("--wait-apps");
    }
    if (options.background) {
      cliArguments.push("--background");
    }
    if (options.newInstance) {
      cliArguments.push("--new");
    }
    if (app) {
      cliArguments.push("-a", app);
    }
  } else if (platform === "win32" || is_wsl_default && !isInsideContainer() && !app) {
    command = await powerShellPath();
    cliArguments.push(
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    );
    if (!is_wsl_default) {
      childProcessOptions.windowsVerbatimArguments = true;
    }
    const encodedArguments = ["Start"];
    if (options.wait) {
      encodedArguments.push("-Wait");
    }
    if (app) {
      encodedArguments.push(`"\`"${app}\`""`);
      if (options.target) {
        appArguments.push(options.target);
      }
    } else if (options.target) {
      encodedArguments.push(`"${options.target}"`);
    }
    if (appArguments.length > 0) {
      appArguments = appArguments.map((argument) => `"\`"${argument}\`""`);
      encodedArguments.push("-ArgumentList", appArguments.join(","));
    }
    options.target = Buffer4.from(encodedArguments.join(" "), "utf16le").toString("base64");
  } else {
    if (app) {
      command = app;
    } else {
      const isBundled = !__dirname || __dirname === "/";
      let exeLocalXdgOpen = false;
      try {
        await fs6.access(localXdgOpenPath, fsConstants2.X_OK);
        exeLocalXdgOpen = true;
      } catch {
      }
      const useSystemXdgOpen = process8.versions.electron ?? (platform === "android" || isBundled || !exeLocalXdgOpen);
      command = useSystemXdgOpen ? "xdg-open" : localXdgOpenPath;
    }
    if (appArguments.length > 0) {
      cliArguments.push(...appArguments);
    }
    if (!options.wait) {
      childProcessOptions.stdio = "ignore";
      childProcessOptions.detached = true;
    }
  }
  if (platform === "darwin" && appArguments.length > 0) {
    cliArguments.push("--args", ...appArguments);
  }
  if (options.target) {
    cliArguments.push(options.target);
  }
  const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
  if (options.wait) {
    return new Promise((resolve2, reject) => {
      subprocess.once("error", reject);
      subprocess.once("close", (exitCode) => {
        if (!options.allowNonzeroExitCode && exitCode > 0) {
          reject(new Error(`Exited with code ${exitCode}`));
          return;
        }
        resolve2(subprocess);
      });
    });
  }
  subprocess.unref();
  return subprocess;
};
var open = (target, options) => {
  if (typeof target !== "string") {
    throw new TypeError("Expected a `target`");
  }
  return baseOpen({
    ...options,
    target
  });
};
function detectArchBinary(binary) {
  if (typeof binary === "string" || Array.isArray(binary)) {
    return binary;
  }
  const { [arch]: archBinary } = binary;
  if (!archBinary) {
    throw new Error(`${arch} is not supported`);
  }
  return archBinary;
}
function detectPlatformBinary({ [platform]: platformBinary }, { wsl }) {
  if (wsl && is_wsl_default) {
    return detectArchBinary(wsl);
  }
  if (!platformBinary) {
    throw new Error(`${platform} is not supported`);
  }
  return detectArchBinary(platformBinary);
}
var apps = {};
defineLazyProperty(apps, "chrome", () => detectPlatformBinary({
  darwin: "google chrome",
  win32: "chrome",
  linux: ["google-chrome", "google-chrome-stable", "chromium"]
}, {
  wsl: {
    ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
  }
}));
defineLazyProperty(apps, "brave", () => detectPlatformBinary({
  darwin: "brave browser",
  win32: "brave",
  linux: ["brave-browser", "brave"]
}, {
  wsl: {
    ia32: "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe",
    x64: ["/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe"]
  }
}));
defineLazyProperty(apps, "firefox", () => detectPlatformBinary({
  darwin: "firefox",
  win32: String.raw`C:\Program Files\Mozilla Firefox\firefox.exe`,
  linux: "firefox"
}, {
  wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
}));
defineLazyProperty(apps, "edge", () => detectPlatformBinary({
  darwin: "microsoft edge",
  win32: "msedge",
  linux: ["microsoft-edge", "microsoft-edge-dev"]
}, {
  wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
}));
defineLazyProperty(apps, "browser", () => "browser");
defineLazyProperty(apps, "browserPrivate", () => "browserPrivate");
var open_default = open;

// src/providers/google/auth.ts
var GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/calendar.events"
];
async function readClientDefinition(path2) {
  let value;
  try {
    value = JSON.parse(await readFile5(path2, "utf8"));
  } catch {
    throw new Error(`Could not read the Google OAuth client file at ${path2}.`);
  }
  const definition = value.installed ?? value.web;
  if (!definition?.client_id || !definition.client_secret) {
    throw new Error("The Google OAuth client file is missing client_id or client_secret.");
  }
  return { client_id: definition.client_id, client_secret: definition.client_secret };
}
function attachTokenPersistence(client, alias, initialTokens, tokenStore) {
  let currentTokens = initialTokens;
  client.on("tokens", (tokens) => {
    currentTokens = { ...currentTokens, ...tokens };
    void tokenStore.set(alias, currentTokens).catch(() => void 0);
  });
}
async function authorizeGoogleAccount(alias, config, tokenStore = createTokenStore()) {
  const activeConfig = config ?? await loadConfig();
  const definition = await readClientDefinition(activeConfig.googleClientSecretPath);
  const state = randomBytes3(24).toString("hex");
  const callbackPath = "/oauth2callback";
  let settleCode;
  let rejectCode;
  const codePromise = new Promise((resolve2, reject) => {
    settleCode = resolve2;
    rejectCode = reject;
  });
  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    if (requestUrl.pathname !== callbackPath) {
      response.writeHead(404).end("Not found");
      return;
    }
    if (requestUrl.searchParams.get("state") !== state) {
      response.writeHead(400).end("Invalid OAuth state. You can close this tab.");
      rejectCode?.(new Error("Google authorization returned an invalid state."));
      return;
    }
    const oauthError = requestUrl.searchParams.get("error");
    const code = requestUrl.searchParams.get("code");
    if (oauthError || !code) {
      response.writeHead(400).end("Google authorization was not completed. You can close this tab.");
      rejectCode?.(new Error("Google authorization was not completed."));
      return;
    }
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("ExFu authorization complete. You can close this tab.");
    settleCode?.(code);
  });
  await new Promise((resolve2, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve2);
  });
  const address = server.address();
  const redirectUri = `http://127.0.0.1:${address.port}${callbackPath}`;
  const client = new import_oauth2client.OAuth2Client(
    definition.client_id,
    definition.client_secret,
    redirectUri
  );
  const authorizationUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_SCOPES,
    state
  });
  const timeout = setTimeout(
    () => rejectCode?.(new Error("Google authorization timed out. Run add-account again.")),
    5 * 60 * 1e3
  );
  timeout.unref();
  try {
    await open_default(authorizationUrl);
    const code = await codePromise;
    const { tokens } = await client.getToken(code);
    if (!tokens.refresh_token) {
      throw new Error("Google did not return a refresh token. Revoke access and run add-account again.");
    }
    await tokenStore.set(alias, tokens);
    await updateAccountScopes(alias, GOOGLE_SCOPES);
    client.setCredentials(tokens);
    attachTokenPersistence(client, alias, tokens, tokenStore);
    return client;
  } finally {
    clearTimeout(timeout);
    await new Promise((resolve2) => server.close(() => resolve2()));
  }
}

// selected-google-api:@googleapis/calendar
init_common();
var import_v3 = __toESM(require_v3());
var versions = { v3: import_v3.calendar_v3.Calendar };

// selected-google-api:@googleapis/drive
init_common();
var import_v32 = __toESM(require_v32());
var versions2 = { v3: import_v32.drive_v3.Drive };

// selected-google-api:@googleapis/docs
init_common();
var import_v1 = __toESM(require_v1());
var versions3 = { v1: import_v1.docs_v1.Docs };

// selected-google-api:@googleapis/gmail
init_common();
var import_v12 = __toESM(require_v12());
var versions4 = { v1: import_v12.gmail_v1.Gmail };
function gmail(versionOrOptions) {
  return (0, import_apiIndex.getAPI)("gmail", versionOrOptions, versions4, this);
}

// src/providers/google/gmail.ts
var DRAFT_ATTACHMENT_TOTAL_LIMIT_BYTES = 20 * 1024 * 1024;
function gmailClient(client) {
  return gmail({
    version: "v1",
    auth: client
  });
}
async function getProfileEmail(client) {
  const response = await gmailClient(client).users.getProfile({ userId: "me" });
  if (!response.data.emailAddress) {
    throw new Error("Google did not return an email address for the authorized account.");
  }
  return response.data.emailAddress;
}

// src/tools.ts
async function accountsList() {
  return loadAccounts();
}
async function accountsAdd(alias, extraInfo) {
  validateAlias(alias);
  if ((await loadAccounts()).some((account) => account.alias === alias)) {
    throw new Error(`Account alias "${alias}" already exists.`);
  }
  const config = await loadConfig();
  const tokenStore = createTokenStore();
  const client = await authorizeGoogleAccount(alias, config, tokenStore);
  try {
    const email = await getProfileEmail(client);
    return await addAccount({
      alias,
      provider: "google",
      email,
      scopes: [...GOOGLE_SCOPES],
      ...extraInfo?.trim() ? { extraInfo: extraInfo.trim() } : {},
      addedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    await tokenStore.delete(alias);
    if (error instanceof Error && error.message.startsWith("Google did not return")) {
      throw error;
    }
    const cause = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Could not verify the authorized Google account: ${cause} (stored tokens for "${alias}" were removed; fix the cause and run add-account again)`
    );
  }
}
async function accountsRemove(alias) {
  validateAlias(alias);
  const removed = await removeAccount(alias);
  await createTokenStore().delete(alias);
  return removed;
}

// src/cli.ts
function usage() {
  return [
    "Usage:",
    '  exfu-multiaccount add-account <alias> [--info "text"]',
    "  exfu-multiaccount list-accounts",
    "  exfu-multiaccount remove-account <alias>"
  ].join("\n");
}
async function main(args) {
  const [command, ...rest] = args;
  if (command === "list-accounts") {
    if (rest.length) {
      throw new Error(usage());
    }
    const accounts = await accountsList();
    console.log(JSON.stringify({ count: accounts.length, accounts }, null, 2));
    return;
  }
  if (command === "add-account") {
    const alias = rest[0];
    if (!alias) {
      throw new Error(usage());
    }
    let extraInfo;
    if (rest.length > 1) {
      if (rest[1] !== "--info" || !rest[2] || rest.length !== 3) {
        throw new Error(usage());
      }
      extraInfo = rest[2];
    }
    const account = await accountsAdd(alias, extraInfo);
    console.log(`Added ${account.alias} (${account.email}) with read-only Gmail access.`);
    return;
  }
  if (command === "remove-account") {
    const alias = rest[0];
    if (!alias || rest.length !== 1) {
      throw new Error(usage());
    }
    const removed = await accountsRemove(alias);
    console.log(removed ? `Removed account ${alias}.` : `Account ${alias} was not configured.`);
    return;
  }
  throw new Error(usage());
}
try {
  await main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : "Command failed.");
  process.exitCode = 1;
}
