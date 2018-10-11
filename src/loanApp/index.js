const graph = require('../graph/index');
const questions = require('./questions.json');
const ocr = require('../ocr/ocr');

module.exports.start = function(webhook_event) {
  module.exports.state.loanapp[webhook_event.sender.id] = {
    question: questions[1]
  }

  graph.sendMessage(webhook_event.sender.id, { 
    "text" : "You can type 'quit' anytime to stop the loan application process."
  });

  ocr.ocr("http://gdurl.com/UzMJ");
}

const askQuestion = function(event, question) {

}