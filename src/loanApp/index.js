const graph = require('../graph/index');
const questions = require('./questions.json');
const ocr = require('../ocr/ocr');

const start = function(body) {
  ocr.ocr("http://gdurl.com/UzMJ");
}