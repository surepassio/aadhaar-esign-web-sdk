# Surepass eSign Web Sdk 

[![N|Solid](https://surepass.io/wp-content/uploads/2019/09/2-layers@2x.png)](https://surepass.io/)

Surepass eSign Web Sdk initializer
## Table of contents
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Getting started](#getting-started)
* [Initializing Sdk](#initialising-sdk)
* [Handling Callback](#handling-callback)

## Overview
Surepass eSign web sdk can be consumed in two ways. You can add it to your flow of esing and then expect a redirect at the url you passed while you were initialising the token or you can use a event driven approach where you can open it in a new tab(mobile devices and desktop) or in new window(desktop) and use callback function to move forward based on sucess or failure of eSign. 

# Screenshots
![surepass esign.png]
## Getting started
There are two ways you can integrate the web sdk into your flow.
- Using the redirect
- Using events based approach

# Using Redirect
To use this method you need to initialise the token with a redirect url. Pass a redirect url while you are initialising the token for the client. Redirect the user to [surepass eSign](https://eSign-client.surepass.io/) with token in the query string. e.g https://eSign-client.surepass.io/?token=YOUR_TOKEN. On sucessfull completion of eSign we will redirect the user to your provided redirect url. Using this approach doesn't require our supplementary package


# Using event based approach
To use this you should not pass any redirect url while you initialise the token for the client. You can use our supplementary package or can make one yourself to initiate the eSign window with callback function that will return the status of eSign. i.e success or failure along with the message.

