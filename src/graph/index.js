
///////////////////
// SEND RESPONSE //
///////////////////

const request = require('request');

// Sends response messages via the Send API
// This will post to facebook's messenger platform

module.exports.sendMessage = function(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.FACEBOOK_PAGE_ACCESS_TOKEN},
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('SUCCESS : Message sent \n');
    } else {
      console.error("ERROR : Unable to send message \n " + err);
    }
  }); 
}