"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var surepassEsign = function (_EventEmitter) {
  _inherits(surepassEsign, _EventEmitter);

  function surepassEsign() {
    _classCallCheck(this, surepassEsign);

    var _this = _possibleConstructorReturn(this, (surepassEsign.__proto__ || Object.getPrototypeOf(surepassEsign)).call(this));

    _this.bindMessageEvent = _this.bindMessageEvent.bind(_this);
    _this.isMobile = _this.isMobile.bind(_this);
    _this.EsignMessage = _this.EsignMessage.bind(_this);
    _this.handleError = _this.handleError.bind(_this);
    _this.handleSuccess = _this.handleSuccess.bind(_this);
    _this.checkForWindowStatus = _this.checkForWindowStatus.bind(_this);
    _this.startCheckingWinStatus = _this.startCheckingWinStatus.bind(_this);
    _this.popupCenter = _this.popupCenter.bind(_this);
    _this.popup = false;
    _this.defaultOptions = { height: 850, width: 450 };
    _this.userCompletedSteps = false;
    return _this;
  }

  _createClass(surepassEsign, [{
    key: "startCheckingWinStatus",
    value: function startCheckingWinStatus() {
      var intervalFunction = this.checkForWindowStatus;
      this.handle = setInterval(intervalFunction, 5000);
    }
  }, {
    key: "checkForWindowStatus",
    value: function checkForWindowStatus() {
      var intervalFunction = this.handle;
      if (this.popup.closed) {
        clearInterval(intervalFunction);
        if (!this.userCompletedSteps) {
          var message = {
            data: {
              error: "POPUP_CLOSED"
            },
            status_code: 433,
            message: "User closed the popup window before process completed",
            success: false
          };
          this.emit("error", message);
        }
      }
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(response) {
      this.userCompletedSteps = true;
      this.popup.close();
      this.emit("success", response);
    }
  }, {
    key: "handleError",
    value: function handleError(response) {
      this.userCompletedSteps = true;
      this.popup.close();
      this.emit("error", response);
    }
  }, {
    key: "EsignMessage",
    value: function EsignMessage(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.status === 200) {
          this.handleSuccess(data);
        } else {
          this.handleError(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: "bindMessageEvent",
    value: function bindMessageEvent() {
      var EsignMessage = this.EsignMessage;
      window.addEventListener("message", EsignMessage, false);
    }
  }, {
    key: "popupCenter",
    value: function popupCenter(url, title, w, h) {
      var left = window.screen.width / 2 - w / 2;
      var top = window.screen.height / 2 - h / 2;
      this.popup = window.open(url, title, "toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);

      // Puts focus on the newWindow
      if (window.focus) this.popup.focus();
    }
  }, {
    key: "openWindow",
    value: function openWindow(url, windowName, options) {
      var option = options ? options : this.defaultOptions;
      if (!this.popup && !this.popup.closed) {
        if (!url) {
          this.emit("error", "Please provide a valid url");
        } else {
          if (this.isMobile()) {
            try {
              this.popup = window.open(url + "&mobile=true");
              this.bindMessageEvent();
              this.startCheckingWinStatus();
            } catch (error) {
              this.emit("error", "Couldn't open new Window");
            }
          } else {
            this.popupCenter(url, windowName, option.width, option.height);
            this.bindMessageEvent();
            this.startCheckingWinStatus();
          }
        }
      } else {
        this.popup.focus();
      }
    }
  }]);

  return surepassEsign;
}(_events2.default);

var Esign = function () {
  function Esign(options) {
    _classCallCheck(this, Esign);

    this.Esign = new surepassEsign();
    this.token = options.token;
    this.windowName = options.window_name;
    this.options = options.dimension;
  }

  _createClass(Esign, [{
    key: "openWindow",
    value: function openWindow(onSuccess, onError) {
      var token = this.token;
      var url = "https://esign-client.surepass.io/?token=" + token;
      this.Esign.openWindow(url, this.windowName, this.options);
      this.Esign.on("error", function (response) {
        return onError(response);
      });
      this.Esign.on("success", function (response) {
        return onSuccess(response);
      });
    }
  }]);

  return Esign;
}();

exports.default = Esign;