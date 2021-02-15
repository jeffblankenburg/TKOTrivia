const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("../keys");

async function getSpecificQuestion(questionNumber) {
  const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Question?api_key=${keys.airtable_api_key}&filterByFormula=AND(Number%3D"${encodeURIComponent(questionNumber)}")`;
  const options = {
    method: "GET",
  };
  //console.log(`FULL PATH ${url}`);

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
    //console.log({r});
      const item = helper.getRandomItem(r.records);
      return item;
    });
}

module.exports = getSpecificQuestion;
