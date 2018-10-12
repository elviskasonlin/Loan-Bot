/////////////////////////////////
// Event Handler Prerequisites //
/////////////////////////////////

const state = {
  loanapp: " ",
  faq: " ",
}

// Import modules
const graph = require('../graph/index');
const loanapp = require('../loanApp/index');
const ocr = require('../ocr/ocr');
loanapp.state = state;

////////////////////
// Event handlers //
////////////////////

// Handles MESSAGE events
module.exports.handleMessageEvent = function (sender_psid, received_message, webhook_event) {
  let response;

  // Check if the message contains text & create payload
  if (received_message.text) {
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    const attachment_url = received_message.attachments[0].payload.url;
    ocr.ocr(attachment_url);
    
  }

  // Sends the response message
  graph.sendMessage(sender_psid, response);
}

// Handles POSTBACK events
// These events are those where the user clicks on postback buttons in templates
module.exports.handlePostbackEvent = function (sender_psid, received_postback, webhook_event) {
  let response;

  // DEBUG
  //console.log(JSON.stringify(body));

  // State reloading
  const reloadState = function () {
    // Reload the state.
    state.loanapp[sender_psid] = undefined;
  }

  // Get the payload for the postback
  const payload = received_postback.payload;

  // Set the which module responds based on the payload event 
  if (payload === "LOANAPP_ENTRY") {
    reloadState();
    loanapp.start(webhook_event);
  } else if (payload === "FAQ_ENTRY") {
    reloadState();
    response = {
      "text": "Oops! FAQ is not available at the moment"
    };
    graph.sendMessage(sender_psid, response);
  }

}