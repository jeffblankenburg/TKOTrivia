const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("../keys");

async function getSpecificAchievement(code, userId, locale) {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Achievement?api_key=${keys.airtable_api_key}&filterByFormula=AND(Code%3D"${encodeURIComponent(code)}",FIND(%22${locale}%22%2C+Locale)!%3D0,FIND(%22${userId}%22%2C+User)%3D0)`;
    const options = {method: "GET"};
    //console.log(`FULL PATH ${url}`);

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
    console.log({r});
      const item = helper.getRandomItem(r.records);
      return item;
    });
}

module.exports = getSpecificAchievement;