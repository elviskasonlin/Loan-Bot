const graph = require('../graph/index');
const questions = require('./questions.json');

module.exports.start = function(body) {
  graph.sendMessage(body.sender.id, {"text": "LOANAPP START INVOKED"});
}