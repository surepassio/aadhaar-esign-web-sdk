# Surepass eSign Web Sdk 

[![N|Solid](https://surepass.io/wp-content/uploads/2019/09/2-layers@2x.png)](https://surepass.io/)

Surepass eSign Web Sdk initializer
## Table of contents
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Getting started](#getting-started)
    * [Using Redirect ](#using-redirect)
    *  [Using event based approach](#using-event)
* [Initializing Sdk](#initialising-sdk)
* [Handling Callback](#handling-callback)

## Overview
Surepass eSign web sdk can be consumed in two ways. You can add it to your flow of esing and then expect a redirect at the url you passed while you were initialising the token or you can use a event driven approach where you can open it in a new tab(mobile devices and desktop) or in new window(desktop) and use callback function to move forward based on sucess or failure of eSign. 

## Screenshots
![surepass esign.png](https://github.com/surepassio/aadhaar-eSign-web-sdk/blob/master/surepass%20esign.png)
## Getting started
There are two ways you can integrate the web sdk into your flow.
- Using the redirect
- Using events based approach

### Using Redirect
To use this method you need to initialise the token with a redirect url. Pass a redirect url while you are initialising the token for the client. Redirect the user to [surepass eSign](https://eSign-client.surepass.io/) with token in the query string. e.g https://eSign-client.surepass.io/?token=YOUR_TOKEN. On sucessfull completion of eSign we will redirect the user to your provided redirect url. Using this approach doesn't require our supplementary package


### Using event based approach
To use this you should not pass any redirect url while you initialise the token for the client. You can use our supplementary package or can make one yourself to initiate the eSign window with callback function that will return the status of eSign. i.e success or failure along with the message.

## Initializing Sdk
To initialize the web sdk you need to include our supplementary package either as [npm package]() or as use our [cdn](https://) and then:
```
import Esign from "./surepass-eSign"; //In case you are using package. Don't do this if you are using cdn
function openeSign(onSuccess,onError) {
  const token = organisationtoken;
  const options = {
    token,
    window_name: "Surepass",
    dimension: { width: "450", height: "850" }
  };
  const esign = new Esign(
    options
  );
  esign.openWindow(onSuccess,onError);
}
```
This will open a new window in desktop and a new tab in mobile and will call onSucess or onError depending on the status of eSign.
## Handling Callback
We will return these responses based on status of eSign:
```
INTERNAL SERVER ERROR
{
    data: {
      error: "INT_SERVER_ERROR"
    },
    status_code: 500,
    message: "Internal server error occured",
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
    message: "sucessfully e-sign the document",
    success: true
}
```
Except for the sucess message all other will be called using onError function while the sucess message will be called using onSucess function.
>All these message are sent from the eSign window using Widow.postMessage function of javascript except the message of POPUP close message that we infer programmatically. So you can design your own utility code based on [src/index.js](https://github.com/surepassio/aadhaar-esign-web-sdk/blob/master/src/index.js) to get the message from the child window or tab that your application will open.
