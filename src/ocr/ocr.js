///////////////////////
// OCR Prerequisites //
///////////////////////

const gvision = require('@google-cloud/vision');
const gfirestore = require('@google-cloud/firestore');
const classify = require('./classify');

/////////////////
// OCR Handler //
/////////////////

module.exports.ocr = function (image_uri) {
  // Creates a client for ocr
  const client = new gvision.ImageAnnotatorClient();

  // Performs label detection on the image file
  client
    .documentTextDetection(image_uri)
    .then(results => {
      // Almost entire object.
      // detections include bounding boxes etc.
      // text only accesses the final stringed text
      const fullTextAnnotation = results[0].fullTextAnnotation;
      console.log(`Full text: ${fullTextAnnotation.text}`);
  
      fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
          console.log(`Block confidence: ${block.confidence}`);
          block.paragraphs.forEach(paragraph => {
            console.log(`Paragraph confidence: ${paragraph.confidence}`);
            paragraph.words.forEach(word => {
              const wordText = word.symbols.map(s => s.text).join('');
              console.log(`Word text: ${wordText}`);
              console.log(`Word confidence: ${word.confidence}`);
              word.symbols.forEach(symbol => {
                console.log(`Symbol text: ${symbol.text}`);
                console.log(`Symbol confidence: ${symbol.confidence}`);
              });
            });
          });
        });
      });

      console.log(JSON.stringify(fullTextAnnotation));
      const classified = classify.classify(text);


    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};