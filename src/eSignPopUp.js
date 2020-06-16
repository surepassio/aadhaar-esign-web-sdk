import EventEmitter from "events";

class surepassEsign extends EventEmitter {
  constructor() {
    super();
    this.bindMessageEvent = this.bindMessageEvent.bind(this);
    this.isMobile = this.isMobile.bind(this);
    this.EsignMessage = this.EsignMessage.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.checkForWindowStatus = this.checkForWindowStatus.bind(this);
    this.startCheckingWinStatus = this.startCheckingWinStatus.bind(this);
    this.popupCenter = this.popupCenter.bind(this);
    this.popup = false;
    this.defaultOptions = { height: 850, width: 450 };
    this.userCompletedSteps = false;
  }

  startCheckingWinStatus() {
    const intervalFunction = this.checkForWindowStatus;
    this.handle = setInterval(intervalFunction, 5000);
  }

  checkForWindowStatus() {
    const intervalFunction = this.handle;
    if (this.popup.closed) {
      clearInterval(intervalFunction);
      if (!this.userCompletedSteps) {
        const message = {
          data: {
            error: "POPUP_CLOSED",
          },
          status_code: 433,
          message: "User closed the popup window before process completed",
          success: false,
        };
        this.emit("error", message);
      }
    }
  }

  isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
  handleSuccess(response) {
    this.userCompletedSteps = true;
    this.popup.close();
    this.emit("success", response);
  }

  handleError(response) {
    this.userCompletedSteps = true;
    this.popup.close();
    this.emit("error", response);
  }

  EsignMessage(event) {
    try {
      const data = JSON.parse(event.data);
      if (data.status_code === 200) {
        this.handleSuccess(data);
      } else {
        this.handleError(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  bindMessageEvent() {
    const EsignMessage = this.EsignMessage;
    window.addEventListener("message", EsignMessage, false);
  }

  popupCenter(url, title, w, h) {
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    this.popup = window.open(
      url,
      title,
      "toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );

    // Puts focus on the newWindow
    if (window.focus) this.popup.focus();
  }

  openWindow(url, windowName, options) {
    const option = options ? options : this.defaultOptions;
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
}

class EsignPopUpOpener {
  constructor(options) {
    this.Esign = new surepassEsign();
    this.token = options.token;
    this.windowName = options.window_name;
    this.options = options.dimension;
  }

  openWindow(onSuccess, onError) {
    const token = this.token;
    const url = `https://esign-client.surepass.io/?token=${token}`;
    this.Esign.openWindow(url, this.windowName, this.options);
    this.Esign.on("error", (response) => onError(response));
    this.Esign.on("success", (response) => onSuccess(response));
  }
}

export default EsignPopUpOpener
export {EsignPopUpOpener as OpenEsignPopUP}