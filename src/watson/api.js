const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2019-07-12",
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY
  }),
  url: process.env.URL
});

exports.api = async (title, body, callback) => {
  naturalLanguageUnderstanding
    .analyze({
      html: `<html><body><h1>${title}</h1><p>${body}</p></body></html>`,
      features: {
        keywords: {
          sentiment: true
        }
      },
      language: "pt"
    })
    .then(analysisResults => {
      // console.log(JSON.stringify(analysisResults.result.keywords, null, 2));
      const data = analysisResults.result.keywords;
      callback(data);
    })
    .catch(err => {
      console.log("error:", err);
    });
};
