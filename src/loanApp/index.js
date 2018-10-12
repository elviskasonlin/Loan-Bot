const graph = require('../graph/index');
const questions = require('./questions.json');
const ocr = require('../ocr/ocr');

module.exports.start = function (webhook_event) {
  module.exports.state.loanapp[webhook_event.sender.id] = {
    question: questions[1]
  }

  graph.sendMessage(webhook_event.sender.id, {
    "text": "You can type 'quit' anytime to stop the loan application process."
  });

  ocr.ocr("http://gdurl.com/UzMJ");
  ocr.ocr("http://gdurl.com/lHb6");
}

module.exports.handle = function (webhook_event) {
  const ps_id = webhook_event.sender.id;

  if (webhook_event.message.text && webhook_event.message.text.toLowerCase() == 'quit') {
    module.exports.state.loanapp[ps_id] = undefined;
  }

  const qn = module.exports.state.loanapp[ps_id].question;

  if (qn.reply) {
    module.exports.state.loanapp[ps_id][qn.reply] = webhook_event.message;
  }

  const nextStep = function(goto) {
    if (goto == 0) {
      // End form
      module.exports.state.loanapp[webhook_event.sender.id] = undefined;
    } else {
      // Ask next question
      module.exports.state.report[webhook_event.sender.id].question = questions[goto];
      askQuestion(event, module.exports.state.report[event.sender.id].question);
    }
  }

  const goto = question.goto[webhook_event.message.text];

  if (goto) {
    nextStep(goto);
  } else {
    nextStep(question.goto.default);
  }

}

const askQuestion = function (event, question) {
  let response; 
  let img_uri;

  let confirmationResponse = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title":"Is this image correct?",
          "image_url": img_uri,
          "subtitle":"Press yes to continue. No to resend image.",
          "buttons":[
            {
              "type":"postback",
              "title":"Yes",
              "payload":"CONFIRMATION_YES"
            },{
              "type":"postback",
              "title":"No",
              "payload":"CONFIRMATION_NO"
            }              
          ]
        }]
      }
    }
  };



  
}