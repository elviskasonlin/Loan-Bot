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
  .documentTextDetection(image_uri)
  .then(results => {
    const fullTextAnnotation = results[0].fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
};