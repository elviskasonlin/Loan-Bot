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

  console.log("OCR HANDLER CALLED");
  // Creates a client for ocr
  const client = new gvision.ImageAnnotatorClient();

  // Performs label detection on the image file
  client
    .textDetection(image_uri)
    .then(results => {
      // Almost entire object.
      // detections include bounding boxes etc.
      // text only accesses the final stringed text

      const detections = results[0].fullTextAnnotation;
      const text = detections.text;

      console.log('Text:' + text);
      
      detections.forEach(text => console.log(text));

      // const fullTextAnnotation = results[0].fullTextAnnotation;

      // fullTextAnnotation.pages.forEach(page => {
      //   page.blocks.forEach(block => {
      //     console.log(`Block confidence: ${block.confidence}`);
      //     block.paragraphs.forEach(paragraph => {
      //       console.log(`Paragraph confidence: ${paragraph.confidence}`);
      //       paragraph.words.forEach(word => {
      //         const wordText = word.symbols.map(s => s.text).join('');
      //         console.log(`Word text: ${wordText}`);
      //         console.log(`Word confidence: ${word.confidence}`);
      //         word.symbols.forEach(symbol => {
      //           console.log(`Symbol text: ${symbol.text}`);
      //           console.log(`Symbol confidence: ${symbol.confidence}`);
      //         });
      //       });
      //     });
      //   });
      // });

      console.log(JSON.stringify(fullTextAnnotation));
      const classified = classify.classify(text);

      let response = {
        
      }

    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};