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
  clientu
    .documentTextDetection(image_uri)
    .then(results => {
      // Almost entire object.
      // detections include bounding boxes etc.
      // text only accesses the final stringed text
      const detections = results[0].fullTextAnnotation;
      const text = detections.text;

      // console.log('Text:' + text);
      console.log(detections);

      const classified = classify.classify(text);


    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};