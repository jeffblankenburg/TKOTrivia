const helper = require("../helper");
const fetch = require("node-fetch");
const keys = require("../keys");

async function getCategoryList() {
  const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Category?api_key=${keys.airtable_api_key}`;
  const options = {
    method: "GET",
  };
  //console.log(`FULL PATH ${url}`);

  return fetch(url, options)
    .then((res) => res.json())
    .then((r) => {
      return r.records;
    });
}

module.exports = getCategoryList;
