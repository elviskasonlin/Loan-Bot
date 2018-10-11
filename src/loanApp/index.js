const graph = require('../graph/index');
const questions = require('./questions.json');
const ocr = require('../ocr/ocr');

module.exports.start = function(body) {
  module.exports.state.loanapp[body.sender.id] = {
    question: questions[1]
  }

  graph.sendMessage(body.sender.id, { 
    "text" : "You can type 'quit' anytime to stop the loan application process."
  })

  ocr.ocr("http://gdurl.com/UzMJ");
}


const askQuestion = function(event, question) {

}