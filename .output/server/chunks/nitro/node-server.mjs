globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=2592000, immutable"}}}},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.node.req.url?.endsWith(".json") || event.node.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-hRKwHVKGnNKdNGP0igsS89HRUeA\"",
    "mtime": "2023-02-18T22:09:35.661Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"423-gPHncAEYlNTn110F/5wT3If8Mik\"",
    "mtime": "2023-02-18T22:09:35.660Z",
    "size": 1059,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-256x256.png": {
    "type": "image/png",
    "etag": "\"53a-4vdSfHFXg8EIoq5Forp2rhosYGg\"",
    "mtime": "2023-02-18T22:09:35.659Z",
    "size": 1338,
    "path": "../public/android-chrome-256x256.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"40b-B0I2ck1oWE75bgolmanFBj4DNeM\"",
    "mtime": "2023-02-18T22:09:35.658Z",
    "size": 1035,
    "path": "../public/apple-touch-icon.png"
  },
  "/browserconfig.xml": {
    "type": "application/xml",
    "etag": "\"f6-l0rqGL2lqVgCwGuAEmqx2W2R1wg\"",
    "mtime": "2023-02-18T22:09:35.658Z",
    "size": 246,
    "path": "../public/browserconfig.xml"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"2b8-svSBTErz5Db9p7gYhctFBrl5nII\"",
    "mtime": "2023-02-18T22:09:35.657Z",
    "size": 696,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"2f6-lYrBlDu4dA8m+3e+Iilx/2IYmO0\"",
    "mtime": "2023-02-18T22:09:35.656Z",
    "size": 758,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-isO3KRvzKQPi98HYHpgTICDY+3U\"",
    "mtime": "2023-02-18T22:09:35.655Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/mstile-150x150.png": {
    "type": "image/png",
    "etag": "\"41b-UgFwXU6EFcGe81cF0puz95U1Gk4\"",
    "mtime": "2023-02-18T22:09:35.641Z",
    "size": 1051,
    "path": "../public/mstile-150x150.png"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1aa-gQgM+NcI4ur00/2GgzHCrq0e7W0\"",
    "mtime": "2023-02-18T22:09:35.639Z",
    "size": 426,
    "path": "../public/site.webmanifest"
  },
  "/_nuxt/blank.86102afc.js": {
    "type": "application/javascript",
    "etag": "\"e2-nOqIdFixg8aQp4XNjZY6cAGi2MQ\"",
    "mtime": "2023-02-18T22:09:35.638Z",
    "size": 226,
    "path": "../public/_nuxt/blank.86102afc.js"
  },
  "/_nuxt/color.473bc8ca.png": {
    "type": "image/png",
    "etag": "\"2873-/0xLyyIHiRspL1RO202p0t9dRc8\"",
    "mtime": "2023-02-18T22:09:35.637Z",
    "size": 10355,
    "path": "../public/_nuxt/color.473bc8ca.png"
  },
  "/_nuxt/components.8ebbd2b7.js": {
    "type": "application/javascript",
    "etag": "\"b3f-6HW1huSIKrknrq6IwqCBQV7YCMc\"",
    "mtime": "2023-02-18T22:09:35.637Z",
    "size": 2879,
    "path": "../public/_nuxt/components.8ebbd2b7.js"
  },
  "/_nuxt/composables.c6dd7e23.js": {
    "type": "application/javascript",
    "etag": "\"61-QRwP8XdC5Xvs/PZZbuzR1V+cHbI\"",
    "mtime": "2023-02-18T22:09:35.636Z",
    "size": 97,
    "path": "../public/_nuxt/composables.c6dd7e23.js"
  },
  "/_nuxt/default.f6ff0ef2.js": {
    "type": "application/javascript",
    "etag": "\"51a-tg+xl9Hj83DAT/qIseZiI5KYM00\"",
    "mtime": "2023-02-18T22:09:35.636Z",
    "size": 1306,
    "path": "../public/_nuxt/default.f6ff0ef2.js"
  },
  "/_nuxt/default.fb55ceb4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b-87oQYGT0DKyboPWmCnjVVIzNrwM\"",
    "mtime": "2023-02-18T22:09:35.635Z",
    "size": 43,
    "path": "../public/_nuxt/default.fb55ceb4.css"
  },
  "/_nuxt/demo.6e460b98.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"94d-ozO7phpa7W5yjjvn7M5NH4YvVh0\"",
    "mtime": "2023-02-18T22:09:35.635Z",
    "size": 2381,
    "path": "../public/_nuxt/demo.6e460b98.css"
  },
  "/_nuxt/demo.97ae7d2e.js": {
    "type": "application/javascript",
    "etag": "\"1a29-NRDQKIccr2oBz7YndHwFcgzd08s\"",
    "mtime": "2023-02-18T22:09:35.634Z",
    "size": 6697,
    "path": "../public/_nuxt/demo.97ae7d2e.js"
  },
  "/_nuxt/entry.2a1b120d.js": {
    "type": "application/javascript",
    "etag": "\"4c894-dYOanL1yGmF3O8iE7Gr1AmCRAT0\"",
    "mtime": "2023-02-18T22:09:35.634Z",
    "size": 313492,
    "path": "../public/_nuxt/entry.2a1b120d.js"
  },
  "/_nuxt/entry.45b229dc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9242e-jcfREhVeqau4mX8EKHoNlkhvV1A\"",
    "mtime": "2023-02-18T22:09:35.632Z",
    "size": 599086,
    "path": "../public/_nuxt/entry.45b229dc.css"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-02-18T22:09:35.631Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.809c14db.js": {
    "type": "application/javascript",
    "etag": "\"8cf-qsYdb2AQ+tIDfn4yILEYz7flu1M\"",
    "mtime": "2023-02-18T22:09:35.630Z",
    "size": 2255,
    "path": "../public/_nuxt/error-404.809c14db.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-02-18T22:09:35.630Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.d7356e18.js": {
    "type": "application/javascript",
    "etag": "\"77d-8PcsGxTNoo7C+LI3IERZsRbPNdg\"",
    "mtime": "2023-02-18T22:09:35.629Z",
    "size": 1917,
    "path": "../public/_nuxt/error-500.d7356e18.js"
  },
  "/_nuxt/error-component.d869fee5.js": {
    "type": "application/javascript",
    "etag": "\"49e-fpgsa1R6a99qkQ+6b89ZrHcGYt8\"",
    "mtime": "2023-02-18T22:09:35.629Z",
    "size": 1182,
    "path": "../public/_nuxt/error-component.d869fee5.js"
  },
  "/_nuxt/index.8fb3ab75.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13-vMlib/YSscBbOiX4oZ3mEXvhoTM\"",
    "mtime": "2023-02-18T22:09:35.628Z",
    "size": 19,
    "path": "../public/_nuxt/index.8fb3ab75.css"
  },
  "/_nuxt/index.ff699623.js": {
    "type": "application/javascript",
    "etag": "\"253-C6b9MxzpAa2bTYmgWScpKF+jaeI\"",
    "mtime": "2023-02-18T22:09:35.628Z",
    "size": 595,
    "path": "../public/_nuxt/index.ff699623.js"
  },
  "/_nuxt/logo.daded9d8.js": {
    "type": "application/javascript",
    "etag": "\"67-9fJ/6xGHWUtnH+HvrAmLECZH6aY\"",
    "mtime": "2023-02-18T22:09:35.627Z",
    "size": 103,
    "path": "../public/_nuxt/logo.daded9d8.js"
  },
  "/_nuxt/primeicons.131bc3bf.ttf": {
    "type": "font/ttf",
    "etag": "\"11a0c-zutG1ZT95cxQfN+LcOOOeP5HZTw\"",
    "mtime": "2023-02-18T22:09:35.627Z",
    "size": 72204,
    "path": "../public/_nuxt/primeicons.131bc3bf.ttf"
  },
  "/_nuxt/primeicons.3824be50.woff2": {
    "type": "font/woff2",
    "etag": "\"75e4-VaSypfAuNiQF2Nh0kDrwtfamwV0\"",
    "mtime": "2023-02-18T22:09:35.626Z",
    "size": 30180,
    "path": "../public/_nuxt/primeicons.3824be50.woff2"
  },
  "/_nuxt/primeicons.5e10f102.svg": {
    "type": "image/svg+xml",
    "etag": "\"4727e-0zMqRSQrj27b8/PHF2ooDn7c2WE\"",
    "mtime": "2023-02-18T22:09:35.625Z",
    "size": 291454,
    "path": "../public/_nuxt/primeicons.5e10f102.svg"
  },
  "/_nuxt/primeicons.90a58d3a.woff": {
    "type": "font/woff",
    "etag": "\"11a58-sWSLUL4TNQ/ei12ab+eDVN3MQ+Q\"",
    "mtime": "2023-02-18T22:09:35.624Z",
    "size": 72280,
    "path": "../public/_nuxt/primeicons.90a58d3a.woff"
  },
  "/_nuxt/primeicons.ce852338.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"11abc-5N8jVcQFzTiq2jbtqQFagQ/quUw\"",
    "mtime": "2023-02-18T22:09:35.623Z",
    "size": 72380,
    "path": "../public/_nuxt/primeicons.ce852338.eot"
  },
  "/_nuxt/roboto-v20-latin-ext_latin-500.d092ad8e.woff": {
    "type": "font/woff",
    "etag": "\"7194-/1ITtppcYsOjO9/Ncbm+Eh5YWNs\"",
    "mtime": "2023-02-18T22:09:35.623Z",
    "size": 29076,
    "path": "../public/_nuxt/roboto-v20-latin-ext_latin-500.d092ad8e.woff"
  },
  "/_nuxt/roboto-v20-latin-ext_latin-500.fa074f87.woff2": {
    "type": "font/woff2",
    "etag": "\"58cc-YmbPzL0ygWMM1Lptff2VOZkmhIA\"",
    "mtime": "2023-02-18T22:09:35.622Z",
    "size": 22732,
    "path": "../public/_nuxt/roboto-v20-latin-ext_latin-500.fa074f87.woff2"
  },
  "/_nuxt/roboto-v20-latin-ext_latin-700.8d9364a0.woff2": {
    "type": "font/woff2",
    "etag": "\"58c4-eJ1iJwZdXZdnvAlOj7OEomAJyd4\"",
    "mtime": "2023-02-18T22:09:35.621Z",
    "size": 22724,
    "path": "../public/_nuxt/roboto-v20-latin-ext_latin-700.8d9364a0.woff2"
  },
  "/_nuxt/roboto-v20-latin-ext_latin-700.e24c2752.woff": {
    "type": "font/woff",
    "etag": "\"71a4-R5UKWomKZi/xEMUtK1PZ0/XiJM8\"",
    "mtime": "2023-02-18T22:09:35.621Z",
    "size": 29092,
    "path": "../public/_nuxt/roboto-v20-latin-ext_latin-700.e24c2752.woff"
  },
  "/_nuxt/roboto-v20-latin-ext_latin-regular.b86b128b.woff2": {
    "type": "font/woff2",
    "etag": "\"5874-o5zTOiRX0So+th4IQckbc+SvkKw\"",
    "mtime": "2023-02-18T22:09:35.620Z",
    "size": 22644,
    "path": "../public/_nuxt/roboto-v20-latin-ext_latin-regular.b86b128b.woff2"
  },
  "/_nuxt/roboto-v20-latin-ext_latin-regular.e70a908b.woff": {
    "type": "font/woff",
    "etag": "\"7170-xXTWR7v5QSuCsM3LDnAqOpP/0CI\"",
    "mtime": "2023-02-18T22:09:35.619Z",
    "size": 29040,
    "path": "../public/_nuxt/roboto-v20-latin-ext_latin-regular.e70a908b.woff"
  },
  "/images/H.png": {
    "type": "image/png",
    "etag": "\"eb1-YPMisXrQHbOp/gYU2g/pDUr8JeY\"",
    "mtime": "2023-02-18T22:09:35.653Z",
    "size": 3761,
    "path": "../public/images/H.png"
  },
  "/images/box1.png": {
    "type": "image/png",
    "etag": "\"1f9b6-OsLUbgjYz6cQHgvXVB69OLnGqvI\"",
    "mtime": "2023-02-18T22:09:35.652Z",
    "size": 129462,
    "path": "../public/images/box1.png"
  },
  "/images/box2.png": {
    "type": "image/png",
    "etag": "\"2b1b9-APCqcclvrz5aJW/HyVkVnv0ZPE8\"",
    "mtime": "2023-02-18T22:09:35.651Z",
    "size": 176569,
    "path": "../public/images/box2.png"
  },
  "/images/header-background.png": {
    "type": "image/png",
    "etag": "\"2a14-MHVL6g9xUCAeoionlfdqOwFq3IY\"",
    "mtime": "2023-02-18T22:09:35.650Z",
    "size": 10772,
    "path": "../public/images/header-background.png"
  },
  "/images/hero.jpg": {
    "type": "image/jpeg",
    "etag": "\"6753-8b4gQxOwsx5H1dSb9ouzZadiofg\"",
    "mtime": "2023-02-18T22:09:35.649Z",
    "size": 26451,
    "path": "../public/images/hero.jpg"
  },
  "/images/home-hero.jpg": {
    "type": "image/jpeg",
    "etag": "\"1adce-It6rGH0Rt6f7QONOe7FwWLoWZwM\"",
    "mtime": "2023-02-18T22:09:35.646Z",
    "size": 110030,
    "path": "../public/images/home-hero.jpg"
  },
  "/images/logo.png": {
    "type": "image/png",
    "etag": "\"52e4-/PnnoSUx8qz78E599eG287RYymk\"",
    "mtime": "2023-02-18T22:09:35.643Z",
    "size": 21220,
    "path": "../public/images/logo.png"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":2592000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_bBzqw5 = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_bBzqw5, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_bBzqw5, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
