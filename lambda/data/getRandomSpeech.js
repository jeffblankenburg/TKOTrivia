const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("../keys");

async function getRandomSpeech(speechType, locale) {
  const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Speech?api_key=${keys.airtable_api_key}&filterByFormula=AND(IsDisabled%3DFALSE(),SpeechType%3D"${encodeURIComponent(speechType)}",FIND(%22${locale}%22%2C+Locale)!%3D0)`;
  const options = {
    method: "GET",
  };
  //console.log(`FULL PATH ${url}`);

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
      const item = helper.getRandomItem(r.records);
      return item.fields.VoiceResponse;
    });
}

module.exports = getRandomSpeech;
