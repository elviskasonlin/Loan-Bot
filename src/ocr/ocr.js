///////////////////////
// OCR Prerequisites //
///////////////////////

const gvision = require('@google-cloud/vision');
const gfirestore = require('@google-cloud/firestore');

/////////////////
// OCR Handler //
/////////////////

module.exports.ocr = function(image_uri) {
  const detection_type = "TEXT_DETECTION";
  let response = {
    "requests": [
      {
        "image": 
        {
          "source": 
          {
            "imageUri": "http://gdurl.com/UzMJ"
          }
        },
        "features": 
        [
          {
            "type":detection_type 
          }
        ]
      }
    ]
  };

  // Creates a client for ocr
const client = new gvision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .labelDetection(image_uri)
  .then(results => {
    const labels = results[0].labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

};

