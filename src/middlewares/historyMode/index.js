"use strict";
/**
 * koa2的一个中间件,用于处理vue-router使用history模式返回index.html
 * 原程序是bripkens作者的connect-history-api-fallback,这里只是修改兼容Koa2而已
 * https://github.com/bripkens/connect-history-api-fallback
 * 注:该中间件提取自koa2-connect-history-api-fallback,此处只是稍作修改,在此对该插件作者表示感谢
 */
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
function evaluateRewriteRule(parsedUrl, match, rule) {
  if (typeof rule === "string") {
    return rule;
  } else if (typeof rule !== "function") {
    throw new Error("Rewrite rule can only be of type string of function.");
  }
  return rule({
    parsedUrl: parsedUrl,
    match: match
  });
}
function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ["text/html", "*/*"];
  for (var i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}
function getLogger(options) {
  if (options && options.logger) {
    return options.logger;
  } else if (options && options.verbose) {
    return console.log.bind(console);
  }
  return Function();
}
var historyMode = function(options) {
  var _this = this;
  var logger = getLogger(options);
  return function(ctx, next) {
    return __awaiter(_this, void 0, void 0, function() {
      var isFlag_1, parsedUrl, rewriteTarget, i, rewrite, match;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (ctx.method !== "GET") {
              logger(
                "Not rewriting",
                ctx.method,
                ctx.url,
                "because the method is not GET."
              );
              return [2 /*return*/, next()];
            } else if (!ctx.header || typeof ctx.header.accept !== "string") {
              logger(
                "Not rewriting",
                ctx.method,
                ctx.url,
                "because the client did not send an HTTP accept header."
              );
              return [2 /*return*/, next()];
            } else if (ctx.header.accept.indexOf("application/json") === 0) {
              logger(
                "Not rewriting",
                ctx.method,
                ctx.url,
                "because the client prefers JSON."
              );
              return [2 /*return*/, next()];
            } else if (!acceptsHtml(ctx.header.accept, options)) {
              logger(
                "Not rewriting",
                ctx.method,
                ctx.url,
                "because the client does not accept HTML."
              );
              return [2 /*return*/, next()];
            }
            // white list check
            if (options.whiteList) {
              isFlag_1 = false;
              options.whiteList.forEach(function(item) {
                if (!isFlag_1) isFlag_1 = new RegExp(item).test(ctx.url);
              });
              if (isFlag_1) return [2 /*return*/, next()];
            }
            parsedUrl = url.parse(ctx.url);
            options.rewrites = options.rewrites || [];
            for (i = 0; i < options.rewrites.length; i++) {
              rewrite = options.rewrites[i];
              match = parsedUrl.pathname.match(rewrite.from);
              if (match !== null) {
                rewriteTarget = evaluateRewriteRule(
                  parsedUrl,
                  match,
                  rewrite.to
                );
                logger("Rewriting", ctx.method, ctx.url, "to", rewriteTarget);
                ctx.url = rewriteTarget;
                return [2 /*return*/, next()];
              }
            }
            if (
              parsedUrl.pathname.indexOf(".") !== -1 &&
              options.disableDotRule !== true
            ) {
              logger(
                "Not rewriting",
                ctx.method,
                ctx.url,
                "because the path includes a dot (.) character."
              );
              return [2 /*return*/, next()];
            }
            rewriteTarget = options.index || "/index.html";
            logger("Rewriting", ctx.method, ctx.url, "to", rewriteTarget);
            ctx.url = rewriteTarget;
            return [4 /*yield*/, next()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
};

module.exports = historyMode;
//# sourceMappingURL=index.js.map
