/////////////////////////////////
// Event Handler Prerequisites //
/////////////////////////////////

// To save the user's entire state
const state = {
  report: {},
  handbook: {},
  feedback: {}
}

// Import modules
const graph = require('../graph/index'); 

////////////////////
// Event handlers //
////////////////////

// Handles MESSAGE events
module.exports.handleMessageEvent = function(sender_psid, received_message, entry) {
  let response;

  console.log("EVENT HANDLER LOG : " + JSON.stringify(webhook_event));

  // Check if the message contains text & create payload
  if (received_message.text) {    
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    const attachment_url = received_message.attachments[0].payload.url;

    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }

  }
  
  // Sends the response message
  graph.sendMessage(sender_psid, response);
}

// Handles POSTBACK events
// These events are those where the user clicks on postback buttons in templates
module.exports.handlePostbackEvent = function(sender_psid, received_postback, entry) {
  let response;
  
  // Get the payload for the postback
  const payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" };
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  graph.sendMessage(sender_psid, response);
}