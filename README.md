# SurePass eSign Web SDK 

[![N|Solid](https://surepass.io/wp-content/uploads/2019/09/2-layers@2x.png)](https://surepass.io/)

SurePass eSign Web SDK initializer
## Table of contents
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Getting started](#getting-started)
    * [Using Redirect ](#using-redirect)
    *  [Using event based approach](#using-event)
* [Initializing SDK](#initializing-SDK)
* [Handling Callback](#handling-callback)

## Overview
SurePass eSign web SDK can be consumed in two ways. You can add it to your flow of eSign and then expect a redirect at the url you passed while you were initializing the token or you can use a event driven approach where you can open it in a new tab(mobile devices and desktop) or in new window(desktop) and use callback function to move forward based on success or failure of eSign. 

## Screenshots
![surepass esign.png](https://raw.githubusercontent.com/surepassio/aadhaar-eSign-web-sdk/master/surepass%20esign.png)
## Getting started
There are two ways you can integrate the web SDK into your flow.
- Using the redirect
- Using events based approach

### Using Redirect
To use this method you need to initialize the token with a redirect url. Pass a redirect url while you are initializing the token for the client. Redirect the user to [SurePass eSign](https://esign-client.surepass.io/) with token in the query string. e.g https://esign-client.surepass.io/?token=YOUR_TOKEN. On successful completion of eSign we will redirect the user to your provided redirect url. Using this approach doesn't require our supplementary package


### Using event based approach
To use this you should not pass any redirect url while you initialize the token for the client. You can use our supplementary package or can make one yourself to initiate the eSign window with callback function that will return the status of eSign. i.e success or failure along with the message.

## Initializing SDK
<<<<<<< HEAD
To initialize the web SDK you need to include our supplementary package either as [npm package](https://www.npmjs.com/package/@surepass/esign) or as use our [cdn](https://)

Example using npm package

=======
To initialize the web SDK you need to include our supplementary package either as [npm package](https://www.npmjs.com/package/@surepass/esign) or as use our [cdn](https://cdn.jsdelivr.net/gh/surepassio/aadhaar-esign-web-sdk@1.0.0/lib/index.min.js) and then:
>>>>>>> 6adba9c08443868fb3a7f52f3be7f0905466583a
```
import React from "react"; 
import "./styles.css";
import { OpenEsignPopUP } from "@surepass/esign";

function openEsign(onSuccess, onError) {
  const token = 123;
  const options = {
    token,
    window_name: "Surepass",
    dimension: { width: "450", height: "850" }
  };
  const esign = new OpenEsignPopUP(options);
  esign.openWindow(onSuccess, onError);
}

function onSuccess(response) {
  console.log("Response", response);
}

function onError(response) {
  console.log("Error", response);
}

export default function App() {
  return (
    <div className="App">
      <button onClick={() => openEsign(onSuccess, onError)}>Call</button>
    </div>
  );
}
```

[![N|Edit beautiful-gates-5kgk6](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/beautiful-gates-5kgk6?fontsize=14&hidenavigation=1&theme=dark)

This will open a new window in desktop and a new tab in mobile and will call onSuccess or onError depending on the status of eSign.
## Handling Callback
We will return these responses based on status of eSign:
```
INTERNAL SERVER ERROR
{
    data: {
      error: "INT_SERVER_ERROR"
    },
    status_code: 500,
    message: "Internal server error occurred",
    success: false
}
MAXIMUM RETRY REACHED
{
    data: {
      error: "MAX_RETRY"
    },
    status_code: 403,
    message: msg, 
    success: false
}
Where "msg" can be either due to phone number, otp or otp resend
UNAUTHORIZED ACCESS
{
    data: {
      error: "UNAUTH_ACCESS"
    },
    status_code: 401,
    message: "Invalid Token ",
    success: false
}
UNKNOWN ERROR
{
    data: {
      error: "UNKNOWN_ERROR"
    },
    status_code: 450,
    message: "An error occurred",
    success: false
}
USER REFUSAL TO VERIFY DOCUMENT
{
    data: {
      error: "VERIFY_REFUSAL"
    },
    status_code: 422,
    message: "User refused to verify the document",
    success: false
}
ERROR FROM NDLS
{
      data: {
        error: "NDLS_ERROR"
      },
      status_code: 501,
      message: "error from ndls while signing document",
      success: false
}
POPUP CLOSED BY USER
{
        data: {
          error: "POPUP_CLOSED"
        },
        status_code:433,
        message: "User closed the popup window before process completed",
        success: false
}
SUCCESS
{
    data{
      error: "SUCCESS"
    },
    status_code: 200,
    message: "successfully e-sign the document",
    success: true
}
```
Except for the success message all other will be called using onError function while the success message will be called using onSuccess function.
>All these message are sent from the eSign window using Widow.postMessage function of javascript except the message of POPUP closure by user that we infer programmatically. So you can design your own utility code based on [src/index.js](https://github.com/surepassio/aadhaar-esign-web-sdk/blob/master/src/index.js) to get the message from the child window or tab that your application will open.
