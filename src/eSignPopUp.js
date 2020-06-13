!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var i = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 1));
})([
  function (e, t, n) {
    "use strict";
    var r,
      i = "object" == typeof Reflect ? Reflect : null,
      o =
        i && "function" == typeof i.apply
          ? i.apply
          : function (e, t, n) {
              return Function.prototype.apply.call(e, t, n);
            };
    r =
      i && "function" == typeof i.ownKeys
        ? i.ownKeys
        : Object.getOwnPropertySymbols
        ? function (e) {
            return Object.getOwnPropertyNames(e).concat(
              Object.getOwnPropertySymbols(e)
            );
          }
        : function (e) {
            return Object.getOwnPropertyNames(e);
          };
    var s =
      Number.isNaN ||
      function (e) {
        return e != e;
      };
    function u() {
      u.init.call(this);
    }
    (e.exports = u),
      (u.EventEmitter = u),
      (u.prototype._events = void 0),
      (u.prototype._eventsCount = 0),
      (u.prototype._maxListeners = void 0);
    var c = 10;
    function a(e) {
      if ("function" != typeof e)
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof e
        );
    }
    function f(e) {
      return void 0 === e._maxListeners
        ? u.defaultMaxListeners
        : e._maxListeners;
    }
    function p(e, t, n, r) {
      var i, o, s, u;
      if (
        (a(n),
        void 0 === (o = e._events)
          ? ((o = e._events = Object.create(null)), (e._eventsCount = 0))
          : (void 0 !== o.newListener &&
              (e.emit("newListener", t, n.listener ? n.listener : n),
              (o = e._events)),
            (s = o[t])),
        void 0 === s)
      )
        (s = o[t] = n), ++e._eventsCount;
      else if (
        ("function" == typeof s
          ? (s = o[t] = r ? [n, s] : [s, n])
          : r
          ? s.unshift(n)
          : s.push(n),
        (i = f(e)) > 0 && s.length > i && !s.warned)
      ) {
        s.warned = !0;
        var c = new Error(
          "Possible EventEmitter memory leak detected. " +
            s.length +
            " " +
            String(t) +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (c.name = "MaxListenersExceededWarning"),
          (c.emitter = e),
          (c.type = t),
          (c.count = s.length),
          (u = c),
          console && console.warn && console.warn(u);
      }
      return e;
    }
    function l() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          0 === arguments.length
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function h(e, t, n) {
      var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n },
        i = l.bind(r);
      return (i.listener = n), (r.wrapFn = i), i;
    }
    function d(e, t, n) {
      var r = e._events;
      if (void 0 === r) return [];
      var i = r[t];
      return void 0 === i
        ? []
        : "function" == typeof i
        ? n
          ? [i.listener || i]
          : [i]
        : n
        ? (function (e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
              t[n] = e[n].listener || e[n];
            return t;
          })(i)
        : y(i, i.length);
    }
    function v(e) {
      var t = this._events;
      if (void 0 !== t) {
        var n = t[e];
        if ("function" == typeof n) return 1;
        if (void 0 !== n) return n.length;
      }
      return 0;
    }
    function y(e, t) {
      for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
      return n;
    }
    Object.defineProperty(u, "defaultMaxListeners", {
      enumerable: !0,
      get: function () {
        return c;
      },
      set: function (e) {
        if ("number" != typeof e || e < 0 || s(e))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              e +
              "."
          );
        c = e;
      },
    }),
      (u.init = function () {
        (void 0 !== this._events &&
          this._events !== Object.getPrototypeOf(this)._events) ||
          ((this._events = Object.create(null)), (this._eventsCount = 0)),
          (this._maxListeners = this._maxListeners || void 0);
      }),
      (u.prototype.setMaxListeners = function (e) {
        if ("number" != typeof e || e < 0 || s(e))
          throw new RangeError(
            'The value of "n" is out of range. It must be a non-negative number. Received ' +
              e +
              "."
          );
        return (this._maxListeners = e), this;
      }),
      (u.prototype.getMaxListeners = function () {
        return f(this);
      }),
      (u.prototype.emit = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
        var r = "error" === e,
          i = this._events;
        if (void 0 !== i) r = r && void 0 === i.error;
        else if (!r) return !1;
        if (r) {
          var s;
          if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
          var u = new Error(
            "Unhandled error." + (s ? " (" + s.message + ")" : "")
          );
          throw ((u.context = s), u);
        }
        var c = i[e];
        if (void 0 === c) return !1;
        if ("function" == typeof c) o(c, this, t);
        else {
          var a = c.length,
            f = y(c, a);
          for (n = 0; n < a; ++n) o(f[n], this, t);
        }
        return !0;
      }),
      (u.prototype.addListener = function (e, t) {
        return p(this, e, t, !1);
      }),
      (u.prototype.on = u.prototype.addListener),
      (u.prototype.prependListener = function (e, t) {
        return p(this, e, t, !0);
      }),
      (u.prototype.once = function (e, t) {
        return a(t), this.on(e, h(this, e, t)), this;
      }),
      (u.prototype.prependOnceListener = function (e, t) {
        return a(t), this.prependListener(e, h(this, e, t)), this;
      }),
      (u.prototype.removeListener = function (e, t) {
        var n, r, i, o, s;
        if ((a(t), void 0 === (r = this._events))) return this;
        if (void 0 === (n = r[e])) return this;
        if (n === t || n.listener === t)
          0 == --this._eventsCount
            ? (this._events = Object.create(null))
            : (delete r[e],
              r.removeListener &&
                this.emit("removeListener", e, n.listener || t));
        else if ("function" != typeof n) {
          for (i = -1, o = n.length - 1; o >= 0; o--)
            if (n[o] === t || n[o].listener === t) {
              (s = n[o].listener), (i = o);
              break;
            }
          if (i < 0) return this;
          0 === i
            ? n.shift()
            : (function (e, t) {
                for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                e.pop();
              })(n, i),
            1 === n.length && (r[e] = n[0]),
            void 0 !== r.removeListener &&
              this.emit("removeListener", e, s || t);
        }
        return this;
      }),
      (u.prototype.off = u.prototype.removeListener),
      (u.prototype.removeAllListeners = function (e) {
        var t, n, r;
        if (void 0 === (n = this._events)) return this;
        if (void 0 === n.removeListener)
          return (
            0 === arguments.length
              ? ((this._events = Object.create(null)), (this._eventsCount = 0))
              : void 0 !== n[e] &&
                (0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : delete n[e]),
            this
          );
        if (0 === arguments.length) {
          var i,
            o = Object.keys(n);
          for (r = 0; r < o.length; ++r)
            "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
          return (
            this.removeAllListeners("removeListener"),
            (this._events = Object.create(null)),
            (this._eventsCount = 0),
            this
          );
        }
        if ("function" == typeof (t = n[e])) this.removeListener(e, t);
        else if (void 0 !== t)
          for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
        return this;
      }),
      (u.prototype.listeners = function (e) {
        return d(this, e, !0);
      }),
      (u.prototype.rawListeners = function (e) {
        return d(this, e, !1);
      }),
      (u.listenerCount = function (e, t) {
        return "function" == typeof e.listenerCount
          ? e.listenerCount(t)
          : v.call(e, t);
      }),
      (u.prototype.listenerCount = v),
      (u.prototype.eventNames = function () {
        return this._eventsCount > 0 ? r(this._events) : [];
      });
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "OpenEsignPopUP", function () {
        return d;
      });
    var r = n(0);
    function i(e) {
      return (i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function u(e, t, n) {
      return t && s(e.prototype, t), n && s(e, n), e;
    }
    function c(e, t) {
      return (c =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function a(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = l(e);
        if (t) {
          var i = l(this).constructor;
          n = Reflect.construct(r, arguments, i);
        } else n = r.apply(this, arguments);
        return f(this, n);
      };
    }
    function f(e, t) {
      return !t || ("object" !== i(t) && "function" != typeof t) ? p(e) : t;
    }
    function p(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function l(e) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    var h = (function (e) {
        !(function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && c(e, t);
        })(n, e);
        var t = a(n);
        function n() {
          var e;
          return (
            o(this, n),
            ((e = t.call(this)).bindMessageEvent = e.bindMessageEvent.bind(
              p(e)
            )),
            (e.isMobile = e.isMobile.bind(p(e))),
            (e.EsignMessage = e.EsignMessage.bind(p(e))),
            (e.handleError = e.handleError.bind(p(e))),
            (e.handleSuccess = e.handleSuccess.bind(p(e))),
            (e.checkForWindowStatus = e.checkForWindowStatus.bind(p(e))),
            (e.startCheckingWinStatus = e.startCheckingWinStatus.bind(p(e))),
            (e.popupCenter = e.popupCenter.bind(p(e))),
            (e.popup = !1),
            (e.defaultOptions = { height: 850, width: 450 }),
            (e.userCompletedSteps = !1),
            e
          );
        }
        return (
          u(n, [
            {
              key: "startCheckingWinStatus",
              value: function () {
                var e = this.checkForWindowStatus;
                this.handle = setInterval(e, 5e3);
              },
            },
            {
              key: "checkForWindowStatus",
              value: function () {
                var e = this.handle;
                if (
                  this.popup.closed &&
                  (clearInterval(e), !this.userCompletedSteps)
                ) {
                  this.emit("error", {
                    data: { error: "POPUP_CLOSED" },
                    status_code: 433,
                    message:
                      "User closed the popup window before process completed",
                    success: !1,
                  });
                }
              },
            },
            {
              key: "isMobile",
              value: function () {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              },
            },
            {
              key: "handleSuccess",
              value: function (e) {
                (this.userCompletedSteps = !0),
                  this.popup.close(),
                  this.emit("success", e);
              },
            },
            {
              key: "handleError",
              value: function (e) {
                (this.userCompletedSteps = !0),
                  this.popup.close(),
                  this.emit("error", e);
              },
            },
            {
              key: "EsignMessage",
              value: function (e) {
                try {
                  var t = JSON.parse(e.data);
                  200 === t.status
                    ? this.handleSuccess(t)
                    : this.handleError(t);
                } catch (e) {
                  console.log(e);
                }
              },
            },
            {
              key: "bindMessageEvent",
              value: function () {
                var e = this.EsignMessage;
                window.addEventListener("message", e, !1);
              },
            },
            {
              key: "popupCenter",
              value: function (e, t, n, r) {
                var i = window.screen.width / 2 - n / 2,
                  o = window.screen.height / 2 - r / 2;
                (this.popup = window.open(
                  e,
                  t,
                  "toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=" +
                    n +
                    ", height=" +
                    r +
                    ", top=" +
                    o +
                    ", left=" +
                    i
                )),
                  window.focus && this.popup.focus();
              },
            },
            {
              key: "openWindow",
              value: function (e, t, n) {
                var r = n || this.defaultOptions;
                if (this.popup || this.popup.closed) this.popup.focus();
                else if (e)
                  if (this.isMobile())
                    try {
                      (this.popup = window.open(e + "&mobile=true")),
                        this.bindMessageEvent(),
                        this.startCheckingWinStatus();
                    } catch (e) {
                      this.emit("error", "Couldn't open new Window");
                    }
                  else
                    this.popupCenter(e, t, r.width, r.height),
                      this.bindMessageEvent(),
                      this.startCheckingWinStatus();
                else this.emit("error", "Please provide a valid url");
              },
            },
          ]),
          n
        );
      })(n.n(r).a),
      d = (function () {
        function e(t) {
          o(this, e),
            (this.Esign = new h()),
            (this.token = t.token),
            (this.windowName = t.window_name),
            (this.options = t.dimension);
        }
        return (
          u(e, [
            {
              key: "openWindow",
              value: function (e, t) {
                var n = this.token,
                  r = "https://esign-client.surepass.io/?token=".concat(n);
                this.Esign.openWindow(r, this.windowName, this.options),
                  this.Esign.on("error", function (e) {
                    return t(e);
                  }),
                  this.Esign.on("success", function (t) {
                    return e(t);
                  });
              },
            },
          ]),
          e
        );
      })();
    t.default = d;
  },
]);
