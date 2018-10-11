const graph = require('../graph/index');
const questions = require('./questions.json');
const ocr = require('../ocr/ocr');

module.exports.start = function(body) {
  ocr.ocr("http://gdurl.com/UzMJ");
}