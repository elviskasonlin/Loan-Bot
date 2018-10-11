const graph = require('../graph/index');
const questions = require('./questions.json');
const ocr = require('../ocr/ocr');

module.exports.start = function(body) {
  module.exports.state.report[event.sender.id] = {
    question: questions[0];
  }

  ocr.ocr("http://gdurl.com/UzMJ");
}