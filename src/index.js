if (!process.env.PRODUCTION) {
  require('dotenv').config();
}

const express = require('express');
const app = express();
app.use(require('body-parser').json());

const { VERIFY_TOKEN } = process.env.VERIFY_TOKEN;

app.listen(process.env.PORT, () => {
  console.log("Webhook is listening on port " + process.env.PORT);
});

/////////////////////
// Webhook endpoint//
/////////////////////

// POST method route for /webhook 
app.post('/webhook', (req, res) => {
  let body = req.body;

   if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// GET method route for /webhook
app.get('/webhook', (req, res) => {
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});
