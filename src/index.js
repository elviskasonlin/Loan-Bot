/*
 * Created by P. Elvis on 9 October 2018
*/

'use strict';

// Load environment config if not specified as production
if (!process.env.PRODUCTION) {
  require('dotenv').config();
}

// Imports node modules
const express = require('express');
const firebaseAdmin = require('firebase-admin');
const request = require('request');

// Create app
const app = express();
app.use(require('body-parser').json());

// Import main files
const graph = require('./graph/index');
const eventHandler = require('./eventHandler/index');

//////////////////////
// Webhook endpoint //
//////////////////////

// POST method route for /webhook 
// For actions done by the user such as sending a message to the bot.
app.post('/webhook', (req, res) => {
  const body = req.body;

   if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      entry.messaging.forEach(function(webhook_event) {
        // Get the sender PSID
        const sender_psid = webhook_event.sender.id;

        // Check if the event is a message or postback and pass the event to the appropriate handler function
        if (webhook_event.message) {
          eventHandler.handleMessageEvent(sender_psid, webhook_event.message, body);        
        } else if (webhook_event.postback) {
          eventHandler.handlePostbackEvent(sender_psid, webhook_event.postback, body);
        }
      });
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// GET method route for /webhook
// Verifies whether if it's a request sent from Facebook
app.get('/webhook', (req, res) => {
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

// Configure app to listen on port specified in the environment
app.listen(process.env.PORT, () => {
  console.log("Webhook is listening on port " + process.env.PORT);
});

