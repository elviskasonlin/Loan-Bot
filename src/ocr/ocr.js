///////////////////////
// OCR Prerequisites //
///////////////////////

const gvision = require('@google-cloud/vision');
const gfirestore = require('@google-cloud/firestore');

/////////////////
// OCR Handler //
/////////////////

module.exports.ocr = function(image_uri) {
  // Creates a client for ocr
const client = new gvision.ImageAnnotatorClient();

const new_uri = image_uri.slice(0, 5) + image_uri.slice(6);

// Performs label detection on the image file
client
  .textDetection("http://gdurl.com/UzMJ")
  .then(results => {
    // Almost entire object.
    // detections include bounding boxes etc.
    // text only accesses the final stringed text
    const detections = results[0].fullTextAnnotation;
    const text = detections.text;

    console.log('Text:' + text);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

};

