const graph = require('../graph/index');
const questions = require('./questions.json');

module.exports.start = function (body) {

  module.exports.state.report[event.sender.id] = {
    question: questions[0]
  }

  graph.sendMessage(body.sender.id, {"text": "LOANAPP START INVOKED"});
}