///////////////////////
// OCR Prerequisites //
///////////////////////

const gvision = require('@google-cloud/vision');
const gfirestore = require('@google-cloud/firestore');
const classify = require('./classify');

/////////////////
// OCR Handler //
/////////////////

module.exports.ocr = function(image_uri) {

  console.log("OCR HANDLER CALLED");
  // Creates a client for ocr
  const client = new gvision.ImageAnnotatorClient();

  // Send & process
  // client
  //   .documentTextDetection(image_uri)
  //   .then(results => {
  //     const fullTextAnnotation = results[0].fullTextAnnotation;
  //     console.log(`Full text: ${fullTextAnnotation.text}`);

  //     fullTextAnnotation.pages.forEach(page => {
  //       page.blocks.forEach(block => {
  //         console.log(`Block confidence: ${block.confidence}`);
  //         block.paragraphs.forEach(paragraph => {
  //           console.log(`Paragraph confidence: ${paragraph.confidence}`);
  //           paragraph.words.forEach(word => {
  //             const wordText = word.symbols.map(s => s.text).join('');
  //             console.log(`Word text: ${wordText}`);
  //             console.log(`Word confidence: ${word.confidence}`);
  //             word.symbols.forEach(symbol => {
  //               console.log(`Symbol text: ${symbol.text}`);
  //               console.log(`Symbol confidence: ${symbol.confidence}`);
  //             });
  //           });
  //         });
  //       });
  //     });
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });
    client
    .textDetection(`gs://${bucketName}/${fileName}`)
    .then(results => {
      const detections = results[0].textAnnotations;
      console.log('Text:');
      detections.forEach(text => console.log(text));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};